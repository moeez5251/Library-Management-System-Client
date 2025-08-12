from pydantic import BaseModel,EmailStr

class AuthUser(BaseModel):
    email:EmailStr
    google_id:str
    name:str