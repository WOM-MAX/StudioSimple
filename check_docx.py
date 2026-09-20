try:
    import docx
    print("python-docx is installed version:", docx.__version__)
except ImportError:
    print("python-docx is NOT installed")
