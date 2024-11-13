from pydantic import BaseModel
from app.db.postgres import PostgeSQL
from app.dao.model_evaluation import get_all_evaluations
from sqlalchemy.orm import Session


class ModelEvaluationService:
    def __init__(self, database: PostgeSQL):
        self.db = database

    def get_current_evaluations(self):
        session: Session = self.db.connect()
        try:
            return get_all_evaluations(session)
        finally:
            session.close()
