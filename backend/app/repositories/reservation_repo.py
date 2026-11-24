from sqlalchemy.orm import Session
from app.models.reservation import Reservation
from app.schemas.reservation import ReservationCreate


class ReservationRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, obj_in: ReservationCreate) -> Reservation:
        db_obj = Reservation(
            name=obj_in.name,
            phone=obj_in.phone,
            date=obj_in.date,
            time=obj_in.time,
            guests=obj_in.guests,
            notes=obj_in.notes,
            status="confirmed",
        )
        self.db.add(db_obj)
        self.db.commit()
        self.db.refresh(db_obj)
        return db_obj

    def get_by_id(self, reservation_id: int):
        return self.db.query(Reservation).filter(Reservation.id == reservation_id).first()

    def get_all(self, skip: int = 0, limit: int = 100):
        return self.db.query(Reservation).order_by(Reservation.id.desc()).offset(skip).limit(limit).all()

    def get_by_date(self, date_str: str):
        return self.db.query(Reservation).filter(Reservation.date == date_str).all()
