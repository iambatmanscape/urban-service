from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.params import Body
from starlette.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from services.user_services import get_customer_by_email
import logging
logger = logging.getLogger(__name__)


router = APIRouter()


@router.get("/user/me", response_class=JSONResponse)
async def get_current_user(request: Request):
    """
    Retrieve the currently authenticated user (customer or provider) based on the JWT token.
    """
    user_info = request.state.user
    email = user_info.get("email")
    user = await get_customer_by_email(email)
    if not user:
        raise HTTPException(status_code=HTTP_400_BAD_REQUEST, detail="USER_NOT_FOUND")
    user_data = jsonable_encoder(user)
    user_data.pop("password", None)
    return JSONResponse(status_code=HTTP_200_OK, content=user_data)


