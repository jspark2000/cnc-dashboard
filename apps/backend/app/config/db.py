from pydantic_settings import BaseSettings


class DBConfig(BaseSettings):
    # PostgreSQL
    DATABASE_URL: str

    # ElasticSearch
    ELASTICSEARCH_HOST: str
    ELASTICSEARCH_USER: str
    ELASTICSEARCH_PASSWORD: str

    class Config:
        env_file = ".env"
        extra = "allow"


db_config = DBConfig()
