from fastapi import APIRouter
from app.schemas.user import UserCreate,UserSignUp,EmailRequest,GetUser
from app.schemas.authusers import AuthUser
from app.controllers.users import read_users,sign_up,exist,createuser,getbyid
router = APIRouter(prefix="/users", tags=["users"])

@router.post("/login")
def login(user:UserCreate):
    return read_users(user)

@router.post("/signup")
def signup(user:UserSignUp):
    return sign_up(user)

@router.post("/exist")
def exist(email:EmailRequest):
    return exist(email)

@router.post("/auth-users")
def auth_users(user:AuthUser):
    return createuser(user)

@router.post("/getbyid")
def getter(user:GetUser):
    return getbyid(user)