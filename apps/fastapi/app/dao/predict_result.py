import math
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.models.predict_result import PredictResult
from app.models.predict_result_2023 import PredictResult2023
import pandas as pd


def get_all_2023_predict_results(session: Session) -> list[PredictResult2023]:
    return (
        session.query(PredictResult2023)
        .order_by(PredictResult2023.start_time.asc())
        .all()
    )


def get_daily_predict_results(
    session: Session, target_date: str
) -> list[PredictResult]:
    return (
        session.query(PredictResult)
        .filter(func.date(PredictResult.inserted_at) == target_date)
        .order_by(PredictResult.start_time.asc())
        .all()
    )


def get_latest_predict_results(session: Session) -> list[PredictResult]:
    return (
        session.query(PredictResult)
        .order_by(PredictResult.inserted_at.desc())
        .limit(1)
        .all()
    )


def get_predict_results_by_factor(session: Session):
    predict_results = (
        session.query(PredictResult)
        .order_by(PredictResult.inserted_at.desc())
        .limit(30)
        .all()
    )

    result = {
        "vibration": {
            "rms": {"x": list(), "y": list(), "z": list()},
            "max": {"x": list(), "y": list(), "z": list()},
            "std": {"x": list(), "y": list(), "z": list()},
            "impact_factor": {"x": list(), "y": list(), "z": list()},
            "crest_factor": {"x": list(), "y": list(), "z": list()},
            "mean_power_spectrum": {"x": list(), "y": list(), "z": list()},
        },
        "current": {
            "rms_power": {"p1": list(), "p2": list(), "p3": list()},
            "rms_current": {"p1": list(), "p2": list(), "p3": list()},
            "rms_voltage": {"p1": list(), "p2": list(), "p3": list()},
        },
        "time": list(),
    }

    for predict_result in predict_results:
        result["vibration"]["rms"]["x"].append(predict_result.x_rms)
        result["vibration"]["rms"]["y"].append(predict_result.y_rms)
        result["vibration"]["rms"]["z"].append(predict_result.z_rms)
        result["vibration"]["max"]["x"].append(predict_result.x_max)
        result["vibration"]["max"]["y"].append(predict_result.y_max)
        result["vibration"]["max"]["z"].append(predict_result.z_max)
        result["vibration"]["std"]["x"].append(predict_result.x_std)
        result["vibration"]["std"]["y"].append(predict_result.y_std)
        result["vibration"]["std"]["z"].append(predict_result.z_std)
        result["vibration"]["impact_factor"]["x"].append(predict_result.x_impact_factor)
        result["vibration"]["impact_factor"]["y"].append(predict_result.y_impact_factor)
        result["vibration"]["impact_factor"]["z"].append(predict_result.z_impact_factor)
        result["vibration"]["crest_factor"]["x"].append(predict_result.x_crest_factor)
        result["vibration"]["crest_factor"]["y"].append(predict_result.y_crest_factor)
        result["vibration"]["crest_factor"]["z"].append(predict_result.z_crest_factor)
        result["vibration"]["mean_power_spectrum"]["x"].append(
            predict_result.x_mean_power_spectrum
        )
        result["vibration"]["mean_power_spectrum"]["y"].append(
            predict_result.y_mean_power_spectrum
        )
        result["vibration"]["mean_power_spectrum"]["z"].append(
            predict_result.z_mean_power_spectrum
        )

        result["current"]["rms_power"]["p1"].append(predict_result.pf_rms_1)
        result["current"]["rms_power"]["p2"].append(predict_result.pf_rms_2)
        result["current"]["rms_power"]["p3"].append(predict_result.pf_rms_3)
        result["current"]["rms_current"]["p1"].append(predict_result.current_rms_1)
        result["current"]["rms_current"]["p2"].append(predict_result.current_rms_2)
        result["current"]["rms_current"]["p3"].append(predict_result.current_rms_3)
        result["current"]["rms_voltage"]["p1"].append(predict_result.voltage_rms_1)
        result["current"]["rms_voltage"]["p2"].append(predict_result.voltage_rms_2)
        result["current"]["rms_voltage"]["p3"].append(predict_result.voltage_rms_3)

        result["time"].append(predict_result.inserted_at)

    return result
