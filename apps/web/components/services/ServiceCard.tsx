import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  slug: string;
}

export function ServiceCard({ title, description, slug }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group flex flex-col bg-surface border border-border rounded-sm p-8 hover:shadow-md transition-shadow"
    >
      <h3 className="font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-6">
        {description}
      </p>
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent">
        Learn more
        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </span>
    </Link>
  );
}
