import shutil
import os

source = r"d:\StudioSimple - Antigravity\OA01_Matematica_7Basico_Lecciones_Completas_y_Guiones.docx"

dest_artifact = r"C:\Users\walte\.gemini\antigravity-ide\brain\655fb28a-3386-4d26-8ad2-b20fe9d84a93\OA01_Matematica_7Basico_Lecciones_Completas_y_Guiones.docx"
dest_public = r"d:\StudioSimple - Antigravity\Web Studio Simple\public\OA01_Matematica_7Basico_Lecciones_Completas_y_Guiones.docx"

# Copiar a artifacts
os.makedirs(os.path.dirname(dest_artifact), exist_ok=True)
shutil.copy2(source, dest_artifact)
print("Copiado a artefactos:", dest_artifact)

# Copiar a public
os.makedirs(os.path.dirname(dest_public), exist_ok=True)
shutil.copy2(source, dest_public)
print("Copiado a public:", dest_public)
