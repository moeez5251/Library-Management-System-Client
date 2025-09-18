from pydantic import BaseModel,datetime_parse
from datetime import datetime,date
class Book(BaseModel):
    id: str
class LendBook(BaseModel):
    book_id: str
    user_id: str
    BookTitle: str
    PhoneNumber: str
    Author: str
    IssuedDate: date
    DueDate: date
    CopiesLent: int
    FinePerDay: int
    Price: float