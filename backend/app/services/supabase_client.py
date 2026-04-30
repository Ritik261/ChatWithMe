import os
from dotenv import load_dotenv
from supabase import create_client

# Load environment variables
load_dotenv()

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")

if not supabase_url or not supabase_key:
    # We can either raise an error or just print a warning if we expect them to be set later
    # But for the client to work, they are required.
    print(f"Warning: SUPABASE_URL or SUPABASE_KEY is missing. URL: {supabase_url}")

supabase = create_client(supabase_url, supabase_key)
