import os

path = "D:\\MATERIALES STUDIOSIMPLE"
if os.path.exists(path):
    for root, dirs, files in os.walk(path):
        print("DIR:", root)
        for f in files:
            print("  FILE:", f)
else:
    print("Path not found")
