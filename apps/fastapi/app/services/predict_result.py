from app.db.postgres import PostgeSQL
from app.dao.predict_result import *
from sqlalchemy.orm import Session
import numpy as np


class PredictResultService:
    def __init__(self, database: PostgeSQL):
        self.db = database

    def get_predict_result(self):
        session: Session = self.db.connect()
        try:
            return get_latest_predict_results(session)
        finally:
            session.close()

    def get_predict_result_groupby_factor(self):
        session: Session = self.db.connect()
        try:
            return get_predict_results_by_factor(session)
        finally:
            session.close()

    def get_anomaly_factor(self):
        session: Session = self.db.connect()
        try:
            predict_results = get_daily_predict_results(session, "2024-09-20")
            predict_results_2023 = get_all_2023_predict_results(session)

            print(len(predict_results_2023))
            print(len(predict_results))

            data = list(
                map(
                    lambda x: [
                        x.inserted_at,
                        x.anomaly_score,
                        x.current_anomaly_score,
                        x.vibration_anomaly_score,
                        x.threshold,
                        x.is_anomaly,
                    ],
                    predict_results_2023,
                )
            ) + list(
                map(
                    lambda x: [
                        x.inserted_at,
                        x.anomaly_score,
                        x.current_anomaly_score,
                        x.vibration_anomaly_score,
                        x.threshold,
                        x.is_anomaly,
                    ],
                    predict_results,
                )
            )

            print(len(data))

            data_np = np.array(data)
            anomaly_slice = data_np[:, 1]

            anomaly_lv1 = anomaly_slice < 0.3
            anomaly_lv2 = (anomaly_slice >= 0.3) & (anomaly_slice < 0.5)
            anomaly_lv3 = anomaly_slice >= 0.5

            data = list(
                map(
                    lambda x: {
                        "timestamp": x[0],
                        "severity": 1,
                        "anomaly_score": x[1],
                        "current_anomaly_score": x[2],
                        "vibration_anomaly_score": x[3],
                        "threshold": x[4],
                        "is_anomaly": x[5],
                    },
                    data,
                )
            )

            return {
                "data_len": len(data),
                "anomaly_th_count": {
                    "lv1": int(np.sum(anomaly_lv1)),
                    "lv2": int(np.sum(anomaly_lv2)),
                    "lv3": int(np.sum(anomaly_lv3)),
                },
                "data": data,
            }
        finally:
            session.close()
