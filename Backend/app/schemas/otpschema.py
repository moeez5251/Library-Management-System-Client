from pydantic import BaseModel,EmailStr

class Otp(BaseModel):
    otp:str
    email:EmailStr