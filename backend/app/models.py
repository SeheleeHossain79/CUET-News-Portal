# from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
# from sqlalchemy.orm import relationship
# from datetime import datetime
# from .database import Base

# class User(Base):
#     __tablename__ = "users"
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, nullable=False)
#     email = Column(String, unique=True, index=True, nullable=False)
#     password = Column(String, nullable=False)
#     role = Column(String, default="student")  # student / teacher / admin

#     news = relationship("News", back_populates="author")
#     comments = relationship("Comment", back_populates="user")


# class Category(Base):
#     __tablename__ = "categories"
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, unique=True, nullable=False)
#     news = relationship("News", back_populates="category")


# class News(Base):
#     __tablename__ = "news"
#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String, nullable=False)
#     content = Column(Text, nullable=False)
#     summary = Column(Text, nullable=True)
#     created_at = Column(DateTime, default=datetime.utcnow)
#     author_id = Column(Integer, ForeignKey("users.id"))
#     category_id = Column(Integer, ForeignKey("categories.id"))

#     author = relationship("User", back_populates="news")
#     category = relationship("Category", back_populates="news")
#     comments = relationship("Comment", back_populates="news")


# class Comment(Base):
#     __tablename__ = "comments"
#     id = Column(Integer, primary_key=True, index=True)
#     news_id = Column(Integer, ForeignKey("news.id"))
#     user_id = Column(Integer, ForeignKey("users.id"))
#     comment_text = Column(Text, nullable=False)
#     created_at = Column(DateTime, default=datetime.utcnow)

#     news = relationship("News", back_populates="comments")
#     user = relationship("User", back_populates="comments")

from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime,TIMESTAMP
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="student")  # student / teacher / admin
    # created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=Text('now()'))

    news = relationship("News", back_populates="author")
    comments = relationship("Comment", back_populates="user")


class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    news = relationship("News", back_populates="category")


class News(Base):
    __tablename__ = "news"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    summary = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    author_id = Column(Integer, ForeignKey("users.id"))
    category_id = Column(Integer, ForeignKey("categories.id"))

    author = relationship("User", back_populates="news")
    category = relationship("Category", back_populates="news")
    comments = relationship("Comment", back_populates="news")


class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True, index=True)
    news_id = Column(Integer, ForeignKey("news.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    comment_text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    news = relationship("News", back_populates="comments")
    user = relationship("User", back_populates="comments")
