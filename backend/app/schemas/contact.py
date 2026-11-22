
from pydantic import BaseModel, EmailStr, Field, ConfigDict


class ContactMessage(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    sender_name: str = Field(
        min_length=2,
        max_length=150
    )

    sender_email: EmailStr

    message: str = Field(
        min_length=10,
        max_length=5000
    )
