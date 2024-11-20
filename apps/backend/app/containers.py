from dependency_injector import containers, providers
from app.db.postgres import PostgeSQL
from app.db.elastic_search import ElasticSearch
from app.services.model_evaluation import ModelEvaluationService
from app.services.predict_result import PredictResultService
from app.services.random_cnc import RandomCNCService
from app.services.health_check import HealthCheckService


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration()

    database_resource = providers.Resource(PostgeSQL)
    database = providers.Singleton(database_resource)

    elasticsearch_resource = providers.Resource(ElasticSearch)
    elasticsearch = providers.Singleton(elasticsearch_resource)

    model_evaluation_service = providers.Factory(
        ModelEvaluationService,
        database=database,
    )

    predict_result_service = providers.Factory(
        PredictResultService,
        database=database,
    )

    random_cnc_service = providers.Factory(
        RandomCNCService,
        database=database,
    )

    health_check_service = providers.Factory(
        HealthCheckService, elasticsearch=elasticsearch
    )
