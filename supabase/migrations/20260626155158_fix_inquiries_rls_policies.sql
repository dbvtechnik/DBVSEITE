-- Drop existing policies
DROP POLICY IF EXISTS insert_inquiries ON inquiries;
DROP POLICY IF EXISTS select_inquiries ON inquiries;
DROP POLICY IF EXISTS update_inquiries ON inquiries;
DROP POLICY IF EXISTS delete_inquiries ON inquiries;

-- INSERT: Allow anonymous users to submit contact form inquiries (intentional public write)
CREATE POLICY "insert_inquiries" ON inquiries FOR INSERT
  TO anon WITH CHECK (true);

-- SELECT: Only authenticated users can view inquiries (admin access)
-- Using auth.jwt() check to ensure valid authentication
CREATE POLICY "select_inquiries" ON inquiries FOR SELECT
  TO authenticated USING (auth.jwt() ->> 'aud' = 'authenticated');

-- UPDATE: Only authenticated users can update inquiries (admin access)
CREATE POLICY "update_inquiries" ON inquiries FOR UPDATE
  TO authenticated 
  USING (auth.jwt() ->> 'aud' = 'authenticated') 
  WITH CHECK (auth.jwt() ->> 'aud' = 'authenticated');

-- DELETE: Only authenticated users can delete inquiries (admin access)
CREATE POLICY "delete_inquiries" ON inquiries FOR DELETE
  TO authenticated USING (auth.jwt() ->> 'aud' = 'authenticated');