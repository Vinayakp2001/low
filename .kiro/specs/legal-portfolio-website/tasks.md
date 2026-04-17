# Implementation Plan — Legal Portfolio Website

- [x] 1. Project setup and configuration



  - Initialize Next.js App Router project with TypeScript in `apps/web`
  - Install and configure Tailwind CSS with custom design tokens (colors, fonts, spacing)
  - Install shadcn/ui and configure with custom theme overrides
  - Set up `apps/api` FastAPI project with virtual environment and `requirements.txt`
  - Configure monorepo root with `package.json` workspaces
  - Set up `.env.example` files for both `apps/web` and `apps/api`
  - _Requirements: 11.5, 13.5_

- [x] 2. Design system and base UI components



- [x] 2.1 Implement Tailwind design tokens and global styles


  - Define CSS custom properties for all color tokens in `globals.css`
  - Configure `tailwind.config.ts` with custom colors, fonts, and spacing
  - Import and configure `Playfair Display` and `Inter` via `next/font`
  - _Requirements: 1.9, 1.10_

- [x] 2.2 Build core layout components


  - Create `PageContainer`, `Section` (light/dark variant), `Grid`, `TwoColumn` components
  - Create `Navbar` with sticky behavior, logo placeholder, nav links, and CTA button
  - Create `Footer` with 4-column grid, policy links, and copyright
  - Create `MobileMenu` slide-in drawer with all nav links and CTA
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 14.1, 14.2, 14.3_

- [x] 2.3 Build reusable UI primitives


  - Restyle shadcn/ui `Button` with Primary, Secondary, and Ghost variants (no pill shape)
  - Restyle shadcn/ui `Input`, `Textarea`, `Select` with brand form styles
  - Create `FormField` wrapper (label + input + inline error)
  - Create `SubmitButton` with loading spinner state
  - _Requirements: 6.5, 7.5_

- [ ]* 2.4 Write unit tests for design system components
  - Test Button variants render correctly
  - Test FormField shows error state
  - _Requirements: 2.1, 2.2_

- [x] 3. Homepage implementation



- [x] 3.1 Build homepage section components


  - Create `HeroSection` with headline, subtext, and CTA button (fade-in animation)
  - Create `IntroSection` with two-column layout (text + image placeholder)
  - Create `ServicesSection` with 3-column service card grid (staggered fade-in)
  - Create `ProcessSection` with numbered steps (sequential animation)
  - Create `AttorneyHighlight` with two-column photo + bio layout
  - Create `TestimonialsSection` with 3-column grid and mobile carousel
  - Create `CTABanner` full-width dark section with headline and button
  - Create `ContactSection` with inline form and contact info
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10_

- [x] 3.2 Wire homepage with placeholder data


  - Assemble all sections in `app/page.tsx` using placeholder content
  - Ensure all CTAs link to correct routes
  - Verify mobile layout for all sections
  - _Requirements: 1.1–1.10_

- [x] 4. Services pages







- [x] 4.1 Build service components

  - Create `ServiceCard` component (title, description, arrow link)
  - Create `FAQAccordion` using restyled shadcn/ui Accordion (Radix-based)
  - Create `RelatedServices` card row component
  - _Requirements: 3.1, 3.4, 3.6_


- [x] 4.2 Build services index page

  - Create `app/services/page.tsx` with `ServiceGrid` of all practice area cards
  - Use placeholder data array for initial render
  - _Requirements: 3.1_


- [x] 4.3 Build service detail page

  - Create `app/services/[slug]/page.tsx` with full page structure
  - Sections: hero, overview, pain points, solution framing, FAQs, related services, CTA block
  - Use placeholder data for initial render
  - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.6_

- [x] 5. Team / attorney pages




- [x] 5.1 Build team components

  - Create `AttorneyCard` (photo, name, title, link)
  - Create `AttorneyProfile` full layout (sticky photo, bio, expertise tags, credentials, CTA)
  - Create `TrustBadge` component for bar admissions and credentials
  - _Requirements: 4.1, 4.2, 4.3_


- [x] 5.2 Build team index and profile pages

  - Create `app/team/page.tsx` with attorney card grid (placeholder data)
  - Create `app/team/[slug]/page.tsx` with full profile layout
  - Handle solo practitioner layout (single featured profile, not grid)
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 6. Blog / insights pages




- [x] 6.1 Build blog components


  - Create `BlogCard` (title, date, excerpt, category tag, link)
  - Create `RichText` component using Sanity portable text renderer (`@portabletext/react`)
  - _Requirements: 5.1, 5.4_


- [x] 6.2 Build insights index and article pages


  - Create `app/insights/page.tsx` with blog card grid (placeholder data)
  - Create `app/insights/[slug]/page.tsx` with article layout
  - Include featured image hero, author, date, categories, body, and end-of-article CTA
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [x] 7. Contact and consultation forms




- [x] 7.1 Build and wire contact form

  - Create `ContactForm` client component with name, email, subject, message, honeypot fields
  - Implement client-side validation on blur using controlled inputs
  - POST to FastAPI `/contact` endpoint on submit
  - Show `SuccessCard` on success, `ErrorBanner` on failure, preserve input on error
  - Create `app/contact/page.tsx` with two-column layout (form + contact info)
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_


- [x] 7.2 Build and wire consultation request form

  - Create `ConsultationForm` client component with all required fields
  - Include practice area dropdown, preferred contact radio, consultation type radio (Free/Paid)
  - POST to `/consultation-request` (free) or `/book-consultation` (paid)
  - On paid: redirect to Stripe `checkout_url` returned from FastAPI
  - Show success/error states
  - Create `app/consultation/page.tsx`
  - Create `app/consultation/success/page.tsx` and `app/consultation/cancel/page.tsx`
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 8.1, 8.3, 8.4, 8.5_

