from pydantic import BaseModel
from datetime import datetime
class Book(BaseModel):
    id: str
class LendBook(BaseModel):
    book_id: str
    user_id: str
    IssuedDate: datetime
    DueDate: datetime
    CopiesLent: int
    FinePerDay: int
    