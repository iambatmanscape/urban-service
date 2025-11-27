# settings.py
from typing import Optional
from pydantic import SecretStr, Field
from pydantic_settings import BaseSettings
import logging
from redis import Redis
logger = logging.getLogger(__name__)


class Settings(BaseSettings):
    PROJECT_NAME: str = "Urban Services"


    MONGODB_URI: str = None
    DATABASE_NAME: str = "urban_services_db"

    
    MAILER_SEND_DOMAIN: str = Field("your-mailersend-domain")
    MAILERSEND_API_KEY: Optional[SecretStr] = None

    
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    REDIS_DB: int = 0
    REDIS_PASSWORD: Optional[SecretStr] = None

    
    EMAIL_VERIFICATION_EXPIRY_SECONDS: int = 3600
    BACKEND_URL: str = Field("http://localhost:8000")

    class Config:
        
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"

    
    @property
    def redis_client(self) -> Redis:
        
        if not hasattr(self, "_redis_client"):
            password = (
                None if self.REDIS_PASSWORD is None else self.REDIS_PASSWORD.get_secret_value()
            )
            self._redis_client = Redis(
                host=self.REDIS_HOST,
                port=self.REDIS_PORT,
                db=self.REDIS_DB,
                username="default",
                password=password,
                decode_responses=True,
            )
            self._redis_client.ping()

        return self._redis_client



settings = Settings()
