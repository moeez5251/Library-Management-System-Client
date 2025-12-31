from pydantic import BaseModel


class ReturnBook(BaseModel):
    book_id:str
    borrower_id:str