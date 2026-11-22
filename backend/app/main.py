
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import FRONTEND_ORIGIN
from .routers.portfolio import router as portfolio_router
from .routers.contact import router as contact_router


app = FastAPI(
    title="Milcah Chacha Portfolio API",
    description="Backend API for Milcah Chacha's personal portfolio",
    version="1.0.0"
)


# ==========================================
# CORS CONFIGURATION
# ==========================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        FRONTEND_ORIGIN,
        "http://localhost:5500",
        "http://127.0.0.1:5500",
    ],

    # Allow local development addresses
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$",

    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# API ROUTERS
# ==========================================

app.include_router(portfolio_router)
app.include_router(contact_router)


# ==========================================
# ROOT ENDPOINT
# ==========================================

@app.get("/")
def home():
    return {
        "message": "Milcah Chacha Portfolio API is running",
        "status": "online",
        "version": "1.0.0"
    }


# ==========================================
# HEALTH CHECK
# ==========================================

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "application": "Milcah Chacha Portfolio API"
    }


# ==========================================
# API INFORMATION
# ==========================================

@app.get("/api")
def api_information():
    return {
        "name": "Milcah Chacha Portfolio API",
        "version": "1.0.0",
        "available_modules": [
            "Portfolio",
            "Contact"
        ],
        "documentation": "/docs"
    }
