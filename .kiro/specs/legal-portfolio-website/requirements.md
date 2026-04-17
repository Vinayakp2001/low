# Requirements Document

## Introduction

A modern, minimal legal portfolio website for a legal professional (attorney/advisor) targeting founders, startups, and growth-stage companies. The site functions as a digital profile and lead-generation platform — not a transactional store. It communicates credibility, expertise, and strategic value through clean design, strong typography, and structured content. Visitors can learn about the attorney's practice areas, read insights, and request a consultation (free or paid via Stripe). All content is managed through Sanity CMS. The backend is a Python FastAPI service handling form submissions, email notifications, and Stripe payment flows. The frontend is built with Next.js App Router, TypeScript, Tailwind CSS, and customized shadcn/ui components.

---

## Requirements

### Requirement 1 — Homepage

**User Story:** As a prospective client (founder or startup operator), I want to land on a homepage that immediately communicates the attorney's positioning, expertise, and how to engage, so that I can quickly decide whether to reach out.

#### Acceptance Criteria

1. WHEN a user visits the homepage THEN the system SHALL display a hero section with a strong positioning headline, a supporting subheadline, and a primary CTA button linking to the consultation request page.
2. WHEN a user scrolls past the hero THEN the system SHALL display a short introduction/about section summarizing the attorney's background and focus.
3. WHEN a user scrolls further THEN the system SHALL display a practice areas section listing 4–6 service cards with title, short description, and a link to the full service page.
4. WHEN a user scrolls further THEN the system SHALL display a "How We Work" process section with 3–4 numbered steps.
5. WHEN a user scrolls further THEN the system SHALL display a team/attorney highlight section with a photo, name, title, and short bio.
6. WHEN a user scrolls further THEN the system SHALL display a testimonials section with at least 3 client quotes.
7. WHEN a user scrolls further THEN the system SHALL display a consultation CTA banner with a headline and button.
8. WHEN a user scrolls further THEN the system SHALL display a contact section with a short inline contact form.
9. WHEN a user views the homepage on mobile THEN the system SHALL render all sections in a single-column stacked layout with appropriate spacing.
10. WHEN the page loads THEN the system SHALL apply subtle entrance animations (fade-in, no parallax or heavy motion).

---

### Requirement 2 — Navigation

**User Story:** As a visitor, I want a clear, persistent navigation bar so that I can move between sections and pages without confusion.

#### Acceptance Criteria

1. WHEN a user views any page THEN the system SHALL display a top navigation bar with the firm logo/name, primary nav links, and a "Book Consultation" CTA button.
2. WHEN a user scrolls down on any page THEN the system SHALL keep the navigation bar sticky at the top.
3. WHEN a user views the site on mobile THEN the system SHALL collapse the navigation into a hamburger menu with a full-screen or slide-in drawer.
4. WHEN a user opens the mobile menu THEN the system SHALL display all navigation links and the CTA button.
5. WHEN a user clicks a navigation link THEN the system SHALL navigate to the correct page and close the mobile menu if open.

---

### Requirement 3 — Services / Practice Areas

**User Story:** As a prospective client, I want to browse the attorney's practice areas in detail so that I can confirm they handle my specific legal needs.

#### Acceptance Criteria

1. WHEN a user visits `/services` THEN the system SHALL display a grid of all practice area cards pulled from Sanity CMS.
2. WHEN a user clicks a practice area card THEN the system SHALL navigate to `/services/[slug]` with a full detail page.
3. WHEN a user views a service detail page THEN the system SHALL display: page hero, service overview, client pain points, legal solution framing, FAQs, related services, and a CTA.
4. WHEN a service page has FAQs THEN the system SHALL render them as an accessible accordion component.
5. WHEN a user reaches the bottom of a service page THEN the system SHALL display a CTA block linking to the consultation request page.
6. IF a service page has related services THEN the system SHALL display them as cards at the bottom of the page.

---

### Requirement 4 — Team / Attorney Profile

**User Story:** As a prospective client, I want to learn about the attorney's background, credentials, and expertise so that I can build trust before reaching out.

#### Acceptance Criteria

1. WHEN a user visits `/team` THEN the system SHALL display attorney profile cards with photo, name, title, and short bio.
2. WHEN a user clicks an attorney card THEN the system SHALL navigate to `/team/[slug]` with a full profile page.
3. WHEN a user views an attorney profile page THEN the system SHALL display: full bio, expertise areas, credentials/bar admissions, education, and a CTA to book a consultation.
4. WHEN the team section is configured for a solo practitioner THEN the system SHALL display a single featured profile layout rather than a grid.
5. WHEN a user views the attorney profile on mobile THEN the system SHALL stack the photo and bio vertically.

