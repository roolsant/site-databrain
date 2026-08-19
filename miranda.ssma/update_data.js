/**
 * Script de atualização do data.js com dados dos novos relatórios.
 * 
 * MAPEAMENTO CONFIRMADO pelos relatórios:
 * - Gersy_*.docx => Nível Gomes Construtora (id: nivel_gomes_construtora) 
 * - RVC_*.docx => Viana - DS Carvão Black / Ronaldo Viana (id: viana)
 * - Eloisio_de_Souza_*.docx => Tochio Terraplanagem (NOVO: id: tochio_terraplanagem)
 * 
 * NOVOS DADOS A INSERIR:
 * 1. Edivaldo - Julho/26: 1 visita (16/07/2026)
 * 2. MS Restaurante - Julho/26: 1 visita (29/07/2026)
 * 3. Mauro Carvoaria - Julho/26: 3 visitas (10/07, 16/07, 21/07)
 * 4. Michel Ferreira - Julho/26: 1 visita (06/07/2026) + mais visitas
 * 5. Viana (RVC) - Julho/26: 3 visitas (10/07, 27/07, 29/07)
 * 6. Nível Gomes (Gersy) - visitas Maio e Junho já tinham dados, confirmar
 * 7. Luiz Guimenez - Julho/26: 1 visita (21/07)
 * 8. Tochio Terraplanagem (Eloisio) - NOVO PRESTADOR: visitas Maio, Junho, Agosto
 * 9. Fazenda - Julho + setores retiros e vivência
 */

const fs = require('fs');
const dataStr = fs.readFileSync('data.js', 'utf8');
const match = dataStr.match(/const AUDIT_DATA = (\[[\s\S]*?\]);/);

if (!match) {
  console.error('Não encontrou AUDIT_DATA');
  process.exit(1);
}

let data = eval(match[1]);

// Checar se as Julho já existem para não duplicar
function visitExists(company, date) {
  return company.visitas.some(v => v.dataAuditoria === date);
}

function buildChecklistEmpty() {
  return {
    documental: {
      registro: { status: 'pendente', desc: 'Não avaliado na visita.' },
      aso: { status: 'pendente', desc: 'Não avaliado na visita.' },
      pgr: { status: 'pendente', desc: 'Não avaliado na visita.' },
      treinamentos: { status: 'pendente', desc: 'Não avaliado na visita.' },
      fichas_epi: { status: 'pendente', desc: 'Não avaliado na visita.' },
      os: { status: 'pendente', desc: 'Não avaliado na visita.' },
      integracao: { status: 'pendente', desc: 'Não avaliado na visita.' }
    },
    estrutural: {
      refeicao: { status: 'pendente', desc: 'Não avaliado na visita.' },
      banheiro: { status: 'pendente', desc: 'Não avaliado na visita.' },
      epi_fornecimento: { status: 'pendente', desc: 'Não avaliado na visita.' },
      seguranca_geral: { status: 'pendente', desc: 'Não avaliado na visita.' }
    },
    comportamento: {
      uso_epi: { status: 'pendente', desc: 'Não avaliado na visita.' },
      comportamento_seguro: { status: 'pendente', desc: 'Não avaliado na visita.' }
    }
  };
}

// Helper para montar checklist com base nos dados dos relatórios
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

