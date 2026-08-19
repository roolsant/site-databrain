"""
Extract text from old-format .doc files using olefile + brute force text extraction
"""
import olefile
import re

def extract_doc_text(filename):
    """Extract readable text from .doc binary format"""
    try:
        ole = olefile.OleFileIO(filename)
        
        # Try to get 1Table or 0Table + WordDocument stream
        text_chunks = []
        
        for stream_name in ole.listdir():
            stream_path = '/'.join(stream_name)
            try:
                data = ole.openstream(stream_name).read()
                # Extract readable ASCII/Latin text sequences
                # Look for sequences of printable characters >= 4 chars
                readable = re.findall(b'[ -~\t\r\n]{4,}', data)
                for chunk in readable:
                    try:
                        decoded = chunk.decode('latin-1').strip()
                        if len(decoded) > 10:
                            text_chunks.append(decoded)
                    except:
                        pass
            except:
                pass
        
        ole.close()
        return '\n'.join(text_chunks)
    except Exception as e:
        return f"ERROR: {e}"

# Extract Eloisio Maio
text = extract_doc_text('Eloisio_de_Souza_Maio_26.doc')
with open('extracted_texts/Eloisio_de_Souza_Maio_26.doc.txt', 'w', encoding='utf-8') as f:
    f.write(text)
print(f"Eloisio Maio: {len(text)} chars")

# Extract RVC Maio
text2 = extract_doc_text('RVC_Maio_26.doc')
with open('extracted_texts/RVC_Maio_26.doc.txt', 'w', encoding='utf-8') as f:
    f.write(text2)
print(f"RVC Maio: {len(text2)} chars")
