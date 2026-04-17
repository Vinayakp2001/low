import { Section } from "@/components/layout/Section";
import { PageContainer } from "@/components/layout/PageContainer";

interface Testimonial {
  quote: string;
  clientName: string;
  clientRole?: string;
  clientCompany?: string;
}

const placeholderTestimonials: Testimonial[] = [
  {
    quote: "Alexandra helped us structure our seed round in a way that protected the founders while keeping investors happy. Her advice was clear, fast, and exactly what we needed.",
    clientName: "James T.",
    clientRole: "Co-founder & CEO",
    clientCompany: "Series A SaaS company",
  },
  {
    quote: "We were navigating a complex acquisition and needed counsel who understood both the legal and business sides. She delivered on both counts.",
    clientName: "Priya S.",
    clientRole: "Founder",
    clientCompany: "Acquired fintech startup",
  },
  {
    quote: "Finally, a lawyer who speaks startup. No unnecessary complexity, no inflated bills — just sharp, practical advice when we needed it most.",
    clientName: "Marcus L.",
    clientRole: "CTO & Co-founder",
    clientCompany: "Enterprise software company",
  },
];

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export function TestimonialsSection({ testimonials = placeholderTestimonials }: TestimonialsSectionProps) {
  return (
    <Section variant="stone">
      <PageContainer>
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            Client Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-text-primary tracking-tight">
            What Clients Say
          </h2>
        </div>

        {/* Desktop grid / Mobile scroll */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-surface border border-border rounded-sm p-8 flex flex-col"
            >
              {/* Quote mark */}
              <span className="font-display text-5xl text-accent/20 leading-none mb-4 select-none" aria-hidden="true">
                &ldquo;
              </span>
              <p className="text-text-primary leading-relaxed flex-1 mb-6 text-[0.9375rem]">
                {t.quote}
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-sm text-text-primary">{t.clientName}</p>
                {(t.clientRole || t.clientCompany) && (
                  <p className="text-xs text-text-muted mt-0.5">
                    {[t.clientRole, t.clientCompany].filter(Boolean).join(", ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </Section>
  );
}
