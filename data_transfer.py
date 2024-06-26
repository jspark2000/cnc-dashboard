import os
import glob
import pandas as pd
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from datetime import datetime
import time

# PostgreSQL 데이터베이스 연결 정보
DB_HOST = 'localhost'
DB_NAME = 'postgres'
DB_USER = 'postgres'
DB_PASSWORD = 'password'
DB_PORT = '5432' 

# 폴더 경로
folder_path = 'cnc_data'

# PostgreSQL 데이터베이스에 연결
def connect_to_db():
    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT
    )
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    return conn

# CSV 파일을 데이터베이스에 저장하는 함수
def save_csv_to_db(file_path, table_name, conn):
    df = pd.read_csv(file_path)
    cursor = conn.cursor()
    
    # 데이터 삽입
    for _, row in df.iterrows():
        date_string = row['Timestamp']
        # 문자열을 datetime 객체로 변환
        date_object = datetime.strptime(date_string, "%Y-%m-%d-%H:%M:%S")

        # datetime 객체를 PostgreSQL TIMESTAMP 형식의 문자열로 변환
        postgres_timestamp = date_object.strftime("%Y-%m-%d %H:%M:%S")
        row['Timestamp'] = postgres_timestamp

        insert_query = f"""
        INSERT INTO {table_name} ({', '.join(df.columns)})
        VALUES ({', '.join(['%s'] * len(df.columns))});
        """
        cursor.execute(insert_query, tuple(row))
        time.sleep(1)
    
    conn.commit()
    cursor.close()

# 폴더 안의 모든 CSV 파일 처리
def process_csv_files(folder_path):
    csv_files = glob.glob(os.path.join(folder_path, '*.csv'))
    conn = connect_to_db()
    
    for file_path in csv_files:
        table_name = 'cnc_data'
        save_csv_to_db(file_path, table_name, conn)
    
    conn.close()

# CSV 파일 처리 실행
process_csv_files(folder_path)
