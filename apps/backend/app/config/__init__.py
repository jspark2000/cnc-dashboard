from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


def add_cors_settings(app: FastAPI):
    origins = ["http://localhost:5173", "http://192.168.30.211:5174"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["*"],
    )
