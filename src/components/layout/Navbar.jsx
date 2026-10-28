
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

import { useTheme } from "../../context/ThemeContext.jsx";
import Container from "./Container.jsx";

const navLinkClass = ({ isActive }) =>
  `rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-900 ${
    isActive
      ? "text-primary"
      : "text-slate-600 hover:text-primary dark:text-slate-300"
  }`;

const menuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.25,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const linkVariants = {
  hidden: {
    opacity: 0,
    y: -6,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

function Navbar() {
  const { toggleTheme, isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const navigationLinks = (
    <>
      <NavLink
        to="/"
        end
        onClick={() => setIsMenuOpen(false)}
        className={navLinkClass}
      >
        Find Jobs
      </NavLink>

      <NavLink
        to="/saved"
        onClick={() => setIsMenuOpen(false)}
        className={navLinkClass}
      >
        Saved Jobs
      </NavLink>

      <NavLink
        to="/admin/login"
        onClick={() => setIsMenuOpen(false)}
        className={({ isActive }) =>
          `rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
            isActive
              ? "bg-primary-dark"
              : "bg-primary hover:bg-primary-dark"
          }`
        }
      >
        Admin
      </NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
      <Container size="xl">
        <nav
          className="flex min-h-16 items-center justify-between gap-4 py-3"
          aria-label="Main navigation"
        >
          {/* Animated logo */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-900"
              aria-label="DevJobs home"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white"
                aria-hidden="true"
              >
                D
              </span>

              <span className="text-lg font-bold tracking-tight text-heading dark:text-slate-100 sm:text-xl">
                Dev<span className="text-primary">Jobs</span>
              </span>
            </Link>
          </motion.div>

          <div className="ml-auto flex items-center gap-3 sm:gap-5">
            {/* Desktop navigation */}
            <div className="hidden items-center gap-5 md:flex">
              {navigationLinks}
            </div>

            {/* Theme toggle */}
            <motion.button
              type="button"
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-white transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900"
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              title={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              <motion.img
                key={isDark ? "sun" : "moon"}
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                src={isDark ? "/images/sun.svg" : "/images/moon.png"}
                alt=""
                aria-hidden="true"
                className="h-5 w-5 object-contain"
              />
            </motion.button>

            {/* Mobile menu toggle */}
            <motion.button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.15 }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-xl text-heading transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800 md:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              <motion.span
                key={isMenuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.15 }}
                aria-hidden="true"
              >
                {isMenuOpen ? "×" : "☰"}
              </motion.span>
            </motion.button>
          </div>
        </nav>

        {/* Animated mobile navigation */}
        <AnimatePresence initial={false}>
          {isMenuOpen && (
            <motion.div
              id="mobile-navigation"
              key="mobile-navigation"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-start gap-4 overflow-hidden border-t border-border py-4 dark:border-slate-700 md:hidden"
            >
              {[
                { to: "/", label: "Find Jobs", end: true },
                { to: "/saved", label: "Saved Jobs" },
                { to: "/admin/login", label: "Admin", isButton: true },
              ].map((item) => (
                <motion.div
                  key={item.to}
                  variants={linkVariants}
                  className="w-full"
                >
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      item.isButton
                        ? `inline-flex rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            isActive
                              ? "bg-primary-dark"
                              : "bg-primary hover:bg-primary-dark"
                          }`
                        : `${navLinkClass({ isActive })} inline-flex py-1`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}

export default Navbar;
