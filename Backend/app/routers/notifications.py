from fastapi import APIRouter
from app.schemas.notifications import Notification_GET,Notification_ADD
from app.controllers.notifications import get_notification, mark_as_read,add_notification
router = APIRouter(prefix="/req/notifications", tags=["notifications"])


@router.post("/get")
def notifications(notification: Notification_GET):
    return get_notification(notification)

@router.post("/markasread")
def notification_read(notification: Notification_GET):
    return mark_as_read(notification)

@router.post("/add")
def notification_add(notification: Notification_ADD):
    return add_notification(notification)