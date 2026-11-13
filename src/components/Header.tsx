import React from 'react';
import { Region } from '../types';
import { Sparkles, Layers, RefreshCw, Globe, Calendar, Download } from 'lucide-react';

interface HeaderProps {
  currentRegion: Region;
  onSelectRegion: (r: Region) => void;
  onOpenCopilot: () => void;
  onOpenArchitecture: () => void;
  unreadAlertCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentRegion,
  onSelectRegion,
  onOpenCopilot,
  onOpenArchitecture,
  unreadAlertCount
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20">
            <div className="h-full w-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                ES
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 text-lg tracking-tight">Ersatzteilstore</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                ProfitPulse AI
              </span>
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 radar-dot"></span>
                <span>Live Data Sync</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              AI Unit Economics Engine • 20.4M Articles Monitored
            </p>
          </div>
        </div>

        {/* Center: Market Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => onSelectRegion('ALL')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              currentRegion === 'ALL'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            All Markets
          </button>
          <button
            onClick={() => onSelectRegion('CH')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              currentRegion === 'CH'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>🇨🇭</span>
            <span>CH (CHF)</span>
          </button>
          <button
            onClick={() => onSelectRegion('DE')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              currentRegion === 'DE'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>🇩🇪</span>
            <span>DE (€)</span>
          </button>
          <button
            onClick={() => onSelectRegion('ES')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              currentRegion === 'ES'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>🇪🇸</span>
            <span>ES (€)</span>
          </button>
          <button
            onClick={() => onSelectRegion('IT')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              currentRegion === 'IT'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>🇮🇹</span>
            <span>IT (€)</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenArchitecture}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 rounded-lg transition-all"
            title="View Modular Integration Architecture"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Connectors & Arch</span>
          </button>

          <button
            onClick={onOpenCopilot}
            className="relative flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg shadow-md shadow-blue-500/20 transition-all group"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 group-hover:rotate-12 transition-transform" />
            <span>AI Copilot</span>
            {unreadAlertCount > 0 && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300"></span>
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
