import shutil
import os
import subprocess

source = r"d:\StudioSimple - Antigravity\OA01_Matematica_7Basico_Lecciones_Completas_y_Guiones.docx"
desktop = os.path.expanduser(r"~\Desktop\OA01_Matematica_7Basico_Lecciones_Completas_y_Guiones.docx")
downloads = os.path.expanduser(r"~\Downloads\OA01_Matematica_7Basico_Lecciones_Completas_y_Guiones.docx")

# Copiar al Escritorio
try:
    shutil.copy2(source, desktop)
    print("Copiado con exito al Escritorio:", desktop)
except Exception as e:
    print("Error copiando al Escritorio:", e)

# Copiar a Descargas
try:
    shutil.copy2(source, downloads)
    print("Copiado con exito a Descargas:", downloads)
except Exception as e:
    print("Error copiando a Descargas:", e)

# Abrir el archivo en Microsoft Word en la pantalla del usuario
try:
    os.startfile(desktop)
    print("Archivo Word abierto automaticamente en Windows.")
except Exception as e:
    print("Error abriendo archivo:", e)
