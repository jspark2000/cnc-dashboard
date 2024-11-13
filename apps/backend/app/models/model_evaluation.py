from sqlalchemy import Column, Date, Float, Integer, String
from sqlalchemy.dialects.postgresql import JSON
from app.models import Base


class ModelEvaluation(Base):
    __tablename__ = "model_evaluation"
    __table_args__ = {"schema": "public"}

    id = Column(Integer, primary_key=True, autoincrement=True)
    model = Column(String(100), nullable=False)
    created_date = Column(Date, nullable=False)
    duration = Column(Float, nullable=False)
    parameters = Column(JSON, nullable=False)
