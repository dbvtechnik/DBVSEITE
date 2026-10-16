/*
# Restrict inquiries access to admin users only

1. New Tables
- `admin_users` — stores which authenticated users are admins.
  - `user_id` (uuid, PK, references auth.users, ON DELETE CASCADE)
  - `created_at` (timestamptz, default now())
2. Data
- Inserts the existing user info@dbv-veranstaltungstechnik.de into admin_users.
3. Functions
- `is_admin()` — SECURITY DEFINER, STABLE; returns true if auth.uid() exists in admin_users.
4. Security
- Enables RLS on admin_users.
- Replaces select/update/delete policies on inquiries to use is_admin() instead of broader checks.
- Only authenticated users who are in admin_users can read, update, or delete inquiries.
*/

CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

INSERT INTO public.admin_users (user_id)
SELECT id FROM auth.users WHERE email = 'info@dbv-veranstaltungstechnik.de'
ON CONFLICT DO NOTHING;

CREATE OR REPLACE FUNCTION public.is_admin() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid());
$$;

DROP POLICY IF EXISTS select_inquiries ON public.inquiries;
DROP POLICY IF EXISTS update_inquiries ON public.inquiries;
DROP POLICY IF EXISTS delete_inquiries ON public.inquiries;

CREATE POLICY select_inquiries ON public.inquiries
  FOR SELECT TO authenticated USING (public.is_admin());

CREATE POLICY update_inquiries ON public.inquiries
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY delete_inquiries ON public.inquiries
  FOR DELETE TO authenticated USING (public.is_admin());
