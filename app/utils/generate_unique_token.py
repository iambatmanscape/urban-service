import uuid

def generate_unique_token():
    """
    Generate a unique token using UUID4.

    Returns:
        str: A unique token as a string.
    """
    return str(uuid.uuid4())