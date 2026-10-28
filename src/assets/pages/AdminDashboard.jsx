import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useJobs } from "../../context/JobsContext.jsx";

function AdminDashboard() {
  const { logout } = useAuth();
  const {
    jobs,loading,error,deleteJob,resetJobs,
  } = useJobs();

  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [notice, setNotice] = useState("");

  // Show a success message after adding or editing a job.

  useEffect(() => {
    const message = location.state?.message;
    if (!message) return;
    setNotice(message);
    navigate(location.pathname, {
      replace: true,
      state: null,
    });
  }, [location.key, location.pathname, location.state, navigate]);

  // Filter jobs by title, company, location, or category.

  const filteredJobs = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return jobs;
    return jobs.filter((job) =>
      [job.title, job.company, job.location, job.category].some((value) =>
        String(value ?? "").toLowerCase().includes(keyword)
      )
    );

  }, [jobs, search]);
  const categoriesCount = useMemo(
    () => new Set(jobs.map((job) => job.category).filter(Boolean)).size,
    [jobs]

  );

  const isDialogOpen = Boolean(deleteTarget) || showResetConfirm;
  // Close confirmation dialogs using the Escape key.

  useEffect(() => {
    if (!isDialogOpen) return undefined;
    function handleEscape(event) {
      if (event.key !== "Escape") return;

      setDeleteTarget(null);
      setShowResetConfirm(false);
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };

  }, [isDialogOpen]);
  function handleDelete() {
    if (!deleteTarget) return;
    deleteJob(deleteTarget.id);
    setNotice(`${deleteTarget.title} deleted successfully.`);
    setDeleteTarget(null);

  }

  function handleResetJobs() {
    resetJobs();
    setShowResetConfirm(false);
    setDeleteTarget(null);
    setSearch("");
    setNotice("Original job listings restored successfully.");

  }

  function handleLogout() {
    logout();
    navigate("/admin/login", { replace: true });
  }

  const cardClass =
    "rounded-2xl border border-border bg-white shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900";

  const secondaryButtonClass =
    "inline-flex items-center justify-center rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-heading transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900";

  const dialogClass =
    "w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900";

  const dialogTextClass =
    "text-sm leading-6 text-muted dark:text-slate-400";

  return (

    <>

      <motion.main initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="min-h-screen bg-surface px-4 py-8 text-heading transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          {/* Page Header */}

          <motion.header initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }} className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                Administration
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Admin Dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted dark:text-slate-400">
                Manage job listings, update opportunities, and keep your job
                board up to date.
              </p>

            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/admin/jobs/new"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 dark:focus-visible:ring-blue-900/50"
              >
                + Add New Job
              </Link>

              <button
                type="button"
                onClick={() => {
                  setNotice("");
                  setShowResetConfirm(true);
                }}

                disabled={loading || Boolean(error)}

                className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70">
                Reset Jobs
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className={secondaryButtonClass}
              >
                Sign Out
              </button>
            </div>
          </motion.header>

          {/* Success Notification */}

          {notice && (

            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              role="status"

              aria-live="polite"

              className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300"

            >

              <span>{notice}</span>

              <button
                type="button"
                onClick={() => setNotice("")}
                className="rounded px-2 py-1 font-bold hover:bg-green-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 dark:hover:bg-green-900/50"
                aria-label="Dismiss notification"
              >

                ×

              </button>

            </motion.div>
          )}

          {/* Summary Cards */}

          <motion.section
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            aria-label="Job board summary"
            className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"

          >

            <motion.article variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className={`${cardClass} p-5`}>

              <p className="text-sm font-medium text-muted dark:text-slate-400">
                Total Jobs
              </p>

              <p className="mt-3 text-3xl font-bold tabular-nums">
                {jobs.length}
              </p>

              <p className="mt-2 text-sm text-muted dark:text-slate-400">
                Current job listings
              </p>

            </motion.article>

            <motion.article variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className={`${cardClass} p-5`}>

              <p className="text-sm font-medium text-muted dark:text-slate-400">
                Categories
              </p>

              <p className="mt-3 text-3xl font-bold tabular-nums">
                {categoriesCount}
              </p>

              <p className="mt-2 text-sm text-muted dark:text-slate-400">
                Categories represented
              </p>

            </motion.article>

            <motion.article variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className={`${cardClass} p-5 sm:col-span-2 lg:col-span-1`}>

              <p className="text-sm font-medium text-muted dark:text-slate-400">
                Search Results
              </p>

              <p className="mt-3 text-3xl font-bold tabular-nums">
                {filteredJobs.length}
              </p>

              <p className="mt-2 text-sm text-muted dark:text-slate-400">
                Jobs matching your search
              </p>

            </motion.article>
          </motion.section>

          {/* Job Management */}

          <section className={`${cardClass} overflow-hidden`}>
            <div className="border-b border-border p-5 dark:border-slate-700 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h2 className="text-xl font-bold">
                    Manage Job Listings
                  </h2>

                  <p className="mt-1 text-sm text-muted dark:text-slate-400">
                    Search, edit, or remove existing jobs.
                  </p>

                </div>

                <label className="w-full sm:max-w-xs">
                  <span className="sr-only">Search job listings</span>
                  <input
                    type="search"
                    name="admin-job-search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search jobs..."
                    autoComplete="off"
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-heading outline-none transition-colors placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-blue-900/40"
                  />

                </label>
              </div>
            </div>

            {loading ? (
              <div className="p-10 text-center" role="status" aria-live="polite">
                <p className="font-medium">Loading job listings...</p>
              </div>

            ) : error ? (

              <div className="p-10 text-center" role="alert">
                <h3 className="font-semibold">
                  Unable to load job listings
                </h3>

                <p className="mt-2 text-sm text-muted dark:text-slate-400">
                  {error}
                </p>

              </div>

            ) : filteredJobs.length === 0 ? (

              <div className="p-10 text-center">
                <h3 className="text-lg font-semibold">No jobs found</h3>
                <p className="mt-2 text-sm text-muted dark:text-slate-400">
                  Try another search or add a new job listing.
                </p>

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="mt-4 rounded-md font-semibold text-primary hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    Clear search
                  </button>
                )}
              </div>

            ) : (

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <caption className="sr-only">
                    Job listings with their locations, job types, posted dates,
                    and management actions.
                  </caption>

                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-muted dark:bg-slate-800 dark:text-slate-400">
                    <tr>
                      <th scope="col" className="px-6 py-4 font-semibold">
                        Job
                      </th>

                      <th scope="col" className="px-6 py-4 font-semibold">
                        Location
                      </th>

                      <th scope="col" className="px-6 py-4 font-semibold">
                        Job Type
                      </th>

                      <th scope="col" className="px-6 py-4 font-semibold">
                        Posted Date
                      </th>

                      <th scope="col" className="px-6 py-4 text-right font-semibold">
                        Actions
                      </th>

                    </tr>
                  </thead>

                  <tbody className="divide-y divide-border dark:divide-slate-700">
                    {filteredJobs.map((job) => (

                      <motion.tr
                        key={job.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-800/60">

                        <td className="px-6 py-5">

                          <p className="font-semibold text-heading dark:text-slate-100">
                            {job.title}
                          </p>

                          <p className="mt-1 text-xs text-muted dark:text-slate-400">
                            {job.company}
                          </p>

                        </td>

                        <td className="px-6 py-5 text-muted dark:text-slate-400">
                          {job.location || "—"}
                        </td>

                        <td className="px-6 py-5">

                          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary dark:bg-blue-950/60 dark:text-blue-300">

                            {job.type || "—"}

                          </span>

                        </td>

                        <td className="whitespace-nowrap px-6 py-5 text-muted dark:text-slate-400">

                          {job.postedAt || "—"}
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-2">
                            <Link
                              to={`/admin/jobs/${job.id}/edit`}
                              className="rounded-lg border border-border px-3 py-2 text-xs font-semibold transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-700 dark:hover:border-primary">
                              Edit
                            </Link>

                            <button
                              type="button"
                              onClick={() => {
                                setNotice("");
                                setDeleteTarget(job);
                              }}
                              className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40" aria-label={`Delete ${job.title}`}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}

                  </tbody>
                </table>
              </div>
            )}
          </section>

          <p className="mt-5 text-xs leading-5 text-muted dark:text-slate-500">
            Changes are stored in this browser using localStorage. This demo
            does not use a backend database.
          </p>
        </div>
      </motion.main>

      {/* Delete Confirmation Dialog */}

      {deleteTarget && (

        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setDeleteTarget(null);
            }
          }}
        >

          <motion.section
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
            className={dialogClass}>

            <div
              className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl text-red-600 dark:bg-red-950/50 dark:text-red-400"
              aria-hidden="true">
              !
            </div>

            <h2
              id="delete-dialog-title"
              className="mt-4 text-xl font-bold text-heading dark:text-slate-100">
              Delete this job?
            </h2>

            <p
              id="delete-dialog-description"
              className={`mt-2 ${dialogTextClass}`}>
              Are you sure you want to delete{" "}
              <strong className="text-heading dark:text-slate-100">
                {deleteTarget.title}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className={secondaryButtonClass}>
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200">
              Yes, Delete Job
              </button>
            </div>
          </motion.section>
        </div>
      )}

      {/* Reset Jobs Confirmation Dialog */}

      {showResetConfirm && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setShowResetConfirm(false);
            }
          }}
        >

          <motion.section
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="reset-dialog-title"

            aria-describedby="reset-dialog-description"

            className={dialogClass}

          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-xl font-bold text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"

              aria-hidden="true"
            >
              !
            </div>

            <h2
              id="reset-dialog-title"
              className="mt-4 text-xl font-bold text-heading dark:text-slate-100">
              Reset all job listings?
            </h2>

            <p id="reset-dialog-description"
              className={`mt-3 ${dialogTextClass}`}>
              This restores the original jobs from jobs.json and removes jobs
              added through the admin panel. Saved jobs that still exist in
              the original data will remain saved.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className={secondaryButtonClass}>
                Cancel
              </button>

              <button
                type="button"
                onClick={handleResetJobs}
                className="rounded-xl bg-amber-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-200">
                Yes, Reset Jobs
              </button>
            </div>
          </motion.section>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;
