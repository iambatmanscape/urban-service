from db.schemas.customer_schema import Customer, CustomerSchema
from utils.hashing import verify_password

async def create_customer(data: CustomerSchema) -> Customer:
    customer = Customer(**data.model_dump())
    await customer.insert()
    return customer

async def get_customer_by_email(email: str, password: str) -> Customer:
    customer = await Customer.find_one(Customer.email == email)
    if customer:
        if verify_password(password, customer.hashed_password):
            return customer
        else:
            raise ValueError("INCORRECT_PASSWORD")
    else:
        raise ValueError("CUSTOMER_NOT_FOUND")
