from fastapi import FastAPI
from fastapi.responses import JSONResponse
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
from api import api_router
import uvicorn

app = FastAPI()


@app.get('/')
async def home():
    return JSONResponse(content={
        "status": "Active",
        "name": "Urban Services backend running..."
    }, status_code=200)
    
app.include_router(api_router)


if __name__ == "__main__":
    uvicorn.run(app=app,host="0.0.0.0",port=8000)
