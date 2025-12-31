from fastapi import HTTPException,Request
from app.schemas.notifications import Notification_GET,Notification_ADD
from app.database import get_connection

def get_notification(request: Request):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM notifications WHERE UserId = ? AND IsRead=?", (request.state.user["user_id"],False))
        result = cursor.fetchall()
        columns=["Id","UserId","Message","IsRead","CreatedAt"]
        notification_dict_list = [dict(zip(columns, notification)) for notification in result]
        return notification_dict_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}")
    finally:
        conn.close()
def mark_as_read(request: Request):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("UPDATE notifications SET IsRead = 1 WHERE UserId = ?", (request.state.user["user_id"],))
        cursor.execute("DELETE FROM notifications WHERE UserId = ?", (request.state.user["user_id"],))
        conn.commit()
    
        return {"message": "Notifications marked as read"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}")
    finally:
        conn.close()

def add_notification(notification: Notification_ADD,request: Request):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO notifications (UserId, Message, IsRead, CreatedAt) VALUES (?, ?, ?, ?)", (request.state.user["user_id"], notification.Message, notification.IsRead, notification.CreatedAt))
        conn.commit()
        return {"message": "Notification added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}")
    finally:
        conn.close()