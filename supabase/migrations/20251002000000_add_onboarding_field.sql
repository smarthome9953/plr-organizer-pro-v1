-- Add onboarding_completed field to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;

-- Update existing profiles to have onboarding_completed = true
UPDATE public.profiles 
SET onboarding_completed = TRUE 
WHERE onboarding_completed IS NULL;