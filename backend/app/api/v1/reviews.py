from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.repositories.review_repo import ReviewRepository
from app.schemas.review import ReviewCreate, ReviewResponse
from typing import List

router = APIRouter()


@router.get("/", response_model=List[ReviewResponse])
def get_reviews(
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db)
):
    repo = ReviewRepository(db)
    return [ReviewResponse.model_validate(r) for r in repo.get_all(limit=limit)]


@router.post("/", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
def submit_review(
    payload: ReviewCreate,
    db: Session = Depends(get_db)
):
    repo = ReviewRepository(db)
    new_rev = repo.create(payload)
    return ReviewResponse.model_validate(new_rev)
