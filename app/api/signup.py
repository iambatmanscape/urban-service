from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from services.provider_services import create_provider
from services.user_services import create_customer
from db.schemas.provider_schema import ProviderSchema
from db.schemas.customer_schema import CustomerSchema
from utils.sendEmail import send_verification_email
from utils.generate_unique_token import generate_unique_token
from config import settings

redis_client = settings.REDIS_CLIENT

router = APIRouter()

@router.post("/signup/provider")
async def signup_provider(provider: ProviderSchema):
    try:
        new_provider = await create_provider(provider)
        unique_token = generate_unique_token()
        redis_client.setex(f"provider_verification:{new_provider.email}", settings.EMAIL_VERIFICATION_EXPIRY_SECONDS, unique_token)
        verification_link = f"{settings.BACKEND_URL}/api/signup/verify-email?token={unique_token}&source=provider&email={new_provider.email}"
        await send_verification_email(new_provider.email, verification_link)
        return JSONResponse(status_code=201, content={"message": "Provider account created. Please verify your email."})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/signup/customer")
async def signup_customer(customer: CustomerSchema):
    try:
        new_customer = await create_customer(customer)
        unique_token = generate_unique_token()
        redis_client.setex(f"customer_verification:{new_customer.email}", settings.EMAIL_VERIFICATION_EXPIRY_SECONDS, unique_token)
        verification_link = f"{settings.BACKEND_URL}/api/signup/verify-email?token={unique_token}&source=customer&email={new_customer.email}"
        await send_verification_email(new_customer.email, verification_link)
        return JSONResponse(status_code=201, content={"message": "Customer account created. Please verify your email."})
    except Exception as e:
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
            return JSONResponse(status_code=200, content={"message": "Email verified successfully."})
        else:
            raise HTTPException(status_code=400, detail="Invalid or expired token.")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

