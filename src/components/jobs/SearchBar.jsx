
function SearchBar({ value, onChange }) {
  return (
    <div className="w-full min-w-0">
      <label
        htmlFor="job-search"
        className="mb-2 block text-sm font-semibold text-heading dark:text-slate-100"
      >
        Search jobs
      </label>

      <div className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 shadow-sm transition-colors focus-within:border-primary focus-within:ring-4 focus-within:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:ring-blue-900/40">
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
      </div>

      <p id="job-search-hint" className="sr-only">
        Search by job title, company, location, or skills.
      </p>
    </div>
  );
}

export default SearchBar;
