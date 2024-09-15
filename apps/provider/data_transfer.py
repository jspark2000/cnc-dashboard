import os
import glob
import pandas as pd
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from datetime import datetime
import time
import random
import time
from datetime import datetime

# PostgreSQL 데이터베이스 연결 정보
DB_HOST = "localhost"
DB_NAME = "postgres"
DB_USER = "postgres"
DB_PASSWORD = "password"
DB_PORT = "5432"

# 폴더 경로
folder_path = "../../cnc_data"


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


# PostgreSQL 데이터베이스에 연결
def connect_to_db():
    conn = psycopg2.connect(
        host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASSWORD, port=DB_PORT
    )
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    return conn


# CSV 파일을 데이터베이스에 저장하는 함수
def save_csv_to_db(file_path, table_name, conn):
    df = pd.read_csv(file_path)
    cursor = conn.cursor()

    # 데이터 삽입
    for _, row in df.iterrows():
        date_string = row["Timestamp"]
        # 문자열을 datetime 객체로 변환
        date_object = datetime.strptime(date_string, "%Y-%m-%d-%H:%M:%S")

        # datetime 객체를 PostgreSQL TIMESTAMP 형식의 문자열로 변환
        postgres_timestamp = date_object.strftime("%Y-%m-%d %H:%M:%S")
        row["Timestamp"] = postgres_timestamp

        insert_query = f"""
        INSERT INTO {table_name} ({', '.join(df.columns)})
        VALUES ({', '.join(['%s'] * len(df.columns))});
        """
        cursor.execute(insert_query, tuple(row))
        time.sleep(1)

    conn.commit()
    cursor.close()


def generate_random_data():
    return {
        "alarm0": random.randint(0, 1),
        "alarm1": random.randint(0, 1),
        "alarm2": random.randint(0, 1),
        "alarm3": random.randint(0, 1),
        "alarm4": random.randint(0, 1),
        "alarm5": random.randint(0, 1),
        "alarm6": random.randint(0, 1),
        "alarm7": random.randint(0, 1),
        "alarm8": random.randint(0, 1),
        "alarm9": random.randint(0, 1),
        "alarm10": random.randint(0, 1),
        "alarm11": random.randint(0, 1),
        "alarm12": random.randint(0, 1),
        "alarm13": random.randint(0, 1),
        "alarm14": random.randint(0, 1),
        "axesno": random.randint(1, 5),
        "currentfeadrate": random.randint(100, 500),
        "cuttime": f"{random.randint(0, 99999)}-{random.randint(0, 59)}-{random.randint(0, 59)}",
        "cycletime": f"{random.randint(0, 24)}-{random.randint(0, 59)}-{random.randint(0, 59)}",
        "gcodeflag": random.randint(0, 1),
        "gcodegroupno": random.randint(0, 10),
        "ncmainprogno": random.randint(1000, 9999),
        "ncprogno": random.randint(1000, 9999),
        "onoff": random.randint(0, 1),
        "operationmode": random.randint(1000, 9999),
        "operationtime": f"{random.randint(0, 99999)}-{random.randint(0, 23)}-{random.randint(0, 59)}",
        "partcounter": random.randint(100000, 999999),
        "powerontime": str(random.randint(1000000, 9999999)),
        "servocurrent1": random.randint(-100, 100),
        "servocurrent2": random.randint(-100, 100),
        "servocurrent3": random.randint(-100, 100),
        "servocurrent4": random.randint(-100, 100),
        "servocurrent5": random.randint(-100, 100),
        "servomotorspeed1": random.randint(-1000, 1000),
        "servomotorspeed2": random.randint(-1000, 1000),
        "servomotorspeed3": random.randint(-1000, 1000),
        "servomotorspeed4": random.randint(-1000, 1000),
        "servomotorspeed5": random.randint(-1000, 1000),
        "spindleload": random.randint(0, 100),
        "spindleno": random.randint(1, 5),
        "spindlerpm": random.randint(500, 2000),
        "temp": round(random.uniform(20.0, 50.0), 1),
        "toolgroupid": random.randint(0, 10),
        "toollifecounter": round(random.uniform(0, 100), 2),
        "xaxis": f"X{random.randint(-100, 100)}",
        "zaaxis": f"Z{random.randint(-100, 100)}",
        "gcode": f"G{random.randint(0, 99):02d}",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }


def generate_data():
    conn = connect_to_db()
    cursor = conn.cursor()
    table_name = "cnc_data"

    try:
        print("Data generation started.")
        while True:
            data = generate_random_data()
            columns = ", ".join(data.keys())
            placeholders = ", ".join(["%s"] * len(data))
            insert_query = (
                f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"
            )

            cursor.execute(insert_query, list(data.values()))
            conn.commit()

            print(f"Data inserted at {data['timestamp']}")
            time.sleep(1)
    except KeyboardInterrupt:
        print("Data generation stopped.")
    finally:
        cursor.close()
        conn.close()


# 폴더 안의 모든 CSV 파일 처리
def process_csv_files(folder_path):
    csv_files = glob.glob(os.path.join(folder_path, "*.csv"))
    conn = connect_to_db()

    for file_path in csv_files:
        table_name = "cnc_data"
        save_csv_to_db(file_path, table_name, conn)

    conn.close()


# CSV 파일 처리 실행
# process_csv_files(folder_path)

generate_data()
