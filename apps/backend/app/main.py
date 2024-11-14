import uvicorn
import asyncio
import logging
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from app.containers import Container
from contextlib import asynccontextmanager
from app.routes import router
from app.mqtt import include_mqtt
from app.config import add_cors_settings
from app.config.socket import *


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("uvicorn.info")

vibration_message_queue = asyncio.Queue()
cnc_message_queue = asyncio.Queue()
cnc_realtime_message_queue = asyncio.Queue()

connected_clients = []


@asynccontextmanager
async def lifespan(app: FastAPI):
    container = Container()
    app.container = container  # type: ignore

    container.init_resources()
    container.wire(
        modules=[
            "app.routes.data.model_evaluation",
            "app.routes.data.predict_result",
            "app.routes.data.random_cnc",
        ]
    )

    try:
        yield
    finally:
        container.shutdown_resources()


app = FastAPI(lifespan=lifespan)
ws_manager = WebSocketManager(
    queues={
        DataSource.CNC: cnc_message_queue,
        DataSource.CNC_REALTIME: cnc_realtime_message_queue,
        DataSource.VIBRATION: vibration_message_queue,
    }
)

add_cors_settings(app)
app.include_router(router)
include_mqtt(vibration_message_queue)


@app.websocket("/ws/mqtt")
async def websocket_endpoint(websocket: WebSocket):
    connection = await ws_manager.connect(websocket)
    try:
        while True:
            message = await websocket.receive_json()

            if message.get("action") == "subscribe":
                source = DataSource(message.get("source"))
                connection.subscriptions.add(source)

            elif message.get("action") == "unsubscribe":
                source = DataSource(message.get("source"))
                connection.subscriptions.discard(source)

    except WebSocketDisconnect:
        ws_manager.disconnect(connection)
        logger.info("Client disconnected")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        ws_manager.disconnect(connection)
        await websocket.close(code=1000)


if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        reload=False,
        workers=1,
        port=4000,
    )
