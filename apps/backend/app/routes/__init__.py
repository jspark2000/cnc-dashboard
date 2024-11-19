from fastapi import APIRouter

from app.routes import data, health_check

router = APIRouter()

router.include_router(data.router)
router.include_router(health_check.router)
