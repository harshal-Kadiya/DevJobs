
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

function AdminLogin() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      const result = login(trimmedEmail, password);

      if (result.success) {
        const requestedPath = location.state?.from;
        const redirectPath =
          requestedPath &&
          typeof requestedPath.pathname === "string" &&
          requestedPath.pathname.startsWith("/admin") &&
          requestedPath.pathname !== "/admin/login"
            ? `${requestedPath.pathname}${requestedPath.search || ""}${requestedPath.hash || ""}`
            : "/admin";

        navigate(redirectPath, { replace: true });
      } else {
        setError(result.message || "Unable to sign in. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-surface px-4 py-12 transition-colors duration-200 dark:bg-slate-950 sm:px-6">
      <section className="w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-card transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900 sm:p-8">
        <div className="mb-7 text-center">
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl font-bold text-primary dark:bg-blue-950/60 dark:text-blue-300"
            aria-hidden="true"
          >
            D
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-primary">
            Admin portal
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-heading dark:text-slate-100">
            Welcome back
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted dark:text-slate-400">
            Sign in to manage job listings on DevJobs.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-5">
            <label
              htmlFor="admin-email"
              className="mb-2 block text-sm font-semibold text-heading dark:text-slate-100"
            >
              Email address
            </label>

            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              placeholder="admin@devjobs.com"
              required
              aria-invalid={Boolean(error)}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-heading outline-none transition-colors placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-blue-900/40"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="admin-password"
              className="mb-2 block text-sm font-semibold text-heading dark:text-slate-100"
            >
              Password
            </label>

            <div className="flex items-center rounded-xl border border-border bg-white transition-colors focus-within:border-primary focus-within:ring-4 focus-within:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:ring-blue-900/40">
              <input
                id="admin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                placeholder="Enter your password"
                required
                className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 text-sm text-heading outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="shrink-0 rounded-r-xl px-4 py-3 text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-offset-slate-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-blue-900/50"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted dark:text-slate-400">
          Not an admin?{" "}
          <Link
            to="/"
            className="rounded-sm font-semibold text-primary hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Browse jobs
          </Link>
        </p>
      </section>
    </main>
  );
}

export default AdminLogin;
