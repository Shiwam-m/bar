import pytest
from fastapi.testclient import TestClient
from app.main import app


@pytest.fixture(scope="module")
def client():
    with TestClient(app) as c:
        yield c


def test_health_check(client):
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "BohoBar" in data["service"]


def test_get_menu(client):
    response = client.get("/api/v1/menu/")
    assert response.status_code == 200
    items = response.json()
    assert len(items) > 0
    assert any(i["category"] == "Cocktails" for i in items)


def test_get_menu_grouped(client):
    response = client.get("/api/v1/menu/grouped")
    assert response.status_code == 200
    grouped = response.json()
    assert "Cocktails" in grouped
    assert "Spirits" in grouped
    assert "Bites" in grouped


def test_create_reservation_and_list(client):
    payload = {
        "name": "Arjun Kapoor",
        "phone": "+919876543210",
        "date": "2026-12-01",
        "time": "20:00",
        "guests": 4,
        "notes": "Rooftop corner table preferred"
    }
    response = client.post("/api/v1/reservations/", json=payload)
    assert response.status_code == 201
    created = response.json()
    assert created["name"] == payload["name"]
    assert created["status"] == "confirmed"
    assert "id" in created

    # Verify listing
    list_res = client.get("/api/v1/reservations/")
    assert list_res.status_code == 200
    reservations = list_res.json()
    assert any(r["id"] == created["id"] for r in reservations)


def test_get_events(client):
    response = client.get("/api/v1/events/")
    assert response.status_code == 200
    events = response.json()
    assert len(events) >= 1
    assert "Live Acoustic Nights" in [e["title"] for e in events]


def test_get_reviews_and_post(client):
    response = client.get("/api/v1/reviews/")
    assert response.status_code == 200
    reviews = response.json()
    assert len(reviews) >= 1

    new_rev = {
        "author": "Kavita Rao",
        "text": "Stunning ambiance and top-tier hospitality!",
        "rating": 5,
        "source": "Google Reviews"
    }
    post_res = client.post("/api/v1/reviews/", json=new_rev)
    assert post_res.status_code == 201
    assert post_res.json()["author"] == "Kavita Rao"
