import os

search_roots = ["D:\\", "E:\\"]
found = []

for root in search_roots:
    try:
        for entry in os.scandir(root):
            if entry.is_dir():
                if "material" in entry.name.lower():
                    found.append(entry.path)
                # check 1 level deep
                try:
                    for sub in os.scandir(entry.path):
                        if sub.is_dir() and "material" in sub.name.lower():
                            found.append(sub.path)
                except Exception:
                    pass
    except Exception:
        pass

print("Folders found:", found)
