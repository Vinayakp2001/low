import { ShieldCheck } from "lucide-react";

interface TrustBadgeProps {
  label: string;
}

export function TrustBadge({ label }: TrustBadgeProps) {
  return (
    <div className="flex items-start gap-2.5 text-sm text-text-secondary">
      <ShieldCheck size={16} className="text-accent shrink-0 mt-0.5" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
