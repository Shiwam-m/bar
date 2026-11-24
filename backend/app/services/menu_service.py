from app.repositories.menu_repo import MenuRepository
from app.schemas.menu import MenuItemResponse
from typing import Dict, List, Optional


class MenuService:
    def __init__(self, repo: MenuRepository):
        self.repo = repo

    def get_menu_grouped(self) -> Dict[str, List[MenuItemResponse]]:
        items = self.repo.get_all()
        grouped: Dict[str, List[MenuItemResponse]] = {}
        for item in items:
            grouped.setdefault(item.category, []).append(MenuItemResponse.model_validate(item))
        return grouped

    def get_categories(self) -> List[str]:
        return self.repo.get_categories()

    def get_items(self, category: Optional[str] = None) -> List[MenuItemResponse]:
        items = self.repo.get_all(category=category)
        return [MenuItemResponse.model_validate(i) for i in items]
