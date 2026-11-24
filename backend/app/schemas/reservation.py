from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime


class ReservationBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    phone: str = Field(..., min_length=7, max_length=30)
    date: str = Field(..., description="YYYY-MM-DD")
    time: str = Field(..., description="HH:MM")
    guests: int = Field(default=2, ge=1, le=20)
    notes: Optional[str] = Field(default=None, max_length=500)


class ReservationCreate(ReservationBase):
    pass


class ReservationResponse(ReservationBase):
    id: int
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AvailabilityResponse(BaseModel):
    date: str
    available_times: list[str]
