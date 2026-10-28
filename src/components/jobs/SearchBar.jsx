
import { motion, AnimatePresence } from "motion/react";

function SearchBar({ value, onChange }) {
  const hasValue = value.length > 0;

  return (
    <div className="w-full min-w-0">
      <label
        htmlFor="job-search"
        className="mb-2 block text-sm font-semibold text-heading dark:text-slate-100"
      >
        Search jobs
      </label>

      <motion.div
        whileFocusWithin={{ scale: 1.005 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 shadow-sm transition-colors duration-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:ring-blue-900/40"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5 shrink-0 text-muted dark:text-slate-400"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m16 16 4 4" />
        </svg>

        <input
          id="job-search"
          name="search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Job title, company, location or skills..."
          autoComplete="off"
          aria-describedby="job-search-hint"
          className="w-full min-w-0 bg-transparent text-sm text-heading outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
        />

        <AnimatePresence initial={false}>
          {hasValue && (
            <motion.button
              key="clear-search"
              type="button"
              aria-label="Clear search"
              title="Clear search"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
              onClick={() => onChange("")}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-slate-100 hover:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
              >
                <path
                  d="m18 6-12 12M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <p id="job-search-hint" className="sr-only">
        Search by job title, company, location, or skills.
      </p>
    </div>
  );
}

export default SearchBar;
