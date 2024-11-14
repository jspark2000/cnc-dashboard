from pydantic_settings import BaseSettings


class BrokerConfig(BaseSettings):
    BROKER_HOST: str
    BROKER_PORT: int
    TOPIC: str

    class Config:
        env_file = ".env"
        extra = "allow"


broker_config = BrokerConfig()
