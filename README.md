# Legal Portfolio Website

Modern legal portfolio for founders, startups, and growth-stage companies.

## Stack

- **Frontend**: Next.js 14 App Router + TypeScript + Tailwind CSS + shadcn/ui
- **CMS**: Sanity
- **Backend**: Python FastAPI + PostgreSQL
- **Payments**: Stripe (paid consultations)
- **Deployment**: Vercel (frontend) + Railway/Render (API)

## Getting Started

### Frontend

```bash
cd apps/web
cp .env.example .env.local
npm install
npm run dev
```

### Backend

```bash
cd apps/api
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

## Environment Variables

See `apps/web/.env.example` and `apps/api/.env.example` for all required variables.
