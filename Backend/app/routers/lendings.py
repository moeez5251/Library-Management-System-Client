from fastapi import APIRouter
from app.schemas.lenders import Lenderget, ReturnBook
from app.controllers.lenders import get_lendings,return_book
router = APIRouter(prefix="/req/lenders", tags=["lenders"])

@router.post("/getbyid")
def getbyid(lender:Lenderget):
    return get_lendings(lender)


@router.post("/returnbook")
def returnbook(lender:ReturnBook):
    return return_book(lender)