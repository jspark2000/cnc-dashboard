from datetime import datetime, timedelta, timezone
from enum import Enum
from typing import Dict, Optional, Tuple
from elasticsearch import Elasticsearch


class TimeRange(Enum):
    ONE_MINUTE = "1m"
    FIFTEEN_MINUTES = "15m"
    ONE_HOUR = "1h"
    SIX_HOURS = "6h"
    TWELVE_HOURS = "12h"
    ONE_DAY = "1d"
    ONE_WEEK = "1w"
    ONE_MONTH = "1M"


class QueryType(Enum):
    AVG_PACKET_SIZE = "AVG_PACKET_SIZE"
    MSG_COUNT = "MSG_COUNT"


class HealthCheckService:
    def __init__(self, elasticsearch):
        self.es = elasticsearch
        self.client: Optional[Elasticsearch] = None

    def _get_client(self) -> Elasticsearch:
        if not self.client:
            self.client = self.es.connect()
        return self.client  # type: ignore

    def _get_topics(self, query_type: QueryType):
        if query_type == QueryType.AVG_PACKET_SIZE:
            key = "data"
            topics = {
                "terms": {
                    "field": "packet.topic.keyword",
                    "order": {"data": "desc"},
                    "size": 10,
                },
                "aggs": {"data": {"avg": {"field": "packet.length"}}},
            }
            aggs = True
        elif query_type == QueryType.MSG_COUNT:
            key = "doc_count"
            topics = {
                "terms": {
                    "field": "packet.topic.keyword",
                    "order": {"_count": "desc"},
                    "size": 10,
                },
            }
            aggs = False
        else:
            raise ValueError(f"Invalid query type: {query_type}")

        return key, topics, aggs

    def _calculate_time_range(
        self, time_range: TimeRange
    ) -> Tuple[datetime, datetime, str]:
        end_time = datetime.now(timezone.utc)

        if time_range == TimeRange.ONE_MINUTE:
            start_time = end_time - timedelta(minutes=1)
            interval = "1s"
        elif time_range == TimeRange.FIFTEEN_MINUTES:
            start_time = end_time - timedelta(minutes=15)
            interval = "15s"
        elif time_range == TimeRange.ONE_HOUR:
            start_time = end_time - timedelta(hours=1)
            interval = "1m"
        elif time_range == TimeRange.SIX_HOURS:
            start_time = end_time - timedelta(hours=6)
            interval = "6m"
        elif time_range == TimeRange.TWELVE_HOURS:
            start_time = end_time - timedelta(hours=12)
            interval = "12m"
        elif time_range == TimeRange.ONE_DAY:
            start_time = end_time - timedelta(days=1)
            interval = "24m"
        elif time_range == TimeRange.ONE_WEEK:
            start_time = end_time - timedelta(weeks=1)
            interval = "3h"
        elif time_range == TimeRange.ONE_MONTH:
            start_time = end_time - timedelta(days=30)
            interval = "12h"
        else:
            raise ValueError(f"Invalid time range: {time_range}")

        return start_time, end_time, interval

    def query_to_elastic_search(
        self, time_range: TimeRange, query_type: QueryType
    ) -> Dict:
        start_time, end_time, interval = self._calculate_time_range(time_range)
        key, topics, aggs = self._get_topics(query_type)

        query = {
            "aggs": {
                "time_buckets": {
                    "date_histogram": {
                        "field": "@timestamp",
                        "fixed_interval": interval,
                        "time_zone": "Asia/Seoul",
                        "min_doc_count": 1,
                    },
                    "aggs": {"topics": topics},
                }
            },
            "size": 0,
            "stored_fields": ["*"],
            "script_fields": {},
            "docvalue_fields": [{"field": "@timestamp", "format": "date_time"}],
            "_source": {"excludes": []},
            "query": {
                "bool": {
                    "must": [],
                    "filter": [
                        {"match_all": {}},
                        {
                            "range": {
                                "@timestamp": {
                                    "gte": start_time.isoformat(),
                                    "lte": end_time.isoformat(),
                                    "format": "strict_date_optional_time",
                                }
                            }
                        },
                    ],
                    "should": [],
                    "must_not": [],
                }
            },
        }

        return self.process_results(
            self._get_client().search(index="broker-topic*", body=query),
            key=key,
            aggs=aggs,
        )

    def process_results(self, results: Dict, key: str, aggs: bool) -> Dict:
        processed_data = {
            "data": [],
            "topics": set(),
            "timeRange": {"min": None, "max": None},
        }

        time_buckets = results["aggregations"]["time_buckets"]["buckets"]

        if time_buckets:
            processed_data["timeRange"]["min"] = time_buckets[0]["key_as_string"]
            processed_data["timeRange"]["max"] = time_buckets[-1]["key_as_string"]

        for time_bucket in time_buckets:
            data_point = {"timestamp": time_bucket["key_as_string"]}

            for topic_bucket in time_bucket["topics"]["buckets"]:
                topic_name = topic_bucket["key"]
                data = topic_bucket[key]["value"] if aggs else topic_bucket[key]

                safe_topic_name = topic_name.replace(".", "_").replace("-", "_")
                data_point[safe_topic_name] = data
                processed_data["topics"].add(safe_topic_name)

            processed_data["data"].append(data_point)

        processed_data["topics"] = sorted(list(processed_data["topics"]))

        return processed_data
