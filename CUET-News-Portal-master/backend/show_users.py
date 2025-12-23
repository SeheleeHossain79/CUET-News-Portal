# show_users.py
from app.database import SessionLocal
from app import models

def show_users(limit=20):
    db = SessionLocal()
    try:
        rows = db.query(models.User).order_by(models.User.id.desc()).limit(limit).all()
        if not rows:
            print("No users found.")
            return
        for u in rows:
            print(u.id, u.name, u.email, u.role)
    finally:
        db.close()

if __name__ == "__main__":
    show_users()
