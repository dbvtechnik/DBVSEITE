-- Fix the insert policy: the email regex had a double-backslash that made it
-- require a literal backslash in the email, rejecting every real address.
-- Replace with a simple non-null + non-empty check; email format is validated
-- at the application layer before insert.
DROP POLICY IF EXISTS insert_inquiries ON public.inquiries;

CREATE POLICY insert_inquiries ON public.inquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL
    AND TRIM(BOTH FROM name) <> ''
    AND email IS NOT NULL
    AND TRIM(BOTH FROM email) <> ''
    AND package IS NOT NULL
  );
