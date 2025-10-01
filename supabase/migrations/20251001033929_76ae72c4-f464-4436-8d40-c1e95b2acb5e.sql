-- Create user profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create PLR categories table
CREATE TABLE IF NOT EXISTS public.plr_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#8B5CF6',
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on categories
ALTER TABLE public.plr_categories ENABLE ROW LEVEL SECURITY;

-- Category policies
CREATE POLICY "Users can view their own categories"
  ON public.plr_categories FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own categories"
  ON public.plr_categories FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own categories"
  ON public.plr_categories FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own categories"
  ON public.plr_categories FOR DELETE
  USING (auth.uid() = user_id);

-- Create PLR files table
CREATE TABLE IF NOT EXISTS public.plr_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.plr_categories(id) ON DELETE SET NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL DEFAULT 0,
  file_type TEXT NOT NULL,
  storage_path TEXT,
  content_hash TEXT,
  is_plr BOOLEAN DEFAULT true,
  confidence_score NUMERIC(5,2) DEFAULT 0,
  license_type TEXT,
  license_text TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  description TEXT,
  notes TEXT,
  quality_score NUMERIC(5,2),
  last_modified TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on files
ALTER TABLE public.plr_files ENABLE ROW LEVEL SECURITY;

-- Files policies
CREATE POLICY "Users can view their own files"
  ON public.plr_files FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own files"
  ON public.plr_files FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own files"
  ON public.plr_files FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own files"
  ON public.plr_files FOR DELETE
  USING (auth.uid() = user_id);

-- Create scan history table
CREATE TABLE IF NOT EXISTS public.scan_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scan_type TEXT NOT NULL DEFAULT 'manual',
  folders_scanned TEXT[] DEFAULT ARRAY[]::TEXT[],
  files_found INTEGER DEFAULT 0,
  plr_files_detected INTEGER DEFAULT 0,
  scan_duration INTEGER,
  status TEXT NOT NULL DEFAULT 'completed',
  scan_options JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on scan history
ALTER TABLE public.scan_history ENABLE ROW LEVEL SECURITY;

-- Scan history policies
CREATE POLICY "Users can view their own scan history"
  ON public.scan_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own scan history"
  ON public.scan_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create file versions table for tracking changes
CREATE TABLE IF NOT EXISTS public.file_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_id UUID NOT NULL REFERENCES public.plr_files(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  storage_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  changes_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on file versions
ALTER TABLE public.file_versions ENABLE ROW LEVEL SECURITY;

-- File versions policies
CREATE POLICY "Users can view their own file versions"
  ON public.file_versions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own file versions"
  ON public.file_versions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create storage buckets for PLR content
INSERT INTO storage.buckets (id, name, public) 
VALUES ('plr-content', 'plr-content', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for PLR content
CREATE POLICY "Users can view their own PLR content"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'plr-content' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own PLR content"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'plr-content' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own PLR content"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'plr-content' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own PLR content"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'plr-content' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_categories
  BEFORE UPDATE ON public.plr_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_files
  BEFORE UPDATE ON public.plr_files
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_plr_files_user_id ON public.plr_files(user_id);
CREATE INDEX IF NOT EXISTS idx_plr_files_category_id ON public.plr_files(category_id);
CREATE INDEX IF NOT EXISTS idx_plr_files_created_at ON public.plr_files(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_plr_files_file_type ON public.plr_files(file_type);
CREATE INDEX IF NOT EXISTS idx_plr_files_tags ON public.plr_files USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_plr_categories_user_id ON public.plr_categories(user_id);
CREATE INDEX IF NOT EXISTS idx_scan_history_user_id ON public.scan_history(user_id);
CREATE INDEX IF NOT EXISTS idx_scan_history_created_at ON public.scan_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_file_versions_file_id ON public.file_versions(file_id);
CREATE INDEX IF NOT EXISTS idx_file_versions_user_id ON public.file_versions(user_id);