from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime


class ReviewBase(BaseModel):
    author: str = Field(..., min_length=2, max_length=100)
    text: str = Field(..., min_length=5, max_length=1000)
    rating: int = Field(default=5, ge=1, le=5)
    source: str = Field(default="Google")


class ReviewCreate(ReviewBase):
    pass


class ReviewResponse(ReviewBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
