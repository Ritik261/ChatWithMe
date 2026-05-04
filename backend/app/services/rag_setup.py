from app.model.message_model import query
from langchain_openai import AzureOpenAIEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
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
    # openai embeddings

    embedding = AzureOpenAIEmbeddings(
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        azure_deployment=os.getenv("AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT"),
        api_key=os.getenv("AZURE_OPENAI_EMBEDDINGS_API_KEY"),
        api_version=os.getenv("api_version")
    )

    # llm = AzureChatOpenAI(
    #     azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    #     api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    #     azure_deployment=os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT"),
    #     api_version=os.getenv("api_version"),
    #     temperature=0
    # )



    ################### Google Chat & Embedding Models ######################

    # google_embedding = GoogleGenerativeAIEmbeddings(
    #     model= os.getenv("GOOGLE_EMBEDDING_MODEL"),
    #     output_dimensionality=1536
    # )

    google_llm = ChatGoogleGenerativeAI(
        model = os.getenv("GOOGLE_CHAT_MODEL")
        
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
        print("##### query Vector #########", len(query_vector))
        email = input_data["email"]
        
        response = supabase.rpc(
            "match_documents",
            {
                "query_embedding": query_vector,
                "email": email,
                "match_count":5
            }
        ).execute()
        print("########### Email ######################", email)
        if response.data:
            return "\n\n".join([doc.get("content", "") for doc in response.data])
        return ""

    _chain = (
        {
            "context": retrieve_context,
            "query": lambda x: x["query"],
            "email": lambda x: x["email"]
        }
        | prompt
        | google_llm
        | StrOutputParser()
    )

    return _chain

async def query_rag(q: query):
    chain = await rag_setup()
    
    # Invoke the chain with the query string
    response = await chain.ainvoke(
        {
            "query": q.query,
            "email": q.email
        })
    
    print("##################### Rag Result ############################", response)

    return {"answer": response}
