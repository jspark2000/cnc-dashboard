from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router

origins = [
    "http://localhost:7101",
    "http://localhost:5173",
    "http://192.168.30.211:5174",
]


def add_cors_middleware(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["*"],
    )


def add_routers(app: FastAPI):
    app.include_router(router)
