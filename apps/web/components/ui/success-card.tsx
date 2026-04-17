import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessCardProps {
  title?: string;
  message: string;
  className?: string;
}

export function SuccessCard({ title = "Message sent", message, className }: SuccessCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center gap-4 py-12 px-6",
        "border border-border rounded-sm bg-surface",
        className
      )}
      role="status"
    >
      <CheckCircle size={40} className="text-success" aria-hidden="true" />
      <div>
        <p className="font-semibold text-text-primary text-lg mb-1">{title}</p>
        <p className="text-text-secondary text-sm leading-relaxed max-w-sm">{message}</p>
      </div>
    </div>
  );
}
