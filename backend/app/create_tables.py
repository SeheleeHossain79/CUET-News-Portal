# from .database import Base, engine
# from .models import User, News, Category, Comment

# Base.metadata.create_all(bind=engine)
# print("✅ All tables created successfully!")

from .database import Base, engine
from .models import User, News, Category, Comment

Base.metadata.create_all(bind=engine)
print("✅ All tables created successfully!")
