import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { FAQAccordion, type FAQItem } from "@/components/services/FAQAccordion";
import { RelatedServices } from "@/components/services/RelatedServices";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/sanity/queries";
import type { Service } from "@/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs().catch(() => []);
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug).catch(() => null);
  const title = service?.seo?.title ?? service?.title ?? "Legal Service";
  const description = service?.seo?.description ?? service?.shortDescription ?? "";
  return {
    title,
    description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: { title, description, url: `/services/${slug}` },
  };
}

interface ServiceData {
  title: string;
  shortDescription: string;
  overview: string;
  painPoints: string[];
  solutionFraming: string;
  faqs: FAQItem[];
  relatedServices: { _id: string; title: string; slug: { current: string }; shortDescription: string }[];
}

const placeholderServices: Record<string, ServiceData> = {
  "startup-formation": {
    title: "Startup Formation",
    shortDescription: "Entity selection, founder agreements, equity structure, and early-stage governance.",
    overview:
      "Getting your startup's legal foundation right from day one prevents costly mistakes down the road. We guide founders through entity selection, jurisdiction decisions, and the full suite of formation documents — so you can focus on building your product with confidence.\n\nFrom Delaware C-Corps to LLCs, we help you choose the structure that aligns with your fundraising goals, team composition, and long-term vision. We draft and negotiate founder agreements that protect everyone at the table.",
    painPoints: [
      "Unsure whether to form an LLC or C-Corp — and what the difference means for investors",
      "Founder equity splits and vesting schedules causing tension before you've even launched",
      "Missing IP assignment agreements that could block a future fundraise or acquisition",
      "No operating agreement or bylaws, leaving governance undefined",
    ],
    solutionFraming:
      "We handle the full formation stack: entity filing, EIN, founder equity agreements with standard 4-year vesting and 1-year cliff, IP assignment, and initial governance documents. You get a clean cap table and a legal foundation that won't spook investors.",
    faqs: [
      {
        question: "Should I form an LLC or a C-Corp?",
        answer:
          "For startups planning to raise venture capital, a Delaware C-Corp is almost always the right choice. VCs are structured to invest in C-Corps, and most institutional investors won't invest in LLCs. If you're building a lifestyle business or professional services firm, an LLC may be more appropriate.",
      },
      {
        question: "Why Delaware?",
        answer:
          "Delaware has the most developed body of corporate law in the US, predictable courts, and is the default expectation for investors and acquirers. Even if you operate in another state, forming in Delaware is standard practice.",
      },
      {
        question: "What is a vesting schedule and why does it matter?",
        answer:
          "A vesting schedule determines when founders and employees earn their equity over time. The standard is 4 years with a 1-year cliff — meaning you earn nothing in the first year, then 25% at the cliff, and the rest monthly. This protects the company if a co-founder leaves early.",
      },
      {
        question: "How long does formation take?",
        answer:
          "A standard Delaware C-Corp formation takes 1–2 weeks for state filing plus a few days for document drafting. Expedited filing is available for an additional fee if you need to move faster.",
      },
    ],
    relatedServices: [
      { _id: "2", title: "Fundraising & Equity", slug: { current: "fundraising-equity" }, shortDescription: "SAFEs, convertible notes, priced rounds, cap table management, and investor agreements." },
      { _id: "4", title: "Employment Law", slug: { current: "employment-law" }, shortDescription: "Offer letters, equity plans, contractor agreements, and HR compliance for growing teams." },
    ],
  },
  "fundraising-equity": {
    title: "Fundraising & Equity",
    shortDescription: "SAFEs, convertible notes, priced rounds, cap table management, and investor agreements.",
    overview:
      "Raising capital is one of the most legally complex moments in a startup's life. We guide founders through every stage of the fundraising process — from your first angel check to a Series A — ensuring your documents are investor-ready and your interests are protected.\n\nWe work with SAFEs, convertible notes, and priced equity rounds, and help you understand the downstream implications of every term before you sign.",
    painPoints: [
      "Unclear on the difference between a SAFE, convertible note, and priced round",
      "Investor term sheets with unfavorable terms you don't fully understand",
      "Cap table complexity making it hard to model dilution",
      "Missing or incomplete investor agreements creating liability",
    ],
    solutionFraming:
      "We review and negotiate term sheets, draft or review SAFEs and convertible notes, and manage the full documentation for priced rounds. We translate complex terms into plain language so you make informed decisions — not just fast ones.",
    faqs: [
      {
        question: "What is a SAFE and when should I use one?",
        answer:
          "A SAFE (Simple Agreement for Future Equity) is a simple, standardized instrument for early-stage fundraising. It converts to equity at a future priced round. SAFEs are fast, cheap, and founder-friendly — ideal for pre-seed and seed rounds.",
      },
      {
        question: "What's the difference between a valuation cap and a discount?",
        answer:
          "A valuation cap sets the maximum price at which a SAFE converts to equity, protecting early investors from dilution. A discount gives investors a percentage reduction on the price per share at conversion. Both reward early investors for taking on more risk.",
      },
      {
        question: "Do I need a lawyer to review a term sheet?",
        answer:
          "Yes. Term sheets are non-binding but set the framework for the entire deal. Unfavorable terms — like aggressive liquidation preferences or broad anti-dilution provisions — can significantly impact your outcome at exit. A few hours of legal review is well worth it.",
      },
    ],
    relatedServices: [
      { _id: "1", title: "Startup Formation", slug: { current: "startup-formation" }, shortDescription: "Entity selection, founder agreements, equity structure, and early-stage governance." },
      { _id: "6", title: "M&A & Exits", slug: { current: "ma-exits" }, shortDescription: "Acquisition structuring, due diligence, term sheet negotiation, and exit planning." },
    ],
  },
};

