from fastapi import HTTPException


def check_honeypot(value: str) -> None:
    """Silently reject requests where the honeypot field is filled."""
    if value:
        # Return 200 to not tip off bots, but don't process the request
        raise HTTPException(status_code=200, detail="OK")
