from fastapi import FastAPI
from app.routers import users,mails,otp
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from fastapi.responses import HTMLResponse
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
app.include_router(otp.router)
@app.get("/",response_class=HTMLResponse)
async def read_root():
    return """
    <html>
        <head>
            <title>Home</title>
        </head>
        <body>
            <p>App is Running ✅</p>
        </body>
    </html>
    """