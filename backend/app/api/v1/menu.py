from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.repositories.menu_repo import MenuRepository
from app.services.menu_service import MenuService
from app.schemas.menu import MenuItemResponse
from typing import Dict, List, Optional

router = APIRouter()


def get_menu_service(db: Session = Depends(get_db)) -> MenuService:
    repo = MenuRepository(db)
    return MenuService(repo)


@router.get("/", response_model=List[MenuItemResponse])
def list_menu_items(
    category: Optional[str] = Query(None),
    service: MenuService = Depends(get_menu_service)
):
    return service.get_items(category)


@router.get("/grouped", response_model=Dict[str, List[MenuItemResponse]])
def get_grouped_menu(
    service: MenuService = Depends(get_menu_service)
):
    return service.get_menu_grouped()


@router.get("/categories", response_model=List[str])
def list_categories(
    service: MenuService = Depends(get_menu_service)
):
    return service.get_categories()
