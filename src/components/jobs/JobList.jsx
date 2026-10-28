
import { motion, AnimatePresence } from "motion/react";
import JobCard from "./JobCard.jsx";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

function JobList({ jobs = [], loading = false, error = "" }) {
  // Loading skeletons
  if (loading) {
    return (
      <div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        role="status"
        aria-label="Loading job listings"
        aria-busy="true"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            aria-hidden="true"
            className="animate-pulse rounded-2xl border border-border bg-white p-5 dark:border-slate-700 dark:bg-slate-900 sm:p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-700" />
              <div className="h-9 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
            </div>

            <div className="mb-3 h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mb-6 h-4 w-1/2 rounded bg-slate-100 dark:bg-slate-800" />

            <div className="mb-3 h-8 w-2/3 rounded-lg bg-slate-100 dark:bg-slate-800" />
            <div className="mb-3 h-4 w-full rounded bg-slate-100 dark:bg-slate-800" />
            <div className="h-4 w-2/3 rounded bg-slate-100 dark:bg-slate-800" />

            <div className="mt-8 h-5 w-28 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}

        <span className="sr-only">Loading jobs...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        role="alert"
        className="rounded-2xl border border-red-200 bg-red-50 px-4 py-12 text-center dark:border-red-900 dark:bg-red-950/40 sm:px-6"
      >
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl dark:bg-red-900/50"
          aria-hidden="true"
        >
          !
        </div>

        <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">
          Unable to load jobs
        </h3>

        <p className="mx-auto mt-2 max-w-xl break-words text-sm leading-6 text-red-600 dark:text-red-300">
          {error}
        </p>

        <p className="mt-2 text-sm text-red-600 dark:text-red-300">
          Please refresh the page and try again.
        </p>
      </motion.div>
    );
  }

  // Empty state
  if (!Array.isArray(jobs) || jobs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-2xl border border-dashed border-border bg-white px-4 py-16 text-center dark:border-slate-700 dark:bg-slate-900 sm:px-6"
      >
        <div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl dark:bg-slate-800"
          aria-hidden="true"
        >
          🔎
        </div>

        <h3 className="text-lg font-semibold text-heading dark:text-slate-100">
          No jobs found
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted dark:text-slate-400">
          Try another keyword or adjust your filters to discover more
          opportunities.
        </p>
      </motion.div>
    );
  }

  // Animated job listings
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={jobs.map((job) => job.id).join("-")}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Job listings"
      >
        {jobs.map((job) => (
          <motion.div
            key={job.id}
            variants={itemVariants}
            className="min-w-0"
          >
            <JobCard job={job} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

export default JobList;
