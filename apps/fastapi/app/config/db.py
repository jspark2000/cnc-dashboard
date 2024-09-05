from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os


class DBConfig(BaseSettings):
    load_dotenv()

    POSTGRES_URL: str = os.getenv("DATABASE_URL")


db_config = DBConfig()
