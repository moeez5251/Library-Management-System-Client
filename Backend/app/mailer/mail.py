import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from app.core.config import settings
def send_email(to_email, subject, text_body, html_body):
    creds = Credentials(
        None,
        refresh_token=settings.GOOGLE_REFRESH_TOKEN,
        client_id=settings.GOOGLE_CLIENT_ID,
        client_secret=settings.GOOGLE_CLIENT_SECRET,
        token_uri="https://oauth2.googleapis.com/token"
    )

    service = build("gmail", "v1", credentials=creds)

    # Build email
    msg = MIMEMultipart("alternative")
    msg["To"] = to_email
    msg["From"] = f"XLMS Support <{settings.GOOGLE_USER_EMAIL}>"
    msg["Subject"] = subject

    msg.attach(MIMEText(text_body, "plain"))
    msg.attach(MIMEText(html_body, "html"))

    raw_message = base64.urlsafe_b64encode(msg.as_bytes()).decode("utf-8")

    try:
        service.users().messages().send(
            userId="me",
            body={"raw": raw_message}
        ).execute()
        print("✅ Email sent successfully.")
    except Exception as e:
        print("❌ Error:", e)
