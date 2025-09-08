from pydantic import BaseModel

class Book(BaseModel):
    id: str
class LendBook(BaseModel):
    book_id: str
    user_id: str