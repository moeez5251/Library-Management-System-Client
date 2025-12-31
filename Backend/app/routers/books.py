from fastapi import APIRouter,Request
from app.schemas.book import LendBook
from app.controllers.books import get_books,lend_book
router = APIRouter(prefix="/req/books", tags=["books"])

@router.get("/getall")
def get_all_books():
    return get_books()


@router.post("/lend")
def lend(book:LendBook,request:Request):
    return lend_book(book,request)