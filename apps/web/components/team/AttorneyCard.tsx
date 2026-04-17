import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface AttorneyCardProps {
  name: string;
  title: string;
  slug: string;
  photoUrl?: string;
}

export function AttorneyCard({ name, title, slug, photoUrl }: AttorneyCardProps) {
  return (
    <Link
      href={`/team/${slug}`}
      className="group flex flex-col bg-surface border border-border rounded-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Photo */}
      <div className="aspect-[3/4] bg-stone-100 relative overflow-hidden">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl} alt={name} className="object-cover w-full h-full" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-muted text-sm">
            Photo
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors mb-1">
          {name}
        </h3>
        <p className="text-sm text-text-secondary mb-4 flex-1">{title}</p>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent">
          View profile
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
