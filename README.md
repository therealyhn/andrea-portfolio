# 🎨 Andrea Milenovic - Fashion & Graphic Designer Portfolio

A modern, editorial-style **personal portfolio website** built with **React, Vite, Tailwind CSS, and Sanity CMS** — designed to showcase creative work, professional experience, and personal identity through clean layouts, strong typography, and subtle animations.

The website is fully **CMS-driven**, responsive, and optimized for both desktop and mobile devices, with a strong focus on visual balance and user experience.

---

## ✨ Key Features

### 🖼️ Hero Section
- Fullscreen background image managed via **Sanity CMS**
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
- Fully editable via **Sanity CMS**:
  - Titles
  - Text content
  - Work experience entries
  - Education entries
- Animations triggered **only when the section enters the viewport**

---

### 🎬 Scroll-Triggered Animations
- Subtle, non-intrusive animations
- Powered by **animate.css**
- Triggered using **Intersection Observer**
- Each section animates **only once**
- Improves flow without distracting the user

---

### 🔐 Content Management (Sanity CMS)
All visible content is managed through **Sanity CMS**, including:
- Hero images and typography
- About section text and portrait image
- Work experience data
- Education data

No content is hardcoded — all updates can be made without touching the code.

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
| CMS        | Sanity CMS           |
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
- CMS-driven skill list managed via **Sanity**
- Designed as a clean, minimal section that complements the overall editorial style
- Optimized for both desktop and mobile layouts
- Scroll-triggered entrance animations for a smooth reveal
- Easily extendable with new skills or categories in the future

### 📬 Contact Section (Planned)
- Contact form or direct contact links
- CMS-managed content
- Simple, clean layout consistent with the overall design

---
