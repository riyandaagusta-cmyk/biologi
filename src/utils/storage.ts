import { UserProfile, LevelTitle, QuizHistoryRecord } from '../types/biology';

const STORAGE_KEY = 'cyberlab_biologi_xii_v1';

export const LEVEL_THRESHOLDS: { minExp: number; title: LevelTitle }[] = [
  { minExp: 0, title: 'Novice Biologist' },
  { minExp: 150, title: 'Cell Explorer' },
  { minExp: 400, title: 'Metabolic Analyst' },
  { minExp: 750, title: 'Enzyme Engineer' },
  { minExp: 1200, title: 'Genetic Architect' },
  { minExp: 1800, title: 'Genetic Master' },
];

export function calculateLevel(exp: number): LevelTitle {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (exp >= LEVEL_THRESHOLDS[i].minExp) {
      return LEVEL_THRESHOLDS[i].title;
    }
  }
  return 'Novice Biologist';
}

export function getNextLevelInfo(exp: number) {
  const currentLevel = calculateLevel(exp);
  const currentIndex = LEVEL_THRESHOLDS.findIndex(l => l.title === currentLevel);
  if (currentIndex === LEVEL_THRESHOLDS.length - 1) {
    return {
      currentLevel,
      nextLevel: 'Maksimum Level (Master)',
      nextMinExp: LEVEL_THRESHOLDS[currentIndex].minExp,
      progressPercent: 100,
      expNeeded: 0,
    };
  }
  const currentThreshold = LEVEL_THRESHOLDS[currentIndex].minExp;
  const nextThreshold = LEVEL_THRESHOLDS[currentIndex + 1].minExp;
  const expInLevel = exp - currentThreshold;
  const expRange = nextThreshold - currentThreshold;
  const progressPercent = Math.min(100, Math.max(0, Math.round((expInLevel / expRange) * 100)));
  return {
    currentLevel,
    nextLevel: LEVEL_THRESHOLDS[currentIndex + 1].title,
    nextMinExp: nextThreshold,
    progressPercent,
    expNeeded: Math.max(0, nextThreshold - exp),
  };
}

export const DEFAULT_PROFILE: UserProfile = {
  nickname: 'Siswa XII MIPA',
  avatar: 'dna',
  level: 'Novice Biologist',
  exp: 0,
  streak: 1,
  lastLoginDate: new Date().toISOString().split('T')[0],
  completedModules: [],
  unlockedBadges: [],
  totalQuizzesTaken: 0,
  totalCorrectAnswers: 0,
  totalQuestionsAnswered: 0,
  averageScore: 0,
  highScoreBossBattle: 0,
  soundEnabled: true,
};

export function loadProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveProfile(DEFAULT_PROFILE);
      return DEFAULT_PROFILE;
    }
    const parsed: UserProfile = JSON.parse(raw);
    
    // Check and update daily streak
    const today = new Date().toISOString().split('T')[0];
    if (parsed.lastLoginDate !== today) {
      const last = new Date(parsed.lastLoginDate);
      const now = new Date(today);
      const diffDays = Math.round((now.getTime() - last.getTime()) / (1000 * 3600 * 24));
      
      if (diffDays === 1) {
        parsed.streak += 1;
      } else if (diffDays > 1) {
        parsed.streak = 1;
      }
      parsed.lastLoginDate = today;
      saveProfile(parsed);
    }
    
    // Ensure level matches exp
    parsed.level = calculateLevel(parsed.exp);
    return parsed;
  } catch (err) {
    console.error('Failed to load profile from localStorage', err);
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save profile to localStorage', err);
  }
}

const HISTORY_KEY = 'cyberlab_biologi_xii_history_v1';

export function loadQuizHistory(): QuizHistoryRecord[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveQuizHistoryItem(record: QuizHistoryRecord): void {
  try {
    const history = loadQuizHistory();
    history.unshift(record);
    // Keep max 20 records
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
  } catch {
    // ignore
  }
}

export function resetAllProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    // ignore
  }
}
