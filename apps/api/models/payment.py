from datetime import datetime, timezone
from typing import Optional
from sqlmodel import SQLModel, Field


class ConsultationPayment(SQLModel, table=True):
    __tablename__ = "consultation_payments"

    id: Optional[int] = Field(default=None, primary_key=True)
    consultation_request_id: int = Field(foreign_key="consultation_requests.id")
    stripe_session_id: str = Field(unique=True, index=True)
    stripe_payment_intent_id: Optional[str] = None
    amount_cents: int = 35000  # $350.00
    currency: str = "usd"
    status: str = "pending"   # "pending" | "paid" | "refunded"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    paid_at: Optional[datetime] = None


class WebhookEvent(SQLModel, table=True):
    __tablename__ = "webhook_events"

    id: Optional[int] = Field(default=None, primary_key=True)
    stripe_event_id: str = Field(unique=True, index=True)
    event_type: str
    payload: str  # raw JSON string
    processed: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
