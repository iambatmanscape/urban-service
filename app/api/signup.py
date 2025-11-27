from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from services.provider_services import create_provider, update_provider_by_email
from services.user_services import create_customer, update_customer_by_email
from db.schemas.provider_schema import ProviderSchema
from db.schemas.customer_schema import CustomerSchema
from utils.sendEmail import send_verification_email
from utils.generate_unique_token import generate_unique_token
from config import settings
import logging
logger = logging.getLogger(__name__)

redis_client = settings.redis_client

router = APIRouter()

@router.post("/signup/provider")
async def signup_provider(provider: ProviderSchema):
    try:
        new_provider = await create_provider(provider)
        unique_token = generate_unique_token()
        redis_client.setex(f"provider_verification:{new_provider.email}", settings.EMAIL_VERIFICATION_EXPIRY_SECONDS, unique_token)
        verification_link = f"{settings.BACKEND_URL}/api/signup/verify-email?token={unique_token}&source=provider&email={new_provider.email}"
        send_verification_email(new_provider.email, new_provider.name, verification_link)
        return JSONResponse(status_code=201, content={"message": "Provider account created. Please verify your email."})
    except Exception as e:
        logger.error(f"Error during provider signup: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/signup/customer")
async def signup_customer(customer: CustomerSchema):
    try:
        new_customer = await create_customer(customer)
        unique_token = generate_unique_token()
        redis_client.setex(f"customer_verification:{new_customer.email}", settings.EMAIL_VERIFICATION_EXPIRY_SECONDS, unique_token)
        verification_link = f"{settings.BACKEND_URL}/api/signup/verify-email?token={unique_token}&source=customer&email={new_customer.email}"
        send_verification_email(new_customer.email, new_customer.name, verification_link)
        return JSONResponse(status_code=201, content={"message": "Customer account created. Please verify your email."})
    except Exception as e:
        logger.error(f"Error during customer signup: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    

@router.get("/signup/verify-email")
async def verify_email(token: str, source: str, email: str):
    try:
        if source not in ["provider", "customer"]:
            raise HTTPException(status_code=400, detail="Invalid source parameter.")
        stored_token = redis_client.get(f"{source}_verification:{email}")
        if not stored_token:
            raise HTTPException(status_code=400, detail="Verification token expired or not found.")
        verified = stored_token == token
        if verified:
            if source == "provider":
                await update_provider_by_email(email, {"email_verified": True})
            else:
                await update_customer_by_email(email, {"email_verified": True})
            return JSONResponse(status_code=200, content={"message": "Email verified successfully."})
        else:
            raise HTTPException(status_code=400, detail="Invalid or expired token.")
    except Exception as e:
        logger.error(f"Error during email verification: {e}")
        raise HTTPException(status_code=400, detail=str(e))