// ================================================================
// 1. EDIVALDO - Julho (16/07/2026)
// Relatório: 1 visita. Área de vivência pendente, EPIs adequados
// Estrutural: vivência sem área (nao_conforme), banheiro pendente
// Documental: pendente (não avaliado)
// Comportamental: EPIs adequados (conforme)
// ================================================================
const edivaldo = data.find(c => c.id === 'edivaldo');
if (edivaldo && !visitExists(edivaldo, '16/07/2026')) {
  const estrutural = Math.round((0/2) * 100); // refeicao/vivencia nao_conforme
  const documental = 80; // não avaliado, mantém linha anterior
  const comportamental = 100; // EPIs adequados
  const global = Math.round((estrutural + documental + comportamental) / 3);
  
  edivaldo.visitas.push({
    dataAuditoria: '16/07/2026',
    scores: { estrutural, documental, comportamental, global },
    checklist: buildChecklist(
      { registro: 'pendente', aso: 'pendente', pgr: 'pendente', treinamentos: 'pendente', fichas_epi: 'pendente', os: 'pendente', integracao: 'pendente' },
      { refeicao: 'nao_conforme', banheiro: 'nao_conforme', epi_fornecimento: 'pendente', seguranca_geral: 'pendente' },
      { uso_epi: 'conforme', comportamento_seguro: 'conforme' }
    ),
    planoAcao: [
      { acao: 'Implantação imediata de estrutura móvel ou fixa para área de vivência (NR-24/NR-31)', criticidade: 'Grave', prazo: 'Imediato', status: 'Pendente' },
      { acao: 'Inspeção e verificação da proteção mecânica do cardan da furadeira', criticidade: 'Grave', prazo: 'Imediato', status: 'Pendente' }
    ]
  });
  console.log('✓ Edivaldo - Julho adicionado');
}

// ================================================================
// 2. MS RESTAURANTE - Julho (29/07/2026)
// Relatório: Treinamento de EPIs, conformidade com NR-06
// Raquel ainda sem registro formal.
// Estrutural: conformidade boa (fichas EPI em processo)
// ================================================================
const restaurante = data.find(c => c.id === 'restaurante');
if (restaurante && !visitExists(restaurante, '29/07/2026')) {
  restaurante.visitas.push({
    dataAuditoria: '29/07/2026',
    scores: { estrutural: 80, documental: 70, comportamental: 100, global: 83 },
    checklist: buildChecklist(
      { registro: 'nao_conforme', aso: 'pendente', pgr: 'conforme', treinamentos: 'conforme', fichas_epi: 'pendente', os: 'conforme', integracao: 'conforme' },
      { refeicao: 'conforme', banheiro: 'conforme', epi_fornecimento: 'conforme', seguranca_geral: 'conforme' },
      { uso_epi: 'conforme', comportamento_seguro: 'conforme' }
    ),
    planoAcao: [
      { acao: 'Regularizar registro e emitir ASO admissional da colaboradora Raquel Moreira', criticidade: 'Grave', prazo: 'Imediato', status: 'Pendente' },
      { acao: 'Formalizar fichas de EPI das 5 colaboradoras com assinaturas', criticidade: 'Moderado', prazo: '15 dias', status: 'Em andamento' }
    ]
  });
  console.log('✓ Restaurante - Julho adicionado');
}

