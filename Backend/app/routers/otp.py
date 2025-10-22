from fastapi import APIRouter
from app.schemas.otpschema import Otp
from app.controllers.otp import verifyotp
router = APIRouter(prefix="/req/otp", tags=["otp"])

@router.post("/verify")
def verify(body:Otp):
    return verifyotp(body)