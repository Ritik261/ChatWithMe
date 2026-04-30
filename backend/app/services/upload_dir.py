UPLOADED_FILE = "uploads/Sample_Resume_Ritik_Singh.pdf"
_chain = None

def set_uploaded_file(path: str):
    global UPLOADED_FILE, _chain
    UPLOADED_FILE = path
    _chain = None