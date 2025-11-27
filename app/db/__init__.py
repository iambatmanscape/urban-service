from beanie import init_beanie
from config import settings
from motor.motor_asyncio import AsyncIOMotorClient
from .schemas.customer_schema import Customer
from .schemas.provider_schema import Provider
from .schemas.review_schema import Review
import logging
logger = logging.getLogger(__name__)

async def init_db():
    logger.info("Initializing database connection...")
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    database = client[settings.DATABASE_NAME]
    await database.command("ping")
    logger.info("Connected to MongoDB successfully.")
    await init_beanie(database=database, document_models=[Customer, Provider, Review])


__all__ = [init_db]