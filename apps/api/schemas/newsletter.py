from pydantic import BaseModel, EmailStr


class NewsletterRequest(BaseModel):
    email: EmailStr
    honeypot: str = ""


class NewsletterResponse(BaseModel):
    success: bool
    message: str
