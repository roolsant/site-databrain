// ==========================================
// UI.JS — Renderização e Interface
// ==========================================

function showError(message) {
    if (typeof setGameSpeed === 'function') setGameSpeed(0); // Para o jogo enquanto o modal está aberto
    document.getElementById('error-msg-text').innerText = message;
    document.getElementById('modal-error').classList.remove('hidden');
}

function showWarning(message) {
    document.getElementById('error-msg-text').innerText = message;
    document.getElementById('modal-error').classList.remove('hidden');
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 3000);
}

// ==========================================
// PASSO 1 - MERCADO E NAVEGAÇÃO
// ==========================================
let newCompanyName = "";
let playerWallet = 500000;

function hideAllBootScreens() { document.querySelectorAll('#boot-view .os-window').forEach(el => el.classList.add('hidden')); }
function goToMenu() { hideAllBootScreens(); renderSaveSlots(); document.getElementById('screen-menu').classList.remove('hidden'); }
function goToOverview() { hideAllBootScreens(); document.getElementById('screen-overview').classList.remove('hidden'); }
function goToName() { hideAllBootScreens(); document.getElementById('company-name').value = ""; document.getElementById('screen-name').classList.remove('hidden'); document.getElementById('company-name').focus(); }

function goToMarket() {
    const input = document.getElementById('company-name').value.trim();
    if (input === "") { showError("O sistema exige um Nome de Registro para prosseguir."); return; }
    newCompanyName = input;
    document.getElementById('market-company-name').innerText = "Licenciado para: " + newCompanyName;
    hideAllBootScreens(); document.getElementById('screen-market').classList.remove('hidden');
}

function buyWarehouse(type, price) {
    document.querySelectorAll('.wh-action').forEach(el => el.style.visibility = 'hidden');
    playerWallet -= price;
    document.getElementById('market-wallet').innerText = `$${playerWallet.toLocaleString('pt-BR')}`;
    document.getElementById('purchase-success').classList.remove('hidden');
    saveGameSession(newCompanyName, type, playerWallet, false, 0);
}

function renderSaveSlots() {
    const container = document.getElementById('save-slots');
    if (!container) return;
    container.innerHTML = '';
    let saves = JSON.parse(localStorage.getItem('wms_saves')) || [];
    
    for (let i = 0; i < 4; i++) {
        if (saves[i]) {
            const save = saves[i];
            let statusHtml = save.auditCompleted 
                ? `<span style="color: var(--accent-green);">Ativa</span>` 
                : `<span style="color: var(--accent-orange);">Auditoria Pendente</span>`;
                
            container.innerHTML += `
                <div class="save-slot">
                    <div class="slot-info">
                        <h3>${save.name}</h3>
                        <p>Operação: ${save.type} | Caixa: $${save.cash.toLocaleString('pt-BR')} | Status: ${statusHtml}</p>
                    </div>
                    <div class="slot-actions">
                        <button class="btn success btn-sm" onclick="loadDashboardFromSave(${i})">Continuar Operação</button>
                        <button class="btn reject btn-sm" onclick="confirmDelete(${i})">Encerrar Operação</button>
                    </div>
                </div>`;
        } else {
            container.innerHTML += `
                <div class="save-slot empty">
                    <div class="slot-info">
                        <h3 style="color: var(--text-muted);">[Slot ${i+1} Vazio]</h3>
                        <p>Nenhum dado salvo.</p>
                    </div>
                    <button class="btn btn-sm" disabled>Carregar</button>
                </div>`;
        }
    }
}

// ==========================================
// PASSO 2 - O CHOQUE DE REALIDADE E CARREGAMENTO
// ==========================================
function loadDashboardFromMarket() { 
    let saves = JSON.parse(localStorage.getItem('wms_saves')); 
    initDashboardState(saves[0], 0); 
}

function loadDashboardFromSave(index) { 
    let saves = JSON.parse(localStorage.getItem('wms_saves')); 
    initDashboardState(saves[index], index); 
}

function initDashboardState(saveData, index) {
    gameState.saveIndex = index;
    gameState.companyName = saveData.name;
    gameState.type = saveData.type;
    gameState.cash = saveData.cash;
    
    if (saveData.maxSpace) gameState.maxSpace = saveData.maxSpace;
    if (saveData.choices)  gameState.choices  = saveData.choices;
    
    document.getElementById('boot-view').classList.add('hidden');
    document.getElementById('dashboard-view').classList.remove('hidden');
    
    document.getElementById('txt-company').innerText = gameState.companyName;
    document.getElementById('ui-company-name').innerText = gameState.companyName;

    const auditJaConcluida = saveData.auditCompleted === true || (saveData.maxSpace > 0);

    if (auditJaConcluida) {
        if (saveData.auditCompleted !== true) {
            let saves = JSON.parse(localStorage.getItem('wms_saves')) || [];
            if (index >= 0 && index < saves.length) {
                saves[index].auditCompleted = true;
                localStorage.setItem('wms_saves', JSON.stringify(saves));
            }
        }
        document.getElementById('modal-audit').classList.add('hidden');
        document.getElementById('main-app').classList.remove('blurred');
        
        document.getElementById('ui-cash').innerText = `CAIXA: $${gameState.cash.toLocaleString('pt-BR')}`;
        document.getElementById('ui-space').innerText = `ESPAÇO: 0/${gameState.maxSpace}`;

        startGameLoop();
        if (saveData.upgrades) Object.assign(gl.upgrades, saveData.upgrades);
    } else {
        setupAuditReport();
        document.getElementById('modal-audit').classList.remove('hidden');
        document.getElementById('main-app').classList.add('blurred');
    }
}

