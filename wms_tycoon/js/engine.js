// ==========================================
// ENGINE.JS — Estado global e motor do jogo
// Depende de: data.js (em tempo de chamada)
// ==========================================

// Estado do Game Loop (global)
let gl = {
    day: 1, hour: 8, speed: 1, paused: false,
    timer: null, orderCounter: 1,
    inbound: [], storage: [], outbound: [],
    dayRevenue: 0, dayCosts: 0, lastOrderHour: -99,
    credibility: 100,            // 0-100: Liderança no Radar
    warnedChoices: new Set(),     // previne avisos duplicados
    punishedChoices: new Set(),   // previne punições duplicadas
    totalOrders: 0,               // total de pedidos gerados
    missedSLAs: 0,                // SLAs perdidos (inbound + outbound)
    fulfilledOrders: 0,           // pedidos cumpridos dentro do prazo
    totalSlaHoursUsed: 0,         // horas de SLA acumuladas (para média)
    marketModifier: 0,            // termostato econômico: ajuste de chance de carga (-0.30 a +0.30)
    upgrades: { forklift: false, ai_wms: false, training: false }
};

let _radarChart = null; // instância global do Chart.js

// Estado persistente do jogador (global)
let gameState = {
    saveIndex: -1,
    companyName: "", type: "", cash: 0, baseDebt: 0, maxSpace: 0,
    rhProblemType: "",
    choices: { debt: null, sla: null, team: null, forklift: null, infra: null, b2b: null, premium: null }
};

// ==========================================
// MOTOR: LOOP PRINCIPAL
// ==========================================

function startGameLoop() {
    if (gl.timer) clearTimeout(gl.timer);
    gl.day = 1; gl.hour = 8; 
    // Removido o gl.paused = false; daqui para evitar o bug de velocidade
    
    gl.inbound = []; gl.storage = []; gl.outbound = [];
    gl.dayRevenue = 0; gl.dayCosts = 0; gl.lastOrderHour = -99;
    gl.credibility = 100;
    gl.warnedChoices = new Set();
    gl.punishedChoices = new Set();
    gl.totalOrders = 0;
    gl.missedSLAs = 0;
    gl.fulfilledOrders = 0;
    gl.totalSlaHoursUsed = 0;
    gl.marketModifier = 0;
    gl.upgrades = { forklift: false, ai_wms: false, training: false };
    
    if (_radarChart) { _radarChart.destroy(); _radarChart = null; }
    
    preloadStorage();
    buildStorageGrid();
    
    // CORREÇÃO CRÍTICA: Força o jogo a iniciar SEMPRE pausado de forma segura
    setGameSpeed(0); 
    renderDashboard();
}

// Pré-preenche o storage com estoque herdado proporcional ao perfil
function preloadStorage() {
    const prof = WH_PROFILES[gameState.type];
    if (!prof) return;
    const targetSlots = { 'Massa Falida': 15, 'Estagnada': 35, 'Premium': 64 };
    const count = Math.min(targetSlots[gameState.type] || 0, gameState.maxSpace);
    for (let i = 0; i < count; i++) {
        const gi = Math.floor(Math.random() * prof.cargos.length);
        const cargoType = prof.cargos[gi];
        const ct = CARGO_TYPES[cargoType];
        gl.storage.push({
            id: 'STR-' + String(gl.orderCounter++).padStart(3,'0'),
            type: cargoType,
            cargo: ct ? ct.label : cargoType,
            vol: 1,
            client: 'Estoque Herdado'
        });
    }
}

function scheduleNextTick() {
    if (gl.timer) clearTimeout(gl.timer);
    if (!gl.paused) {
        gl.timer = setTimeout(gameTick, Math.floor(5000 / gl.speed));
    }
}

function gameTick() {
    gl.hour++;
    if (gl.hour >= 24) { gl.hour = 0; processDayEnd(); }
    processHourEvents();
    checkSLAExpiry();
    renderDashboard();
    scheduleNextTick();
}

// ==========================================
// MOTOR: VERIFICAÇÃO DE SLAs
// ==========================================

