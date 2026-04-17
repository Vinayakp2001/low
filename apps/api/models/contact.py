from datetime import datetime, timezone
from typing import Optional
from sqlmodel import SQLModel, Field


class ContactInquiry(SQLModel, table=True):
    __tablename__ = "contact_inquiries"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    subject: str
    message: str
    ip_address: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
