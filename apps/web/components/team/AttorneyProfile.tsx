import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { TrustBadge } from "./TrustBadge";

interface Education {
  degree: string;
  institution: string;
  year?: number;
}

interface AttorneyProfileProps {
  name: string;
  title: string;
  shortBio: string;
  fullBio?: string;
  photoUrl?: string;
  expertiseAreas?: string[];
  barAdmissions?: string[];
  education?: Education[];
}

export function AttorneyProfile({
  name,
  title,
  shortBio,
  fullBio,
  photoUrl,
  expertiseAreas = [],
  barAdmissions = [],
  education = [],
}: AttorneyProfileProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
      {/* Sticky photo + credentials sidebar */}
      <div className="lg:sticky lg:top-24 space-y-6">
        {/* Photo */}
        <div className="aspect-[3/4] bg-stone-100 rounded-sm overflow-hidden relative">
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoUrl} alt={name} className="object-cover w-full h-full" />
          ) : (
            <Image
              src="/attorney.jpeg"
              alt={name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 320px"
            />
          )}
        </div>

        {/* Bar admissions */}
        {barAdmissions.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Bar Admissions
            </p>
            <div className="space-y-2">
              {barAdmissions.map((bar) => (
                <TrustBadge key={bar} label={bar} />
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Education
            </p>
            <div className="space-y-3">
              {education.map((edu, i) => (
                <div key={i} className="text-sm">
                  <p className="font-medium text-text-primary">{edu.degree}</p>
                  <p className="text-text-secondary">
                    {edu.institution}{edu.year ? `, ${edu.year}` : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main bio content */}
      <div className="lg:col-span-2 space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary tracking-tight mb-2">
            {name}
          </h1>
          <p className="text-lg text-text-secondary">{title}</p>
        </div>

        {/* Bio */}
        <div>
          <p className="text-text-secondary leading-relaxed text-lg">{shortBio}</p>
          {fullBio && (
            <p className="text-text-secondary leading-relaxed mt-4">{fullBio}</p>
          )}
        </div>

        {/* Expertise areas */}
        {expertiseAreas.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-4">Areas of Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {expertiseAreas.map((area) => (
                <span
                  key={area}
                  className="text-xs font-medium px-3 py-1.5 bg-stone-100 text-text-secondary rounded-sm border border-border"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="pt-4 border-t border-border">
          <p className="text-text-secondary mb-4">
            Ready to work together? Schedule a consultation to discuss your legal needs.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 bg-accent text-white font-medium text-sm px-6 py-3 rounded-sm hover:bg-accent-hover transition-colors"
          >
            Book a Consultation
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
