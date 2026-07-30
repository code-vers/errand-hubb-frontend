// components/ui/Button.tsx
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "animated";
  size?: "sm" | "md" | "lg" | "none";
}

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors";

  const variants = {
    primary:
      "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white",
    outline:
      "border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-orange-50",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
    animated: "btn-uiverse",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-2.5 text-base",
    none: "",
  };

  return (
    <button
      className={cn(
        variant !== "animated" ? baseStyles : "inline-flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}>
      {children}
    </button>
  );
};
