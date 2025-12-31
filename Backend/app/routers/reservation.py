from fastapi import APIRouter,Request
from app.schemas.reservations import ReservationCreate
from app.controllers.reservations import reserve_book,get_reservation
router = APIRouter(prefix="/req/reservation", tags=["reservation"])

@router.post("/reserve")
def reserve(reservation: ReservationCreate,request:Request):
  return reserve_book(reservation,request)

@router.get("/getbyid")
def getbyid(request:Request):
    return get_reservation(request)