function setupAuditReport() {
    document.querySelectorAll('.decision-block').forEach(el => el.style.display = 'none');
    Object.keys(gameState.choices).forEach(k => gameState.choices[k] = null);
    
    document.getElementById('ui-cash').innerText = `CAIXA: $${gameState.cash.toLocaleString('pt-BR')}`;

    if (gameState.type === "Massa Falida") {
        gameState.baseDebt = 15000;
        gameState.maxSpace = 30;
        ['block-debt', 'block-sla', 'block-forklift', 'block-team', 'block-infra'].forEach(id => document.getElementById(id).style.display = 'block');
        
        let randomRh = rhReasonsList[Math.floor(Math.random() * rhReasonsList.length)];
        gameState.rhProblemType = randomRh.id;
        document.getElementById('txt-rh-reason').innerText = randomRh.title;
        document.getElementById('txt-rh-desc').innerText = randomRh.desc;
        
        let rhInputHtml = "";
        if (randomRh.id === "salary") rhInputHtml = `<label>Aumento (%):</label><input type="number" id="input-rh-val" min="5" max="50" value="10">`;
        if (randomRh.id === "overwork") rhInputHtml = `<label>Contratações (Qtd):</label><input type="number" id="input-rh-val" min="1" max="10" value="2">`;
        if (randomRh.id === "resources") rhInputHtml = `<label>Verba ($):</label><input type="number" id="input-rh-val" min="500" max="5000" step="500" value="1000">`;
        document.getElementById('rh-dynamic-input-container').innerHTML = rhInputHtml;
        
        gameState.choices.b2b = 'ok'; gameState.choices.premium = 'ok';

    } else if (gameState.type === "Estagnada") {
        gameState.baseDebt = 5000;
        gameState.maxSpace = 50;
        ['block-debt', 'block-b2b', 'block-infra'].forEach(id => document.getElementById(id).style.display = 'block');
        
        gameState.choices.sla = 'ok'; gameState.choices.team = 'ok'; gameState.choices.forklift = 'ok'; gameState.choices.premium = 'ok';

    } else if (gameState.type === "Premium") {
        gameState.baseDebt = 0;
        gameState.maxSpace = 80;
        document.getElementById('block-premium').style.display = 'block';
        
        gameState.choices.debt = 'ok'; gameState.choices.sla = 'ok'; gameState.choices.team = 'ok'; 
        gameState.choices.forklift = 'ok'; gameState.choices.infra = 'ok'; gameState.choices.b2b = 'ok';
    }

    if (gameState.baseDebt > 0) {
        document.getElementById('txt-debt-value').innerText = `-$${gameState.baseDebt.toLocaleString('pt-BR')}`;
    }
    validateAudit();
}

function selectAuditOption(category, choice) {
    gameState.choices[category] = choice;
    if (category === 'debt') { document.getElementById('opt-debt-cash').classList.remove('selected'); document.getElementById('opt-debt-parcel').classList.remove('selected'); document.getElementById(`opt-debt-${choice}`).classList.add('selected'); }
    if (category === 'forklift') { document.getElementById('opt-fix-now').classList.remove('selected'); document.getElementById('opt-fix-later').classList.remove('selected'); document.getElementById(`opt-fix-${choice==='fix'?'now':'later'}`).classList.add('selected'); }
    if (category === 'premium') { document.getElementById('opt-prem-prazos').classList.remove('selected'); document.getElementById('opt-prem-precos').classList.remove('selected'); document.getElementById(`opt-prem-${choice}`).classList.add('selected'); }
    validateAudit();
}

function confirmPromise(category) {
    let btn = document.getElementById(`btn-${category}-confirm`);
    
    if (category === 'infra') {
        gameState.choices.infra = { days: parseInt(document.getElementById('input-infra-days').value), slots: parseInt(document.getElementById('input-infra-slots').value) };
        btn.innerText = "Plano Registrado";
    }
    if (category === 'sla') {
        gameState.choices.sla = { hours: parseInt(document.getElementById('input-sla-hours').value) };
        btn.innerText = "Acordo Firmado";
    }
    if (category === 'team') {
        gameState.choices.team = { days: parseInt(document.getElementById('input-rh-days').value), value: parseInt(document.getElementById('input-rh-val').value) };
        btn.innerText = "Compromisso Assumido";
    }
    if (category === 'b2b') {
        gameState.choices.b2b = { sla: parseInt(document.getElementById('input-b2b-sla').value), discount: parseInt(document.getElementById('input-b2b-desc').value) };
        btn.innerText = "Renovação Assinada";
    }
    
    btn.classList.add('success', 'confirmed');
    btn.classList.remove('primary');
    validateAudit();
}

