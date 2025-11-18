from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from beanie import Document, before_event
from datetime import datetime, timezone
import uuid

class AvailSlot(BaseModel):
    weekday: int
    start_min: int
    end_min: int


class ServiceDetails(BaseModel):
    type_of_service: str = Field(..., description="Type of service provided", index=True)
    service_fee: float = Field(..., description="Service fee charged by the provider per hour")
    availability: list[AvailSlot] = Field(default_factory=list)
    active: Optional[bool] = Field(True, description="Indicates if the service is currently active")\
        
class ReviewDetails(BaseModel):
    customer_id: str = Field(..., description="ID of the customer who gave the review")
    rating: int = Field(..., description="Rating given by the customer")
    comment: Optional[str] = Field(None, description="Optional comment provided by the customer")
    date: datetime = Field(default_factory=datetime.now(timezone.utc), description="Date when the review was given")


class Provider(Document):
    name: str = Field(..., description="Full name of the provider")
    email: EmailStr = Field(..., description="Email address of the provider", index=True)
    provider_id: str = Field(..., description="Unique identifier for the provider", index=True)
    services: list[ServiceDetails] = Field(..., description="Details of services provided")
    phone_number: Optional[str] = Field(None, description="Phone number of the provider")
    service_area: Optional[str] = Field(None, description="Service area of the provider")
    active: Optional[bool] = Field(True, description="Indicates if the provider is currently active")
    
    
    @staticmethod
    def generate_user_id(name: str, email: str) -> str:
        unique_suffix = uuid.uuid4().hex[:8]
        return f"{name.lower().replace(' ', '_')}_{email.split('@')[0].lower()}_{unique_suffix}"
    
    @before_event("insert")
    def set_provider_id(self):
        self.provider_id = self.generate_user_id(self.name, self.email)

    class Settings:
        name = "providers"

    class Config:
        schema_extra = {
            "provider_id": "jane_smith_janesmith_1a2b3c4d",
            "name": "Jane Smith",
            "email": "janesmith@example.com",
            "services": [
                {   
               "type_of_service": "Plumbing",
               "service_fee": 50.0,
               "avaibility": "Mon-Fri 9am-5pm"
                }
            ],
            "phone_number": "+0987654321",
            "service_area": "Downtown"
        }