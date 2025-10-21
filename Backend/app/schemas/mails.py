from pydantic import BaseModel,EmailStr

class Mail(BaseModel):
    name:str
    to:EmailStr
class Otp(BaseModel):
    otp:str
    email:EmailStr

class Issue_mail(BaseModel):
    sender:EmailStr
    subject:str
    issue:str
    name:str