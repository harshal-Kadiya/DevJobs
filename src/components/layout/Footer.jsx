
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Container from "./Container.jsx";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-white transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900">
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-col gap-8 py-9 sm:flex-row sm:items-center sm:justify-between sm:py-10"
        >
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="DevJobs home"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-bold text-white transition-transform duration-200 group-hover:scale-105"
                aria-hidden="true"
              >
                D
              </span>

              <span className="text-xl font-bold tracking-tight text-heading dark:text-slate-100">
                Dev<span className="text-primary">Jobs</span>
              </span>
            </Link>

            <p className="mt-3 text-sm leading-6 text-muted dark:text-slate-400">
              Find your next opportunity and take the next step in your
              development career.
            </p>
          </div>

          {/* Navigation */}
          <nav
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
            aria-label="Footer navigation"
          >
            {[
              { label: "Find Jobs", to: "/" },
              { label: "Saved Jobs", to: "/saved" },
              { label: "Admin", to: "/admin/login" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-sm font-medium text-muted transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-slate-300 dark:hover:text-blue-400"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-border py-5 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-muted dark:text-slate-400">
            © {currentYear} DevJobs. All rights reserved.
          </p>

          <motion.button
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="self-start rounded-lg border border-border px-3 py-2 text-xs font-semibold text-heading transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-500 sm:self-auto"
          >
            ↑ Back to top
          </motion.button>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
