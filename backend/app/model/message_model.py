from pydantic import BaseModel

class message(BaseModel):
    query:str 

class query(BaseModel):
    query:str