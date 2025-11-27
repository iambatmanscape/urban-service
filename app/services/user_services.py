from db.schemas.customer_schema import Customer, CustomerSchema
from utils.hashing import verify_password

async def create_customer(data: CustomerSchema) -> Customer:
    try:
        customer = Customer(**data.model_dump())
        await customer.insert()
        return customer
    except Exception as e:
        raise ValueError(f"Error creating customer: {e}")
    
async def get_customer_by_email(email: str) -> Customer:
    customer = await Customer.find_one(Customer.email == email)
    if not customer:
        raise ValueError("CUSTOMER_NOT_FOUND")
    return customer

async def customer_login_by_email(email: str, password: str) -> Customer:
    customer = await Customer.find_one(Customer.email == email)
    if customer:
        if verify_password(password, customer.password):
            return customer
        else:
            raise ValueError("INCORRECT_PASSWORD")
    else:
        raise ValueError("CUSTOMER_NOT_FOUND")
    
    
async def update_customer_by_email(email: str, update_data: dict) -> Customer:
    customer = await Customer.find_one(Customer.email == email)
    if not customer:
        raise ValueError("CUSTOMER_NOT_FOUND")
    for key, value in update_data.items():
        setattr(customer, key, value)
    await customer.save()
    return customer


async def delete_customer_by_email(email: str) -> None:
    customer = await Customer.find_one(Customer.email == email)
    if not customer:
        raise ValueError("CUSTOMER_NOT_FOUND")
    await customer.delete()