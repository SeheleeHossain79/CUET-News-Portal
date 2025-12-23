from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

# Input for user registration
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str #= Field(..., max_length=72)
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

class PostCreate(BaseModel):
    title: str
    content: str

class PostOut(BaseModel):
    id: int
    title: str
    content: str
    summary: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True    