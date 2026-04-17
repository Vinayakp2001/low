from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from sqlmodel import select
from fastapi import HTTPException

from models.newsletter import NewsletterSignup
from schemas.newsletter import NewsletterRequest


async def subscribe(data: NewsletterRequest, ip: str, session: AsyncSession) -> None:
    # Check if already subscribed
    result = await session.exec(
        select(NewsletterSignup).where(NewsletterSignup.email == data.email)
    )
    existing = result.first()

    if existing:
        if existing.subscribed:
            raise HTTPException(status_code=409, detail="This email is already subscribed.")
        else:
            # Re-subscribe
            existing.subscribed = True
            await session.commit()
            return

    signup = NewsletterSignup(email=data.email, ip_address=ip)
    session.add(signup)
    try:
        await session.commit()
    except IntegrityError:
        await session.rollback()
        raise HTTPException(status_code=409, detail="This email is already subscribed.")
