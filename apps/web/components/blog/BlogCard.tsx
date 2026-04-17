import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  categories?: string[];
  author?: { name: string; slug: string };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogCard({ title, slug, excerpt, publishedAt, categories = [], author }: BlogCardProps) {
  return (
    <Link
      href={`/insights/${slug}`}
      className="group flex flex-col bg-surface border border-border rounded-sm p-8 hover:shadow-md transition-shadow"
    >
      {/* Category tags */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <span
              key={cat}
              className="text-xs font-medium px-2.5 py-1 bg-stone-100 text-text-secondary rounded-sm border border-border"
            >
              {cat}
            </span>
          ))}
        </div>
      )}

      <h3 className="font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors leading-snug">
        {title}
      </h3>

      <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-6">
        {excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-text-muted">
          {author && <span>{author.name} · </span>}
          <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent">
          Read more
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
