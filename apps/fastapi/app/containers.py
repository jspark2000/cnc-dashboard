from dependency_injector import containers, providers
from app.db.postgres import PostgeSQL
from app.services.model_evaluation import ModelEvaluationService
from app.services.predict_result import PredictResultService


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(
        modules=[
            "app.routes.data.model_evaluation",
            "app.routes.data.predict_result",
        ]
    )

    database_resource = providers.Resource(PostgeSQL)
    database = providers.Singleton(database_resource)

    model_evaluation_service = providers.Factory(
        ModelEvaluationService,
        database=database,
    )

    predict_result_service = providers.Factory(
        PredictResultService,
        database=database,
    )
