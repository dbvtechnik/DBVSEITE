/*
# Anfragen nur noch für das Admin-Konto sichtbar

## Problem
- Die Regeln für SELECT/UPDATE/DELETE erlaubten jedem angemeldeten Nutzer den Zugriff.
- Neue Registrierungen sind offen und werden automatisch bestätigt. Dadurch konnte sich jeder
  ein Konto anlegen und alle Kundenanfragen lesen.

## Änderung
- Tabelle `admin_users` mit den Konten, die Anfragen sehen dürfen (ohne Client-Zugriff).
- Funktion `is_admin()` prüft, ob der angemeldete Nutzer dort steht.
- SELECT/UPDATE/DELETE auf `inquiries` nur noch für Admins. INSERT für Besucher bleibt unverändert.
*/

CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

INSERT INTO public.admin_users (user_id)
SELECT id FROM auth.users WHERE email = 'info@dbv-veranstaltungstechnik.de'
ON CONFLICT DO NOTHING;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid());
$$;

DROP POLICY IF EXISTS select_inquiries ON public.inquiries;
DROP POLICY IF EXISTS update_inquiries ON public.inquiries;
DROP POLICY IF EXISTS delete_inquiries ON public.inquiries;

CREATE POLICY select_inquiries ON public.inquiries
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY update_inquiries ON public.inquiries
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY delete_inquiries ON public.inquiries
  FOR DELETE TO authenticated
  USING (public.is_admin());
