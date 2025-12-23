# app/main.py
from fastapi import FastAPI

from app.auth import router as auth_routes #newly added

from dotenv import load_dotenv #newly added
from app.auth import router as auth_router #newly added
import os #newly added

load_dotenv() #newly added

from app.database import Base, engine #newly added

from app.routes import news_routes
# from app.routes import news_routes

Base.metadata.create_all(bind=engine) #newly added

app = FastAPI(title="CUET News Portal API")

app.include_router(auth_router, prefix="/auth")
# app.include_router(auth_routes.router) #, prefix="/auth"
app.include_router(news_routes.router) #, prefix="/news"

@app.get("/")
def home():
    return {"message": "CUET News Portal API is running 🚀"}



