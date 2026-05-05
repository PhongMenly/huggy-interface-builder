
-- Create a security definer function to check admin email safely
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id = _user_id
      AND email = 'phuongvimmo25@gmail.com'
  )
$$;

-- Drop old broken policies on daily_reports
DROP POLICY IF EXISTS "Admin can view all reports" ON public.daily_reports;
DROP POLICY IF EXISTS "Users can view own reports" ON public.daily_reports;
DROP POLICY IF EXISTS "Users can insert own reports" ON public.daily_reports;
DROP POLICY IF EXISTS "Users can update own reports" ON public.daily_reports;
DROP POLICY IF EXISTS "Users can delete own reports" ON public.daily_reports;

-- Recreate policies using the safe function
CREATE POLICY "Users can view own reports"
  ON public.daily_reports FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all reports"
  ON public.daily_reports FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can insert own reports"
  ON public.daily_reports FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reports"
  ON public.daily_reports FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reports"
  ON public.daily_reports FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Fix profiles table too
DROP POLICY IF EXISTS "Admin can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admin can view all profiles"
  ON public.profiles FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id);
