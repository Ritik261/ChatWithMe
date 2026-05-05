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
            You are an helpful assistant that answers from the provided context.
            
            Context: {context}.

            query : {query}

            if:
                you dont have any context to answer means there is no docs uploaded, return you dont have Knowledge Source document context to answer, upload at least 1 document to continue
            else - if:
                there are uploaded files in db but the query does not match with any of the provided context then write "response is not provided in the uploaded documents"
            else:
                return details.
        """
    )

    def retrieve_context(input_data):
        query_text = input_data["query"]
        email = input_data.get("email")
        print("########## query ##########", query_text)
        print("########## email ##########", email)
        
        query_vector = embedding.embed_query(query_text)
        print("##### query Vector #########", len(query_vector))
        
        response = supabase.rpc(
            "match_documents",
            {
                "query_embedding": query_vector,
                "filter_email": email,
                "match_count": 5
            }
        ).execute()
        #print("########### Email ######################", email)

        print("response", response)
       
        if response.data:
            return "\n\n".join([doc.get("content", "") for doc in response.data])
        return ""

    _chain = (
        {            
            "query": lambda x: x["query"],
            "context": retrieve_context

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
