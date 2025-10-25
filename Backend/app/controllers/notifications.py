from fastapi import HTTPException
from app.schemas.notifications import Notification_GET,Notification_ADD
from app.database import get_connection

def get_notification(user: Notification_GET):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM notifications WHERE UserId = ? AND IsRead=?", (user.user_id,False))
        result = cursor.fetchall()
        columns=["Id","UserId","Message","IsRead","CreatedAt"]
        notification_dict_list = [dict(zip(columns, notification)) for notification in result]
        return notification_dict_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}")
    finally:
        conn.close()
def mark_as_read(user: Notification_GET):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("UPDATE notifications SET IsRead = 1 WHERE UserId = ?", (user.user_id,))
        cursor.execute("DELETE FROM notifications WHERE UserId = ?", (user.user_id,))
        conn.commit()
    
        return {"message": "Notifications marked as read"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}")
    finally:
        conn.close()

def add_notification(notification: Notification_ADD):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO notifications (UserId, Message, IsRead, CreatedAt) VALUES (?, ?, ?, ?)", (notification.UserId, notification.Message, notification.IsRead, notification.CreatedAt))
        conn.commit()
        return {"message": "Notification added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}")
    finally:
        conn.close()