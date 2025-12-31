from fastapi import APIRouter, HTTPException,Request
from app.database import get_connection
from app.schemas.book import LendBook
from app.controllers.notifications import add_notification
from app.schemas.notifications import Notification_ADD
from datetime import datetime
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

def lend_book(book:LendBook,request:Request):
    conn=get_connection()
    cursor=conn.cursor()
    try:
        cursor.execute("SELECT User_Name,Cost FROM users WHERE User_id=?", (request.state.user["user_id"],))
        user = cursor.fetchone()
        cursor.execute("SELECT Category,Price,Book_Title,Author,Available from books WHERE Book_ID=?", (book.book_id,))
        category = cursor.fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="User not found.")
        if not category:
            raise HTTPException(status_code=404, detail="Book not found.")
        cursor.execute(
        """
        INSERT INTO borrower (
            Book_ID, user_id, Name, BookTitle,
            Author, IssuedDate, DueDate, CopiesLent,
            FinePerDay, Price, Category
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            book.book_id,     
            request.state.user["user_id"],    
            user[0],         
            category[2],      
            category[3],      
            book.IssuedDate,  
            book.DueDate,     
            book.CopiesLent,  
            book.FinePerDay,  
            category[1],      
            category[0]
        ))


        conn.commit()

        if int(category[4]) == int(book.CopiesLent):
            conn.execute("UPDATE Books SET Available=?, Status='Borrowed' WHERE Book_ID=?", ("0", book.book_id))
        else:
            conn.execute("UPDATE Books SET Available=? WHERE Book_ID=?", (str(int(category[4]) - int(book.CopiesLent)), book.book_id))
        conn.commit()
        conn.execute("UPDATE users SET Cost=? WHERE User_id=?", (str(int(user[1]) + int(book.CopiesLent) * int(category[1])* (book.DueDate - book.IssuedDate).days)), request.state.user["user_id"])
        conn.commit()
        add_notification(Notification_ADD(UserId=request.state.user["user_id"], Message=f"You have borrowed {category[2]} from {book.IssuedDate.strftime('%d/%m/%Y')} to {book.DueDate.strftime('%d/%m/%Y')}   ", IsRead=0, CreatedAt=datetime.now().strftime("%d/%m/%Y, %H:%M:%S")),request)
        return {"message": "Book lent successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}",)
    finally:
        conn.close()