import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Insights",
  description: "Legal insights for founders — practical guidance on startup law, fundraising, employment, and more.",
  alternates: { canonical: "/insights" },
};

const fallbackPosts = [
  { _id: "1", title: "What to Do Immediately After a Car Accident", slug: "after-car-accident", excerpt: "The steps you take in the first 24 hours after an accident can make or break your personal injury claim. Here's what to do — and what to avoid.", publishedAt: "2026-03-15", categories: ["Personal Injury"], author: { name: "R. Sathe", slug: "r-sathe" } },
  { _id: "2", title: "Understanding Your Rights During a Police Stop", slug: "rights-during-police-stop", excerpt: "Knowing your constitutional rights during a traffic stop or arrest can protect you from self-incrimination and unlawful searches.", publishedAt: "2026-02-28", categories: ["Criminal Defense"], author: { name: "R. Sathe", slug: "r-sathe" } },
  { _id: "3", title: "How to Prove Wrongful Termination in California", slug: "wrongful-termination-california", excerpt: "California is an at-will employment state, but that doesn't mean employers can fire you for any reason. Here's what qualifies as wrongful termination.", publishedAt: "2026-02-10", categories: ["Employment Disputes"], author: { name: "M. Chen", slug: "m-chen" } },
  { _id: "4", title: "Child Custody in California: What Courts Actually Consider", slug: "child-custody-california", excerpt: "California courts focus on the best interests of the child — but what does that mean in practice? A breakdown of the key factors judges weigh.", publishedAt: "2026-01-20", categories: ["Family Law"], author: { name: "R. Sathe", slug: "r-sathe" } },
  { _id: "5", title: "When Can You Sue Your Landlord?", slug: "suing-your-landlord", excerpt: "From habitability issues to wrongful eviction, tenants have more legal options than they realize. Here's when litigation makes sense.", publishedAt: "2025-12-18", categories: ["Real Estate Disputes"], author: { name: "M. Chen", slug: "m-chen" } },
  { _id: "6", title: "The Difference Between Mediation and Litigation", slug: "mediation-vs-litigation", excerpt: "Not every dispute needs to go to court. Understanding when to mediate and when to litigate can save time, money, and stress.", publishedAt: "2025-11-30", categories: ["Civil Litigation"], author: { name: "R. Sathe", slug: "r-sathe" } },
];

export default async function InsightsPage() {
  const sanityPosts = await getAllPosts().catch(() => null);
  const posts = sanityPosts?.length
    ? sanityPosts.map((p) => ({
        _id: p._id,
        title: p.title,
        slug: p.slug.current,
        excerpt: p.excerpt,
        publishedAt: p.publishedAt,
        categories: p.categories ?? [],
        author: p.author ? { name: p.author.name, slug: p.author.slug.current } : undefined,
      }))
    : fallbackPosts;
  return (
    <main>
      <Section variant="stone">
        <PageContainer>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            Insights
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary tracking-tight max-w-2xl">
            Legal Insights from RSATHE LAW FIRM
          </h1>
          <p className="mt-4 text-lg text-text-secondary max-w-xl">
            Practical guidance on your rights — written in plain language so you know what to expect before you walk into court.
          </p>
        </PageContainer>
      </Section>

      <Section>
        <PageContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard
                key={post._id}
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                publishedAt={post.publishedAt}
                categories={post.categories}
                author={post.author}
              />
            ))}
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
