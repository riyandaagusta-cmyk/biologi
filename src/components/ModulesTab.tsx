import React, { useState } from 'react';
import { 
  BookOpen, CheckCircle, CheckCircle2, ChevronDown, ChevronUp, Zap, 
  Clock, Award, HelpCircle, Layers, ArrowRight, Play
} from 'lucide-react';
import { BiologyModule, UserProfile } from '../types/biology';
import { BIOLOGY_MODULES } from '../data/biologyData';
import { IngenhouszSimulator } from './widgets/IngenhouszSimulator';
import { EnzymeSimulator } from './widgets/EnzymeSimulator';
import { CodonTranslator } from './widgets/CodonTranslator';
import { CellDivisionVisualizer } from './widgets/CellDivisionVisualizer';
import { PunnettCalculator } from './widgets/PunnettCalculator';
import { saveProfile, calculateLevel } from '../utils/storage';
import { soundManager } from '../utils/sound';

interface ModulesTabProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onLaunchModuleQuiz: (moduleId: string) => void;
  selectedModuleId?: string;
}

export const ModulesTab: React.FC<ModulesTabProps> = ({
  profile,
  setProfile,
  onLaunchModuleQuiz,
  selectedModuleId,
}) => {
  const [activeModuleId, setActiveModuleId] = useState<string>(
    selectedModuleId || BIOLOGY_MODULES[0].id
  );

  const currentModule = BIOLOGY_MODULES.find((m) => m.id === activeModuleId) || BIOLOGY_MODULES[0];
  const isCompleted = profile.completedModules.includes(currentModule.id);

  const toggleModuleCompletion = () => {
    soundManager.playLevelUp();
    let updatedCompleted: string[];
    let expDelta = 0;

    if (isCompleted) {
      updatedCompleted = profile.completedModules.filter((id) => id !== currentModule.id);
      expDelta = -50;
    } else {
      updatedCompleted = [...profile.completedModules, currentModule.id];
      expDelta = 50;
    }

    const newExp = Math.max(0, profile.exp + expDelta);
    const updatedProfile: UserProfile = {
      ...profile,
      completedModules: updatedCompleted,
      exp: newExp,
      level: calculateLevel(newExp),
    };

    // Check module badges
    if (currentModule.id === 'modul-2' && !updatedProfile.unlockedBadges.includes('enzyme_expert')) {
      updatedProfile.unlockedBadges.push('enzyme_expert');
    }
    if (currentModule.id === 'modul-1' && !updatedProfile.unlockedBadges.includes('atp_powerhouse')) {
      updatedProfile.unlockedBadges.push('atp_powerhouse');
    }
    if (currentModule.id === 'modul-3' && !updatedProfile.unlockedBadges.includes('genetic_codecracker')) {
      updatedProfile.unlockedBadges.push('genetic_codecracker');
    }
    if (currentModule.id === 'modul-4' && !updatedProfile.unlockedBadges.includes('mitosis_master')) {
      updatedProfile.unlockedBadges.push('mitosis_master');
    }
    if (currentModule.id === 'modul-5' && !updatedProfile.unlockedBadges.includes('mendel_successor')) {
      updatedProfile.unlockedBadges.push('mendel_successor');
    }
    if (updatedCompleted.length === 5 && !updatedProfile.unlockedBadges.includes('genetic_master_badge')) {
      updatedProfile.unlockedBadges.push('genetic_master_badge');
    }

    setProfile(updatedProfile);
    saveProfile(updatedProfile);
  };

  const renderWidget = (type: string) => {
    switch (type) {
      case 'ingenhousz':
        return <IngenhouszSimulator />;
      case 'enzyme':
        return <EnzymeSimulator />;
      case 'codon':
        return <CodonTranslator />;
      case 'cell_cycle':
        return <CellDivisionVisualizer />;
      case 'punnett':
        return <PunnettCalculator />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Module Navigation Tabs (5 Modules) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {BIOLOGY_MODULES.map((mod) => {
          const isActive = mod.id === activeModuleId;
          const completed = profile.completedModules.includes(mod.id);
          return (
            <button
              key={mod.id}
              onClick={() => {
                soundManager.playClick();
                setActiveModuleId(mod.id);
              }}
              className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-900 border-emerald-500 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/50'
                  : completed
                  ? 'bg-slate-950/80 border-slate-700/80 hover:bg-slate-900/60'
                  : 'bg-slate-950/40 border-slate-800 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-semibold text-emerald-400">
                  MODUL 0{mod.number}
                </span>
                {completed && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                )}
              </div>
              <div className="text-xs font-bold text-white line-clamp-1">{mod.title}</div>
            </button>
          );
        })}
      </div>

      {/* Active Module Stage */}
      <div className="cyber-panel rounded-2xl p-6 space-y-6">
        {/* Module Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <span>MODUL 0{currentModule.number}</span>
              <span>·</span>
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {currentModule.durationMinutes} Menit
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{currentModule.title}</h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">{currentModule.summary}</p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Mark completed button */}
            <button
              onClick={toggleModuleCompletion}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
                isCompleted
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-sm'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-emerald-500/50'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{isCompleted ? 'Selesai Dipelajari (+50 EXP)' : 'Tandai Selesai (+50 EXP)'}</span>
            </button>

            {/* Launch Quiz Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                onLaunchModuleQuiz(currentModule.id);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-lg shadow-emerald-950"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Kuis Modul Ini</span>
            </button>
          </div>
        </div>

        {/* Embedded Interactive Laboratory Widget */}
        <div>
          {renderWidget(currentModule.widgetType)}
        </div>

        {/* Structured Reading Content */}
        <div className="space-y-6 pt-2">
          {currentModule.sections.map((section) => (
            <div key={section.id} className="space-y-3 pb-6 border-b border-slate-800/80 last:border-b-0">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{section.title}</span>
              </h3>

              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                {section.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Table Data if available */}
              {section.tableData && (
                <div className="overflow-x-auto my-3 border border-slate-800 rounded-xl bg-slate-950/60">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/80 text-emerald-400 font-mono">
                        {section.tableData.headers.map((h, i) => (
                          <th key={i} className="p-2.5 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {section.tableData.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-900/30 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className={`p-2.5 ${cIdx === 0 ? 'font-semibold text-slate-200' : 'text-slate-300'}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Key takeaways bullet box */}
              {section.keyPoints && section.keyPoints.length > 0 && (
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <span className="text-[11px] font-mono text-cyan-400 font-semibold block mb-1">
                    POIN PENTING KISI-KISI:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {section.keyPoints.map((kp, kIdx) => (
                      <li key={kIdx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 text-xs">▹</span>
                        <span>{kp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Visual callout box */}
              {section.visualCallout && (
                <div className="p-3 bg-purple-950/20 border border-purple-500/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40">
                      {section.visualCallout.tag || 'TIPS ATS'}
                    </span>
                    <h4 className="text-xs font-bold text-white">{section.visualCallout.title}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{section.visualCallout.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA to Quiz */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-bold block mb-0.5">Uji Penguasaan Materi</span>
            <h4 className="text-base font-bold text-white">Sudah paham materi {currentModule.title}?</h4>
            <p className="text-xs text-slate-400 mt-0.5">Kerjakan kuis pilihan ganda 5-7 soal dan dapatkan +20 EXP untuk setiap jawaban benar!</p>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onLaunchModuleQuiz(currentModule.id);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-lg shadow-emerald-950"
          >
            <span>Mulai Kuis Modul {currentModule.number}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
