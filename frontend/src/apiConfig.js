// API Configuration for JanSetu
// When VITE_API_URL is set (e.g. in Vercel environment variables pointing to Render),
// it directs all API calls to the remote backend.
// Otherwise, it defaults to empty string '' (using Vite proxy or same-origin in production).
export const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
