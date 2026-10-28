
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import JobCard from "../../components/jobs/JobCard.jsx";
import { useJobs } from "../../context/JobsContext.jsx";

function SavedJobs() {
  const {
    jobs,
    loading,
    error,
    savedIds,
    clearSavedJobs,
  } = useJobs();

  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const savedJobs = useMemo(() => {
    if (!Array.isArray(jobs) || !Array.isArray(savedIds)) {
      return [];
    }

    const savedIdSet = new Set(savedIds.map((id) => String(id)));

    return jobs.filter((job) => savedIdSet.has(String(job.id)));
  }, [jobs, savedIds]);

  useEffect(() => {
    if (!showClearConfirm) return undefined;

    function handleEscape(event) {
      if (event.key === "Escape") {
        setShowClearConfirm(false);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showClearConfirm]);

  function handleClearSavedJobs() {
    clearSavedJobs();
    setShowClearConfirm(false);
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-10 text-heading transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-primary transition-colors hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span aria-hidden="true">←</span>
          Back to jobs
        </Link>

        <header className="mb-8 mt-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Your career shortlist
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Saved Jobs
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-muted dark:text-slate-400">
            Keep track of opportunities that interest you and revisit them
            whenever you are ready.
          </p>
        </header>

        {loading ? (
          <div
            className="rounded-2xl border border-border bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900"
            role="status"
            aria-live="polite"
          >
            <p className="font-medium text-heading dark:text-slate-100">
              Loading your saved jobs...
            </p>

            <p className="mt-2 text-sm text-muted dark:text-slate-400">
              Please wait while we load the opportunities.
            </p>
          </div>
        ) : error ? (
          <div
            className="rounded-2xl border border-red-200 bg-white p-6 text-center dark:border-red-900 dark:bg-slate-900 sm:p-8"
            role="alert"
          >
            <h2 className="text-lg font-semibold text-heading dark:text-slate-100">
              Unable to load saved jobs
            </h2>

            <p className="mt-2 break-words text-sm text-muted dark:text-slate-400">
              {error}
            </p>

            <Link
              to="/"
              className="mt-5 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Back to job listings
            </Link>
          </div>
        ) : savedJobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl dark:bg-blue-950/60"
              aria-hidden="true"
            >
              ♡
            </div>

            <h2 className="mt-5 text-xl font-bold text-heading dark:text-slate-100">
              No saved jobs yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted dark:text-slate-400">
              Found an interesting opportunity? Save it using the bookmark
              button on a job card, and it will appear here.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 dark:focus-visible:ring-blue-900/50"
            >
              Explore jobs
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p
                className="text-sm text-muted dark:text-slate-400"
                aria-live="polite"
              >
                <span className="font-semibold text-heading dark:text-slate-100">
                  {savedJobs.length}
                </span>{" "}
                saved {savedJobs.length === 1 ? "job" : "jobs"}
              </p>

              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="self-start rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40 sm:self-auto"
              >
                Clear saved jobs
              </button>
            </div>

            <section
              aria-label="Your saved job listings"
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {savedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </section>
          </>
        )}
      </div>

      {showClearConfirm && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowClearConfirm(false);
            }
          }}
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="clear-saved-title"
            aria-describedby="clear-saved-description"
            className="w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl font-bold text-red-600 dark:bg-red-950/50 dark:text-red-400"
              aria-hidden="true"
            >
              !
            </div>

            <h2
              id="clear-saved-title"
              className="mt-4 text-xl font-bold text-heading dark:text-slate-100"
            >
              Clear all saved jobs?
            </h2>

            <p
              id="clear-saved-description"
              className="mt-3 text-sm leading-6 text-muted dark:text-slate-400"
            >
              This will remove all jobs from your saved list. The original job
              listings will not be deleted, and you can save them again later.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                autoFocus
                onClick={() => setShowClearConfirm(false)}
                className="rounded-xl border border-border px-4 py-3 text-sm font-semibold transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleClearSavedJobs}
                className="rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200"
              >
                Yes, Clear All
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default SavedJobs;
