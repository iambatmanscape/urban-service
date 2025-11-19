from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import JSONResponse
from services.provider_services import get_provider_by_email
from services.user_services import get_customer_by_email
from utils.jwt_handling import create_jwt

router = APIRouter()

@router.post("/login/provider")
async def login_provider(email: str, password: str, response: Response):
    try:
        provider = await get_provider_by_email(email, password)
        payload = {
            "provider_id": str(provider.id),
            "name": provider.name,
            "email": provider.email
        }
        token = create_jwt(payload)
        response.set_cookie(key="access_token", value=token, httponly=True)
        response.set_cookie(key="provider", value=str(payload))
        return JSONResponse(content={"message": "Login successful", "provider_id": str(provider.id)})
    except ValueError as ve:
        if str(ve) == "PROVIDER_NOT_FOUND":
            raise HTTPException(status_code=404, detail="Provider not found")
        elif str(ve) == "INCORRECT_PASSWORD":
            raise HTTPException(status_code=401, detail="Incorrect password")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    
@router.post("/login/customer")
async def login_customer(email: str, password: str, response: Response):
    try:
        customer = await get_customer_by_email(email, password)
        payload = {
            "customer_id": str(customer.id),
            "name": customer.name,
            "email": customer.email
        }
        token = create_jwt(payload)
        response.set_cookie(key="access_token", value=token, httponly=True)
        response.set_cookie(key="customer", value=str(payload))
        return JSONResponse(content={"message": "Login successful", "customer_id": str(customer.id)})
    except ValueError as ve:
        if str(ve) == "CUSTOMER_NOT_FOUND":
            raise HTTPException(status_code=404, detail="Customer not found")
        elif str(ve) == "INCORRECT_PASSWORD":
            raise HTTPException(status_code=401, detail="Incorrect password")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

