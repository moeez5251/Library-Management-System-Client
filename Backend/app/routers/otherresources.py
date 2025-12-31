from fastapi import APIRouter,Request
from app.controllers.other import chart_details,lending_activity,other_get
router = APIRouter(prefix="/req/other", tags=["other"])

@router.get("/borrowedoverview")
def borrowed_overview(request:Request):
    return chart_details(request)

@router.get("/lendingactivity")
def lendings(request:Request):
    return lending_activity(request)

@router.get("/data")
def other(request:Request):
    return other_get(request)