from fastapi import APIRouter

from app.routes.data import model_evaluation

router = APIRouter(
    tags=["/data"],
)

router.include_router(model_evaluation.router)
