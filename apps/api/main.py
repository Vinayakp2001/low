from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from slowapi.errors import RateLimitExceeded

from config import settings
from database import create_db_and_tables
from routers import contact, consultation, newsletter, webhooks
from utils.rate_limit import limiter


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db_and_tables()
    yield


app = FastAPI(
    title="Legal Portfolio API",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs" if settings.environment != "production" else None,
    redoc_url=None,
)

app.state.limiter = limiter

@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(status_code=429, content={"detail": "Too many requests. Please try again later."})

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(contact.router, tags=["contact"])
app.include_router(consultation.router, tags=["consultation"])
app.include_router(newsletter.router, tags=["newsletter"])
app.include_router(webhooks.router, tags=["webhooks"])


@app.get("/health")
async def health():
    return {"status": "ok", "environment": settings.environment}
