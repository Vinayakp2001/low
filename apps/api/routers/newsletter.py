from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_session
from schemas.newsletter import NewsletterRequest, NewsletterResponse
from services.newsletter_service import subscribe
from utils.honeypot import check_honeypot
from utils.rate_limit import limiter

router = APIRouter()


@router.post("/newsletter/subscribe", response_model=NewsletterResponse)
@limiter.limit("5/10minutes")
async def newsletter_subscribe(
    request: Request,
    data: NewsletterRequest,
    session: AsyncSession = Depends(get_session),
) -> NewsletterResponse:
    check_honeypot(data.honeypot)
    ip = request.client.host if request.client else "unknown"
    await subscribe(data, ip, session)
    return NewsletterResponse(success=True, message="You've been subscribed successfully.")
