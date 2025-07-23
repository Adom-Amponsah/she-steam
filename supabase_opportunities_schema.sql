-- SQL for creating the opportunities table in Supabase
CREATE TABLE opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL, -- Scholarship, Internship, Competition, etc.
  title text NOT NULL,
  description text NOT NULL,
  deadline text,
  location text,
  bgColor text,
  url text, -- Link to apply or learn more
  created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- (Optional) Add RLS policies as needed for public insert/select
-- Example to allow public read/insert:
--
-- CREATE POLICY "Public read" ON opportunities FOR SELECT USING (true);
-- CREATE POLICY "Public insert" ON opportunities FOR INSERT WITH CHECK (true);
