import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { ConsultationForm } from "@/components/forms/ConsultationForm";

export default function ConsultationPage() {
  return (
    <main>
      <Section variant="stone">
        <PageContainer>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            Book a Consultation
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary tracking-tight max-w-2xl">
            Let&apos;s Discuss Your Case
          </h1>
          <p className="mt-4 text-lg text-text-secondary max-w-xl">
            Choose a free 20-minute intro call or a paid 60-minute case review. We&apos;ll follow up to confirm your time.
          </p>
        </PageContainer>
      </Section>

      <Section>
        <PageContainer>
          <div className="max-w-2xl">
            <ConsultationForm />
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
