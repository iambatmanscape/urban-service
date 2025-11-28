import inspect
from typing import Optional
from fastapi import Request, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from utils.jwt_handling import verify_token

class AuthorizationMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        auth_header = request.cookies.get("access_token")
        if not auth_header:
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": "Access token missing"},
            )

        payload = await self._get_payload_from_header(auth_header)
        if not payload:
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": "Invalid or expired token"},
            )

        
        request.state.user = payload

        response = await call_next(request)
        return response

    async def _get_payload_from_header(self, token: str) -> Optional[dict]:
        """
        Returns the token payload dict on success, or None on failure.
        Handles both sync and async verify_token implementations.
        """
        try:
            result = verify_token(token)
            if inspect.isawaitable(result):
                result = await result

            return result
        except Exception:
            return None