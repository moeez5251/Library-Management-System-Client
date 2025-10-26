from fastapi import  HTTPException
from app.database import get_connection
from app.schemas.user import UserCreate,UserSignUp,EmailRequest,GetUser
from app.utils.passwords.verify import hash_password,verify_password
from app.schemas.authusers import AuthUser
import uuid
import bcrypt
from app.utils.jwt_handler import create_token
from fastapi.responses import JSONResponse
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

def createuser(user:AuthUser):
    conn=get_connection()
    cursor=conn.cursor()
    try:
        cursor.execute("Select * FROM users WHERE email = ?", (user.email,))
        result2=cursor.fetchone()
        if result2 is not None:
            if result2[3]=="Admin":
                raise HTTPException(status_code=401,detail="Only Users Allowed")
            token=create_token({ 
                "user_id":result2[0],
                "email":result2[2]
            })
            response_data= {"userID":result2[0]}
            response = JSONResponse(content=response_data)
            response.set_cookie(
        key="token",
        value=token,
        httponly=True,      
        secure=True,       
        samesite="lax",    
        max_age=60*60*24, # 1 day     
        path="/",           
    )
            return response
        else:
            uid=str(uuid.uuid4())
            userid=user.name[0]+uid[0:7]
            dummy_password = "google_oauth_user"  # You can customize this
            hashed_password = bcrypt.hashpw(dummy_password.encode('utf-8'), bcrypt.gensalt())
            cursor.execute("INSERT INTO users (User_id,User_Name, Email, password,	Role,Membership_Type,Cost,Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", (userid,user.name,user.email,hashed_password,"Standard-User","English",0,"Active"))
            conn.commit()
            token=create_token({
                "user_id":userid,
                "email":user.email
            })
            response_data= {"userID":userid}
            response = JSONResponse(content=response_data)
            response.set_cookie(
        key="token",
        value=token,
        httponly=True,      
        secure=True,       
        samesite="lax",    
        max_age=60*60*24, # 1 day     
        path="/",           
    )
            return response
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}",)

def getbyid(user:GetUser):
    conn=get_connection()
    cursor=conn.cursor()
    try:
        cursor.execute("SELECT User_Name,Email,Membership_Type FROM users WHERE User_id = ?", (user.user_id,))
        result=cursor.fetchone()
        result_dict=[dict(zip(["User_Name","Email","Membership_Type"], result))]
        return result_dict
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}",)
    finally:
        conn.close()

def delete_user(user:GetUser):
    conn=get_connection()
    cursor=conn.cursor()
    try:
        cursor.execute("SELECT * from borrower WHERE user_id = ? AND Status='not returned'", (user.user_id,))
        result=cursor.fetchone()
        if result is not None:
            raise HTTPException(status_code=401, detail="Return the book first")
        cursor.execute("DELETE FROM borrower WHERE user_id = ?", (user.user_id,))
        cursor.execute("DELETE from reserved WHERE user_id = ?", (user.user_id,))
        cursor.execute("DELETE FROM notifications WHERE UserId = ?", (user.user_id,))
        cursor.execute("DELETE FROM users WHERE User_id = ?", (user.user_id,))
        conn.commit()
        return {"message": "User deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}",)
    finally:
        conn.close()

def logout():
    response = JSONResponse(content={"message": "Logged out successfully "})
    response.delete_cookie(key="token",path="/")
    return response