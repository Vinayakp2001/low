import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { AttorneyProfile } from "@/components/team/AttorneyProfile";
import { TrustBadge } from "@/components/team/TrustBadge";
import { getTeamMemberBySlug } from "@/lib/sanity/queries";
import { JsonLd } from "@/components/seo/JsonLd";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About",
  description: "Learn about our practice — boutique legal counsel built for founders and growth-stage companies.",
  alternates: { canonical: "/about" },
};

const fallbackAttorney = {
  name: "Rajneesh Sharma",
  title: "Advocate — Rajasthan High Court, Jaipur",
  shortBio:
    "Rajneesh Sharma is an experienced advocate practising at the Rajasthan High Court and District & Sessions Court, Jaipur. He brings meticulous preparation and aggressive courtroom advocacy to every matter he handles.",
  fullBio:
    "Before founding RSA The Law Firm, Rajneesh Sharma built a strong litigation practice across civil, criminal, and family law. He has appeared before the Rajasthan High Court, District & Sessions Court, and various tribunals. His practice is known for thorough case preparation and a client-first approach.",
  expertiseAreas: ["Civil Litigation", "Criminal Defense", "Family Law", "High Court Practice", "Sessions Court"],
  barAdmissions: ["Rajasthan High Court, Jaipur", "District & Sessions Court, Jaipur"],
  education: [
    { degree: "LL.B.", institution: "Rajasthan University", year: 2005 },
  ],
};

const firmValues = [
  { label: "Courtroom-ready", description: "We prepare every case as if it's going to trial. That preparation is what drives favorable settlements and wins at verdict." },
  { label: "Client-first communication", description: "You'll always know where your case stands. We return calls, explain strategy, and keep you informed at every stage." },
  { label: "Transparent fees", description: "No surprise bills. We discuss fee structures upfront — contingency, flat fee, or hourly — so you can plan accordingly." },
];

export default async function AboutPage() {
  const sanityMember = await getTeamMemberBySlug("alexandra-mercer").catch(() => null);

  const attorney = sanityMember
    ? {
        name: sanityMember.name,
        title: sanityMember.title,
        shortBio: sanityMember.shortBio,
        fullBio: undefined as string | undefined,
        expertiseAreas: sanityMember.expertiseAreas ?? [],
        barAdmissions: sanityMember.barAdmissions ?? [],
        education: sanityMember.education ?? [],
      }
    : fallbackAttorney;

  return (
    <main>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Person",
        "name": attorney.name,
        "jobTitle": attorney.title,
        "description": attorney.shortBio,
        "url": `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/about`,
      }} />

      {/* Hero */}
      <Section variant="stone">
        <PageContainer>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            About the Practice
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary tracking-tight max-w-2xl">
            Advocates Who Fight for You
          </h1>
          <p className="mt-4 text-lg text-text-secondary max-w-xl">
            RSA The Law Firm is a litigation-focused practice dedicated to protecting the rights of individuals and businesses before the Rajasthan High Court and Sessions Courts.
          </p>
        </PageContainer>
      </Section>

      {/* Attorney profile */}
      <Section>
        <PageContainer>
          <AttorneyProfile
            name={attorney.name}
            title={attorney.title}
            shortBio={attorney.shortBio}
            fullBio={attorney.fullBio}
            expertiseAreas={attorney.expertiseAreas}
            barAdmissions={attorney.barAdmissions}
            education={attorney.education}
          />
        </PageContainer>
      </Section>

      {/* Firm values */}
      <Section variant="stone">
        <PageContainer>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Our Approach
            </p>
            <h2 className="text-2xl font-semibold text-text-primary mb-8">
              How We Work
            </h2>
            <div className="space-y-6">
              {firmValues.map((v) => (
                <div key={v.label} className="flex items-start gap-4 p-6 bg-surface border border-border rounded-sm">
                  <TrustBadge label={v.label} />
                  <p className="text-sm text-text-secondary leading-relaxed -mt-0.5">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* CTA */}
      <section className="bg-dark-bg text-dark-text">
        <div className="container-legal py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Ready to discuss your case?
            </h2>
            <p className="text-dark-text/70 text-lg mb-8">
              Schedule a consultation and let&apos;s talk about how we can help.
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
