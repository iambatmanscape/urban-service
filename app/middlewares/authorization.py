from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from utils.jwt_handling import verify_token

class AuthorizationMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not self.is_authorized(auth_header):
            raise HTTPException(status_code=403, detail="Unauthorized access")
        
        response = await call_next(request)
        return response

    def is_authorized(self, auth_header: str) -> bool:
        try:
            token_type, token = auth_header.split()
            if token_type.lower() != "bearer":
                return False
            
            payload = verify_token(token)
            return True, payload
        except Exception:
            return False