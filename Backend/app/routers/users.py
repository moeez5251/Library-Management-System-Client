from fastapi import APIRouter, HTTPException
from app.database import get_connection
from app.schemas.user import UserCreate
from app.passwords.verify import hash_password,verify_password
router = APIRouter(prefix="/users", tags=["users"])

@router.post("/login")
def read_users(user: UserCreate):
    print(user)
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM users WHERE email = ?", (user.email,))
        result=cursor.fetchone()
        if result is None:
            raise HTTPException(status_code=404, detail="Invalid credentials")
        columns = [col[0] for col in cursor.description]
        row_dict = dict(zip(columns, result))
        if verify_password(user.password, row_dict["password"]):
            result = cursor.fetchone()
            return {"user_id": row_dict["User_id"]}
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}",)
    finally:
        conn.close()

