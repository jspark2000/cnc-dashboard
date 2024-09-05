from sqlalchemy.orm import Session
from app.models.predict_result import PredictResult


def get_all_predict_results(session: Session) -> list[PredictResult]:
    return session.query(PredictResult).order_by("id").limit(10).all()
