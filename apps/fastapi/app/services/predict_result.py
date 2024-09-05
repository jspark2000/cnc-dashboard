from pydantic import BaseModel
from app.db.postgres import PostgeSQL
from app.dao.predict_result import get_all_predict_results
from sqlalchemy.orm import Session


class PredictResultService:
    def __init__(self, database: PostgeSQL):
        self.db = database

    def get_predict_result(self):
        session: Session = self.db.connect()
        try:
            return get_all_predict_results(session)
        finally:
            session.close()
