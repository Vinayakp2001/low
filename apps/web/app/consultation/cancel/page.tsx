import Link from "next/link";
import { XCircle } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";

export default function ConsultationCancelPage() {
  return (
    <main>
      <Section>
        <PageContainer>
          <div className="max-w-lg mx-auto text-center py-12">
            <XCircle size={48} className="text-text-muted mx-auto mb-6" aria-hidden="true" />
            <h1 className="text-3xl font-semibold text-text-primary tracking-tight mb-3">
              Payment cancelled
            </h1>
            <p className="text-text-secondary leading-relaxed mb-8">
              No charge was made. You can try again whenever you&apos;re ready.
            </p>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 bg-accent text-white font-medium text-sm px-6 py-3 rounded-sm hover:bg-accent-hover transition-colors"
            >
              Try again
            </Link>
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
