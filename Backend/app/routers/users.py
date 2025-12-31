from fastapi import APIRouter,Request
from app.schemas.user import UserCreate,UserSignUp,EmailRequest
from app.schemas.authusers import AuthUser
from app.controllers.users import read_users,sign_up,exist,createuser,getbyid,delete_user,logout
router = APIRouter(prefix="/req/users", tags=["users"])

@router.post("/login")
def login(user:UserCreate):
    return read_users(user)

@router.post("/signup")
def signup(user:UserSignUp):
    return sign_up(user)

@router.post("/exist")
def exists(email:EmailRequest):
    return exist(email)

@router.post("/auth-users")
def auth_users(user:AuthUser):
    return createuser(user)

@router.get("/getbyid")
def getter(request:Request):
    return getbyid(request)

@router.get("/delete")
def delete_account(request:Request):
    return delete_user(request)

@router.post("/logout")
def logout_user():
    return logout()