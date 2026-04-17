import json
import logging
from datetime import datetime, timezone

import stripe
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from config import settings
from database import get_session
from models.consultation import ConsultationRequest
from models.payment import ConsultationPayment, WebhookEvent
from utils.email import send_email

router = APIRouter()
logger = logging.getLogger(__name__)

stripe.api_key = settings.stripe_secret_key


@router.post("/webhooks/stripe")
async def stripe_webhook(
    request: Request,
    session: AsyncSession = Depends(get_session),
):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature", "")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.stripe_webhook_secret
        )
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid webhook signature")

    # Idempotency — skip already-processed events
    existing = await session.exec(
        select(WebhookEvent).where(WebhookEvent.stripe_event_id == event["id"])
    )
    if existing.first():
        return {"status": "already_processed"}

    # Store raw event
    webhook_record = WebhookEvent(
        stripe_event_id=event["id"],
        event_type=event["type"],
        payload=json.dumps(event),
    )
    session.add(webhook_record)

    if event["type"] == "checkout.session.completed":
        stripe_session = event["data"]["object"]
        stripe_session_id = stripe_session["id"]
        payment_intent_id = stripe_session.get("payment_intent")
        consultation_request_id = int(stripe_session["metadata"].get("consultation_request_id", 0))

        # Update or create payment record
        payment_result = await session.exec(
            select(ConsultationPayment).where(
                ConsultationPayment.stripe_session_id == stripe_session_id
            )
        )
        payment = payment_result.first()
        if not payment:
            payment = ConsultationPayment(
                consultation_request_id=consultation_request_id,
                stripe_session_id=stripe_session_id,
                stripe_payment_intent_id=payment_intent_id,
                amount_cents=stripe_session.get("amount_total", 35000),
                status="paid",
                paid_at=datetime.now(timezone.utc),
            )
            session.add(payment)
        else:
            payment.status = "paid"
            payment.paid_at = datetime.now(timezone.utc)
            payment.stripe_payment_intent_id = payment_intent_id

        # Update consultation request status
        if consultation_request_id:
            cons_result = await session.exec(
                select(ConsultationRequest).where(
                    ConsultationRequest.id == consultation_request_id
                )
            )
            consultation = cons_result.first()
            if consultation:
                consultation.status = "paid"
                # Send confirmation email
                await send_email(
                    to=consultation.email,
                    subject="Your consultation is confirmed",
                    body_html=f"""
                    <p>Hi {consultation.full_name},</p>
                    <p>Your payment has been received and your consultation is confirmed.
                    We'll be in touch shortly to schedule your session.</p>
                    <p>Best,<br>The Legal Team</p>
                    """,
                )

    webhook_record.processed = True
    await session.commit()
    return {"status": "ok"}
