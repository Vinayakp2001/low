import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";

export default function ConsultationSuccessPage() {
  return (
    <main>
      <Section>
        <PageContainer>
          <div className="max-w-lg mx-auto text-center py-12">
            <CheckCircle size={48} className="text-success mx-auto mb-6" aria-hidden="true" />
            <h1 className="text-3xl font-semibold text-text-primary tracking-tight mb-3">
              Payment confirmed
            </h1>
            <p className="text-text-secondary leading-relaxed mb-8">
              Your consultation has been booked. You&apos;ll receive a confirmation email shortly with calendar details and next steps.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-accent text-white font-medium text-sm px-6 py-3 rounded-sm hover:bg-accent-hover transition-colors"
            >
              Back to home
            </Link>
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
