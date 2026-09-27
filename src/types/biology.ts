export type LevelTitle = 
  | 'Novice Biologist'
  | 'Cell Explorer'
  | 'Metabolic Analyst'
  | 'Enzyme Engineer'
  | 'Genetic Architect'
  | 'Genetic Master';

export interface UserProfile {
  nickname: string;
  avatar: string;
  level: LevelTitle;
  exp: number;
  streak: number;
  lastLoginDate: string; // YYYY-MM-DD
  completedModules: string[]; // module ids
  unlockedBadges: string[]; // badge ids
  totalQuizzesTaken: number;
  totalCorrectAnswers: number;
  totalQuestionsAnswered: number;
  averageScore: number;
  highScoreBossBattle: number;
  soundEnabled: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'Module' | 'Quiz' | 'Streak' | 'Mastery';
  unlockedAt?: string;
}

export interface ModuleSection {
  id: string;
  title: string;
  content: string[];
  keyPoints?: string[];
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
  };
  visualCallout?: {
    title: string;
    description: string;
    tag?: string;
  };
}

export interface BiologyModule {
  id: string;
  number: number;
  title: string;
  tagline: string;
  durationMinutes: number;
  iconName: string;
  summary: string;
  sections: ModuleSection[];
  widgetType: 'ingenhousz' | 'enzyme' | 'codon' | 'cell_cycle' | 'punnett';
}

export interface Question {
  id: string;
  kisiKisiNumber?: number;
  moduleId: string;
  moduleTitle: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  difficulty: 'Mudah' | 'Sedang' | 'HOTS';
  keyConcept: string;
}

export interface QuizHistoryRecord {
  id: string;
  timestamp: string;
  mode: 'module' | 'boss';
  moduleTitle?: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  expGained: number;
}
