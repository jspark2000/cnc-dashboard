import asyncio
import logging
import paho.mqtt.client as mqtt
from threading import Thread

logger = logging.getLogger("uvicorn.info")

broker: str = "121.167.176.201"
port = 18810
topic = "#"


def connect_mqtt(loop: asyncio.AbstractEventLoop, message_queue: asyncio.Queue):
    def on_connect(client, userdata, flags, rc):
        logger.debug("Attempting to connect to MQTT broker...")
        if rc == 0:
            client.subscribe(topic)
            logger.info(f"Connected to MQTT broker and subscribed to topic: {topic}")
        else:
            logger.error(f"Failed to connect to MQTT broker, return code {rc}")

    def on_message(client, userdata, msg):
        message = msg.payload.decode()
        if msg.topic == "data_namdo":
            asyncio.run_coroutine_threadsafe(message_queue.put(message), loop)

    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    client.connect(broker, port, 60)
    client.loop_start()


def include_mqtt(message_queue: asyncio.Queue):
    main_loop = asyncio.get_event_loop()
    mqtt_thread = Thread(target=connect_mqtt, args=(main_loop, message_queue))
    mqtt_thread.start()
