from fastapi import FastAPI
from app.routes.chat_route import router

app = FastAPI()
app.include_router(router)

@app.get("/")
async def home():
    return {"Message": "home route working"}

@app.get("/check")
def check():
    return {"check":"working"}