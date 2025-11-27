from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv, find_dotenv
from db import init_db
load_dotenv(find_dotenv())
from api import api_router
import uvicorn
import logging
import os
logging.basicConfig(level=logging.INFO)

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    logging.info("Database initialized.")
    yield

app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
async def home():
    return JSONResponse(content={
        "status": "Active",
        "name": "Urban Services backend running..."
    }, status_code=200)
    
app.include_router(api_router)


if __name__ == "__main__":
    uvicorn.run(app=app,host="0.0.0.0",port=8000)
