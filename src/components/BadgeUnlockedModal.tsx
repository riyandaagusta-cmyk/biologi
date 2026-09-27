import React from 'react';
import { Trophy, Sparkles, X } from 'lucide-react';
import { Badge } from '../types/biology';
import { soundManager } from '../utils/sound';

interface BadgeUnlockedModalProps {
  badge: Badge | null;
  onClose: () => void;
}

export const BadgeUnlockedModal: React.FC<BadgeUnlockedModalProps> = ({ badge, onClose }) => {
  if (!badge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-slate-900 border-2 border-emerald-500/50 rounded-2xl p-6 shadow-2xl text-center space-y-4 relative overflow-hidden">
        {/* Subtle glowing ring background */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border-2 border-emerald-400/40 flex items-center justify-center shadow-lg shadow-emerald-500/10">
          <Trophy className="w-8 h-8 text-emerald-400 animate-pulse" />
        </div>

        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
            Badge Baru Terbuka!
          </span>
          <h3 className="text-xl font-bold text-white">{badge.title}</h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">{badge.description}</p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-lg shadow-emerald-950"
          >
            Klaim Prestasi
          </button>
        </div>
      </div>
    </div>
  );
};
