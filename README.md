# Netflix Clone — Authentication & APIs Workshop

A hands-on React workshop project designed to teach **User Authentication (Supabase)** and **REST API Integration (TMDB)** using core React primitives (`useState`, `useEffect`, and `props`).

---

## 🎯 Workshop Goals & Learning Objectives

By the end of this 2-hour workshop, you will understand how to:

1. **Build & Compose React Components**: Write a functional component from scratch (`UnauthApp.js`), pass props, and conditionally render views.
2. **Understand Authentication Concepts**: Compare authentication approaches (custom backends vs. Backend-as-a-Service) and understand how sessions and JWT tokens work.
3. **Integrate Hosted Authentication with Supabase**:
   - Initialize the Supabase SDK (`createClient`) using environment variables.
   - Register new users (`supabase.auth.signUp`) and sign in existing users (`supabase.auth.signInWithPassword`).
   - Persist and listen to user sessions in real time (`supabase.auth.getSession` and `supabase.auth.onAuthStateChange`).
4. **Consume External REST APIs (The Movie Database — TMDB)**:
   - Construct REST endpoint URLs with query parameters (`?api_key=...&language=en-US`).
   - Fetch asynchronous data inside `useEffect` and store results in React state (`useState`).
   - Compare native browser `fetch()` with `axios.get()` and see how Axios simplifies JSON parsing and error handling.

---

## 🛠 Prerequisites & Setup

- **Node.js**: `>= 18.0.0`
- **npm**: `>= 9.0.0`
- A free [Supabase](https://supabase.com/) project (URL & Anon Key) and a [TMDB API Key](https://www.themoviedb.org/settings/api) *(or use the workshop's shared keys)*.

### Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Copy `.env.example` to `.env` and fill in your keys:
   ```env
   REACT_APP_API_URL=https://api.themoviedb.org/3
   REACT_APP_IMAGE_URL=https://image.tmdb.org/t/p
   REACT_APP_API_KEY=your_tmdb_api_key_here
   REACT_APP_SUPABASE_URL=your_supabase_project_url_here
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 Workshop Tasks (In Chronological Order)

Each file you will edit contains numbered `STEP` banners from top to bottom. We complete each file in a single pass before moving to the next one:

| Order | File | Workshop Task |
| :--- | :--- | :--- |
| **File 1** | `src/UnauthApp.js` | **Build a React Component From Scratch**: Import `LoginRegister`, render the Netflix landing background and logo, and export `UnauthApp`. |
| **File 2a** | `.env` | **Environment Keys**: Add your Supabase URL, Supabase Anon Key, and TMDB API Key. |
| **File 2b** | `src/utils/supabaseClient.js` | **Initialize Supabase**: Import `createClient`, read your `.env` keys, and export the `supabase` client instance. |
| **File 3** | `src/components/LoginRegister.js` | **Sign Up & Sign In**: Create form state with `useState` and write `handleSubmit` to call `supabase.auth.signUp()` and `supabase.auth.signInWithPassword()`. |
| **File 4** | `src/App.js` | **Session State & View Switching**: Use `useState` and `useEffect` (`getSession`, `onAuthStateChange`, `signOut`) to switch between `<UnauthApp />` and `<NetflixApp />`. |
| **File 5** | `src/components/NetflixApp.js` | **Hero Banner Fetch & Search Walkthrough**: Fetch a random featured movie/show from TMDB in `useEffect` for the hero banner, then review the pre-built search effect. |
| **File 6** | `src/components/NetflixRow.js` | **Movie Rows (`fetch` $\rightarrow$ `axios`)**: Fetch the movie list for each category row in `useEffect`—first using native `fetch()`, then refactoring to `axios.get()`. |

---

## 📁 Project Structure

```text
init-netflix-clone/
├── public/
│   ├── favicon.ico
│   └── images/                      # Netflix logo, avatar & background assets
├── src/
│   ├── components/
│   │   ├── skeletons/               # Loading placeholder skeletons
│   │   ├── LoadingFullScreen.js     # Full-screen loading spinner
│   │   ├── LoginRegister.js         # ✏️ [FILE 3] Sign In / Sign Up dialog form
│   │   ├── Netflix.css              # Netflix layout, banner & slider styles
│   │   ├── NetflixApp.js            # ✏️ [FILE 5] Main dashboard & hero banner fetch
│   │   ├── NetflixAppBar.js         # Top navigation bar, live search & sign out
│   │   ├── NetFlixFooter.js         # Footer component
│   │   ├── NetflixHeader.js         # Hero banner & local "My List" bookmark button
│   │   ├── NetflixRow.js            # ✏️ [FILE 6] TMDB row data fetching
│   │   └── NetflixRowView.js        # Horizontal poster slider with hover arrows
│   ├── utils/
│   │   ├── helper.js                # TMDB endpoint mapper & random ID helpers
│   │   └── supabaseClient.js        # ✏️ [FILE 2b] Supabase client initialization
│   ├── App.js                       # ✏️ [FILE 4] Root auth session listener
│   ├── UnauthApp.js                 # ✏️ [FILE 1] Unauthenticated landing page
│   ├── config.js                    # API base URLs & constants
│   ├── index.css                    # Global & landing page styles
│   └── index.js                     # React root entrypoint
├── .env.example                     # Environment variable template
├── index.html                       # Vite HTML entrypoint
├── package.json                     # Dependencies & scripts
└── vite.config.js                   # Vite configuration
```

---

## ⚙️ Available Scripts

- `npm run dev` (or `npm start`): Runs the Vite development server at `http://localhost:3000`.
- `npm run build`: Builds the production bundle into `dist/`.
- `npm run preview`: Previews the production build locally.
