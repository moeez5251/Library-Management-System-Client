from fastapi import APIRouter, HTTPException
from app.schemas.lenders import Lenderget
from app.database import get_connection
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