from sqlalchemy import Column, Integer, String, Text, Boolean
from app.db.base import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(120), nullable=False)
    timing = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    image_url = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
