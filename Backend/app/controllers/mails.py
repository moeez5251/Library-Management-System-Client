from fastapi import APIRouter, HTTPException
router = APIRouter(prefix="/mail", tags=["mails"])
from app.utils.mailer.mail import send_email
from app.schemas.mails import Mail,Issue_mail
from app.database import get_connection
import random
from threading import Timer

def otpremove(email):
    conn=get_connection()
    cursor=conn.cursor()
    cursor.execute("DELETE FROM otps WHERE Email = ?", (email,))
    conn.commit()
    conn.close()

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

def reset_otp(body: Mail):
    conn = get_connection()
    cursor = conn.cursor()
    try:
       randomotp=str(random.randint(100000,999999))
       html = f"""
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Password Reset - XLMS</title>
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
    <a>XLMS Password Reset</a>
    </div>
    <br />
    <strong>Dear {body.name},</strong>
    <p>
    We received a request to reset your XLMS account password. For security purposes, please use the One-Time Password (OTP) below to reset your password.
    <br />
    <b>Your One-Time Password (OTP) for password reset is:</b>
    </p>
    <h2 class="otp">{randomotp}</h2>
    <p style="font-size: 0.9em">
    <strong>One-Time Password (OTP) is valid for 10 minutes.</strong>
    <br /><br />
    If you did not request a password reset, please disregard this email. Ensure your OTP remains confidential and do not share it with anyone.<br />
    <strong>Do not forward or give this code to anyone.</strong>
    <br /><br />
    <strong>Thank you for using XLMS.</strong>
    <br /><br />
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
    &copy; 2025 XLMS. All rights reserved.
    </div>
</div>
</body>
</html>
"""

       text = f"""
XLMS Password Reset

Dear {body.name},

We received a request to reset your XLMS account password. For security purposes, please verify your identity by providing the following One-Time Password (OTP):

Your One-Time Password (OTP) for password reset is:
{randomotp}

One-Time Password (OTP) is valid for 10 minutes.

If you did not request this password reset, please disregard this message. Ensure your OTP remains confidential and do not share it with anyone.
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

def issue_mail(body:Issue_mail):
    try:
        admin_html = f"""
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>New Support Ticket</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f6f7fb; padding: 30px; color: #333;">
    <table style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding: 25px;">
          <h2 style="color: #6941c5;">📩 New Support Ticket Received</h2>
          <p style="font-size: 15px;">A new support ticket has been submitted with the following details:</p>

          <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td style="padding: 8px 0;">{body.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;">{body.sender}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Subject:</td><td style="padding: 8px 0;">{body.subject}</td></tr>
          </table>

          <div style="margin-top: 15px; background-color: #f4f4f4; padding: 15px; border-radius: 6px;">
            <p style="margin: 0; font-size: 15px; white-space: pre-line;">{body.issue}</p>
          </div>

          <p style="margin-top: 20px; font-size: 14px; color: #777;">
            Please respond to this ticket at your earliest convenience.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
"""
        user_html = f"""
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Ticket Confirmation</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f6f7fb; padding: 30px; color: #333;">
    <table style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding: 25px;">
          <h2 style="color: #6941c5;">✅ Ticket Submitted Successfully</h2>
          <p style="font-size: 15px;">Hi <strong>{body.name}</strong>,</p>
          <p style="font-size: 15px;">Your support ticket has been received. Our team will review your issue and get back to you soon.</p>

          <h4 style="margin-top: 20px; color: #6941c5;">Ticket Details:</h4>
          <ul style="line-height: 1.7; font-size: 15px; padding-left: 20px;">
            <li><strong>Subject:</strong> {body.subject}</li>
            <li><strong>Issue:</strong> {body.issue}</li>
          </ul>

          <p style="margin-top: 25px; font-size: 14px; color: #777;">
            Thank you for contacting support.<br/>
            — The Support Team
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
"""     
        user_text = f"""
✅ Ticket Submitted Successfully

Hi {body.name},

Your support ticket has been received. Our team will review your issue and get back to you soon.

Ticket Details:
- Subject: {body.subject}
- Issue: {body.issue}

Thank you for contacting support.
— The Support Team
"""
        admin_text = f"""
📩 New Support Ticket Submitted

A new support ticket has been submitted.

Ticket Details:
- Name: {body.name}
- Sender Email: {body.sender}
- Subject: {body.subject}
- Issue: {body.issue}

Please review and respond to this ticket in the admin dashboard.
— Automated Notification System
"""


        send_email(body.sender,body.subject,user_text,user_html)
        send_email("moeez66656@gmail.com",body.subject,admin_text,admin_html)

        return {"message": "Email sent successfully"}
    except HTTPException:
        raise 
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {e}")