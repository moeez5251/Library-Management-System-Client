from fastapi import APIRouter
from app.schemas.mails import Mail
from app.controllers.mails import send_otp,reset_otp
router = APIRouter(prefix="/mail", tags=["mails"])

@router.post("/send-mail")
def send_mail(mail: Mail):
    return send_otp(mail)

@router.post("/reset-mail")
def reset_mail(mail: Mail):
    return reset_otp(mail)