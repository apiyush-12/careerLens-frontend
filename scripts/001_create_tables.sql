-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  bio TEXT,
  role TEXT DEFAULT 'user', -- 'user' or 'admin'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_delete_own" ON public.profiles
  FOR DELETE USING (auth.uid() = id);

-- Create resumes table
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  parsed_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on resumes
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for resumes
CREATE POLICY "resumes_select_own" ON public.resumes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "resumes_insert_own" ON public.resumes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "resumes_update_own" ON public.resumes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "resumes_delete_own" ON public.resumes
  FOR DELETE USING (auth.uid() = user_id);

-- Create job_targets table
CREATE TABLE IF NOT EXISTS public.job_targets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_title TEXT NOT NULL,
  company TEXT,
  description TEXT,
  required_skills TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on job_targets
ALTER TABLE public.job_targets ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for job_targets
CREATE POLICY "job_targets_select_own" ON public.job_targets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "job_targets_insert_own" ON public.job_targets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "job_targets_update_own" ON public.job_targets
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "job_targets_delete_own" ON public.job_targets
  FOR DELETE USING (auth.uid() = user_id);

-- Create skill_gap_analysis table
CREATE TABLE IF NOT EXISTS public.skill_gap_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_target_id UUID NOT NULL REFERENCES public.job_targets(id) ON DELETE CASCADE,
  current_skills TEXT[] DEFAULT ARRAY[]::TEXT[],
  missing_skills TEXT[] DEFAULT ARRAY[]::TEXT[],
  matching_percentage DECIMAL(5, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on skill_gap_analysis
ALTER TABLE public.skill_gap_analysis ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for skill_gap_analysis
CREATE POLICY "skill_gap_analysis_select_own" ON public.skill_gap_analysis
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "skill_gap_analysis_insert_own" ON public.skill_gap_analysis
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "skill_gap_analysis_update_own" ON public.skill_gap_analysis
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "skill_gap_analysis_delete_own" ON public.skill_gap_analysis
  FOR DELETE USING (auth.uid() = user_id);

-- Create learning_paths table
CREATE TABLE IF NOT EXISTS public.learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_target_id UUID NOT NULL REFERENCES public.job_targets(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  skills_to_learn TEXT[] DEFAULT ARRAY[]::TEXT[],
  resources JSONB,
  estimated_duration_weeks INTEGER,
  progress DECIMAL(5, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on learning_paths
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for learning_paths
CREATE POLICY "learning_paths_select_own" ON public.learning_paths
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "learning_paths_insert_own" ON public.learning_paths
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "learning_paths_update_own" ON public.learning_paths
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "learning_paths_delete_own" ON public.learning_paths
  FOR DELETE USING (auth.uid() = user_id);

-- Create career_insights table
CREATE TABLE IF NOT EXISTS public.career_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_target_id UUID NOT NULL REFERENCES public.job_targets(id) ON DELETE CASCADE,
  insight_type TEXT NOT NULL, -- 'market_demand', 'salary_range', 'growth_potential', 'challenges'
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on career_insights
ALTER TABLE public.career_insights ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for career_insights
CREATE POLICY "career_insights_select_own" ON public.career_insights
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "career_insights_insert_own" ON public.career_insights
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "career_insights_update_own" ON public.career_insights
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "career_insights_delete_own" ON public.career_insights
  FOR DELETE USING (auth.uid() = user_id);

-- Create readiness_assessments table
CREATE TABLE IF NOT EXISTS public.readiness_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_target_id UUID NOT NULL REFERENCES public.job_targets(id) ON DELETE CASCADE,
  overall_score DECIMAL(5, 2),
  technical_score DECIMAL(5, 2),
  soft_skills_score DECIMAL(5, 2),
  experience_score DECIMAL(5, 2),
  recommendations TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on readiness_assessments
ALTER TABLE public.readiness_assessments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for readiness_assessments
CREATE POLICY "readiness_assessments_select_own" ON public.readiness_assessments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "readiness_assessments_insert_own" ON public.readiness_assessments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "readiness_assessments_update_own" ON public.readiness_assessments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "readiness_assessments_delete_own" ON public.readiness_assessments
  FOR DELETE USING (auth.uid() = user_id);
