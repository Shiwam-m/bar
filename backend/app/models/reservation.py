from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime, timezone
from app.db.base import Base


class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(120), nullable=False)
    phone = Column(String(30), nullable=False, index=True)
    date = Column(String(20), nullable=False)  # YYYY-MM-DD
    time = Column(String(20), nullable=False)  # HH:MM
    guests = Column(Integer, nullable=False, default=2)
    notes = Column(Text, nullable=True)
    status = Column(String(30), default="confirmed")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
