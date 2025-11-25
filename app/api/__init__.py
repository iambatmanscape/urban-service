from fastapi import APIRouter
from .signup import router as signup_router
from .login import router as login_router

api_router = APIRouter()

api_router.include_router(signup_router, prefix="/api", tags=["signup"])
api_router.include_router(login_router, prefix="/api", tags=["login"])

__all__ = [api_router]

