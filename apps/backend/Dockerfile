FROM python:3.10.5-slim as builder

RUN pip install poetry

WORKDIR /app

COPY pyproject.toml poetry.lock ./

RUN poetry export -f requirements.txt --output requirements.txt --without-hashes --without-dev


FROM python:3.10.5-slim

WORKDIR /app

COPY --from=builder /app/requirements.txt .

COPY ./apps/backend .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["uvicorn", "app.main:app", "--port", "4000", "--host", "0.0.0.0"]
