import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { PageContainer } from "@/components/layout/PageContainer";

interface ServiceItem {
  title: string;
  description: string;
  slug: string;
}

const placeholderServices: ServiceItem[] = [
  { title: "Civil Litigation", description: "Breach of contract, business disputes, property claims, and complex civil matters handled with precision.", slug: "civil-litigation" },
  { title: "Criminal Defense", description: "Aggressive defense for criminal charges including NI Act cases — protecting your rights from arrest through trial.", slug: "criminal-defense" },
  { title: "Banking & DRT Cases", description: "Debt Recovery Tribunal (DRT) matters, banking disputes, loan recovery cases, and NPA litigation for banks and borrowers.", slug: "banking-drt" },
  { title: "Consumer Cases", description: "Consumer Forum, State Commission, and NCLT matters — fighting for your rights against deficient services and unfair trade practices.", slug: "consumer-cases" },
  { title: "Family Law", description: "Divorce, child custody, support, and asset division handled with care and strategic clarity.", slug: "family-law" },
  { title: "GST & Tribunal Matters", description: "GST disputes, tribunal appearances, and regulatory matters handled before relevant authorities in Rajasthan.", slug: "gst-tribunal" },
];

interface ServicesSectionProps {
  services?: ServiceItem[];
}

export function ServicesSection({ services = placeholderServices }: ServicesSectionProps) {
  return (
    <Section>
      <PageContainer>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Practice Areas
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-text-primary tracking-tight">
              How We Can Help
            </h2>
          </div>
          <Link
            href="/services"
            className="text-sm font-medium text-accent hover:underline underline-offset-4 shrink-0"
          >
            All services →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group bg-surface p-8 hover:bg-stone-50 transition-colors"
            >
              <h3 className="font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                {service.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                Learn more
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </PageContainer>
    </Section>
  );
}
