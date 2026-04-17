import { Section } from "@/components/layout/Section";
import { PageContainer } from "@/components/layout/PageContainer";

const steps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "We start with a focused conversation to understand your business, your goals, and the legal challenges you're facing.",
  },
  {
    number: "02",
    title: "Strategic Assessment",
    description: "We map out the legal landscape specific to your situation and present a clear, prioritized plan of action.",
  },
  {
    number: "03",
    title: "Execution",
    description: "We handle the legal work — drafting, negotiating, and advising — with precision and without unnecessary complexity.",
  },
  {
    number: "04",
    title: "Ongoing Support",
    description: "As your business grows, we stay close — available for questions, reviews, and proactive legal guidance.",
  },
];

export function ProcessSection() {
  return (
    <Section variant="stone">
      <PageContainer>
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            How We Work
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-text-primary tracking-tight max-w-md">
            A Clear Process. No Surprises.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-5 left-full w-full h-px bg-border -translate-x-4 z-0"
                  aria-hidden="true"
                />
              )}
              <div className="relative z-10">
                <span className="font-display text-4xl font-bold text-border select-none">
                  {step.number}
                </span>
                <h3 className="font-semibold text-text-primary mt-3 mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </Section>
  );
}
