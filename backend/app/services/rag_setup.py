from app.model.message_model import query
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import AzureChatOpenAI, AzureOpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from app.services.supabase_client import supabase
import os
from dotenv import load_dotenv
load_dotenv()

UPLOADED_FILE = "uploads/Sample_Resume_Ritik_Singh.pdf"
_chain = None

def set_uploaded_file(path: str):
    global UPLOADED_FILE, _chain
    UPLOADED_FILE = path
    _chain = None

async def rag_setup():
    # embeddings
    embedding = AzureOpenAIEmbeddings(
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        azure_deployment=os.getenv("AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT"),
        api_key=os.getenv("AZURE_OPENAI_EMBEDDINGS_API_KEY"),
        api_version=os.getenv("api_version")
    )

    llm = AzureChatOpenAI(
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        api_key=os.getenv("AZURE_OPENAI_API_KEY"),
        azure_deployment=os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT"),
        api_version=os.getenv("api_version"),
        temperature=0
    )

    prompt = ChatPromptTemplate.from_template(
        """
            You are an helpful assitant that answers from the provided context.
            
            Context: {context}.

            query : {query}

            return short, accurate answer only, no extra text.
        """
    )

    def retrieve_context(input_data):
        query_text = input_data["query"]
        query_vector = embedding.embed_query(query_text)
        
        response = supabase.rpc(
            "match_documents",
            {
                "query_embedding": query_vector,
                "match_count": 5
            }
        ).execute()
        print("########### retrieved responnse ######################", response.data)
        if response.data:
            return "\n\n".join([doc.get("content", "") for doc in response.data])
        return ""

    _chain = (
        {
            "context": retrieve_context,
            "query": lambda x: x["query"]
        }
        | prompt
        | llm
        | StrOutputParser()
    )

    return _chain

async def query_rag(q: query):
    chain = await rag_setup()
    
    # Invoke the chain with the query string
    response = await chain.ainvoke({"query": q.query})
    
    print("##################### Rag Result ############################", response)

    return {"answer": response}
