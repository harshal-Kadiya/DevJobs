
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getStorageItem,
  setStorageItem,
  STORAGE_KEYS,
} from "../assets/utils/storage.js";

const JobsContext = createContext(null);

function getSavedJobIds() {
  const ids = getStorageItem(STORAGE_KEYS.SAVED_JOBS, []);
  return Array.isArray(ids) ? ids : [];
}

function mergeJobs(originalJobs, storedJobs) {
  if (!Array.isArray(storedJobs)) {
    return originalJobs;
  }

  const storedJobsMap = new Map(
    storedJobs.map((job) => [String(job.id), job])
  );

  const mergedJobs = originalJobs.map((originalJob) => {
    const storedJob = storedJobsMap.get(String(originalJob.id));

    if (!storedJob) {
      return originalJob;
    }

    return {
      ...originalJob,
      ...storedJob,
      id: originalJob.id,
    };
  });

  const originalIds = new Set(
    originalJobs.map((job) => String(job.id))
  );

  const adminAddedJobs = storedJobs.filter(
    (job) => !originalIds.has(String(job.id))
  );

  return [...adminAddedJobs, ...mergedJobs];
}

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [originalJobs, setOriginalJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedIds, setSavedIds] = useState(getSavedJobIds);

  useEffect(() => {
    let isMounted = true;

    async function fetchJobs() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/data/jobs.json");

        if (!response.ok) {
          throw new Error("Failed to load original jobs data.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid jobs data.");
        }

        if (!isMounted) return;

        setOriginalJobs(data);

        const storedJobs = getStorageItem(
          STORAGE_KEYS.ADMIN_JOBS,
          null
        );

        setJobs(mergeJobs(data, storedJobs));
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while loading jobs."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (loading || error) return;

    const saved = setStorageItem(
      STORAGE_KEYS.ADMIN_JOBS,
      jobs
    );

    if (!saved) {
      setError(
        "Unable to save jobs in browser storage. Please check your browser storage settings."
      );
    }
  }, [jobs, loading, error]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.SAVED_JOBS, savedIds);
  }, [savedIds]);

  function addJob(job) {
    setJobs((previousJobs) => [job, ...previousJobs]);
  }

  function updateJob(jobId, updatedJob) {
    setJobs((previousJobs) =>
      previousJobs.map((job) =>
        String(job.id) === String(jobId)
          ? { ...job, ...updatedJob, id: job.id }
          : job
      )
    );
  }

  function deleteJob(jobId) {
    setJobs((previousJobs) =>
      previousJobs.filter(
        (job) => String(job.id) !== String(jobId)
      )
    );

    setSavedIds((previousIds) =>
      previousIds.filter(
        (id) => String(id) !== String(jobId)
      )
    );
  }

  function resetJobs() {
    setJobs(originalJobs);

    setSavedIds((previousIds) =>
      previousIds.filter((id) =>
        originalJobs.some(
          (job) => String(job.id) === String(id)
        )
      )
    );
  }

  function clearSavedJobs() {
    setSavedIds([]);
  }

  function toggleSavedJob(jobId) {
    setSavedIds((previousIds) =>
      previousIds.some((id) => String(id) === String(jobId))
        ? previousIds.filter(
            (id) => String(id) !== String(jobId)
          )
        : [...previousIds, jobId]
    );
  }

  function isJobSaved(jobId) {
    return savedIds.some((id) => String(id) === String(jobId));
  }

  const value = {
    jobs,
    originalJobs,
    loading,
    error,
    savedIds,
    toggleSavedJob,
    isJobSaved,
    addJob,
    updateJob,
    deleteJob,
    resetJobs,
    clearSavedJobs,
  };

  return (
    <JobsContext.Provider value={value}>
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobsContext);

  if (!context) {
    throw new Error("useJobs must be used inside JobsProvider.");
  }

  return context;
}