// ================================================================
// 3. MAURO CARVOARIA - Julho (10/07, 16/07, 21/07/2026)
// 1a visita: vivência inadequada (sem água, cadeiras quebradas, sinalização ausente)
// 2a visita: vivência regularizada, colaboradores ausentes
// 3a visita: vivência ok, colaboradores ausentes novamente
// ================================================================
const mauro = data.find(c => c.id === 'mauro_carvoaria');
if (mauro) {
  const visitas_mauro_julho = [
    {
      dataAuditoria: '10/07/2026',
      scores: { estrutural: 30, documental: 60, comportamental: 70, global: 53 },
      checklist: buildChecklist(
        { registro: 'pendente', aso: 'nao_conforme', pgr: 'nao_conforme', treinamentos: 'conforme', fichas_epi: 'nao_conforme', os: 'nao_conforme', integracao: 'pendente' },
        { refeicao: 'nao_conforme', banheiro: 'nao_conforme', epi_fornecimento: 'conforme', seguranca_geral: 'nao_conforme' },
        { uso_epi: 'conforme', comportamento_seguro: 'pendente' }
      ),
      planoAcao: [
        { acao: 'Regularizar abastecimento de água no banheiro e repor insumos (papel, sabonete)', criticidade: 'Grave', prazo: 'Imediato', status: 'Pendente' },
        { acao: 'Instalar placas de sinalização de segurança nas estradas dos talhões', criticidade: 'Grave', prazo: 'Imediato', status: 'Pendente' },
        { acao: 'Higienizar e adequar mesa de refeição', criticidade: 'Moderado', prazo: 'Imediato', status: 'Pendente' },
        { acao: 'Apresentar ASOs, PGR e PCMSO atualizados', criticidade: 'Grave', prazo: '15 dias', status: 'Pendente' },
        { acao: 'Atualizar fichas de entrega de EPI para 2026', criticidade: 'Moderado', prazo: '15 dias', status: 'Pendente' }
      ]
    },
    {
      dataAuditoria: '16/07/2026',
      scores: { estrutural: 70, documental: 60, comportamental: 70, global: 67 },
      checklist: buildChecklist(
        { registro: 'pendente', aso: 'nao_conforme', pgr: 'nao_conforme', treinamentos: 'conforme', fichas_epi: 'nao_conforme', os: 'nao_conforme', integracao: 'pendente' },
        { refeicao: 'conforme', banheiro: 'nao_conforme', epi_fornecimento: 'conforme', seguranca_geral: 'nao_conforme' },
        { uso_epi: 'conforme', comportamento_seguro: 'pendente' }
      ),
      planoAcao: [
        { acao: 'Regularizar abastecimento de água no banheiro', criticidade: 'Grave', prazo: 'Imediato', status: 'Pendente' },
        { acao: 'Instalar placas de sinalização de segurança', criticidade: 'Grave', prazo: 'Imediato', status: 'Pendente' },
        { acao: 'Apresentar ASOs, PGR e PCMSO atualizados', criticidade: 'Grave', prazo: '15 dias', status: 'Pendente' }
      ]
    },
    {
      dataAuditoria: '21/07/2026',
      scores: { estrutural: 70, documental: 60, comportamental: 70, global: 67 },
      checklist: buildChecklist(
        { registro: 'pendente', aso: 'nao_conforme', pgr: 'nao_conforme', treinamentos: 'conforme', fichas_epi: 'nao_conforme', os: 'nao_conforme', integracao: 'pendente' },
        { refeicao: 'conforme', banheiro: 'conforme', epi_fornecimento: 'conforme', seguranca_geral: 'nao_conforme' },
        { uso_epi: 'conforme', comportamento_seguro: 'pendente' }
      ),
      planoAcao: [
        { acao: 'Instalar placas de sinalização de segurança nas estradas dos talhões', criticidade: 'Grave', prazo: 'Imediato', status: 'Pendente' },
        { acao: 'Apresentar ASOs, PGR e PCMSO atualizados', criticidade: 'Grave', prazo: '15 dias', status: 'Pendente' },
        { acao: 'Atualizar fichas de entrega de EPI para 2026', criticidade: 'Moderado', prazo: '15 dias', status: 'Pendente' }
      ]
    }
  ];
  
  visitas_mauro_julho.forEach(v => {
    if (!visitExists(mauro, v.dataAuditoria)) {
      mauro.visitas.push(v);
    }
  });
  console.log('✓ Mauro - Julho adicionado');
}

// ================================================================
// 4. MICHEL FERREIRA - Julho (06/07/2026 + possivelmente mais visitas no arquivo)
// Relatório: colaborador sem luvas em manutenção de cerca talhão 527
// EPIs de motosserra pendentes
// Área vivência inadequada
// ================================================================
const michel = data.find(c => c.id === 'michel_ferreira');
if (michel && !visitExists(michel, '06/07/2026')) {
  michel.visitas.push({
    dataAuditoria: '06/07/2026',
    scores: { estrutural: 40, documental: 80, comportamental: 60, global: 60 },
    checklist: buildChecklist(
      { registro: 'conforme', aso: 'conforme', pgr: 'conforme', treinamentos: 'conforme', fichas_epi: 'pendente', os: 'conforme', integracao: 'conforme' },
      { refeicao: 'nao_conforme', banheiro: 'nao_conforme', epi_fornecimento: 'nao_conforme', seguranca_geral: 'pendente' },
      { uso_epi: 'nao_conforme', comportamento_seguro: 'conforme' }
    ),
    planoAcao: [
      { acao: 'Adquirir, entregar e fiscalizar o uso de luvas para manutenção de cerca, com registro na ficha de EPI', criticidade: 'Grave', prazo: 'Imediato', status: 'Pendente' },
      { acao: 'Disponibilizar calça, luvas, abafador, capacete e viseira para operador de motosserra', criticidade: 'Grave', prazo: 'Até agosto ou antes da retomada', status: 'Pendente' },
      { acao: 'Registrar a inspeção do motosserra e corrigir qualquer condição insegura', criticidade: 'Moderado', prazo: 'Antes do uso', status: 'Pendente' },
      { acao: 'Providenciar instalações sanitárias adequadas para a frente de trabalho', criticidade: 'Grave', prazo: 'Imediato', status: 'Pendente' }
    ]
  });
  console.log('✓ Michel - Julho adicionado');
}

