import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { ServiceCard } from "@/components/services/ServiceCard";
import { getAllServices } from "@/lib/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Practice Areas",
  description: "Legal services for founders and growing companies — from startup formation to M&A exits.",
  alternates: { canonical: "/services" },
};

const fallbackServices = [
  { _id: "1", title: "Civil Litigation", slug: { current: "civil-litigation" }, shortDescription: "Breach of contract, business disputes, property claims, and complex civil matters handled with precision." },
  { _id: "2", title: "Criminal Defense", slug: { current: "criminal-defense" }, shortDescription: "Aggressive defense for misdemeanor and felony charges — protecting your rights from arrest through trial." },
  { _id: "3", title: "Personal Injury", slug: { current: "personal-injury" }, shortDescription: "Holding negligent parties accountable for accidents, medical malpractice, and wrongful death claims." },
  { _id: "4", title: "Family Law", slug: { current: "family-law" }, shortDescription: "Divorce, child custody, support, and asset division handled with care and strategic clarity." },
  { _id: "5", title: "Employment Disputes", slug: { current: "employment-disputes" }, shortDescription: "Wrongful termination, discrimination, harassment, and wage claims for employees and employers." },
  { _id: "6", title: "Real Estate Disputes", slug: { current: "real-estate-disputes" }, shortDescription: "Landlord-tenant conflicts, title disputes, construction defects, and property litigation." },
];

export default async function ServicesPage() {
  const sanityServices = await getAllServices().catch(() => null);
  const services = sanityServices?.length ? sanityServices : fallbackServices;
  return (
    <main>
      {/* Page Hero */}
      <Section variant="stone">
        <PageContainer>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            Practice Areas
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary tracking-tight max-w-2xl">
            Legal Services for Individuals &amp; Businesses
          </h1>
          <p className="mt-4 text-lg text-text-secondary max-w-xl">
            RSA-THE LAW FIRM handles litigation across a broad range of practice areas — in court and at the negotiating table.
          </p>
        </PageContainer>
      </Section>

      {/* Services Grid */}
      <Section>
        <PageContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service._id}
                title={service.title}
                description={service.shortDescription}
                slug={service.slug.current}
              />
            ))}
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
