
function JobFilters({
  jobType,
  setJobType,
  workMode,
  setWorkMode,
  category,
  setCategory,
  sortBy,
  setSortBy,
  categories = [],
  onClear,
}) {
  const selectClass =
    "w-full min-w-0 rounded-xl border border-border bg-white px-3 py-3 text-sm text-heading transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-blue-900/40";

  const labelClass =
    "mb-2 block text-sm font-semibold text-heading dark:text-slate-100";

  return (
    <section
      aria-label="Filter and sort jobs"
      className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-white p-4 shadow-card transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900 sm:grid-cols-2 sm:gap-5 sm:p-5 lg:grid-cols-4"
    >
      {/* Job type */}
      <div className="min-w-0">
        <label htmlFor="job-type" className={labelClass}>
          Job type
        </label>

        <select
          id="job-type"
          name="jobType"
          className={selectClass}
          value={jobType}
          onChange={(event) => setJobType(event.target.value)}
        >
          <option value="All">All job types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      {/* Work mode */}
      <div className="min-w-0">
        <label htmlFor="work-mode" className={labelClass}>
          Work mode
        </label>

        <select
          id="work-mode"
          name="workMode"
          className={selectClass}
          value={workMode}
          onChange={(event) => setWorkMode(event.target.value)}
        >
          <option value="All">All work modes</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="On-site">On-site</option>
        </select>
      </div>

      {/* Category */}
      <div className="min-w-0">
        <label htmlFor="category" className={labelClass}>
          Category
        </label>

        <select
          id="category"
          name="category"
          className={selectClass}
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="All">All categories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Sorting */}
      <div className="min-w-0">
        <label htmlFor="sort-by" className={labelClass}>
          Sort by
        </label>

        <select
          id="sort-by"
          name="sortBy"
          className={selectClass}
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="newest">Newest first</option>
          <option value="title">Job title (A–Z)</option>
        </select>
      </div>

      {/* Clear filters */}
      <div className="flex justify-start sm:col-span-2 lg:col-span-4">
        <button
          type="button"
          onClick={onClear}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-border px-4 py-3 text-sm font-semibold text-heading transition-colors hover:border-primary hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 dark:border-slate-700 dark:text-slate-100 dark:hover:border-blue-500 dark:hover:bg-slate-800 dark:focus-visible:ring-blue-900/40 sm:w-auto"
        >
          Clear filters
        </button>
      </div>
    </section>
  );
}

export default JobFilters;
