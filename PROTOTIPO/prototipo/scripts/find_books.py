import os

paths_to_check = [
    "E:\\VIDEOS STUDIOSIMPLE\\MATERIALES",
    "D:\\StudioSimple - Antigravity\\TEMARIOS EELL",
    "D:\\EstudioSimple-Contenido\\TEMARIOS EELL",
    "D:\\StudioSimple - Antigravity\\CONOCIMIENTO",
    "D:\\StudioSimple - Antigravity\\PLANTILLAS"
]

for p in paths_to_check:
    if os.path.exists(p):
        print("=== DIR:", p)
        for root, dirs, files in os.walk(p):
            for f in files:
                if f.endswith(('.pdf', '.epub', '.mobi')):
                    print("  BOOK:", os.path.join(root, f))
                elif not f.startswith('.'):
                    print("  FILE:", f)
