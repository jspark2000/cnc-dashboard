from pydantic_settings import BaseSettings


class DBConfig(BaseSettings):
    DATABASE_URL: str

    class Config:
        env_file = ".env"
        extra = "allow"


db_config = DBConfig()
