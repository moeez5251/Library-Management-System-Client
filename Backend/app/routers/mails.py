from fastapi import APIRouter, HTTPException
router = APIRouter(prefix="/mail", tags=["mails"])
from app.mailer.mail import send_email
from app.schemas.mails import Mail
from app.database import get_connection
import random
from threading import Timer

def otpremove(email):
    conn=get_connection()
    cursor=conn.cursor()
    cursor.execute("DELETE FROM otps WHERE Email = ?", (email,))
    conn.commit()
    conn.close()
@router.post("/send-mail")
def send_otp(body: Mail):
    conn = get_connection()
    cursor = conn.cursor()
    try:
       randomotp=str(random.randint(100000,999999))
       html = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <title></title>
        <style>
            body {{
            margin: 0;
            padding: 0;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            color: #333;
            background-color: #fff;
            }}

            .container {{
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            padding: 0 0px;
            padding-bottom: 10px;
            border-radius: 5px;
            line-height: 1.8;
            }}

            .header {{
            border-bottom: 1px solid #eee;
            }}

            .header a {{
            font-size: 1.4em;
            color: #000;
            text-decoration: none;
            font-weight: 600;
            }}

            .content {{
            min-width: 700px;
            overflow: auto;
            line-height: 2;
            }}

            .otp {{
            background: linear-gradient(to right, #00bc69 0, #00bc88 50%, #00bca8 100%);
            margin: 0 auto;
            width: max-content;
            padding: 0 10px;
            color: #fff;
            border-radius: 4px;
            font-size: 2em;
            }}

            .footer {{
            color: #aaa;
            font-size: 0.8em;
            line-height: 1;
            font-weight: 300;
            }}

            .email-info {{
            color: #666666;
            font-weight: 400;
            font-size: 13px;
            line-height: 18px;
            padding-bottom: 6px;
            }}

            .email-info a {{
            text-decoration: none;
            color: #00bc69;
            }}
        </style>
        </head>

        <body>

        <div class="container">
            <div class="header">
            <a>XLMS Email Verification</a>
            </div>
            <br />
            <strong>Dear {body.name},</strong>
            <p>
          Thanks for registering with XLMS. For
            security purposes, please verify your identity by providing the
            following One-Time Password (OTP).
            <br />
            <b>Your One-Time Password (OTP) verification code is:</b>
            </p>
            <h2 class="otp">{randomotp}</h2>
            <p style="font-size: 0.9em">
            <strong>One-Time Password (OTP) is valid for 10 minutes.</strong>
            <br />
            <br />
            If you did not initiate this request, please disregard this
            message. Please ensure the confidentiality of your OTP and do not share
            it with anyone.<br />
            <strong>Do not forward or give this code to anyone.</strong>
            <br />
            <br />
            <strong>Thank you for using XLMS.</strong>
            <br />
            <br />
            Best regards,
            <br />
            <strong>XLMS</strong>
            </p>

            <hr style="border: none; border-top: 0.5px solid #131111" />
            <div class="footer">
            <p>This email can't receive replies.</p>
            
            </div>
        </div>
        <div style="text-align: center">
            <div class="email-info">
            <span>
                This email was sent to
                <a href="mailto:{body.to}">{body.to}</a>
            </span>
            </div>

            <div class="email-info">
            &copy; 2025 XLMS. All rights
            reserved.
            </div>
        </div>
        </body>
        </html>
        """
       text = f"""
        XLMS Password Reset

        Dear {body.name},

        We have received an account creating request for your XLMS account. For security purposes, please verify your identity by providing the following One-Time Password (OTP).

        Your One-Time Password (OTP) verification code is:
        {randomotp}

        One-Time Password (OTP) is valid for 10 minutes.

        If you did not initiate this request, please disregard this message. Please ensure the confidentiality of your OTP and do not share it with anyone.
        Do not forward or give this code to anyone.

        Thank you for using XLMS.

        Best regards,  
        XLMS

        ----------------------------------------

        This email can't receive replies.

        This email was sent to: {body.to}

        © 2025 XLMS. All rights reserved.
        """
       cursor.execute("DELETE FROM otps WHERE Email = ?", (body.to,))
       conn.commit()
       cursor.execute("INSERT INTO otps (Email, OTPCode) VALUES (?, ?)", (body.to, randomotp))
       conn.commit()
       send_email(body.to, "XLMS Email Verification", text, html)
       Timer(10 * 60, otpremove, [body.to]).start()
       return {"message": "Email sent successfully"}

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Failed to send email: {e}")
    finally:
        conn.close()
