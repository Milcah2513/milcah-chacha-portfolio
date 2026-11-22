
from supabase import Client, create_client

# Import configuration from the same app package
from .config import (
    SUPABASE_URL,
    SUPABASE_SECRET_KEY,
    validate_settings
)


def get_supabase_client() -> Client:
    """Create and return the Supabase client."""

    validate_settings()

    client = create_client(
        SUPABASE_URL,
        SUPABASE_SECRET_KEY
    )

    return client


# Shared Supabase client
supabase: Client = get_supabase_client()
