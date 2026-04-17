from datetime import datetime, timezone
from typing import Optional
from sqlmodel import SQLModel, Field


class ConsultationRequest(SQLModel, table=True):
    __tablename__ = "consultation_requests"

    id: Optional[int] = Field(default=None, primary_key=True)
    full_name: str
    email: str
    phone: Optional[str] = None
    company_name: Optional[str] = None
    practice_area: str
    matter_description: str
    preferred_contact: str
    consultation_type: str = "free"  # "free" | "paid"
    status: str = "pending"          # "pending" | "confirmed" | "paid" | "cancelled"
    ip_address: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