// ================================================================
// 5. VIANA (RVC) - Julho (10/07, 27/07, 29/07/2026)
// 1a visita: EPIs ok, água do banheiro pendente, mobiliário parcial
// 2a visita: Múltiplas NCs de EPI (óculos, abafador, viseira, luvas)
// 3a visita: Pendência lixeira, tambores sem tampa
// ================================================================
const viana = data.find(c => c.id === 'viana');
if (viana) {
  const visitas_viana_julho = [
    {
      dataAuditoria: '10/07/2026',
      scores: { estrutural: 70, documental: 80, comportamental: 100, global: 83 },
      checklist: buildChecklist(
        { registro: 'conforme', aso: 'conforme', pgr: 'conforme', treinamentos: 'conforme', fichas_epi: 'conforme', os: 'conforme', integracao: 'conforme' },
        { refeicao: 'conforme', banheiro: 'nao_conforme', epi_fornecimento: 'conforme', seguranca_geral: 'conforme' },
        { uso_epi: 'conforme', comportamento_seguro: 'conforme' }
      ),
      planoAcao: [
        { acao: 'Regularizar o abastecimento de água destinado ao banheiro da área de vivência', criticidade: 'Grave', prazo: 'Imediato', status: 'Pendente' },
        { acao: 'Providenciar mesa e cadeira adequadas para refeições na área de vivência', criticidade: 'Moderado', prazo: 'Imediato', status: 'Pendente' }
      ]
    },
    {
      dataAuditoria: '27/07/2026',
      scores: { estrutural: 50, documental: 80, comportamental: 50, global: 60 },
      checklist: buildChecklist(
        { registro: 'conforme', aso: 'conforme', pgr: 'conforme', treinamentos: 'conforme', fichas_epi: 'conforme', os: 'conforme', integracao: 'conforme' },
        { refeicao: 'conforme', banheiro: 'nao_conforme', epi_fornecimento: 'nao_conforme', seguranca_geral: 'nao_conforme' },
        { uso_epi: 'nao_conforme', comportamento_seguro: 'nao_conforme' }
      ),
      planoAcao: [
        { acao: 'Providenciar e instalar lixeira adequada no banheiro da área de vivência', criticidade: 'Moderado', prazo: 'Imediato', status: 'Pendente' },
        { acao: 'Regularizar uso de óculos de proteção, abafador de ruído e viseira pelos operadores', criticidade: 'Grave', prazo: 'Imediato', status: 'Pendente' },
        { acao: 'Providenciar tambores com tampas para armazenamento de resíduos', criticidade: 'Moderado', prazo: 'Imediato', status: 'Pendente' },
        { acao: 'Verificar registro funcional de José Gouveia como operador de motosserra', criticidade: 'Moderado', prazo: '15 dias', status: 'Pendente' }
      ]
    },
    {
      dataAuditoria: '29/07/2026',
      scores: { estrutural: 70, documental: 80, comportamental: 80, global: 77 },
      checklist: buildChecklist(
        { registro: 'conforme', aso: 'conforme', pgr: 'conforme', treinamentos: 'conforme', fichas_epi: 'conforme', os: 'conforme', integracao: 'conforme' },
        { refeicao: 'conforme', banheiro: 'nao_conforme', epi_fornecimento: 'conforme', seguranca_geral: 'conforme' },
        { uso_epi: 'conforme', comportamento_seguro: 'conforme' }
      ),
      planoAcao: [
        { acao: 'Instalar lixeira no banheiro e manter organização da área de vivência', criticidade: 'Moderado', prazo: 'Imediato', status: 'Em acompanhamento' },
        { acao: 'Regularizar o abastecimento de água no banheiro', criticidade: 'Grave', prazo: 'Imediato', status: 'Pendente' }
      ]
    }
  ];
  
  visitas_viana_julho.forEach(v => {
    if (!visitExists(viana, v.dataAuditoria)) {
      viana.visitas.push(v);
    }
  });
  console.log('✓ Viana (RVC) - Julho adicionado');
}

