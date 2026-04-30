import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  headline?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function HeroSection({
  headline = "Relentless Advocacy. Proven Results.",
  subtext = "RSA-THE LAW FIRM fights for individuals and businesses in court — from civil disputes and criminal defense to personal injury and family law.",
  ctaLabel = "Request a Consultation",
  ctaHref = "/consultation",
  secondaryLabel = "Our Practice Areas",
  secondaryHref = "/services",
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/hero-bg.jpeg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        aria-hidden="true"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div className="relative z-10 container-legal py-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-6 animate-fade-in-up">
            Strategic Legal Advisory
          </p>

          {/* Headline — display serif */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-white mb-6 animate-fade-in-up-delay-1">
            {headline}
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl mb-10 animate-fade-in-up-delay-2">
            {subtext}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up-delay-3">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center gap-2 bg-accent text-white font-medium px-7 py-3.5 rounded-sm hover:bg-accent-hover transition-colors text-sm"
            >
              {ctaLabel}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white font-medium px-7 py-3.5 rounded-sm hover:border-white hover:text-white transition-colors text-sm"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>

        {/* Decorative rule */}
        <div className="mt-20 w-16 h-px bg-white/20" aria-hidden="true" />
      </div>
    </section>
  );
}
