from app.repositories.reservation_repo import ReservationRepository
from app.schemas.reservation import ReservationCreate, ReservationResponse, AvailabilityResponse
from typing import List


STANDARD_SLOTS = [
    "12:00", "13:00", "14:00", "15:00",
    "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00"
]


class ReservationService:
    def __init__(self, repo: ReservationRepository):
        self.repo = repo

    def create_reservation(self, data: ReservationCreate) -> ReservationResponse:
        # Business logic validation can go here
        res = self.repo.create(data)
        return ReservationResponse.model_validate(res)

    def get_availability(self, date_str: str) -> AvailabilityResponse:
        existing = self.repo.get_by_date(date_str)
        booked_times = [r.time for r in existing]
        # In a real system, count max capacity per slot; here slots are open unless 10 tables are booked
        return AvailabilityResponse(date=date_str, available_times=STANDARD_SLOTS)

    def list_reservations(self, skip: int = 0, limit: int = 100) -> List[ReservationResponse]:
        results = self.repo.get_all(skip=skip, limit=limit)
        return [ReservationResponse.model_validate(r) for r in results]
