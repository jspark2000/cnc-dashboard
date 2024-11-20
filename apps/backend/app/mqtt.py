import asyncio
import logging
from typing import Dict
import paho.mqtt.client as mqtt
from threading import Thread
from app.config.broker import broker_config
from app.config.socket import DataSource

logger = logging.getLogger("uvicorn.info")

broker: str = broker_config.BROKER_HOST
port = broker_config.BROKER_PORT
topic = broker_config.TOPIC


def include_mqtt(data_sources: Dict[DataSource, asyncio.Queue]):
    main_loop = asyncio.get_event_loop()
    mqtt_thread = Thread(target=connect_mqtt, args=(main_loop, data_sources))
    mqtt_thread.start()


def connect_mqtt(
    loop: asyncio.AbstractEventLoop,
    data_sources: Dict[DataSource, asyncio.Queue],
):
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            client.subscribe(topic)
            logger.info(f"Connected to MQTT broker and subscribed to topic: {topic}")
        else:
            logger.error(f"Failed to connect to MQTT broker, return code {rc}")

    def on_message(client, useardta, msg):
        if msg.topic == broker_config.VIBRATION_TOPIC:
            asyncio.run_coroutine_threadsafe(
                data_sources[DataSource.VIBRATION].put(msg.payload), loop
            )

        if msg.topic == broker_config.CNC_TOPIC:
            asyncio.run_coroutine_threadsafe(
                data_sources[DataSource.CNC].put(msg.payload), loop
            )

        if msg.topic == broker_config.STATUS_TOPIC:
            asyncio.run_coroutine_threadsafe(
                data_sources[DataSource.STATUS].put(msg.payload), loop
            )

    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    client.connect(broker, port, 60)
    client.loop_start()
