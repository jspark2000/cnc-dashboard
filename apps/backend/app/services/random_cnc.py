from app.db.postgres import PostgeSQL
from app.dao.predict_result import *
from sqlalchemy.orm import Session
from sqlalchemy import text


class RandomCNCService:
    def __init__(self, database: PostgeSQL):
        self.db = database

    def get_random_cnc_data(self):
        session: Session = self.db.connect()
        table_name = "cnc_data"
        query = text(f"SELECT * FROM {table_name} ORDER BY timestamp DESC LIMIT 50")
        result = session.execute(query).fetchall()
        data = [dict(row._mapping) for row in result]
        session.close()
        return data
