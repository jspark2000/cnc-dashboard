from fastapi import APIRouter

from app.routes import data

router = APIRouter()

router.include_router(data.router)
