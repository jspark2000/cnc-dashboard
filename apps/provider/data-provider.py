import paho.mqtt.client as mqtt
import json
from datetime import datetime
from influxdb_client import InfluxDBClient, Point
from influxdb_client.client.write_api import SYNCHRONOUS

cur_measurement, measurement_offset = None, None

influxdb_url = "http://localhost:8086"
influxdb_token = "wLM-7NdcNLo7F1EuMl9dPCAXnH1NN3dhkkd0xo_jLfkajSLGsbhmfNrqm_JeME7uFVGkDj-5ng27N8ZSYjnG4Q=="
influxdb_org = "crois"
influxdb_bucket = "cnc_current"

client = InfluxDBClient(url=influxdb_url, token=influxdb_token, org=influxdb_org)
write_api = client.write_api(write_options=SYNCHRONOUS)

mqtt_broker = "121.167.176.201"
mqtt_port = 18810
mqtt_topic = "sincewin_power"


def on_message(client, userdata, msg):
    global cur_measurement, measurement_offset

    payload = msg.payload.decode("utf-8")
    # print(f"Received message on topic '{msg.topic}'")

    try:
        data = json.loads(payload)
        dt = datetime.strptime(data["time"], "%Y-%m-%d-%H:%M:%S")
        measurement_name = dt.strftime("%Y-%m-%d %H:%M")

        if cur_measurement != dt.strftime("%Y-%m-%d %H:%M:%S"):
            cur_measurement = dt.strftime("%Y-%m-%d %H:%M:%S")
            measurement_offset = 0
        else:
            measurement_offset += 1

        point = (
            Point(measurement_name)
            .field("Active_Power_W1", data["Active_Power_W1"])
            .field("Active_Power_W2", data["Active_Power_W2"])
            .field("Active_Power_W3", data["Active_Power_W3"])
            .field("Apparent_Power_Va1", data["Apparent_Power_Va1"])
            .field("Apparent_Power_Va2", data["Apparent_Power_Va2"])
            .field("Apparent_Power_Va3", data["Apparent_Power_Va3"])
            .field("Line_Current_L1", data["Line_Current_L1"])
            .field("Line_Current_L2", data["Line_Current_L2"])
            .field("Line_Current_L3", data["Line_Current_L3"])
            .field("Line_Voltage_V12", data["Line_Voltage_V12"])
            .field("Line_Voltage_V23", data["Line_Voltage_V23"])
            .field("Line_Voltage_V31", data["Line_Voltage_V31"])
            .time(
                int(dt.timestamp() * 1_000_000_000) + measurement_offset * 100_000_000
            )
        )

        try:
            write_api.write(bucket=influxdb_bucket, org=influxdb_org, record=point)
            # print(f"Data point written to InfluxDB")
        except Exception as e:
            print(f"Failed to write data point to InfluxDB: {e}")

    except (json.JSONDecodeError, IndexError) as e:
        print(f"Failed to process data: {e}")


def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")
    client.subscribe(mqtt_topic)


mqtt_client = mqtt.Client()
mqtt_client.on_connect = on_connect
mqtt_client.on_message = on_message

mqtt_client.connect(mqtt_broker, mqtt_port, 60)
mqtt_client.loop_forever()
