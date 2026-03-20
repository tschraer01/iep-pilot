-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'teacher' CHECK (role IN ('teacher', 'admin', 'coordinator')),
  school_district TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create students table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  grade_level TEXT NOT NULL,
  disability_category TEXT NOT NULL,
  placement TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create goals table
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  grade_band TEXT NOT NULL,
  goal_text TEXT NOT NULL,
  is_from_bank BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create iep_documents table
CREATE TABLE iep_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'in_review', 'completed')),
  content_json JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE iep_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for students
CREATE POLICY "Teachers can view their own students"
  ON students
  FOR SELECT
  USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can create students"
  ON students
  FOR INSERT
  WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Teachers can update their own students"
  ON students
  FOR UPDATE
  USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can delete their own students"
  ON students
  FOR DELETE
  USING (auth.uid() = teacher_id);

-- RLS Policies for goals
CREATE POLICY "Teachers can view their own goals"
  ON goals
  FOR SELECT
  USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can create goals"
  ON goals
  FOR INSERT
  WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Teachers can update their own goals"
  ON goals
  FOR UPDATE
  USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can delete their own goals"
  ON goals
  FOR DELETE
  USING (auth.uid() = teacher_id);

-- RLS Policies for iep_documents
CREATE POLICY "Teachers can view their own IEP documents"
  ON iep_documents
  FOR SELECT
  USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can create IEP documents"
  ON iep_documents
  FOR INSERT
  WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Teachers can update their own IEP documents"
  ON iep_documents
  FOR UPDATE
  USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can delete their own IEP documents"
  ON iep_documents
  FOR DELETE
  USING (auth.uid() = teacher_id);

-- Create indexes for performance
CREATE INDEX idx_students_teacher_id ON students(teacher_id);
CREATE INDEX idx_goals_teacher_id ON goals(teacher_id);
CREATE INDEX idx_iep_documents_teacher_id ON iep_documents(teacher_id);
CREATE INDEX idx_iep_documents_student_id ON iep_documents(student_id);
