from fastapi import APIRouter
from app.schemas.mails import Mail
from app.controllers.mails import send_otp
router = APIRouter(prefix="/mail", tags=["mails"])

@router.post("/send-mail")
def send_mail(mail: Mail):
    return send_otp(mail)