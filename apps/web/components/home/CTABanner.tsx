import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

interface CTABannerProps {
  headline?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function CTABanner({
  headline = "Ready to Fight for Your Rights?",
  subtext = "Schedule a consultation and let's discuss your case. Our attorneys are ready to advocate for you.",
  ctaLabel = "Book a Consultation",
  ctaHref = "/consultation",
}: CTABannerProps) {
  return (
    <section className="relative bg-[#0f1923] text-white overflow-hidden">
      {/* Decorative accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

      <div className="container-legal py-24">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
              Take the First Step
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight tracking-tight text-white mb-4">
              {headline}
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">{subtext}</p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-4 shrink-0">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center gap-2 bg-amber-500 text-black font-semibold px-8 py-4 rounded-sm hover:bg-amber-400 transition-colors text-sm"
            >
              {ctaLabel}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-medium px-8 py-4 rounded-sm hover:border-white/50 transition-colors text-sm"
            >
              <Phone size={15} aria-hidden="true" />
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
