from typing import Optional
from pydantic import Field
from beanie import Document
from datetime import datetime, timezone


class Review(Document):
    customer_id: str = Field(..., description="ID of the customer who gave the review", index=True)
    provider_id: str = Field(..., description="ID of the provider being reviewed", index=True)
    rating: int = Field(..., gt=0, lt=6, description="Rating given by the customer")
    comment: Optional[str] = Field(None, description="Optional comment provided by the customer")
    date: datetime = Field(default_factory=datetime.now(timezone.utc), description="Date when the review was given")
    
    class Settings:
        name = "reviews"
        
    class Config:
        schema_extra = {
            "customer_id": "john_doe_johndoe_1a2b3c4d",
            "provider_id": "jane_smith_janesmith_1a2b3c4d",
            "rating": 5,
            "comment": "Excellent service!",
            "date": "2024-01-15T10:00:00Z"
        }
    