---

### Requirement 5 — Blog / Insights

**User Story:** As a founder or startup operator, I want to read legal insights and articles so that I can assess the attorney's expertise and find relevant guidance.

#### Acceptance Criteria

1. WHEN a user visits `/insights` THEN the system SHALL display a list of published blog posts from Sanity CMS, sorted by publish date descending.
2. WHEN a user clicks a blog post THEN the system SHALL navigate to `/insights/[slug]` with the full article.
3. WHEN a user views a blog post THEN the system SHALL display: title, author, publish date, category tags, body content (rich text from Sanity), and a CTA block at the end.
4. WHEN a blog post is rendered THEN the system SHALL apply proper heading hierarchy and readable line length for long-form content.
5. WHEN a user reaches the end of a blog post THEN the system SHALL display a "Book a Consultation" CTA.
6. IF a blog post has a featured image THEN the system SHALL display it as a full-width hero image at the top of the article.

---

### Requirement 6 — Contact Page

**User Story:** As a prospective client, I want a simple way to send a general inquiry so that I can get in touch without committing to a full consultation request.

#### Acceptance Criteria

1. WHEN a user visits `/contact` THEN the system SHALL display a contact form with fields: name, email, subject, and message.
2. WHEN a user submits the contact form THEN the system SHALL POST to the FastAPI `/contact` endpoint.
3. WHEN the form submission succeeds THEN the system SHALL display a success message and clear the form.
4. WHEN the form submission fails THEN the system SHALL display an inline error message without losing the user's input.
5. WHEN a user submits the form with missing required fields THEN the system SHALL display inline validation errors before sending.
6. WHEN the contact page loads THEN the system SHALL also display office/contact info (email, phone, location) alongside the form.
7. WHEN the FastAPI backend receives a contact submission THEN the system SHALL store it in the `contact_inquiries` PostgreSQL table and send an email notification.

---

### Requirement 7 — Consultation Request

**User Story:** As a prospective client, I want to formally request a consultation so that I can schedule time with the attorney to discuss my legal needs.

#### Acceptance Criteria

1. WHEN a user visits `/consultation` THEN the system SHALL display a consultation request form with fields: name, email, phone (optional), company name (optional), practice area of interest (dropdown), brief description of matter, and preferred contact method.
2. WHEN a user submits the consultation request form THEN the system SHALL POST to the FastAPI `/consultation-request` endpoint.
3. WHEN the form submission succeeds THEN the system SHALL display a confirmation message with next-step expectations.
4. WHEN the form submission fails THEN the system SHALL display an error state without losing input.
5. WHEN a user submits with missing required fields THEN the system SHALL show inline validation errors.
6. WHEN the FastAPI backend receives a consultation request THEN the system SHALL store it in `consultation_requests` and send an email notification to both the attorney and the client.
7. WHEN Stripe paid consultations are enabled THEN the system SHALL display a "Book & Pay" option that initiates a Stripe Checkout session after form submission.

---

### Requirement 8 — Paid Consultation (Stripe)

**User Story:** As a client who wants to book a paid consultation, I want to pay a deposit or session fee upfront so that the appointment is confirmed.

#### Acceptance Criteria

1. WHEN a user selects the paid consultation option THEN the system SHALL POST to FastAPI `/book-consultation` with the form data.
2. WHEN FastAPI receives the request THEN the system SHALL create a Stripe Checkout session and return the session URL.
3. WHEN the frontend receives the session URL THEN the system SHALL redirect the user to Stripe Checkout.
4. WHEN the user completes payment THEN Stripe SHALL redirect to a `/consultation/success` page.
5. WHEN the user cancels payment THEN Stripe SHALL redirect to a `/consultation/cancel` page.
6. WHEN Stripe sends a `checkout.session.completed` webhook THEN the FastAPI `/webhooks/stripe` endpoint SHALL update the `consultation_payments` table and mark the consultation as paid.
7. WHEN a payment is confirmed THEN the system SHALL send a confirmation email to the client.

---

### Requirement 9 — Testimonials

**User Story:** As a prospective client, I want to read testimonials from past clients so that I can build confidence in the attorney's work.

