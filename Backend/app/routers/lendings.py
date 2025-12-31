from fastapi import APIRouter,Request
from app.schemas.lenders import  ReturnBook
from app.controllers.lenders import get_lendings,return_book
router = APIRouter(prefix="/req/lenders", tags=["lenders"])

@router.get("/getbyid")
def getbyid(request:Request):
    return get_lendings(request)


@router.post("/returnbook")
def returnbook(lender:ReturnBook,request:Request):
    return return_book(lender,request)