from pydantic import BaseModel,EmailStr

class Mail(BaseModel):
    name:str
    to:EmailStr
    