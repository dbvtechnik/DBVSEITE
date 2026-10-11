/*
# Add event_type and guest_count columns to inquiries

## Changes
- Adds `event_type` (text, nullable) — stores the type of event (Hochzeit, Geburtstag, Firmenfeier, etc.)
- Adds `guest_count` (integer, nullable) — stores the approximate number of guests

## Notes
- Both columns are nullable so existing inquiries are not affected.
- The INSERT policy already allows anon inserts with name, email, package non-null.
- No RLS policy changes needed — the existing policies remain valid.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'inquiries' AND column_name = 'event_type'
  ) THEN
    ALTER TABLE inquiries ADD COLUMN event_type text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'inquiries' AND column_name = 'guest_count'
  ) THEN
    ALTER TABLE inquiries ADD COLUMN guest_count integer;
  END IF;
END $$;
