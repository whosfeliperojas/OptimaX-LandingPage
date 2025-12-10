# OptimaX Landing Page - Starter

This commit adds a Supabase migration and a minimal Astro + TypeScript + Tailwind frontend that submits leads directly to a Supabase Postgres table.

Quick start:

1. Run the SQL migration in Supabase SQL editor or via psql: `supabase/migrations/001_init.sql`.
2. In `frontend/`, copy `.env.example` to `.env` and set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY.
3. Install and run the frontend:
   - cd frontend
   - npm install
   - npm run dev

Notes:
- The frontend uses the Supabase anon public key to insert into the `leads` table. For production you should review Row Level Security (RLS) policies in Supabase to allow inserts from the client only for the needed fields and consider adding spam protection.
- No auth or admin UI is included in this starter.
