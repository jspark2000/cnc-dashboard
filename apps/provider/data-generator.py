import random
from datetime import datetime, timedelta
import json


def generate_two_months_data():
    # 기본 데이터 템플릿
    data_template = {
        "alarm0": 0,
        "alarm1": 0,
        "alarm2": 0,
        "alarm3": 0,
        "alarm4": 0,
        "alarm5": 0,
        "alarm6": 0,
        "alarm7": 0,
        "alarm8": 0,
        "alarm9": 0,
        "alarm10": 0,
        "alarm11": 0,
        "alarm12": 0,
        "alarm13": 0,
        "alarm14": 0,
        "axesno": 2,
        "currentfeadrate": 231,
        "cuttime": "26542-50-13",
        "cycletime": "1-25-59",
        "gcodeflag": 0,
        "gcodegroupno": 0,
        "ncmainprogno": 2425,
        "ncprogno": 2425,
        "onoff": 1,
        "operationmode": 2425,
        "operationtime": "24744-8-35",
        "partcounter": 473835,
        "powerontime": "4916421",
        "servocurrent1": 11,
        "servocurrent2": -1,
        "servocurrent3": 22528,
        "servocurrent4": 272,
        "servocurrent5": 0,
        "servomotorspeed1": -19,
        "servomotorspeed2": 0,
        "servomotorspeed3": 546816,
        "servomotorspeed4": 272,
        "servomotorspeed5": 5636096,
        "spindleload": 9,
        "spindleno": 1,
        "spindlerpm": 1100,
        "temp": 37.4,
        "toolgroupid": 0,
        "toollifecounter": 0,
        "xaxis": "X-10",
        "zaaxis": "Z-0",
    }
    start_time = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    data = []
    total_production_time = 24 * 60  # 24시간 (초 단위)
    items_produced = 0
    production_time = 0
    tool_life_counter = 100

    while production_time < total_production_time:
        # 생산 시간 (G00 상태)
        production_duration = random.randint(90, 110)  # 1분 30초 ~ 1분 50초
        for _ in range(production_duration):
            current_time = start_time + timedelta(minutes=production_time)
            data_template["gcode"] = "G00"
            data_template["gcodegroupno"] = random.randint(0, 5)
            data_template["timestamp"] = current_time.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
            data_template["toollifecounter"] = tool_life_counter
            tool_life_counter -= random.uniform(0.9, 1.1)
            data.append(data_template.copy())
            production_time += 1

        # 정지 시간 (G01 상태)
        stop_duration = random.randint(10, 15)  # 10~15초 정지
        for _ in range(stop_duration):
            current_time = start_time + timedelta(minutes=production_time)
            data_template["gcode"] = "G01"
            data_template["gcodegroupno"] = random.randint(0, 5)
            data_template["timestamp"] = current_time.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
            data_template["toollifecounter"] = tool_life_counter
            data.append(data_template.copy())
            production_time += 1

        items_produced += 1

        # 100개 생산 후 툴 교체
        if items_produced % 100 == 0:
            tool_change_time = random.randint(300, 600)  # 5~10분 동안 툴 교체
            for _ in range(tool_change_time):
                current_time = start_time + timedelta(minutes=production_time)
                data_template["gcode"] = "G01"  # 툴 교체 중에는 G01 상태 유지
                data_template["gcodegroupno"] = random.randint(0, 5)
                data_template["timestamp"] = current_time.strftime(
                    "%Y-%m-%dT%H:%M:%S.%fZ"
                )
                data_template["toollifecounter"] = tool_life_counter
                data.append(data_template.copy())
                production_time += 1
        tool_life_counter = 100

    # 생산 종료 후 남은 시간을 G01 상태로 채우기
    while production_time < total_production_time:
        current_time = start_time + timedelta(minutes=production_time)
        data_template["gcode"] = "G01"
        data_template["gcodegroupno"] = random.randint(0, 5)
        data_template["timestamp"] = current_time.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
        data_template["toollifecounter"] = tool_life_counter
        data.append(data_template.copy())
        production_time += 1
        tool_life_counter = 190

    # 데이터를 JSON 파일로 저장
    with open("one_day_data4.json", "w") as f:
        json.dump(data, f, indent=4)


# 실행
generate_two_months_data()
