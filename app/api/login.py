from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import JSONResponse
from fastapi.params import Body
from services.provider_services import provider_login_by_email
from services.user_services import customer_login_by_email
from utils.jwt_handling import create_jwt

router = APIRouter()

@router.post("/login/provider")
async def login_provider(email: str = Body(...), password: str = Body(...)):
    try:
        provider = await provider_login_by_email(email, password)
        payload = {
            "provider_id": str(provider.id),
            "name": provider.name,
            "email": provider.email
        }
        token = create_jwt(payload)
        resp = JSONResponse(content={"message": "Login successful", "provider_id": str(provider.id)})
        resp.set_cookie(key="access_token", value=token, httponly=True)
        resp.set_cookie(key="provider", value=str(payload))
        return resp
    except ValueError as ve:
        if str(ve) == "PROVIDER_NOT_FOUND":
            raise HTTPException(status_code=404, detail="Provider not found")
        elif str(ve) == "INCORRECT_PASSWORD":
            raise HTTPException(status_code=401, detail="Incorrect password")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    
@router.post("/login/customer")
async def login_customer(email: str = Body(...), password: str = Body(...)):
    try:
        customer = await customer_login_by_email(email, password)
        payload = {
            "customer_id": str(customer.id),
            "name": customer.name,
            "email": customer.email
        }
        token = create_jwt(payload)
        resp = JSONResponse(content={"message": "Login successful", "customer_id": str(customer.id)})
        resp.set_cookie("access_token", token, httponly=True, samesite="lax", max_age=3600)
        resp.set_cookie(key="customer", value=str(payload))
        return resp
    except ValueError as ve:
        if str(ve) == "CUSTOMER_NOT_FOUND":
            raise HTTPException(status_code=404, detail="Customer not found")
        elif str(ve) == "INCORRECT_PASSWORD":
            raise HTTPException(status_code=401, detail="Incorrect password")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

