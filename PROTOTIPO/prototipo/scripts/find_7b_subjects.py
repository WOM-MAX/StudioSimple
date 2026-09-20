import openpyxl

wb = openpyxl.load_workbook(r"d:\StudioSimple - Antigravity\Base-Excel\planes_consolidados_master_enriquecido.xlsx", read_only=True)
sheet = wb.active

subjects = set()
for row in sheet.iter_rows(min_row=2, values_only=True):
    curso = str(row[0] or '')
    asig = str(row[1] or '')
    if '7' in curso:
        subjects.add(asig)

print("Subjects for 7° Básico in Excel:")
for s in sorted(subjects):
    print(f" - '{s}'")
