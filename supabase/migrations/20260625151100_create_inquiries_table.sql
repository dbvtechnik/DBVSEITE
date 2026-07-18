CREATE TABLE inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  event_date date,
  event_location text,
  package text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'neu'
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert_inquiries" ON inquiries FOR INSERT
  TO anon WITH CHECK (true);

CREATE POLICY "select_inquiries" ON inquiries FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "update_inquiries" ON inquiries FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_inquiries" ON inquiries FOR DELETE
  TO authenticated USING (true);