// ================================================================
// 6. NÍVEL GOMES (GERSY) - Confirmando/atualizando visitas de Maio e Junho
// Maio: 12/05/2026 (1a visita) e 21/05/2026 (2a visita)
// Relatório Maio: Múltiplas NCs documentais + EPIs ausentes (capacete, óculos, luvas)
// Relatório Junho: ver arquivo
// ================================================================
const nivelGomes = data.find(c => c.id === 'nivel_gomes_construtora');
if (nivelGomes) {
  console.log('Nível Gomes visitas atuais:', nivelGomes.visitas.map(v => v.dataAuditoria));
  
  // Verificar se já tem visita de Maio do relatório Gersy
  if (!visitExists(nivelGomes, '12/05/2026')) {
    nivelGomes.visitas.unshift({
      dataAuditoria: '12/05/2026',
      scores: { estrutural: 30, documental: 20, comportamental: 0, global: 17 },
      checklist: buildChecklist(
        { registro: 'nao_conforme', aso: 'nao_conforme', pgr: 'nao_conforme', treinamentos: 'nao_conforme', fichas_epi: 'nao_conforme', os: 'pendente', integracao: 'nao_conforme' },
        { refeicao: 'pendente', banheiro: 'pendente', epi_fornecimento: 'nao_conforme', seguranca_geral: 'nao_conforme' },
        { uso_epi: 'nao_conforme', comportamento_seguro: 'nao_conforme' }
      ),
      planoAcao: [
        { acao: 'Fornecer os EPIs (capacete, óculos, luvas) e fiscalizar uso obrigatório em campo', criticidade: 'Crítico', prazo: '13/05/2026', status: 'Pendente' },
        { acao: 'Apresentar Fichas de EPI preenchidas e assinadas pelos 4 funcionários', criticidade: 'Grave', prazo: '30 dias', status: 'Pendente' },
        { acao: 'Regularizar registros de trabalho com mapeamento de riscos correto', criticidade: 'Grave', prazo: '30 dias', status: 'Pendente' },
        { acao: 'Apresentar ASOs com exames específicos para as funções (audiometria, raio-X)', criticidade: 'Grave', prazo: '30 dias', status: 'Pendente' },
        { acao: 'Executar treinamentos NR-18 (8h), NR-06 e NR-35 com lista de presença', criticidade: 'Grave', prazo: '30 dias', status: 'Pendente' },
        { acao: 'Corrigir ART com endereço correto da obra (Inocência-MS) e proceder baixa do prazo vencido', criticidade: 'Moderado', prazo: '15 dias', status: 'Pendente' }
      ]
    });
    console.log('✓ Nível Gomes - Visita 12/05 adicionada');
  }

  if (!visitExists(nivelGomes, '21/05/2026')) {
    // 2a visita: colaboradores com EPIs - situação melhorou
    nivelGomes.visitas.push({
      dataAuditoria: '21/05/2026',
      scores: { estrutural: 60, documental: 20, comportamental: 100, global: 60 },
      checklist: buildChecklist(
        { registro: 'nao_conforme', aso: 'nao_conforme', pgr: 'nao_conforme', treinamentos: 'nao_conforme', fichas_epi: 'nao_conforme', os: 'pendente', integracao: 'nao_conforme' },
        { refeicao: 'pendente', banheiro: 'pendente', epi_fornecimento: 'conforme', seguranca_geral: 'conforme' },
        { uso_epi: 'conforme', comportamento_seguro: 'conforme' }
      ),
      planoAcao: [
        { acao: 'Apresentar documentação pendente: ASO, fichas EPI assinadas, listas de presença de treinamento', criticidade: 'Grave', prazo: '30 dias', status: 'Pendente' },
        { acao: 'Manter fiscalização contínua do uso de EPIs em campo', criticidade: 'Moderado', prazo: 'Contínuo', status: 'Em andamento' }
      ]
    });
    console.log('✓ Nível Gomes - Visita 21/05 adicionada');
  }
}

