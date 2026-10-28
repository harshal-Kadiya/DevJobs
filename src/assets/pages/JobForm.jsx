
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useJobs } from "../../context/JobsContext.jsx";

const createInitialForm = () => ({
  title: "",
  company: "",
  location: "",
  type: "Full-time",
  workMode: "Remote",
  category: "Engineering",
  experience: "",
  salary: "",
  postedAt: new Date().toISOString().slice(0, 10),
  tags: "",
  description: "",
  requirements: "",
});

function JobForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { jobs, loading, error, addJob, updateJob } = useJobs();

  const isEditMode = Boolean(id);
  const existingJob = isEditMode
    ? jobs.find((job) => String(job.id) === id)
    : null;

  const [form, setForm] = useState(createInitialForm);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formInitialized, setFormInitialized] = useState(!isEditMode);

  useEffect(() => {
    if (!isEditMode || !existingJob) return;

    setForm({
      ...createInitialForm(),
      ...existingJob,
      tags: Array.isArray(existingJob.tags)
        ? existingJob.tags.join(", ")
        : "",
      requirements: Array.isArray(existingJob.requirements)
        ? existingJob.requirements.join("\n")
        : "",
    });

    setErrors({});
    setFormInitialized(true);
  }, [isEditMode, existingJob?.id]);

  const inputClass =
    "w-full min-w-0 rounded-xl border border-border bg-white px-4 py-3 text-sm text-heading outline-none transition-colors placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-blue-400 dark:focus:ring-blue-900/40";

  const labelClass =
    "mb-2 block text-sm font-semibold text-heading dark:text-slate-200";

  const pageClass =
    "min-h-screen bg-surface px-4 py-8 text-heading transition-colors duration-200 dark:bg-slate-950 sm:px-6 lg:px-8";

  const panelClass =
    "rounded-2xl border border-border bg-white p-6 text-center shadow-card dark:border-slate-700 dark:bg-slate-900 sm:p-8";

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSubmitError("");
  }

  function validateForm() {
    const nextErrors = {};

    const requiredFields = [
      ["title", "Job title"],
      ["company", "Company"],
      ["location", "Location"],
      ["category", "Category"],
      ["experience", "Experience"],
      ["salary", "Salary"],
      ["postedAt", "Posted date"],
      ["description", "Job description"],
    ];

    requiredFields.forEach(([field, label]) => {
      if (!String(form[field] ?? "").trim()) {
        nextErrors[field] = `${label} is required.`;
      }
    });

    if (form.postedAt && Number.isNaN(Date.parse(form.postedAt))) {
      nextErrors.postedAt = "Enter a valid posted date.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function renderFieldError(field) {
    if (!errors[field]) return null;

    return (
      <p
        id={`${field}-error`}
        className="mt-1 text-sm text-red-600 dark:text-red-400"
      >
        {errors[field]}
      </p>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      setSubmitError("Please fix the highlighted fields.");
      return;
    }

    const jobData = {
      title: form.title.trim(),
      company: form.company.trim(),
      companyLogo: existingJob?.companyLogo || "",
      location: form.location.trim(),
      type: form.type,
      workMode: form.workMode,
      category: form.category.trim(),
      experience: form.experience.trim(),
      salary: form.salary.trim(),
      postedAt: form.postedAt,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      description: form.description.trim(),
      requirements: form.requirements
        .split("\n")
        .map((requirement) => requirement.trim())
        .filter(Boolean),
    };

    setIsSubmitting(true);

    try {
      if (isEditMode) {
        updateJob(id, jobData);
      } else {
        addJob({
          ...jobData,
          id: `job-${Date.now()}`,
        });
      }

      navigate("/admin", {
        replace: true,
        state: {
          message: isEditMode
            ? "Job updated successfully."
            : "Job added successfully.",
        },
      });
    } catch {
      setSubmitError("Unable to save this job. Please try again.");
      setIsSubmitting(false);
    }
  }

  if (loading || (isEditMode && !formInitialized)) {
    return (
      <main className={pageClass}>
        <div className={`mx-auto max-w-xl ${panelClass}`}>
          <p
            className="font-semibold text-heading dark:text-slate-100"
            role="status"
            aria-live="polite"
          >
            Loading job information...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={pageClass}>
        <div className={`mx-auto max-w-xl ${panelClass}`}>
          <h1 className="text-2xl font-bold text-heading dark:text-slate-100">
            Unable to load jobs
          </h1>

          <p className="mt-3 text-muted dark:text-slate-400">{error}</p>

          <Link
            to="/admin"
            className="mt-6 inline-flex rounded-lg font-semibold text-primary hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Back to dashboard
          </Link>
        </div>
      </main>
    );
  }

  if (isEditMode && !existingJob) {
    return (
      <main className={pageClass}>
        <div className={`mx-auto max-w-xl ${panelClass}`}>
          <h1 className="text-2xl font-bold text-heading dark:text-slate-100">
            Job not found
          </h1>

          <p className="mt-3 text-muted dark:text-slate-400">
            This job may have been removed.
          </p>

          <Link
            to="/admin"
            className="mt-6 inline-flex rounded-lg font-semibold text-primary hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Back to dashboard
          </Link>
        </div>
      </main>
    );
  }

  const basicFields = [
    {
      name: "title",
      label: "Job title",
      placeholder: "e.g. Frontend Developer",
      required: true,
      autoComplete: "off",
    },
    {
      name: "company",
      label: "Company",
      placeholder: "e.g. TechNova",
      required: true,
      autoComplete: "organization",
    },
    {
      name: "location",
      label: "Location",
      placeholder: "e.g. Ahmedabad, Gujarat",
      required: true,
      autoComplete: "off",
    },
    {
      name: "category",
      label: "Category",
      placeholder: "e.g. Engineering",
      required: true,
      autoComplete: "off",
    },
    {
      name: "experience",
      label: "Experience",
      placeholder: "e.g. 1-3 years",
      required: true,
      autoComplete: "off",
    },
    {
      name: "salary",
      label: "Salary",
      placeholder: "e.g. ₹4-8 LPA",
      required: true,
      autoComplete: "off",
    },
  ];

  return (
    <main className={pageClass}>
      <div className="mx-auto max-w-4xl">
        <Link
          to="/admin"
          className="inline-flex rounded-lg text-sm font-semibold text-primary hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          ← Back to dashboard
        </Link>

        <header className="mb-8 mt-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Admin portal
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-heading dark:text-slate-100 sm:text-4xl">
            {isEditMode ? "Edit job" : "Add a new job"}
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-muted dark:text-slate-400">
            Enter accurate job information so candidates can find the right
            opportunity.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          noValidate
          aria-busy={isSubmitting}
          className="space-y-8 rounded-2xl border border-border bg-white p-5 shadow-card dark:border-slate-700 dark:bg-slate-900 sm:p-8"
        >
          {submitError && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
            >
              {submitError}
            </p>
          )}

          {/* Basic Information */}
          <section aria-labelledby="basic-information-heading">
            <h2
              id="basic-information-heading"
              className="mb-5 text-lg font-bold text-heading dark:text-slate-100"
            >
              Basic information
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              {basicFields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className={labelClass}>
                    {field.label}
                    {field.required && (
                      <>
                        {" "}
                        <span aria-hidden="true">*</span>
                      </>
                    )}
                  </label>

                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    required={field.required}
                    aria-invalid={Boolean(errors[field.name])}
                    aria-describedby={
                      errors[field.name] ? `${field.name}-error` : undefined
                    }
                    className={inputClass}
                  />

                  {renderFieldError(field.name)}
                </div>
              ))}

              <div>
                <label htmlFor="type" className={labelClass}>
                  Job type
                </label>

                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>

              <div>
                <label htmlFor="workMode" className={labelClass}>
                  Work mode
                </label>

                <select
                  id="workMode"
                  name="workMode"
                  value={form.workMode}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>On-site</option>
                </select>
              </div>

              <div>
                <label htmlFor="postedAt" className={labelClass}>
                  Posted date <span aria-hidden="true">*</span>
                </label>

                <input
                  id="postedAt"
                  name="postedAt"
                  type="date"
                  value={form.postedAt}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.postedAt)}
                  aria-describedby={
                    errors.postedAt ? "postedAt-error" : undefined
                  }
                  className={inputClass}
                />

                {renderFieldError("postedAt")}
              </div>
            </div>
          </section>

          {/* Job Description */}
          <section aria-labelledby="job-description-heading">
            <h2
              id="job-description-heading"
              className="mb-5 text-lg font-bold text-heading dark:text-slate-100"
            >
              Job description
            </h2>

            <div>
              <label htmlFor="description" className={labelClass}>
                Description <span aria-hidden="true">*</span>
              </label>

              <textarea
                id="description"
                name="description"
                rows={5}
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the role and responsibilities..."
                required
                aria-invalid={Boolean(errors.description)}
                aria-describedby={
                  errors.description ? "description-error" : undefined
                }
                className={`${inputClass} resize-y`}
              />

              {renderFieldError("description")}
            </div>

            <div className="mt-5">
              <label htmlFor="requirements" className={labelClass}>
                Requirements
              </label>

              <textarea
                id="requirements"
                name="requirements"
                rows={4}
                value={form.requirements}
                onChange={handleChange}
                placeholder={"Enter one requirement per line\nReact experience\nJavaScript fundamentals"}
                className={`${inputClass} resize-y`}
              />

              <p className="mt-2 text-xs text-muted dark:text-slate-400">
                Enter each requirement on a separate line.
              </p>
            </div>

            <div className="mt-5">
              <label htmlFor="tags" className={labelClass}>
                Skills and tags
              </label>

              <input
                id="tags"
                name="tags"
                type="text"
                value={form.tags}
                onChange={handleChange}
                placeholder="React, JavaScript, Tailwind CSS"
                className={inputClass}
              />

              <p className="mt-2 text-xs text-muted dark:text-slate-400">
                Separate skills using commas.
              </p>
            </div>
          </section>

          {/* Form Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 dark:border-slate-700 sm:flex-row sm:justify-end">
            <Link
              to="/admin"
              className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-semibold text-heading transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-blue-900"
            >
              {isSubmitting
                ? "Saving..."
                : isEditMode
                  ? "Save changes"
                  : "Create job"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default JobForm;
