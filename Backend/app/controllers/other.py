from fastapi import HTTPException
from app.database import get_connection
from app.schemas.other import User

def chart_details(user:User):
    conn=get_connection()
    cursor=conn.cursor()
    try:
        returned=cursor.execute("SELECT COUNT(*) FROM borrower WHERE user_id = ? AND Status='Returned'", (user.user_id,)).fetchone()[0]
        overdue=cursor.execute("SELECT COUNT(*) FROM borrower WHERE DueDate < GETDATE() AND Status='not returned'  AND user_id = ? ", (user.user_id,)).fetchone()[0]
        return {"returned":returned,"overdue":overdue}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}",)
    finally:
        conn.close()

def lending_activity(user: User):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            SELECT DATENAME(MONTH, TRY_CONVERT(datetime, IssuedDate, 101)) AS MonthName, COUNT(*) AS Count
            FROM borrower
            WHERE user_id = ?
            GROUP BY DATENAME(MONTH, TRY_CONVERT(datetime, IssuedDate, 101))
        """, (user.user_id,))
        
        months = {
            "January": 0, "February": 0, "March": 0, "April": 0,
            "May": 0, "June": 0, "July": 0, "August": 0,
            "September": 0, "October": 0, "November": 0, "December": 0
        }

        for month_name, count in cursor.fetchall():
            if month_name:  # Avoid None
                months[month_name] = count

        return months

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}")
    finally:
        conn.close()

