/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserProfile, Badge } from './types/biology';
import { loadProfile, saveProfile, resetAllProgress, DEFAULT_PROFILE } from './utils/storage';
import { soundManager } from './utils/sound';
import { BADGES } from './data/biologyData';
import { Header } from './components/Header';
import { DashboardTab } from './components/DashboardTab';
import { FundamentalTab } from './components/FundamentalTab';
import { ModulesTab } from './components/ModulesTab';
import { QuizTab } from './components/QuizTab';
import { BadgesTab } from './components/BadgesTab';
import { ResetModal } from './components/ResetModal';
import { BadgeUnlockedModal } from './components/BadgeUnlockedModal';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => loadProfile());
  const [activeTab, setActiveTab] = useState<'dashboard' | 'fundamental' | 'modules' | 'quiz' | 'badges'>('dashboard');
  const [targetModuleId, setTargetModuleId] = useState<string>('modul-1');
  const [targetQuizMode, setTargetQuizMode] = useState<'module' | 'boss'>('module');
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [unlockedBadgeCelebration, setUnlockedBadgeCelebration] = useState<Badge | null>(null);

  // Sync sound manager with profile
  useEffect(() => {
    soundManager.enabled = profile.soundEnabled;
  }, [profile.soundEnabled]);

  const toggleSound = () => {
    const nextState = !profile.soundEnabled;
    soundManager.enabled = nextState;
    if (nextState) {
      soundManager.playClick();
    }
    const updated = { ...profile, soundEnabled: nextState };
    setProfile(updated);
    saveProfile(updated);
  };

  const handleOpenResetModal = () => {
    soundManager.playClick();
    setIsResetModalOpen(true);
  };

  const handleConfirmReset = () => {
    resetAllProgress();
    setProfile({ ...DEFAULT_PROFILE });
    setIsResetModalOpen(false);
    setActiveTab('dashboard');
  };

  const handleBadgeUnlocked = (badgeId: string) => {
    const badge = BADGES.find((b) => b.id === badgeId);
    if (badge) {
      soundManager.playLevelUp();
      setUnlockedBadgeCelebration(badge);
    }
  };

  const handleNavigateToModules = (moduleId?: string) => {
    if (moduleId) {
      setTargetModuleId(moduleId);
    }
    setActiveTab('modules');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToQuiz = (mode: 'module' | 'boss', moduleId?: string) => {
    setTargetQuizMode(mode);
    if (moduleId) {
      setTargetModuleId(moduleId);
    }
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 cyber-grid flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        toggleSound={toggleSound}
        onOpenResetModal={handleOpenResetModal}
      />

      {/* Main Workspace Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        {activeTab === 'dashboard' && (
          <DashboardTab
            profile={profile}
            setProfile={setProfile}
            onNavigateToModules={handleNavigateToModules}
            onNavigateToQuiz={handleNavigateToQuiz}
            onNavigateToFundamental={() => {
              setActiveTab('fundamental');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenResetModal={handleOpenResetModal}
          />
        )}

        {activeTab === 'fundamental' && (
          <FundamentalTab />
        )}

        {activeTab === 'modules' && (
          <ModulesTab
            profile={profile}
            setProfile={setProfile}
            selectedModuleId={targetModuleId}
            onLaunchModuleQuiz={(modId) => handleNavigateToQuiz('module', modId)}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizTab
            profile={profile}
            setProfile={setProfile}
            initialMode={targetQuizMode}
            initialModuleId={targetModuleId}
            onBadgeUnlocked={handleBadgeUnlocked}
            onNavigateToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'badges' && (
          <BadgesTab
            profile={profile}
            onNavigateToQuiz={handleNavigateToQuiz}
            onNavigateToModules={handleNavigateToModules}
          />
        )}
      </main>

      {/* Cyber-Lab Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span className="text-slate-400 font-mono font-bold">BIOLOGI YTTA 😜 · Yang Tahu Tahu Aja</span>
          </div>
          <p className="text-slate-500">
            Disusun Berdasarkan Kisi-Kisi Resmi Asesmen Tengah Semester Biologi Kelas XII MAN 1 Metro
          </p>
        </div>
      </footer>

      {/* Reset Confirmation Modal */}
      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
      />

      {/* Badge Unlocked Celebration Modal */}
      <BadgeUnlockedModal
        badge={unlockedBadgeCelebration}
        onClose={() => setUnlockedBadgeCelebration(null)}
      />
    </div>
  );
}
