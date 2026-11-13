import React from 'react';
import { Region } from '../types';
import { Presentation, Layers, MessageSquare, Terminal } from 'lucide-react';

interface HeaderProps {
  currentRegion: Region;
  onSelectRegion: (r: Region) => void;
  onOpenCopilot: () => void;
  onOpenArchitecture: () => void;
  onOpenSlideDeck: () => void;
  unreadAlertCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentRegion,
  onSelectRegion,
  onOpenCopilot,
  onOpenArchitecture,
  onOpenSlideDeck,
  unreadAlertCount
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-800 bg-black text-white px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 flex items-center justify-center font-bold text-white font-mono text-sm">
            ES
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-white text-lg tracking-tight">
                Ersatzteilstore
              </span>
              <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 font-mono">
                Profit Engine
              </span>
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px] font-mono">
                <span className="w-1.5 h-1.5 bg-red-600 radar-dot-red"></span>
                <span>Live Sync (20.4M SKUs)</span>
              </div>
            </div>
            <p className="text-[11px] text-neutral-400 font-sans hidden sm:block">
              Unit Economics & Autonomous POAS Intelligence &bull; Built by Tudor Crișan
            </p>
          </div>
        </div>

        {/* Center: Market Switcher */}
        <div className="flex items-center border border-neutral-800 bg-neutral-950 p-1 font-mono text-xs">
          <button
            onClick={() => onSelectRegion('ALL')}
            className={`px-3 py-1 font-medium transition-all ${
              currentRegion === 'ALL'
                ? 'bg-red-600 text-white font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            All Markets
          </button>
          <button
            onClick={() => onSelectRegion('CH')}
            className={`px-3 py-1 font-medium transition-all flex items-center gap-1 ${
              currentRegion === 'CH'
                ? 'bg-red-600 text-white font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>CH (CHF)</span>
          </button>
          <button
            onClick={() => onSelectRegion('DE')}
            className={`px-3 py-1 font-medium transition-all flex items-center gap-1 ${
              currentRegion === 'DE'
                ? 'bg-red-600 text-white font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>DE (€)</span>
          </button>
          <button
            onClick={() => onSelectRegion('ES')}
            className={`px-3 py-1 font-medium transition-all flex items-center gap-1 ${
              currentRegion === 'ES'
                ? 'bg-red-600 text-white font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>ES (€)</span>
          </button>
          <button
            onClick={() => onSelectRegion('IT')}
            className={`px-3 py-1 font-medium transition-all flex items-center gap-1 ${
              currentRegion === 'IT'
                ? 'bg-red-600 text-white font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>IT (€)</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Pitch Deck Button */}
          <button
            onClick={onOpenSlideDeck}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold bg-neutral-900 border border-neutral-700 hover:border-red-600 text-white transition-all group"
          >
            <Presentation className="w-3.5 h-3.5 text-red-500 group-hover:scale-110 transition-transform" />
            <span>Slide Deck</span>
            <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.2 font-sans uppercase">
              8 Slides
            </span>
          </button>

          <button
            onClick={onOpenArchitecture}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-neutral-300 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 hover:text-white transition-all"
            title="View 5-Layer Modular Architecture"
          >
            <Layers className="w-3.5 h-3.5 text-neutral-400" />
            <span>Architecture</span>
          </button>

          <button
            onClick={onOpenCopilot}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-bold text-white bg-red-600 hover:bg-red-700 transition-all border border-red-500"
          >
            <MessageSquare className="w-3.5 h-3.5 text-white" />
            <span>AI Copilot</span>
            {unreadAlertCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-white"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
