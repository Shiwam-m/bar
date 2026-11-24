from pydantic import BaseModel, ConfigDict
from typing import Optional


class MenuItemBase(BaseModel):
    category: str
    name: str
    description: str
    price: float
    image_url: Optional[str] = None
    is_special: bool = False
    dietary: Optional[str] = None


class MenuItemCreate(MenuItemBase):
    pass


class MenuItemResponse(MenuItemBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
