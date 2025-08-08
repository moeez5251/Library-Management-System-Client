from fastapi import APIRouter, HTTPException
from app.database import get_connection
from app.schemas.otpschema import Otp
from app.routers.mails import otpremove
router = APIRouter(prefix="/otp", tags=["otp"])

@router.post("/verify")
def verifyotp(body:Otp):
    conn=get_connection()
    cursor=conn.cursor()
    try:
        cursor.execute("SELECT OTPCode FROM otps WHERE Email = ?", (body.email,))
        result=cursor.fetchone()
        if result is None or result[0] != body.otp:
            raise HTTPException(status_code=401, detail="Invalid OTP")
        else:
            otpremove(body.email)
            return {"message": "OTP verified successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}",)