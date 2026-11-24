from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.repositories.event_repo import EventRepository
from app.schemas.event import EventResponse
from typing import List

router = APIRouter()


@router.get("/", response_model=List[EventResponse])
def get_active_events(db: Session = Depends(get_db)):
    repo = EventRepository(db)
    return [EventResponse.model_validate(e) for e in repo.get_active()]
