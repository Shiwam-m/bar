from fastapi import APIRouter
from app.api.v1.health import router as health_router
from app.api.v1.reservations import router as reservations_router
from app.api.v1.menu import router as menu_router
from app.api.v1.events import router as events_router
from app.api.v1.reviews import router as reviews_router

api_router = APIRouter()
api_router.include_router(health_router, tags=["Health"])
api_router.include_router(reservations_router, prefix="/reservations", tags=["Reservations"])
api_router.include_router(menu_router, prefix="/menu", tags=["Menu"])
api_router.include_router(events_router, prefix="/events", tags=["Events"])
api_router.include_router(reviews_router, prefix="/reviews", tags=["Reviews"])
