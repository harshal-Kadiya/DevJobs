
const baseStyles =
  "inline-flex max-w-full items-center justify-center rounded-full px-3 py-1 text-xs font-semibold leading-5";

const variants = {
  default:
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",

  primary:
    "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",

  success:
    "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",

  warning:
    "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",

  danger:
    "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",

  outline:
    "border border-border bg-transparent text-muted dark:border-slate-600 dark:text-slate-300",
};

function Badge({
  children,
  variant = "default",
  className = "",
  ...props
}) {
  const variantStyles = variants[variant] ?? variants.default;

  const classes = [baseStyles, variantStyles, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

export default Badge;
