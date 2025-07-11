from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
from models import Base, Enquiry

Base.metadata.create_all(bind=engine)

app = FastAPI()

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
    company: str
    employees: str
    interest: str
    message: str

@app.post("/enquiry")
def create_enquiry(enquiry: EnquiryRequest, db: Session = Depends(get_db)):
    new_entry = Enquiry(**enquiry.dict())
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    return {"success": True, "data": enquiry}
