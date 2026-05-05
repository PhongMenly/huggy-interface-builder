
-- Add mood, priority_tasks, daily_todos columns to daily_reports
ALTER TABLE public.daily_reports 
ADD COLUMN IF NOT EXISTS mood integer DEFAULT NULL,
ADD COLUMN IF NOT EXISTS priority_tasks jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS daily_todos jsonb DEFAULT '[]'::jsonb;

-- Create admin RLS policy: admin can view all reports
CREATE POLICY "Admin can view all reports"
ON public.daily_reports
FOR SELECT
TO authenticated
USING (
  (SELECT email FROM auth.users WHERE id = auth.uid()) = 'phuowngvimmo25@gmail.com'
);

-- Admin can view all profiles
CREATE POLICY "Admin can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  (SELECT email FROM auth.users WHERE id = auth.uid()) = 'phuowngvimmo25@gmail.com'
);
