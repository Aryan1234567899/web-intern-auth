# Web Development Intern - Assignment (Firebase, Vanilla JS)

## What this contains
- Clean Sign Up and Login pages using **Firebase Authentication (Email & Password)**
- Simple protected Dashboard page that says `Welcome, <user email>`
- Client-side validation and error messages
- Instructions for creating a Firebase project, configuring the app, and deploying to Vercel/Netlify
- Optional: example n8n workflow JSON (trigger on new signup) included as `n8n-workflow.json`

## Files
- `index.html` — Login page
- `signup.html` — Sign Up page
- `dashboard.html` — Protected dashboard (checks Firebase auth state)
- `css/style.css` — Simple responsive styling
- `js/auth.js` — All Firebase + UI logic (sign up, login, logout, auth state)
- `firebase-config.example.js` — Example Firebase config (replace with your project's config)
- `n8n-workflow.json` — Example n8n workflow (optional bonus)
- `README.md` — this file

## Quick setup
1. Create a Firebase project at https://console.firebase.google.com/
2. In **Authentication → Sign-in method**, enable **Email/Password**.
3. Add a web app and copy the Firebase SDK config.
4. Replace the contents of `firebase-config.example.js` into `js/firebase-config.js` (create the file) or paste the config into the indicated place in `js/auth.js`.
5. Open `index.html` / `signup.html` locally to test, or deploy to Vercel/Netlify (instructions below).

## Deploying (Vercel)
1. Push the folder to GitHub.
2. In Vercel, Import Project → Git Repository → Deploy.
3. Set build settings: Framework = None, Build Command = (leave blank), Output Directory = (leave blank).
4. Add environment variables if you put Firebase config in env vars; otherwise client-side config is fine.

## Notes
- Do **not** commit real Firebase API keys to public repos if you are uncomfortable; the config contains public keys (ok for client apps) but protect server secrets if added later.
- The included `n8n-workflow.json` is an example: it expects a webhook or could be triggered by a database function. See the n8n docs for importing workflows.

---
Good luck — if you want, I can also create a GitHub repo structure and (walk you through) the exact Vercel deploy steps.
