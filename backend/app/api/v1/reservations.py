from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.repositories.reservation_repo import ReservationRepository
from app.services.reservation_service import ReservationService
from app.schemas.reservation import ReservationCreate, ReservationResponse, AvailabilityResponse
from typing import List

router = APIRouter()


def get_reservation_service(db: Session = Depends(get_db)) -> ReservationService:
    repo = ReservationRepository(db)
    return ReservationService(repo)


@router.post("/", response_model=ReservationResponse, status_code=status.HTTP_201_CREATED)
def make_reservation(
    payload: ReservationCreate,
    service: ReservationService = Depends(get_reservation_service)
):
    return service.create_reservation(payload)


@router.get("/", response_model=List[ReservationResponse])
def get_reservations(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    service: ReservationService = Depends(get_reservation_service)
):
    return service.list_reservations(skip=skip, limit=limit)


@router.get("/availability", response_model=AvailabilityResponse)
def check_availability(
    date: str = Query(..., description="YYYY-MM-DD"),
    service: ReservationService = Depends(get_reservation_service)
):
    return service.get_availability(date)
