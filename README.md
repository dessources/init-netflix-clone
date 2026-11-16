# Netflix Clone - Workshop Authentication & APIs

A modern React Netflix clone adapted specifically as a hands-on workshop project to teach **Authentication flows** and **API consumption** in modern React applications.

---

## 🚀 Features & Teaching Topics

- **Authentication System**:
  - Registration & Login dialogs with form validation.
  - JWT / bearer token storage & session persistence via `localStorage`.
  - Conditional rendering: Unauthorized app (`<UnauthApp />`) vs. Authorized app (`<AuthApp />`).
  - Auth context and custom hooks (`useAuth()`, `useClientNetflix()`).
  - Simulated local backend authentication endpoints via [Mock Service Worker (MSW)](https://mswjs.io/).
- **API Consumption & Data Management**:
  - Movie & TV Series discovery and search via The Movie Database (TMDB) API.
  - Server state caching, background refetching, and mutations with **React Query**.
  - Custom data fetching hooks (`useMovie`, `useBookmark`, `useMovieFilter`).
  - Dynamic route parameters and detail pages with **React Router v6**.
- **Modern UI & Design System**:
  - Built with **Material-UI (MUI v5)** and Emotion styled components.
  - Skeletons and lazy-loaded views for smooth loading states.

---

## 🛠 Prerequisites

- **Node.js**: `>= 18.0.0` (compatible with Node 18, 20, 22, and 24+)
- **npm**: `>= 9.0.0`

---

## 📦 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   # or
   npm run dev
   ```

3. Open your browser at [http://localhost:3000](http://localhost:3000).

---

## 📁 Key Project Structure

```
├── public/                 # Static assets & Mock Service Worker script
│   └── mockServiceWorker.js
├── src/
│   ├── components/         # React presentation & layout components
│   │   ├── LoginRegister.js# Login / Register modal form
│   │   ├── NetflixApp.js   # Main authenticated dashboard
│   │   ├── NetflixAppBar.js# Navigation bar with user menu & search
│   │   ├── NetflixById.js  # Movie / TV show detail view
│   │   └── ...
│   ├── context/            # React context providers
│   │   ├── AuthContext.js  # Global auth state & token management
│   │   └── HistoryMoviesContext.js
│   ├── mocks/              # Simulated backend (MSW)
│   │   ├── db.js           # LocalStorage-backed database (users & bookmarks)
│   │   ├── handlers.js     # API handlers for /login, /register, /me, /bookmark
│   │   └── server.js       # Browser MSW worker setup
│   ├── utils/              # API clients & hooks
│   │   ├── authNetflixProvider.js # Auth API calls
│   │   ├── clientApi.js    # Axios clients for TMDB & auth backend
│   │   └── hooksMovies.js  # React Query hooks for movies & series
│   ├── AuthApp.js          # Router & views for authenticated users
│   ├── UnauthApp.js        # Welcome screen & login for unauthenticated users
│   ├── App.js              # Root component switching between Auth & Unauth
│   └── index.js            # React 18 createRoot entrypoint
├── index.html              # Vite entrypoint HTML
├── vite.config.js          # Vite build & dev configuration
└── package.json            # Project dependencies & scripts
```

---

## ⚙️ Available Scripts

- `npm start` (or `npm run dev`): Starts the Vite development server on port 3000 with instant Hot Module Replacement (HMR).
- `npm run build`: Bundles the application for production into `dist/`.
- `npm run preview`: Locally previews the production build.
- `npm run format`: Formats code with Prettier.
