from sqlalchemy import Column, Integer, String
from database import Base

class Enquiry(Base):
    __tablename__ = "enquiries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100))
    company = Column(String(100))
    employees = Column(String(50))
    interest = Column(String(100))
    message = Column(String(500))
