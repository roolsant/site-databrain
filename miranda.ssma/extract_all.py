import os
import glob
import docx2txt

# Files to extract - prioritize new files (Julho, Agosto) and new companies
files_to_extract = [
    # Novos meses (Julho)
    "Edivaldo_Julho_26.docx",
    "Luiz_Guimenez_Julho_26.docx",
    "MS_Restaurante_Julho_26.docx",
    "Mauro_Honorato_Julho_26.docx",
    "Michel_Julho_26.docx",
    "R2_Florestal_Julho_26.docx",
    "RVC_Julho_26.docx",
    # Agosto
    "Eloisio_de_Souza_Agosto_26.docx",
    # Fazenda novos setores
    "Fazenda_Santa_Verginia_Julho_26.docx",
    "Fazenda_Santa_Verginia_Retiros_Junho_26.docx",
    "Fazenda_Santa_Verginia_Vivencia_Julho_26.docx",
    "Fazenda_Santa_Verginia_Vivencia_Agosto_26.docx",
    # Novas empresas (Gersy, Eloisio, RVC)
    "Gersy_Maio_26.docx",
    "Gersy_Junho_26.docx",
    "Eloisio_de_Souza_Maio_26.doc",
    "Eloisio_de_Souza_Junho_26.docx",
    "RVC_Maio_26.doc",
    "RVC_Junho_26.docx",
    # Luiz Junho (may have been missing)
    "Luiz_Guimenez_Junho_26.docx",
]

output_dir = "extracted_texts"
os.makedirs(output_dir, exist_ok=True)

for fname in files_to_extract:
    if os.path.exists(fname):
        try:
            text = docx2txt.process(fname)
            out_path = os.path.join(output_dir, fname + ".txt")
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(text)
            print(f"OK: {fname} -> {len(text)} chars")
        except Exception as e:
            print(f"ERROR: {fname}: {e}")
    else:
        print(f"NOT FOUND: {fname}")
