from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_session
from schemas.consultation import ConsultationRequestSchema, ConsultationResponse, BookConsultationResponse
from services.consultation_service import save_and_notify
from services.stripe_service import create_checkout_session
from utils.honeypot import check_honeypot
from utils.rate_limit import limiter

router = APIRouter()


@router.post("/consultation-request", response_model=ConsultationResponse)
@limiter.limit("5/10minutes")
async def consultation_request(
    request: Request,
    data: ConsultationRequestSchema,
    session: AsyncSession = Depends(get_session),
) -> ConsultationResponse:
    check_honeypot(data.honeypot)
    ip = request.client.host if request.client else "unknown"
    await save_and_notify(data, "free", ip, session)
    return ConsultationResponse(success=True, message="Your consultation request has been received.")


@router.post("/book-consultation", response_model=BookConsultationResponse)
@limiter.limit("5/10minutes")
async def book_consultation(
    request: Request,
    data: ConsultationRequestSchema,
    session: AsyncSession = Depends(get_session),
) -> BookConsultationResponse:
    check_honeypot(data.honeypot)
    ip = request.client.host if request.client else "unknown"
    consultation = await save_and_notify(data, "paid", ip, session)
    try:
        checkout_url = await create_checkout_session(
            consultation_request_id=consultation.id,
            customer_email=data.email,
            customer_name=data.full_name,
        )
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Payment provider error: {exc}")
    return BookConsultationResponse(checkout_url=checkout_url)
