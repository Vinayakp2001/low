import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTABannerProps {
  headline?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function CTABanner({
  headline = "Ready to fight for your rights?",
  subtext = "Schedule a consultation and let's discuss your case.",
  ctaLabel = "Book a Consultation",
  ctaHref = "/consultation",
}: CTABannerProps) {
  return (
    <section className="bg-dark-bg text-dark-text">
      <div className="container-legal py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            {headline}
          </h2>
          <p className="text-dark-text/70 text-lg mb-8">{subtext}</p>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 bg-dark-text text-dark-bg font-medium px-7 py-3.5 rounded-sm hover:bg-dark-text/90 transition-colors text-sm"
          >
            {ctaLabel}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
