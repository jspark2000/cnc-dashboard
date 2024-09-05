from datetime import datetime
from pydantic import BaseModel


class User(BaseModel):
    id: int
    name: str = "John Doe"
    signup_ts: datetime | None = None
    friends: list[int] = []


raw_data = {
    "id": "123",
    "signup_ts": "2017-01-01 12:00",
    "friends": [1, "2", b"3"],
}

user = User(**raw_data)

print(user)
