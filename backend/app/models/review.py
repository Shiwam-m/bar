from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime, timezone
from app.db.base import Base


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    author = Column(String(100), nullable=False)
    text = Column(Text, nullable=False)
    rating = Column(Integer, default=5)
    source = Column(String(50), default="Google")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
