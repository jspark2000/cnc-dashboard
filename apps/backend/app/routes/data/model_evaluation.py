from fastapi import APIRouter, Depends
from dependency_injector.wiring import inject, Provide
from app.services.model_evaluation import ModelEvaluationService
from app.containers import Container

router = APIRouter()


@router.get("/model_evaluation")
@inject
def get_model_evaluations(
    service: ModelEvaluationService = Depends(
        Provide[Container.model_evaluation_service]
    ),
):
    return service.get_current_evaluations()
