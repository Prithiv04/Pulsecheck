# Deploying PulseCheck Frontend

Your React frontend is ready to be deployed! Here are instructions for the most popular platforms.

## 1. Vercel (Recommended)

1.  Push your code to GitHub (if not already).
2.  Go to [Vercel](https://vercel.com) and sign up/login.
3.  Click **"Add New Project"**.
4.  Import your `PulseCheck` repository.
5.  Select the `frontend` folder as the **Root Directory** (click Edit next to Root Directory).
6.  Framework Preset should automatically detect **Vite**.
7.  Build Command: `npm run build`
8.  Output Directory: `dist`
9.  Click **Deploy**.

## 2. Netlify

1.  Push your code to GitHub.
2.  Go to [Netlify](https://netlify.com) and sign up/login.
3.  Click **"Add new site"** -> **"Import from Git"**.
4.  Connect to GitHub and select your repository.
5.  **Base directory**: `pulsecheck/frontend`
6.  **Build command**: `npm run build`
7.  **Publish directory**: `dist`
8.  Click **Deploy Site**.

## 3. Render (Static Site)

1.  Go to [Render](https://render.com).
2.  Click **"New"** -> **"Static Site"**.
3.  Connect your GitHub repository.
4.  **Root Directory**: `pulsecheck/frontend`
5.  **Build Command**: `npm run build`
6.  **Publish Directory**: `dist`
7.  Click **Create Static Site**.
8.  **Important**: You might need to add a Rewrite Rule for React Router:
    *   Go to **Redirects/Rewrites**.
    *   Source: `/*`
    *   Destination: `/index.html`
    *   Action: `Rewrite`

## Local Development

To run the app locally:

1.  Open terminal in `pulsecheck/frontend`.
2.  Run `npm install` (if not done).
3.  Run `npm run dev`.
4.  Open `http://localhost:5173`.
