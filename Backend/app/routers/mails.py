from fastapi import APIRouter
from app.schemas.mails import Mail,Issue_mail
from app.controllers.mails import send_otp,reset_otp,issue_mail
router = APIRouter(prefix="/req/mail", tags=["mails"])

@router.post("/send-mail")
def send_mail(mail: Mail):
    return send_otp(mail)

@router.post("/reset-mail")
def reset_mail(mail: Mail):
    return reset_otp(mail)

@router.post("/issue-mail")
def issue(mail: Issue_mail):
    return issue_mail(mail)