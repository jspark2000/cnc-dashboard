from dependency_injector import containers, providers
from app.db.postgres import PostgeSQL
from app.services.model_evaluation import ModelEvaluationService


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(
        modules=[
            "app.routes.data.model_evaluation",
        ]
    )

    database_resource = providers.Resource(PostgeSQL)
    database = providers.Singleton(database_resource)

    model_evaluation_service = providers.Factory(
        ModelEvaluationService,
        database=database,
    )
