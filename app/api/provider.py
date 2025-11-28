from fastapi import APIRouter, HTTPException, Response
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.params import Body
from typing import Optional
from starlette.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from services.provider_services import get_provider_by_email, search_providers


router = APIRouter()

@router.get("/provider/me", response_class=JSONResponse)
async def get_current_provider(request):
    """
    Retrieve the currently authenticated provider based on the JWT token.
    """
    user_info = request.state.user
    email = user_info.get("email")
    provider = await get_provider_by_email(email)
    if not provider:
        raise HTTPException(status_code=HTTP_400_BAD_REQUEST, detail="PROVIDER_NOT_FOUND")
    provider_data = jsonable_encoder(provider)
    provider_data.pop("password", None)
    return JSONResponse(status_code=HTTP_200_OK, content=provider_data)


@router.get("/providers/search", response_class=JSONResponse)
async def search_for_providers(
    type_of_service: Optional[str] = None,
    service_area: Optional[str] = None,
    weekday: Optional[int] = None,
    max_fee: Optional[float] = None,
    min_rating: Optional[float] = None,
):
    """
    Search for providers based on various criteria.
    """
    providers = await search_providers(
        type_of_service=type_of_service,
        service_area=service_area,
        weekday=weekday,
        max_fee=max_fee,
        min_rating=min_rating,
    )
    providers_data = []
    for provider in providers:
        provider_dict = provider.model_dump()
        providers_data.append({
            "name": provider_dict.get("name"),
            "email": provider_dict.get("email"),
            "phone_number": provider_dict.get("phone_number"),
            "service_area": provider_dict.get("service_area"),
            "services": provider_dict.get("services"),
            "ratings": provider_dict.get("ratings"),
        })
    return JSONResponse(status_code=HTTP_200_OK, content=providers_data)