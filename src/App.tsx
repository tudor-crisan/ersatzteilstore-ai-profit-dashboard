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
import { Sparkles, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

export const App: React.FC = () => {
  const [currentRegion, setCurrentRegion] = useState<Region>('ALL');
  const [alerts, setAlerts] = useState<AnomalyAlert[]>(INITIAL_ALERTS);
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [campaigns, setCampaigns] = useState<CampaignItem[]>(INITIAL_CAMPAIGNS);
  const [appliedProfitBoost, setAppliedProfitBoost] = useState<number>(0);
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState<boolean>(false);

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Header
        currentRegion={currentRegion}
        onSelectRegion={setCurrentRegion}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        unreadAlertCount={unreadAlerts}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Banner Alert for Afram's Skill Test Demo */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-slate-900 border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shadow-blue-900/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
              <Sparkles className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">
                  AI Profit Engine Proof-of-Concept for Ersatzteilstore
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                  Ready for Review
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Connecting <strong>Shopify, Google Ads, Meta Ads & GA4</strong>. Open the AI Copilot to ask the 3 benchmark questions directly!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsCopilotOpen(true)}
              className="px-3.5 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
            >
              <span>Test AI Copilot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsArchitectureOpen(true)}
              className="px-3.5 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl transition-all"
            >
              View Architecture
            </button>
          </div>
        </div>

        {/* 1. Core Unit Economics & POAS Metrics */}
        <MetricCards 
          currentRegion={currentRegion} 
          appliedProfitBoost={appliedProfitBoost} 
        />

        {/* 2. Visual Waterfall + Proactive Anomaly Watchdog */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
          className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl shadow-xl shadow-blue-500/30 flex items-center gap-2.5 transition-all transform hover:scale-105 group border border-blue-400/30"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-cyan-300 group-hover:rotate-12 transition-transform" />
            {unreadAlerts > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            )}
          </div>
          <span className="font-semibold text-xs tracking-wide">Ask AI Profit Copilot</span>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">⌘K</span>
        </button>
      )}

      {/* Slide-over AI Copilot */}
      <AICopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        products={products}
        campaigns={campaigns}
      />

      {/* Architecture & Connectors Modal */}
      <ArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 px-4 mt-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Ersatzteilstore AI Profit Dashboard • Built for Switzerland, Germany, Spain & Italy Expansion
          </p>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Shopify Plus Webhooks</span>
            <span>•</span>
            <span>Google Ads API</span>
            <span>•</span>
            <span>Meta Graph API</span>
            <span>•</span>
            <span>GA4 BigQuery</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
