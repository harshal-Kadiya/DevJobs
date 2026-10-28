
import { useMemo, useState } from "react";
import { motion } from "motion/react";

import { useJobs } from "../../context/JobsContext.jsx";
import useDebounce from "../hooks/useDebounce.js";

import SearchBar from "../../components/jobs/SearchBar.jsx";
import JobFilters from "../../components/jobs/JobFilters.jsx";
import JobList from "../../components/jobs/JobList.jsx";

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

function Home() {
  const { jobs, loading, error } = useJobs();

  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("All");
  const [workMode, setWorkMode] = useState("All");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const debouncedSearch = useDebounce(search, 300);

  // Get unique, valid job categories.
  const categories = useMemo(() => {
    if (!Array.isArray(jobs)) return [];

    return [
      ...new Set(
        jobs
          .map((job) =>
            typeof job?.category === "string"
              ? job.category.trim()
              : ""
          )
          .filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b));
  }, [jobs]);

  // Search, filter, and sort jobs.
  const filteredJobs = useMemo(() => {
    if (!Array.isArray(jobs)) return [];

    const query = debouncedSearch.trim().toLowerCase();

    const result = jobs.filter((job) => {
      if (!job || typeof job !== "object") return false;

      const searchableText = [
        job.title,
        job.company,
        job.location,
        job.category,
        job.type,
        job.workMode,
        ...(Array.isArray(job.tags) ? job.tags : []),
      ]
        .filter((value) => typeof value === "string")
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(query);
      const matchesType =
        jobType === "All" || job.type === jobType;
      const matchesWorkMode =
        workMode === "All" || job.workMode === workMode;
      const matchesCategory =
        category === "All" || job.category === category;

      return (
        matchesSearch &&
        matchesType &&
        matchesWorkMode &&
        matchesCategory
      );
    });

    // Sort a copy to avoid mutating the original jobs array.
    return [...result].sort((a, b) => {
      if (sortBy === "title") {
        return (a.title || "").localeCompare(b.title || "");
      }

      const dateA = Date.parse(a.postedAt || "");
      const dateB = Date.parse(b.postedAt || "");

      const validDateA = Number.isNaN(dateA) ? 0 : dateA;
      const validDateB = Number.isNaN(dateB) ? 0 : dateB;

      return validDateB - validDateA;
    });
  }, [
    jobs,
    debouncedSearch,
    jobType,
    workMode,
    category,
    sortBy,
  ]);

  function clearFilters() {
    setSearch("");
    setJobType("All");
    setWorkMode("All");
    setCategory("All");
    setSortBy("newest");
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-10 text-heading transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">

        {/* Hero section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-10 sm:mb-12"
        >
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm"
          >
            Your next opportunity starts here
          </motion.p>

          <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Find a job that fits your future.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted dark:text-slate-400 sm:text-base">
            Explore opportunities, discover great teams, and find your
            next career move.
          </p>
        </motion.section>

        {/* Search */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="mb-5 rounded-2xl border border-border bg-white p-4 shadow-card transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900 sm:p-5"
        >
          <SearchBar value={search} onChange={setSearch} />
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <JobFilters
            jobType={jobType}
            setJobType={setJobType}
            workMode={workMode}
            setWorkMode={setWorkMode}
            category={category}
            setCategory={setCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            categories={categories}
            onClear={clearFilters}
          />
        </motion.div>

        {/* Results heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="mb-5 flex flex-wrap items-center justify-between gap-2"
        >
          <h2 className="text-lg font-bold sm:text-xl">
            Latest opportunities
          </h2>

          {!loading && !error && (
            <p
              className="text-sm text-muted dark:text-slate-400"
              aria-live="polite"
              aria-atomic="true"
            >
              {filteredJobs.length}{" "}
              {filteredJobs.length === 1 ? "job" : "jobs"} found
            </p>
          )}
        </motion.div>

        {/* Job listings */}
        <JobList
          jobs={filteredJobs}
          loading={loading}
          error={error}
        />
      </div>
    </main>
  );
}

export default Home;
