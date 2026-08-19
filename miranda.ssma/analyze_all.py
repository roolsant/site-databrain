"""
Parse all extracted text files and extract scores/action plans for each company.
This script reads the text and generates a summary per company per visit.
"""
import os
import re

EXTRACTED = "extracted_texts"

def read(fname):
    p = os.path.join(EXTRACTED, fname)
    if os.path.exists(p):
        return open(p, encoding='utf-8').read()
    return ""

def find_score(text, keyword):
    """Look for percentage scores near keyword"""
    pattern = rf'{keyword}[^\d]*?(\d{{1,3}})[\s%]'
    m = re.search(pattern, text, re.IGNORECASE)
    if m:
        return int(m.group(1))
    return None

def extract_date(text):
    """Find audit date"""
    m = re.search(r'DATA[:\s]*\r?\n\r?\n(\d{2}/\d{2}/\d{4})', text)
    if m:
        return m.group(1)
    m = re.search(r'(\d{2}/\d{2}/\d{4})', text)
    if m:
        return m.group(1)
    return None

def extract_scores(text):
    """Extract documental, estrutural, comportamental scores from text"""
    scores = {}
    
    # Common patterns for scores
    for key, patterns in [
        ('documental', ['documental', 'documentação', 'documental']),
        ('estrutural', ['estrutural', 'instalações', 'estrutura']),
        ('comportamental', ['comportamental', 'comportamento', 'epi']),
        ('global', ['global', 'geral', 'total', 'final'])
    ]:
        for pat in patterns:
            m = re.search(rf'{pat}[^%\n]{{0,30}}?(\d{{1,3}})%', text, re.IGNORECASE)
            if m:
                scores[key] = int(m.group(1))
                break
    
    return scores

# Files to summarize
files_map = {
    # Edivaldo
    "edivaldo": [
        ("Edivaldo.docx.txt", "Maio"),
        ("Edivaldo_Junho_26.docx.txt", "Junho"),
        ("Edivaldo_Julho_26.docx.txt", "Julho"),
    ],
    # Luiz Guimenez
    "luiz": [
        ("Luiz_Guimenez_Junho_26.docx.txt", "Junho"),
        ("Luiz_Guimenez_Julho_26.docx.txt", "Julho"),
    ],
    # Restaurante
    "restaurante": [
        ("MS restaurante relatorio.docx.txt", "Maio"),
        ("MS_Restaurante_Junho_26.docx.txt", "Junho"),
        ("MS_Restaurante_Julho_26.docx.txt", "Julho"),
    ],
    # Mauro
    "mauro": [
        ("Mauro Carvoaria.docx.txt", "Maio"),
        ("Mauro_Honorato_Junho_26..docx.txt", "Junho"),
        ("Mauro_Honorato_Julho_26.docx.txt", "Julho"),
    ],
    # Michel
    "michel": [
        ("Michel.docx.txt", "Maio"),
        ("Michel_Junho_26.docx.txt", "Junho"),
        ("Michel_Julho_26.docx.txt", "Julho"),
    ],
    # R2 Florestal
    "r2": [
        ("R2.docx.txt", "Maio"),
        ("R2_Florestal_Junho_26.docx.txt", "Junho"),
        ("R2_Florestal_Julho_26.docx.txt", "Julho"),
    ],
    # Viana (RVC)
    "viana_rvc": [
        ("Relatorio RVC.doc.txt", "Maio"),
        ("RVC_Junho_26.docx.txt", "Junho"),
        ("RVC_Julho_26.docx.txt", "Julho"),
    ],
    # Nível Gomes (Gersy)
    "nivel_gomes": [
        ("Gersy_Maio_26.docx.txt", "Maio"),
        ("Gersy_Junho_26.docx.txt", "Junho"),
    ],
    # Eloisio - NEW
    "eloisio": [
        ("Eloisio de Souza.doc.txt", "Maio"),
        ("Eloisio _de_Souza_Junho_26.docx.txt", "Junho"),
        ("Eloisio_de_Souza_Agosto_26.docx.txt", "Agosto"),
    ],
    # Fazenda
    "fazenda": [
        ("Fazenda_Santa_Verginia_Maio_26.docx.txt", "Maio"),
        ("Fazenda_Santa_Verginia_Junho_26.docx.txt", "Junho"),
        ("Fazenda_Santa_Verginia_Julho_26.docx.txt", "Julho"),
        ("Fazenda_Santa_Verginia_Retiros_Junho_26.docx.txt", "Junho-Retiros"),
        ("Fazenda_Santa_Verginia_Vivencia_Julho_26.docx.txt", "Julho-Vivencia"),
        ("Fazenda_Santa_Verginia_Vivencia_Agosto_26.docx.txt", "Agosto-Vivencia"),
    ],
}

print("=== RELATÓRIO DE EXTRAÇÃO DE DADOS ===\n")
for company, files in files_map.items():
    print(f"\n--- {company.upper()} ---")
    for fname, mes in files:
        text = read(fname)
        if not text:
            print(f"  [{mes}] ARQUIVO NÃO ENCONTRADO: {fname}")
            continue
        print(f"  [{mes}] {fname}: {len(text)} chars")
        # Extract first date
        m = re.search(r'(\d{2}/\d{2}/\d{4})', text)
        if m:
            print(f"    Data encontrada: {m.group(1)}")
        # Look for scores %
        pcts = re.findall(r'(\d{1,3})%', text)
        if pcts:
            print(f"    Percentuais: {pcts[:10]}")
        # Look for action plan items
        plans = re.findall(r'(?:Pendente|Em andamento|Concluído|Concluido)', text, re.IGNORECASE)
        print(f"    Status planos de ação: {plans[:5]}")
