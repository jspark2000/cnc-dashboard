from app.db.postgres import PostgeSQL
from app.dao.predict_result import *
from sqlalchemy.orm import Session


class PredictResultService:
    def __init__(self, database: PostgeSQL):
        self.db = database

    def get_predict_result(self):
        session: Session = self.db.connect()
        try:
            return get_latest_predict_results(session)
        finally:
            session.close()

    def get_predict_result_groupby_factor(self):
        session: Session = self.db.connect()
        try:
            return get_predict_results_by_factor(session)
        finally:
            session.close()
