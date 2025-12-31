from pydantic import BaseModel, EmailStr
from datetime import datetime,date

class ReservationCreate(BaseModel):
    book_id: str
    reservation_date:datetime
