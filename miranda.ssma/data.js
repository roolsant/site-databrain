const AUDIT_DATA = [
  {
    "id": "edivaldo",
    "name": "Edivaldo",
    "razaoSocial": "E.F Goncalves & Cia Ltda",
    "responsavel": "Edivaldo Ferreira Goncalves",
    "responsavelMiranda": "Cássia Francine Zacarim Lima",
    "ramo": "Construção e Manutenção de Cercas",
    "criticidade": "Crítico",
    "visitas": [
      {
        "dataAuditoria": "19/05/2026",
        "scores": {
          "documental": 50,
          "estrutural": 0,
          "comportamental": 0,
          "global": 17
        },
        "checklist": {
          "documental": {
            "registro": {
              "status": "conforme",
              "desc": "Registro de David da Silva Gonçalves regularizado."
            },
            "aso": {
              "status": "nao_conforme",
              "desc": "ASO vencendo em 27/06/2026; Paulo Sergio com espirometria apontando anomalias leves."
            },
            "pgr": {
              "status": "nao_conforme",
              "desc": "PGR e PCMSO vencidos/vencendo em Junho 2026."
            },
            "treinamentos": {
              "status": "nao_conforme",
              "desc": "Edivaldo tem NR-12/31; outros colaboradores sem NR-06 ou integração."
            },
            "fichas_epi": {
              "status": "conforme",
              "desc": "Fichas assinadas e atualizadas em 01/05/2026."
            },
            "os": {
              "status": "conforme",
              "desc": "Ordens de Serviço de David e Paulo assinadas em 28/05/2026."
            },
            "integracao": {
              "status": "nao_conforme",
              "desc": "Sem certificados de integração NR-31 nos prontuários."
            }
          },
          "estrutural": {
            "refeicao": {
              "status": "nao_conforme",
              "desc": "Ausência total de área de vivência. Refeições improvisadas no retiro próximo."
            },
            "banheiro": {
              "status": "nao_conforme",
              "desc": "Ausência completa de sanitário ou lavatório local na frente operacional."
            },
            "epi_fornecimento": {
              "status": "conforme",
              "desc": "EPIs em dia conforme termos de fornecimento."
            },
            "seguranca_geral": {
              "status": "nao_conforme",
              "desc": "Sem check-lists de motosserras, sem APR/PT para atividades dinâmicas."
            }
          },
          "comportamento": {
            "comportamento_seguro": {
              "status": "nao_conforme",
              "desc": "Postura reativa e trabalho sem os cuidados de proteção individual básicos."
            },
            "uso_epi": {
              "status": "nao_conforme",
              "desc": "Todos os 3 colaboradores trabalhando sem luvas de raspa e sem perneiras."
            }
          }
        },
        "planoAcao": [
          {
            "acao": "Implantar imediatamente área de vivência regulamentada (abrigo móvel, mesa, assentos e sanitário) na frente de trabalho.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Pendente"
          },
          {
            "acao": "Paralisar atividades de corte/perfuração até que os colaboradores passem a usar as perneiras e luvas de couro.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Agendar exames periódicos de ASO e Espirometria antes do vencimento em 27/06/2026.",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Pendente"
          },
          {
            "acao": "Renovar PGR e PCMSO junto às assessorias de SST contratadas.",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Pendente"
          },
          {
            "acao": "Ministrar e anexar treinamentos de integração NR-31 e de uso de EPI (NR-06) para os ajudantes.",
            "criticidade": "Moderado",
            "prazo": "30 dias",
            "status": "Pendente"
          }
        ],
        "diagnostico": "A auditoria em campo revelou extrema vulnerabilidade ocupacional, com descumprimento crítico das NRs 06, 24 e 31. O trabalho com arame farpado e perfuração é executado sem nenhuma proteção nas mãos ou pernas. A ausência de banheiros e área de refeições viola a dignidade básica dos colaboradores.",
        "conclusao": "A frente de trabalho dos cerqueiros apresenta condições irregulares graves que impedem o prosseguimento das operações no formato atual até que as adequações de segurança sejam concluídas."
      },
      {
        "dataAuditoria": "26/05/2026",
        "scores": {
          "documental": 43,
          "estrutural": 25,
          "comportamental": 100,
          "global": 56
        },
        "checklist": {
          "documental": {
            "registro": {
              "status": "conforme",
              "desc": "Registro de David da Silva Gonçalves regularizado."
            },
            "aso": {
              "status": "nao_conforme",
              "desc": "ASO vencendo em 27/06/2026; Paulo Sergio com espirometria apontando anomalias leves."
            },
            "pgr": {
              "status": "nao_conforme",
              "desc": "PGR e PCMSO vencidos/vencendo em Junho 2026."
            },
            "treinamentos": {
              "status": "nao_conforme",
              "desc": "Edivaldo tem NR-12/31; outros colaboradores sem NR-06 ou integração."
            },
            "fichas_epi": {
              "status": "conforme",
              "desc": "Fichas assinadas e atualizadas em 01/05/2026."
            },
            "os": {
              "status": "conforme",
              "desc": "Ordens de Serviço de David e Paulo assinadas em 28/05/2026."
            },
            "integracao": {
              "status": "nao_conforme",
              "desc": "Sem certificados de integração NR-31 nos prontuários."
            }
          },
          "estrutural": {
            "refeicao": {
              "status": "nao_conforme",
              "desc": "Ausência total de área de vivência. Refeições improvisadas no retiro próximo."
            },
            "banheiro": {
              "status": "nao_conforme",
              "desc": "Ausência completa de sanitário ou lavatório local na frente operacional."
            },
            "epi_fornecimento": {
              "status": "conforme",
              "desc": "EPIs em dia conforme termos de fornecimento."
            },
            "seguranca_geral": {
              "status": "nao_conforme",
              "desc": "Sem check-lists de motosserras, sem APR/PT para atividades dinâmicas."
            }
          },
          "comportamento": {
            "comportamento_seguro": {
              "status": "conforme",
              "desc": "Postura reativa e trabalho sem os cuidados de proteção individual básicos."
            },
            "uso_epi": {
              "status": "conforme",
              "desc": "Flagrado conduzindo trator sem abafador de ruídos."
            }
          }
        },
        "planoAcao": [
          {
            "acao": "Implantar imediatamente área de vivência regulamentada (abrigo móvel, mesa, assentos e sanitário) na frente de trabalho.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Pendente"
          },
          {
            "acao": "Paralisar atividades de corte/perfuração até que os colaboradores passem a usar as perneiras e luvas de couro.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Agendar exames periódicos de ASO e Espirometria antes do vencimento em 27/06/2026.",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Pendente"
          },
          {
            "acao": "Renovar PGR e PCMSO junto às assessorias de SST contratadas.",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Pendente"
          },
          {
            "acao": "Ministrar e anexar treinamentos de integração NR-31 e de uso de EPI (NR-06) para os ajudantes.",
            "criticidade": "Moderado",
            "prazo": "30 dias",
            "status": "Pendente"
          },
          {
            "acao": "Advertência e re-treinamento sobre EPI (abafador)",
            "criticidade": "Grave",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          }
        ],
        "diagnostico": "Flagrante de não conformidade no uso de EPIs. Queda no índice comportamental.",
        "conclusao": "Necessária advertência formal aos colaboradores pela recusa do uso de abafadores de ruído."
      },
      {
        "dataAuditoria": "26/06/2026",
        "scores": {
          "documental": 13,
          "estrutural": 8,
          "comportamental": 40,
          "global": 61
        },
        "checklist": {
          "documental": {
            "registro": {
              "status": "conforme",
              "desc": "Registro de David da Silva Gonçalves regularizado."
            },
            "aso": {
              "status": "nao_conforme",
              "desc": "ASO vencendo em 27/06/2026; Paulo Sergio com espirometria apontando anomalias leves."
            },
            "pgr": {
              "status": "nao_conforme",
              "desc": "PGR e PCMSO vencidos/vencendo em Junho 2026."
            },
            "treinamentos": {
              "status": "nao_conforme",
              "desc": "Edivaldo tem NR-12/31; outros colaboradores sem NR-06 ou integração."
            },
            "fichas_epi": {
              "status": "conforme",
              "desc": "Fichas assinadas e atualizadas em 01/05/2026."
            },
            "os": {
              "status": "conforme",
              "desc": "Ordens de Serviço de David e Paulo assinadas em 28/05/2026."
            },
            "integracao": {
              "status": "nao_conforme",
              "desc": "Sem certificados de integração NR-31 nos prontuários."
            }
          },
          "estrutural": {
            "refeicao": {
              "status": "nao_conforme",
              "desc": "Atualizado em 26/06/2026 (Vide DOCX)"
            },
            "banheiro": {
              "status": "nao_conforme",
              "desc": "Ausência completa de sanitário ou lavatório local na frente operacional."
            },
            "epi_fornecimento": {
              "status": "conforme",
              "desc": "EPIs em dia conforme termos de fornecimento."
            },
            "seguranca_geral": {
              "status": "nao_conforme",
              "desc": "Atualizado em 26/06/2026 (Vide DOCX)"
            }
          },
          "comportamento": {
            "comportamento_seguro": {
              "status": "conforme",
              "desc": "Atualizado em 26/06/2026 (Vide DOCX)"
            },
            "uso_epi": {
              "status": "conforme",
              "desc": "Atualizado em 26/06/2026 (Vide DOCX)"
            }
          }
        },
        "planoAcao": [
          {
            "acao": "Implantação imediata de estrutura móvel ou fixa para área de vivência (NR-24)",
            "criticidade": "Crítico",
            "prazo": "Urgente",
            "status": "Pendente"
          },
          {
            "acao": "Manutenção/Substituição da capa de proteção do cardan da furadeira",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Pendente"
          }
        ],
        "diagnostico": "Flagrante de não conformidade no uso de EPIs. Queda no índice comportamental.",
        "conclusao": "Necessária advertência formal aos colaboradores pela recusa do uso de abafadores de ruído."
      }
    ]
  },
  {
    "id": "oliveira_reflorestamento",
    "name": "Oliveira Reflorestamento",
    "razaoSocial": "J.R. de Oliveira Silvicultura Ltda",
    "responsavel": "Otávio Luiz / J.R. de Oliveira",
    "responsavelMiranda": "Cássia Francine Zacarim Lima",
    "ramo": "Silvicultura, Limpeza de Aceiros e Terraplenagem",
    "criticidade": "Crítico",
    "visitas": [
      {
        "dataAuditoria": "12/05/2026",
        "scores": {
          "documental": 25,
          "estrutural": 10,
          "comportamental": 30,
          "global": 22
        },
        "checklist": {
          "documental": {
            "registro": {
              "status": "conforme",
              "desc": "Registro de Reginaldo Alves em conformidade."
            },
            "aso": {
              "status": "nao_conforme",
              "desc": "Marcos Antônio Dias com ASO vencido desde 10/05/2026 e sem exames toxicológicos."
            },
            "pgr": {
              "status": "nao_conforme",
              "desc": "PGR e PCMSO expirados desde 30/04/2026."
            },
            "treinamentos": {
              "status": "nao_conforme",
              "desc": "Falta treinamento de agrotóxicos NR-31.08 para aplicadores químicos."
            },
            "fichas_epi": {
              "status": "nao_conforme",
              "desc": "Fichas desatualizadas (última entrega nov/2025). Filtros químicos expirados."
            },
            "os": {
              "status": "conforme",
              "desc": "Ordens de Serviço preenchidas e assinadas em 12/01/2026."
            },
            "integracao": {
              "status": "nao_conforme",
              "desc": "Ausência de fichas ou certificados de integração de SST."
            }
          },
          "estrutural": {
            "refeicao": {
              "status": "nao_conforme",
              "desc": "Área de refeição ('figueira') montada ao lado do depósito de defensivos agrícolas."
            },
            "banheiro": {
              "status": "nao_conforme",
              "desc": "Banheiro sem água corrente, descarga inativa e sem papel ou sabonete."
            },
            "epi_fornecimento": {
              "status": "nao_conforme",
              "desc": "Controle formal de troca periódica de EPIs travado em 0%."
            },
            "seguranca_geral": {
              "status": "nao_conforme",
              "desc": "Sem sinalização de defensivos. Abrigo móvel com calço e cobertura danificados."
            }
          },
          "comportamento": {
            "comportamento_seguro": {
              "status": "conforme",
              "desc": "Funcionários prestativos e com boa receptividade às orientações de melhoria."
            },
            "uso_epi": {
              "status": "nao_conforme",
              "desc": "Aplicação de agrotóxicos sem o kit completo de EPI químico e com filtros vencidos."
            }
          }
        },
        "planoAcao": [
          {
            "acao": "Relocar imediatamente a área de vivência (alimentação/descanso) para local isolado dos depósitos de defensivos agrícolas.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Restabelecer água corrente no sanitário, consertar a descarga e abastecer com papel higiênico e sabonete.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Renovar e revisar PGR e PCMSO expirados em 30/04/2026 junto à assessoria de SST.",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Regularizar ASO vencido de Marcos Antônio e providenciar os exames toxicológicos obrigatórios.",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Fornecer kits novos de EPI químico e estabelecer controle rígido de substituição periódica de filtros de carvão.",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Pendente"
          },
          {
            "acao": "Aplicar treinamento obrigatório NR-31.08 (Agrotóxicos) para os colaboradores aplicadores.",
            "criticidade": "Moderado",
            "prazo": "30 dias",
            "status": "Pendente"
          },
          {
            "acao": "Reparar danos estruturais no abrigo móvel (cobertura lateral e calços).",
            "criticidade": "Moderado",
            "prazo": "30 dias",
            "status": "Pendente"
          }
        ],
        "diagnostico": "A inspeção constatou severa vulnerabilidade humana e descompasso documental. O banheiro está inutilizável por falta de água corrente e higiene. Comer ao lado de veneno agroquímico e pulverizar sem os EPIs adequados colocam a vida dos aplicadores em risco iminente de intoxicação aguda.",
        "conclusao": "A operação de silvicultura apresenta desvios severos. Embora os funcionários possuam boa vontade, a frente necessita de intervenção gerencial imediata para saneamento das não conformidades críticas."
      },
      {
        "dataAuditoria": "26/05/2026",
        "scores": {
          "documental": 29,
          "estrutural": 0,
          "comportamental": 50,
          "global": 26
        },
        "checklist": {
          "documental": {
            "registro": {
              "status": "conforme",
              "desc": "Registro de Reginaldo Alves em conformidade."
            },
            "aso": {
              "status": "nao_conforme",
              "desc": "Marcos Antônio Dias com ASO vencido desde 10/05/2026 e sem exames toxicológicos."
            },
            "pgr": {
              "status": "nao_conforme",
              "desc": "PGR e PCMSO expirados desde 30/04/2026."
            },
            "treinamentos": {
              "status": "nao_conforme",
              "desc": "Falta treinamento de agrotóxicos NR-31.08 para aplicadores químicos."
            },
            "fichas_epi": {
              "status": "nao_conforme",
              "desc": "Fichas desatualizadas (última entrega nov/2025). Filtros químicos expirados."
            },
            "os": {
              "status": "conforme",
              "desc": "Ordens de Serviço preenchidas e assinadas em 12/01/2026."
            },
            "integracao": {
              "status": "nao_conforme",
              "desc": "Ausência de fichas ou certificados de integração de SST."
            }
          },
          "estrutural": {
            "refeicao": {
              "status": "nao_conforme",
              "desc": "Área de refeição ('figueira') montada ao lado do depósito de defensivos agrícolas."
            },
            "banheiro": {
              "status": "nao_conforme",
              "desc": "Banheiro sem água corrente, descarga inativa e sem papel ou sabonete."
            },
            "epi_fornecimento": {
              "status": "nao_conforme",
              "desc": "Controle formal de troca periódica de EPIs travado em 0%."
            },
            "seguranca_geral": {
              "status": "nao_conforme",
              "desc": "Sem sinalização de defensivos. Abrigo móvel com calço e cobertura danificados."
            }
          },
          "comportamento": {
            "comportamento_seguro": {
              "status": "conforme",
              "desc": "Funcionários prestativos e com boa receptividade às orientações de melhoria."
            },
            "uso_epi": {
              "status": "nao_conforme",
              "desc": "Aplicação de agrotóxicos sem o kit completo de EPI químico e com filtros vencidos."
            }
          }
        },
        "planoAcao": [
          {
            "acao": "Relocar imediatamente a área de vivência (alimentação/descanso) para local isolado dos depósitos de defensivos agrícolas.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Restabelecer água corrente no sanitário, consertar a descarga e abastecer com papel higiênico e sabonete.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Renovar e revisar PGR e PCMSO expirados em 30/04/2026 junto à assessoria de SST.",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Regularizar ASO vencido de Marcos Antônio e providenciar os exames toxicológicos obrigatórios.",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Fornecer kits novos de EPI químico e estabelecer controle rígido de substituição periódica de filtros de carvão.",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Pendente"
          },
          {
            "acao": "Aplicar treinamento obrigatório NR-31.08 (Agrotóxicos) para os colaboradores aplicadores.",
            "criticidade": "Moderado",
            "prazo": "30 dias",
            "status": "Pendente"
          },
          {
            "acao": "Reparar danos estruturais no abrigo móvel (cobertura lateral e calços).",
            "criticidade": "Moderado",
            "prazo": "30 dias",
            "status": "Pendente"
          }
        ],
        "diagnostico": "A inspeção constatou severa vulnerabilidade humana e descompasso documental. O banheiro está inutilizável por falta de água corrente e higiene. Comer ao lado de veneno agroquímico e pulverizar sem os EPIs adequados colocam a vida dos aplicadores em risco iminente de intoxicação aguda.",
        "conclusao": "A operação de silvicultura apresenta desvios severos. Embora os funcionários possuam boa vontade, a frente necessita de intervenção gerencial imediata para saneamento das não conformidades críticas."
      }
    ]
  },
  {
    "id": "nivel_gomes_construtora",
    "name": "Nível Gomes Construtora",
    "razaoSocial": "Gomes e Gusmão Construtora Ltda",
    "responsavel": "Gersy Gomes Ferreira Filho",
    "responsavelMiranda": "Cássia Francine Zacarim Lima",
    "ramo": "Construção Civil (Nova Sala de Reunião)",
    "criticidade": "Grave",
    "visitas": [
      {
        "dataAuditoria": "12/05/2026",
        "scores": {
          "documental": 60,
          "estrutural": 70,
          "comportamental": 10,
          "global": 47
        },
        "checklist": {
          "documental": {
            "registro": {
              "status": "conforme",
              "desc": "Registro de Luiz Roberto da Silva regularizado."
            },
            "aso": {
              "status": "conforme",
              "desc": "Exames médicos ocupacionais atualizados de acordo com o PCMSO."
            },
            "pgr": {
              "status": "conforme",
              "desc": "PGR válido até abril/2028 e PCMSO válido até abril/2027 assinados."
            },
            "treinamentos": {
              "status": "conforme",
              "desc": "Ausência de treinamentos práticos de segurança em construção (NR-18)."
            },
            "fichas_epi": {
              "status": "conforme",
              "desc": "Modelos existem no PGR, mas não foram colhidas as assinaturas de entrega."
            },
            "os": {
              "status": "conforme",
              "desc": "Ordens de Serviço estruturadas conforme a NR-01."
            },
            "integracao": {
              "status": "conforme",
              "desc": "Sem integração comportamental registrada para os operários."
            }
          },
          "estrutural": {
            "refeicao": {
              "status": "conforme",
              "desc": "Utilizam a área de refeições da sede da fazenda."
            },
            "banheiro": {
              "status": "conforme",
              "desc": "Utilizam as instalações sanitárias da sede da fazenda."
            },
            "epi_fornecimento": {
              "status": "nao_conforme",
              "desc": "Não foram localizadas fichas de entrega de EPI assinadas."
            },
            "seguranca_geral": {
              "status": "nao_conforme",
              "desc": "Obra sem APR/PT assinado e sem placas de isolamento de canteiro."
            }
          },
          "comportamento": {
            "comportamento_seguro": {
              "status": "nao_conforme",
              "desc": "Ato inseguro voluntário e recusa injustificada ao cumprimento de OS."
            },
            "uso_epi": {
              "status": "nao_conforme",
              "desc": "Os 3 colaboradores (incluindo o proprietário) flagrados trabalhando sem capacete, óculos ou luvas."
            }
          }
        },
        "planoAcao": [
          {
            "acao": "Paralisar imediatamente as atividades de alvenaria até que todos estejam utilizando capacete, óculos e luvas.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Distribuir e registrar formalmente a entrega de todos os EPIs através das fichas com assinatura dos colaboradores.",
            "criticidade": "Grave",
            "prazo": "3 dias",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Realizar Diálogo Diário de Segurança (DDS) sobre uso obrigatório de EPI e conscientização sobre queda de objetos.",
            "criticidade": "Moderado",
            "prazo": "5 dias",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Aplicar advertências formais na recusa do uso de EPIs, conforme previsto no Art. 158 da CLT.",
            "criticidade": "Moderado",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Elaborar a Análise Preliminar de Risco (APR) específica para a obra civil.",
            "criticidade": "Moderado",
            "prazo": "7 dias",
            "status": "Pendente"
          }
        ],
        "diagnostico": "A construtora possui programas de SST atualizados no papel (PGR/PCMSO), mas há uma falha crítica de comportamento e fiscalização em campo. A execução de trabalhos em canteiro de obras de alvenaria sem capacete, óculos e luvas expõe a equipe a riscos severos de traumatismo craniano, projeção de partículas nos olhos e cortes nas mãos.",
        "conclusao": "A obra civil deve ser interrompida temporariamente até o fornecimento físico imediato dos EPIs e a conscientização/coação comportamental dos colaboradores."
      },
      {
        "dataAuditoria": "26/05/2026",
        "scores": {
          "documental": 100,
          "estrutural": 50,
          "comportamental": 0,
          "global": 50
        },
        "checklist": {
          "documental": {
            "registro": {
              "status": "conforme",
              "desc": "Registro de Luiz Roberto da Silva regularizado."
            },
            "aso": {
              "status": "conforme",
              "desc": "Exames médicos ocupacionais atualizados de acordo com o PCMSO."
            },
            "pgr": {
              "status": "conforme",
              "desc": "PGR válido até abril/2028 e PCMSO válido até abril/2027 assinados."
            },
            "treinamentos": {
              "status": "conforme",
              "desc": "Ausência de treinamentos práticos de segurança em construção (NR-18)."
            },
            "fichas_epi": {
              "status": "conforme",
              "desc": "Modelos existem no PGR, mas não foram colhidas as assinaturas de entrega."
            },
            "os": {
              "status": "conforme",
              "desc": "Ordens de Serviço estruturadas conforme a NR-01."
            },
            "integracao": {
              "status": "conforme",
              "desc": "Sem integração comportamental registrada para os operários."
            }
          },
          "estrutural": {
            "refeicao": {
              "status": "conforme",
              "desc": "Utilizam a área de refeições da sede da fazenda."
            },
            "banheiro": {
              "status": "conforme",
              "desc": "Utilizam as instalações sanitárias da sede da fazenda."
            },
            "epi_fornecimento": {
              "status": "nao_conforme",
              "desc": "Não foram localizadas fichas de entrega de EPI assinadas."
            },
            "seguranca_geral": {
              "status": "nao_conforme",
              "desc": "Obra sem APR/PT assinado e sem placas de isolamento de canteiro."
            }
          },
          "comportamento": {
            "comportamento_seguro": {
              "status": "nao_conforme",
              "desc": "Ato inseguro voluntário e recusa injustificada ao cumprimento de OS."
            },
            "uso_epi": {
              "status": "nao_conforme",
              "desc": "Os 3 colaboradores (incluindo o proprietário) flagrados trabalhando sem capacete, óculos ou luvas."
            }
          }
        },
        "planoAcao": [
          {
            "acao": "Paralisar imediatamente as atividades de alvenaria até que todos estejam utilizando capacete, óculos e luvas.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Distribuir e registrar formalmente a entrega de todos os EPIs através das fichas com assinatura dos colaboradores.",
            "criticidade": "Grave",
            "prazo": "3 dias",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Realizar Diálogo Diário de Segurança (DDS) sobre uso obrigatório de EPI e conscientização sobre queda de objetos.",
            "criticidade": "Moderado",
            "prazo": "5 dias",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Aplicar advertências formais na recusa do uso de EPIs, conforme previsto no Art. 158 da CLT.",
            "criticidade": "Moderado",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Elaborar a Análise Preliminar de Risco (APR) específica para a obra civil.",
            "criticidade": "Moderado",
            "prazo": "7 dias",
            "status": "Pendente"
          }
        ],
        "diagnostico": "A construtora possui programas de SST atualizados no papel (PGR/PCMSO), mas há uma falha crítica de comportamento e fiscalização em campo. A execução de trabalhos em canteiro de obras de alvenaria sem capacete, óculos e luvas expõe a equipe a riscos severos de traumatismo craniano, projeção de partículas nos olhos e cortes nas mãos.",
        "conclusao": "A obra civil deve ser interrompida temporariamente até o fornecimento físico imediato dos EPIs e a conscientização/coação comportamental dos colaboradores."
      }
    ]
  },
  {
    "id": "restaurante",
    "name": "Restaurante",
    "razaoSocial": "MSV SILVA ME (CNPJ 29.854.674/0001-35)",
    "responsavel": "Edivaldo Ferreira Goncalves",
    "responsavelMiranda": "Cássia Francine Zacarim Lima",
    "ramo": "Cozinha Industrial e Refeitório",
    "criticidade": "Crítico",
    "visitas": [
      {
        "dataAuditoria": "19/05/2026",
        "scores": {
          "documental": 0,
          "estrutural": 50,
          "comportamental": 100,
          "global": 50
        },
        "checklist": {
          "documental": {
            "registro": {
              "status": "nao_conforme",
              "desc": "A funcionária Raquel atua sem registro formal em carteira de trabalho."
            },
            "aso": {
              "status": "nao_conforme",
              "desc": "Sem ASOs admissionais ou periódicos do contingente de 6 funcionárias."
            },
            "pgr": {
              "status": "nao_conforme",
              "desc": "Ausência completa de PGR e PCMSO emitidos para a empresa."
            },
            "treinamentos": {
              "status": "nao_conforme",
              "desc": "Ausência total de certificados de treinamentos de segurança de cozinha."
            },
            "fichas_epi": {
              "status": "nao_conforme",
              "desc": "Sem fichas formais assinadas registrando a entrega de vestimentas/EPIs."
            },
            "os": {
              "status": "nao_conforme",
              "desc": "Sem Ordens de Serviço (OS) de SST emitidas para as funções."
            },
            "integracao": {
              "status": "nao_conforme",
              "desc": "Nenhuma integração de segurança documentada."
            }
          },
          "estrutural": {
            "refeicao": {
              "status": "conforme",
              "desc": "Refeitório amplo, limpo, climatizado e bancada com vidro protetor salivar."
            },
            "banheiro": {
              "status": "nao_conforme",
              "desc": "Fiação elétrica exposta no chuveiro do vestiário e cabines entulhadas com materiais."
            },
            "epi_fornecimento": {
              "status": "conforme",
              "desc": "Toucas descartáveis e aventais térmicos/higiênicos são fornecidos."
            },
            "seguranca_geral": {
              "status": "nao_conforme",
              "desc": "Fardos de açúcar/arroz empilhados diretamente no chão. Panelas em altura com risco de queda."
            }
          },
          "comportamento": {
            "comportamento_seguro": {
              "status": "conforme",
              "desc": "Funcionárias demonstram assepsia e postura atenta aos riscos."
            },
            "uso_epi": {
              "status": "conforme",
              "desc": "Toucas e aventais usados regularmente, exceto 1 colaborador flagrado sem touca."
            }
          }
        },
        "planoAcao": [
          {
            "acao": "Efetuar o registro formal imediato da funcionária Raquel em conformidade com a CLT.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Pendente"
          },
          {
            "acao": "Eliminar fiação elétrica exposta na conexão do chuveiro elétrico no vestiário feminino (risco grave de choque).",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Pendente"
          },
          {
            "acao": "Elaborar os programas legais obrigatórios de SST (PGR e PCMSO) para a empresa.",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Pendente"
          },
          {
            "acao": "Agendar exames médicos de ASO Admissional/Periódico para todas as funcionárias.",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Pendente"
          },
          {
            "acao": "Desobstruir as cabines do vestiário e providenciar paletes plásticos para suspensão de alimentos na despensa.",
            "criticidade": "Moderado",
            "prazo": "7 dias",
            "status": "Pendente"
          },
          {
            "acao": "Implementar controle físico de fichas de EPI e fiscalizar uso contínuo de toucas para todo pessoal.",
            "criticidade": "Moderado",
            "prazo": "5 dias",
            "status": "Pendente"
          }
        ],
        "diagnostico": "A infraestrutura de servimento e as práticas de higiene da cozinha são excelentes. Contudo, há uma total nulidade documental em SST (sem programas de PGR/PCMSO, registros de EPI ou ASOs). Em campo, identificou-se risco crítico de choque elétrico no vestiário devido a cabos elétricos expostos no chuveiro, além da presença de trabalhadora sem registro trabalhista formal.",
        "conclusao": "A cozinha possui bom padrão de funcionamento operacional e higiene, mas exige urgente regularização administrativa de SST e manutenção elétrica corretiva no vestiário."
      }
    ]
  },
  {
    "id": "mauro_carvoaria",
    "name": "Mauro Carvoaria",
    "razaoSocial": "Mauro Honorato da Silva",
    "responsavel": "Mauro Honorato da Silva",
    "responsavelMiranda": "Cássia Francine Zacarim Lima",
    "ramo": "Manejo e Retirada Florestal de Madeira",
    "criticidade": "Crítico",
    "visitas": [
      {
        "dataAuditoria": "12/05/2026",
        "scores": {
          "documental": 0,
          "estrutural": 10,
          "comportamental": 20,
          "global": 10
        },
        "checklist": {
          "documental": {
            "registro": {
              "status": "conforme",
              "desc": "Nenhum livro de registro ou dado enviado para análise."
            },
            "aso": {
              "status": "conforme",
              "desc": "Nenhum prontuário médico ou ASO apresentado."
            },
            "pgr": {
              "status": "nao_conforme",
              "desc": "Somente não tem OS e o PCMSO venceu 01/2026"
            },
            "treinamentos": {
              "status": "conforme",
              "desc": "Sem comprovação de curso de motosserra (NR-31.12) ou EPIs."
            },
            "fichas_epi": {
              "status": "conforme",
              "desc": "Ausência total de fichas de fornecimento de EPI."
            },
            "os": {
              "status": "nao_conforme",
              "desc": "Somente não tem OS"
            },
            "integracao": {
              "status": "conforme",
              "desc": "Sem registro de integração."
            }
          },
          "estrutural": {
            "refeicao": {
              "status": "nao_conforme",
              "desc": "Área de vivência tomada pelo mato alto e sem condições de uso. Mesa de refeições imunda."
            },
            "banheiro": {
              "status": "nao_conforme",
              "desc": "Banheiro abandonado, sem água e totalmente desprovido de papel higiênico ou sabonete."
            },
            "epi_fornecimento": {
              "status": "nao_conforme",
              "desc": "Sem fichas de fornecimento ou registros de entrega."
            },
            "seguranca_geral": {
              "status": "nao_conforme",
              "desc": "Falta de isolamento/sinalização perimetral de queda de árvores na mata. Combustível sem armazenamento."
            }
          },
          "comportamento": {
            "comportamento_seguro": {
              "status": "nao_conforme",
              "desc": "Descarte e guarda insegura de combustíveis inflamáveis na floresta nativa."
            },
            "uso_epi": {
              "status": "nao_conforme",
              "desc": "Funcionários não estavam operando no momento da abordagem. Sem evidência de uso."
            }
          }
        },
        "planoAcao": [
          {
            "acao": "Paralisar imediatamente as atividades de extração florestal até reestruturação básica de segurança.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Roçar o mato ao redor da área de vivência, efetuar limpeza profunda da mesa e restabelecer água/insumos no banheiro.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Acondicionar e armazenar galões de combustível inflamável de forma segura e sinalizada fora da mata nativa.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Implantar placas de sinalização de segurança perimetral ('Queda de Árvores', 'Tratores em Operação') no canteiro florestal.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Pendente"
          },
          {
            "acao": "Estruturar e enviar toda a documentação legal básica de SST (PGR, PCMSO, ASOs, Registros).",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          }
        ],
        "diagnostico": "Cenário preocupante de total descumprimento dos requisitos mínimos de segurança e dignidade. A área de vivência está abandonada e imunda, forçando necessidades e refeições no chão. O armazenamento inadequado de galões de gasolina diretamente no chão da floresta nativa cria risco iminente de contaminação do solo e incêndios florestais catastróficos.",
        "conclusao": "A frente florestal apresenta desvios graves de infraestrutura e gestão ambiental. Recomenda-se a suspensão preventiva de derrubada até a adequação da vivência, resíduos de combustível e sinalização."
      },
      {
        "dataAuditoria": "26/05/2026",
        "scores": {
          "documental": 71,
          "estrutural": 0,
          "comportamental": 0,
          "global": 24
        },
        "checklist": {
          "documental": {
            "registro": {
              "status": "conforme",
              "desc": "Nenhum livro de registro ou dado enviado para análise."
            },
            "aso": {
              "status": "conforme",
              "desc": "Nenhum prontuário médico ou ASO apresentado."
            },
            "pgr": {
              "status": "nao_conforme",
              "desc": "Somente não tem OS e o PCMSO venceu 01/2026"
            },
            "treinamentos": {
              "status": "conforme",
              "desc": "Sem comprovação de curso de motosserra (NR-31.12) ou EPIs."
            },
            "fichas_epi": {
              "status": "conforme",
              "desc": "Ausência total de fichas de fornecimento de EPI."
            },
            "os": {
              "status": "nao_conforme",
              "desc": "Somente não tem OS"
            },
            "integracao": {
              "status": "conforme",
              "desc": "Sem registro de integração."
            }
          },
          "estrutural": {
            "refeicao": {
              "status": "nao_conforme",
              "desc": "Área de vivência tomada pelo mato alto e sem condições de uso. Mesa de refeições imunda."
            },
            "banheiro": {
              "status": "nao_conforme",
              "desc": "Banheiro abandonado, sem água e totalmente desprovido de papel higiênico ou sabonete."
            },
            "epi_fornecimento": {
              "status": "nao_conforme",
              "desc": "Sem fichas de fornecimento ou registros de entrega."
            },
            "seguranca_geral": {
              "status": "nao_conforme",
              "desc": "Falta de isolamento/sinalização perimetral de queda de árvores na mata. Combustível sem armazenamento."
            }
          },
          "comportamento": {
            "comportamento_seguro": {
              "status": "nao_conforme",
              "desc": "Descarte e guarda insegura de combustíveis inflamáveis na floresta nativa."
            },
            "uso_epi": {
              "status": "nao_conforme",
              "desc": "Total ausência de EPIs em atividades mecânicas (limpeza com máquina)."
            }
          }
        },
        "planoAcao": [
          {
            "acao": "Paralisar imediatamente as atividades de extração florestal até reestruturação básica de segurança.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Roçar o mato ao redor da área de vivência, efetuar limpeza profunda da mesa e restabelecer água/insumos no banheiro.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Acondicionar e armazenar galões de combustível inflamável de forma segura e sinalizada fora da mata nativa.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Implantar placas de sinalização de segurança perimetral ('Queda de Árvores', 'Tratores em Operação') no canteiro florestal.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Pendente"
          },
          {
            "acao": "Estruturar e enviar toda a documentação legal básica de SST (PGR, PCMSO, ASOs, Registros).",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Paralisação das operações por falta de EPIs",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          }
        ],
        "diagnostico": "Grave irregularidade: Limpeza técnica operada em total estado de falta de Equipamentos de Proteção Individual.",
        "conclusao": "Risco altíssimo de acidentes biomecânicos. Urgente paralisação e advertência."
      }
    ]
  },
  {
    "id": "michel_ferreira",
    "name": "Michel Ferreira",
    "razaoSocial": "M F Carpintaria e Serviços Rurais",
    "responsavel": "Michel Ferreira Gonçalves",
    "responsavelMiranda": "Cássia Francine Zacarim Lima",
    "ramo": "Construção e Manutenção de Cercas",
    "criticidade": "Grave",
    "visitas": [
      {
        "dataAuditoria": "14/05/2026",
        "scores": {
          "documental": 80,
          "estrutural": 10,
          "comportamental": 50,
          "global": 47
        },
        "checklist": {
          "documental": {
            "registro": {
              "status": "conforme",
              "desc": "Registro de Amarildo Santos Andrade (Auxiliar) regularizado."
            },
            "aso": {
              "status": "conforme",
              "desc": "ASO Admissional APTO com todos os exames médicos em dia."
            },
            "pgr": {
              "status": "conforme",
              "desc": "PGRTR e PCMSO vigentes até Junho de 2027 assinados."
            },
            "treinamentos": {
              "status": "nao_conforme",
              "desc": "Michel possui motosserra; Amarildo necessita treinamento de Trator NR-31.12 e Primeiros Socorros."
            },
            "fichas_epi": {
              "status": "conforme",
              "desc": "Fichas de EPI estruturadas e assinadas pelo colaborador na admissão."
            },
            "os": {
              "status": "conforme",
              "desc": "Ordem de serviço assinada e alinhada com a NR-01."
            },
            "integracao": {
              "status": "nao_conforme",
              "desc": "Falta de comprovante físico da integração obrigatória NR-31."
            }
          },
          "estrutural": {
            "refeicao": {
              "status": "nao_conforme",
              "desc": "Ausência total de área de vivência operacional em campo (almoço no retiro)."
            },
            "banheiro": {
              "status": "nao_conforme",
              "desc": "Falta de sanitários portáteis ou cabines na frente operacional."
            },
            "epi_fornecimento": {
              "status": "conforme",
              "desc": "Óculos, luvas, botinas e perneiras fornecidos formalmente."
            },
            "seguranca_geral": {
              "status": "nao_conforme",
              "desc": "Falta de infraestrutura básica local para frentes isoladas."
            }
          },
          "comportamento": {
            "comportamento_seguro": {
              "status": "conforme",
              "desc": "Bom relacionamento e cooperação do proprietário e colaborador."
            },
            "uso_epi": {
              "status": "nao_conforme",
              "desc": "Colaboradores operando sem perneiras em área de vegetação densa."
            }
          }
        },
        "planoAcao": [
          {
            "acao": "Implantar área de vivência regulamentar móvel (abrigo com assentos e banheiro químico) na frente de cerca.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Pendente"
          },
          {
            "acao": "Exigir o uso contínuo de perneiras de proteção para evitar picadas de animais peçonhentos na mata.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Providenciar treinamento de tratorista NR-31.12 and Primeiros Socorros para o funcionário Amarildo.",
            "criticidade": "Grave",
            "prazo": "20 dias",
            "status": "Pendente"
          },
          {
            "acao": "Realizar treinamento de Integração NR-31 e assinar ficha de presença.",
            "criticidade": "Moderado",
            "prazo": "15 dias",
            "status": "Pendente"
          }
        ],
        "diagnostico": "Excelente desempenho na gestão de documentos admissionais e programas base (PGRTR/PCMSO vigentes até 2027). A inconformidade reside na ausência completa de área de vivência/banheiro em campo e na falta de uso de perneiras, o que expõe a equipe a ataques de animais peçonhentos típicos do cerrado.",
        "conclusao": "A empresa atende satisfatoriamente a parte documental de SST, devendo sanar com brevidade a infraestrutura de vivência em campo e reforçar a fiscalização de perneiras."
      },
      {
        "dataAuditoria": "26/05/2026",
        "scores": {
          "documental": 71,
          "estrutural": 25,
          "comportamental": 50,
          "global": 49
        },
        "checklist": {
          "documental": {
            "registro": {
              "status": "conforme",
              "desc": "Registro de Amarildo Santos Andrade (Auxiliar) regularizado."
            },
            "aso": {
              "status": "conforme",
              "desc": "ASO Admissional APTO com todos os exames médicos em dia."
            },
            "pgr": {
              "status": "conforme",
              "desc": "PGRTR e PCMSO vigentes até Junho de 2027 assinados."
            },
            "treinamentos": {
              "status": "nao_conforme",
              "desc": "Michel possui motosserra; Amarildo necessita treinamento de Trator NR-31.12 e Primeiros Socorros."
            },
            "fichas_epi": {
              "status": "conforme",
              "desc": "Fichas de EPI estruturadas e assinadas pelo colaborador na admissão."
            },
            "os": {
              "status": "conforme",
              "desc": "Ordem de serviço assinada e alinhada com a NR-01."
            },
            "integracao": {
              "status": "nao_conforme",
              "desc": "Falta de comprovante físico da integração obrigatória NR-31."
            }
          },
          "estrutural": {
            "refeicao": {
              "status": "nao_conforme",
              "desc": "Ausência total de área de vivência operacional em campo (almoço no retiro)."
            },
            "banheiro": {
              "status": "nao_conforme",
              "desc": "Falta de sanitários portáteis ou cabines na frente operacional."
            },
            "epi_fornecimento": {
              "status": "conforme",
              "desc": "Óculos, luvas, botinas e perneiras fornecidos formalmente."
            },
            "seguranca_geral": {
              "status": "nao_conforme",
              "desc": "Falta de infraestrutura básica local para frentes isoladas."
            }
          },
          "comportamento": {
            "comportamento_seguro": {
              "status": "conforme",
              "desc": "Bom relacionamento e cooperação do proprietário e colaborador."
            },
            "uso_epi": {
              "status": "nao_conforme",
              "desc": "Colaboradores operando sem perneiras em área de vegetação densa."
            }
          }
        },
        "planoAcao": [
          {
            "acao": "Implantar área de vivência regulamentar móvel (abrigo com assentos e banheiro químico) na frente de cerca.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Pendente"
          },
          {
            "acao": "Exigir o uso contínuo de perneiras de proteção para evitar picadas de animais peçonhentos na mata.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Providenciar treinamento de tratorista NR-31.12 and Primeiros Socorros para o funcionário Amarildo.",
            "criticidade": "Grave",
            "prazo": "20 dias",
            "status": "Pendente"
          },
          {
            "acao": "Realizar treinamento de Integração NR-31 e assinar ficha de presença.",
            "criticidade": "Moderado",
            "prazo": "15 dias",
            "status": "Pendente"
          }
        ],
        "diagnostico": "Excelente desempenho na gestão de documentos admissionais e programas base (PGRTR/PCMSO vigentes até 2027). A inconformidade reside na ausência completa de área de vivência/banheiro em campo e na falta de uso de perneiras, o que expõe a equipe a ataques de animais peçonhentos típicos do cerrado.",
        "conclusao": "A empresa atende satisfatoriamente a parte documental de SST, devendo sanar com brevidade a infraestrutura de vivência em campo e reforçar a fiscalização de perneiras."
      }
    ]
  },
  {
    "id": "r2_florestal",
    "name": "R2 Florestal",
    "razaoSocial": "R2 Florestal",
    "responsavel": "Edivaldo Ferreira Goncalves",
    "responsavelMiranda": "Cássia Francine Zacarim Lima",
    "ramo": "Silvicultura (Plantio e Tratamento de Mudas)",
    "criticidade": "Crítico",
    "visitas": [
      {
        "dataAuditoria": "19/05/2026",
        "scores": {
          "documental": 0,
          "estrutural": 20,
          "comportamental": 10,
          "global": 10
        },
        "checklist": {
          "documental": {
            "registro": {
              "status": "nao_conforme",
              "desc": "Sem informações de livros de registro ou eSocial no lote."
            },
            "aso": {
              "status": "nao_conforme",
              "desc": "Sem ASOs médicos anexados ou comprovados."
            },
            "pgr": {
              "status": "nao_conforme",
              "desc": "Sem PGR e PCMSO vigentes apresentados."
            },
            "treinamentos": {
              "status": "nao_conforme",
              "desc": "Falta de treinamento de manuseio químico para defensivos."
            },
            "fichas_epi": {
              "status": "nao_conforme",
              "desc": "Ausência de fichas de controle de entrega de EPIs."
            },
            "os": {
              "status": "nao_conforme",
              "desc": "Sem OS de segurança nos Prontuários."
            },
            "integracao": {
              "status": "nao_conforme",
              "desc": "Sem treinamento de integração de SST."
            }
          },
          "estrutural": {
            "refeicao": {
              "status": "nao_conforme",
              "desc": "Instalações de vivência com pouca água disponível e bags de insumos no chão."
            },
            "banheiro": {
              "status": "nao_conforme",
              "desc": "Banheiro da vivência inativo e sendo usado para armazenar agrotóxicos e iscas de formiga."
            },
            "epi_fornecimento": {
              "status": "nao_conforme",
              "desc": "Sem comprovantes formais de distribuição de EPIs."
            },
            "seguranca_geral": {
              "status": "nao_conforme",
              "desc": "Ausência de sanitários móveis nos talhões distantes e tambores de óleo desorganizados."
            }
          },
          "comportamento": {
            "comportamento_seguro": {
              "status": "nao_conforme",
              "desc": "Armazenamento de agrotóxicos no banheiro e desorganização de galões no solo."
            },
            "uso_epi": {
              "status": "nao_conforme",
              "desc": "Tratamento de mudas sem nenhum EPI químico. Tratorista operando sem abafador e sem óculos."
            }
          }
        },
        "planoAcao": [
          {
            "acao": "Suspender preventivamente as atividades de tratamento de mudas até fornecimento/uso de EPIs impermeáveis e respiratórios.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Remover todos os defensivos agrícolas e venenos de formiga de dentro do banheiro da área de vivência.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Limpar, desinfectar e ativar o banheiro para uso dos trabalhadores, provendo água, sabão e papel.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Disponibilizar banheiros químicos móveis nos talhões de plantio distantes da base.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Exigir uso de óculos de proteção para toda a equipe de plantio e protetor auricular para o tratorista Leonardo.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Organizar os tambores de óleo na vivência e construir cercado sinalizado para resíduos e galões vazios.",
            "criticidade": "Grave",
            "prazo": "3 dias",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Estruturar toda a documentação de SST (PGR, PCMSO, ASOs, Registros e OS).",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Andamento",
            "dataConclusao": "26/05/2026"
          }
        ],
        "diagnostico": "Cenário gravíssimo com alto risco ocupacional e ambiental. O banheiro da área de vivência estava sendo usado para estocar veneno e iscas químicas, gerando risco iminente de contaminação da água e alimentos. O manuseio de agrotóxicos no tratamento de mudas é executado com zero proteção individual. Leonardo (tratorista) opera maquinário pesado sem qualquer proteção auditiva ou visual.",
        "conclusao": "A R2 Florestal apresenta desvios graves de conformidade e integridade física. Recomenda-se a paralisação do tratamento de mudas e relocação urgente do estoque de defensivos químicos."
      },
      {
        "dataAuditoria": "26/05/2026",
        "scores": {
          "documental": 0,
          "estrutural": 25,
          "comportamental": 100,
          "global": 42
        },
        "checklist": {
          "documental": {
            "registro": {
              "status": "nao_conforme",
              "desc": "Gestor Moises solicitou prazo para regularizar todos."
            },
            "aso": {
              "status": "nao_conforme",
              "desc": "Sem ASOs anexados ainda."
            },
            "pgr": {
              "status": "nao_conforme",
              "desc": "Sem PGR/PCMSO."
            },
            "treinamentos": {
              "status": "nao_conforme",
              "desc": "Falta treinamento químico."
            },
            "fichas_epi": {
              "status": "nao_conforme",
              "desc": "Ausência de fichas."
            },
            "os": {
              "status": "nao_conforme",
              "desc": "Sem OS."
            },
            "integracao": {
              "status": "nao_conforme",
              "desc": "Sem treinamento."
            }
          },
          "estrutural": {
            "refeicao": {
              "status": "nao_conforme",
              "desc": "Frente de irrigação sem área de vivência (em deslocamento)."
            },
            "banheiro": {
              "status": "nao_conforme",
              "desc": "Banheiro precisa acompanhar frente de trabalho."
            },
            "epi_fornecimento": {
              "status": "nao_conforme",
              "desc": "Sem comprovantes."
            },
            "seguranca_geral": {
              "status": "conforme",
              "desc": "Contêiner de químicos implementado."
            }
          },
          "comportamento": {
            "comportamento_seguro": {
              "status": "conforme",
              "desc": "Organização do contêiner sanada."
            },
            "uso_epi": {
              "status": "conforme",
              "desc": "Excelente comportamento, todos usando EPIs."
            }
          }
        },
        "planoAcao": [
          {
            "acao": "Suspender preventivamente as atividades...",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Remover todos os defensivos agrícolas e venenos...",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Limpar, desinfectar e ativar o banheiro...",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Disponibilizar banheiros químicos móveis...",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Exigir uso de óculos de proteção para toda a equipe...",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Organizar os tambores de óleo na vivência...",
            "criticidade": "Grave",
            "prazo": "3 dias",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Estruturar toda a documentação de SST...",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Em Andamento"
          },
          {
            "acao": "Concluir deslocamento da estrutura de vivência...",
            "criticidade": "Grave",
            "prazo": "Imediato",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          },
          {
            "acao": "Monitorar cronograma de mudança da área...",
            "criticidade": "Moderado",
            "prazo": "15 dias",
            "status": "Concluído",
            "dataConclusao": "26/05/2026"
          }
        ],
        "diagnostico": "Evolução exemplar na cultura de segurança. Sanou-se com sucesso o armazenamento irregular de químicos e houve mudança comportamental drástica das equipes no uso de EPIs. O foco atual é a logística de transporte das áreas de vivência móveis.",
        "conclusao": "A R2 Florestal demonstrou comprometimento e evolução. A principal pendência no momento é a regularização documental e o deslocamento físico da área de vivência para a frente de irrigação."
      }
    ]
  },
  {
    "id": "viana",
    "name": "Viana",
    "razaoSocial": "DS Carvão Black Ltda",
    "responsavel": "Ronaldo Viana",
    "responsavelMiranda": "Cássia Francine Zacarim Lima",
    "ramo": "Carvoaria (Corte e Movimentação de Madeira)",
    "criticidade": "Grave",
    "visitas": [
      {
        "dataAuditoria": "12/05/2026",
        "scores": {
          "documental": 20,
          "estrutural": 50,
          "comportamental": 70,
          "global": 47
        },
        "checklist": {
          "documental": {
            "registro": {
              "status": "conforme",
              "desc": "Registro de todos os 5 empregados formalizados."
            },
            "aso": {
              "status": "nao_conforme",
              "desc": "Ausência completa de ASOs médicos para os 5 colaboradores ativos."
            },
            "pgr": {
              "status": "nao_conforme",
              "desc": "Ausência total de PGR e PCMSO emitidos para a carvoaria."
            },
            "treinamentos": {
              "status": "nao_conforme",
              "desc": "Elcio está como ajudante de carvoaria mas possui curso de tratorista; caracteriza desvio de função."
            },
            "fichas_epi": {
              "status": "nao_conforme",
              "desc": "David e Dergson sem fichas; Francisco com itens genéricos (sem proteção de motosserra) e campos vazios."
            },
            "os": {
              "status": "nao_conforme",
              "desc": "David e Dergson sem OS; Francisco com OSS assinada com ano incorreto retroativo (2023)."
            },
            "integracao": {
              "status": "nao_conforme",
              "desc": "Sem registros de treinamentos de integração NR-31."
            }
          },
          "estrutural": {
            "refeicao": {
              "status": "nao_conforme",
              "desc": "Mesa e bancos de refeição no campo precários, sem ergonomia ou conforto térmico."
            },
            "banheiro": {
              "status": "nao_conforme",
              "desc": "Sanitário limpo e com pia, porém sem insumos básicos (papel higiênico, sabonete, papel toalha)."
            },
            "epi_fornecimento": {
              "status": "conforme",
              "desc": "Equipamentos fornecidos, embora com graves falhas de registro."
            },
            "seguranca_geral": {
              "status": "nao_conforme",
              "desc": "Marmitas conservadas por 7 horas desde as 05h sem estufa ou refrigeração em campo."
            }
          },
          "comportamento": {
            "comportamento_seguro": {
              "status": "conforme",
              "desc": "Equipe proativa e organizada; frentes limpas e combustível bem estocado."
            },
            "uso_epi": {
              "status": "conforme",
              "desc": "Uso regular de EPIs básicos em campo constatado na inspeção visual."
            }
          }
        },
        "planoAcao": [
          {
            "acao": "Fornecer caixas térmicas adequadas ou estufas portáteis para conservação das marmitas (risco crítico de intoxicação).",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Pendente"
          },
          {
            "acao": "Emitir OS e Fichas de EPI para os novos colaboradores David Juneo e Dergson Michel.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Pendente"
          },
          {
            "acao": "Providenciar exames clínicos e emitir ASOs médicos ocupacionais de todos os 5 funcionários.",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Pendente"
          },
          {
            "acao": "Elaborar PGR e PCMSO específicos contemplando riscos de monóxido de carbono e poeiras.",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Pendente"
          },
          {
            "acao": "Abastecer o banheiro com sabonete líquido, papel toalha e papel higiênico de forma regular.",
            "criticidade": "Moderado",
            "prazo": "3 dias",
            "status": "Pendente"
          },
          {
            "acao": "Substituir o mobiliário precário da área de refeição por conjunto ergonômico e adequado da NR-31.",
            "criticidade": "Moderado",
            "prazo": "20 dias",
            "status": "Pendente"
          },
          {
            "acao": "Corrigir a data retroativa da OS de Francisco Pereira e regularizar o desvio de função/cargo de Elcio Nogueira.",
            "criticidade": "Moderado",
            "prazo": "10 dias",
            "status": "Pendente"
          }
        ],
        "diagnostico": "Ótimo comportamento operacional na conservação da limpeza e armazenamento de combustível. Contudo, há graves falhas administrativas (novos funcionários sem OS/fichas de EPI e ausência de ASOs de todos). A principal desconformidade de segurança é o consumo de marmitas azedas por estocagem de 7h sob calor, expondo os trabalhadores a intoxicações.",
        "conclusao": "A frente possui bons hábitos práticos de organização, exigindo melhorias pontuais no mobiliário de vivência, na conservação alimentar e na regularização de prontuários médicos."
      },
      {
        "dataAuditoria": "26/05/2026",
        "scores": {
          "documental": 14,
          "estrutural": 25,
          "comportamental": 100,
          "global": 46
        },
        "checklist": {
          "documental": {
            "registro": {
              "status": "conforme",
              "desc": "Registro de todos os 5 empregados formalizados."
            },
            "aso": {
              "status": "nao_conforme",
              "desc": "Ausência completa de ASOs médicos para os 5 colaboradores ativos."
            },
            "pgr": {
              "status": "nao_conforme",
              "desc": "Ausência total de PGR e PCMSO emitidos para a carvoaria."
            },
            "treinamentos": {
              "status": "nao_conforme",
              "desc": "Elcio está como ajudante de carvoaria mas possui curso de tratorista; caracteriza desvio de função."
            },
            "fichas_epi": {
              "status": "nao_conforme",
              "desc": "David e Dergson sem fichas; Francisco com itens genéricos (sem proteção de motosserra) e campos vazios."
            },
            "os": {
              "status": "nao_conforme",
              "desc": "David e Dergson sem OS; Francisco com OSS assinada com ano incorreto retroativo (2023)."
            },
            "integracao": {
              "status": "nao_conforme",
              "desc": "Sem registros de treinamentos de integração NR-31."
            }
          },
          "estrutural": {
            "refeicao": {
              "status": "nao_conforme",
              "desc": "Mesa e bancos de refeição no campo precários, sem ergonomia ou conforto térmico."
            },
            "banheiro": {
              "status": "nao_conforme",
              "desc": "Sanitário limpo e com pia, porém sem insumos básicos (papel higiênico, sabonete, papel toalha)."
            },
            "epi_fornecimento": {
              "status": "conforme",
              "desc": "Equipamentos fornecidos, embora com graves falhas de registro."
            },
            "seguranca_geral": {
              "status": "nao_conforme",
              "desc": "Marmitas conservadas por 7 horas desde as 05h sem estufa ou refrigeração em campo."
            }
          },
          "comportamento": {
            "comportamento_seguro": {
              "status": "conforme",
              "desc": "Equipe proativa e organizada; frentes limpas e combustível bem estocado."
            },
            "uso_epi": {
              "status": "conforme",
              "desc": "Uso regular de EPIs básicos em campo constatado na inspeção visual."
            }
          }
        },
        "planoAcao": [
          {
            "acao": "Fornecer caixas térmicas adequadas ou estufas portáteis para conservação das marmitas (risco crítico de intoxicação).",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Pendente"
          },
          {
            "acao": "Emitir OS e Fichas de EPI para os novos colaboradores David Juneo e Dergson Michel.",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Pendente"
          },
          {
            "acao": "Providenciar exames clínicos e emitir ASOs médicos ocupacionais de todos os 5 funcionários.",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Pendente"
          },
          {
            "acao": "Elaborar PGR e PCMSO específicos contemplando riscos de monóxido de carbono e poeiras.",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Pendente"
          },
          {
            "acao": "Abastecer o banheiro com sabonete líquido, papel toalha e papel higiênico de forma regular.",
            "criticidade": "Moderado",
            "prazo": "3 dias",
            "status": "Pendente"
          },
          {
            "acao": "Substituir o mobiliário precário da área de refeição por conjunto ergonômico e adequado da NR-31.",
            "criticidade": "Moderado",
            "prazo": "20 dias",
            "status": "Pendente"
          },
          {
            "acao": "Corrigir a data retroativa da OS de Francisco Pereira e regularizar o desvio de função/cargo de Elcio Nogueira.",
            "criticidade": "Moderado",
            "prazo": "10 dias",
            "status": "Pendente"
          }
        ],
        "diagnostico": "Ótimo comportamento operacional na conservação da limpeza e armazenamento de combustível. Contudo, há graves falhas administrativas (novos funcionários sem OS/fichas de EPI e ausência de ASOs de todos). A principal desconformidade de segurança é o consumo de marmitas azedas por estocagem de 7h sob calor, expondo os trabalhadores a intoxicações.",
        "conclusao": "A frente possui bons hábitos práticos de organização, exigindo melhorias pontuais no mobiliário de vivência, na conservação alimentar e na regularização de prontuários médicos."
      }
    ]
  },
  {
    "id": "luiz",
    "name": "Luiz Guimenez",
    "razaoSocial": "J dos Santos Guimenez",
    "responsavel": "Luiz Carlos Gonçalves Guimenezes",
    "responsavelMiranda": "Cássia Francine Zacarim Lima",
    "ramo": "Corte e Processamento de Madeira",
    "criticidade": "Crítico",
    "visitas": [
      {
        "dataAuditoria": "19/06/2026",
        "checklist": {
          "documental": {
            "registro": {
              "status": "conforme",
              "desc": "Registro de Sebastião realizado."
            },
            "aso": {
              "status": "nao_conforme",
              "desc": "Falta ASO para a equipe."
            },
            "fichas_epi": {
              "status": "conforme",
              "desc": "Elaboradas."
            },
            "pgr": {
              "status": "conforme",
              "desc": "Vigente."
            },
            "treinamentos": {
              "status": "nao_conforme",
              "desc": "Treinamento de uso de motosserras pendente."
            },
            "os": {
              "status": "conforme",
              "desc": "OS de Sebastião elaborada."
            },
            "integracao": {
              "status": "nao_conforme",
              "desc": "Pendente"
            }
          },
          "estrutural": {
            "refeicao": {
              "status": "conforme",
              "desc": "Área padrão."
            },
            "banheiro": {
              "status": "conforme",
              "desc": "Área padrão."
            },
            "epi_fornecimento": {
              "status": "nao_conforme",
              "desc": "Equipamentos pendentes de aquisição."
            },
            "seguranca_geral": {
              "status": "nao_conforme",
              "desc": "Falha na fiscalização diária."
            }
          },
          "comportamento": {
            "comportamento_seguro": {
              "status": "nao_conforme",
              "desc": "Negligência quanto ao uso de EPIs."
            },
            "uso_epi": {
              "status": "nao_conforme",
              "desc": "Trabalho com motosserras sem EPIs."
            }
          }
        },
        "planoAcao": [
          {
            "acao": "Aquisição de EPIs anticorte e viseiras",
            "criticidade": "Crítico",
            "prazo": "Imediato",
            "status": "Pendente"
          },
          {
            "acao": "Regularização Documental (ASO)",
            "criticidade": "Grave",
            "prazo": "15 dias",
            "status": "Pendente"
          },
          {
            "acao": "Monitoramento Operacional Diário",
            "criticidade": "Grave",
            "prazo": "Diário",
            "status": "Pendente"
          }
        ],
        "scores": {
          "documental": 17,
          "estrutural": 15,
          "comportamental": 0,
          "global": 32
        }
      }
    ]
  }
];
