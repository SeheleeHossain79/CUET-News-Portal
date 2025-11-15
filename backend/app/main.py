# app/main.py
from fastapi import FastAPI
from app.routes import auth_routes,news_routes
# from app.routes import news_routes

app = FastAPI(title="CUET News Portal API")

app.include_router(auth_routes.router, prefix="/auth") #, prefix="/auth"
app.include_router(news_routes.router)

@app.get("/")
def home():
    return {"message": "CUET News Portal API is running 🚀"}


