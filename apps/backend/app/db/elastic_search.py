from elasticsearch import Elasticsearch
from app.config.db import db_config


class ElasticSearch:
    def __init__(self):
        self.client = Elasticsearch(
            hosts=[db_config.ELASTICSEARCH_HOST],
            basic_auth=(
                db_config.ELASTICSEARCH_USER,
                db_config.ELASTICSEARCH_PASSWORD,
            ),
            request_timeout=30,
            retry_on_timeout=True,
            max_retries=3,
        )

    def connect(self) -> Elasticsearch:
        if not self.client.ping():
            raise ConnectionError("Failed to connect to Elasticsearch")
        return self.client

    def close(self):
        print("Elasticsearch DISCONNECTED")
        self.client.close()
