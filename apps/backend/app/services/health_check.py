from datetime import datetime
from typing import Dict, List, Optional
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk


class HealthCheckService:
    def __init__(self, elasticsearch):
        self.es = elasticsearch
        self.client: Optional[Elasticsearch] = None

    def _get_client(self) -> Elasticsearch:
        if not self.client:
            self.client = self.es.connect()
        return self.client

    def search_by_match(self, index: str, field: str, value: str) -> Dict:
        query = {"query": {"match": {field: value}}}

        return self._get_client().search(index=index, body=query)

    def search_by_multi_match(self, index: str, fields: List[str], value: str) -> Dict:
        query = {"query": {"multi_match": {"query": value, "fields": fields}}}

        return self._get_client().search(index=index, body=query)

    def search_with_filter(
        self, index: str, must_conditions: List[Dict], filter_conditions: List[Dict]
    ) -> Dict:
        query = {
            "query": {"bool": {"must": must_conditions, "filter": filter_conditions}}
        }

        return self._get_client().search(index=index, body=query)
