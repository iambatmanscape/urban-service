from db.schemas.provider_schema import Provider, ProviderSchema
from utils.hashing import verify_password

async def create_provider(data: ProviderSchema) -> Provider:
    provider = Provider(**data.model_dump())
    await provider.insert()
    return provider

async def get_provider_by_email(email: str, password:str) -> Provider:
    provider = await Provider.find_one(Provider.email == email)
    if provider:
        if verify_password(password, provider.hashed_password):
            return provider
        else:
            raise ValueError("INCORRECT_PASSWORD")
    else:
        raise ValueError("PROVIDER_NOT_FOUND")