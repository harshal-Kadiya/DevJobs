
import { useEffect, useId } from "react";

function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  closeOnOverlay = true,
  showCloseButton = true,
  className = "",
}) {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  const modalSize = sizes[size] || sizes.md;

  function handleOverlayClick(event) {
    if (closeOnOverlay && event.target === event.currentTarget) {
      onClose?.();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={handleOverlayClick}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        className={`relative my-auto w-full ${modalSize} rounded-2xl border border-border bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-6 ${className}`}
      >
        {(title || showCloseButton) && (
          <header className="mb-5 flex items-start justify-between gap-4">
            <div className="min-w-0">
              {title && (
                <h2
                  id={titleId}
                  className="text-xl font-bold text-heading dark:text-slate-100"
                >
                  {title}
                </h2>
              )}

              {description && (
                <p
                  id={descriptionId}
                  className="mt-2 text-sm leading-6 text-muted dark:text-slate-400"
                >
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xl text-muted transition-colors hover:bg-slate-100 hover:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            )}
          </header>
        )}

        {children}
      </section>
    </div>
  );
}

export default Modal;
