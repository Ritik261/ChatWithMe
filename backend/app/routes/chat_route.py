from fastapi import APIRouter, HTTPException, File, UploadFile
from app.model.message_model import message, query
from app.services.rag_setup import query_rag
from app.services.file_upload import upload_file
import os
import shutil

router = APIRouter(tags=["main_routes"])

@router.get("/api")
async def check():
    return{"message":"check route working"}

@router.post("/upload")
async def upload(email: str,file: UploadFile = File(...)):

    #response = await upload_file(file)
    return await upload_file(email, file)

@router.post("/chat")
async def chat(q: query):
    ans = await query_rag(q)
    return ans