function checkSLAExpiry() {
    const prof = WH_PROFILES[gameState.type];
    if (!prof) return;

    let inRebook = 0, inCancel = 0, outCancel = 0;
    let inRebookCargo = '', inCancelCargo = '', outCancelCargo = '';
    // UPGRADE: Treinamento Avançado reduz multas em 20%
    const penaltyMult    = (gl.upgrades && gl.upgrades.training) ? 0.8 : 1;
    const effectivePenalty = Math.round(prof.penalty * penaltyMult);

    // INBOUND: fase 1 = reagenda (+50% custo); fase 2 = cancela de vez
    gl.inbound = gl.inbound.filter(o => {
        if (getHoursLeft(o) <= 0) {
            if (o.reagendado) {
                gameState.cash -= effectivePenalty;
                gl.missedSLAs++;
                inCancel++;
                inCancelCargo = o.cargo;
                return false;
            } else {
                gameState.cash -= effectivePenalty;
                o.inCost = Math.round((o.inCost || (CARGO_TYPES[o.type] ? CARGO_TYPES[o.type].inCost : 0)) * 1.5);
                o.deadline = getAbsHour() + o.sla;
                o.reagendado = true;
                gl.missedSLAs++;
                inRebook++;
                inRebookCargo = o.cargo;
                return true;
            }
        }
        return true;
    });

    // OUTBOUND: remove com multa
    gl.outbound = gl.outbound.filter(o => {
        if (getHoursLeft(o) <= 0) {
            gameState.cash -= effectivePenalty;
            gl.missedSLAs++;
            outCancel++;
            outCancelCargo = o.cargo;
            return false;
        }
        return true;
    });

    // Toasts resumidos — máximo 3 por tick
    if (inRebook === 1)
        showToast(`⚠️ SLA Estourado! Frete de ${inRebookCargo} reagendado 50% mais caro.`);
    else if (inRebook > 1)
        showToast(`⚠️ ${inRebook} cargas reagendadas com custo +50%. Multa total: -$${(effectivePenalty * inRebook).toLocaleString('pt-BR')}.`);

    if (inCancel === 1)
        showToast(`🔴 FALHA CRÍTICA: Carga de ${inCancelCargo} cancelada. Multa: -$${effectivePenalty}.`);
    else if (inCancel > 1)
        showToast(`🔴 ${inCancel} cargas canceladas após reagendamento. Multa total: -$${(effectivePenalty * inCancel).toLocaleString('pt-BR')}.`);

    if (outCancel === 1)
        showToast(`⚠️ FALHA DE SLA: ${outCancelCargo} cancelado. Multa: -$${effectivePenalty.toLocaleString('pt-BR')}.`);
    else if (outCancel > 1)
        showToast(`⚠️ ${outCancel} pedidos de saída cancelados. Multa total: -$${(effectivePenalty * outCancel).toLocaleString('pt-BR')}.`);
}

// ==========================================
// MOTOR: VIRADA DE DIA
// ==========================================

