import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full border border-border bg-surface px-4 py-3 rounded-sm text-text-primary text-sm",
        "placeholder:text-text-muted",
        "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "min-h-[120px] resize-y transition-colors",
        className
      )}
      {...props}
    />
  );
}
