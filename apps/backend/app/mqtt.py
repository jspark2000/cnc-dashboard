import asyncio
import logging
import paho.mqtt.client as mqtt
from threading import Thread
from app.config.broker import broker_config

logger = logging.getLogger("uvicorn.info")

broker: str = broker_config.BROKER_HOST
port = broker_config.BROKER_PORT
topic = broker_config.TOPIC


def include_mqtt(message_queue: asyncio.Queue):
    main_loop = asyncio.get_event_loop()
    mqtt_thread = Thread(target=connect_mqtt, args=(main_loop, message_queue))
    mqtt_thread.start()


def connect_mqtt(loop: asyncio.AbstractEventLoop, message_queue: asyncio.Queue):
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            client.subscribe(topic)
            logger.info(f"Connected to MQTT broker and subscribed to topic: {topic}")
        else:
            logger.error(f"Failed to connect to MQTT broker, return code {rc}")

    def on_message(client, useardta, msg):
        if msg.topic == broker_config.VIBRATION_TOPIC:
            asyncio.run_coroutine_threadsafe(message_queue.put(msg.payload), loop)

    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    client.connect(broker, port, 60)
    client.loop_start()
