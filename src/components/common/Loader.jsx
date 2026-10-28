
function Loader({
  label = "Loading...",
  size = "md",
  fullScreen = false,
  className = "",
}) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-12 w-12 border-4",
  };

  const spinnerSize = sizes[size] || sizes.md;

  const content = (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      role="status"
      aria-live="polite"
    >
      <span
        aria-hidden="true"
        className={`animate-spin rounded-full border-primary border-r-transparent ${spinnerSize}`}
      />

      {label && (
        <span className="text-sm font-medium text-muted dark:text-slate-400">
          {label}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-4 dark:bg-slate-950">
        {content}
      </div>
    );
  }

  return content;
}

export default Loader;
