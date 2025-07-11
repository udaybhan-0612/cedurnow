from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
from models import Base, Enquiry

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic Schema
class EnquiryRequest(BaseModel):
    name: str
    email: str
    phone: str
    company: str
    employees: str
    message: str

@app.post("/enquiry")
def create_enquiry(enquiry: EnquiryRequest, db: Session = Depends(get_db)):
    new_entry = Enquiry(**enquiry.dict(exclude_unset=True)) 
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    return {"message": "Enquiry submitted successfully"}