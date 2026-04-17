import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { AttorneyProfile } from "@/components/team/AttorneyProfile";
import { getTeamMemberBySlug, getAllTeamSlugs } from "@/lib/sanity/queries";
import { JsonLd } from "@/components/seo/JsonLd";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllTeamSlugs().catch(() => []);
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug).catch(() => null);
  const title = member?.seo?.title ?? member?.name ?? "Attorney Profile";
  const description = member?.seo?.description ?? member?.shortBio ?? "";
  return {
    title,
    description,
    alternates: { canonical: `/team/${slug}` },
    openGraph: { title, description, url: `/team/${slug}` },
  };
}

const placeholderAttorneys: Record<string, {
  name: string;
  title: string;
  shortBio: string;
  fullBio: string;
  expertiseAreas: string[];
  barAdmissions: string[];
  education: { degree: string; institution: string; year?: number }[];
}> = {
  "alexandra-mercer": {
    name: "Alexandra Mercer",
    title: "Founder & Principal Attorney",
    shortBio:
      "With over 12 years advising startups and growth-stage companies, Alexandra brings a pragmatic, business-first approach to legal counsel. She has guided clients through seed rounds, Series A and B financings, acquisitions, and complex commercial negotiations.",
    fullBio:
      "Before founding the firm, Alexandra served as in-house counsel at two venture-backed startups and spent four years at a leading Silicon Valley law firm. She has a deep understanding of the pressures founders face and structures her advice to be actionable, not just legally correct. Her clients range from pre-seed founders to Series B companies across SaaS, fintech, and deep tech.",
    expertiseAreas: [
      "Startup Formation",
      "Fundraising & Equity",
      "M&A & Exits",
      "Commercial Contracts",
      "Corporate Governance",
    ],
    barAdmissions: [
      "State Bar of California",
      "State Bar of New York",
    ],
    education: [
      { degree: "J.D.", institution: "Stanford Law School", year: 2011 },
      { degree: "B.A. Economics", institution: "UC Berkeley", year: 2008 },
    ],
  },
  "james-okafor": {
    name: "James Okafor",
    title: "Senior Associate",
    shortBio:
      "James focuses on employment law and IP matters for early-stage companies, helping founders build compliant teams and protect their core technology.",
    fullBio:
      "James brings a technical background to his legal practice, having studied computer science before law school. This gives him a unique ability to understand and advise on software licensing, IP ownership, and technology agreements. He works closely with engineering-led startups on everything from contractor agreements to open-source compliance.",
    expertiseAreas: [
      "Employment Law",
      "IP & Technology",
      "Commercial Contracts",
      "Open Source Compliance",
    ],
    barAdmissions: [
      "State Bar of California",
    ],
    education: [
      { degree: "J.D.", institution: "UCLA School of Law", year: 2016 },
      { degree: "B.S. Computer Science", institution: "USC", year: 2013 },
    ],
  },
};

export default async function AttorneyProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const sanityMember = await getTeamMemberBySlug(slug).catch(() => null);
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
    : placeholderAttorneys[slug] ?? null;

  if (!attorney) notFound();

  return (
    <main>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Person",
        "name": attorney.name,
        "jobTitle": attorney.title,
        "description": attorney.shortBio,
        "url": `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/team/${slug}`,
      }} />
      {/* Breadcrumb */}
      <Section variant="stone">
        <PageContainer>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted mb-6">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/team" className="hover:text-accent transition-colors">Team</Link>
            <span aria-hidden="true">/</span>
            <span className="text-text-secondary">{attorney.name}</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Attorney Profile
          </p>
        </PageContainer>
      </Section>

      {/* Profile */}
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
    </main>
  );
}
