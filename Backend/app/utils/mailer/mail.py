import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from app.core.config import settings
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_gmail_service():
    """
    Creates and returns a Gmail API service instance using a refresh token.
    Automatically refreshes the access token if expired.
    """
    creds = Credentials(
        token=None,
        refresh_token=settings.GOOGLE_REFRESH_TOKEN,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=settings.GOOGLE_CLIENT_ID,
        client_secret=settings.GOOGLE_CLIENT_SECRET,
        scopes=["https://www.googleapis.com/auth/gmail.send"],
    )

    try:
        if not creds.valid or creds.expired:
            creds.refresh(Request())
            logger.info("🔄 Gmail token refreshed successfully.")
    except Exception as e:
        logger.error("❌ Failed to refresh Gmail token: %s", e)
        raise

    # Build the Gmail service
    try:
        service = build("gmail", "v1", credentials=creds)
        return service
    except Exception as e:
        logger.error("❌ Failed to create Gmail service: %s", e)
        raise

def send_email(to_email: str, subject: str, text_body: str, html_body: str):
    """
    Sends an email using Gmail API.

    Parameters:
        to_email (str): Recipient email address
        subject (str): Email subject
        text_body (str): Plain text content
        html_body (str): HTML content
    """
    try:
        service = get_gmail_service()

        # Compose the message
        msg = MIMEMultipart("alternative")
        msg["To"] = to_email
        msg["From"] = f"XLMS Support <{settings.GOOGLE_USER_EMAIL}>"
        msg["Subject"] = subject

        msg.attach(MIMEText(text_body, "plain"))
        msg.attach(MIMEText(html_body, "html"))

        # Encode the message
        raw_message = base64.urlsafe_b64encode(msg.as_bytes()).decode("utf-8")

        # Send the message
        message = service.users().messages().send(
            userId="me",
            body={"raw": raw_message}
        ).execute()

        logger.info("✅ Email sent successfully to %s (Message ID: %s)", to_email, message.get("id"))

    except Exception as e:
        logger.error("❌ Error sending email: %s", e)
        raise
