from pydantic import BaseModel

class changebyotpclass(BaseModel):
    user_id:str
    password:str    

class changebyoldpassclass(BaseModel):
    user_id:str
    old_password:str
    new_password:str