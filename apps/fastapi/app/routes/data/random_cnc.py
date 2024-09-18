from fastapi import APIRouter, Depends
from dependency_injector.wiring import inject, Provide
from app.services.model_evaluation import ModelEvaluationService
from app.containers import Container
from app.services.random_cnc import RandomCNCService

router = APIRouter()


@router.get("/random_cnc")
@inject
def get_random_cnc_data(
    service: RandomCNCService = Depends(Provide[Container.random_cnc_service]),
):
    return service.get_random_cnc_data()
