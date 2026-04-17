import stripe
from config import settings

stripe.api_key = settings.stripe_secret_key


async def create_checkout_session(
    consultation_request_id: int,
    customer_email: str,
    customer_name: str,
) -> str:
    """Create a Stripe Checkout session and return the URL."""
    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        mode="payment",
        customer_email=customer_email,
        line_items=[
            {
                "price": settings.stripe_paid_consultation_price_id,
                "quantity": 1,
            }
        ],
        metadata={
            "consultation_request_id": str(consultation_request_id),
            "customer_name": customer_name,
        },
        success_url=f"{settings.frontend_url}/consultation/success",
        cancel_url=f"{settings.frontend_url}/consultation/cancel",
    )
    return session.url
