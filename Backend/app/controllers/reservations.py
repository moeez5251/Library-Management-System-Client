from fastapi import HTTPException
from app.schemas.reservations import ReservationCreate,Reservationget
from app.database import get_connection
from app.utils.mailer.mail import send_email

def reserve_book(reservation: ReservationCreate):
    conn=get_connection()
    cursor=conn.cursor()
    try:
       cursor.execute("INSERT INTO reserved (User_ID, Book_ID, Reserved_Date) VALUES (?, ?, ?)", (reservation.user_id, reservation.book_id, reservation.reservation_date))
       conn.commit()
       cursor.execute("UPDATE books SET Status = 'Reserved' WHERE Book_ID = ?", (reservation.book_id,))
       conn.commit()
       # Fetch user email and book title for email notification
       cursor.execute("SELECT User_Name, Email FROM users WHERE User_id = ?", (reservation.user_id,))
       user = cursor.fetchone()
       cursor.execute("SELECT Book_Title FROM books WHERE Book_ID = ?", (reservation.book_id,))
       book = cursor.fetchone()
       html_body = f"""<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Reservation Confirmed</title>
</head>
<body style="font-family: Arial, sans-serif; margin:0; padding:0; background:#f4f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:20px 10px;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="padding:20px; text-align:left; background:#2b6cb0; color:#ffffff;">
              <h1 style="margin:0; font-size:20px;">Reservation Confirmed</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:24px;">
              <p style="margin:0 0 16px 0; font-size:15px; color:#333333;">
                Hi <strong>{user[0]}</strong>,
              </p>

              <p style="margin:0 0 18px 0; font-size:15px; color:#333333;">
                Thanks — your reservation for <strong>"{book[0]}"</strong> is confirmed.
              </p>

              <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%; margin:12px 0;">
                <tr>
                  <td style="padding:10px; background:#f7fafc; border-radius:6px; font-size:14px; color:#333;">
                    <strong>Time Period:</strong> 1 Day<br>
                   
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 18px 0; font-size:14px; color:#333;">
                When a copy becomes available, we'll issue it to you, 
              </p>

              <p style="margin:0 0 8px 0; font-size:14px; color:#333;">
                If you want to cancel the reservation or have questions, reply to this email or contact the library staff.
              </p>

              <p style="margin:24px 0 0 0; font-size:13px; color:#777;">
               XLMS
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:14px 20px; background:#f1f5f9; font-size:12px; color:#666;">
              This is an automated message. Please do not reply to this email address.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""
       send_email(to_email=user[1], subject="Your Book Reservation is Confirmed", text_body=f"Hi {user[0]},\n\nYour reservation for '{book[0]}' is confirmed.\n\nWhen a copy becomes available, we'll issue it to you.\n\nIf you want to cancel the reservation or have questions, reply to this email or contact the library staff.\n\nXLMS", html_body=html_body)
       return {"message": "Book reserved successfully"}
    except Exception as e:  
        print(e)
        raise HTTPException(status_code=500, detail=f"Database error {e}",)
    finally:
        conn.close()

def get_reservation(reservation: Reservationget):
    conn=get_connection()
    cursor=conn.cursor()
    try:
       cursor.execute("SELECT * FROM reserved WHERE User_ID	=?", (reservation.user_id,))
       result=cursor.fetchall()
       keys=["Reservation_ID", "User_ID", "Book_ID", "Reserved_Date"]
       reservation_dict_list = [dict(zip(keys, reservation)) for reservation in result]
       for book in reservation_dict_list:
           cursor.execute("SELECT Book_Title,Author from books WHERE Book_ID=?", (book["Book_ID"],))
           result=cursor.fetchone()
           book["Book_Title"] = result[0]
           book["Author"] = result[1]
       return reservation_dict_list
    except Exception as e:  
        raise HTTPException(status_code=500, detail=f"Database error {e}",)
    finally:
        conn.close()