#### Acceptance Criteria

1. WHEN a user views the homepage testimonials section THEN the system SHALL display at least 3 testimonial cards from Sanity CMS.
2. WHEN a user views a testimonial THEN the system SHALL display: quote text, client name, company/role (optional), and an optional star rating.
3. WHEN testimonials are displayed on mobile THEN the system SHALL render them in a scrollable horizontal carousel or stacked list.

---

### Requirement 10 — CMS-Driven Content

**User Story:** As the site owner, I want to update all content through Sanity CMS without touching code so that I can keep the site current.

#### Acceptance Criteria

1. WHEN the site owner updates homepage content in Sanity THEN the system SHALL reflect changes on the live site after revalidation.
2. WHEN the site owner adds a new service/practice area in Sanity THEN the system SHALL automatically create a new service page at `/services/[slug]`.
3. WHEN the site owner publishes a new blog post in Sanity THEN the system SHALL appear in the `/insights` listing.
4. WHEN the site owner updates attorney profile data in Sanity THEN the system SHALL reflect on the team page.
5. WHEN the site owner updates testimonials in Sanity THEN the system SHALL reflect on the homepage and any testimonials page.
6. WHEN the site owner updates office/contact details in Sanity THEN the system SHALL reflect on the contact page.
7. WHEN Sanity content is updated THEN the system SHALL use Next.js ISR or on-demand revalidation to update the live site without a full redeploy.

---

### Requirement 11 — SEO and Performance

**User Story:** As the site owner, I want the site to rank well in search engines and load fast so that prospective clients can find it organically.

#### Acceptance Criteria

1. WHEN any page is rendered THEN the system SHALL include a unique `<title>`, `<meta description>`, and Open Graph tags sourced from Sanity or page defaults.
2. WHEN a service page is rendered THEN the system SHALL include structured data (JSON-LD) for the legal service.
3. WHEN an attorney profile page is rendered THEN the system SHALL include JSON-LD Person schema.
4. WHEN a blog post is rendered THEN the system SHALL include JSON-LD Article schema.
5. WHEN the site is audited THEN the system SHALL achieve a Lighthouse performance score of 90+ on desktop.
6. WHEN images are rendered THEN the system SHALL use Next.js `<Image>` with proper sizing, lazy loading, and WebP format.
7. WHEN the site is crawled THEN the system SHALL serve a valid `sitemap.xml` and `robots.txt`.

---

### Requirement 12 — Policy Pages

**User Story:** As a visitor, I want to access the firm's privacy policy, terms of service, and legal disclaimer so that I understand how my data is handled.

#### Acceptance Criteria

1. WHEN a user visits `/privacy` THEN the system SHALL display the privacy policy content from Sanity CMS.
2. WHEN a user visits `/terms` THEN the system SHALL display the terms of service content from Sanity CMS.
3. WHEN a user visits `/disclaimer` THEN the system SHALL display the legal disclaimer content from Sanity CMS.
4. WHEN policy pages are rendered THEN the system SHALL use a clean long-form reading layout with proper heading hierarchy.
5. WHEN the footer is displayed THEN the system SHALL include links to all three policy pages.

---

### Requirement 13 — Security and Spam Prevention

**User Story:** As the site owner, I want form submissions to be protected from spam and abuse so that the backend is not flooded with junk data.

#### Acceptance Criteria

1. WHEN a user submits any form THEN the system SHALL validate all fields server-side in FastAPI using Pydantic models.
2. WHEN a single IP submits more than 5 requests in 10 minutes THEN the FastAPI rate limiter SHALL return a 429 response.
3. WHEN a form is submitted THEN the system SHALL include a honeypot field that, if filled, causes the submission to be silently rejected.
4. WHEN email fields are submitted THEN the system SHALL validate email format both client-side and server-side.
5. WHEN the FastAPI backend is deployed THEN the system SHALL use CORS restrictions to only allow requests from the configured frontend domain.

---

### Requirement 14 — Footer

**User Story:** As a visitor, I want a professional footer with navigation links, contact info, and policy links so that I can find key information from any page.

#### Acceptance Criteria

1. WHEN a user views any page THEN the system SHALL display a footer with: firm name/logo, navigation links, practice area links, contact info, social links (optional), and policy page links.
2. WHEN a user views the footer on mobile THEN the system SHALL stack footer columns vertically.
3. WHEN the footer is rendered THEN the system SHALL display a copyright notice with the current year.
