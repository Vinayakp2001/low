from sqlalchemy.ext.asyncio import AsyncSession
from models.consultation import ConsultationRequest
from schemas.consultation import ConsultationRequestSchema
from utils.email import send_email
from config import settings


async def save_and_notify(
    data: ConsultationRequestSchema,
    consultation_type: str,
    ip: str,
    session: AsyncSession,
) -> ConsultationRequest:
    request = ConsultationRequest(
        full_name=data.full_name,
        email=data.email,
        phone=data.phone,
        company_name=data.company_name,
        practice_area=data.practice_area,
        matter_description=data.matter_description,
        preferred_contact=data.preferred_contact,
        consultation_type=consultation_type,
        ip_address=ip,
    )
    session.add(request)
    await session.commit()
    await session.refresh(request)

    # Notify attorney
    await send_email(
        to=settings.attorney_email,
        subject=f"New {consultation_type} consultation request — {data.practice_area}",
        body_html=f"""
        <p><strong>Name:</strong> {data.full_name}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Phone:</strong> {data.phone or "—"}</p>
        <p><strong>Company:</strong> {data.company_name or "—"}</p>
        <p><strong>Practice Area:</strong> {data.practice_area}</p>
        <p><strong>Preferred Contact:</strong> {data.preferred_contact}</p>
        <p><strong>Matter:</strong></p>
        <p>{data.matter_description}</p>
        """,
    )

    # Confirm to client
    await send_email(
        to=data.email,
        subject="We received your consultation request",
        body_html=f"""
        <p>Hi {data.full_name},</p>
        <p>Thank you for reaching out. We've received your consultation request and will be in touch within one business day.</p>
        <p>Best,<br>The Legal Team</p>
        """,
    )

    return request
