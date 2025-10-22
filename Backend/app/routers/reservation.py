from fastapi import APIRouter
from app.schemas.reservations import ReservationCreate,Reservationget
from app.controllers.reservations import reserve_book,get_reservation
router = APIRouter(prefix="/req/reservation", tags=["reservation"])

@router.post("/reserve")
def reserve(reservation: ReservationCreate):
  return reserve_book(reservation)

@router.post("/getbyid")
def getbyid(reservation:Reservationget):
    return get_reservation(reservation)