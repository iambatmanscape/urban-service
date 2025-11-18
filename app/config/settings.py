from os import getenv
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

class Settings:
    PROJECT_NAME: str = "Urban Services"
    MONGODB_URI: str = getenv("MONGODB_URI","mongodb://localhost:27017")
    DATABASE_NAME: str = "urban_services_db"
    