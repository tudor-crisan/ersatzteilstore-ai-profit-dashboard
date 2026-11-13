import React, { useState } from 'react';
import { X, Layers, Database, Cpu, Bot, Zap, ArrowRight, CheckCircle2, Clock, ShieldCheck, RefreshCw } from 'lucide-react';
import { CONNECTORS } from '../data/mockData';

interface ArchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'connectors'>('architecture');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Enterprise Architecture & Extensible Data Pipeline
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Production Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Designed to scale effortlessly from PoC (Shopify + Google + Meta) to 20M+ SKUs & European expansion
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 pt-3 border-b border-slate-800 bg-slate-950/20 flex gap-4">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'architecture'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>5-Layer System Architecture</span>
          </button>
          <button
            onClick={() => setActiveTab('connectors')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'connectors'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Active & Modular Connectors ({CONNECTORS.length})</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {activeTab === 'architecture' ? (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-800/30 text-blue-200 leading-relaxed">
                <span className="font-semibold text-white block mb-1">Architecture Philosophy for Ersatzteilstore:</span>
                E-commerce spare parts require real-time correlation between <span className="font-semibold text-white">item-level ad clicks</span> (Google Shopping & Meta) and <span className="font-semibold text-white">post-purchase reality</span> (returns, shipping weight fees, supplier restocking). Our 5-tier decoupled pipeline ensures instant answers without slowing down storefront checkout.
              </div>

              {/* 5 Layer Pipeline */}
              <div className="space-y-3">
                {/* Layer 1 */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 relative group hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        LAYER 1
                      </span>
                      <span className="font-bold text-white text-sm">Unified Ingestion Adapters (Plug & Play)</span>
                    </div>
                    <span className="text-[11px] text-slate-400">Webhooks & OAuth APIs</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed mb-3">
                    Decoupled adapter interfaces for <span className="font-semibold text-white">Shopify Plus, Google Ads & Merchant Center, Meta Graph API, TikTok Ads, and GA4 BigQuery</span>. Supports easy addition of future channels (Amazon EU, eBay Motors, ERP).
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Shopify Webhooks (Orders/Returns)</span>
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Google Ads API (Item-Level Spend)</span>
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Meta CAPI & Marketing API</span>
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">GA4 Event Stream</span>
                  </div>
                </div>

                <div className="flex justify-center -my-1">
                  <ArrowRight className="w-4 h-4 text-slate-600 rotate-90" />
                </div>

                {/* Layer 2 */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 relative group hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        LAYER 2
                      </span>
                      <span className="font-bold text-white text-sm">Identity Resolution & Normalization Engine</span>
                    </div>
                    <span className="text-[11px] text-slate-400">20M SKU Mapping</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed mb-3">
                    Normalizes multi-currency data (<span className="font-semibold text-white">CHF, EUR</span>), reconciles SKU variations (OEM part number vs aftermarket cross-reference), and maps ad campaign parameters (UTM & click IDs) directly to individual orders.
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Real-time FX Conversion (CHF/EUR)</span>
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">OEM Cross-Reference Graph</span>
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">First-Party Attribution Stitcher</span>
                  </div>
                </div>

                <div className="flex justify-center -my-1">
                  <ArrowRight className="w-4 h-4 text-slate-600 rotate-90" />
                </div>

                {/* Layer 3 */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 relative group hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        LAYER 3
                      </span>
                      <span className="font-bold text-white text-sm">Contribution Margin & Unit Economics Core</span>
                    </div>
                    <span className="text-[11px] text-slate-400">True Profit Calculations</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed mb-3">
                    Calculates <span className="font-semibold text-white">CM1, CM2, and CM3</span> in real time: Net Profit = Revenue - Supplier COGS - Item Paid Ad Spend - Weight-based Freight - Return Losses - Payment Processing (Stripe/Twint/PayPal).
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">POAS Compute (Net Margin / Ad Spend)</span>
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Return Rate Risk Scoring</span>
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Swiss Post & DHL Freight Logic</span>
                  </div>
                </div>

                <div className="flex justify-center -my-1">
                  <ArrowRight className="w-4 h-4 text-slate-600 rotate-90" />
                </div>

                {/* Layer 4 */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 relative group hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        LAYER 4
                      </span>
                      <span className="font-bold text-white text-sm">Autonomous AI Monitoring & LLM Reasoning Engine</span>
                    </div>
                    <span className="text-[11px] text-slate-400">Continuous Heuristic Scans</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed mb-3">
                    Runs background anomaly jobs to detect bleeding ad sets, surge in returns, and expansion opportunities. Hosts the natural language RAG copilot for ad-hoc executive decision-making.
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Anomaly Watchdog Service</span>
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">LLM Natural Language Copilot</span>
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Budget Optimization Optimizer</span>
                  </div>
                </div>

                <div className="flex justify-center -my-1">
                  <ArrowRight className="w-4 h-4 text-slate-600 rotate-90" />
                </div>

                {/* Layer 5 */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 relative group hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        LAYER 5
                      </span>
                      <span className="font-bold text-white text-sm">Action Execution & Storefront Feedback</span>
                    </div>
                    <span className="text-[11px] text-slate-400">Automated Remediation</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed mb-3">
                    Pushes automatic corrective actions: pausing bleeding ad campaigns via Meta/Google Marketing APIs, adjusting bid floors on low-margin SKUs, and triggering VIN validation on Shopify checkout.
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Automated Ad Pause Hooks</span>
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Shopify Pricing & Checkout Scripts</span>
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Slack / Email Executive Alerts</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CONNECTORS.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-white text-sm">{c.name}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          c.status === 'connected'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : c.status === 'ready'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {c.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {c.description}
                    </p>

                    <div className="space-y-1 text-[11px] text-slate-400 mb-3">
                      <div className="flex items-center justify-between">
                        <span>Records Ingested:</span>
                        <span className="text-slate-200 font-medium">{c.recordsSynced}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Last Latency:</span>
                        <span className="text-slate-200 font-mono">{c.latencyMs}ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Last Sync:</span>
                        <span className="text-slate-200">{c.lastSync}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] font-semibold text-slate-500 block mb-1">DATA STREAMS:</span>
                    <div className="flex flex-wrap gap-1">
                      {c.dataPoints.map((dp, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                          {dp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between text-xs text-slate-400">
          <span>Ersatzteilstore Unit Economics Microservice • Modular REST & GraphQL API</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
