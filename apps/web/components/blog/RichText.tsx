import { PortableText, type PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-text-secondary leading-relaxed mb-4">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-text-primary tracking-tight mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-text-primary tracking-tight mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-5 my-6 text-text-secondary italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-5 space-y-2 mb-4 text-text-secondary text-sm leading-relaxed">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-5 space-y-2 mb-4 text-text-secondary text-sm leading-relaxed">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-text-primary">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-accent underline underline-offset-4 hover:text-accent-hover transition-colors"
      >
        {children}
      </a>
    ),
  },
};

interface RichTextProps {
  value: unknown;
}

export function RichText({ value }: RichTextProps) {
  if (!value) return null;
  return (
    <div className="prose-legal">
      <PortableText value={value as Parameters<typeof PortableText>[0]["value"]} components={components} />
    </div>
  );
}
