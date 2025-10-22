from fastapi import APIRouter
from app.schemas.changepass import changebyotpclass,changebyoldpassclass
from app.controllers.changepassword import changebyotp,change_by_oldpassword
router = APIRouter(prefix="/req/changepass", tags=["changepassword"])

@router.post("/changebyotp")
def changeOTP(body:changebyotpclass):
    return changebyotp(body)

@router.post("/changebyoldpass")
def changebyoldpass(body:changebyoldpassclass):
    return change_by_oldpassword(body)