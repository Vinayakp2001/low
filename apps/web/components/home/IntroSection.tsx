import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { PageContainer } from "@/components/layout/PageContainer";

interface IntroSectionProps {
  text?: string;
  learnMoreHref?: string;
}

export function IntroSection({
  text = "RSATHE LAW FIRM is a litigation-focused practice dedicated to protecting the rights of individuals and businesses. We bring courtroom experience, strategic thinking, and relentless preparation to every case we take on.",
  learnMoreHref = "/about",
}: IntroSectionProps) {
  return (
    <Section variant="stone">
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-5">
              About the Practice
            </p>
            <p className="text-2xl md:text-3xl font-semibold text-text-primary leading-snug tracking-tight mb-6">
              {text}
            </p>
            <Link
              href={learnMoreHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline underline-offset-4"
            >
              Learn more about our approach
            </Link>
          </div>

          {/* Logo mark */}
          <div className="hidden md:flex items-center justify-center">
            <Image
              src="/logo-wood.png"
              alt="RSA The Law Firm — Rajneesh Sharma Associates"
              width={380}
              height={380}
              className="w-full max-w-[380px] h-auto object-contain rounded-sm"
            />
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}
