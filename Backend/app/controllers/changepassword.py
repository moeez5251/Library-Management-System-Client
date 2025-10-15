from fastapi import  HTTPException
from app.database import get_connection
from app.utils.passwords.verify import hash_password,verify_password
from app.schemas.changepass import changebyotpclass,changebyoldpassclass
def changebyotp(body:changebyotpclass):
    conn=get_connection()
    cursor=conn.cursor()
    try:
        hash_db_pass=cursor.execute("SELECT password FROM users WHERE User_id = ?", (body.user_id,)).fetchone()
        if verify_password(body.password,hash_db_pass[0]):
            raise HTTPException(status_code=401,detail="New Password must be different from old password")
        
        cursor.execute("UPDATE users SET password = ? WHERE User_id = ? ", (hash_password(body.password),body.user_id))
        conn.commit()
        return {"message": "Password changed successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}",)
    finally:
        conn.close()

def change_by_oldpassword(body:changebyoldpassclass):
    conn=get_connection()
    cursor=conn.cursor()
    try:
        hash_db_pass=cursor.execute("SELECT password FROM users WHERE User_id = ?", (body.user_id,)).fetchone()
        if verify_password(body.old_password,hash_db_pass[0]):
            if verify_password(body.new_password,hash_db_pass[0]):
                raise HTTPException(status_code=401,detail="New Password must be different from old password")
            cursor.execute("UPDATE users SET password = ? WHERE User_id = ? ", (hash_password(body.new_password),body.user_id))
            conn.commit()
            return {"message": "Password changed successfully"}
        else:
            raise HTTPException(status_code=401,detail="Invalid old password")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}",)
    finally:
        conn.close()