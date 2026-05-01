from langchain_community.embeddings.dashscope import BATCH_SIZE
from h11._abnf import chunk_size
from fastapi import File, UploadFile
from fastapi.responses import JSONResponse
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_openai import AzureOpenAIEmbeddings
from app.services.rag_setup import set_uploaded_file
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from app.services.supabase_client import supabase
import os, shutil

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

async def upload_file(email, file):

    type_of_data = file.content_type

    if (type_of_data != "application/pdf"):
        
        return {"message":"please upload a pdf only, we dont support images right now 😊"}
       
   
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # set file path
    set_uploaded_file(file_path)

    #loading
    loader = PyMuPDFLoader(file_path)
    documents = loader.load()

    #chunking
    split = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    documents_chunks = split.split_documents(documents)

    #embedding
    embeddings = AzureOpenAIEmbeddings(
        azure_deployment=os.getenv("AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT"),
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        api_key=os.getenv("AZURE_OPENAI_EMBEDDINGS_API_KEY"),
        api_version=os.getenv("api_version")
    )

    # vector store 
    # vectorstore = FAISS.from_documents(documents_chunks, embeddings)
    # vectorstore.save_local("faiss_index")

    texts = [doc.page_content for doc in documents_chunks]
    vectors = embeddings.embed_documents(texts)
    data = []

    for text, vector in zip(texts,vectors):
        data.append({
            "content":text,
            "embedding":vector,
            "file_id": file_path,
            "email": email,
            "metadata":{"source":file_path}
        })

    BATCH_SIZE = 50

    for i in range(0, len(data), BATCH_SIZE):
        supabase.table("documents").insert(data[i:i+BATCH_SIZE]).execute()   

    return {
        "filename":file.filename,
        "content_type": file.content_type,
        "message":"File upload & Index Created success ✨"
    }
