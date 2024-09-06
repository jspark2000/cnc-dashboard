from sqlalchemy.orm import Session
from app.models.model_evaluation import ModelEvaluation


def get_all_evaluations(session: Session) -> list[ModelEvaluation]:
    return session.query(ModelEvaluation).order_by("id").all()
