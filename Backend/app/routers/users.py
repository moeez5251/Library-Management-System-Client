from fastapi import APIRouter, HTTPException
from app.database import get_connection
from app.schemas.user import UserCreate,UserSignUp,EmailRequest,GetUser
from app.passwords.verify import hash_password,verify_password
from app.schemas.authusers import AuthUser
import uuid
router = APIRouter(prefix="/users", tags=["users"])

@router.post("/login")
def read_users(user: UserCreate):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM users WHERE email = ? AND Role='Standard-User'", (user.email,))
        result=cursor.fetchone()
        if result is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        columns = [col[0] for col in cursor.description]
        row_dict = dict(zip(columns, result))
        if verify_password(user.password, row_dict["password"]):
            result = cursor.fetchone()
            return {"user_id": row_dict["User_id"]}
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except HTTPException:
        raise
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
        if olduser.fetchone() is  None:
            uid=str(uuid.uuid4())
            userid=user.name[0]+uid[0:7]
            cursor.execute("INSERT INTO users (User_id,User_Name, Email, password,	Role,Membership_Type,Cost,Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", (userid,user.name,user.email,hash_password(user.password),"Standard-User","English",0,"Active"))
            conn.commit()
            return {"message": "User created successfully","user_id":userid}
        else:
            raise HTTPException(status_code=401,detail="User with this email already exist")
    except HTTPException:
        raise  
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create user: {e}",)
    finally:
        conn.close()
@router.post("/exist")
def exist(email:EmailRequest):
    conn=get_connection()
    cursor=conn.cursor()
    try:
        cursor.execute("SELECT * FROM users WHERE Email = ?", (email.email,))
        result=cursor.fetchone()
        cursor.execute("SELECT * FROM Google WHERE Email = ?", (email.email,))
        result2=cursor.fetchone()
        if result is None and result2 is None:
            return {"exist":False}
        else:
            return {"exist":True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}",)
    finally:
        conn.close()
@router.post("/auth-users")
def createuser(user:AuthUser):
    conn=get_connection()
    cursor=conn.cursor()
    try:
        cursor.execute("Select * FROM Google WHERE email = ?", (user.email,))
        result=cursor.fetchone()
        cursor.execute("Select * FROM users WHERE email = ?", (user.email,))
        result2=cursor.fetchone()
        if result2 is not None:
            return {"userID":result2.User_id}
        if result is  None:
            cursor.execute("INSERT into Google (google_id,email,name) VALUES (?,?,?)", (user.google_id,user.email,user.name))
            conn.commit()
            return {"userID":user.google_id}
        else:
            return {"userID":result.google_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}",)
@router.post("/getbyid")
def getbyid(user:GetUser):
    conn=get_connection()
    cursor=conn.cursor()
    try:
        cursor.execute("SELECT User_Name,Email,Role,Membership_Type, FROM users WHERE User_id = ?", (user.user_id,))
        result=cursor.fetchone()
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}",)
    finally:
        conn.close()