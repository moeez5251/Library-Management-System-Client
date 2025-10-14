import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from app.core.config import settings


def get_gmail_service():
    creds = Credentials(
        token=None,
        refresh_token=settings.GOOGLE_REFRESH_TOKEN,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=settings.GOOGLE_CLIENT_ID,
        client_secret=settings.GOOGLE_CLIENT_SECRET,
        scopes=["https://www.googleapis.com/auth/gmail.send"],
    )

    # 🔄 Automatically refresh if needed
    if not creds.valid or creds.expired:
        creds.refresh(Request())
        print("🔄 Gmail token refreshed successfully.")

    # ✅ Create Gmail service
    service = build("gmail", "v1", credentials=creds)
    return service

def send_email(to_email, subject, text_body, html_body):
    try:
        service = get_gmail_service()

        msg = MIMEMultipart("alternative")
        msg["To"] = to_email
        msg["From"] = f"XLMS Support <{settings.GOOGLE_USER_EMAIL}>"
        msg["Subject"] = subject

        msg.attach(MIMEText(text_body, "plain"))
        msg.attach(MIMEText(html_body, "html"))

        raw_message = base64.urlsafe_b64encode(msg.as_bytes()).decode("utf-8")

        service.users().messages().send(
            userId="me",
            body={"raw": raw_message}
        ).execute()

        print(f"✅ Email sent successfully to {to_email}")

    except Exception as e:
        print("❌ Error sending email:", e)
