import React from 'react';
import { 
  Trophy, Award, Zap, Activity, BatteryCharging, Dna, GitBranch, 
  Sparkles, ShieldAlert, Flame, Crown, CheckCircle2, Lock 
} from 'lucide-react';
import { UserProfile, Badge } from '../types/biology';
import { BADGES } from '../data/biologyData';

interface BadgesTabProps {
  profile: UserProfile;
  onNavigateToQuiz: (mode: 'module' | 'boss', moduleId?: string) => void;
  onNavigateToModules: (moduleId?: string) => void;
}

export const BadgesTab: React.FC<BadgesTabProps> = ({
  profile,
  onNavigateToQuiz,
  onNavigateToModules,
}) => {
  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-6 h-6" />;
      case 'Activity':
        return <Activity className="w-6 h-6" />;
      case 'BatteryCharging':
        return <BatteryCharging className="w-6 h-6" />;
      case 'Dna':
        return <Dna className="w-6 h-6" />;
      case 'GitBranch':
        return <GitBranch className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6" />;
      case 'Award':
        return <Award className="w-6 h-6" />;
      case 'Flame':
        return <Flame className="w-6 h-6" />;
      case 'Crown':
        return <Crown className="w-6 h-6" />;
      default:
        return <Trophy className="w-6 h-6" />;
    }
  };

  const unlockedCount = profile.unlockedBadges.length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="cyber-panel rounded-2xl p-6 relative overflow-hidden flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">
            Galeri Pencapaian Ilmiah
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Bank Prestasi & Badge Biologi
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
            Raih seluruh 10 lencana kehormatan dengan menyelesaikan modul, memecahkan kode genetik, menuntaskan kuis tanpa salah, serta menaklukkan Boss Battle ATS!
          </p>
        </div>

        <div className="p-4 bg-slate-950/80 border border-emerald-500/30 rounded-xl text-center min-w-[140px]">
          <span className="text-xs text-slate-400 block mb-0.5">Koleksi Terbuka</span>
          <div className="text-2xl font-mono font-bold text-emerald-400">
            {unlockedCount} <span className="text-slate-500 text-sm">/ {BADGES.length}</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">
            {Math.round((unlockedCount / BADGES.length) * 100)}% Lengkap
          </span>
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {BADGES.map((badge) => {
          const isUnlocked = profile.unlockedBadges.includes(badge.id);

          return (
            <div
              key={badge.id}
              className={`p-5 rounded-2xl border transition-all flex items-start gap-4 relative overflow-hidden ${
                isUnlocked
                  ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                  : 'bg-slate-950/50 border-slate-800/80 opacity-60'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
                  isUnlocked
                    ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-400 shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-600'
                }`}
              >
                {isUnlocked ? getBadgeIcon(badge.iconName) : <Lock className="w-6 h-6" />}
              </div>

              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    {badge.category}
                  </span>
                  {isUnlocked ? (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Terbuka
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500">Terkunci</span>
                  )}
                </div>

                <h3 className={`text-sm font-bold truncate ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                  {badge.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
