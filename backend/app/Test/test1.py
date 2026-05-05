import os
import sys
import asyncio
from dotenv import load_dotenv

# Add the backend directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

from app.services.supabase_client import supabase
from langchain_openai import AzureOpenAIEmbeddings

# Load environment variables
load_dotenv()

async def test_retrieval():
    # Initialize Embeddings (matching your rag_setup.py config)
    embedding = AzureOpenAIEmbeddings(
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        azure_deployment=os.getenv("AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT"),
        api_key=os.getenv("AZURE_OPENAI_EMBEDDINGS_API_KEY"),
        api_version=os.getenv("api_version")
    )

    # --- TEST DATA ---
    # Change these to match a PDF you have already uploaded!
    test_query = "What is the primary objective of a smart home hub?" 
    test_email = "ritiks@unifycloud.com" 

    print(f"--- Starting Retrieval Test ---")
    print(f"Query: {test_query}")
    print(f"Email: {test_email}\n")

    try:
        # 1. Generate Embedding
        print("Step 1: Generating query embedding...")
        query_vector = embedding.embed_query(test_query)
        print(f"##### Query Vector Generated ######### Length: {len(query_vector)}")

        # 2. Call Supabase RPC
        print("Step 2: Calling Supabase 'match_documents' RPC...")
        response = supabase.rpc(
            "match_documents",
            {
                "query_embedding": query_vector,
                "email": test_email,
                "match_count": 5
            }
        ).execute()

        # 3. Process Results
        print(f"########### Supabase Response for {test_email} ###########")
        if response.data:
            print(f"✅ Success! Retrieved {len(response.data)} relevant document chunks.")
            for i, doc in enumerate(response.data):
                content = doc.get("content", "No content")
                similarity = doc.get("similarity", "N/A")
                print(f"\n--- Chunk {i+1} (Similarity: {similarity}) ---")
                print(f"{content[:300]}...") 
        else:
            print("❌ No documents found. Possible reasons:")
            print("- The email doesn't match the one used during upload.")
            print("- The 'match_documents' function logic in Supabase is filtering them out.")
            print("- No documents have been indexed yet for this email.")

    except Exception as e:
        print(f"❗ Error during test: {str(e)}")

if __name__ == "__main__":
    asyncio.run(test_retrieval())