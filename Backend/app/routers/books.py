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
    print(book)
    try:
        cursor.execute("SELECT User_Name,PhoneNumber FROM users WHERE User_id=?", (book.user_id,))
        user = cursor.fetchone()
        cursor.execute("SELECT Category,Price,Book_Title,Author,Available from books WHERE Book_ID=?", (book.book_id,))
        category = cursor.fetchone()
        print(user, category)
        if not user:
            raise HTTPException(status_code=404, detail="User not found.")
        if not category:
            raise HTTPException(status_code=404, detail="Book not found.")
        cursor.execute(
        """
        INSERT INTO borrower (
            Book_ID, user_id, Name, BookTitle, PhoneNumber,
            Author, IssuedDate, DueDate, CopiesLent,
            FinePerDay, Price, Category
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            book.book_id,     
            book.user_id,    
            user[0],         
            category[2],      
            user[1], 
            category[3],      
            book.IssuedDate,  
            book.DueDate,     
            book.CopiesLent,  
            book.FinePerDay,  
            category[1],      
            category[0]
        ))


        conn.commit()
        print(category[4], book.CopiesLent, int(category[4]) == int(book.CopiesLent),type (category[4]), type(book.CopiesLent))
        if int(category[4]) == int(book.CopiesLent):
            conn.execute("UPDATE Books SET Available=?, Status='Borrowed' WHERE Book_ID=?", ("0", book.book_id))
        else:
            conn.execute("UPDATE Books SET Available=? WHERE Book_ID=?", (str(int(category[4]) - int(book.CopiesLent)), book.book_id))
        conn.commit()
        return {"message": "Book lent successfully."}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Database error {e}",)
    finally:
        conn.close()