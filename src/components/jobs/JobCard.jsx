
import { Link } from "react-router-dom";
import { useJobs } from "../../context/JobsContext.jsx";

function JobCard({ job }) {
  const { isJobSaved, toggleSavedJob } = useJobs();

  const saved = isJobSaved(job.id);
  const companyInitial =
    job.company?.trim()?.charAt(0)?.toUpperCase() || "?";

  const title = job.title || "Untitled position";
  const tags = Array.isArray(job.tags) ? job.tags : [];

  return (
    <article className="flex h-full min-w-0 flex-col rounded-2xl border border-border bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-lg motion-safe:hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900 sm:p-6">
      {/* Company and Job Type */}
      <div className="mb-5 flex items-start justify-between gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-primary dark:bg-blue-950/60 dark:text-blue-300"
          aria-hidden="true"
        >
          {companyInitial}
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <span className="max-w-28 truncate rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300 sm:max-w-none">
            {job.type || "Job"}
          </span>

          <button
            type="button"
            onClick={() => toggleSavedJob(job.id)}
            aria-pressed={saved}
            aria-label={
              saved
                ? `Remove ${title} from saved jobs`
                : `Save ${title}`
            }
            title={saved ? "Remove saved job" : "Save job"}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-4 ${
              saved
                ? "border-blue-200 bg-blue-50 text-primary focus-visible:ring-blue-100 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 dark:focus-visible:ring-blue-900/50"
                : "border-border text-slate-500 hover:bg-slate-50 hover:text-primary focus-visible:ring-blue-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-300 dark:focus-visible:ring-blue-900/50"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill={saved ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-4-6 4V4.75Z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Job Information */}
      <h2 className="break-words text-lg font-bold leading-snug text-heading dark:text-slate-100">
        {title}
      </h2>

      <p className="mt-1 break-words text-sm font-medium text-muted dark:text-slate-400">
        {job.company || "Company not specified"}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-sm text-muted dark:text-slate-400">
        {job.location && (
          <span className="max-w-full break-words rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800">
            {job.location}
          </span>
        )}

        {job.workMode && (
          <span className="max-w-full break-words rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800">
            {job.workMode}
          </span>
        )}
      </div>

      {job.salary && (
        <p className="mt-4 break-words text-sm font-semibold text-heading dark:text-slate-100">
          {job.salary}
        </p>
      )}

      {/* Skills and Tags */}
      {tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="max-w-full break-words rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-primary dark:bg-blue-950/60 dark:text-blue-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Job Details Link */}
      <div className="mt-auto pt-6">
        <Link
          to={`/jobs/${job.id}`}
          aria-label={`View details for ${title}`}
          className="inline-flex items-center gap-2 rounded-lg font-semibold text-primary transition-colors hover:text-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 dark:focus-visible:ring-blue-900/50"
        >
          View details
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export default JobCard;