function processDayEnd() {
    const prof = WH_PROFILES[gameState.type];
    if (!prof) return;
    const ch = gameState.choices || {};

    // Custo fixo do dia (salários, aluguel, etc.)
    gameState.cash -= prof.dailyCost;
    gl.day++;
    gl.dayRevenue = 0;
    gl.dayCosts = prof.dailyCost;

    // [2c] PARCELA DE DÍVIDA HERDADA (choices.debt === 'parcel', primeiros 12 dias)
    if (ch.debt === 'parcel' && gameState.baseDebt > 0 && gl.day <= 12) {
        const installment = Math.ceil(gameState.baseDebt / 12);
        gameState.cash -= installment;
        gl.dayCosts += installment;
    }

    // Custo de armazenagem diário por tipo de produto (dinâmico)
    let storageCostToday = gl.storage.reduce((total, item) => {
        const ct = CARGO_TYPES[item.type];
        return total + (ct ? ct.storeCost * item.vol : 0);
    }, 0);
    // UPGRADE: Empilhadeiras Elétricas reduz custo de armazenagem em 50%
    if (gl.upgrades && gl.upgrades.forklift) storageCostToday = Math.round(storageCostToday / 2);
    gameState.cash -= storageCostToday;
    gl.dayCosts += storageCostToday;

    if (gameState.cash <= 0) {
        gameState.cash = 0;
        setGameSpeed(0);
        showError('⚠️ ALERTA CRÍTICO: Caixa zerado! A operação entrou em colapso financeiro. Renegociação urgente necessária.');
    }

    // [1] AVISOS PRÉVIOS — 2 dias antes do vencimento das promessas
    if (ch.infra && typeof ch.infra === 'object') {
        if (gl.day === ch.infra.days - 2 && !gl.warnedChoices.has('infra')) {
            gl.warnedChoices.add('infra');
            showError(`⏰ AVISO: Faltam 2 dias para o prazo da expansão de infraestrutura (Dia ${ch.infra.days}). Execute a expansão antes do vencimento!`);
        }
    }
    if (ch.team && typeof ch.team === 'object' && !ch.team.resolved) {
        if (gl.day === ch.team.days - 2 && !gl.warnedChoices.has('team')) {
            gl.warnedChoices.add('team');
            showError(`⏰ AVISO: Faltam 2 dias para o prazo do compromisso de RH (Dia ${ch.team.days}). Acesse a aba Equipe e execute a ação prometida!`);
        }
    }

    // [2a] PUNIÇÃO: INFRAESTRUTURA
    if (ch.infra && typeof ch.infra === 'object' && gl.day > ch.infra.days) {
        const targetSlots = { 'Massa Falida': 30, 'Estagnada': 50, 'Premium': 80 };
        const requiredSpace = (targetSlots[gameState.type] || 0) + ch.infra.slots;
        if (gameState.maxSpace < requiredSpace && !gl.punishedChoices.has('infra')) {
            gl.punishedChoices.add('infra');
            gl.credibility = Math.max(0, gl.credibility - 20);
            showError(`🔴 QUEBRA DE COMPROMISSO: O prazo de expansão de infraestrutura venceu no Dia ${ch.infra.days}. Credibilidade do Gestor caiu para ${gl.credibility}/100. Consequências futuras no Radar de Desempenho.`);
        }
    }

    // [2b] PUNIÇÃO: EQUIPE
    if (ch.team && typeof ch.team === 'object' && gl.day > ch.team.days && !ch.team.resolved) {
        if (!gl.punishedChoices.has('team')) {
            gl.punishedChoices.add('team');
            const reduction = 5;
            const usedNow = gl.storage.reduce((s, i) => s + i.vol, 0);
            if (gameState.maxSpace - reduction > usedNow) {
                gameState.maxSpace = Math.max(usedNow, gameState.maxSpace - reduction);
                buildStorageGrid();
            }
            gl.credibility = Math.max(0, gl.credibility - 15);
            showError(`🔴 DEMISSÃO VOLUNTÁRIA: O prazo de resolução do problema de RH venceu. Um funcionário pediu demissão — capacidade operacional reduzida em ${reduction} posições. Credibilidade: ${gl.credibility}/100.`);
        }
    }

// [3] GATILHO DE EVENTOS ALEATÓRIOS (20% de chance na virada do dia)
    if (Math.random() < 0.20) {
        if (typeof triggerRandomEvent === 'function') triggerRandomEvent();
    } 

    // [4] CONDIÇÃO DE VITÓRIA (ENDGAME)
    // Regra: Passou do dia 30, tem 1 Milhão em caixa e Liderança >= 80
    if (gl.day >= 30 && gameState.cash >= 1000000 && gl.credibility >= 80) {
        updateCurrentSaveSession(gameState.cash, gameState.maxSpace, true);
        if (typeof showVictoryScreen === 'function') showVictoryScreen(gameState.cash);
        return; // Interrompe o processo para travar o jogo na tela de vitória
    }

    // Salva o jogo normalmente se não for evento de vitória
    updateCurrentSaveSession(gameState.cash, gameState.maxSpace, true);
}

// ==========================================
// MOTOR: GERAÇÃO DE EVENTOS
// ==========================================

function getAbsHour() { return (gl.day - 1) * 24 + gl.hour; }
function getHoursLeft(order) { return Math.max(0, order.deadline - getAbsHour()); }

