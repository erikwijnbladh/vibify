-- Drop the problematic policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all playlists" ON public.playlists;

-- Create a security definer function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = user_id
      AND is_admin = true
  )
$$;

-- Recreate the admin policies using the function
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (public.is_admin(auth.uid()) OR auth.uid() = id);

CREATE POLICY "Admins can view all playlists"
ON public.playlists
FOR SELECT
USING (public.is_admin(auth.uid()) OR auth.uid() = user_id);