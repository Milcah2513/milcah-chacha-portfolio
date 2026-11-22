
from fastapi import APIRouter, HTTPException

from ..database import supabase


router = APIRouter(
    prefix="/api/portfolio",
    tags=["Portfolio"]
)


@router.get("/")
def get_portfolio():
    """
    Retrieve the profile, education, skills, hobbies and movies
    belonging to the portfolio owner.
    """

    try:
        # Retrieve the portfolio profile
        profile_response = (
            supabase.table("profiles")
            .select("*")
            .limit(1)
            .execute()
        )

        if not profile_response.data:
            return {
                "message": "No portfolio profile has been added yet.",
                "profile": None,
                "education": [],
                "skills": [],
                "hobbies": [],
                "movies": []
            }

        profile = profile_response.data[0]
        profile_id = profile["id"]

        # Retrieve education records
        education_response = (
            supabase.table("education")
            .select("*")
            .eq("profile_id", profile_id)
            .order("start_year")
            .execute()
        )

        # Retrieve skills
        skills_response = (
            supabase.table("skills")
            .select("*")
            .eq("profile_id", profile_id)
            .order("sort_order")
            .execute()
        )

        # Retrieve hobbies
        hobbies_response = (
            supabase.table("hobbies")
            .select("*")
            .eq("profile_id", profile_id)
            .order("sort_order")
            .execute()
        )

        # Retrieve movies
        movies_response = (
            supabase.table("movies")
            .select("*")
            .eq("profile_id", profile_id)
            .order("ranking")
            .execute()
        )

        return {
            "profile": profile,
            "education": education_response.data,
            "skills": skills_response.data,
            "hobbies": hobbies_response.data,
            "movies": movies_response.data
        }

    except Exception as exc:
        # Print the actual error in the PyCharm terminal
        print("\n========== PORTFOLIO API ERROR ==========")
        print(repr(exc))
        print("=========================================\n")

        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve portfolio information."
        )
