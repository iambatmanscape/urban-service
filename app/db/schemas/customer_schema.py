from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from beanie import Document, before_event, Insert
from utils.hashing import hash_password
import uuid

class CustomerSchema(BaseModel):
    name: str = Field(..., description="Full name of the customer")
    email: EmailStr = Field(..., description="Email address of the customer", index=True)
    phone_number: Optional[str] = Field(None, description="Phone number of the customer")
    password: str = Field(..., description="Password of the customer")
    address: Optional[str] = Field(None, description="Physical address of the customer")



class Customer(Document):
    user_id: Optional[str] = Field(default=None, description="Unique identifier for the customer")
    name: str = Field(..., description="Full name of the customer")
    email: EmailStr = Field(..., description="Email address of the customer", index=True)
    password: str = Field(..., description="Hashed password of the customer")
    phone_number: Optional[str] = Field(None, description="Phone number of the customer")
    address: Optional[str] = Field(None, description="Physical address of the customer")
    email_verified: bool = Field(default=False, description="Indicates if the customer's email is verified")
    
    @before_event(Insert)
    def set_user_id(self):
        self.user_id = self.generate_user_id(self.name, self.email)
        
    @before_event(Insert)
    def hash_user_password(self):
        self.password = hash_password(self.password)
    

    class Settings:
        name = "customers"

    class Config:
        json_schema_extra = {
            "customer_id": "john_doe_johndoe_1a2b3c4d",
            "name": "John Doe",
            "email": "johndoe@example.com",
            "phone_number": "+1234567890",
            "address": "123 Main St, Anytown, USA"
        }

    @staticmethod
    def generate_user_id(name: str, email: str) -> str:
        unique_suffix = uuid.uuid4().hex[:8]
        return f"{name.lower().replace(' ', '_')}_{email.split('@')[0].lower()}_{unique_suffix}"

