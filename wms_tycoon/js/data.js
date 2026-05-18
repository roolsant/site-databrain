// ==========================================
// DATA.JS — Constantes de dados brutos do jogo
// Carregado primeiro: sem dependências externas
// ==========================================

const CARGO_TYPES = {
    'ALIM': { label: 'ALIMENTOS', color: '#4ade80', inCost: 15,  storeCost: 8,  rev: 80  },
    'ELET': { label: 'ELETRÔN.',  color: '#38bdf8', inCost: 30,  storeCost: 5,  rev: 200 },
    'TEXT': { label: 'TÊXTIL',    color: '#a78bfa', inCost: 10,  storeCost: 1,  rev: 60  },
    'AUTO': { label: 'AUTOMOTIV', color: '#fbbf24', inCost: 25,  storeCost: 3,  rev: 120 },
    'FARM': { label: 'FARMACÊUT', color: '#fb7185', inCost: 20,  storeCost: 4,  rev: 150 },
    'HIGI': { label: 'HIGIENE',   color: '#6ee7b7', inCost: 12,  storeCost: 2,  rev: 70  },
    'TECH': { label: 'HIGH-TECH', color: '#38bdf8', inCost: 40,  storeCost: 10, rev: 300 },
    'MODA': { label: 'MODA',      color: '#f472b6', inCost: 20,  storeCost: 2,  rev: 100 },
    'ECOM': { label: 'E-COMMERC', color: '#fbbf24', inCost: 18,  storeCost: 3,  rev: 90  },
    'COSM': { label: 'COSMÉTIC.', color: '#fb923c', inCost: 15,  storeCost: 2,  rev: 80  },
};

const WH_PROFILES = {
    'Massa Falida': {
        dailyCost: 1800, penalty: 200,
        slaHoursInbound: 24, slaHoursOutbound: 24,
        inboundChance: 0.38, outboundChance: 0.34,
        clients: ['Transportes Silva', 'Log Express', 'Carga Rápida Sul'],
        cargos: ['ALIM', 'ELET', 'TEXT']
    },
    'Estagnada': {
        dailyCost: 3200, penalty: 350,
        slaHoursInbound: 18, slaHoursOutbound: 18,
        inboundChance: 0.52, outboundChance: 0.48,
        clients: ['Grupo Mercantil', 'ViaLog Brasil', 'TransPrime', 'CargoPrime'],
        cargos: ['AUTO', 'FARM', 'ALIM', 'HIGI']
    },
    'Premium': {
        dailyCost: 7200, penalty: 500,
        slaHoursInbound: 12, slaHoursOutbound: 12,
        inboundChance: 0.68, outboundChance: 0.63,
        clients: ['Amazon Logística', 'Mercado Livre BR', 'Via Varejo', 'Magazine Log', 'B2W Supply'],
        cargos: ['TECH', 'MODA', 'ECOM', 'COSM', 'ELET']
    }
};

const UPGRADE_CATALOG = [
    { key: 'forklift', cost: 12000, icon: '🚜', title: 'Empilhadeiras Elétricas',   desc: 'Reduz o custo diário de armazenamento em 50%.',              detail: '-50% storeCost/dia' },
    { key: 'ai_wms',   cost: 25000, icon: '🧠', title: 'WMS Cognitivo com IA',       desc: 'Otimiza roteirização, garantindo +4h de folga em todos os SLAs.', detail: '+4h SLA (in+out)' },
    { key: 'training', cost:  8000, icon: '🏆', title: 'Treinamento Avançado',       desc: 'Reduz o valor de todas as multas em 20% permanentemente.',    detail: '-20% multas' },
];

const rhReasonsList = [
    { id: "salary",    title: "Motivo: Salário Defasado",               desc: "Defina quando e de quanto será o aumento salarial. Falhar significa perda de funcionários." },
    { id: "overwork",  title: "Motivo: Excesso de Carga de Trabalho",   desc: "Defina quando e quantos novos funcionários você irá contratar para aliviar o turno." },
    { id: "resources", title: "Motivo: Falta de Recursos Operacionais", desc: "Defina quando e qual será a verba ($) para compra de novos equipamentos." }
];
