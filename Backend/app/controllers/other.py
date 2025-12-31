from fastapi import HTTPException,Request
from app.database import get_connection

def chart_details(request:Request):
    conn=get_connection()
    cursor=conn.cursor()
    try:
        returned=cursor.execute("SELECT COUNT(*) FROM borrower WHERE user_id = ? AND Status='Returned'", (request.state.user["user_id"],)).fetchone()[0]
        overdue=cursor.execute("SELECT COUNT(*) FROM borrower WHERE DueDate < GETDATE() AND Status='not returned'  AND user_id = ? ", (request.state.user["user_id"],)).fetchone()[0]
        return {"returned":returned,"overdue":overdue}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}",)
    finally:
        conn.close()

def lending_activity(request:Request):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            SELECT DATENAME(MONTH, TRY_CONVERT(datetime, IssuedDate, 101)) AS MonthName, COUNT(*) AS Count
            FROM borrower
            WHERE user_id = ?
            GROUP BY DATENAME(MONTH, TRY_CONVERT(datetime, IssuedDate, 101))
        """, (request.state.user["user_id"],))
        
        months = {
            "January": 0, "February": 0, "March": 0, "April": 0,
            "May": 0, "June": 0, "July": 0, "August": 0,
            "September": 0, "October": 0, "November": 0, "December": 0
        }

        for month_name, count in cursor.fetchall():
            if month_name: 
                months[month_name] = count

        return months

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}")
    finally:
        conn.close()

def other_get(request:Request):
    conn=get_connection()
    cursor=conn.cursor()
    try:
        lended=cursor.execute("SELECT COUNT(*) FROM borrower WHERE user_id = ? AND Status='not returned'", (request.state.user["user_id"],)).fetchone()[0]
        overdue=cursor.execute("SELECT COUNT(*) FROM borrower WHERE DueDate < GETDATE() AND Status='not returned'  AND user_id = ? ", (request.state.user["user_id"],)).fetchone()[0]
        reserved=cursor.execute("SELECT COUNT(*) FROM reserved WHERE user_id = ?", (request.state.user["user_id"],)).fetchone()[0]
        return {"lended":lended,"overdue":overdue,"reserved":reserved}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}",)
    finally:
        conn.close()