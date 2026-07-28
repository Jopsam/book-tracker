# Oasis Book Tracking

A premium, highly responsive web application built for tracking reading progress and managing personal book libraries. This project serves as a technical test submission, showcasing modern frontend architecture, robust state management, and an eye for exceptional UX/UI design.

## Features

- **Authentication:** Secure user signup and signin powered by Supabase.
- **Book Management:** Full CRUD (Create, Read, Update, Delete) capabilities for your personal library. Track statuses (To Read, Reading, Finished), ratings, and personal notes.
- **Internationalization (i18n):** Complete English and Spanish support using `react-i18next`, with a dynamic Language Switcher available across all routes.
- **Responsive Premium UI:** Built with vanilla CSS tokens, featuring a Glassmorphism design system, dark mode aesthetics, and a Bento grid layout that adapts seamlessly to mobile and desktop screens.
- **Fluid Animations:** Micro-interactions and page transitions powered by Framer Motion to enhance the overall user experience.
- **Custom Notifications:** A bespoke toast notification system (`sileo`) for elegant, non-intrusive user feedback.

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jopsam/book-tracker.git
   cd book-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## Architecture & Tech Stack

| Technology | Purpose |
|------------|---------|
| **React + Vite** | Core framework and ultra-fast build tooling. |
| **Supabase** | Backend-as-a-Service for Authentication and PostgreSQL database. |
| **react-i18next** | Robust internationalization and language state management. |
| **Framer Motion** | Declarative animations and layout transitions. |
| **Lucide React** | Clean, consistent SVG iconography. |

## Design Philosophy

This project prioritizes **Visual Excellence** and **Cognitive Ease**. Rather than relying on heavy CSS frameworks like Tailwind by default, it uses a custom, token-based Vanilla CSS design system (`index.css`) to maintain absolute control over the UI layer. The layout heavily utilizes CSS Grid, prioritizing a mobile-first approach that gracefully expands into a 12-column Bento Grid on larger viewports.

## Next steps

- [ ] Add sorting by rating and progress.
- [ ] Implement a rich-text editor for personal reviews.
- [ ] Add integration with public book APIs (e.g., Google Books) to auto-fill metadata.
