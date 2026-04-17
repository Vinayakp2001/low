from typing import Optional
from pydantic import BaseModel, EmailStr


class ConsultationRequestSchema(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    company_name: Optional[str] = None
    practice_area: str
    matter_description: str
    preferred_contact: str
    honeypot: str = ""


class ConsultationResponse(BaseModel):
    success: bool
    message: str


class BookConsultationResponse(BaseModel):
    checkout_url: str
