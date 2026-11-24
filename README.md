# Molecule Air Bar, Lucknow - Modernized Web Application

A full-stack, industry-standard modern web application for **Molecule Air Bar, Lucknow** (Riverside Mall, Gomti Nagar), built with **React, TypeScript, Vite, Tailwind CSS, Three.js / React Three Fiber, and FastAPI**.

The visual identity, dark luxury ambiance, gold metallic palette, serif typography, and interactive 3D molecule animation are preserved and enhanced with modern modular architecture, persistent backend APIs, and responsive design.

---

## 🌟 Key Features

1. **3D Interactive Experience**:
   - Floating, rotating 3D molecule built with Three.js and `@react-three/fiber`.
   - Exact atom coordinates, gold and ivory materials, cylinder bonds, pointer parallax, and smooth lerped camera/scale transitions.
   - Dynamic route-based dimming (prominent on Home, subtle in sub-pages).
2. **Authentic Lucknow Brand Context**:
   - Location: 7th Floor, Riverside Mall, Vipin Khand, Gomti Nagar, Lucknow, UP – 226010.
   - Operating Hours: 12:00 PM to 2:00 AM Daily.
   - Specialty: Molecular mixology, rooftop skybar view, Awadhi fusion tapas, live acoustic and DJ nightlife.
3. **Menu Catalog**:
   - Tabbed filtering for Cocktails, Spirits, and Gourmet Bites.
   - 3D perspective tilt hover effects on menu item cards.
   - Prices, descriptions, and signature badges.
4. **Interactive Gallery**:
   - Responsive 4-column photo grid with 3D depth push animations (`translateZ` / scale).
   - Modal Lightbox with keyboard arrow navigation, counter, and touch support.
5. **Table Reservations & Backend Persistence**:
   - FastAPI REST API storing table bookings in database (SQLite/PostgreSQL).
   - One-tap WhatsApp and Email confirmation dispatch links.
6. **Nightlife & Events Schedule**:
   - Golden Hour Sundowners, Friday Live Acoustic, and Saturday Bollywood DJ events.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Bundler & Tooling**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI (Python 3.13)
- **Validation & Schemas**: Pydantic v2 & `pydantic-settings`
- **Database ORM**: SQLAlchemy 2.0 (SQLite by default, PostgreSQL ready)
- **Server**: Uvicorn
- **Testing**: Pytest & HTTPX TestClient

---

## 📁 Project Architecture

```
restorent/
├── Molecule Air Bar, Lucknow.html    # Original reference website
├── README.md                         # Documentation
├── pytest.ini                        # Pytest configuration
├── backend/                          # FastAPI REST Application
│   ├── requirements.txt              # Python dependencies
│   ├── tests/                        # Automated API test suite
│   │   └── test_api.py
│   └── app/
│       ├── main.py                   # App entrypoint, CORS, lifespan
│       ├── core/
│       │   └── config.py             # Settings, database URL, CORS
│       ├── db/
│       │   ├── base.py               # SQLAlchemy Declarative Base
│       │   ├── session.py            # Engine and SessionLocal
│       │   └── seed.py               # Initial seed data for menu, events, reviews
│       ├── models/                   # SQLAlchemy Models
│       │   ├── reservation.py
│       │   ├── menu.py
│       │   ├── event.py
│       │   └── review.py
│       ├── schemas/                  # Pydantic Schemas
│       ├── repositories/             # Database Query Layer
│       ├── services/                 # Business Logic Layer
│       └── api/v1/                   # REST Endpoints
│           ├── reservations.py
│           ├── menu.py
│           ├── events.py
│           ├── reviews.py
│           └── health.py
└── frontend/                         # React + Vite Application
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    └── src/
        ├── three/                    # 3D Molecule Scene & Model
        │   ├── MoleculeScene.tsx
        │   └── MoleculeModel.tsx
        ├── components/               # Reusable UI (Navbar, Footer, Lightbox, etc.)
        ├── sections/                 # Home sections (Hero, FeaturedMenu, Reviews)
        ├── pages/                    # Route pages (Home, Menu, Gallery, Events, Contact)
        ├── services/                 # API client
        ├── types/                    # TypeScript interfaces
        └── styles/                   # Design tokens & Tailwind CSS
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18+ (tested on v22.19.0)
- **Python**: 3.10+ (tested on Python 3.13.0)

---

### Backend Setup & Run

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the automated tests:
   ```bash
   python -m pytest tests/ -v
   ```

4. Start the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   - API Root: `http://127.0.0.1:8000/`
   - Interactive Swagger Docs: `http://127.0.0.1:8000/api/v1/docs`
   - Alternative ReDoc: `http://127.0.0.1:8000/api/v1/redoc`

---

### Frontend Setup & Run

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/health` | Service health status check |
| `GET` | `/api/v1/menu/` | List all menu items (optional `?category=`) |
| `GET` | `/api/v1/menu/grouped` | Menu items grouped by category |
| `GET` | `/api/v1/menu/categories` | Distinct categories list |
| `POST` | `/api/v1/reservations/` | Create a new table reservation |
| `GET` | `/api/v1/reservations/` | List reservations |
| `GET` | `/api/v1/reservations/availability` | Check available time slots |
| `GET` | `/api/v1/events/` | List active nightlife events and offers |
| `GET` | `/api/v1/reviews/` | Guest testimonials |
| `POST` | `/api/v1/reviews/` | Submit a guest review |
