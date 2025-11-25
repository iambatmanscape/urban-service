from os import getenv
from redis import Redis

class Settings:
    PROJECT_NAME: str = "Urban Services"
    MONGODB_URI: str = getenv("MONGODB_URI","mongodb://localhost:27017")
    DATABASE_NAME: str = "urban_services_db"
    MAILER_SEND_DOMAIN: str = getenv("EMAIL_DOMAIN","your-mailersend-domain")
    MAILER_SEND_API_KEY: str = getenv("MAILER_SEND_API_KEY","your-mailersend-api-key")
    REDIS_HOST: str = getenv("REDIS_HOST","localhost")
    REDIS_PORT: int = int(getenv("REDIS_PORT","6379"))
    REDIS_DB: int = int(getenv("REDIS_DB","0"))
    REDIS_PASSWORD: str = getenv("REDIS_PASSWORD","")
    REDIS_CLIENT: Redis = Redis(
        host=REDIS_HOST,
        port=REDIS_PORT,
        db=REDIS_DB,
        password=REDIS_PASSWORD,
        decode_responses=True
    )
    EMAIL_VERIFICATION_EXPIRY_SECONDS: int = 3600
    BACKEND_URL: str = getenv("BACKEND_URL","http://localhost:8000")