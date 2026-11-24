from sqlalchemy.orm import Session
from app.models.review import Review
from app.schemas.review import ReviewCreate
from typing import List


class ReviewRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self, limit: int = 10) -> List[Review]:
        return self.db.query(Review).order_by(Review.id.desc()).limit(limit).all()

    def create(self, obj_in: ReviewCreate) -> Review:
        db_obj = Review(**obj_in.model_dump())
        self.db.add(db_obj)
        self.db.commit()
        self.db.refresh(db_obj)
        return db_obj
