from fastapi import APIRouter

from app.routes.data import model_evaluation, predict_result

router = APIRouter(
    tags=["/data"],
)

router.include_router(model_evaluation.router)
router.include_router(predict_result.router)
