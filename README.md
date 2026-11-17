# 🎨 Andrea Milenovic - Fashion & Graphic Designer Portfolio

A modern, editorial-style **personal portfolio website** built with **React, Vite, Tailwind CSS, and Maestro CMS** — designed to showcase creative work, professional experience, and personal identity through clean layouts, strong typography, and subtle animations.

The website is fully **CMS-driven**, responsive, and optimized for both desktop and mobile devices, with a strong focus on visual balance and user experience.

---

## ✨ Key Features

### 🖼️ Hero Section
- Cut-out figure from **Maestro CMS** (the site's own figure when none is set)
- Custom typography overlay:
  - **Curved text on desktop**
  - **Simplified flat text on mobile**
- Custom **burger navigation** (desktop & mobile)
- Elegant animated **scroll indicator**
- Smooth entrance animations using **animate.css**

---

### 👤 About Section
- Carefully structured three-column desktop layout:
  - **Left**: Title, description, call-to-action buttons
  - **Center**: Portrait image inside a decorative frame (desktop only)
  - **Right**: Work experience and education
- Mobile-first redesign:
  - Centered layout
  - Decorative image hidden for clarity
  - Clean visual separators between content blocks
- Titles, text, work experience and education in `src/data/aboutData.js`
- Animations triggered **only when the section enters the viewport**

---

### 🎬 Scroll-Triggered Animations
- Subtle, non-intrusive animations
- Powered by **animate.css**
- Triggered using **Intersection Observer**
- Each section animates **only once**
- Improves flow without distracting the user

---

### 🔐 Content Management (Maestro CMS)
The site's Maestro CMS instance (`cms.andreamilenovic.com`) holds:
- the hero and Why Me cut-out figures (optional; the site shows its own figures otherwise)
- the Work categories with their images and films, in site order

The rest of the text lives in `src/data/`. Content is read when the site is built (see Build).

Production since 17.11.2026: the CMS instance is `https://cms.andreamilenovic.com/dashboard/` (Maestro CMS card MS.12b), and its public API `https://cms.andreamilenovic.com/dashboard/api/v1` is the repository variable `CMS_API_URL`.

---

## 🧱 Build

- `CMS_API_URL` is the public API of the CMS instance, in production `https://cms.andreamilenovic.com/dashboard/api/v1`: locally in `.env.local` (a local test instance: `CMS_API_URL=http://127.0.0.1:8095/dashboard/api/v1`), in GitHub a repository variable.
- `npm run dev` and `npm run build` first run `scripts/fetch-cms-content.mjs`, which writes `src/generated/cms-content.json`. Without `CMS_API_URL`, without a response or without the published entries the build stops.
- `npm run build`: content from the CMS, `vite build`, then `scripts/prerender.mjs` (headless Chrome) writes the snapshot and `404.html` into `dist/`. The browser loads only the images and films, from the CMS public media.
- `VITE_WEB3FORMS_KEY` (contact form): `.env` locally, a repository secret in GitHub.
- Deploy: `.github/workflows/deploy.yml`, FTPS to the hosting. It runs on every push to `main`, after every CMS publish (the instance starts it through `workflow_dispatch`, `siteBuild` in the instance `client.php`) and manually from the Actions tab; runs queue instead of cancelling each other. It needs the repository variables `CMS_API_URL` (https) and `FTP_SERVER_DIR`, and the secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` and `VITE_WEB3FORMS_KEY`.
- The `sanity/` folder (the former Studio) stays until the switch in production.

---

### 📱 Responsive Design
- Mobile-first approach
- Desktop layouts include decorative/editorial elements
- Clean stacking and spacing on mobile devices
- Touch-friendly buttons and navigation
- Typography scales smoothly across breakpoints

---

## 🧠 Technical Highlights

- **Custom `useInView` hook** for scroll-based animations
- Clean component-based architecture
- Separation of UI components and content logic
- Performance-focused (no unnecessary re-renders or animation loops)
- Maintainable and scalable structure for future sections

---

## 🛠️ Tech Stack

| Layer      | Technology           |
|------------|----------------------|
| Frontend   | React + Vite         |
| Styling    | Tailwind CSS         |
| CMS        | Maestro CMS (read at build time) |
| Animations | animate.css          |
| Utilities  | Intersection Observer API |

---

## 🚧 Upcoming Sections

### 🖼️ Portfolio Section (In Progress)
- CMS-driven portfolio items
- Image and video support
- Editorial / grid-based layout
- Hover interactions
- Responsive behavior
- Optional detailed project view or modal

### 🧠 Skills Section
- Clear overview of professional skills and technologies
- CMS-driven skill list
- Designed as a clean, minimal section that complements the overall editorial style
- Optimized for both desktop and mobile layouts
- Scroll-triggered entrance animations for a smooth reveal
- Easily extendable with new skills or categories in the future

### 📬 Contact Section (Planned)
- Contact form or direct contact links
- CMS-managed content
- Simple, clean layout consistent with the overall design

---
