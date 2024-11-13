import uvicorn
import asyncio
import logging
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from app.containers import Container
from contextlib import asynccontextmanager
from app.routes import router
from app.mqtt import include_mqtt
from app.config import add_cors_settings
import json
import asyncpg


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("uvicorn.info")

# 진동 데이터 클라이언트 큐
vibration_message_queue = asyncio.Queue()

# CNC 데이터 클라이언트 큐
cnc_message_queue = asyncio.Queue()

# CNC 실시간 데이터 클라이언트 큐
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

add_cors_settings(app)
app.include_router(router)
include_mqtt(vibration_message_queue)


@app.websocket("/mqtt/vibration")
async def websocket_endpoint_vibration(websocket: WebSocket):
    await websocket.accept()
    connected_clients.append(websocket)
    try:
        while True:
            data = await vibration_message_queue.get()
            for connection in connected_clients:
                await connection.send_text(data)
    except WebSocketDisconnect:
        connected_clients.remove(websocket)
        logger.info("Client disconnected")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        connected_clients.remove(websocket)
        await websocket.close(code=1000)


@app.websocket("/mqtt/cnc")
async def websocket_endpoint_cnc(websocket: WebSocket):
    await websocket.accept()
    connected_clients.append(websocket)
    try:
        while True:
            data = await cnc_message_queue.get()
            for connection in connected_clients:
                await connection.send_text(data)
    except WebSocketDisconnect:
        connected_clients.remove(websocket)
        logger.info("Client disconnected")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        connected_clients.remove(websocket)
        await websocket.close(code=1000)


async def listen_to_db(websocket: WebSocket):
    conn = await asyncpg.connect(
        user="postgres", password="password", database="postgres", host="localhost"
    )
    await conn.add_listener(
        "cnc_data",
        lambda conn, pid, channel, payload: asyncio.create_task(
            websocket.send_text(json.dumps(json.loads(payload)))
        ),
    )

    try:
        while True:
            # WebSocket 클라이언트 연결 유지
            await websocket.receive_text()
    except WebSocketDisconnect:
        await conn.close()


@app.websocket("/mqtt/cnc_realtime")
async def websocket_endpoint_cnc_realtime(websocket: WebSocket):
    await websocket.accept()
    connected_clients.append(websocket)
    try:
        await listen_to_db(websocket)

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
