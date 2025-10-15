from fastapi import APIRouter, HTTPException
from app.database import get_connection
import uuid
from datetime import datetime, timedelta,timezone
import pytz
from app.schemas.user import EmailRequest
from app.utils.mailer.mail import send_email


def resetpassword(user:EmailRequest):
    conn=get_connection()
    cursor=conn.cursor()
    try:
        pk_tz = pytz.timezone("Asia/Karachi")
        now = datetime.now(pk_tz)
        after_15_min = now + timedelta(minutes=30)
        fmt = "%d/%m/%Y, %H:%M:%S"
        cursor.execute("select User_id,	User_Name from users where Email = ? AND Role = 'Standard-User'",(user.email,))
        result=cursor.fetchone()
        token=str(uuid.uuid4())
        if result is None:
            raise HTTPException(status_code=401, detail="No user found with this email")
        cursor.execute("DELETE FROM PasswordResetTokens WHERE user_id = ?", (result[0],))
        conn.commit()
        cursor.execute("INSERT INTO PasswordResetTokens (token, user_id, expires_at, used) VALUES (?,?,?,?)", (str(token),result[0],after_15_min.strftime(fmt),False))
        conn.commit()
        html = f"""<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Reset Request</title>
        </head>
        <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Roboto, 'Helvetica Neue', Arial, sans-serif;">

        <!-- Wrapper Table -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td align="center" style="padding:30px 10px;">

                <!-- Main Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:640px; background-color:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.1);">

                <!-- Header -->
                <tr>
                    <td align="center" style="background:linear-gradient(135deg, #0066ff, #0040b3); padding:35px 20px;">
                    <h1 style="margin:0; font-size:26px; font-weight:700; color:#ffffff; font-family:inherit;">Reset Your Password</h1>
                    </td>
                </tr>

                <!-- Body -->
                <tr>
                    <td align="center" style="padding:40px 30px; font-size:16px; color:#444444; line-height:1.6; font-family:inherit;">
                    <p style="margin:0 0 20px;">Dear <strong>{result[1]}</strong>,</p>
                    <p style="margin:0 0 25px;">We received a request to reset your account password. Please click the button below to set a new password:</p>

                    <!-- Button -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                        <td align="center" bgcolor="#0066ff" style="border-radius:8px;">
                            <a href="https://xlms-admin.netlify.app/reset-password?token={token}" target="_blank" style="display:inline-block; padding:15px 32px; font-size:16px; font-weight:600; color:#ffffff; text-decoration:none; border-radius:8px; background:linear-gradient(135deg,#0066ff,#0040b3); font-family:inherit;">🔑 Reset Password</a>
                        </td>
                        </tr>
                    </table>

                    <p style="margin:25px 0 0; font-size:14px; color:#666666;">This link is valid for <strong>30 minutes</strong>. If you didn't request a password reset, you can safely ignore this email or contact our support team for help.</p>
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td align="center" style="background-color:#f1f1f1; padding:20px; font-size:13px; color:#555555; font-family:inherit;">
                    <p style="margin:0;">&copy; 2025 <strong>XLMS</strong>. All rights reserved.</p>
                    </td>
                </tr>

                </table>
                <!-- End Main Container -->

            </td>
            </tr>
        </table>
        <!-- End Wrapper Table -->

        </body>
        </html>

        """
        text=f"""Reset Your Password

        Dear {result[1]},

        We received a request to reset your account password.  
        Please click the link below to set a new password:

        🔑 Reset Password:  https://xlms-admin.netlify.app/reset-password?token={token}

        This link is valid for 30 minutes.  
        If you didn't request a password reset, you can safely ignore this email or contact our support team for help.

        © 2025 XLMS. All rights reserved.
        """
        send_email(user.email, "Reset Password", text, html)
        return {"message":"Email sent successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error {e}",)