import { JsonLd } from "@/components/seo/JsonLd";

// Fallback for slugs not in placeholder data — kept for reference, Sanity takes priority

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Try Sanity first, fall back to placeholder
  const sanityService: Service | null = await getServiceBySlug(slug).catch(() => null);

  let service: ServiceData | null = null;

  if (sanityService) {
    service = {
      title: sanityService.title,
      shortDescription: sanityService.shortDescription,
      overview: Array.isArray(sanityService.overview)
        ? (sanityService.overview as { children?: { text: string }[] }[])
            .map((b) => b.children?.map((c) => c.text).join("") ?? "")
            .join("\n\n")
        : "",
      painPoints: sanityService.painPoints ?? [],
      solutionFraming: Array.isArray(sanityService.solutionFraming)
        ? (sanityService.solutionFraming as { children?: { text: string }[] }[])
            .map((b) => b.children?.map((c) => c.text).join("") ?? "")
            .join(" ")
        : "",
      faqs: (sanityService.faqs ?? []).map((f) => ({
        question: f.question,
        answer: Array.isArray(f.answer)
          ? (f.answer as { children?: { text: string }[] }[])
              .map((b) => b.children?.map((c) => c.text).join("") ?? "")
              .join(" ")
          : String(f.answer ?? ""),
      })),
      relatedServices: (sanityService.relatedServices ?? []).map((r) => ({
        _id: r._id,
        title: r.title,
        slug: r.slug,
        shortDescription: r.shortDescription,
      })),
    };
  } else {
    service = placeholderServices[slug] ?? null;
  }

  if (!service) notFound();

  return (
    <main>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": service.title,
        "description": service.shortDescription,
        "url": `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/services/${slug}`,
        "provider": { "@type": "LegalService", "name": "Legal Portfolio" },
      }} />
      {/* Page Hero */}
      <Section variant="stone">
        <PageContainer>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted mb-6">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services" className="hover:text-accent transition-colors">Services</Link>
            <span aria-hidden="true">/</span>
            <span className="text-text-secondary">{service.title}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary tracking-tight max-w-2xl">
            {service.title}
          </h1>
          <p className="mt-4 text-lg text-text-secondary max-w-xl">
            {service.shortDescription}
          </p>
          <Link
            href="/consultation"
            className="mt-8 inline-flex items-center gap-2 bg-accent text-white font-medium text-sm px-6 py-3 rounded-sm hover:bg-accent-hover transition-colors"
          >
            Book a Consultation
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </PageContainer>
      </Section>

      {/* Overview */}
      <Section>
        <PageContainer>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">Overview</h2>
            {service.overview.split("\n\n").map((para, i) => (
              <p key={i} className="text-text-secondary leading-relaxed mb-4">
                {para}
              </p>
            ))}
          </div>
        </PageContainer>
      </Section>

      {/* Pain Points */}
      <Section variant="stone">
        <PageContainer>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">Common Challenges</h2>
            <ul className="space-y-4">
              {service.painPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-text-secondary text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </PageContainer>
      </Section>

      {/* Solution Framing */}
      <Section>
        <PageContainer>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">How We Help</h2>
            <p className="text-text-secondary leading-relaxed">{service.solutionFraming}</p>
          </div>
        </PageContainer>
      </Section>

      {/* FAQs */}
      {service.faqs.length > 0 && (
        <Section variant="stone">
          <PageContainer>
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold text-text-primary mb-8">Frequently Asked Questions</h2>
              <FAQAccordion items={service.faqs} />
            </div>
          </PageContainer>
        </Section>
      )}

      {/* Related Services */}
      {service.relatedServices.length > 0 && (
        <Section>
          <PageContainer>
            <RelatedServices services={service.relatedServices} />
          </PageContainer>
        </Section>
      )}

      {/* CTA Block */}
      <section className="bg-dark-bg text-dark-text">
        <div className="container-legal py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Ready to discuss your situation?
            </h2>
            <p className="text-dark-text/70 text-lg mb-8">
              Schedule a consultation and let&apos;s talk through your specific needs.
            </p>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 bg-dark-text text-dark-bg font-medium px-7 py-3.5 rounded-sm hover:bg-dark-text/90 transition-colors text-sm"
            >
              Book a Consultation
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
