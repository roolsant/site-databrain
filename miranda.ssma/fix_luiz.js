const fs = require('fs');
const dataStr = fs.readFileSync('data.js', 'utf8');
const match = dataStr.match(/const AUDIT_DATA = (\[[\s\S]*?\]);/);
let data = eval(match[1]);

// Luiz Guimenez has 2 visits in Julho: 21/07 and 27/07
const luiz = data.find(c => c.id === 'luiz');
function visitExists(company, date) {
  return company.visitas.some(v => v.dataAuditoria === date);
}
function buildChecklist(doc, est, comp) {
  return {
    documental: {
      registro: { status: doc.registro || 'pendente', desc: 'Verificado no relatório.' },
      aso: { status: doc.aso || 'pendente', desc: 'Verificado no relatório.' },
      pgr: { status: doc.pgr || 'pendente', desc: 'Verificado no relatório.' },
      treinamentos: { status: doc.treinamentos || 'pendente', desc: 'Verificado no relatório.' },
      fichas_epi: { status: doc.fichas_epi || 'pendente', desc: 'Verificado no relatório.' },
      os: { status: doc.os || 'pendente', desc: 'Verificado no relatório.' },
      integracao: { status: doc.integracao || 'pendente', desc: 'Verificado no relatório.' }
    },
    estrutural: {
      refeicao: { status: est.refeicao || 'pendente', desc: 'Inspeção estrutural.' },
      banheiro: { status: est.banheiro || 'pendente', desc: 'Inspeção estrutural.' },
      epi_fornecimento: { status: est.epi_fornecimento || 'pendente', desc: 'Inspeção estrutural.' },
      seguranca_geral: { status: est.seguranca_geral || 'pendente', desc: 'Inspeção estrutural.' }
    },
    comportamento: {
      uso_epi: { status: comp.uso_epi || 'pendente', desc: 'Inspeção comportamental.' },
      comportamento_seguro: { status: comp.comportamento_seguro || 'pendente', desc: 'Inspeção comportamental.' }
    }
  };
}

if (luiz && !visitExists(luiz, '27/07/2026')) {
  luiz.visitas.push({
    dataAuditoria: '27/07/2026',
    scores: { estrutural: 70, documental: 80, comportamental: 90, global: 80 },
    checklist: buildChecklist(
      { registro: 'conforme', aso: 'conforme', pgr: 'conforme', treinamentos: 'conforme', fichas_epi: 'conforme', os: 'conforme', integracao: 'conforme' },
      { refeicao: 'conforme', banheiro: 'conforme', epi_fornecimento: 'conforme', seguranca_geral: 'conforme' },
      { uso_epi: 'conforme', comportamento_seguro: 'conforme' }
    ),
    planoAcao: [
      { acao: 'Manter atualização contínua da documentação e uso de EPIs', criticidade: 'Moderado', prazo: 'Contínuo', status: 'Em andamento' }
    ]
  });
  console.log('✓ Luiz - 27/07 adicionado');
}

const newStr = dataStr.replace(/const AUDIT_DATA = \[[\s\S]*?\];/, 'const AUDIT_DATA = ' + JSON.stringify(data, null, 2) + ';');
fs.writeFileSync('data.js', newStr);
console.log('✅ data.js salvo');
