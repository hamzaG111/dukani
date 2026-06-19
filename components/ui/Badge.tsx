import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "green" | "default";
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    gold: "bg-gold/10 text-gold border border-gold/30",
    green: "bg-emerald/30 text-green-400 border border-green-500/30",
    default: "bg-surface-2 text-muted border border-border",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
