import asyncio
from datetime import datetime
import json
import random

# import paho.mqtt.client as mqtt
from threading import Thread
import numpy as np

# broker: str = "121.167.176.201"
# port = 18810
# topic = "#"


async def periodic_message_generator(message_queue: asyncio.Queue):
    while True:
        await message_queue.put(json.dumps(generate_fake_message()))
        await asyncio.sleep(0.5)


def start_mqtt_loop(loop, message_queue):
    asyncio.set_event_loop(loop)
    loop.run_until_complete(periodic_message_generator(message_queue))


def include_mqtt(message_queue: asyncio.Queue):
    main_loop = asyncio.new_event_loop()
    mqtt_thread = Thread(target=start_mqtt_loop, args=(main_loop, message_queue))
    mqtt_thread.start()


def generate_fake_message():
    return {
        "x": generate_float_list(0, 0.1, 4096),
        "y": generate_float_list(0, 0.08, 4096),
        "z": generate_float_list(0, 0.2, 4096),
        "current": generate_float_list(0, 1, 4096),
        "time": [datetime.now().isoformat()],
    }


# def connect_mqtt(loop: asyncio.AbstractEventLoop, message_queue: asyncio.Queue):
#     def on_connect(client, userdata, flags, rc):
#         logger.debug("Attempting to connect to MQTT broker...")
#         if rc == 0:
#             client.subscribe(topic)
#             logger.info(f"Connected to MQTT broker and subscribed to topic: {topic}")
#         else:
#             logger.error(f"Failed to connect to MQTT broker, return code {rc}")

#     def on_message(client, userdata, msg):
#         asyncio.run_coroutine_threadsafe(
#             message_queue.put(json.dumps(generate_fake_data())), loop
#         )
#         # if msg.topic == "data_fake":
#         #     asyncio.run_coroutine_threadsafe(message_queue.put(message), loop)

#     client = mqtt.Client()
#     client.on_connect = on_connect
#     client.on_message = on_message

#     client.connect(broker, port, 60)
#     client.loop_start()


def generate_float_list(min_value: float, max_value: float, length: int = 5000) -> list:
    return [random.uniform(min_value, max_value) for _ in range(length)]


def generate_random_frequency():
    # 파라미터 설정
    Fs = 8192
    T = 1.0
    N = int(Fs * T)
    t = np.linspace(0, T, N, endpoint=False)

    signal = np.zeros(N)  # 신호 초기화

    # 임의의 합성파 생성

    for freq in [10, 45, 100, 154, 1200]:  # 0Hz ~ 4096Hz 사이의 주파수
        amplitude = np.random.uniform(0.5, 1.5)  # 진폭 (0.5 ~ 1.5 사이의 값)
        phase = np.random.uniform(0, 2 * np.pi)  # 위상 (0 ~ 2π 사이의 값)
        signal += amplitude * np.sin(2 * np.pi * freq * t + phase)

    return signal.tolist()
