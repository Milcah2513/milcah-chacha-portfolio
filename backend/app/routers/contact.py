
from fastapi import APIRouter, HTTPException, status

from ..database import supabase
from ..schemas.contact import ContactMessage

router = APIRouter(
    prefix="/api/contact",
    tags=["Contact"]
)


@router.post("/", status_code=status.HTTP_201_CREATED)
def submit_contact_message(contact: ContactMessage):

    try:
        # Find the portfolio owner
        profile_response = (
            supabase.table("profiles")
            .select("id")
            .limit(1)
            .execute()
        )

        if not profile_response.data:
            raise HTTPException(
                status_code=503,
                detail="The portfolio contact service is not configured yet."
            )

        profile_id = profile_response.data[0]["id"]

        # Save the visitor's message
        message_data = {
            "profile_id": profile_id,
            "sender_name": contact.sender_name,
            "sender_email": str(contact.sender_email),
            "message": contact.message
        }

        response = (
            supabase.table("enquiries")
            .insert(message_data)
            .execute()
        )

        if not response.data:
            raise HTTPException(
                status_code=500,
                detail="The message could not be saved."
            )

        return {
            "success": True,
            "message": "Thank you! Your message has been received."
        }

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Unable to submit your message. Please try again later."
        )
