from pydantic import BaseModel,datetime_parse
from datetime import datetime,date
class Book(BaseModel):
    id: str
class LendBook(BaseModel):
    book_id: str
    user_id: str
    PhoneNumber: str
    IssuedDate: date
    DueDate: date
    CopiesLent: int
    FinePerDay: int
    