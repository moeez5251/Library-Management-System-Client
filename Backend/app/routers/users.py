from fastapi import APIRouter, HTTPException
from app.database import get_connection
from app.schemas.user import UserCreate,UserSignUp
from app.passwords.verify import hash_password,verify_password
import uuid
router = APIRouter(prefix="/users", tags=["users"])

@router.post("/login")
def read_users(user: UserCreate):
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
@router.post("/signup")
def sign_up(user:UserSignUp):
    conn=get_connection()
    cursor=conn.cursor()
    try:
        olduser=cursor.execute("SELECT * FROM users WHERE email = ?", (user.email,))
        if olduser.fetchone() is not None:
            uid=str(uuid.uuid4())
            userid=user.name[0]+uid[0:7]
            cursor.execute("INSERT INTO users (User_id,User_Name, Email, password,	Role,Membership_Type,Cost,Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", (userid,user.name,user.email,hash_password(user.password),"Standard-User","English",0,"Active"))
            conn.commit()
            return {"message": "User created successfully"}
        else:
            raise HTTPException(status_code=401,detail="User with this email already exist")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create user: {e}",)
    finally:
        conn.close()
