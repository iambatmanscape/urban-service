import jwt
from datetime import datetime, timedelta, timezone
from os import getenv

def create_jwt(payload, token_type='access', expires_in_minutes=60):
    """
    Create a JWT token with the given payload and expiration time.
    
    :param payload: Dictionary containing the payload data.
    :param expires_in_minutes: Expiration time in minutes.
    :return: Encoded JWT token as a string.
    """
    secret_key = getenv('JWT_SECRET_KEY', 'default_secret_key')
    expiration = datetime.now(timezone.utc) + timedelta(minutes=expires_in_minutes)
    token_payload = {**payload, "exp": expiration, "type": token_type}
    
    token = jwt.encode(token_payload, secret_key ,algorithm='HS256')
    return token

def verify_token(token):
    """
    Verify a JWT token and return the decoded payload.
    
    :param token: Encoded JWT token as a string.
    :return: Decoded payload as a dictionary.
    :raises jwt.ExpiredSignatureError: If the token has expired.
    :raises jwt.InvalidTokenError: If the token is invalid.
    """
    secret_key = getenv('JWT_SECRET_KEY', 'default_secret_key')
    
    try:
        decoded_payload = jwt.decode(token, secret_key, algorithms=['HS256'])
        return decoded_payload
    except jwt.ExpiredSignatureError:
        raise jwt.ExpiredSignatureError("The token has expired.")
    except jwt.InvalidTokenError:
        raise jwt.InvalidTokenError("The token is invalid.")