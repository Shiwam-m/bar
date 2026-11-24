from sqlalchemy.orm import Session
from app.models.event import Event
from app.schemas.event import EventCreate
from typing import List


class EventRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_active(self) -> List[Event]:
        return self.db.query(Event).filter(Event.is_active == True).all()

    def create(self, obj_in: EventCreate) -> Event:
        db_obj = Event(**obj_in.model_dump())
        self.db.add(db_obj)
        self.db.commit()
        self.db.refresh(db_obj)
        return db_obj
