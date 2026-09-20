import zipfile
import xml.etree.ElementTree as ET
import sys
import os

def extract_docx_text(docx_path):
    if not os.path.exists(docx_path):
        return f"File not found: {docx_path}"
    try:
        with zipfile.ZipFile(docx_path) as z:
            xml_content = z.read("word/document.xml")
            tree = ET.fromstring(xml_content)
            namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            paragraphs = []
            for p in tree.iterfind('.//w:p', namespaces):
                texts = [node.text for node in p.iterfind('.//w:t', namespaces) if node.text]
                if texts:
                    paragraphs.append("".join(texts))
            return "\n".join(paragraphs)
    except Exception as e:
        return f"Error reading {docx_path}: {e}"

files = [
    r"d:\StudioSimple - Antigravity\PROTOTIPO\Mapa_Flujo_Sincronizado_Clase1_OA1_EstudioSimple.docx",
    r"d:\StudioSimple - Antigravity\PROTOTIPO\Plan_de_Avance_Prototipo_EstudioSimple.docx",
    r"d:\StudioSimple - Antigravity\Estructura de las lecciones\Estructura Pedagógica Paralela App Exámenes Libres.docx"
]

output_dir = r"d:\StudioSimple - Antigravity\scratch_docs"
os.makedirs(output_dir, exist_ok=True)

for f in files:
    base = os.path.splitext(os.path.basename(f))[0]
    out_file = os.path.join(output_dir, f"{base}.txt")
    text = extract_docx_text(f)
    with open(out_file, "w", encoding="utf-8") as out:
        out.write(text)
    print(f"Extracted: {out_file} ({len(text)} chars)")
