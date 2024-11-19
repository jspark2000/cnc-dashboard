from fastapi import APIRouter, Depends
from dependency_injector.wiring import inject, Provide
from app.services.health_check import HealthCheckService
from app.containers import Container


router = APIRouter(
    tags=["/ht"],
)


@router.get("/ht/temp")
@inject
def get_health_state(
    service: HealthCheckService = Depends(Provide[Container.health_check_service]),
):
    return service.search_by_match("", "", "")
