FROM python:3.10.15-alpine as builder

RUN pip install poetry

WORKDIR /app

COPY pyproject.toml poetry.lock ./

RUN poetry export -f requirements.txt --output requirements.txt --without-hashes


FROM python:3.10.15-alpine

WORKDIR /app

COPY --from=builder /app/requirements.txt .

COPY ./apps/backend .

RUN pip install --no-cache-dir -r requirements.txt

RUN rm .env.development

EXPOSE 4000

CMD ["uvicorn", "app.main:app", "--port", "4000", "--host", "0.0.0.0"]
