from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas import UserCreate, UserLogin
from app.jwt_utils import create_access_token


router = APIRouter()

@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create user (without hashing password)
    new_user = User(
        name=user.name,
        email=user.email,
        password=user.password,   # <-- RAW PASSWORD
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "role": new_user.role
        }
    }


@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    # 1. Check if user exists
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    # 2. Check password directly
    if user.password != db_user.password:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    # 3. Create JWT token
    access_token = create_access_token(data={"sub": db_user.email, "role": db_user.role})
    
    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer"
    }

# -------------------------------
# JWT configuration
# -------------------------------
# SECRET_KEY = "your_super_secret_key_here"  # Change to a secure random value
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 60

# # -------------------------------
# # Password hashing
# # -------------------------------
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# #pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# def get_password_hash(password: str) :  #-> str
#     # """
#     # Hashes a password using bcrypt.
#     # Truncates to 72 bytes as bcrypt limitation.
#     # """
#     # password_bytes = password.encode("utf-8")[:72]  # truncate after encoding to bytes
#     if isinstance(password, str):
#         password = password.encode("utf-8")[:72]
#     return pwd_context.hash(password)


# def verify_password(plain_password: str, hashed_password: str) : #-> bool
#     # """
#     # Verifies a plain password against a hashed password.
#     # """
#     # plain_bytes = plain_password.encode("utf-8")[:72]  # truncate after encoding to bytes
#     plain_password = plain_password.encode("utf-8")[:72]
#     return pwd_context.verify(plain_password, hashed_password)


# # -------------------------------
# # JWT token creation
# # -------------------------------
# def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
#     """
#     Creates a JWT token with expiration.
#     """
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt

