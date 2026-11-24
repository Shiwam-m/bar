from sqlalchemy import Column, Integer, String, Text, Float, Boolean
from app.db.base import Base


class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    category = Column(String(60), nullable=False, index=True)  # Cocktails, Spirits, Bites, Mains
    name = Column(String(120), nullable=False)
    description = Column(Text, nullable=False)
    price = Column(Float, nullable=False)
    image_url = Column(String(255), nullable=True)
    is_special = Column(Boolean, default=False)
    dietary = Column(String(50), nullable=True)  # Veg, Non-Veg, Vegan
