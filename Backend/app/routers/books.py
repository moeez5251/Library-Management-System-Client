from fastapi import APIRouter, HTTPException
from app.database import get_connection
from app.schemas.book import Book 
router = APIRouter(prefix="/books", tags=["books"])


@router.get("/getall")
def get_books():
    conn=get_connection()
    cursor=conn.cursor()
    try:
       cursor.execute("SELECT * FROM books")
       result=cursor.fetchall()
       keys=["Book_ID", "Book_Title", "Author", "Category", "Language", "Total_Copies", "Status", "Pages", "Price", "Available"]
       books_dict_list = [dict(zip(keys, book)) for book in result]
       return books_dict_list
    except Exception as e:  
        raise HTTPException(status_code=500, detail=f"Database error {e}",)
    finally:
        conn.close()