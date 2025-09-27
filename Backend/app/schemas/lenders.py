from pydantic import BaseModel

class Lenderget(BaseModel):
    user_id:str
class ReturnBook(BaseModel):
    user_id:str
    book_id:str
    borrower_id:str