function validateAudit() {
    let isReady = Object.values(gameState.choices).every(val => val !== null);
    let warnEl = document.getElementById('audit-warning');
    
    if (isReady) {
        warnEl.innerText = "Tudo pronto. O sistema pode ser destravado.";
        warnEl.style.color = "var(--accent-green)";
    } else {
        warnEl.innerText = "Selecione e confirme TODAS as opções pendentes acima antes de assinar.";
        warnEl.style.color = "var(--accent-red)";
    }
}

function confirmAuditAndStart() {
    let isReady = Object.values(gameState.choices).every(val => val !== null);
    if (!isReady) {
        showError("Atenção: É necessário tomar todas as ações e confirmar as decisões pendentes no relatório antes de iniciar o jogo.");
        return;
    }

    if (gameState.choices.debt === 'cash') {
        let valorPago = gameState.baseDebt * 0.90;
        gameState.cash -= valorPago;
    }

    if (gameState.type === "Massa Falida") {
        if (gameState.choices.forklift === 'fix') gameState.cash -= 2500;
        else if (gameState.choices.forklift === 'ignore') gameState.maxSpace -= 10;
    }

    updateCurrentSaveSession(gameState.cash, gameState.maxSpace, true);

    document.getElementById('modal-audit').classList.add('hidden');
    document.getElementById('main-app').classList.remove('blurred');
    
    document.getElementById('ui-cash').innerText = `CAIXA: $${gameState.cash.toLocaleString('pt-BR')}`;
    document.getElementById('ui-space').innerText = `ESPAÇO: 0/${gameState.maxSpace}`;

    gameState.startCash = gameState.cash;
    startGameLoop();
}

