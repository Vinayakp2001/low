from sqlalchemy.ext.asyncio import AsyncSession
from models.contact import ContactInquiry
from schemas.contact import ContactRequest
from utils.email import send_email
from config import settings


async def save_and_notify(data: ContactRequest, ip: str, session: AsyncSession) -> None:
    inquiry = ContactInquiry(
        name=data.name,
        email=data.email,
        subject=data.subject,
        message=data.message,
        ip_address=ip,
    )
    session.add(inquiry)
    await session.commit()

    # Notify attorney
    await send_email(
        to=settings.attorney_email,
        subject=f"New contact inquiry: {data.subject}",
        body_html=f"""
        <p><strong>From:</strong> {data.name} ({data.email})</p>
        <p><strong>Subject:</strong> {data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>{data.message}</p>
        """,
    )
