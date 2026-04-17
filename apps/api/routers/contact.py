from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_session
from schemas.contact import ContactRequest, ContactResponse
from services.contact_service import save_and_notify
from utils.honeypot import check_honeypot
from utils.rate_limit import limiter

router = APIRouter()


@router.post("/contact", response_model=ContactResponse)
@limiter.limit("5/10minutes")
async def contact(
    request: Request,
    data: ContactRequest,
    session: AsyncSession = Depends(get_session),
) -> ContactResponse:
    check_honeypot(data.honeypot)
    ip = request.client.host if request.client else "unknown"
    await save_and_notify(data, ip, session)
    return ContactResponse(success=True, message="Your message has been received.")
