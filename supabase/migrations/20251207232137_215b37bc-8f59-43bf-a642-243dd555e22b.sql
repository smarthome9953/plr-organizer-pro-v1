-- Create licenses table for real license tracking
CREATE TABLE IF NOT EXISTS public.licenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  type TEXT NOT NULL,
  acquired_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expiration_date DATE,
  can_sell BOOLEAN DEFAULT true,
  can_edit BOOLEAN DEFAULT true,
  can_distribute BOOLEAN DEFAULT true,
  requires_attribution BOOLEAN DEFAULT false,
  usage_limitations TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  notes TEXT,
  associated_content TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create brand_profiles table for brand kit
CREATE TABLE IF NOT EXISTS public.brand_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  primary_color TEXT DEFAULT '#6B5CE7',
  secondary_color TEXT DEFAULT '#00BCD4',
  accent_color TEXT DEFAULT '#F59E0B',
  primary_font TEXT DEFAULT 'Inter',
  heading_font TEXT DEFAULT 'Playfair Display',
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on licenses
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for licenses
CREATE POLICY "Users can view their own licenses" ON public.licenses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own licenses" ON public.licenses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own licenses" ON public.licenses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own licenses" ON public.licenses FOR DELETE USING (auth.uid() = user_id);

-- Enable RLS on brand_profiles
ALTER TABLE public.brand_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for brand_profiles
CREATE POLICY "Users can view their own brand profiles" ON public.brand_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own brand profiles" ON public.brand_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own brand profiles" ON public.brand_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own brand profiles" ON public.brand_profiles FOR DELETE USING (auth.uid() = user_id);

-- Add triggers for updated_at
CREATE TRIGGER update_licenses_updated_at BEFORE UPDATE ON public.licenses FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_brand_profiles_updated_at BEFORE UPDATE ON public.brand_profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();