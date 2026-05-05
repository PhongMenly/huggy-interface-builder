
CREATE TABLE public.level_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  level_number INTEGER NOT NULL CHECK (level_number >= 1 AND level_number <= 4),
  video_url TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.level_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All authenticated users can view level videos"
ON public.level_videos FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admin can insert level videos"
ON public.level_videos FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admin can update level videos"
ON public.level_videos FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admin can delete level videos"
ON public.level_videos FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));
