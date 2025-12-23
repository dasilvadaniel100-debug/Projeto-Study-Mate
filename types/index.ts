export interface User {
  id: number;
  email: string;
  name: string;
  display_name?: string;
  avatar_initials?: string;
  avatar_gradient?: string;
  school_year?: number;
  course_track?: string;
  target_average?: number;
  created_at: string;
  updated_at: string;
}

export interface Subject {
  id: number;
  user_id: number;
  name: string;
  emoji_icon?: string;
  color_gradient?: string;
  current_average: number;
  progress_percentage: number;
  next_topic?: string;
}

export interface StudySession {
  id: number;
  user_id: number;
  subject_id: number;
  topic?: string;
  duration_minutes?: number;
  completed: boolean;
  date: string;
  notes?: string;
  created_at: string;
}

export interface Exam {
  id: number;
  user_id: number;
  subject_id: number;
  title: string;
  exam_type?: string;
  year?: number;
  phase?: string;
  duration_minutes?: number;
  total_score?: number;
  user_score?: number;
  status: 'pending' | 'in_progress' | 'completed' | 'paused';
  completed_at?: string;
  created_at: string;
}

export interface StudyPlanTask {
  id: number;
  user_id: number;
  subject_id: number;
  task_text: string;
  scheduled_date: string;
  scheduled_time?: string;
  completed: boolean;
  completed_at?: string;
  created_at: string;
  subject?: Subject;
}

export interface LibraryDocument {
  id: number;
  user_id: number;
  subject_id?: number;
  filename: string;
  file_path: string;
  file_type?: string;
  file_size?: number;
  category?: string;
  uploaded_at: string;
}

export interface ChatMessage {
  id: number;
  user_id: number;
  role: 'user' | 'assistant';
  content: string;
  subject_id?: number;
  created_at: string;
}

export interface GamificationBadge {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  requirement_type?: string;
  requirement_value?: number;
}

export interface UserBadge {
  id: number;
  user_id: number;
  badge_id: number;
  unlocked_at: string;
  badge?: GamificationBadge;
}

export interface UserStats {
  id: number;
  user_id: number;
  current_level: number;
  current_xp: number;
  total_study_hours: number;
  total_exercises: number;
  current_streak_days: number;
  longest_streak_days: number;
  last_activity_date?: string;
  updated_at: string;
}

export interface PracticeSession {
  id: number;
  user_id: number;
  subject_id: number;
  topic?: string;
  difficulty?: string;
  duration_minutes?: number;
  exercises_completed: number;
  exercises_correct: number;
  xp_earned: number;
  completed_at?: string;
  created_at: string;
}
