from typing import List, Optional
from db.schemas.provider_schema import Provider, ProviderSchema
from utils.hashing import verify_password

async def create_provider(data: ProviderSchema) -> Provider:
    try:
        provider = Provider(**data.model_dump())
        await provider.insert()
        return provider
    except Exception as e:
        raise ValueError(f"Error creating provider: {e}")

async def provider_login_by_email(email: str, password:str) -> Provider:
    provider = await Provider.find_one(Provider.email == email)
    if provider:
        if verify_password(password, provider.password):
            return provider
        else:
            raise ValueError("INCORRECT_PASSWORD")
    else:
        raise ValueError("PROVIDER_NOT_FOUND")
    
async def get_provider_by_email(email: str) -> Provider:
    provider = await Provider.find_one(Provider.email == email)
    if not provider:
        raise ValueError("PROVIDER_NOT_FOUND")
    return provider

async def update_provider_by_email(email: str, update_data: dict) -> Provider:
    provider = await Provider.find_one(Provider.email == email)
    if not provider:
        raise ValueError("PROVIDER_NOT_FOUND")
    for key, value in update_data.items():
        setattr(provider, key, value)
    await provider.save()
    return provider


async def delete_provider_by_email(email: str) -> None:
    provider = await Provider.find_one(Provider.email == email)
    if not provider:
        raise ValueError("PROVIDER_NOT_FOUND")
    await provider.delete()
    return provider



async def search_providers(
    type_of_service: Optional[str] = None,
    service_area: Optional[str] = None,
    weekday: Optional[int] = None,
    max_fee: Optional[float] = None,
    min_rating: Optional[float] = None,
) -> List[Provider]:

    query = {}

    query["active"] = True

    if service_area:
        query["service_area"] = service_area

    if type_of_service:
        query["services.type_of_service"] = type_of_service

    if min_rating:
        query["ratings"] = {"$gte": min_rating}

    service_filters = {}

    if max_fee is not None:
        service_filters["services.service_fee"] = {"$lte": max_fee}

    if weekday is not None:
        service_filters["services.availability.weekday"] = weekday

    if service_filters:
        query.update(service_filters)

    providers = await Provider.find(query).to_list()

    return providers


