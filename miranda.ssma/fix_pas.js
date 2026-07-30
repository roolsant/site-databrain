const fs = require('fs');
let dataStr = fs.readFileSync('data.js', 'utf8');

const itemToName = {
  registro: "Registro", aso: "ASO", pgr: "PGR", treinamentos: "Treinamentos", fichas_epi: "Fichas de EPI", os: "Ordem de Serviço", integracao: "Integração",
  refeicao: "Área de Refeição", banheiro: "Banheiro", epi_fornecimento: "Fornecimento de EPI", seguranca_geral: "Segurança Geral",
  uso_epi: "Uso de EPI", comportamento_seguro: "Comportamento Seguro"
};

const match = dataStr.match(/const AUDIT_DATA = (\[[\s\S]*?\]);/);
if (match) {
  let data = eval(match[1]);
  data.forEach(c => {
    c.visitas.forEach(v => {
      let ncs = [];
      for (let cat in v.checklist) {
        for (let item in v.checklist[cat]) {
          if (v.checklist[cat][item].status === 'nao_conforme' || v.checklist[cat][item].status === 'Não Conforme') {
            ncs.push(item);
          }
        }
      }
      
      // If we have more NCs than PAs, or just to be safe, let's ensure EVERY NC has a PA mentioning it
      ncs.forEach(nc => {
        const readable = itemToName[nc] || nc;
        // Check if any existing PA mentions this readable name or something similar
        let exists = false;
        if(v.planoAcao) {
           exists = v.planoAcao.some(pa => pa.acao.toLowerCase().includes(readable.toLowerCase()));
        } else {
           v.planoAcao = [];
        }
        if (!exists) {
           v.planoAcao.push({
             acao: `Adequar / Regularizar: ${readable}`,
             criticidade: 'Moderado',
             prazo: '15 dias',
             status: 'Pendente'
           });
        }
      });
    });
  });
  
  const newStr = dataStr.replace(/const AUDIT_DATA = \[[\s\S]*?\];/, 'const AUDIT_DATA = ' + JSON.stringify(data, null, 2) + ';');
  fs.writeFileSync('data.js', newStr);
  console.log('Synced NCs with PAs');
}
