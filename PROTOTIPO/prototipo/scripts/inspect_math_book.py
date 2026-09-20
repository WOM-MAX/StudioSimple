import os
import pypdf

pdf_path = "D:\\StudioSimple - Antigravity\\CONOCIMIENTO\\ACADEMICO\\MATERIALES\\110-7\\Matemática.pdf"
if os.path.exists(pdf_path):
    reader = pypdf.PdfReader(pdf_path)
    print(f"Total pages in Matemática.pdf: {len(reader.pages)}")
    # Read first 10 pages to find table of contents
    for i in range(min(12, len(reader.pages))):
        text = reader.pages[i].extract_text() or ""
        if "índice" in text.lower() or "contenido" in text.lower() or "unidad" in text.lower():
            print(f"--- PAGE {i+1} ---")
            print(text[:800])
else:
    print("PDF not found")
