from fastapi import APIRouter, Depends
from dependency_injector.wiring import inject, Provide
from app.services.model_evaluation import ModelEvaluationService
from app.containers import Container

router = APIRouter()


@router.get("/predict_result")
@inject
def get_predict_result(
    service: ModelEvaluationService = Depends(
        Provide[Container.predict_result_service]
    ),
):
    return service.get_current_evaluations()