function switchTab(tabId) {
    document.querySelectorAll('#dashboard-view .tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('#dashboard-view .nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');
    document.getElementById('nav-' + tabId).classList.add('active');
    if (tabId === 'perfil') renderProfile();
    if (tabId === 'rh') renderRH();
    if (tabId === 'contratos') renderB2B();
}

// ==========================================
// RENDERIZAÇÃO DAS ABAS 
// ==========================================
function renderB2B() {
    const el = document.getElementById('b2b-panel-content');
    if (!el) return;
    const prof = WH_PROFILES[gameState.type];
    if (!prof) { el.innerHTML = '<p style="color:var(--text-muted);">Dados do perfil indisponíveis.</p>'; return; }

    const mod      = gl ? gl.marketModifier : 0;
    const modPct   = Math.round(mod * 100);
    const modLabel = mod > 0.05 ? 'Aquecida ▲' : (mod < -0.05 ? 'Reduzida ▼' : 'Normal ◆');
    const modColor = mod > 0.05 ? 'var(--accent-green)' : (mod < -0.05 ? 'var(--accent-orange)' : 'var(--text-muted)');

    const maxMod = 0.30;
    const canInvest = mod < maxMod;
    const canBreak  = mod > -maxMod;

    el.innerHTML = `
        <h2 style="color:var(--accent-blue);margin-bottom:6px;font-size:1.1rem;">&#128201; Contratos B2B e Termostato Econômico</h2>
        <p style="color:var(--text-muted);font-size:0.82rem;margin-bottom:28px;">${gameState.companyName} &nbsp;|&nbsp; ${gameState.type} &nbsp;|&nbsp; Dia ${gl ? gl.day : '--'}</p>

        <div style="background:var(--bg-panel);border:1px solid var(--border-color);border-radius:6px;padding:18px 22px;max-width:620px;margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
                <div>
                    <span style="color:var(--text-muted);font-size:0.78rem;">CLIENTES ATIVOS</span>
                    <p style="color:var(--text-main);font-size:0.88rem;margin-top:4px;">${prof.clients.join(', ')}</p>
                </div>
                <div style="text-align:right;">
                    <span style="color:var(--text-muted);font-size:0.78rem;">STATUS DA DEMANDA</span>
                    <p style="color:${modColor};font-size:1.1rem;font-weight:bold;margin-top:4px;">${modLabel}</p>
                    <span style="color:${modColor};font-size:0.78rem;">Modificador: ${modPct >= 0 ? '+' : ''}${modPct}%</span>
                </div>
            </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;max-width:620px;">
            <div style="background:var(--bg-panel);border:1px solid var(--border-color);border-left:4px solid var(--accent-green);border-radius:6px;padding:20px;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
                    <span style="font-size:1.2rem;">&#128200;</span>
                    <span style="color:var(--accent-green);font-weight:bold;font-size:0.9rem;">Expansão de Mercado</span>
                </div>
                <p style="color:var(--text-muted);font-size:0.82rem;margin-bottom:14px;">Invista em prospecção para atrair mais volume de carga ao armazém.</p>
                <div style="background:var(--bg-card);border-radius:4px;padding:10px 12px;margin-bottom:14px;">
                    <span style="color:var(--text-muted);font-size:0.78rem;">Efeito:</span>
                    <span style="color:var(--accent-green);font-weight:bold;margin-left:6px;">+10% chance de carga/hora</span><br>
                    <span style="color:var(--text-muted);font-size:0.78rem;">Custo:</span>
                    <span style="color:var(--accent-orange);font-weight:bold;margin-left:6px;">$2.500</span>
                </div>
                ${canInvest
                    ? `<button onclick="investMarketing()" style="width:100%;background:var(--accent-green);color:#000;border:none;padding:10px;border-radius:4px;font-family:var(--font-mono);font-weight:bold;font-size:0.82rem;cursor:pointer;">&#9660; Investir em Marketing ($2.500)</button>`
                    : `<button disabled style="width:100%;background:var(--border-color);color:var(--text-muted);border:none;padding:10px;border-radius:4px;font-family:var(--font-mono);font-size:0.82rem;cursor:not-allowed;">Limite atingido</button>`
                }
            </div>
            <div style="background:var(--bg-panel);border:1px solid var(--border-color);border-left:4px solid var(--accent-red);border-radius:6px;padding:20px;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
                    <span style="font-size:1.2rem;">&#128683;</span>
                    <span style="color:var(--accent-red);font-weight:bold;font-size:0.9rem;">Rescisão Contratual</span>
                </div>
                <p style="color:var(--text-muted);font-size:0.82rem;margin-bottom:14px;">Cancele contratos para reduzir a chegada de caminhões e dar fôlego à operação.</p>
                <div style="background:var(--bg-card);border-radius:4px;padding:10px 12px;margin-bottom:14px;">
                    <span style="color:var(--text-muted);font-size:0.78rem;">Efeito:</span>
                    <span style="color:var(--accent-orange);font-weight:bold;margin-left:6px;">-10% chance de carga/hora</span><br>
                    <span style="color:var(--text-muted);font-size:0.78rem;">Multa:</span>
                    <span style="color:var(--accent-red);font-weight:bold;margin-left:6px;">$3.000</span>
                </div>
                ${canBreak
                    ? `<button onclick="breakContract()" style="width:100%;background:var(--accent-red);color:#fff;border:none;padding:10px;border-radius:4px;font-family:var(--font-mono);font-weight:bold;font-size:0.82rem;cursor:pointer;">&#128683; Romper Contratos (-$3.000)</button>`
                    : `<button disabled style="width:100%;background:var(--border-color);color:var(--text-muted);border:none;padding:10px;border-radius:4px;font-family:var(--font-mono);font-size:0.82rem;cursor:not-allowed;">Limite atingido</button>`
                }
            </div>
        </div>`;
}

function renderRH() {
    const el = document.getElementById('rh-panel-content');
    if (!el) return;
    const ch   = gameState.choices || {};
    const team = (ch.team && typeof ch.team === 'object' && ch.team.days) ? ch.team : null;

    if (!team) {
        el.innerHTML = `
            <h2 style="color:var(--accent-blue);margin-bottom:6px;font-size:1.1rem;">&#128101; Gestão de Pessoal e Clima Organizacional</h2>
            <p style="color:var(--text-muted);font-size:0.82rem;margin-bottom:28px;">${gameState.companyName} &nbsp;|&nbsp; ${gameState.type} &nbsp;|&nbsp; Dia ${gl ? gl.day : '--'}</p>
            <div style="background:var(--bg-panel);border:1px solid var(--accent-green);border-left:4px solid var(--accent-green);border-radius:6px;padding:20px 24px;max-width:520px;">
                <span style="color:var(--accent-green);font-size:1rem;font-weight:bold;">&#10004; Clima Organizacional Estável</span>
                <p style="color:var(--text-muted);margin-top:8px;font-size:0.85rem;">Nenhuma ação de RH pendente para este perfil.</p>
            </div>`;
        return;
    }

    if (team.resolved) {
        el.innerHTML = `
            <h2 style="color:var(--accent-blue);margin-bottom:6px;font-size:1.1rem;">&#128101; Gestão de Pessoal e Clima Organizacional</h2>
            <p style="color:var(--text-muted);font-size:0.82rem;margin-bottom:28px;">${gameState.companyName} &nbsp;|&nbsp; ${gameState.type} &nbsp;|&nbsp; Dia ${gl ? gl.day : '--'}</p>
            <div style="background:var(--bg-panel);border:1px solid var(--accent-green);border-left:4px solid var(--accent-green);border-radius:6px;padding:20px 24px;max-width:520px;">
                <span style="color:var(--accent-green);font-size:1rem;font-weight:bold;">&#10004; Promessa Cumprida — Clima Organizacional Restaurado</span>
                <p style="color:var(--text-muted);margin-top:8px;font-size:0.85rem;">A ação de RH foi executada com sucesso. Equipe motivada e operando normalmente.</p>
            </div>`;
        return;
    }

    const prob  = gameState.rhProblemType || 'resources';
    const val   = team.value || 0;
    const dLeft = team.days - (gl ? gl.day : 1);

    const probLabels = { salary: 'Salário Defasado', overwork: 'Excesso de Carga de Trabalho', resources: 'Falta de Recursos Operacionais' };
    const probDesc   = { salary: `Aumento salarial prometido: ${val}%`, overwork: `Contratações prometidas: ${val} pessoa(s)`, resources: `Verba operacional prometida: $${val}` };

    let cost;
    if (prob === 'salary')    cost = val * 150;
    else if (prob === 'overwork') cost = val * 800;
    else                      cost = val;

    const urgColor  = dLeft < 0 ? 'var(--accent-red)' : (dLeft <= 2 ? 'var(--accent-orange)' : 'var(--accent-blue)');
    const prazoTxt  = dLeft < 0 ? `&#9888; PRAZO VENCIDO (Dia ${team.days})` : (dLeft === 0 ? `&#9888; Vence HOJE` : `Prazo: Dia ${team.days} (Faltam ${dLeft} dias)`);

    el.innerHTML = `
        <h2 style="color:var(--accent-blue);margin-bottom:6px;font-size:1.1rem;">&#128101; Gestão de Pessoal e Clima Organizacional</h2>
        <p style="color:var(--text-muted);font-size:0.82rem;margin-bottom:28px;">${gameState.companyName} &nbsp;|&nbsp; ${gameState.type} &nbsp;|&nbsp; Dia ${gl ? gl.day : '--'}</p>

        <div style="background:var(--bg-panel);border:1px solid ${urgColor};border-left:4px solid ${urgColor};border-radius:6px;padding:24px 28px;max-width:560px;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;">
                <div>
                    <span style="color:var(--accent-orange);font-size:0.75rem;font-weight:bold;letter-spacing:1px;">AÇÃO PENDENTE</span>
                    <h3 style="color:var(--text-main);font-size:1rem;margin-top:4px;">${probLabels[prob] || prob}</h3>
                </div>
                <span style="color:${urgColor};font-size:0.8rem;font-weight:bold;white-space:nowrap;">${prazoTxt}</span>
            </div>
            <div style="background:var(--bg-card);border-radius:4px;padding:12px 16px;margin-bottom:16px;">
                <p style="color:var(--text-muted);font-size:0.82rem;margin-bottom:6px;">Promessa firmada na Auditoria:</p>
                <p style="color:var(--text-main);font-size:0.9rem;font-weight:bold;">${probDesc[prob]}</p>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <div>
                    <span style="color:var(--text-muted);font-size:0.78rem;">Custo de execução:</span>
                    <span style="color:var(--accent-orange);font-size:1.1rem;font-weight:bold;margin-left:8px;">$${cost.toLocaleString('pt-BR')}</span>
                </div>
                <button onclick="resolveHRPromise(${cost})" style="background:var(--accent-green);color:#000;border:none;padding:10px 20px;border-radius:4px;font-family:var(--font-mono);font-weight:bold;font-size:0.85rem;cursor:pointer;">&#9654; Executar Ação de RH</button>
            </div>
        </div>`;
}

