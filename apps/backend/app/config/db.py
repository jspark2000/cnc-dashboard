from pydantic_settings import BaseSettings


class DBConfig(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/postgres"

    class Config:
        env_file = ".env"


db_config = DBConfig()
