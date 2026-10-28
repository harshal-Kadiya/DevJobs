# DevJobs — Frontend Job Board Application

## Project Overview

DevJobs is a responsive frontend job board application built using React and Tailwind CSS. It allows users to explore job opportunities, search and filter listings, save jobs, and view job details.

The application also includes an admin panel for managing job listings. All data is handled on the frontend using a local JSON file and browser localStorage. No backend or database is used.

## Features

### Job Listing
- Browse job listings with reusable job cards.
- Search jobs by keyword with debounce.
- Filter jobs by job type, work mode, and category.
- Sort jobs by newest or job title.
- View detailed job information.
- Save and remove saved jobs.
- View saved jobs on a separate page.

### Admin Panel
- Mock admin login and protected routes.
- View jobs in the admin dashboard.
- Add, edit, and delete job listings.
- Validate form inputs.
- Confirm before deleting jobs.
- Reset jobs to the original JSON data.

### Additional Features
- Responsive design for mobile, tablet, and desktop.
- Dark mode.
- Loading, error, and empty states.
- Browser localStorage persistence.
- Reusable React components.

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- React
- Vite
- Tailwind CSS
- React Router
- React Context API
- Browser localStorage

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone or download the project.
2. Open the project folder in a terminal.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal.

### Production Build

Run the following command to create a production build:

```bash
npm run build
```

## Mock Admin Login

Use the following demonstration credentials:

- Email: admin@devjobs.com
- Password: Admin@123

Note: This is mock frontend authentication for assessment purposes only. It is not real security.

## Data Persistence

- Initial job data is loaded from `public/data/jobs.json`.
- Admin changes are stored in browser localStorage.
- Saved jobs, login state, and theme preference persist in localStorage.
- The admin panel provides an option to restore the original job data.

## Screenshots

Add screenshots of the Home page and Admin Dashboard in this section.

## Project Scope

This is a frontend-only assessment project. It does not use a backend, database, or custom API.
