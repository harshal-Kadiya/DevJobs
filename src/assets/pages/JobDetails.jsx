
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";

import { useJobs } from "../../context/JobsContext.jsx";

function JobDetails() {
  const { id } = useParams();

  const {
    jobs,
    loading,
    error,
    toggleSavedJob,
    isJobSaved,
  } = useJobs();

  const job = Array.isArray(jobs)
    ? jobs.find((item) => String(item.id) === id)
    : null;

  if (loading) {
    return (
      <main className="min-h-[60vh] bg-surface px-4 py-16 dark:bg-slate-950 sm:px-6 lg:px-8">
        <p
          className="mx-auto max-w-4xl text-center text-muted dark:text-slate-400"
          role="status"
          aria-live="polite"
        >
          Loading job details...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-[60vh] bg-surface px-4 py-16 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div
          role="alert"
          className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-white p-6 text-center dark:border-red-900 dark:bg-slate-900 sm:p-8"
        >
          <h1 className="text-xl font-bold text-heading dark:text-slate-100">
            Unable to load job details
          </h1>

          <p className="mt-3 break-words text-muted dark:text-slate-400">
            {error}
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg font-semibold text-primary transition-colors hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Back to jobs
          </Link>
        </div>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-[60vh] bg-surface px-4 py-16 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-white p-6 text-center shadow-card dark:border-slate-700 dark:bg-slate-900 sm:p-8">
          <h1 className="text-2xl font-bold text-heading dark:text-slate-100">
            Job not found
          </h1>

          <p className="mt-3 text-muted dark:text-slate-400">
            This job may have been removed or the link may be incorrect.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Browse all jobs
          </Link>
        </div>
      </main>
    );
  }

  const saved = isJobSaved(job.id);
  const title = job.title || "Untitled position";
  const company = job.company || "Company not specified";

  const requirements = Array.isArray(job.requirements)
    ? job.requirements
    : [];

  const tags = Array.isArray(job.tags) ? job.tags : [];

  function handleSaveJob() {
    toggleSavedJob(job.id);
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-8 text-heading transition-colors duration-200 dark:bg-slate-950 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-slate-400"
        >
          <span aria-hidden="true">←</span>
          Back to jobs
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mt-6 rounded-2xl border border-border bg-white p-5 shadow-card transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900 sm:p-8 lg:p-10"
        >
          {/* Job Header */}
          <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl font-bold text-primary dark:bg-blue-950/60 dark:text-blue-300 sm:h-16 sm:w-16"
                aria-hidden="true"
              >
                {company.trim().charAt(0).toUpperCase() || "?"}
              </div>

              <div className="min-w-0">
                <h1 className="break-words text-2xl font-bold leading-tight text-heading dark:text-slate-100 sm:text-3xl">
                  {title}
                </h1>

                <p className="mt-2 break-words text-base font-medium text-muted dark:text-slate-400">
                  {company}
                </p>

                {job.location && (
                  <p className="mt-2 break-words text-sm text-muted dark:text-slate-400">
                    {job.location}
                  </p>
                )}
              </div>
            </div>

            <span className="w-fit max-w-full rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-primary dark:bg-blue-950/60 dark:text-blue-300">
              {job.type || "Job"}
            </span>
          </header>

          {/* Job Overview */}
          <section
            aria-label="Job overview"
            className="mt-8 grid gap-5 border-y border-border py-6 dark:border-slate-700 sm:grid-cols-2 lg:grid-cols-3"
          >
            <div>
              <p className="text-sm text-muted dark:text-slate-400">
                Work mode
              </p>

              <p className="mt-1 break-words font-semibold text-heading dark:text-slate-100">
                {job.workMode || "Not specified"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted dark:text-slate-400">
                Experience
              </p>

              <p className="mt-1 break-words font-semibold text-heading dark:text-slate-100">
                {job.experience || "Not specified"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted dark:text-slate-400">
                Salary
              </p>

              <p className="mt-1 break-words font-semibold text-heading dark:text-slate-100">
                {job.salary || "Not specified"}
              </p>
            </div>
          </section>

          {/* Description */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-heading dark:text-slate-100">
              Job description
            </h2>

            <p className="mt-3 whitespace-pre-line break-words leading-7 text-muted dark:text-slate-400">
              {job.description || "No description available."}
            </p>
          </section>

          {/* Requirements */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-heading dark:text-slate-100">
              Requirements
            </h2>

            {requirements.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {requirements.map((requirement, index) => (
                  <li
                    key={`${index}-${requirement}`}
                    className="flex items-start gap-3 break-words leading-6 text-muted dark:text-slate-400"
                  >
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary"
                      aria-hidden="true"
                    />

                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-muted dark:text-slate-400">
                No requirements listed.
              </p>
            )}
          </section>

          {/* Skills and Technologies */}
          {tags.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-heading dark:text-slate-100">
                Skills and technologies
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="max-w-full break-words rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-primary dark:bg-blue-950/60 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 dark:border-slate-700 sm:flex-row sm:flex-wrap">
            <motion.button
              type="button"
              onClick={handleSaveJob}
              aria-pressed={saved}
              aria-label={
                saved
                  ? `Remove ${title} from saved jobs`
                  : `Save ${title}`
              }
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 ${
                saved
                  ? "border border-red-200 text-red-600 hover:bg-red-50 focus-visible:ring-red-100 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40 dark:focus-visible:ring-red-900/50"
                  : "bg-primary text-white hover:bg-primary-dark focus-visible:ring-blue-100 dark:focus-visible:ring-blue-900/50"
              }`}
            >
              {saved ? "♥ Remove Saved Job" : "♡ Save Job"}
            </motion.button>

            <Link
              to="/saved"
              className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-semibold text-heading transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus-visible:ring-blue-900/50"
            >
              View saved jobs
            </Link>
          </div>
        </motion.article>
      </div>
    </main>
  );
}

export default JobDetails;