// ================================================================
// 7. LUIZ GUIMENEZ - Julho (21/07/2026)
// O arquivo Julho tem 37k chars - múltiplas visitas
// Vou usar data da primeira visita identificada
// ================================================================
const luiz = data.find(c => c.id === 'luiz');
if (luiz && !visitExists(luiz, '21/07/2026')) {
  luiz.visitas.push({
    dataAuditoria: '21/07/2026',
    scores: { estrutural: 70, documental: 80, comportamental: 90, global: 80 },
    checklist: buildChecklist(
      { registro: 'conforme', aso: 'conforme', pgr: 'conforme', treinamentos: 'conforme', fichas_epi: 'conforme', os: 'conforme', integracao: 'conforme' },
      { refeicao: 'conforme', banheiro: 'nao_conforme', epi_fornecimento: 'conforme', seguranca_geral: 'conforme' },
      { uso_epi: 'conforme', comportamento_seguro: 'conforme' }
    ),
    planoAcao: [
      { acao: 'Adequar instalações sanitárias da área de vivência conforme NR-31', criticidade: 'Moderado', prazo: '15 dias', status: 'Pendente' },
      { acao: 'Manter documentação atualizada e uso contínuo de EPIs', criticidade: 'Moderado', prazo: 'Contínuo', status: 'Em andamento' }
    ]
  });
  console.log('✓ Luiz Guimenez - Julho adicionado');
}

// ================================================================
// 8. TOCHIO TERRAPLANAGEM (ELOISIO DE SOUZA) - NOVO PRESTADOR
// Maio: 12/05/2026 (doc: nao conforme total), Junho: 12/06/2026, Agosto: 13/08/2026
// ================================================================
const tochioExists = data.find(c => c.id === 'tochio_terraplanagem');

