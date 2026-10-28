
import { forwardRef } from "react";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 disabled:pointer-events-none disabled:opacity-60";

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-dark",

  secondary:
    "border border-border bg-surface text-heading hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",

  outline:
    "border border-border bg-transparent text-heading hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800",

  danger:
    "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",

  ghost:
    "bg-transparent text-heading hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800",
};

const sizes = {
  sm: "min-h-8 px-3 py-1.5 text-xs",
  md: "min-h-10 px-4 py-2.5 text-sm",
  lg: "min-h-12 px-6 py-3 text-base",
};

const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    type = "button",
    className = "",
    disabled = false,
    loading = false,
    fullWidth = false,
    ...props
  },
  ref
) {
  const variantStyles = variants[variant] ?? variants.primary;
  const sizeStyles = sizes[size] ?? sizes.md;

  const classes = [
    baseStyles,
    variantStyles,
    sizeStyles,
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      )}

      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
