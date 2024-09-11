from fastapi import APIRouter, Depends
from dependency_injector.wiring import inject, Provide
from app.containers import Container
from app.services.predict_result import PredictResultService

router = APIRouter()


@router.get("/predict_result")
@inject
def get_predict_result(
    service: PredictResultService = Depends(Provide[Container.predict_result_service]),
):
    return service.get_predict_result()


@router.get("/predict_result/factors")
@inject
def get_predict_result_groupby_factor(
    service: PredictResultService = Depends(Provide[Container.predict_result_service]),
):
    return service.get_predict_result_groupby_factor()
