from fastapi import APIRouter, HTTPException
from app.database import get_connection
from app.schemas.book import Book,LendBook
router = APIRouter(prefix="/books", tags=["books"])


@router.get("/getall")
def get_books():
    conn=get_connection()
    cursor=conn.cursor()
    try:
       cursor.execute("SELECT Book_ID, Book_Title, Author, Category, Language, Status, Pages, Price, Available FROM books")
       result=cursor.fetchall()
       keys=["id", "name", "Author", "Category", "Language", "Status", "Pages", "price", "Available_Copies"]
       books_dict_list = [dict(zip(keys, book)) for book in result]
       return books_dict_list
    except Exception as e:  
        raise HTTPException(status_code=500, detail=f"Database error {e}",)
    finally:
        conn.close()
@router.post("/lend")
def lend_book(book:LendBook):
    conn=get_connection()
    cursor=conn.cursor()
    try:
        cursor.execute("INSERT INTO lent_books (Book_ID, User_ID, BookTitle, PhoneNumber, Author, IssuedDate, DueDate, CopiesLent, FinePerDay, Price) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                       (book.book_id, book.user_id, book.BookTitle, book.PhoneNumber, book.Author, book.IssuedDate, book.DueDate, book.CopiesLent, book.FinePerDay, book.Price))
        
        conn.commit()
        return {"message": "Book lent successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}",)
    finally:
        conn.close()