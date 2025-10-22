from fastapi import APIRouter
from app.schemas.user import EmailRequest
from app.controllers.resetpasswords import resetpassword
router = APIRouter(prefix="/req/resetpass", tags=["resetpass"])

@router.post("/create")
def create(body:EmailRequest):
    return resetpassword(body)