function processHourEvents() {
    const prof = WH_PROFILES[gameState.type];
    if (!prof) return;
    const usedSpace = gl.storage.reduce((s, i) => s + i.vol, 0);

    // — INBOUND —
    const inChance = Math.min(0.95, Math.max(0, prof.inboundChance + gl.marketModifier));
    if (Math.random() < inChance && gl.inbound.length < 12 && usedSpace < gameState.maxSpace) {
        const ci = Math.floor(Math.random() * prof.clients.length);
        const gi = Math.floor(Math.random() * prof.cargos.length);
        const vol = Math.floor(Math.random() * 4) + 1;
        const cargoType = prof.cargos[gi];
        const ct = CARGO_TYPES[cargoType];
        gl.inbound.push({
            id: 'IN-' + String(gl.orderCounter++).padStart(3,'0'),
            client: prof.clients[ci],
            type: cargoType,
            cargo: ct ? ct.label : cargoType,
            inCost: ct ? ct.inCost : 0,
            vol, penalty: prof.penalty,
            sla:      prof.slaHoursInbound + (gl.upgrades && gl.upgrades.ai_wms ? 4 : 0),
            deadline: getAbsHour() + prof.slaHoursInbound + (gl.upgrades && gl.upgrades.ai_wms ? 4 : 0)
        });
        gl.totalOrders++;
    }

    // — OUTBOUND —
    const outChance = Math.min(0.95, Math.max(0, prof.outboundChance + gl.marketModifier));
    if (Math.random() < outChance && gl.outbound.length < 12) {
        const availableTypes = prof.cargos.filter(t =>
            gl.storage.some(s => s.type === t) || gl.inbound.some(ib => ib.type === t)
        );
        if (availableTypes.length > 0) {
            const cargoType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
            const ch = gameState.choices || {};
            let outboundSla = prof.slaHoursOutbound;
            if (gameState.type === 'Massa Falida' && ch.sla && typeof ch.sla === 'object') {
                outboundSla = ch.sla.hours;
            } else if (gameState.type === 'Estagnada' && ch.b2b && typeof ch.b2b === 'object') {
                outboundSla = ch.b2b.sla;
            }
            gl.outbound.push({
                id: 'OUT-' + String(gl.orderCounter++).padStart(3,'0'),
                type: cargoType,
                cargo: CARGO_TYPES[cargoType] ? CARGO_TYPES[cargoType].label : cargoType,
                client: prof.clients[Math.floor(Math.random() * prof.clients.length)],
                vol: 1,
                penalty: prof.penalty,
                sla:      outboundSla + (gl.upgrades && gl.upgrades.ai_wms ? 4 : 0),
                deadline: getAbsHour() + outboundSla + (gl.upgrades && gl.upgrades.ai_wms ? 4 : 0)
            });
        }
    }
}

// ==========================================
// AÇÕES DO JOGADOR
// ==========================================

function receiveOrder(orderId) {
    const o = gl.inbound.find(x => x.id === orderId);
    if (!o) return;
    const inCost = o.inCost !== undefined ? o.inCost : (CARGO_TYPES[o.type] ? CARGO_TYPES[o.type].inCost : 0);
    if (gameState.cash < inCost) {
        showWarning(`Caixa insuficiente para receber esta carga. Custo de entrada: $${inCost}${o.reagendado ? ' (majorado por reagendamento)' : ''}`);
        return;
    }
    const used = gl.storage.reduce((s, i) => s + i.vol, 0);
    if (used + o.vol > gameState.maxSpace) { showWarning('Espaço insuficiente no armazém para este carregamento.'); return; }
    gameState.cash -= inCost;
    gl.dayCosts += inCost;
    gl.totalSlaHoursUsed += (o.sla - getHoursLeft(o));
    gl.fulfilledOrders++;
    const sid = 'STR-' + String(gl.orderCounter++).padStart(3,'0');
    gl.storage.push({ id: sid, type: o.type, cargo: o.cargo, vol: o.vol, client: o.client });
    gl.inbound = gl.inbound.filter(x => x.id !== orderId);
    if (gl.inbound.length < 2 && !gl.paused) processHourEvents();
    renderDashboard();
}

function expediteOrder(orderId) {
    const o = gl.outbound.find(x => x.id === orderId);
    if (!o) return;
    const storageItem = gl.storage.find(x => x.type === o.type);
    if (!storageItem) {
        showReschedulePrompt(orderId, o);
        return;
    }
    const ct = CARGO_TYPES[o.type];
    const revenue = ct ? ct.rev : 0;
    gameState.cash += revenue;
    gl.dayRevenue += revenue;
    gl.totalSlaHoursUsed += (o.sla - getHoursLeft(o));
    gl.fulfilledOrders++;
    gl.storage = gl.storage.filter(x => x.id !== storageItem.id);
    gl.outbound = gl.outbound.filter(x => x.id !== orderId);
    if (gl.outbound.length < 2 && !gl.paused) processHourEvents();
    renderDashboard();
}

function showReschedulePrompt(orderId, o) {
    const prof = WH_PROFILES[gameState.type];
    const hoursLeft = Math.max(0, getHoursLeft(o));
    const reschedCost = Math.round(prof.penalty * 0.5);
    document.getElementById('reschedule-info').innerHTML =
        `Pedido <b>${o.id}</b> — <b>${o.cargo}</b> para <b>${o.client}</b>.<br>` +
        `Produto solicitado não está disponível em estoque.<br>` +
        `<span style="color:var(--accent-red);font-weight:bold;">SLA restante: ${hoursLeft}h</span>`;
    document.getElementById('reschedule-cost-info').innerText =
        `Reprogramar com o cliente: custo logístico de -$${reschedCost.toLocaleString('pt-BR')} e novo prazo de ${o.sla}h a partir de agora.`;
    const btn = document.getElementById('btn-reschedule-confirm');
    btn.onclick = () => rescheduleOutbound(orderId, reschedCost, o.sla);
    document.getElementById('modal-reschedule').classList.remove('hidden');
}

