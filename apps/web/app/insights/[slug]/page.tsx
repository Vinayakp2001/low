import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { RichText } from "@/components/blog/RichText";
import { getPostBySlug, getAllPostSlugs } from "@/lib/sanity/queries";
import { JsonLd } from "@/components/seo/JsonLd";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs().catch(() => []);
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  const title = post?.seo?.title ?? post?.title ?? "Insight";
  const description = post?.seo?.description ?? post?.excerpt ?? "";
  return {
    title,
    description,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: { title, description, url: `/insights/${slug}`, type: "article" },
  };
}

interface ArticleData {
  title: string;
  excerpt: string;
  publishedAt: string;
  categories: string[];
  author: { name: string; slug: string; title: string };
  body: { _type: string; style?: string; children?: { text: string }[] }[];
}

const placeholderArticles: Record<string, ArticleData> = {
  "term-sheet-guide": {
    title: "What Every Founder Should Know Before Signing a Term Sheet",
    excerpt: "Term sheets set the framework for your entire deal. Here's what the key provisions actually mean and which ones are worth negotiating.",
    publishedAt: "2026-03-15",
    categories: ["Fundraising", "Equity"],
    author: { name: "Alexandra Mercer", slug: "alexandra-mercer", title: "Founder & Principal Attorney" },
    body: [
      { _type: "block", style: "normal", children: [{ text: "A term sheet is a non-binding document that outlines the key terms of an investment. While non-binding, it sets the framework for the definitive agreements that follow — and most terms end up in the final deal with little change." }] },
      { _type: "block", style: "h2", children: [{ text: "Valuation: Pre-Money vs. Post-Money" }] },
      { _type: "block", style: "normal", children: [{ text: "The valuation cap on a SAFE or the pre-money valuation on a priced round determines how much of your company you're giving up. A $10M pre-money valuation with a $2M raise means investors get 16.7% of the company post-investment." }] },
      { _type: "block", style: "h2", children: [{ text: "Liquidation Preferences" }] },
      { _type: "block", style: "normal", children: [{ text: "A 1x non-participating liquidation preference is standard and founder-friendly. It means investors get their money back first in a liquidation event, but don't double-dip on the remaining proceeds. Watch out for participating preferred or multiples above 1x." }] },
      { _type: "block", style: "h2", children: [{ text: "Pro-Rata Rights" }] },
      { _type: "block", style: "normal", children: [{ text: "Pro-rata rights give investors the right to participate in future rounds to maintain their ownership percentage. These are standard for lead investors but can create complications if granted too broadly to small check writers." }] },
      { _type: "block", style: "h2", children: [{ text: "What to Negotiate" }] },
      { _type: "block", style: "normal", children: [{ text: "Most seed-stage terms are fairly standardized. The areas worth pushing back on are: board composition, information rights scope, and any terms that deviate from the YC standard SAFE or NVCA model documents. A few hours of legal review before signing can save significant headaches later." }] },
    ],
  },
  "llc-vs-ccorp": {
    title: "LLC vs. C-Corp: The Definitive Guide for Startup Founders",
    excerpt: "Choosing the wrong entity type early on can cost you later. We break down the tradeoffs so you can make the right call from day one.",
    publishedAt: "2026-02-28",
    categories: ["Startup Formation"],
    author: { name: "Alexandra Mercer", slug: "alexandra-mercer", title: "Founder & Principal Attorney" },
    body: [
      { _type: "block", style: "normal", children: [{ text: "The entity type you choose at formation has long-term implications for fundraising, taxation, and exit. For most venture-backed startups, the answer is clear: Delaware C-Corp. But understanding why helps you make a confident decision." }] },
      { _type: "block", style: "h2", children: [{ text: "Why VCs Require C-Corps" }] },
      { _type: "block", style: "normal", children: [{ text: "Institutional investors — VCs, most angels, and accelerators — are structured to invest in C-Corps. Many VC funds are legally prohibited from investing in pass-through entities like LLCs due to their own fund structure and tax obligations." }] },
      { _type: "block", style: "h2", children: [{ text: "When an LLC Makes Sense" }] },
      { _type: "block", style: "normal", children: [{ text: "If you're building a lifestyle business, a professional services firm, or a company you don't plan to raise institutional capital for, an LLC offers simpler governance and pass-through taxation. The flexibility of an LLC operating agreement can also be useful for complex ownership structures." }] },
      { _type: "block", style: "h2", children: [{ text: "Converting Later Is Possible, But Costly" }] },
      { _type: "block", style: "normal", children: [{ text: "You can convert an LLC to a C-Corp, but it's a taxable event and involves legal fees, restructuring, and potential complications with existing members. Getting it right from day one is almost always cheaper." }] },
    ],
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function InsightArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const sanityPost = await getPostBySlug(slug).catch(() => null);

  let article: ArticleData | null = null;

  if (sanityPost) {
    article = {
      title: sanityPost.title,
      excerpt: sanityPost.excerpt,
      publishedAt: sanityPost.publishedAt,
      categories: sanityPost.categories ?? [],
      author: sanityPost.author
        ? { name: sanityPost.author.name, slug: sanityPost.author.slug.current, title: "" }
        : { name: "The Legal Team", slug: "", title: "" },
      body: sanityPost.body as ArticleData["body"],
    };
  } else {
    article = placeholderArticles[slug] ?? null;
  }

  if (!article) notFound();

  return (
    <main>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.excerpt,
        "datePublished": article.publishedAt,
        "author": { "@type": "Person", "name": article.author.name },
        "url": `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/insights/${slug}`,
      }} />
      {/* Hero */}
      <Section variant="stone">
        <PageContainer>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted mb-6">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/insights" className="hover:text-accent transition-colors">Insights</Link>
            <span aria-hidden="true">/</span>
            <span className="text-text-secondary truncate max-w-[200px]">{article.title}</span>
          </nav>

          {/* Categories */}
          {article.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-xs font-medium px-2.5 py-1 bg-white text-text-secondary rounded-sm border border-border"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl md:text-5xl font-semibold text-text-primary tracking-tight max-w-3xl mb-6">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-text-muted">
            <Link href={`/team/${article.author.slug}`} className="font-medium text-text-secondary hover:text-accent transition-colors">
              {article.author.name}
            </Link>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          </div>
        </PageContainer>
      </Section>

      {/* Article body */}
      <Section>
        <PageContainer>
          <div className="max-w-2xl">
            <p className="text-lg text-text-secondary leading-relaxed mb-8 font-medium">
              {article.excerpt}
            </p>
            <RichText value={article.body} />
          </div>
        </PageContainer>
      </Section>

      {/* End-of-article CTA */}
      <Section variant="stone">
        <PageContainer>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Get Legal Counsel
            </p>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Have questions about your specific situation?
            </h2>
            <p className="text-text-secondary mb-6">
              Schedule a consultation and get practical, actionable advice tailored to your business.
            </p>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 bg-accent text-white font-medium text-sm px-6 py-3 rounded-sm hover:bg-accent-hover transition-colors"
            >
              Book a Consultation
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
