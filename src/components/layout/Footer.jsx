
import { Link } from "react-router-dom";
import Container from "./Container.jsx";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-white dark:border-slate-700 dark:bg-slate-900">
      <Container size="xl">
        <div className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-sm">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="DevJobs home"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-white"
                aria-hidden="true"
              >
                D
              </span>

              <span className="text-lg font-bold tracking-tight text-heading dark:text-slate-100">
                Dev<span className="text-primary">Jobs</span>
              </span>
            </Link>

            <p className="mt-3 text-sm leading-6 text-muted dark:text-slate-400">
              Find your next opportunity and take the next step in your
              development career.
            </p>
          </div>

          <nav
            className="flex flex-wrap items-center gap-x-5 gap-y-3"
            aria-label="Footer navigation"
          >
            <Link
              to="/"
              className="text-sm text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-slate-300"
            >
              Find Jobs
            </Link>

            <Link
              to="/saved"
              className="text-sm text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-slate-300"
            >
              Saved Jobs
            </Link>

            <Link
              to="/admin/login"
              className="text-sm text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-slate-300"
            >
              Admin
            </Link>
          </nav>
        </div>

        <div className="border-t border-border py-4 dark:border-slate-700">
          <p className="text-center text-xs text-muted dark:text-slate-400 sm:text-left">
            © {currentYear} DevJobs. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
