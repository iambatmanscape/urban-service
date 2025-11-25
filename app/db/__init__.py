from beanie import init_beanie
from config import settings
from motor.motor_asyncio import AsyncIOMotorClient
from .schemas.customer_schema import Customer
from .schemas.provider_schema import Provider
from .schemas.review_schema import Review


async def init_db():
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    database = client.urban_services_db
    await init_beanie(database=database, document_models=[Customer, Provider, Review])


__all__ = [init_db]