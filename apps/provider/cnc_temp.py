import json
import socketio
import asyncio
from fastapi import FastAPI, HTTPException, Path
from fastapi.middleware.cors import CORSMiddleware
import paho.mqtt.client as mqtt
from threading import Thread
from pydantic import BaseModel
from influxdb_client import InfluxDBClient

app = FastAPI()

sio = socketio.AsyncServer(cors_allowed_origins="*", async_mode="asgi")
socket_app = socketio.ASGIApp(sio, other_asgi_app=app)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MQTT_BROKER = "121.167.176.201"
MQTT_PORT = 18810
MQTT_TOPIC = "data1"

url = "http://localhost:8086"
token = "Xe7corpXrKKhDQLDyb0xtMZ83L1LZii1k-uJykJsViFyQ21Sx_x1F5bu1jhGLsZqXLT1qb_q8mzzzLOrDIfSNg=="
org = "crois"
bucket = "cnc_current"

client = InfluxDBClient(url=url, token=token, org=org)
query_api = client.query_api()


class RMSMean(BaseModel):
    rms: float
    mean: float


class ProductionFactor(BaseModel):
    mean: float
    rms: float
    impact_factor: float
    crest_factor: float


def consume_and_emit():
    mqtt_client = mqtt.Client()

    def on_message(client, userdata, msg):
        message = msg.payload.decode()
        # print(f"Consumed: {message}")
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(sio.emit("message", json.loads(message)))
        loop.close()

    mqtt_client.on_message = on_message

    mqtt_client.connect(MQTT_BROKER, MQTT_PORT, 60)
    mqtt_client.subscribe(MQTT_TOPIC)

    mqtt_client.loop_forever()


@app.on_event("startup")
async def startup_event():
    consumer_thread = Thread(target=consume_and_emit)
    consumer_thread.start()


@sio.on("connect")
async def connect(sid, environ):
    print("New Client Connected to This id: " + str(sid))


@sio.on("disconnect")
async def disconnect(sid):
    print("Client Disconnected: " + str(sid))


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/production-factor/{field_name}", response_model=ProductionFactor)
async def get_production_factors(
    field_name: str = Path(..., description="Field name for which to calculate metrics")
):
    flux_query = f"""
    import "math"

    from(bucket: "{bucket}")
      |> range(start: -150s, stop: now())
      |> filter(fn: (r) => r._field == "{field_name}")
      |> map(fn: (r) => ({{"_time": r._time, "_value": float(v: r._value), "_value_squared": float(v: r._value) * float(v: r._value), "_value_abs": math.abs(x: float(v: r._value))}}))
      |> reduce(
          fn: (r, accumulator) => ({{
              max_value: if r._value > accumulator.max_value then r._value else accumulator.max_value,
              rms_sum: accumulator.rms_sum + r._value_squared,
              abs_sum: accumulator.abs_sum + r._value_abs,
              count: accumulator.count + 1.0
          }}),
          identity: {{max_value: float(v: -10000000.0), rms_sum: 0.0, abs_sum: 0.0, count: 0.0}}
      )
      |> map(fn: (r) => ({{
          max_value: r.max_value,
          rms: math.sqrt(x: r.rms_sum / r.count),
          mean: r.abs_sum / r.count,
          impact_factor: r.max_value / math.sqrt(x: r.rms_sum / r.count),
          crest_factor: r.max_value / (r.abs_sum / r.count)
      }}))
    """

    results = query_api.query(query=flux_query)

    for table in results:
        for record in table.records:
            mean = record.values.get("mean")
            rms = record.values.get("rms")
            impact_factor = record.values.get("impact_factor")
            crest_factor = record.values.get("crest_factor")

            if all([mean, rms, impact_factor, crest_factor]):
                return ProductionFactor(
                    mean=mean,
                    rms=rms,
                    impact_factor=impact_factor,
                    crest_factor=crest_factor,
                )

    raise HTTPException(status_code=404, detail="No data found for the given field")


@app.get("/production-mean-and-rms/{field_name}", response_model=RMSMean)
async def get_mean_rms(
    field_name: str = Path(
        ..., description="Field name for which to calculate mean and RMS"
    )
):
    flux_query = f"""
    import "math"

    from(bucket: "{bucket}")
      |> range(start: -2s, stop: now())
      |> filter(fn: (r) => r._field == "{field_name}")
      |> map(fn: (r) => ({{"_time": r._time, "_value": float(v: r._value), "_value_squared": float(v: r._value) * float(v: r._value)}}))
      |> reduce(
          fn: (r, accumulator) => ({{
              rms_sum: accumulator.rms_sum + r._value_squared,
              abs_sum: accumulator.abs_sum + math.abs(x: r._value),
              count: accumulator.count + 1.0
          }}),
          identity: {{rms_sum: 0.0, abs_sum: 0.0, count: 0.0}}
      )
      |> map(fn: (r) => ({{
          rms: math.sqrt(x: r.rms_sum / r.count),
          mean: r.abs_sum / r.count
      }}))
    """

    results = query_api.query(query=flux_query)

    for table in results:
        for record in table.records:
            mean = record.values.get("mean")
            rms = record.values.get("rms")

            if all([mean, rms]):
                return RMSMean(
                    mean=mean,
                    rms=rms,
                )

    raise HTTPException(status_code=404, detail="No data found for the given field")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(socket_app, host="0.0.0.0", port=8002)
