import React, { useState } from 'react';
import { Region, AnomalyAlert, ProductItem, CampaignItem } from './types';
import { INITIAL_PRODUCTS, INITIAL_CAMPAIGNS, INITIAL_ALERTS } from './data/mockData';
import { Header } from './components/Header';
import { MetricCards } from './components/MetricCards';
import { ProfitWaterfallChart } from './components/ProfitWaterfallChart';
import { ProactiveAlerts } from './components/ProactiveAlerts';
import { CampaignsTable } from './components/CampaignsTable';
import { ProductTable } from './components/ProductTable';
import { AICopilotDrawer } from './components/AICopilotDrawer';
import { ArchitectureModal } from './components/ArchitectureModal';
import { SlideDeckModal } from './components/SlideDeckModal';
import { Presentation, MessageSquare, ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  const [currentRegion, setCurrentRegion] = useState<Region>('ALL');
  const [alerts, setAlerts] = useState<AnomalyAlert[]>(INITIAL_ALERTS);
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [campaigns, setCampaigns] = useState<CampaignItem[]>(INITIAL_CAMPAIGNS);
  const [appliedProfitBoost, setAppliedProfitBoost] = useState<number>(0);
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState<boolean>(false);
  const [isSlideDeckOpen, setIsSlideDeckOpen] = useState<boolean>(false);

  // Filter products and campaigns by region if not 'ALL'
  const filteredProducts = currentRegion === 'ALL' 
    ? products 
    : products.filter(p => p.region === currentRegion);

  const filteredCampaigns = currentRegion === 'ALL'
    ? campaigns
    : campaigns.filter(c => c.region === currentRegion);

  const handleApplyAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        setAppliedProfitBoost(boost => boost + a.impactValue);
        return { ...a, applied: true };
      }
      return a;
    }));
  };

  const unreadAlerts = alerts.filter(a => !a.applied).length;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      {/* Top Navigation */}
      <Header
        currentRegion={currentRegion}
        onSelectRegion={setCurrentRegion}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onOpenSlideDeck={() => setIsSlideDeckOpen(true)}
        unreadAlertCount={unreadAlerts}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        
        {/* Executive Banner for Afram & Leadership */}
        <div className="p-5 sm:p-6 bg-neutral-950 border-l-4 border-l-red-600 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-red-600 text-white font-mono text-[10px] font-bold uppercase px-2 py-0.5">
                EXECUTIVE DEMO
              </span>
              <span className="text-white font-serif font-bold text-base sm:text-lg">
                Ersatzteilstore Unit Economics & AI Profit Control System
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-sans max-w-3xl">
              Engineered specifically for <strong>20M spare parts articles</strong> and multi-country expansion across <strong>CH, DE, ES, and IT</strong>. Solves the return rate and freight blindspot of standard ad agency dashboards.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 font-mono text-xs">
            <button
              onClick={() => setIsSlideDeckOpen(true)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <Presentation className="w-4 h-4" />
              <span>Open Pitch Deck</span>
            </button>
            <button
              onClick={() => setIsCopilotOpen(true)}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
            >
              <span>Test AI Copilot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 1. Core Unit Economics & POAS Metrics */}
        <MetricCards 
          currentRegion={currentRegion} 
          appliedProfitBoost={appliedProfitBoost} 
        />

        {/* 2. Visual Waterfall + Proactive Anomaly Watchdog */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-7">
            <ProfitWaterfallChart appliedProfitBoost={appliedProfitBoost} />
          </div>
          <div className="lg:col-span-5">
            <ProactiveAlerts 
              alerts={alerts} 
              onApplyAlert={handleApplyAlert} 
            />
          </div>
        </div>

        {/* 3. Cross-Channel Paid Ad Spend & Net Contribution (Google Ads + Meta + TikTok) */}
        <CampaignsTable campaigns={filteredCampaigns} />

        {/* 4. SKU-Level Unit Economics (20M Catalog drill-down) */}
        <ProductTable products={filteredProducts} />
      </main>

      {/* Floating Copilot Button */}
      {!isCopilotOpen && (
        <button
          onClick={() => setIsCopilotOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-red-600 hover:bg-red-700 text-white shadow-2xl flex items-center gap-2.5 transition-all border border-red-500 font-mono text-xs font-bold uppercase tracking-wider group"
        >
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-white" />
            {unreadAlerts > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white"></span>
            )}
          </div>
          <span>AI Profit Copilot</span>
          <span className="text-[10px] bg-black/40 px-1.5 py-0.5 font-mono text-white/90">⌘K</span>
        </button>
      )}

      {/* Slide-over AI Copilot */}
      <AICopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        products={products}
        campaigns={campaigns}
      />

      {/* 5-Layer Architecture Modal */}
      <ArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />

      {/* Strategic Pitch Deck Modal */}
      <SlideDeckModal
        isOpen={isSlideDeckOpen}
        onClose={() => setIsSlideDeckOpen(false)}
      />

      {/* Footer in Tudorbuilds / MyDeveloperQuit Style */}
      <footer className="border-t border-neutral-800 bg-black py-8 px-4 sm:px-8 mt-12 text-xs font-mono text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600"></span>
            <span className="text-neutral-300 font-bold">ERSATZTEILSTORE AG</span>
            <span>&bull;</span>
            <span>Switzerland &bull; Germany &bull; Spain &bull; Italy</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <span>Production Prototype by Tudor Crișan</span>
            <span>&bull;</span>
            <a href="https://tudorbuilds.com" target="_blank" rel="noreferrer" className="text-white hover:text-red-500 underline decoration-neutral-700">
              tudorbuilds.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
