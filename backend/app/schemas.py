from pydantic import BaseModel, EmailStr
from typing import Optional

# Input for user registration
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Optional[str] = "student"

# Input for login
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Output for user info
class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    class Config:
        orm_mode = True

# JWT Token response
class Token(BaseModel):
    access_token: str
    token_type: str
