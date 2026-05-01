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
  "civil-litigation": {
    title: "Civil Litigation",
    shortDescription: "Breach of contract, business disputes, property claims, and complex civil matters handled with precision.",
    overview:
      "Civil disputes can be financially and emotionally draining. RSA-THE LAW FIRM brings 21 years of courtroom experience to every civil matter — from contract breaches and property disputes to recovery suits and injunctions.\n\nWe appear before the Rajasthan High Court, District Courts, and relevant tribunals, ensuring your case is prepared thoroughly and argued aggressively.",
    painPoints: [
      "Breach of contract by a business partner or vendor with no resolution in sight",
      "Property disputes involving title, possession, or encroachment",
      "Recovery of dues from debtors who refuse to pay",
      "Injunctions needed urgently to prevent irreversible harm",
    ],
    solutionFraming:
      "We assess your case, advise on the strongest legal strategy, and represent you at every stage — from filing to final judgment. Our focus is on efficient resolution, whether through negotiation, mediation, or full trial.",
    faqs: [
      { question: "How long does a civil case take?", answer: "It varies by court and complexity. District Court matters can take 1–3 years. High Court matters may take longer. We work to expedite wherever possible through interim orders and strategic filings." },
      { question: "Can I get an interim injunction quickly?", answer: "Yes. In urgent matters, we can file for an ex-parte interim injunction on the same day, which the court may grant without hearing the other side initially." },
    ],
    relatedServices: [
      { _id: "banking-drt", title: "Banking & DRT Cases", slug: { current: "banking-drt" }, shortDescription: "Debt Recovery Tribunal matters, banking disputes, and NPA litigation." },
      { _id: "consumer-cases", title: "Consumer Cases", slug: { current: "consumer-cases" }, shortDescription: "Consumer Forum, State Commission, and NCLT matters." },
    ],
  },
  "criminal-defense": {
    title: "Criminal Defense",
    shortDescription: "Aggressive defense for criminal charges including NI Act cases — protecting your rights from arrest through trial.",
    overview:
      "A criminal charge can change your life. RSA-THE LAW FIRM provides strong, strategic criminal defense before the District & Sessions Court Jaipur and Rajasthan High Court.\n\nWe handle cases from the FIR stage through bail, trial, and appeal — ensuring your rights are protected at every step. Our experience includes NI Act (cheque bounce) cases, which are among the most common criminal matters in banking and commerce.",
    painPoints: [
      "Arrested or facing an FIR with no clarity on your legal rights",
      "Cheque bounce (NI Act Section 138) case filed against you",
      "Bail denied or conditions too restrictive",
      "Trial dragging on with no clear defense strategy",
    ],
    solutionFraming:
      "We step in immediately — securing bail, challenging the FIR where appropriate, and building a defense strategy based on the facts. For NI Act cases, we have extensive experience in both defending accused and prosecuting complainants.",
    faqs: [
      { question: "What should I do if an FIR is filed against me?", answer: "Contact a lawyer immediately. Do not give any statement to police without legal counsel. We can advise on anticipatory bail if arrest is likely." },
      { question: "What is a Section 138 NI Act case?", answer: "It is a criminal complaint filed when a cheque is dishonoured due to insufficient funds. The accused can face imprisonment up to 2 years or fine or both. We handle both complainant and accused sides." },
    ],
    relatedServices: [
      { _id: "civil-litigation", title: "Civil Litigation", slug: { current: "civil-litigation" }, shortDescription: "Breach of contract, business disputes, and property claims." },
      { _id: "banking-drt", title: "Banking & DRT Cases", slug: { current: "banking-drt" }, shortDescription: "Debt Recovery Tribunal matters and banking disputes." },
    ],
  },
  "banking-drt": {
    title: "Banking & DRT Cases",
    shortDescription: "Debt Recovery Tribunal (DRT) matters, banking disputes, loan recovery cases, and NPA litigation for banks and borrowers.",
    overview:
      "RSA-THE LAW FIRM is a panel lawyer for Indian Bank, Punjab National Bank, Union Bank of India, and JVVNL — giving us deep expertise in banking law and debt recovery matters.\n\nWe represent both banks and borrowers before the Debt Recovery Tribunal (DRT), handling recovery suits, SARFAESI proceedings, and NPA-related litigation with precision and speed.",
    painPoints: [
      "Bank has initiated SARFAESI action or DRT proceedings against you",
      "Loan account classified as NPA and assets under threat of auction",
      "Bank refusing to release security despite full repayment",
      "Recovery certificate enforcement causing business disruption",
    ],
    solutionFraming:
      "We appear before DRT Jaipur and handle the full spectrum of banking litigation — from filing Original Applications (OA) for banks to defending borrowers against recovery proceedings. We also handle SARFAESI challenges, securitisation appeals, and one-time settlement negotiations.",
    faqs: [
      { question: "What is DRT and how does it work?", answer: "The Debt Recovery Tribunal (DRT) is a special court for recovery of debts due to banks and financial institutions above ₹20 lakhs. Banks file an Original Application (OA) and the tribunal passes a Recovery Certificate which is enforced by the Recovery Officer." },
      { question: "Can I challenge a SARFAESI notice?", answer: "Yes. You can file a Securitisation Application (SA) before the DRT within 45 days of the SARFAESI action. We assess the grounds and file immediately to get a stay if warranted." },
      { question: "What if my property is being auctioned by the bank?", answer: "We can seek an urgent stay from DRT or the High Court. Time is critical — contact us immediately if you receive an auction notice." },
    ],
    relatedServices: [
      { _id: "civil-litigation", title: "Civil Litigation", slug: { current: "civil-litigation" }, shortDescription: "Breach of contract, business disputes, and property claims." },
      { _id: "consumer-cases", title: "Consumer Cases", slug: { current: "consumer-cases" }, shortDescription: "Consumer Forum and State Commission matters." },
    ],
  },
  "consumer-cases": {
    title: "Consumer Cases",
    shortDescription: "Consumer Forum, State Commission, and NCLT matters — fighting for your rights against deficient services and unfair trade practices.",
    overview:
      "Consumer protection law gives individuals powerful remedies against deficient services, defective products, and unfair trade practices. RSA-THE LAW FIRM represents clients before the District Consumer Forum, State Commission, and NCLT.\n\nWhether you've been cheated by a builder, received deficient medical services, or been misled by a financial product — we fight to get you compensation and justice.",
    painPoints: [
      "Builder delayed possession or failed to deliver promised amenities",
      "Insurance claim wrongfully rejected by the insurer",
      "Defective product causing loss or injury with no redressal from the company",
      "Bank or financial institution charging unauthorized fees or mis-selling products",
    ],
    solutionFraming:
      "We file consumer complaints, represent you at hearings, and pursue appeals up to the State Commission and National Commission. Our goal is maximum compensation — including the cost of deficiency, mental agony, and legal fees.",
    faqs: [
      { question: "What can I claim in a consumer case?", answer: "You can claim the cost of the deficient service/product, compensation for mental agony and harassment, and litigation costs. In serious cases, punitive damages may also be awarded." },
      { question: "How long does a consumer case take?", answer: "District Forum cases typically conclude in 3–6 months. State Commission matters may take longer. We push for early hearings wherever possible." },
    ],
    relatedServices: [
      { _id: "civil-litigation", title: "Civil Litigation", slug: { current: "civil-litigation" }, shortDescription: "Breach of contract, business disputes, and property claims." },
      { _id: "banking-drt", title: "Banking & DRT Cases", slug: { current: "banking-drt" }, shortDescription: "Debt Recovery Tribunal matters and banking disputes." },
    ],
  },
  "family-law": {
    title: "Family Law",
    shortDescription: "Divorce, child custody, support, and asset division handled with care and strategic clarity.",
    overview:
      "Family law matters are among the most personal and emotionally charged legal proceedings. RSA-THE LAW FIRM handles matrimonial disputes, divorce petitions, child custody, maintenance, and domestic violence cases before the Family Court and District Court Jaipur.\n\nWe approach every family matter with sensitivity while ensuring your legal rights and interests are fully protected.",
    painPoints: [
      "Divorce proceedings becoming contested and drawn out",
      "Child custody dispute with no clear resolution",
      "Maintenance not being paid despite court orders",
      "Domestic violence requiring urgent legal protection",
    ],
    solutionFraming:
      "We handle mutual consent divorces, contested divorces, child custody petitions, maintenance applications, and domestic violence cases under the Protection of Women from Domestic Violence Act. We aim for resolution that protects your interests and minimizes trauma.",
    faqs: [
      { question: "How long does a mutual consent divorce take?", answer: "A mutual consent divorce requires a 6-month cooling-off period after the first motion, though courts can waive this. With both parties cooperating, it can be completed in 6–8 months." },
      { question: "Can I get interim maintenance while the case is pending?", answer: "Yes. You can apply for interim maintenance under Section 125 CrPC or under the Hindu Marriage Act. Courts typically decide interim maintenance applications within a few months." },
    ],
    relatedServices: [
      { _id: "civil-litigation", title: "Civil Litigation", slug: { current: "civil-litigation" }, shortDescription: "Breach of contract, business disputes, and property claims." },
      { _id: "criminal-defense", title: "Criminal Defense", slug: { current: "criminal-defense" }, shortDescription: "Aggressive defense for criminal charges including NI Act cases." },
    ],
  },
  "gst-tribunal": {
    title: "GST & Tribunal Matters",
    shortDescription: "GST disputes, tribunal appearances, and regulatory matters handled before relevant authorities in Rajasthan.",
    overview:
      "GST disputes and tribunal matters require specialized knowledge of tax law and procedure. RSA-THE LAW FIRM represents clients before GST authorities, the GST Appellate Authority, NCLT, and other tribunals in Rajasthan.\n\nFrom show cause notices to appeals, we handle the full spectrum of GST litigation and regulatory matters with expertise built over 21 years of practice.",
    painPoints: [
      "GST show cause notice received with a tight response deadline",
      "Input Tax Credit (ITC) wrongfully denied by the department",
      "GST assessment order with excessive demand",
      "NCLT proceedings affecting your business",
    ],
    solutionFraming:
      "We draft replies to show cause notices, appear at personal hearings, file appeals before the Appellate Authority and GST Tribunal, and represent clients in NCLT matters. Our approach is to resolve disputes at the earliest stage possible to minimize cost and disruption.",
    faqs: [
      { question: "What should I do when I receive a GST show cause notice?", answer: "Do not ignore it. You typically have 30 days to respond. A well-drafted reply addressing each allegation with supporting documents can resolve the matter without further proceedings." },
      { question: "Can I appeal a GST order?", answer: "Yes. You can appeal to the GST Appellate Authority within 3 months of the order. Further appeals lie before the GST Appellate Tribunal and High Court." },
    ],
    relatedServices: [
      { _id: "civil-litigation", title: "Civil Litigation", slug: { current: "civil-litigation" }, shortDescription: "Breach of contract, business disputes, and property claims." },
      { _id: "banking-drt", title: "Banking & DRT Cases", slug: { current: "banking-drt" }, shortDescription: "Debt Recovery Tribunal matters and banking disputes." },
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
