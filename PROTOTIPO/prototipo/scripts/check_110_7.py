import os

path = "D:\\StudioSimple - Antigravity\\CONOCIMIENTO\\ACADEMICO\\MATERIALES\\110-7"
if os.path.exists(path):
    print("Found 110-7:")
    for entry in os.scandir(path):
        print(" ", entry.name, "(DIR)" if entry.is_dir() else "(FILE)")
else:
    print("110-7 not found at that path")
