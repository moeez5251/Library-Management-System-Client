from pydantic import BaseModel
class Notification_GET(BaseModel):
    user_id: str
class Notification_ADD(BaseModel):
    UserId: str
    Message: str
    IsRead: bool
    CreatedAt: str