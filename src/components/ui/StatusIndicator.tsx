"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";

interface StatusIndicatorProps {
  status: "online" | "offline";
  className?: string;
}

const StatusIndicator: FC<StatusIndicatorProps> = ({
  status,
  className,
}) => {
  return (
    <div
      className={cn(
        "absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 rounded-full",
        status === "online"
          ? "bg-success border-background"
          : "bg-gray-400 border-background",
        className,
      )}
      aria-label={`${status} status indicator`}
    />
  );
};

export default StatusIndicator;
