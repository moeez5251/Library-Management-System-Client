from fastapi import FastAPI
from app.routers import users,mails
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
app = FastAPI()
origins=settings.origins.split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(users.router)
app.include_router(mails.router)
