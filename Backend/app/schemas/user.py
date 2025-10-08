from pydantic import BaseModel,EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password: str
class UserSignUp(BaseModel):
    name:str
    email:EmailStr
    password:str
class EmailRequest(BaseModel):
    email: str
class GetUser(BaseModel):
    user_id:str