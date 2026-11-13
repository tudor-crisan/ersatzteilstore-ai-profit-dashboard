import React, { useState } from 'react';
import { X, Layers, Database, Cpu, ArrowRight } from 'lucide-react';
import { CONNECTORS } from '../data/mockData';

interface ArchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'connectors'>('architecture');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[90vh] bg-black border border-neutral-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-black">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-neutral-900 border border-neutral-700 flex items-center justify-center text-red-500 font-bold font-mono">
              5L
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-serif font-bold text-white tracking-tight">
                  System Architecture & 20M SKU Pipeline
                </h2>
                <span className="bg-red-600 text-white font-mono text-[9px] font-bold uppercase px-1.5 py-0.2">
                  Production Scalable
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-sans">
                Modular integration pipeline for Switzerland, Germany, Spain, and Italy
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 pt-3 border-b border-neutral-800 bg-neutral-950 flex gap-4 font-mono text-xs">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`pb-3 font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'architecture'
                ? 'border-red-600 text-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>5-Layer Architecture</span>
          </button>
          <button
            onClick={() => setActiveTab('connectors')}
            className={`pb-3 font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'connectors'
                ? 'border-red-600 text-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Active Connectors ({CONNECTORS.length})</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {activeTab === 'architecture' ? (
            <div className="space-y-4">
              <div className="p-4 bg-neutral-950 border border-neutral-800 text-neutral-300 leading-relaxed font-sans">
                <span className="font-serif font-bold text-white block mb-1 text-sm">Design Philosophy for Ersatzteilstore:</span>
                E-commerce spare parts require real-time correlation between <strong className="text-white">item-level ad clicks</strong> (Google Shopping & Meta) and <strong className="text-white">post-purchase reality</strong> (returns, shipping weight fees, supplier restocking). Our 5-tier decoupled pipeline ensures instant answers without slowing down storefront checkout.
              </div>

              {/* 5 Layer Pipeline */}
              <div className="space-y-3 font-mono">
                {/* Layer 1 */}
                <div className="p-4 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-red-600 text-white">
                        LAYER 1
                      </span>
                      <span className="font-serif font-bold text-white text-base">Unified Ingestion Adapters (Plug & Play)</span>
                    </div>
                    <span className="text-[11px] text-neutral-500">Webhooks & OAuth APIs</span>
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed mb-3 font-sans">
                    Decoupled adapter interfaces for <strong className="text-neutral-200">Shopify Plus, Google Ads & Merchant Center, Meta Graph API, TikTok Ads, and GA4 BigQuery</strong>. Supports easy addition of future channels (Amazon EU, eBay Motors, ERP).
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2 py-1 bg-black border border-neutral-800 text-neutral-300">Shopify Webhooks</span>
                    <span className="px-2 py-1 bg-black border border-neutral-800 text-neutral-300">Google Ads API</span>
                    <span className="px-2 py-1 bg-black border border-neutral-800 text-neutral-300">Meta CAPI & Marketing API</span>
                    <span className="px-2 py-1 bg-black border border-neutral-800 text-neutral-300">GA4 Event Stream</span>
                  </div>
                </div>

                <div className="flex justify-center -my-1 text-neutral-600">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>

                {/* Layer 2 */}
                <div className="p-4 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-neutral-800 text-neutral-300">
                        LAYER 2
                      </span>
                      <span className="font-serif font-bold text-white text-base">Identity Resolution & Normalization Engine</span>
                    </div>
                    <span className="text-[11px] text-neutral-500">20M SKU Mapping</span>
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed mb-3 font-sans">
                    Normalizes multi-currency data (<strong className="text-neutral-200">CHF, EUR</strong>), reconciles SKU variations (OEM part number vs aftermarket cross-reference), and maps ad campaign parameters (UTM & click IDs) directly to individual orders.
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2 py-1 bg-black border border-neutral-800 text-neutral-300">Spot FX (CHF/EUR)</span>
                    <span className="px-2 py-1 bg-black border border-neutral-800 text-neutral-300">OEM Cross-Reference Graph</span>
                    <span className="px-2 py-1 bg-black border border-neutral-800 text-neutral-300">First-Party Attribution Stitcher</span>
                  </div>
                </div>

                <div className="flex justify-center -my-1 text-neutral-600">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>

                {/* Layer 3 */}
                <div className="p-4 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-red-600 text-white">
                        LAYER 3
                      </span>
                      <span className="font-serif font-bold text-white text-base">Contribution Margin & Unit Economics Core</span>
                    </div>
                    <span className="text-[11px] text-neutral-500">True Profit Calculations</span>
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed mb-3 font-sans">
                    Calculates <strong className="text-neutral-200">CM1, CM2, and CM3</strong> in real time: Net Profit = Revenue - Supplier COGS - Item Paid Ad Spend - Weight-based Freight - Return Losses - Payment Processing (Stripe/Twint/PayPal).
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2 py-1 bg-black border border-neutral-800 text-neutral-300">POAS Engine</span>
                    <span className="px-2 py-1 bg-black border border-neutral-800 text-neutral-300">Return Rate Risk Scoring</span>
                    <span className="px-2 py-1 bg-black border border-neutral-800 text-neutral-300">Swiss Post & DHL Freight</span>
                  </div>
                </div>

                <div className="flex justify-center -my-1 text-neutral-600">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>

                {/* Layer 4 */}
                <div className="p-4 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-neutral-800 text-neutral-300">
                        LAYER 4
                      </span>
                      <span className="font-serif font-bold text-white text-base">Autonomous AI Monitoring & LLM Reasoning Engine</span>
                    </div>
                    <span className="text-[11px] text-neutral-500">Heuristic Scans</span>
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed mb-3 font-sans">
                    Runs background anomaly jobs to detect bleeding ad sets, surge in returns, and expansion opportunities. Hosts the natural language copilot for executive decision-making.
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2 py-1 bg-black border border-neutral-800 text-neutral-300">Anomaly Watchdog</span>
                    <span className="px-2 py-1 bg-black border border-neutral-800 text-neutral-300">Natural Language Copilot</span>
                    <span className="px-2 py-1 bg-black border border-neutral-800 text-neutral-300">Budget Reallocator</span>
                  </div>
                </div>

                <div className="flex justify-center -my-1 text-neutral-600">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>

                {/* Layer 5 */}
                <div className="p-4 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-red-600 text-white">
                        LAYER 5
                      </span>
                      <span className="font-serif font-bold text-white text-base">Action Execution & Storefront Feedback</span>
                    </div>
                    <span className="text-[11px] text-neutral-500">Automation</span>
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed mb-3 font-sans">
                    Pushes automatic corrective actions: pausing bleeding ad campaigns via Meta/Google Marketing APIs, adjusting bid floors on low-margin SKUs, and triggering VIN validation on Shopify checkout.
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2 py-1 bg-black border border-neutral-800 text-neutral-300">Automated Ad Pauses</span>
                    <span className="px-2 py-1 bg-black border border-neutral-800 text-neutral-300">Shopify VIN Gating</span>
                    <span className="px-2 py-1 bg-black border border-neutral-800 text-neutral-300">Executive Email/Slack Alerts</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CONNECTORS.map((c) => (
                <div
                  key={c.id}
                  className="p-5 bg-neutral-950 border border-neutral-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif font-bold text-white text-base">{c.name}</span>
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 font-bold uppercase ${
                          c.status === 'connected'
                            ? 'bg-red-600 text-white'
                            : c.status === 'ready'
                            ? 'bg-neutral-800 text-neutral-200'
                            : 'bg-black text-neutral-500 border border-neutral-800'
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 font-sans leading-relaxed mb-3">
                      {c.description}
                    </p>

                    <div className="space-y-1 text-[11px] font-mono text-neutral-400 mb-3">
                      <div className="flex items-center justify-between">
                        <span>Records:</span>
                        <span className="text-white font-medium">{c.recordsSynced}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Latency:</span>
                        <span className="text-white">{c.latencyMs}ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Sync Status:</span>
                        <span className="text-white">{c.lastSync}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-800 font-mono">
                    <span className="text-[10px] text-neutral-500 block mb-1 uppercase font-bold">Data Streams:</span>
                    <div className="flex flex-wrap gap-1">
                      {c.dataPoints.map((dp, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 bg-black border border-neutral-800 text-neutral-300">
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
        <div className="p-4 border-t border-neutral-800 bg-black flex items-center justify-between text-xs font-mono text-neutral-500">
          <span>Ersatzteilstore Unit Economics Microservice</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-white font-mono text-xs uppercase font-bold transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
