import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { AttorneyCard } from "@/components/team/AttorneyCard";
import { AttorneyProfile } from "@/components/team/AttorneyProfile";
import { getAllTeamMembers } from "@/lib/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the attorneys behind the practice — experienced counsel for founders and growing companies.",
  alternates: { canonical: "/team" },
};

const fallbackAttorneys = [
  { _id: "1", name: "R. Sathe", title: "Founder & Lead Trial Attorney", slug: "r-sathe", shortBio: "With over 15 years of courtroom experience, R. Sathe has successfully litigated hundreds of cases across civil, criminal, and family law.", expertiseAreas: ["Civil Litigation", "Criminal Defense", "Family Law", "Personal Injury"], barAdmissions: ["State Bar of California", "U.S. District Court, N.D. Cal."], education: [{ degree: "J.D.", institution: "UC Hastings College of the Law", year: 2008 }, { degree: "B.A. Political Science", institution: "UC Davis", year: 2005 }] },
  { _id: "2", name: "M. Chen", title: "Senior Associate", slug: "m-chen", shortBio: "M. Chen focuses on employment disputes and real estate litigation, representing both plaintiffs and defendants in complex matters.", expertiseAreas: ["Employment Disputes", "Real Estate Disputes", "Civil Litigation"], barAdmissions: ["State Bar of California"], education: [{ degree: "J.D.", institution: "Loyola Law School", year: 2015 }] },
];

export default async function TeamPage() {
  const sanityMembers = await getAllTeamMembers().catch(() => null);
  const attorneys = sanityMembers?.length
    ? sanityMembers.map((m) => ({
        _id: m._id,
        name: m.name,
        title: m.title,
        slug: m.slug.current,
        shortBio: m.shortBio,
        expertiseAreas: m.expertiseAreas ?? [],
        barAdmissions: [],
        education: [],
      }))
    : fallbackAttorneys;

  const isSoloPractitioner = attorneys.length === 1;
  if (isSoloPractitioner) {
    const attorney = attorneys[0];
    return (
      <main>
        <Section variant="stone">
          <PageContainer>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              The Attorney
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold text-text-primary tracking-tight">
              Meet Your Counsel
            </h1>
          </PageContainer>
        </Section>
        <Section>
          <PageContainer>
            <AttorneyProfile
              name={attorney.name}
              title={attorney.title}
              shortBio={attorney.shortBio}
              expertiseAreas={attorney.expertiseAreas}
              barAdmissions={attorney.barAdmissions}
              education={attorney.education}
            />
          </PageContainer>
        </Section>
      </main>
    );
  }

  return (
    <main>
      <Section variant="stone">
        <PageContainer>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            Our Team
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary tracking-tight max-w-2xl">
            Experienced Litigators for Your Case
          </h1>
          <p className="mt-4 text-lg text-text-secondary max-w-xl">
            A focused team of trial attorneys committed to fighting for the best possible outcome.
          </p>
        </PageContainer>
      </Section>

      <Section>
        <PageContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {attorneys.map((attorney) => (
              <AttorneyCard
                key={attorney._id}
                name={attorney.name}
                title={attorney.title}
                slug={attorney.slug}
              />
            ))}
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
