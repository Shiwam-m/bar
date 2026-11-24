from sqlalchemy.orm import Session
from app.models.menu import MenuItem
from app.schemas.menu import MenuItemCreate
from typing import List, Optional


class MenuRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self, category: Optional[str] = None) -> List[MenuItem]:
        query = self.db.query(MenuItem)
        if category:
            query = query.filter(MenuItem.category == category)
        return query.all()

    def get_categories(self) -> List[str]:
        results = self.db.query(MenuItem.category).distinct().all()
        return [r[0] for r in results]

    def create(self, obj_in: MenuItemCreate) -> MenuItem:
        db_obj = MenuItem(**obj_in.model_dump())
        self.db.add(db_obj)
        self.db.commit()
        self.db.refresh(db_obj)
        return db_obj
