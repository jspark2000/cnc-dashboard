import uvicorn
import asyncio
import logging
import paho.mqtt.client as mqtt
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.containers import Container
from contextlib import asynccontextmanager
from app.routes import router
from threading import Thread

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

message_queue = asyncio.Queue()


@asynccontextmanager
async def lifespan(app: FastAPI):
    container = Container()
    app.container = container  # type: ignore

    container.init_resources()
    container.wire(
        modules=[
            "app.routes.data.model_evaluation",
            "app.routes.data.predict_result",
        ]
    )

    try:
        yield
    finally:
        container.shutdown_resources()


app = FastAPI(lifespan=lifespan)

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

app.include_router(router)


connected_clients = []

broker = "121.167.176.201"
port = 18810
topic = "data1"
client_id = "fastapi-mqtt-client"


def connect_mqtt(loop):
    def on_connect(client, userdata, flags, rc):
        logger.debug("Attempting to connect to MQTT broker...")

        if rc == 0:
            client.subscribe(topic)
            logger.info(f"Connected to MQTT broker and subscribed to topic: {topic}")
        else:
            logger.error(f"Failed to connect to MQTT broker, return code {rc}")

    def on_message(client, userdata, msg):
        message = msg.payload.decode()
        logger.info(f"Received {message} from {msg.topic} topic")

        asyncio.run_coroutine_threadsafe(message_queue.put(message), loop)

    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    client.connect(broker, port, 60)
    client.loop_start()


main_loop = asyncio.get_event_loop()

mqtt_thread = Thread(target=connect_mqtt, args=(main_loop,))
mqtt_thread.start()


@app.websocket("/mqtt")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connected_clients.append(websocket)
    try:
        while True:
            data = await message_queue.get()
            for connection in connected_clients:
                await connection.send_text(data)
    except WebSocketDisconnect:
        connected_clients.remove(websocket)
        logger.info("Client disconnected")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        connected_clients.remove(websocket)
        await websocket.close(code=1000)


if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        reload=False,
        workers=1,
        port=4000,
    )
