from fastapi import APIRouter, Depends, Query
from dependency_injector.wiring import inject, Provide
from app.services.health_check import HealthCheckService, QueryType, TimeRange
from app.containers import Container


router = APIRouter(
    prefix="/ht",
    tags=["/ht"],
)


@router.get("/avg-packet-size")
@inject
def get_average_packet_size(
    time_range: TimeRange = Query(default=TimeRange.ONE_HOUR),
    service: HealthCheckService = Depends(Provide[Container.health_check_service]),
):
    return service.ranged_query_to_elastic_search(
        time_range=time_range, query_type=QueryType.AVG_PACKET_SIZE
    )


@router.get("/message-counts")
@inject
def get_message_counts(
    time_range: TimeRange = Query(default=TimeRange.ONE_HOUR),
    service: HealthCheckService = Depends(Provide[Container.health_check_service]),
):
    return service.ranged_query_to_elastic_search(
        time_range=time_range, query_type=QueryType.MSG_COUNT
    )


@router.get("/heartbeat")
@inject
def get_heartbeat(
    time_range: TimeRange = Query(default=TimeRange.ONE_HOUR),
    service: HealthCheckService = Depends(Provide[Container.health_check_service]),
):
    return service.ranged_query_to_elastic_search(
        time_range=time_range, query_type=QueryType.HEARTBEAT
    )


@router.get("/connected-counts")
@inject
def get_connected_counts(
    service: HealthCheckService = Depends(Provide[Container.health_check_service]),
):
    return service.none_ranged_query_to_elastic_search(
        query_type=QueryType.CONNECTED_COUNTS
    )
