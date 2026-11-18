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
- Deploy: `.github/workflows/deploy.yml`, FTPS to the hosting. It runs on every push to `main`, after every CMS publish (the instance starts it through `workflow_dispatch`, `siteBuild` in the instance `client.php`) and manually from the Actions tab; runs queue instead of cancelling each other. It needs the repository variables `CMS_API_URL` (https) and `FTP_SERVER_DIR`, and the secrets `FTP_SERVER`, `FTP_USERNAME` and `FTP_PASSWORD`. After the upload it checks the contact form on the live site (see below).

## Contact form
The form (`src/hooks/useContactForm.js`, sending in `src/lib/api/submitContact.js`) posts JSON to `/api/contact.php` on the same domain. The endpoint sends the message through the SMTP mailbox of the site domain with PHPMailer; there is no `mail()` fallback, so a broken config or SMTP shows up as HTTP 500 or 502, never as a silent success. The contract is `maestro-cms/docs/plans/kontakt-forma/plan.md` §2.

- `public/api/contact.php`: only the site block (domain, allowed origins, form fields).
- `public/api/lib/kontakt.php`: all logic (origin, method, JSON body up to 16 KiB, field validation, honeypot `website`, limit of 5 messages per hour per IP and 100 per UTC day, sending). The same file is used by every Maestro client site.
- `public/api/.htaccess`: denies everything in `api/` except `contact.php` (`vendor/` and `lib/` return 403).
- Config: `kontakt-config.php` in the folder above `public_html` (`/home/<account>/domains/andreamilenovic.com/`), permissions 600 or 640, created by hand on the server from the template `server/kontakt-config.example.php`. It is never in git, never in `public/` and the FTP upload never sees it. The endpoint creates `kontakt-stanje/` next to it (counters with an HMAC of the IP address, never the address itself, and `greske.log` without visitor data); an hourly cron job of the hosting account deletes stale counters.
- PHPMailer: `server/composer.json` and `server/composer.lock`; `server/vendor/` is not in git. The workflow runs `composer validate --strict`, `composer audit --locked` (fails on an advisory) and `composer install --no-dev`, then copies `server/vendor` into `dist/api/vendor`.
- Live check in `deploy.yml` (step `Provera forme na sajtu`): an empty POST must return 422 (config, vendor and origin in place, no email is sent) and `api/vendor/autoload.php` and `api/lib/kontakt.php` must return 403; requests are repeated only on a bare 307 or 000 from the Hostinger CDN.

Local test (20 cases, PHP built-in server and Mailpit, no config in the repository):
```
composer install --working-dir=server
docker run -d --name kf06-mailpit -p 127.0.0.1:1025:1025 -p 127.0.0.1:8025:8025 axllent/mailpit:v1.32.0
PHP_BIN=C:/xampp/php/php.exe MAILPIT_URL=http://127.0.0.1:8025 node server/tests/kontakt-test.mjs
docker rm -f kf06-mailpit
```
The test builds a temporary `<base>` outside the repository (copy of `public/api` plus `server/vendor`, a config for Mailpit on 127.0.0.1:1025), runs `php -S 127.0.0.1:8099` and prints `N passed, M failed`. Site specific data is in `server/tests/primer.json`. `KONTAKT_KEEP=1` leaves the PHP server running and prints `<base>` and the PID. `php -S` ignores `.htaccess`, so the 403 for `api/vendor/` and `api/lib/` is proven only on the live site.

## Before the CMS (Sanity)
Until the switch on 17.11.2026 the site read its content from Sanity. The Sanity Studio (`sanity/`), the import map (`cms/sanity-map.json`) and the film data for the import (`cms/sanity-asset-meta.json` and `cms/posters/`) were removed from the repository after the switch. The way back is commit `93a82de`, the last one that reads Sanity, built and uploaded the way the site was published before the switch, while the Sanity project still exists (the owner decides when it is shut down); the DNS name `cms.andreamilenovic.com` does not get in the way.

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
