from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from beanie import Document, before_event, Insert
from datetime import datetime, timezone
from utils.hashing import hash_password
import uuid

class AvailSlot(BaseModel):
    weekday: int
    start_min: int
    end_min: int


class ServiceDetails(BaseModel):
    type_of_service: str = Field(..., description="Type of service provided", index=True)
    service_fee: float = Field(..., description="Service fee charged by the provider per hour")
    availability: list[AvailSlot] = Field(default_factory=list)
    active: Optional[bool] = Field(True, description="Indicates if the service is currently active")
    
    
class ProviderSchema(BaseModel):
    name: str = Field(..., description="Full name of the provider")
    email: EmailStr = Field(..., description="Email address of the provider", index=True)
    password: str = Field(..., description="Hashed password of the provider")
    phone_number: Optional[str] = Field(None, description="Phone number of the provider")
    service_area: Optional[str] = Field(None, description="Service area of the provider")
    services: list[ServiceDetails] = Field(..., description="Details of services provided")
    active: Optional[bool] = Field(True, description="Indicates if the provider is currently active")
    ratings: Optional[float] = Field(0.0, gt=0.0, lt=5.0, description="Average rating of the customer")


class Provider(Document):
    name: str = Field(..., description="Full name of the provider")
    email: EmailStr = Field(..., description="Email address of the provider", index=True)
    password: str = Field(..., description="Hashed password of the provider")
    provider_id: Optional[str] = Field(default=None, description="Unique identifier for the provider", index=True)
    services: list[ServiceDetails] = Field(..., description="Details of services provided")
    phone_number: Optional[str] = Field(None, description="Phone number of the provider")
    service_area: Optional[str] = Field(None, description="Service area of the provider")
    active: Optional[bool] = Field(True, description="Indicates if the provider is currently active")
    ratings: Optional[float] = Field(0.0, gt=0.0, lt=5.0, description="Average rating of the customer")
    email_verified: bool = Field(default=False, description="Indicates if the provider's email is verified")
    
    
    @staticmethod
    def generate_user_id(name: str, email: str) -> str:
        unique_suffix = uuid.uuid4().hex[:8]
        return f"{name.lower().replace(' ', '_')}_{email.split('@')[0].lower()}_{unique_suffix}"
    
    @before_event(Insert)
    def set_provider_id(self):
        self.provider_id = self.generate_user_id(self.name, self.email)
        
    @before_event(Insert)
    def hash_provider_password(self):
        self.password = hash_password(self.password)

    class Settings:
        name = "providers"

    class Config:
        json_schema_extra = {
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