function renderProfile() {
    const ch = gameState.choices || {};
    const day = gl ? gl.day : 1;

    const hdrEl = document.getElementById('profile-header-info');
    if (hdrEl) hdrEl.textContent = `${gameState.companyName}  |  ${gameState.type}  |  Dia ${day}`;

    const baseSpace = { 'Massa Falida': 30, 'Estagnada': 50, 'Premium': 80 }[gameState.type] || 30;
    const lideranca     = gl ? gl.credibility : 100;
    const confiabilidade = 100;
    const saudeFin       = gameState.startCash > 0 ? Math.min(100, Math.round((gameState.cash / gameState.startCash) * 100)) : 100;
    const visaoCrescimento = Math.min(100, Math.round((gameState.maxSpace / baseSpace) * 100));

    const bars = [
        { label: 'Liderança',          value: lideranca,        color: '#38bdf8' },
        { label: 'Confiabilidade',       value: confiabilidade,   color: '#4ade80' },
        { label: 'Saúde Financeira',    value: saudeFin,         color: saudeFin > 60 ? '#4ade80' : saudeFin > 30 ? '#fbbf24' : '#f87171' },
        { label: 'Visão de Crescimento', value: visaoCrescimento, color: '#a78bfa' },
    ];

    const canvas = document.getElementById('radarChart');
    if (canvas) {
        const radarData = [lideranca, confiabilidade, saudeFin, visaoCrescimento];
        if (_radarChart) {
            _radarChart.data.datasets[0].data = radarData;
            _radarChart.update();
        } else {
            _radarChart = new Chart(canvas, {
                type: 'radar',
                data: {
                    labels: ['Liderança', 'Confiabilidade', 'Saúde Financeira', 'Visão de Crescimento'],
                    datasets: [{
                        label: 'Gestor',
                        data: radarData,
                        backgroundColor: 'rgba(56, 189, 248, 0.15)',
                        borderColor: '#38bdf8',
                        pointBackgroundColor: '#38bdf8',
                        pointRadius: 4,
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: false,
                    scales: {
                        r: {
                            min: 0, max: 100,
                            ticks: { stepSize: 25, color: '#94a3b8', backdropColor: 'transparent', font: { size: 9 } },
                            grid: { color: '#334155' },
                            angleLines: { color: '#334155' },
                            pointLabels: { color: '#e2e8f0', font: { size: 10, family: "'Courier New', monospace" } }
                        }
                    },
                    plugins: { legend: { display: false } }
                }
            });
        }
    }

    const barsEl = document.getElementById('profile-bars');
    if (barsEl) {
        barsEl.innerHTML = bars.map(b => `
            <div style="margin-bottom:14px;">
                <div style="display:flex;justify-content:space-between;font-size:0.78rem;color:var(--text-muted);margin-bottom:4px;">
                    <span>${b.label}</span><span style="color:${b.color};font-weight:bold;">${b.value}%</span>
                </div>
                <div style="height:6px;background:var(--border-color);border-radius:3px;overflow:hidden;">
                    <div style="width:${b.value}%;height:100%;background:${b.color};border-radius:3px;transition:width 0.6s ease;"></div>
                </div>
            </div>`).join('');
    }

    const rows = [];

    if (ch.infra && typeof ch.infra === 'object' && ch.infra.days) {
        const baseSpace     = { 'Massa Falida': 30, 'Estagnada': 50, 'Premium': 80 }[gameState.type] || 0;
        const expandedSoFar = gameState.maxSpace - baseSpace;
        const totalPromised = ch.infra.slots || 0;
        const dLeft         = ch.infra.days - (gl ? gl.day : 1);
        const done          = expandedSoFar >= totalPromised;
        const timeTxt       = dLeft < 0 ? '⚠ VENCIDO' : (dLeft === 0 ? 'Vence HOJE' : `Faltam ${dLeft} dias`);
        const statusTxt     = done ? '✔ Concluído' : `${timeTxt} | Feito: ${expandedSoFar}/${totalPromised}`;
        const color         = done ? 'var(--accent-green)' : (dLeft < 0 ? 'var(--accent-red)' : (dLeft <= 2 ? 'var(--accent-orange)' : 'var(--text-muted)'));
        rows.push({ label: `Expansão de Infra. (+${totalPromised} posições)`, status: statusTxt, color });
    }

    if (ch.team && typeof ch.team === 'object' && ch.team.days) {
        const dLeft     = ch.team.days - day;
        const resolved  = ch.team.resolved === true;
        const statusTxt = resolved ? '✔ Promessa Cumprida' : (dLeft < 0 ? '⚠ VENCIDO' : (dLeft === 0 ? 'Vence HOJE' : `Faltam ${dLeft} dias`));
        const color     = resolved ? 'var(--accent-green)' : (dLeft < 0 ? 'var(--accent-red)' : (dLeft <= 2 ? 'var(--accent-orange)' : 'var(--text-muted)'));
        rows.push({ label: 'Resolução de RH', status: statusTxt, color });
    }

    if (ch.debt && ch.debt !== 'ok') {
        if (ch.debt === 'cash') {
            rows.push({ label: 'Liquidação de Dívida Herdada', status: '✔ Paga à Vista', color: 'var(--accent-green)' });
        } else {
            const parcelas  = Math.min(day, 12);
            const statusTxt = parcelas >= 12 ? '✔ Quitada' : `Parcela ${parcelas}/12`;
            const color     = parcelas >= 12 ? 'var(--accent-green)' : 'var(--accent-orange)';
            rows.push({ label: 'Dívida Parcelada em 12x', status: statusTxt, color });
        }
    }

    if (ch.sla && typeof ch.sla === 'object' && ch.sla.hours) {
        const avgSla    = gl.fulfilledOrders > 0 ? (gl.totalSlaHoursUsed / gl.fulfilledOrders).toFixed(1) : '--';
        const overMeta  = avgSla !== '--' && parseFloat(avgSla) > ch.sla.hours;
        const statusTxt = `Meta: ${ch.sla.hours}h | Média: ${avgSla}h`;
        const color     = overMeta ? 'var(--accent-red)' : 'var(--accent-green)';
        rows.push({ label: 'SLA de Atendimento Renegociado', status: statusTxt, color });
    }

    if (ch.forklift && ch.forklift !== 'ok') {
        if (ch.forklift === 'fix') {
            rows.push({ label: 'Manutenção da Empilhadeira', status: '✔ Consertada', color: 'var(--accent-green)' });
        } else {
            rows.push({ label: 'Manutenção da Empilhadeira', status: '✘ Adiada (-10 posições)', color: 'var(--accent-red)' });
        }
    }

    if (ch.b2b && typeof ch.b2b === 'object') {
        rows.push({ label: 'Contrato B2B Renovado', status: `SLA: ${ch.b2b.sla}h | Desc: ${ch.b2b.discount}%`, color: 'var(--text-muted)' });
    }

    if (ch.premium && ch.premium !== 'ok') {
        const strat = ch.premium === 'prazos' ? 'Prazos Renegociados' : 'Preços Repassados';
        rows.push({ label: 'Estratégia Financeira Adotada', status: `✔ ${strat}`, color: 'var(--accent-green)' });
    }

    const commEl = document.getElementById('profile-commitments');
    if (commEl) {
        commEl.innerHTML = rows.length === 0
            ? `<p style="color:var(--text-muted);font-size:0.9rem;">Nenhum compromisso registrado para este perfil.</p>`
            : rows.map(r => `
                <div style="background:var(--bg-card);border:1px solid var(--border-color);border-left:3px solid ${r.color};border-radius:4px;padding:11px 14px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;gap:16px;">
                    <span style="color:var(--text-main);font-size:0.85rem;">${r.label}</span>
                    <span style="color:${r.color};font-size:0.85rem;font-weight:bold;white-space:nowrap;">${r.status}</span>
                </div>`).join('');
    }
}

function renderUpgradesModal() {
    const grid = document.getElementById('upgrades-grid');
    if (!grid) return;
    grid.innerHTML = UPGRADE_CATALOG.map(u => {
        const owned = gl.upgrades && gl.upgrades[u.key];
        const canBuy = !owned && gameState.cash >= u.cost;
        const btnLabel  = owned ? '✔ Adquirido' : `Comprar ($${u.cost.toLocaleString('pt-BR')})`;
        const btnStyle  = owned
            ? 'background:var(--accent-green);color:#000;cursor:default;'
            : (canBuy ? 'background:var(--accent-blue);color:#000;cursor:pointer;' : 'background:var(--border-color);color:var(--text-muted);cursor:not-allowed;');
        return `<div style="background:var(--bg-panel);border:1px solid ${owned ? 'var(--accent-green)' : 'var(--border-color)'};border-radius:6px;padding:16px;display:flex;flex-direction:column;gap:8px;">
            <div style="font-size:1.6rem;">${u.icon}</div>
            <div style="color:var(--accent-blue);font-weight:bold;font-size:0.85rem;">${u.title}</div>
            <div style="color:var(--text-muted);font-size:0.78rem;flex:1;">${u.desc}</div>
            <div style="color:var(--accent-orange);font-size:0.72rem;font-weight:bold;">${u.detail}</div>
            <button onclick="buyUpgrade('${u.key}', ${u.cost})" ${owned ? 'disabled' : ''} style="${btnStyle}border:none;padding:8px;border-radius:4px;font-family:var(--font-mono);font-size:0.78rem;font-weight:bold;">${btnLabel}</button>
        </div>`;
    }).join('');
}

function updateSpeedButtons() {
    ['btn-pause','btn-1x','btn-2x','btn-4x'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.classList.remove('active','paused-active'); }
    });
    const pauseBtn = document.getElementById('btn-pause');
    if (gl.paused) {
        pauseBtn.classList.add('paused-active');
        pauseBtn.innerHTML = '&#9654; RETOMAR';
    } else {
        pauseBtn.innerHTML = '&#9646;&#9646; PAUSAR';
        const map = {1:'btn-1x', 2:'btn-2x', 4:'btn-4x'};
        if (map[gl.speed]) document.getElementById(map[gl.speed]).classList.add('active');
    }
}