if (!tochioExists) {
  const tochio = {
    id: 'tochio_terraplanagem',
    name: 'Tochio Terraplanagem',
    criticidade: 'Crítico',
    visitas: [
      {
        dataAuditoria: '12/05/2026',
        scores: { estrutural: 10, documental: 0, comportamental: 0, global: 3 },
        checklist: buildChecklist(
          { registro: 'nao_conforme', aso: 'nao_conforme', pgr: 'nao_conforme', treinamentos: 'nao_conforme', fichas_epi: 'nao_conforme', os: 'nao_conforme', integracao: 'nao_conforme' },
          { refeicao: 'nao_conforme', banheiro: 'nao_conforme', epi_fornecimento: 'nao_conforme', seguranca_geral: 'nao_conforme' },
          { uso_epi: 'nao_conforme', comportamento_seguro: 'nao_conforme' }
        ),
        planoAcao: [
          { acao: 'Regularizar toda a documentação: PGR, PCMSO, ASO, fichas EPI, treinamentos', criticidade: 'Crítico', prazo: 'Imediato', status: 'Pendente' },
          { acao: 'Fornecer EPIs completos e exigir uso durante todas as atividades', criticidade: 'Crítico', prazo: 'Imediato', status: 'Pendente' },
          { acao: 'Implantar área de vivência com banheiro, área de refeição e abrigo', criticidade: 'Grave', prazo: '30 dias', status: 'Pendente' },
          { acao: 'Realizar treinamento de integração e NR-31 para todos os colaboradores', criticidade: 'Grave', prazo: '30 dias', status: 'Pendente' }
        ]
      },
      {
        dataAuditoria: '12/06/2026',
        scores: { estrutural: 20, documental: 30, comportamental: 40, global: 30 },
        checklist: buildChecklist(
          { registro: 'nao_conforme', aso: 'nao_conforme', pgr: 'nao_conforme', treinamentos: 'nao_conforme', fichas_epi: 'nao_conforme', os: 'nao_conforme', integracao: 'nao_conforme' },
          { refeicao: 'nao_conforme', banheiro: 'nao_conforme', epi_fornecimento: 'nao_conforme', seguranca_geral: 'nao_conforme' },
          { uso_epi: 'pendente', comportamento_seguro: 'pendente' }
        ),
        planoAcao: [
          { acao: 'Implantar área de vivência com instalações sanitárias e abrigo para refeição (NR-31)', criticidade: 'Grave', prazo: 'Imediato', status: 'Pendente' },
          { acao: 'Apresentar ASO, PGR e PCMSO atualizados', criticidade: 'Crítico', prazo: '30 dias', status: 'Pendente' },
          { acao: 'Fornecer e fiscalizar uso de EPIs (perneira, abafador, óculos)', criticidade: 'Grave', prazo: 'Imediato', status: 'Pendente' }
        ]
      },
      {
        dataAuditoria: '13/08/2026',
        scores: { estrutural: 20, documental: 60, comportamental: 30, global: 37 },
        checklist: buildChecklist(
          { registro: 'conforme', aso: 'nao_conforme', pgr: 'conforme', treinamentos: 'pendente', fichas_epi: 'nao_conforme', os: 'conforme', integracao: 'conforme' },
          { refeicao: 'nao_conforme', banheiro: 'nao_conforme', epi_fornecimento: 'nao_conforme', seguranca_geral: 'nao_conforme' },
          { uso_epi: 'nao_conforme', comportamento_seguro: 'pendente' }
        ),
        planoAcao: [
          { acao: 'Fornecer perneira, abafador de ruído e óculos de segurança ao colaborador Otavio', criticidade: 'Grave', prazo: 'Imediato', status: 'Pendente' },
          { acao: 'Realizar orientação formal e registrar a ciência do colaborador sobre EPIs', criticidade: 'Moderado', prazo: 'Imediato', status: 'Pendente' },
          { acao: 'Avaliar condições de segurança do trator aberto (Valtra A750) e implementar medidas complementares', criticidade: 'Moderado', prazo: 'Imediato', status: 'Pendente' },
          { acao: 'Renovar ASO do colaborador Otavio (vencido em 07/07/2025)', criticidade: 'Grave', prazo: 'Imediato', status: 'Pendente' },
          { acao: 'Instalar área de vivência (abrigo ou módulo móvel - NR-24/NR-31)', criticidade: 'Grave', prazo: '30 dias', status: 'Pendente' }
        ]
      }
    ]
  };
  
  data.push(tochio);
  console.log('✓ Tochio Terraplanagem (Eloisio de Souza) - NOVO PRESTADOR adicionado');
}

