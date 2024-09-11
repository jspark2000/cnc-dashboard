import uvicorn
import asyncio
import logging
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from app.containers import Container
from contextlib import asynccontextmanager
from app.routes import router
from app.mqtt import include_mqtt
from app.config import add_cors_settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("uvicorn.info")

message_queue = asyncio.Queue()
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
        ]
    )

    try:
        yield
    finally:
        container.shutdown_resources()


app = FastAPI(lifespan=lifespan)

add_cors_settings(app)
app.include_router(router)
include_mqtt(message_queue)


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