function rescheduleOutbound(orderId, cost, newSla) {
    document.getElementById('modal-reschedule').classList.add('hidden');
    if (gameState.cash < cost) {
        showWarning(`Caixa insuficiente para reprogramar. Custo logístico: $${cost.toLocaleString('pt-BR')}.`);
        return;
    }
    const o = gl.outbound.find(x => x.id === orderId);
    if (!o) return;
    gameState.cash -= cost;
    gl.dayCosts += cost;
    gl.totalSlaHoursUsed += (o.sla - getHoursLeft(o));
    o.deadline = getAbsHour() + newSla;
    o.sla = newSla;
    gl.missedSLAs++;
    showToast(`🔄 Pedido ${orderId} reprogramado. Custo logístico: -$${cost.toLocaleString('pt-BR')}. Novo prazo: ${newSla}h.`);
    updateCurrentSaveSession(gameState.cash, gameState.maxSpace, true);
    renderDashboard();
}

function buyStorageSlot() {
    if (gameState.cash < 500) { showError('Caixa insuficiente. Custo por posição: $500.'); return; }
    gameState.cash -= 500;
    gl.dayCosts += 500;
    gameState.maxSpace += 1;
    buildStorageGrid();
    renderDashboard();
}

function setGameSpeed(speed) {
    gl.speed = speed;
    gl.paused = (speed === 0);
    updateSpeedButtons();
    scheduleNextTick();
}

function togglePause() {
    if (gl.paused) { setGameSpeed(gl._lastSpeed || 1); }
    else { gl._lastSpeed = gl.speed; setGameSpeed(0); }
}

function saveAndExit() {
    setGameSpeed(0);
    updateCurrentSaveSession(gameState.cash, gameState.maxSpace, true);
    document.getElementById('dashboard-view').classList.add('hidden');
    document.getElementById('boot-view').classList.remove('hidden');
    renderSaveSlots();
    goToMenu();
}

// ==========================================
// UPGRADES PERMANENTES
// ==========================================

function openUpgrades() {
    renderUpgradesModal();
    document.getElementById('modal-upgrades').classList.remove('hidden');
}

function buyUpgrade(type, cost) {
    if (!gl.upgrades) gl.upgrades = { forklift: false, ai_wms: false, training: false };
    if (gl.upgrades[type]) { showWarning('Este upgrade já foi adquirido.'); return; }
    if (gameState.cash < cost) { showWarning(`Caixa insuficiente. Necessário: $${cost.toLocaleString('pt-BR')}. Caixa: $${gameState.cash.toLocaleString('pt-BR')}.`); return; }
    gameState.cash  -= cost;
    gl.dayCosts     += cost;
    gl.upgrades[type] = true;
    updateCurrentSaveSession(gameState.cash, gameState.maxSpace, true);
    const u = UPGRADE_CATALOG.find(x => x.key === type);
    showToast(`⚡ Upgrade adquirido: ${u ? u.title : type}! Efeito ativo imediatamente.`);
    renderUpgradesModal();
    renderDashboard();
}

// ==========================================
// AÇÕES DE MERCADO (B2B)
// ==========================================

function investMarketing() {
    const cost = 2500;
    if (gameState.cash < cost) { showError(`Caixa insuficiente para investir em marketing. Necessário: $${cost.toLocaleString('pt-BR')}.`); return; }
    const maxMod = 0.30;
    if (gl.marketModifier >= maxMod) { showError('Limite de expansão de mercado atingido (+30%). Aguarde resultados antes de investir novamente.'); return; }
    gameState.cash -= cost;
    gl.dayCosts += cost;
    gl.marketModifier = Math.min(maxMod, parseFloat((gl.marketModifier + 0.10).toFixed(2)));
    updateCurrentSaveSession(gameState.cash, gameState.maxSpace, true);
    showToast(`📈 Marketing B2B ativado! Demanda aumentada em +10%. Modificador atual: ${Math.round(gl.marketModifier*100)}%.`);
    renderB2B();
    renderDashboard();
}

