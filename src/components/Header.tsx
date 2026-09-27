import React from 'react';
import { TabType } from '../types/formulation';

interface HeaderProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
  onOpenSearch: () => void;
  onOpenTerminal: () => void;
  titleContext?: string;
  subtitleContext?: string;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenSearch,
  onOpenTerminal,
  titleContext,
  subtitleContext,
  showBack = false
}) => {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#0d1310]/90 backdrop-blur-xl border-b border-[#1f382b]/60 shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
      <div className="h-16 px-margin flex items-center justify-between gap-2 max-w-7xl mx-auto">
        {/* Left Brand / Nav */}
        <div className="flex items-center gap-2 min-w-0">
          {showBack && (
            <button
              onClick={() => onNavigate('candidates')}
              aria-label="Navigate back"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-[#8da396] hover:text-[#00f5a0] hover:bg-[#131d18] border border-transparent hover:border-[#1f382b] transition-all shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back_ios_new</span>
            </button>
          )}

          {/* VeganForm.AI Logo Brand */}
          <div 
            onClick={() => onNavigate('product')} 
            className="flex items-center gap-2 cursor-pointer select-none shrink-0 group"
            title="VeganForm.AI Food R&D Platform"
          >
            {/* Bioluminescent Shield Molecular Node Icon */}
            <div className="w-8 h-8 rounded-full bg-[#0a0f0d] border border-[#00f5a0]/50 flex items-center justify-center relative shadow-[0_0_12px_rgba(0,245,160,0.3)] group-hover:shadow-[0_0_18px_rgba(0,245,160,0.6)] transition-all">
              <svg className="w-5 h-5 text-[#00f5a0]" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 5V11C4 16.5 7.4 21.6 12 23C16.6 21.6 20 16.5 20 11V5L12 2Z" stroke="#00f5a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#0d1411" />
                <circle cx="12" cy="7" r="1.5" fill="#00f5a0" />
                <circle cx="8.5" cy="12" r="1.5" fill="#38bdf8" />
                <circle cx="15.5" cy="14" r="1.5" fill="#00f5a0" />
                <line x1="12" y1="7" x2="8.5" y2="12" stroke="#00f5a0" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="8.5" y1="12" x2="15.5" y2="14" stroke="#00f5a0" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1 font-bold text-sm tracking-tight text-white leading-none">
                <span>VeganForm</span>
                <span className="text-[#00f5a0] drop-shadow-[0_0_6px_rgba(0,245,160,0.8)] font-mono">.AI</span>
              </div>
              <span className="font-mono text-[8px] text-[#8da396] tracking-[0.18em] uppercase leading-tight font-medium">
                FOOD R&amp;D PLATFORM
              </span>
            </div>
          </div>

          {/* Subtitle / Console context badge */}
          <div className="hidden sm:flex flex-col min-w-0 pl-3 border-l border-[#1f382b]/60">
            <div className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded bg-[#0b3d2e] text-[#00f5a0] font-mono text-[9px] tracking-wider shrink-0 border border-[#00f5a0]/30 font-semibold uppercase">
                {titleContext || (currentTab === 'detail' ? 'Candidate Detail' : 'AGENT v2.4')}
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#8da396] truncate">
              {subtitleContext || (currentTab === 'detail' ? 'Telemetry Live' : 'Candidates Console')}
            </span>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Quick Tab Quick Switchers on Desktop */}
          <div className="hidden lg:flex items-center gap-1 bg-[#131d18] p-1 rounded-lg border border-[#1f382b]/60 text-xs font-mono">
            <button
              onClick={() => onNavigate('product')}
              className={`px-2.5 py-1 rounded transition-colors ${currentTab === 'product' ? 'bg-[#00f5a0]/20 text-[#00f5a0] font-semibold border border-[#00f5a0]/40' : 'text-[#8da396] hover:text-white'}`}
            >
              Overview
            </button>
            <button
              onClick={() => onNavigate('formulate')}
              className={`px-2.5 py-1 rounded transition-colors ${currentTab === 'formulate' ? 'bg-[#00f5a0]/20 text-[#00f5a0] font-semibold border border-[#00f5a0]/40' : 'text-[#8da396] hover:text-white'}`}
            >
              Formulate
            </button>
            <button
              onClick={() => onNavigate('candidates')}
              className={`px-2.5 py-1 rounded transition-colors ${currentTab === 'candidates' || currentTab === 'detail' ? 'bg-[#00f5a0]/20 text-[#00f5a0] font-semibold border border-[#00f5a0]/40' : 'text-[#8da396] hover:text-white'}`}
            >
              Candidates
            </button>
            <button
              onClick={() => onNavigate('knowledge')}
              className={`px-2.5 py-1 rounded transition-colors ${currentTab === 'knowledge' ? 'bg-[#00f5a0]/20 text-[#00f5a0] font-semibold border border-[#00f5a0]/40' : 'text-[#8da396] hover:text-white'}`}
            >
              Knowledge
            </button>
            <button
              onClick={() => onNavigate('demo')}
              className={`px-2.5 py-1 rounded transition-colors ${currentTab === 'demo' ? 'bg-[#00f5a0]/20 text-[#00f5a0] font-semibold border border-[#00f5a0]/40' : 'text-[#8da396] hover:text-white'}`}
            >
              Extruder Sim
            </button>
          </div>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            aria-label="Diagnostic telemetry search"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[#8da396] hover:text-[#00f5a0] hover:bg-[#131d18] border border-[#1f382b]/40 transition-colors cursor-pointer"
            title="Search telemetry & database"
          >
            <span className="material-symbols-outlined text-[19px]">search</span>
          </button>

          {/* Terminal Console Trigger */}
          <button
            onClick={onOpenTerminal}
            aria-label="Laboratory system terminal"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[#8da396] hover:text-[#00f5a0] hover:bg-[#131d18] border border-[#1f382b]/40 transition-colors cursor-pointer"
            title="Open CUDA-BIO synthesis terminal"
          >
            <span className="material-symbols-outlined text-[19px]">terminal</span>
          </button>

          {/* User / Lab Investigator Avatar */}
          <div 
            className="w-8 h-8 rounded-full bg-[#1e2d25] border border-[#00f5a0]/40 flex items-center justify-center shrink-0 ml-1 shadow-[0_0_10px_rgba(0,245,160,0.2)]"
            title="Lead Biochemist • Pilot Lab 4"
          >
            <span className="material-symbols-outlined text-[#00f5a0] text-[18px]">biotech</span>
          </div>
        </div>
      </div>
    </header>
  );
};
