# app/main.py
from fastapi import FastAPI
from .routes import auth_routes

app = FastAPI(title="CUET News Portal API")

app.include_router(auth_routes.router)

@app.get("/")
def home():
    return {"message": "CUET News Portal API is running 🚀"}
