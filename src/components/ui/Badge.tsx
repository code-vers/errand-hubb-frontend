// components/ui/Badge.tsx
import { FC } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "asap" | "pending" | "scheduled" | "completed" | "default";
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  asap: "bg-[var(--color-badge-asap)] text-[var(--color-status-red)]",
  pending: "bg-[var(--color-badge-pending)] text-[var(--color-status-orange)]",
  scheduled: "bg-[var(--color-badge-scheduled)] text-[var(--color-status-blue)]",
  completed: "bg-[var(--color-badge-completed)] text-[var(--color-status-green)] border border-[#f5ebd8]",
  default: "bg-surface-dim text-muted",
};

export const Badge: FC<BadgeProps> = ({
  variant = "default",
  children,
  className,
}) => {
  return (
    <span
      className={cn(
        "px-2.5 py-1 text-xs font-semibold rounded-md",
        variantStyles[variant],
        className,
      )}>
      {children}
    </span>
  );
};
