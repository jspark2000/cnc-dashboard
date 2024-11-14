import asyncio
import datetime
import json
import logging
from enum import Enum
from typing import Dict, List
from fastapi import WebSocket


logger = logging.getLogger("uvicorn.info")


class DataSource(str, Enum):
    VIBRATION = "vibration"
    CNC = "cnc"
    CNC_REALTIME = "cnc_realtime"


class WebSocketConnection:
    def __init__(self, websocket: WebSocket, subscriptions: set[DataSource]):
        self.websocket = websocket
        self.subscriptions = subscriptions


class WebSocketManager:
    def __init__(self, queues: Dict[DataSource, asyncio.Queue]):
        self.active_connections: List[WebSocketConnection] = []
        self.queues = queues

    async def connect(self, websocket: WebSocket) -> WebSocketConnection:
        await websocket.accept()
        connection = WebSocketConnection(websocket, set())
        self.active_connections.append(connection)
        return connection

    def disconnect(self, connection: WebSocketConnection):
        self.active_connections.remove(connection)

    async def broadcast_to_subscribers(self, source: DataSource, message: dict):
        message = json.loads(message.decode())
        message_with_source = {"source": source, "data": message}
        json_message = json.dumps(message_with_source)

        for connection in self.active_connections:
            if source in connection.subscriptions:
                try:
                    logger.info(f"send message {datetime.datetime.now()}")
                    await connection.websocket.send_text(json_message)
                except Exception as e:
                    logger.error(f"Failed to send message to client: {e}")

    async def start_queue_listener(self, source: DataSource):
        while True:
            try:
                data = await self.queues[source].get()
                await self.broadcast_to_subscribers(source, data)
            except Exception as e:
                logger.error(f"Error in queue listener for {source}: {e}")
                await asyncio.sleep(1)
