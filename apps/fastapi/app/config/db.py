from pydantic_settings import BaseSettings


class DBConfig(BaseSettings):
    DATABASE_URL: str = "default_value"

    class Config:
        env_file = ".env"


db_config = DBConfig()
