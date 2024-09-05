from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from app.config.db import db_config


class PostgeSQL:
    def __init__(self):
        self.engine = create_engine(
            db_config.POSTGRES_URL,
            pool_pre_ping=True,
            pool_size=10,
            max_overflow=20,
        )
        self.session = sessionmaker(
            bind=self.engine,
            autoflush=False,
            autocommit=False,
        )

    def connect(self) -> Session:
        return self.session()

    def close(self):
        print("PostgreSQL DISCONNECTED")
        self.engine.dispose()
