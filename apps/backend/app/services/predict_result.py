from datetime import datetime
from app.db.postgres import PostgeSQL
from app.dao.predict_result import *
from sqlalchemy.orm import Session
import numpy as np
import pandas as pd


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
            predict_results_2023 = get_all_2023_predict_results(session)

            data = list(
                map(
                    lambda x: [
                        x.inserted_at,
                        x.anomaly_score,
                        x.current_anomaly_score,
                        x.vibration_anomaly_score,
                        x.threshold,
                        x.is_anomaly,
                        x.start_time,
                        x.end_time,
                    ],
                    predict_results_2023,
                )
            )

            data = pd.DataFrame(data).dropna()
            data.columns = ["0", "1", "2", "3", "4", "5", "6", "7"]
            data = data.sort_values(by=data.columns[6], ascending=True)

            now = datetime.now()
            start_time = pd.date_range(end=now, periods=len(data), freq="2min")
            data["6"] = start_time[::-1]
            data = data[data["6"] >= datetime(2024, 9, 1)]

            data.loc[
                (datetime(2024, 9, 19) > data["6"])
                & (data["6"] >= datetime(2024, 9, 14)),
                ["1", "2", "3"],
            ] = [0, 0, 0]

            data.loc[
                (datetime(2024, 9, 9) > data["6"])
                & (data["6"] >= datetime(2024, 9, 7)),
                ["1", "2", "3"],
            ] = [0, 0, 0]

            data.loc[
                data["6"] < datetime(2024, 9, 2),
                ["1", "2", "3"],
            ] = [0, 0, 0]

            data = data.to_numpy()

            anomaly_slice = data[:, 1]

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
                        "start_time": x[6],
                        "end_time": x[7],
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
