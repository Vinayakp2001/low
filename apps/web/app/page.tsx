import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { IntroSection } from "@/components/home/IntroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { AttorneyHighlight } from "@/components/home/AttorneyHighlight";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTABanner } from "@/components/home/CTABanner";
import { ContactSection } from "@/components/home/ContactSection";
import { getHomepage } from "@/lib/sanity/queries";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomepage().catch(() => null);
  return {
    title: data?.seo?.title ?? "Legal Counsel for Founders & Startups",
    description: data?.seo?.description ?? "Strategic legal counsel for entrepreneurs, startups, and growth-stage companies.",
    alternates: { canonical: "/" },
  };
}

export default async function HomePage() {
  const data = await getHomepage().catch(() => null);

  return (
    <main>
      <HeroSection
        headline={data?.heroHeadline}
        subtext={data?.heroSubtext}
        ctaLabel={data?.heroCTA?.label}
        ctaHref={data?.heroCTA?.href}
      />
      <IntroSection text={data?.introText} />
      <ServicesSection
        services={data?.featuredServices?.map((s) => ({
          title: s.title,
          description: s.shortDescription,
          slug: s.slug.current,
        }))}
      />
      <ProcessSection />
      <AttorneyHighlight />
      <TestimonialsSection
        testimonials={data?.featuredTestimonials?.map((t) => ({
          quote: t.quote,
          clientName: t.clientName,
          clientRole: t.clientRole,
          clientCompany: t.clientCompany,
        }))}
      />
      <CTABanner
        headline={data?.ctaBannerHeadline}
        subtext={data?.ctaBannerSubtext}
      />
      <ContactSection />
    </main>
  );
}
