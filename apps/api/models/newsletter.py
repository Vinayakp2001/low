from datetime import datetime, timezone
from typing import Optional
from sqlmodel import SQLModel, Field


class NewsletterSignup(SQLModel, table=True):
    __tablename__ = "newsletter_signups"

    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    subscribed: bool = True
    ip_address: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
