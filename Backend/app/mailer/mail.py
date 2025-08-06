import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from app.core.config import settings
def send_email(to_email, subject, text_body, html_body):
    app_password = settings.Password 

    # Create the MIMEMultipart message
    msg = MIMEMultipart("alternative")
    msg['From'] = f"XLMS Support <{settings.Email}>"
    msg['To'] = to_email
    msg['Subject'] = subject

    # Add plain text and HTML parts
    part1 = MIMEText(text_body, "plain")
    part2 = MIMEText(html_body, "html")

    msg.attach(part1)
    msg.attach(part2)

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.ehlo()  # identify yourself to the server
        server.starttls()
        server.ehlo()
        server.login(settings.Email, app_password)
        server.send_message(msg)
        server.quit()
        server.close()
        print("✅ Email sent successfully.")
    except Exception as e:
        print("❌ Error:", e)
