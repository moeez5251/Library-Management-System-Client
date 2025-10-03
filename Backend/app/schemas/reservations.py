from pydantic import BaseModel, EmailStr
from datetime import datetime,date

class ReservationCreate(BaseModel):
    user_id: str
    book_id: str
    reservation_date:datetime
class Reservationget(BaseModel):
    user_id: str