import zipfile
import xml.etree.ElementTree as ET
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

f = r"d:\StudioSimple - Antigravity\TEMARIOS EELL\Septimo\Plan_de_Estudios_Optimizado_7Basico.docx"
output_dir = r"d:\StudioSimple - Antigravity\scratch_docs"
out_file = os.path.join(output_dir, "Plan_de_Estudios_Optimizado_7Basico.txt")
text = extract_docx_text(f)
with open(out_file, "w", encoding="utf-8") as out:
    out.write(text)
print(f"Extracted: {out_file} ({len(text)} chars)")
