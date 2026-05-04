from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.chat_route import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
async def home():
    return {"Message": "home route working"}

@app.get("/check")
def check():
    return {"check":"working"}