- [x] 8. FastAPI backend — core setup




- [x] 8.1 Set up FastAPI app with config and database

  - Create `main.py` with FastAPI app, CORS middleware, and router registration
  - Create `config.py` using `pydantic-settings` for all environment variables
  - Create `database.py` with SQLAlchemy async engine and session factory
  - _Requirements: 13.5_

- [x] 8.2 Implement database models and run migrations



  - Create SQLModel/SQLAlchemy ORM models for `contact_inquiries`, `consultation_requests`, `newsletter_signups`, `consultation_payments`, `webhook_events`
  - Set up Alembic for migrations
  - Run initial migration to create all tables
  - _Requirements: 6.7, 7.6, 8.6_

- [-] 9. FastAPI backend — contact and consultation endpoints


- [x] 9.1 Implement contact endpoint

  - Create Pydantic schema for contact request (name, email, subject, message, honeypot)
  - Create `contact_service.py` with save-to-DB and email notification logic
  - Create `POST /contact` router with honeypot check, rate limiting, and service call
  - _Requirements: 6.7, 13.1, 13.2, 13.3, 13.4_


- [x] 9.2 Implement consultation request endpoint

  - Create Pydantic schema for consultation request
  - Create `consultation_service.py` with save-to-DB and dual email notification (attorney + client)
  - Create `POST /consultation-request` router
  - _Requirements: 7.6, 13.1, 13.2_


- [x] 9.3 Implement rate limiting and spam prevention middleware


  - Integrate `slowapi` for IP-based rate limiting (5 requests / 10 min)
  - Create `honeypot.py` utility to silently reject filled honeypot fields
  - Apply to all public form endpoints
  - _Requirements: 13.2, 13.3_

- [x] 10. FastAPI backend — Stripe integration




- [x] 10.1 Implement paid consultation booking endpoint

  - Create `stripe_service.py` with `create_checkout_session()` function
  - Create `POST /book-consultation` router that saves consultation request and returns Stripe checkout URL
  - _Requirements: 8.1, 8.2, 8.3_


- [x] 10.2 Implement Stripe webhook handler

  - Create `POST /webhooks/stripe` router with signature verification
  - Handle `checkout.session.completed` event: update `consultation_payments` and `consultation_requests` status
  - Trigger confirmation email on successful payment
  - Store raw event in `webhook_events` table
  - _Requirements: 8.6, 8.7_

- [x] 11. Newsletter subscription endpoint



  - Create Pydantic schema for newsletter signup (email, honeypot)
  - Create `newsletter_service.py` with upsert logic (409 if already subscribed)
  - Create `POST /newsletter/subscribe` router
  - _Requirements: 13.1, 13.3_

- [x] 12. Sanity CMS integration




- [x] 12.1 Set up Sanity project and schemas

  - Initialize Sanity Studio project
  - Create schemas for: `homepage`, `service`, `teamMember`, `testimonial`, `post`, `officeInfo`, `ctaBlock`, `policyPage`, `faq`
  - _Requirements: 10.1–10.7_


- [x] 12.2 Integrate Sanity with Next.js frontend

  - Install `@sanity/client` and `@portabletext/react` in `apps/web`
  - Create `lib/sanity/client.ts` with configured Sanity client
  - Create `lib/sanity/queries.ts` with GROQ queries for all page types
  - Create `lib/sanity/image.ts` with `@sanity/image-url` helper
  - _Requirements: 10.1–10.7_

- [x] 12.3 Replace placeholder data with Sanity queries



  - Update homepage `app/page.tsx` to fetch from Sanity (server component)
  - Update services pages to fetch from Sanity with `generateStaticParams`
  - Update team pages to fetch from Sanity
  - Update insights pages to fetch from Sanity
  - Update contact page to fetch `officeInfo` from Sanity
  - Update policy pages (`/privacy`, `/terms`, `/disclaimer`) to fetch from Sanity
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 12.1, 12.2, 12.3_


- [x] 12.4 Configure ISR and on-demand revalidation


  - Add `revalidate` export to all Sanity-driven pages
  - Create Next.js API route for Sanity webhook-triggered on-demand revalidation
  - _Requirements: 10.7_

- [x] 13. SEO implementation





- [ ] 13.1 Implement metadata for all pages
  - Add `generateMetadata` to all page files using Sanity SEO fields
  - Include title, description, and Open Graph tags
  - Add canonical URLs


  - _Requirements: 11.1_

- [ ] 13.2 Add JSON-LD structured data
  - Add `LegalService` JSON-LD to service detail pages

  - Add `Person` JSON-LD to attorney profile pages

  - Add `Article` JSON-LD to blog post pages
  - _Requirements: 11.2, 11.3, 11.4_

- [ ] 13.3 Generate sitemap and robots.txt
  - Create `app/sitemap.ts` that fetches all slugs from Sanity and generates sitemap entries
  - Create `public/robots.txt`
  - _Requirements: 11.7_

- [x] 14. About page



  - Create `app/about/page.tsx` with attorney bio, credentials, and CTA
  - Fetch content from Sanity `teamMember` schema
  - _Requirements: 4.3_

- [ ]* 15. End-to-end integration tests
  - Write tests for contact form submission flow (client → FastAPI → DB)
  - Write tests for consultation request flow
  - Write tests for Stripe webhook handler with mock events
  - _Requirements: 6.2, 7.2, 8.6_