function breakContract() {
    const cost = 3000;
    if (gameState.cash < cost) { showError(`Caixa insuficiente para pagar multa de rescisão. Necessário: $${cost.toLocaleString('pt-BR')}.`); return; }
    const minMod = -0.30;
    if (gl.marketModifier <= minMod) { showError('Limite de redução de mercado atingido (-30%). Não é possível reduzir mais a demanda.'); return; }
    gameState.cash -= cost;
    gl.dayCosts += cost;
    gl.marketModifier = Math.max(minMod, parseFloat((gl.marketModifier - 0.10).toFixed(2)));
    updateCurrentSaveSession(gameState.cash, gameState.maxSpace, true);
    showToast(`🚧 Contrato rescindido. Fluxo de caminhões reduzido em -10%. Modificador atual: ${Math.round(gl.marketModifier*100)}%.`);
    renderB2B();
    renderDashboard();
}

// ==========================================
// AÇÃO DE RH
// ==========================================

function resolveHRPromise(cost) {
    if (gameState.cash < cost) {
        showError(`Caixa insuficiente para executar a ação de RH. Custo necessário: $${cost.toLocaleString('pt-BR')}. Caixa atual: $${gameState.cash.toLocaleString('pt-BR')}.`);
        return;
    }
    gameState.cash   -= cost;
    if (gl) gl.dayCosts += cost;
    gameState.choices.team.resolved = true;
    if (gl) gl.credibility = Math.min(100, gl.credibility + 10);
    updateCurrentSaveSession(gameState.cash, gameState.maxSpace, true);
    showToast(`✅ Ação de RH executada! Custo: -$${cost.toLocaleString('pt-BR')}. Credibilidade +10 → ${gl ? gl.credibility : '--'}/100.`);
    renderRH();
    renderProfile();
}
// ==========================================
// FATOR CAOS: EVENTOS ALEATÓRIOS DIÁRIOS
// ==========================================
function triggerRandomEvent() {
    const events = [
        {
            title: 'Fiscalização Surpresa',
            desc: 'Inspetores da ANVISA e dos Bombeiros apareceram sem aviso para verificar o espaçamento de segurança das paletes e as rotas de fuga.',
            execute: () => {
                const usedSpace = gl.storage.reduce((s, i) => s + i.vol, 0);
                const occupancy = usedSpace / gameState.maxSpace;
                if (occupancy > 0.85) {
                    gameState.cash -= 2000;
                    gl.dayCosts += 2000;
                    showEventCard('Fiscalização Surpresa', 'O seu armazém estava com mais de 85% de ocupação (superlotado)! Os fiscais aplicaram uma multa por risco operacional.', 'EFEITO: Multa de -$2.000 aplicada ao caixa.');
                } else {
                    showEventCard('Fiscalização Surpresa', 'Os fiscais elogiaram a organização. A sua ocupação estava dentro do limite seguro (abaixo de 85%).', 'EFEITO: Nenhum. A operação passou ilesa!');
                }
            }
        },
        {
            title: 'Caos na Rodovia',
            desc: 'Um acidente grave bloqueou a principal rodovia de acesso ao armazém. Todos os camiões que estavam a caminho desistiram e voltaram às fábricas.',
            execute: () => {
                const count = gl.inbound.length;
                gl.inbound = []; // Limpa a fila de Inbound inteira
                showEventCard('Caos na Rodovia', `O bloqueio forçou o cancelamento de ${count} entregas que estavam a aguardar na sua doca.`, 'EFEITO: Fila de Inbound esvaziada. Perdeu a receita destas cargas, mas evitou as multas de SLA.');
            }
        },
        {
            title: 'Injeção de Moral',
            desc: 'A equipa fez um mutirão de produtividade fantástico durante a madrugada. Eles adiantaram o processo de triagem de toda a carga.',
            execute: () => {
                // Dá +3 horas de sobrevida em todos os prazos atuais
                gl.inbound.forEach(o => o.deadline += 3);
                gl.outbound.forEach(o => o.deadline += 3);
                gl.credibility = Math.min(100, gl.credibility + 5);
                showEventCard('Injeção de Moral', 'A operação está a fluir com excelência e os clientes foram notificados da agilidade.', 'EFEITO: +3 horas de bónus em todos os SLAs atuais e Liderança +5 no Radar.');
            }
        }
    ];

    // Sorteia um evento e executa
    const event = events[Math.floor(Math.random() * events.length)];
    event.execute();
    
    // Atualiza o save após aplicar o efeito
    updateCurrentSaveSession(gameState.cash, gameState.maxSpace, true);
}