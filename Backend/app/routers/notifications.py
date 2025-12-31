from fastapi import APIRouter,Request
from app.schemas.notifications import Notification_GET,Notification_ADD
from app.controllers.notifications import get_notification, mark_as_read,add_notification
router = APIRouter(prefix="/req/notifications", tags=["notifications"])
@router.get("/get")
def notifications(request: Request):
    return get_notification(request)

@router.get("/markasread")
def notification_read(request: Request):
    return mark_as_read(request)

@router.post("/add")
def notification_add(notification: Notification_ADD , request: Request):
    return add_notification(notification,request)