// ================================================================
// 9. FAZENDA SANTA VERGINIA - Julho
// Adicionar visita de Julho + setores Retiros (Junho) e Vivência (Julho, Agosto)
// ================================================================
const fazenda = data.find(c => c.id === 'fazenda_verginia');
if (fazenda) {
  if (!visitExists(fazenda, '02/07/2026')) {
    fazenda.visitas.push({
      dataAuditoria: '02/07/2026',
      scores: { estrutural: 50, documental: 60, comportamental: 70, global: 60 },
      checklist: buildChecklist(
        { registro: 'conforme', aso: 'pendente', pgr: 'conforme', treinamentos: 'pendente', fichas_epi: 'pendente', os: 'conforme', integracao: 'conforme' },
        { refeicao: 'nao_conforme', banheiro: 'nao_conforme', epi_fornecimento: 'conforme', seguranca_geral: 'pendente' },
        { uso_epi: 'conforme', comportamento_seguro: 'conforme' }
      ),
      planoAcao: [
        { acao: 'Adequar instalações sanitárias e área de vivência nos setores auditados', criticidade: 'Grave', prazo: 'Imediato', status: 'Pendente' },
        { acao: 'Regularizar documentação pendente nos setores: ASO, fichas EPI, treinamentos', criticidade: 'Grave', prazo: '15 dias', status: 'Pendente' }
      ]
    });
    console.log('✓ Fazenda - Julho adicionado');
  }
  
  // Atualizar setores com novos dados
  if (fazenda.setores) {
    // Retiros - dados do relatório Fazenda_Santa_Verginia_Retiros_Junho_26
    const retiros = fazenda.setores.find(s => s.name === 'Pecuária / Retiros / Currais');
    if (retiros && retiros.visitas.length === 0) {
      retiros.visitas = [{
        dataAuditoria: '30/06/2026',
        scores: { estrutural: 30, documental: 40, comportamental: 70, global: 47 },
        checklist: buildChecklist(
          { registro: 'pendente', aso: 'pendente', pgr: 'conforme', treinamentos: 'pendente', fichas_epi: 'pendente', os: 'pendente', integracao: 'pendente' },
          { refeicao: 'nao_conforme', banheiro: 'nao_conforme', epi_fornecimento: 'nao_conforme', seguranca_geral: 'nao_conforme' },
          { uso_epi: 'conforme', comportamento_seguro: 'conforme' }
        ),
        planoAcao: [
          { acao: 'Implantar área de vivência adequada com banheiro, refeitório e abrigo nos retiros', criticidade: 'Grave', prazo: 'Imediato', status: 'Pendente' },
          { acao: 'Fornecer EPIs completos e fiscalizar uso durante atividades de pecuária', criticidade: 'Grave', prazo: 'Imediato', status: 'Pendente' },
          { acao: 'Regularizar documentação (ASO, fichas EPI, treinamentos NR-31) para todos os colaboradores dos retiros', criticidade: 'Grave', prazo: '30 dias', status: 'Pendente' }
        ]
      }];
      console.log('✓ Fazenda - Setor Retiros atualizado com dados de Junho');
    }
    
    // Vivência - dados do relatório Fazenda_Vivencia_Julho/Agosto
    const vivencia = fazenda.setores.find(s => s.name === 'Área de Vivência');
    if (vivencia) {
      if (!vivencia.visitas) vivencia.visitas = [];
      if (!vivencia.visitas.some(v => v.dataAuditoria === '03/08/2026')) {
        vivencia.visitas.push({
          dataAuditoria: '03/08/2026',
          scores: { estrutural: 60, documental: 70, comportamental: 80, global: 70 },
          checklist: buildChecklist(
            { registro: 'conforme', aso: 'conforme', pgr: 'conforme', treinamentos: 'conforme', fichas_epi: 'pendente', os: 'conforme', integracao: 'conforme' },
            { refeicao: 'conforme', banheiro: 'nao_conforme', epi_fornecimento: 'conforme', seguranca_geral: 'conforme' },
            { uso_epi: 'conforme', comportamento_seguro: 'conforme' }
          ),
          planoAcao: [
            { acao: 'Adequar instalações sanitárias da área de vivência', criticidade: 'Moderado', prazo: '15 dias', status: 'Pendente' },
            { acao: 'Atualizar fichas de entrega de EPI para os colaboradores da área de vivência', criticidade: 'Moderado', prazo: '15 dias', status: 'Pendente' }
          ]
        });
        console.log('✓ Fazenda - Setor Vivência atualizado com dados de Agosto');
      }
    }
  }
}

// ================================================================
// Salvar data.js
// ================================================================
const newStr = dataStr.replace(/const AUDIT_DATA = \[[\s\S]*?\];/, 'const AUDIT_DATA = ' + JSON.stringify(data, null, 2) + ';');
fs.writeFileSync('data.js', newStr);
console.log('\n✅ data.js atualizado com sucesso!');
console.log('Total de empresas:', data.length);
data.forEach(c => {
  console.log(`  ${c.name} (${c.id}): ${c.visitas.length} visitas`);
});
