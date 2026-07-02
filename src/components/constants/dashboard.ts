// constants/dashboard.ts
import type { TaskStatus } from "@/types/dashboard";

export const STATUS_STYLES: Record<
  TaskStatus,
  { bg: string; text: string; border?: string }
> = {
  ASAP: {
    bg: "bg-[var(--color-badge-asap)]",
    text: "text-[var(--color-status-red)]",
  },
  Pending: {
    bg: "bg-[var(--color-badge-pending)]",
    text: "text-[var(--color-status-orange)]",
  },
  Scheduled: {
    bg: "bg-[var(--color-badge-scheduled)]",
    text: "text-[var(--color-status-blue)]",
  },
  Completed: {
    bg: "bg-gray-100",
    text: "text-[var(--color-muted)]",
    border: "border border-gray-200",
  },
} as const;
