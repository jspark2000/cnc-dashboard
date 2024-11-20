from elasticsearch import Elasticsearch
from app.config.db import db_config
import logging

logger = logging.getLogger("uvicorn")


class ElasticSearch:
    def __init__(self):
        self.client = Elasticsearch(
            hosts=[db_config.ELASTICSEARCH_HOST],
            http_auth=(  # 7.x 버전에서는 http_auth 사용
                db_config.ELASTICSEARCH_USER,
                db_config.ELASTICSEARCH_PASSWORD,
            ),
            request_timeout=30,
            retry_on_timeout=True,
            max_retries=3,
            verify_certs=False,
            ssl_show_warn=False,
        )

    def connect(self) -> Elasticsearch:
        try:
            if not self.client.ping():
                logger.error("Ping failed")
                try:
                    info = self.client.info()
                    logger.info(f"Elasticsearch info: {info}")
                except Exception as e:
                    logger.error(f"Error getting info: {str(e)}")
                raise ConnectionError("Failed to connect to Elasticsearch")

            info = self.client.info()
            logger.info(
                f"Successfully connected to Elasticsearch {info.get('version', {}).get('number')}"
            )
            return self.client

        except Exception as e:
            logger.error(f"Connection error: {str(e)}")
            raise

    def close(self):
        print("Elasticsearch DISCONNECTED")
        self.client.close()
