from fastapi import APIRouter, FastAPI
from .signup import router as signup_router
from .login import router as login_router
from .user import router as user_router
from .provider import router as provider_router
from middlewares.authorization import AuthorizationMiddleware

authenticated_routes = FastAPI()

authenticated_routes.add_middleware(AuthorizationMiddleware)

api_router = APIRouter()

api_router.include_router(signup_router, prefix="/api", tags=["signup"])
api_router.include_router(login_router, prefix="/api", tags=["login"])
authenticated_routes.include_router(user_router, prefix="/api", tags=["user"])
authenticated_routes.include_router(provider_router, prefix="/api", tags=["provider"])

__all__ = [api_router, authenticated_routes]

