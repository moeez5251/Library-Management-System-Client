from fastapi import APIRouter
from app.schemas.other import User
from app.controllers.other import chart_details,lending_activity
router = APIRouter(prefix="/req/other", tags=["other"])

@router.post("/borrowedoverview")
def borrowed_overview(user:User):
    return chart_details(user)

@router.post("/lendingactivity")
def lendings(user:User):
    return lending_activity(user)