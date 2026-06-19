"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const base =
      "relative inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-200 select-none overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95";

    const variants = {
      primary:
        "bg-gold-gradient text-background hover:shadow-gold-strong hover:-translate-y-0.5",
      secondary:
        "bg-surface-2 text-foreground border border-border hover:border-gold/40 hover:bg-surface hover:-translate-y-0.5",
      ghost:
        "text-muted hover:text-foreground hover:bg-surface-2",
      outline:
        "border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold hover:-translate-y-0.5",
    };

    const sizes = {
      sm: "text-sm px-4 py-2",
      md: "text-base px-6 py-3",
      lg: "text-lg px-8 py-4",
    };

    return (
      <button
        ref={ref}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          (disabled || loading) ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center bg-inherit">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </span>
        )}
        <span className={cn(loading && "opacity-0")}>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
