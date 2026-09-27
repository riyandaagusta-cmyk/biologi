import React, { useState } from 'react';
import { 
  Trophy, Flame, Zap, BookOpen, Target, CheckCircle2, Lock, Award, 
  ChevronRight, Edit2, Check, RotateCcw, Activity, ShieldAlert, Sparkles, User
} from 'lucide-react';
import { UserProfile, Badge } from '../types/biology';
import { BADGES, BIOLOGY_MODULES } from '../data/biologyData';
import { getNextLevelInfo, saveProfile } from '../utils/storage';
import { soundManager } from '../utils/sound';

interface DashboardTabProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onNavigateToModules: (moduleId?: string) => void;
  onNavigateToQuiz: (mode: 'module' | 'boss', moduleId?: string) => void;
  onNavigateToFundamental?: () => void;
  onOpenResetModal: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  profile,
  setProfile,
  onNavigateToModules,
  onNavigateToQuiz,
  onNavigateToFundamental,
  onOpenResetModal,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(profile.nickname);

  const levelInfo = getNextLevelInfo(profile.exp);

  // Calculate overall progress percentage
  // 5 modules read (50% weight) + quizzes taken & passed (50% weight)
  const modulesReadRatio = profile.completedModules.length / BIOLOGY_MODULES.length;
  const quizRatio = Math.min(1, profile.totalQuizzesTaken / 6); // 5 modules + 1 boss
  const overallProgress = Math.round((modulesReadRatio * 0.5 + quizRatio * 0.5) * 100);

  const accuracy = profile.totalQuestionsAnswered > 0
    ? Math.round((profile.totalCorrectAnswers / profile.totalQuestionsAnswered) * 100)
    : 0;

  const handleSaveName = () => {
    if (!tempName.trim()) return;
    soundManager.playClick();
    const updated = { ...profile, nickname: tempName.trim() };
    setProfile(updated);
    saveProfile(updated);
    setIsEditingName(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Profile & Level Banner */}
      <div className="cyber-panel-accent rounded-2xl p-6 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* User Bio & Avatar */}
          <div className="lg:col-span-7 flex items-start gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
                <User className="w-8 h-8" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-slate-900 border border-emerald-500/40 rounded-full px-1.5 py-0.5 text-[10px] font-mono text-emerald-300">
                Lv.{profile.level === 'Novice Biologist' ? '1' : profile.level === 'Cell Explorer' ? '2' : profile.level === 'Metabolic Analyst' ? '3' : profile.level === 'Enzyme Engineer' ? '4' : profile.level === 'Genetic Architect' ? '5' : '6'}
              </div>
            </div>

            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {isEditingName ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      maxLength={24}
                      className="bg-slate-950 border border-emerald-500/50 rounded px-2 py-0.5 text-sm text-white font-semibold focus:outline-none"
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditingName(true)}>
                    <h2 className="text-xl font-bold text-white tracking-tight truncate">{profile.nickname}</h2>
                    <Edit2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </div>
                )}
                <span className="text-slate-500">·</span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">{profile.level}</span>
              </div>

              {/* Progress to next level */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">EXP Total: <strong className="text-white font-mono">{profile.exp}</strong></span>
                  <span className="text-slate-400">
                    Menuju <span className="text-cyan-300">{levelInfo.nextLevel}</span>: <strong className="text-cyan-300 font-mono">{levelInfo.expNeeded} EXP lagi</strong>
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500 rounded-full"
                    style={{ width: `${levelInfo.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics (Streak & Overall Completion) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Streak Belajar</span>
                <span className="text-xl font-mono font-bold text-white">{profile.streak} Hari</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center gap-3">
              <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Total Progres</span>
                <span className="text-xl font-mono font-bold text-emerald-400">{overallProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Banner: Fundamental Bahasa Bayi */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg shadow-amber-950/20">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 font-mono">
              FITUR BARU 👶
            </span>
            <span className="text-xs font-mono text-amber-300">BIOLOGI YTTA 😜</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            Pusing Materi Rumit? Buka "Fundamental Bahasa Bayi"!
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Metabolisme diumpamakan mainan Lego, Enzim kayak pembuka botol, DNA kayak resep Krabby Patty, dan Hukum Mendel kayak lempar koin. Coba baca sekarang!
          </p>
        </div>
        {onNavigateToFundamental && (
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigateToFundamental();
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-amber-950 shrink-0"
          >
            <span>Buka Bahasa Bayi 👶</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 4 Stats Matrix */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
          <span>Statistik Pembelajaran ATS</span>
          <span className="text-xs text-slate-500">· Tersimpan di Browser</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="cyber-panel rounded-xl p-4">
            <span className="text-xs text-slate-400 block mb-1">Kuis Diselesaikan</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-bold text-white">{profile.totalQuizzesTaken}</span>
              <span className="text-xs text-slate-500">sesi</span>
            </div>
          </div>

          <div className="cyber-panel rounded-xl p-4">
            <span className="text-xs text-slate-400 block mb-1">Skor Rata-rata</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-bold text-cyan-400">{profile.averageScore}</span>
              <span className="text-xs text-slate-500">/ 100</span>
            </div>
          </div>

          <div className="cyber-panel rounded-xl p-4">
            <span className="text-xs text-slate-400 block mb-1">Akurasi Jawaban</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-bold text-emerald-400">{accuracy}%</span>
              <span className="text-xs text-slate-500">benar</span>
            </div>
          </div>

          <div className="cyber-panel rounded-xl p-4">
            <span className="text-xs text-slate-400 block mb-1">Modul Dikuasai</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-bold text-purple-400">{profile.completedModules.length}</span>
              <span className="text-xs text-slate-500">/ {BIOLOGY_MODULES.length} modul</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Launch Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Module Fast Access */}
        <div className="cyber-panel rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Modul Belajar</span>
              <span className="text-xs text-slate-400">{profile.completedModules.length} dari 5 Selesai</span>
            </div>
            <h4 className="text-base font-bold text-white mb-1">Materi Kisi-kisi ATS Biologi XII</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pelajari ringkasan esensial: Metabolisme Sel, Enzim & Inhibitor, Sintesis Protein, Pembelahan Sel, dan Hukum Mendel beserta simulator laboratorium virtual interaktif.
            </p>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigateToModules();
            }}
            className="flex items-center justify-between w-full px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold text-xs rounded-xl transition-colors"
          >
            <span>Buka Modul & Lab Simulator</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Boss Battle Fast Access */}
        <div className="cyber-panel rounded-xl p-5 border border-purple-500/30 bg-purple-950/20 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-purple-300 uppercase tracking-wider flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-purple-400" /> Simulasi Resmi MAN 1 Metro
              </span>
              <span className="text-xs text-amber-400 font-mono">50 Soal · 90 Menit</span>
            </div>
            <h4 className="text-base font-bold text-white mb-1">Tryout Asesmen Tengah Semester (ATS)</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Uji kesiapan penuh menghadapi ATS sesungguhnya! 50 nomor soal lengkap sesuai naskah kisi-kisi resmi MAN 1 Metro dengan alokasi waktu 90 menit dan sistem nyawa 5 HP.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                onNavigateToQuiz('boss');
              }}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-colors"
            >
              <span>Kilat (20 Soal)</span>
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                onNavigateToQuiz('boss'); // handled in QuizTab
              }}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-colors shadow-lg shadow-purple-950"
            >
              <span>Ujian Resmi (50 Soal)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Badges & Achievements Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-slate-200">Daftar Pencapaian & Badge</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {profile.unlockedBadges.length} / {BADGES.length} Terbuka
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {BADGES.map((badge) => {
            const isUnlocked = profile.unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isUnlocked
                    ? 'bg-slate-900/90 border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                    : 'bg-slate-950/50 border-slate-800/80 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isUnlocked
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-900 text-slate-600 border border-slate-800'
                    }`}
                  >
                    {isUnlocked ? <Award className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                  </div>
                  {isUnlocked && (
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold">DIRAIH</span>
                  )}
                </div>
                <h4 className={`text-xs font-bold ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                  {badge.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Danger Zone: Reset Data */}
      <div className="pt-6 border-t border-slate-900 flex items-center justify-between flex-wrap gap-4 text-xs">
        <div className="text-slate-400">
          Ingin memulai simulasi ulang dari awal? Semua data disimpan secara lokal pada browser Anda.
        </div>
        <button
          onClick={onOpenResetModal}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Progres Belajar
        </button>
      </div>
    </div>
  );
};
