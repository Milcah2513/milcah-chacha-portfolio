
import os
from pathlib import Path

from dotenv import load_dotenv

# Locate backend directory
BACKEND_DIR = Path(__file__).resolve().parents[1]

# Load backend/.env
ENV_FILE = BACKEND_DIR / ".env"
load_dotenv(ENV_FILE)

# Supabase credentials
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SECRET_KEY = os.getenv("SUPABASE_SECRET_KEY")

# Frontend configuration
FRONTEND_ORIGIN = os.getenv(
    "FRONTEND_ORIGIN",
    "http://localhost:5500"
)


def validate_settings():
    missing = []

    if not SUPABASE_URL:
        missing.append("SUPABASE_URL")

    if not SUPABASE_SECRET_KEY:
        missing.append("SUPABASE_SECRET_KEY")

    if missing:
        raise RuntimeError(
            "Missing environment variables: "
            + ", ".join(missing)
        )
