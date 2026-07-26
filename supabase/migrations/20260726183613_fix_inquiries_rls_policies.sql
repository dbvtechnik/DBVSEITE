/*
# Fix inquiries RLS policies

## Problem
- SELECT/UPDATE/DELETE policies were scoped to `authenticated` only, but the public
  contact form (anon role) needs INSERT. The INSERT policy had a WITH CHECK requiring
  `created_at IS NOT NULL`, but the frontend omits created_at (DB default = now()),
  causing every insert to fail with RLS violation — the site appeared broken/black.
- The anon role had no SELECT access, so even reading back failed.

## Changes
- Drop all existing policies on inquiries.
- INSERT (anon, authenticated): public visitors can submit inquiries. CHECK only
  validates name, email, package — created_at is filled by the DB default.
- SELECT (authenticated): only logged-in admins can view inquiries.
- UPDATE (authenticated): only logged-in admins can change status.
- DELETE (authenticated): only logged-in admins can delete inquiries.

## Security
- Public can only INSERT new inquiries — cannot read, modify, or delete them.
- Admins (authenticated) can read, update status, and delete inquiries.
*/

DROP POLICY IF EXISTS "select_inquiries" ON inquiries;
DROP POLICY IF EXISTS "insert_inquiries" ON inquiries;
DROP POLICY IF EXISTS "update_inquiries" ON inquiries;
DROP POLICY IF EXISTS "delete_inquiries" ON inquiries;

-- Public visitors (anon) can submit inquiries. Authenticated admins also can.
CREATE POLICY "insert_inquiries" ON inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND TRIM(BOTH FROM name) <> ''
    AND email IS NOT NULL AND TRIM(BOTH FROM email) <> ''
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND package IS NOT NULL
  );

-- Only authenticated admins can view inquiries.
CREATE POLICY "select_inquiries" ON inquiries FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated admins can update inquiries (e.g. change status).
CREATE POLICY "update_inquiries" ON inquiries FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

-- Only authenticated admins can delete inquiries.
CREATE POLICY "delete_inquiries" ON inquiries FOR DELETE
  TO authenticated
  USING (true);