function buildStorageGrid() {
    const grid = document.getElementById('storage-grid');
    if (!grid) return;
    grid.innerHTML = '';
    for (let i = 0; i < gameState.maxSpace; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.id = 'gc-' + i;
        grid.appendChild(cell);
    }
}

function renderDashboard() {
    const prof = WH_PROFILES[gameState.type];
    const hh = String(gl.hour).padStart(2,'0');
    document.getElementById('ui-day').innerText = `DIA: ${gl.day}`;
    document.getElementById('ui-cash').innerText = `CAIXA: $${gameState.cash.toLocaleString('pt-BR')}`;
    document.getElementById('ui-space').innerText = `ESPAÇO: ${gl.storage.reduce((s,i)=>s+i.vol,0)}/${gameState.maxSpace}`;
    
    const result = gl.dayRevenue - gl.dayCosts;
    document.getElementById('dre-day-lbl').innerText = `Dia ${gl.day} | ${hh}:00h`;
    document.getElementById('dre-revenue').innerText = `$${gl.dayRevenue.toLocaleString('pt-BR')}`;
    document.getElementById('dre-costs').innerText = `-$${gl.dayCosts.toLocaleString('pt-BR')}`;
    const resEl = document.getElementById('dre-result');
    resEl.innerText = `${result >= 0 ? '+' : ''}$${result.toLocaleString('pt-BR')}`;
    resEl.className = result >= 0 ? 'dre-positive' : 'dre-negative';
    document.getElementById('dre-cash').innerText = `$${gameState.cash.toLocaleString('pt-BR')}`;
    
    const occupied = [];
    gl.storage.forEach(item => {
        const ct = CARGO_TYPES[item.type];
        for(let i = 0; i < item.vol; i++) occupied.push({
            id: item.id, type: item.type,
            label: ct ? ct.label : item.cargo,
            color: ct ? ct.color : '#38bdf8'
        });
    });
    for (let i = 0; i < gameState.maxSpace; i++) {
        const cell = document.getElementById('gc-' + i);
        if (!cell) continue;
        if (i < occupied.length) {
            const p = occupied[i];
            cell.className = 'grid-cell occupied';
            cell.title = p.label;
            cell.style.borderColor = p.color;
            cell.style.backgroundColor = p.color + '1a';
            cell.innerHTML = `<div class="slot-id" style="color:${p.color}">${p.label}</div><div class="slot-sub">#${p.id.split('-')[1]}</div>`;
        } else {
            cell.className = 'grid-cell';
            cell.title = 'Vazio';
            cell.style.borderColor = '';
            cell.style.backgroundColor = '';
            cell.innerHTML = 'VAZIO';
        }
    }
    document.getElementById('grid-status').innerText = `${occupied.length}/${gameState.maxSpace}`;
    
    const inEl = document.getElementById('inbound-list');
    document.getElementById('inbound-count').innerText = gl.inbound.length + ' pendentes';
    if (gl.inbound.length === 0) {
        inEl.innerHTML = '<div class="order-empty">Aguardando<br>chegada de cargas...</div>';
    } else {
        inEl.innerHTML = gl.inbound.map(o => {
            const ct = CARGO_TYPES[o.type] || {};
            const left = getHoursLeft(o);
            const pct = Math.max(0, Math.min(100, (left / o.sla) * 100));
            const slaColor = pct > 50 ? '#4ade80' : pct > 25 ? '#fbbf24' : '#f87171';
            const urgent = pct < 30 ? 'urgent' : '';
            const critical = left <= 3 ? 'critical' : '';
            const typeColor = ct.color || '#38bdf8';
            return `<div class="order-card ${urgent} ${critical}">
                <div class="oc-top"><span class="oc-id">${o.id}</span><span class="oc-client">${o.client}</span></div>
                <div class="oc-cargo" style="color:${typeColor}">${o.cargo} <span style="color:var(--text-muted);font-size:0.72rem;font-weight:normal;">&#128230; ${o.vol} palete${o.vol > 1 ? 's' : ''}</span></div>
                <div style="display:flex;justify-content:space-between;font-size:0.7rem;margin-bottom:6px;">
                    <span style="color:var(--accent-red);">Entrada: -$${ct.inCost || 0}</span>
                    <span style="color:var(--accent-green);">Receita: +$${ct.rev || 0}</span>
                    <span style="color:var(--text-muted);">Armaz: -$${ct.storeCost || 0}/dia</span>
                </div>
                <div class="sla-label"><span>SLA Entrada</span><span>${left}h restantes</span></div>
                <div class="sla-bar"><div class="sla-fill" style="width:${pct}%;background:${slaColor}"></div></div>
                <div class="oc-footer">
                    <span class="oc-penalty">Multa: $${o.penalty.toLocaleString('pt-BR')}</span>
                    <button class="btn success btn-sm" onclick="receiveOrder('${o.id}')">Receber ▶</button>
                </div>
            </div>`;
        }).join('');
    }
    
    const outEl = document.getElementById('outbound-list');
    document.getElementById('outbound-count').innerText = gl.outbound.length + ' prontos';
    if (gl.outbound.length === 0) {
        outEl.innerHTML = '<div class="order-empty">Nenhum pedido<br>aguardando expedição.</div>';
    } else {
        outEl.innerHTML = gl.outbound.map(o => {
            const ct = CARGO_TYPES[o.type] || {};
            const left = getHoursLeft(o);
            const pct = Math.max(0, Math.min(100, (left / o.sla) * 100));
            const slaColor = pct > 50 ? '#4ade80' : pct > 25 ? '#fbbf24' : '#f87171';
            const urgent = pct < 30 ? 'urgent' : '';
            const critical = left <= 3 ? 'critical' : '';
            const stockItem = gl.storage.find(s => s.type === o.type);
            const freeVol   = stockItem ? stockItem.vol : 1;
            const hasStock = !!stockItem;
            const typeColor = ct.color || '#38bdf8';
            const stockBadge = hasStock
                ? `<span style="color:#4ade80;font-size:0.68rem;">✔ EM ESTOQUE</span>`
                : `<span style="color:#f87171;font-size:0.68rem;">✘ SEM ESTOQUE</span>`;
            const btnStyle = hasStock ? '' : 'opacity:0.4;cursor:not-allowed;';
            return `<div class="order-card ${urgent} ${critical}">
                <div class="oc-top"><span class="oc-id">${o.id}</span><span class="oc-client">${o.client}</span></div>
                <div class="oc-cargo" style="color:${typeColor}">${o.cargo} <span style="color:var(--text-muted);font-size:0.72rem;font-weight:normal;">&#128230; libera ${freeVol} palete${freeVol > 1 ? 's' : ''}</span></div>
                <div style="display:flex;justify-content:space-between;font-size:0.7rem;margin-bottom:6px;">
                    <span style="color:var(--accent-green);">Receita: +$${ct.rev || 0}</span>
                    <span style="color:var(--text-muted);">Armaz: -$${ct.storeCost || 0}/dia</span>
                </div>
                <div class="sla-label"><span>SLA Entrega</span><span>${left}h restantes</span></div>
                <div class="sla-bar"><div class="sla-fill" style="width:${pct}%;background:${slaColor}"></div></div>
                <div class="oc-footer">
                    ${stockBadge}
                    <button class="btn primary btn-sm" onclick="expediteOrder('${o.id}')" style="${btnStyle}">Expedir ▶</button>
                </div>
            </div>`;
        }).join('');
    }
    if (document.getElementById('tab-perfil').classList.contains('active')) renderProfile();
}
// ==========================================
// MÓDULO DE EVENTOS ALEATÓRIOS (FATOR CAOS)
// ==========================================
function showEventCard(title, desc, effect) {
    if (typeof setGameSpeed === 'function') setGameSpeed(0); // Pausa imediatamente o jogo
    document.getElementById('event-title').innerText = title;
    document.getElementById('event-desc').innerText = desc;
    document.getElementById('event-effect').innerText = effect;
    document.getElementById('modal-event').classList.remove('hidden');
}
// ==========================================
// TELA DE VITÓRIA (ENDGAME)
// ==========================================
function showVictoryScreen(finalCash) {
    if (typeof setGameSpeed === 'function') setGameSpeed(0); // Trava o jogo imediatamente
    document.getElementById('victory-cash').innerText = `$${finalCash.toLocaleString('pt-BR')}`;
    document.getElementById('modal-victory').classList.remove('hidden');
}