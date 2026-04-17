import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark" | "stone";
  id?: string;
}

export function Section({ children, className, variant = "light", id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "section-padding",
        variant === "dark" && "bg-dark-bg text-dark-text",
        variant === "stone" && "bg-stone-50",
        variant === "light" && "bg-background",
        className
      )}
    >
      {children}
    </section>
  );
}
