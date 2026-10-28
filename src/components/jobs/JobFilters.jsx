
import { motion } from "motion/react";

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

  const filterFields = [
    {
      id: "job-type",
      name: "jobType",
      label: "Job type",
      value: jobType,
      onChange: setJobType,
      options: [
        { value: "All", label: "All job types" },
        { value: "Full-time", label: "Full-time" },
        { value: "Part-time", label: "Part-time" },
        { value: "Contract", label: "Contract" },
        { value: "Internship", label: "Internship" },
      ],
    },
    {
      id: "work-mode",
      name: "workMode",
      label: "Work mode",
      value: workMode,
      onChange: setWorkMode,
      options: [
        { value: "All", label: "All work modes" },
        { value: "Remote", label: "Remote" },
        { value: "Hybrid", label: "Hybrid" },
        { value: "On-site", label: "On-site" },
      ],
    },
    {
      id: "category",
      name: "category",
      label: "Category",
      value: category,
      onChange: setCategory,
      options: [
        { value: "All", label: "All categories" },
        ...categories.map((item) => ({
          value: item,
          label: item,
        })),
      ],
    },
    {
      id: "sort-by",
      name: "sortBy",
      label: "Sort by",
      value: sortBy,
      onChange: setSortBy,
      options: [
        { value: "newest", label: "Newest first" },
        { value: "title", label: "Job title (A–Z)" },
      ],
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      aria-label="Filter and sort jobs"
      className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-white p-4 shadow-card transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900 sm:grid-cols-2 sm:gap-5 sm:p-5 lg:grid-cols-4"
    >
      {filterFields.map((field, index) => (
        <motion.div
          key={field.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.25,
            delay: index * 0.05,
            ease: "easeOut",
          }}
          className="min-w-0"
        >
          <label htmlFor={field.id} className={labelClass}>
            {field.label}
          </label>

          <select
            id={field.id}
            name={field.name}
            className={selectClass}
            value={field.value}
            onChange={(event) => field.onChange(event.target.value)}
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </motion.div>
      ))}

      {/* Clear filters */}
      <div className="flex justify-start sm:col-span-2 lg:col-span-4">
        <motion.button
          type="button"
          onClick={onClear}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-border px-4 py-3 text-sm font-semibold text-heading transition-colors hover:border-primary hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 dark:border-slate-700 dark:text-slate-100 dark:hover:border-blue-500 dark:hover:bg-slate-800 dark:focus-visible:ring-blue-900/40 sm:w-auto"
        >
          Clear filters
        </motion.button>
      </div>
    </motion.section>
  );
}

export default JobFilters;
