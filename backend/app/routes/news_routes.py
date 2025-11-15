# new file: app/routes/news_routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import News, User
from app.schemas import PostCreate, PostOut
# (import current_user dependency if you protect the route)

router = APIRouter(tags=["News"], prefix="/news")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=PostOut, status_code=201)
def create_post(payload: PostCreate, db: Session = Depends(get_db)):
    new_post = News(
        title=payload.title,
        content=payload.content,
        summary=None  # you can call summarizer later
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post
