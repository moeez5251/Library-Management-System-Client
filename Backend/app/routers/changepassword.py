from fastapi import APIRouter,Request
from app.schemas.changepass import changebyotpclass,changebyoldpassclass
from app.controllers.changepassword import changebyotp,change_by_oldpassword
router = APIRouter(prefix="/req/changepass", tags=["changepassword"])

@router.post("/changebyotp")
def changeOTP(body:changebyotpclass,request:Request):
    return changebyotp(body,request)

@router.post("/changebyoldpass")
def changebyoldpass(body:changebyoldpassclass,request:Request):
    return change_by_oldpassword(body,request)