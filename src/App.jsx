
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./assets/pages/Home.jsx";
import JobDetails from "./assets/pages/JobDetails.jsx";
import SavedJobs from "./assets/pages/SavedJobs.jsx";
import AdminLogin from "./assets/pages/AdminLogin.jsx";
import AdminDashboard from "./assets/pages/AdminDashboard.jsx";
import JobForm from "./assets/pages/JobForm.jsx";

import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";

function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center bg-surface px-4 py-12 text-center text-heading dark:bg-slate-950 dark:text-slate-100">
      <h1 className="text-3xl font-bold sm:text-4xl">
        404 - Page not found
      </h1>

      <p className="mt-3 text-sm text-muted dark:text-slate-400">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        Back to home
      </Link>
    </main>
  );
}

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-heading">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected admin routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/jobs/new" element={<JobForm />} />
            <Route path="/admin/jobs/:id/edit" element={<JobForm />} />
          </Route>

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
