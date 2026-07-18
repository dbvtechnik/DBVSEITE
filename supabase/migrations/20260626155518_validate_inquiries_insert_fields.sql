/*
# Validate inquiries INSERT fields

1. Changes
- Replace unrestricted INSERT policy with validated policy
- Ensures name, email, and package fields are not null or empty
- Validates email format with regex
- Prevents junk/malformed data even if frontend validation is bypassed

2. Security
- INSERT still allows anonymous access (required for contact form)
- Added field-level validation as defense-in-depth
- Email regex validates proper format before accepting
*/

-- Drop the existing unrestricted insert policy
DROP POLICY IF EXISTS "insert_inquiries" ON inquiries;

-- Create validated insert policy
-- Ensures required fields are present and email has valid format
CREATE POLICY "insert_inquiries" ON inquiries FOR INSERT
  TO anon WITH CHECK (
    name IS NOT NULL 
    AND trim(name) != ''
    AND email IS NOT NULL 
    AND trim(email) != ''
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND package IS NOT NULL
    AND created_at IS NOT NULL
  );