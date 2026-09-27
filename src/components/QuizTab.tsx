import React, { useState, useEffect } from 'react';
import { 
  Heart, Clock, Zap, ArrowRight, RotateCcw, CheckCircle2, XCircle, 
  HelpCircle, Trophy, ShieldAlert, Award, ChevronRight, Play, AlertCircle, FileText
} from 'lucide-react';
import { Question, UserProfile, QuizHistoryRecord } from '../types/biology';
import { QUESTION_BANK, BIOLOGY_MODULES, BADGES } from '../data/biologyData';
import { saveProfile, saveQuizHistoryItem, calculateLevel } from '../utils/storage';
import { soundManager } from '../utils/sound';

interface QuizTabProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  initialMode?: 'module' | 'boss';
  initialModuleId?: string;
  onBadgeUnlocked: (badgeId: string) => void;
  onNavigateToDashboard: () => void;
}

export const QuizTab: React.FC<QuizTabProps> = ({
  profile,
  setProfile,
  initialMode,
  initialModuleId,
  onBadgeUnlocked,
  onNavigateToDashboard,
}) => {
  // Session states
  const [inQuiz, setInQuiz] = useState<boolean>(false);
  const [quizMode, setQuizMode] = useState<'module' | 'boss' | 'official_50'>(initialMode || 'module');
  const [selectedModuleId, setSelectedModuleId] = useState<string>(initialModuleId || 'modul-1');

  // Active play states
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [lives, setLives] = useState<number>(3);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [wrongAnswersCount, setWrongAnswersCount] = useState<number>(0);
  const [earnedExp, setEarnedExp] = useState<number>(0);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(1800);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // If initial props are passed and not yet running quiz
  useEffect(() => {
    if (initialMode && !inQuiz && !isCompleted) {
      startQuiz(initialMode, initialModuleId || 'modul-1');
    }
  }, [initialMode, initialModuleId]);

  // Timer for Timed Quizzes
  useEffect(() => {
    if (!inQuiz || isCompleted || isGameOver || quizMode === 'module') return;
    if (timeRemainingSeconds <= 0) {
      handleFinishQuiz(true); // timed out
      return;
    }
    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [inQuiz, isCompleted, isGameOver, quizMode, timeRemainingSeconds]);

  const startQuiz = (mode: 'module' | 'boss' | 'official_50', modId: string) => {
    soundManager.playClick();
    setQuizMode(mode);
    setSelectedModuleId(modId);

    let selectedQuestions: Question[] = [];
    let initialTimer = 1800; // 30 mins
    let initialLives = 3;

    if (mode === 'module') {
      selectedQuestions = QUESTION_BANK.filter((q) => q.moduleId === modId);
      initialLives = 3;
    } else if (mode === 'official_50') {
      // Complete official 50 questions sorted by kisi-kisi number
      selectedQuestions = [...QUESTION_BANK].sort((a, b) => (a.kisiKisiNumber || 0) - (b.kisiKisiNumber || 0));
      initialTimer = 5400; // 90 minutes (official duration)
      initialLives = 5; // More forgiving for full 50 questions
    } else {
      // 20 random questions for Boss Battle
      const shuffled = [...QUESTION_BANK].sort(() => 0.5 - Math.random());
      selectedQuestions = shuffled.slice(0, 20);
      initialTimer = 1800; // 30 minutes
      initialLives = 3;
    }

    setQuestions(selectedQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setLives(initialLives);
    setCorrectAnswersCount(0);
    setWrongAnswersCount(0);
    setEarnedExp(0);
    setTimeRemainingSeconds(initialTimer);
    setIsCompleted(false);
    setIsGameOver(false);
    setInQuiz(true);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    soundManager.playClick();
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    if (isCorrect) {
      soundManager.playCorrect();
      setCorrectAnswersCount((prev) => prev + 1);
      setEarnedExp((prev) => prev + 20);
    } else {
      soundManager.playHeartLost();
      setWrongAnswersCount((prev) => prev + 1);
      const newLives = lives - 1;
      setLives(newLives);

      if (newLives <= 0) {
        setIsGameOver(true);
        handleFinishQuiz(false, true);
      }
    }
  };

  const handleNextQuestion = () => {
    soundManager.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      handleFinishQuiz(false, false);
    }
  };

  const handleFinishQuiz = (isTimeout: boolean = false, isDead: boolean = false) => {
    setIsCompleted(true);
    if (!isDead) {
      soundManager.playLevelUp();
    }

    const total = questions.length;
    const finalScore = Math.round((correctAnswersCount / total) * 100);

    // Update Profile in storage
    const newTotalQuizzes = profile.totalQuizzesTaken + 1;
    const newCorrect = profile.totalCorrectAnswers + correctAnswersCount;
    const newQuestionsAnswered = profile.totalQuestionsAnswered + (correctAnswersCount + wrongAnswersCount);
    const newAverage = Math.round(
      ((profile.averageScore * profile.totalQuizzesTaken) + finalScore) / newTotalQuizzes
    );
    const bonusExp = (finalScore === 100 ? 50 : 0) + (quizMode === 'official_50' ? 150 : quizMode === 'boss' ? 50 : 0);
    const totalGainedExp = earnedExp + bonusExp;
    const newExp = profile.exp + totalGainedExp;

    const newUnlockedBadges = [...profile.unlockedBadges];

    // Check Badges
    if (!newUnlockedBadges.includes('first_blood')) {
      newUnlockedBadges.push('first_blood');
      onBadgeUnlocked('first_blood');
    }
    if (finalScore === 100 && lives >= 3 && !newUnlockedBadges.includes('perfect_score')) {
      newUnlockedBadges.push('perfect_score');
      onBadgeUnlocked('perfect_score');
    }
    if (quizMode === 'boss' && finalScore >= 80 && !newUnlockedBadges.includes('boss_slayer')) {
      newUnlockedBadges.push('boss_slayer');
      onBadgeUnlocked('boss_slayer');
    }
    if (quizMode === 'official_50' && finalScore >= 75 && !newUnlockedBadges.includes('ats_man1metro_master')) {
      newUnlockedBadges.push('ats_man1metro_master');
      onBadgeUnlocked('ats_man1metro_master');
    }

    const updatedProfile: UserProfile = {
      ...profile,
      exp: newExp,
      level: calculateLevel(newExp),
      totalQuizzesTaken: newTotalQuizzes,
      totalCorrectAnswers: newCorrect,
      totalQuestionsAnswered: newQuestionsAnswered,
      averageScore: newAverage,
      unlockedBadges: newUnlockedBadges,
      highScoreBossBattle: quizMode === 'boss' || quizMode === 'official_50' 
        ? Math.max(profile.highScoreBossBattle, finalScore) 
        : profile.highScoreBossBattle,
    };

    setProfile(updatedProfile);
    saveProfile(updatedProfile);

    // Save history record
    const historyItem: QuizHistoryRecord = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: quizMode === 'official_50' ? 'boss' : quizMode,
      moduleTitle: quizMode === 'official_50' 
        ? 'Tryout Asli 50 Soal ATS MAN 1 Metro' 
        : quizMode === 'module' 
        ? BIOLOGY_MODULES.find((m) => m.id === selectedModuleId)?.title 
        : 'Simulator Boss Battle ATS (20 Soal)',
      score: finalScore,
      correctCount: correctAnswersCount,
      totalQuestions: total,
      expGained: totalGainedExp,
    };
    saveQuizHistoryItem(historyItem);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // If in quiz session
  if (inQuiz) {
    const currentQ = questions[currentIndex];
    const isLastQuestion = currentIndex + 1 >= questions.length;
    const progressPercent = Math.round(((currentIndex + (isAnswerSubmitted ? 1 : 0)) / questions.length) * 100);

    // Result screen (Completed or Game Over)
    if (isCompleted || isGameOver) {
      const finalScore = Math.round((correctAnswersCount / questions.length) * 100);
      const isPass = finalScore >= 75;

      return (
        <div className="max-w-2xl mx-auto cyber-panel rounded-2xl p-6 sm:p-8 space-y-6 text-center animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center border-2 shadow-2xl relative">
            {isGameOver ? (
              <div className="w-full h-full rounded-3xl bg-rose-500/10 border-rose-500/40 flex items-center justify-center text-rose-400">
                <Heart className="w-10 h-10 fill-rose-500/20" />
              </div>
            ) : isPass ? (
              <div className="w-full h-full rounded-3xl bg-emerald-500/10 border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-emerald-500/20 shadow-lg">
                <Trophy className="w-10 h-10" />
              </div>
            ) : (
              <div className="w-full h-full rounded-3xl bg-amber-500/10 border-amber-500/40 flex items-center justify-center text-amber-400">
                <Award className="w-10 h-10" />
              </div>
            )}
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
              Hasil {quizMode === 'official_50' ? 'Simulasi 50 Soal Kisi-Kisi MAN 1 Metro' : 'Sesi Evaluasi ATS'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {isGameOver
                ? 'Nyawa Habis (HP 0)'
                : isPass
                ? 'Luar Biasa! Kompetensi Tercapai'
                : 'Cukup Baik, Asah Lagi Materinya!'}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {isGameOver
                ? 'Jangan menyerah! Pelajari kembali ringkasan kisi-kisi modul materi dan coba lagi.'
                : 'Nilai Anda telah dikonversikan ke dalam EXP dan progres belajar browser.'}
            </p>
          </div>

          {/* Score & EXP Matrix */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div>
              <span className="text-[11px] text-slate-400 block">Skor Akhir</span>
              <span className={`text-2xl font-mono font-bold ${finalScore >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {finalScore}
              </span>
              <span className="text-[10px] text-slate-500 block">/ 100</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Jawaban Benar</span>
              <span className="text-2xl font-mono font-bold text-white">
                {correctAnswersCount}
              </span>
              <span className="text-[10px] text-slate-500 block">dari {questions.length} soal</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">EXP Diperoleh</span>
              <span className="text-2xl font-mono font-bold text-cyan-400">
                +{earnedExp}
              </span>
              <span className="text-[10px] text-slate-500 block">EXP</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => startQuiz(quizMode, selectedModuleId)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Coba Lagi</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setInQuiz(false);
                onNavigateToDashboard();
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-slate-950 transition-colors shadow-lg shadow-emerald-950"
            >
              <span>Kembali ke Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-3xl mx-auto cyber-panel rounded-2xl p-5 sm:p-7 space-y-6">
        {/* Game HUD Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-emerald-400 font-semibold">
              SOAL {currentIndex + 1} / {questions.length}
            </span>
            {currentQ.kisiKisiNumber && (
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-[10px] font-mono text-emerald-300">
                Kisi-kisi No. {currentQ.kisiKisiNumber}
              </span>
            )}
            <span className="text-slate-600">|</span>
            <span className="text-xs text-slate-400 truncate max-w-[180px]">
              {currentQ.moduleTitle}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer if applicable */}
            {quizMode !== 'module' && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-amber-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(timeRemainingSeconds)}</span>
              </div>
            )}

            {/* Lives / HP Hearts */}
            <div className="flex items-center gap-1">
              {Array.from({ length: quizMode === 'official_50' ? 5 : 3 }).map((_, heartIdx) => (
                <Heart
                  key={heartIdx}
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                    heartIdx < lives
                      ? 'text-rose-500 fill-rose-500 scale-100'
                      : 'text-slate-700 scale-90 opacity-40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Progress Line */}
        <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
          <div
            className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Statement */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
              currentQ.difficulty === 'HOTS'
                ? 'border-purple-500/40 bg-purple-950/20 text-purple-300'
                : currentQ.difficulty === 'Sedang'
                ? 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300'
                : 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
            }`}>
              {currentQ.difficulty}
            </span>
            <span className="text-xs text-slate-400 font-mono">Indikator: {currentQ.keyConcept}</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed whitespace-pre-line">
            {currentQ.question}
          </h3>
        </div>

        {/* Multiple Choice Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectOption = idx === currentQ.correctAnswer;

            let buttonStyle = 'border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-slate-200';
            if (isSelected) {
              buttonStyle = 'border-cyan-500 bg-cyan-950/30 text-white ring-1 ring-cyan-500/50';
            }

            if (isAnswerSubmitted) {
              if (isCorrectOption) {
                buttonStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500';
              } else if (isSelected && !isCorrectOption) {
                buttonStyle = 'border-rose-500 bg-rose-950/40 text-rose-200 ring-1 ring-rose-500';
              } else {
                buttonStyle = 'border-slate-800 bg-slate-950/30 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${buttonStyle}`}
              >
                <span className="w-5 h-5 rounded-md border border-slate-700 bg-slate-900/80 flex items-center justify-center font-mono text-[11px] shrink-0 font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 leading-relaxed">{option}</span>
                {isAnswerSubmitted && isCorrectOption && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 self-center" />
                )}
                {isAnswerSubmitted && isSelected && !isCorrectOption && (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 self-center" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Explanation Box on Submit */}
        {isAnswerSubmitted && (
          <div className={`p-4 rounded-xl border animate-in fade-in duration-200 space-y-2 ${
            selectedOption === currentQ.correctAnswer
              ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
          }`}>
            <div className="flex items-center gap-2 font-bold text-xs">
              {selectedOption === currentQ.correctAnswer ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Jawaban Benar! (+20 EXP)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>Jawaban Salah! (-1 HP)</span>
                </>
              )}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white block mb-0.5">Pembahasan Ilmiah (Kunci Kisi-kisi):</strong>
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Action Bottom Control */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={() => {
              soundManager.playClick();
              setInQuiz(false);
            }}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Batal / Keluar Sesi
          </button>

          {!isAnswerSubmitted ? (
            <button
              disabled={selectedOption === null}
              onClick={handleSubmitAnswer}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-950"
            >
              Kunci Jawaban
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-950"
            >
              <span>{isLastQuestion ? 'Lihat Hasil Akhir' : 'Soal Selanjutnya'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Quiz Mode Selection Screen
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
          Cyber-Lab Assessment Engine
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Pusat Uji Kuis & Simulasi ATS
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Disusun 100% presisi berdasarkan Dokumen Kisi-Kisi Soal ATS Ganjil Biologi Kelas XII MAN 1 Metro (50 Nomor Soal Lengkap).
        </p>
      </div>

      {/* Featured Full 50-Question Official Simulation Banner */}
      <div className="cyber-panel-accent rounded-2xl p-6 border-emerald-500/50 bg-emerald-950/20 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 font-bold uppercase">
                RESMI SESUAI NASKAH KISI-KISI
              </span>
              <span className="text-xs font-mono text-cyan-400">50 Soal · 90 Menit</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Tryout Penuh: 50 Soal Kisi-Kisi ATS MAN 1 Metro
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Latihan lengkap dari Nomer 1 s.d. 50 mencakup Metabolisme, Enzim, Substansi Genetik, Pembelahan Sel, dan Hukum Mendel dengan alokasi waktu resmi 90 menit dan sistem nyawa 5 HP.
            </p>
          </div>

          <button
            onClick={() => startQuiz('official_50', 'all')}
            className="flex items-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-lg shadow-emerald-950 shrink-0"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Mulai Tryout 50 Soal Lengkap (90 Menit)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mode 1: Kuis per Modul */}
        <div className="cyber-panel rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-emerald-400">MODE LATIHAN</span>
              <h3 className="text-lg font-bold text-white">Kuis Terfokus per Modul</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Soal pilihan ganda spesifik untuk tiap modul dengan indikator nomor kisi-kisi dan pembahasan lengkap.
              </p>
            </div>

            {/* Select module to quiz */}
            <div className="space-y-2 pt-2">
              <label className="text-xs text-slate-300 font-semibold block">Pilih Modul Kisi-Kisi:</label>
              <div className="space-y-1.5">
                {BIOLOGY_MODULES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedModuleId(m.id);
                    }}
                    className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                      selectedModuleId === m.id
                        ? 'border-emerald-500 bg-emerald-950/30 text-white ring-1 ring-emerald-500/50'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-white">Modul 0{m.number}: {m.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">
                      {QUESTION_BANK.filter(q => q.moduleId === m.id).length} Soal
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => startQuiz('module', selectedModuleId)}
            className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-lg shadow-emerald-950"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Mulai Kuis Modul Terpilih</span>
          </button>
        </div>

        {/* Mode 2: Simulator Kilat ATS (20 Soal Random) */}
        <div className="cyber-panel rounded-2xl p-6 border-purple-500/40 bg-purple-950/20 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-purple-300">MODE TANTANGAN KILAT</span>
              <h3 className="text-lg font-bold text-white">Boss Battle ATS (20 Soal Acak)</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Tantangan cepat menguji refleks dan pemahaman konsep! 20 soal acak dari seluruh kisi-kisi dengan timer 30 menit dan 3 HP.
              </p>
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Jumlah Soal:</span>
                  <span className="font-mono text-white font-bold">20 Soal Acak</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Batas Waktu:</span>
                  <span className="font-mono text-amber-400 font-bold">30 Menit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Toleransi Kesalahan:</span>
                  <span className="font-mono text-rose-400 font-bold">3 Nyawa (HP)</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => startQuiz('boss', 'all')}
            className="flex items-center justify-center gap-2 w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-colors shadow-lg shadow-purple-950"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Mulai Boss Battle (20 Soal)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
