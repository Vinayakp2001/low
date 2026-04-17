import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full border border-border bg-surface px-4 py-3 rounded-sm text-text-primary text-sm",
        "placeholder:text-text-muted",
        "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "transition-colors",
        className
      )}
      {...props}
    />
  );
}
