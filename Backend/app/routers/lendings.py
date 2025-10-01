from decimal import Decimal
from fastapi import APIRouter, HTTPException
from app.schemas.lenders import Lenderget, ReturnBook
from app.database import get_connection
from datetime import date, timedelta
router = APIRouter(prefix="/lenders", tags=["lenders"])
@router.post("/getbyid")
def get_lendings(lender: Lenderget):
    conn=get_connection()
    cursor=conn.cursor()
    try:
       cursor.execute("SELECT * FROM borrower WHERE user_id=?", (lender.user_id,))
       result=cursor.fetchall()
       keys=["Borrower_ID", "user_id", "Name", "BookTitle","Category", "Author", "IssuedDate", "DueDate", "CopiesLent", "FinePerDay", "Price", "Book_ID","Status"]
       lendings_dict_list = [dict(zip(keys, lending)) for lending in result]
       return lendings_dict_list
    except Exception as e:  
        raise HTTPException(status_code=500, detail=f"Database error {e}",)
    finally:
        conn.close()

@router.post("/returnbook")
def return_book(lender: ReturnBook):
    conn=get_connection()
    cursor=conn.cursor()
    try:
        cursor.execute("UPDATE borrower SET Status = 'Returned'  OUTPUT INSERTED.CopiesLent WHERE user_id = ? AND Book_ID = ? AND Borrower_ID = ?", (lender.user_id, lender.book_id, lender.borrower_id))
        result=cursor.fetchone()
        conn.commit()
        if result[0] == 1:
            cursor.execute("SELECT TOP 1 * FROM reserved WHERE Book_ID = ?", (lender.book_id,))
            reservation=cursor.fetchone()
            if not reservation:
                cursor.execute("SELECT Available from books WHERE Book_ID=?", (lender.book_id,))
                result=cursor.fetchone()
                cursor.execute("UPDATE books SET Status = 'Available', Available=? WHERE Book_ID = ?", (str(int(result[0]) + 1), lender.book_id))
                conn.commit()
                return {"message": "Book returned successfully"}
            cursor.execute("SELECT Book_Title,Category,Author,Price from books WHERE Book_ID=?", (lender.book_id,))
            book=cursor.fetchone()
            cursor.execute("SELECT User_Name from users WHERE User_id=?", (reservation[1],))
            user=cursor.fetchone()
            cursor.execute("""
    INSERT INTO borrower (
        Book_ID, user_id, Name, BookTitle, Author,
        IssuedDate, DueDate, CopiesLent, FinePerDay, Price, Category
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
""", (
    str(lender.book_id),                              # varchar
    str(reservation[1]),                              # varchar
    str(user[0]),                                     # varchar
    str(book[0]),                                     # varchar
    str(book[2]),                                     # varchar
    date.today().strftime("%Y-%m-%d"),                # date
    (date.today() + timedelta(days=2)).strftime("%Y-%m-%d"),  # date
    int(1),                                           # CopiesLent (int)
    int(100),                                           # FinePerDay (int)
    Decimal(book[3]),                              # Price (decimal(10,2))
    str(book[1]),                                     # varchar
))
            conn.commit()
            cursor.execute("DELETE FROM reserved WHERE Reservation_ID = ?", (reservation[0],))
            conn.commit()
        else:
            cursor.execute("SELECT TOP 1 * FROM reserved WHERE Book_ID = ?", (lender.book_id,))
            reservation=cursor.fetchone()
            if reservation:
                cursor.execute("SELECT Book_Title,Category,Author,Price from books WHERE Book_ID=?", (lender.book_id,))
                book=cursor.fetchone()
                cursor.execute("SELECT User_Name from users WHERE User_id=?", (reservation[1],))
                user=cursor.fetchone()
                cursor.execute("""
    INSERT INTO borrower (
        Book_ID, user_id, Name, BookTitle, Author,
        IssuedDate, DueDate, CopiesLent, FinePerDay, Price, Category
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
""", (
    str(lender.book_id),                              # varchar
    str(reservation[1]),                              # varchar 
    str(user[0]),                                     # varchar
    str(book[0]),                                     # varchar
    str(book[2]),                                     # varchar
    date.today().strftime("%Y-%m-%d"),                # date
    (date.today() + timedelta(days=2)).strftime("%Y-%m-%d"),  # date
    int(1),                                           # CopiesLent (int)
    int(100),                                           # FinePerDay (int)
    Decimal(book[3]),                                 # Price (decimal(10,2))
    str(book[1]),                                     # varchar
))
                conn.commit()
                cursor.execute("DELETE FROM reserved WHERE Reservation_ID = ?", (reservation[0],))
                conn.commit()
                cursor.execute("SELECT Available from books WHERE Book_ID=?", (lender.book_id,))
                result1=cursor.fetchone()
                cursor.execute("UPDATE books SET Available=?,status='Available' WHERE Book_ID = ?",str(int(result[0]) + int(result1[0]) -1), lender.book_id)
                conn.commit()
                return {"message": "Book returned successfully"}
        cursor.execute("SELECT Available from books WHERE Book_ID=?", (lender.book_id,))
        result1=cursor.fetchone()
        cursor.execute("UPDATE books SET Available=?,Status='Available' WHERE Book_ID = ?", (str(int(result[0]) + int(result1[0])), lender.book_id))
        conn.commit()
        return {"message": "Book returned successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}",)
    finally:
        conn.close()