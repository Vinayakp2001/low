import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { PageContainer } from "@/components/layout/PageContainer";

interface AttorneyHighlightProps {
  name?: string;
  title?: string;
  bio?: string;
  credentials?: string[];
  profileHref?: string;
  photoUrl?: string;
}

export function AttorneyHighlight({
  name = "Rajneesh Sharma",
  title = "Advocate — Rajasthan High Court, Jaipur",
  bio = "An advocate with 21 years of practice across Rajasthan High Court, Tribunals, DRT, NCLT, GST, Consumer Forum, State Commission, and District & Sessions Court Jaipur. Panel Lawyer of Indian Bank, Punjab National Bank, Union Bank of India, and JVVNL.",
  credentials = [
    "21 Years of Practice",
    "Rajasthan High Court & Tribunals",
    "Panel Lawyer — Indian Bank, PNB, Union Bank, JVVNL",
    "DRT · NCLT · GST · Consumer Forum",
    "RSA-THE LAW FIRM — Founder",
  ],
  profileHref = "/team/rajneesh-sharma",
}: AttorneyHighlightProps) {
  return (
    <Section>
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Photo */}
          <div className="order-2 md:order-1">
            <div className="aspect-[3/4] max-w-sm bg-stone-100 rounded-sm overflow-hidden relative">
              <Image
                src="/attorney.jpeg"
                alt="Rajneesh Sharma — Advocate, Rajasthan High Court"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 384px"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="order-1 md:order-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-5">
              The Attorney
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-text-primary tracking-tight mb-2">
              {name}
            </h2>
            <p className="text-text-secondary mb-6">{title}</p>
            <p className="text-text-secondary leading-relaxed mb-8">{bio}</p>

            {/* Credentials */}
            <ul className="space-y-2 mb-8">
              {credentials.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>

            <Link
              href={profileHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline underline-offset-4"
            >
              Full profile →
            </Link>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}
