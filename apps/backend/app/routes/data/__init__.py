from fastapi import APIRouter

from app.routes.data import model_evaluation, predict_result, random_cnc

router = APIRouter(
    tags=["/data"],
)


@router.get("/data")
def get_data():
    return "hello"


router.include_router(model_evaluation.router)
router.include_router(predict_result.router)
router.include_router(random_cnc.router)
