import React from 'react';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-rose-400">
            <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="text-base font-bold text-white">Reset Progres Belajar?</h3>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Tindakan ini akan mengosongkan seluruh riwayat kuis, total EXP, level, modul yang telah ditandai, dan badge prestasi yang sudah diraih dari penyimpanan lokal browser (Local Storage).
        </p>

        <div className="p-3 bg-rose-950/20 border border-rose-500/20 rounded-xl text-xs text-rose-300">
          Data yang telah direset tidak dapat dikembalikan lagi. Anda akan memulai dari level "Novice Biologist".
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => {
              soundManager.playWrong();
              onConfirm();
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors shadow-lg shadow-rose-950"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Ya, Reset Semua
          </button>
        </div>
      </div>
    </div>
  );
};
