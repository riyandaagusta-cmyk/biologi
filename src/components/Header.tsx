import React from 'react';
import { Volume2, VolumeX, RotateCcw, Zap, Sparkles, BookOpen, Trophy, LayoutDashboard, Baby } from 'lucide-react';
import { UserProfile } from '../types/biology';
import { soundManager } from '../utils/sound';

interface HeaderProps {
  activeTab: 'dashboard' | 'fundamental' | 'modules' | 'quiz' | 'badges';
  setActiveTab: (tab: 'dashboard' | 'fundamental' | 'modules' | 'quiz' | 'badges') => void;
  profile: UserProfile;
  toggleSound: () => void;
  onOpenResetModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  profile,
  toggleSound,
  onOpenResetModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
            YTTA
          </div>
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
            BIOLOGI YTTA 😜
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 border border-slate-800 rounded-lg">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('dashboard');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-slate-800 text-emerald-400 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('fundamental');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'fundamental'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm font-semibold'
                : 'text-amber-400/90 hover:text-amber-300'
            }`}
          >
            <Baby className="w-3.5 h-3.5" />
            Fundamental 👶
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('modules');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'modules'
                ? 'bg-slate-800 text-emerald-400 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Kisi-Kisi Materi
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('quiz');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-slate-800 text-emerald-400 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Tryout & Kuis
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('badges');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'badges'
                ? 'bg-slate-800 text-emerald-400 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            Prestasi ({profile.unlockedBadges.length}/10)
          </button>
        </nav>

        {/* Zone 3: Profile Level pill & Actions */}
        <div className="flex items-center gap-2">
          {/* Quick EXP badge */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-emerald-400 font-bold">{profile.exp} EXP</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 truncate max-w-[120px]">{profile.level}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={profile.soundEnabled ? 'Matikan Suara' : 'Aktifkan Suara'}
            className="p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            title={profile.soundEnabled ? 'Efek Suara Aktif' : 'Efek Suara Mati'}
          >
            {profile.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Reset progress button */}
          <button
            onClick={onOpenResetModal}
            aria-label="Reset Progres"
            className="p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-rose-400 hover:border-rose-900/50 transition-colors"
            title="Reset Progres Belajar"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/80 px-1 py-1.5 bg-slate-950">
        <button
          onClick={() => {
            soundManager.playClick();
            setActiveTab('dashboard');
          }}
          className={`flex flex-col items-center gap-0.5 px-1 py-1 text-[10px] font-medium transition-colors ${
            activeTab === 'dashboard' ? 'text-emerald-400' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          Home
        </button>
        <button
          onClick={() => {
            soundManager.playClick();
            setActiveTab('fundamental');
          }}
          className={`flex flex-col items-center gap-0.5 px-1 py-1 text-[10px] font-medium transition-colors ${
            activeTab === 'fundamental' ? 'text-amber-400' : 'text-slate-400'
          }`}
        >
          <Baby className="w-3.5 h-3.5" />
          Bayi 👶
        </button>
        <button
          onClick={() => {
            soundManager.playClick();
            setActiveTab('modules');
          }}
          className={`flex flex-col items-center gap-0.5 px-1 py-1 text-[10px] font-medium transition-colors ${
            activeTab === 'modules' ? 'text-emerald-400' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Materi
        </button>
        <button
          onClick={() => {
            soundManager.playClick();
            setActiveTab('quiz');
          }}
          className={`flex flex-col items-center gap-0.5 px-1 py-1 text-[10px] font-medium transition-colors ${
            activeTab === 'quiz' ? 'text-emerald-400' : 'text-slate-400'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          Tryout
        </button>
        <button
          onClick={() => {
            soundManager.playClick();
            setActiveTab('badges');
          }}
          className={`flex flex-col items-center gap-0.5 px-1 py-1 text-[10px] font-medium transition-colors ${
            activeTab === 'badges' ? 'text-emerald-400' : 'text-slate-400'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          Prestasi
        </button>
      </div>
    </header>
  );
};
