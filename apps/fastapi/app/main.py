import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.containers import Container
from contextlib import asynccontextmanager
from app.routes import router


@asynccontextmanager
async def lifespan(app: FastAPI):
    container = Container()
    app.container = container

    container.init_resources()
    container.wire(
        modules=[
            "app.routes.data.model_evaluation",
        ]
    )

    try:
        yield
    finally:
        container.shutdown_resources()


app = FastAPI(lifespan=lifespan)

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

app.include_router(router)

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        reload=False,
        workers=1,
    )
