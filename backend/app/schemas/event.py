from pydantic import BaseModel, ConfigDict
from typing import Optional


class EventBase(BaseModel):
    title: str
    timing: str
    description: str
    image_url: Optional[str] = None
    is_active: bool = True


class EventCreate(EventBase):
    pass


class EventResponse(EventBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
