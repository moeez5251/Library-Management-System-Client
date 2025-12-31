from pydantic import BaseModel

class changebyotpclass(BaseModel):
    password:str    

class changebyoldpassclass(BaseModel):
    old_password:str
    new_password:str