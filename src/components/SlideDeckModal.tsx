import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Presentation, ArrowRight, ShieldAlert, TrendingUp, CheckCircle2, Layers, Zap, Flame } from 'lucide-react';

interface SlideDeckProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SlideDeckModal: React.FC<SlideDeckProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = 8;

  // Keyboard arrow navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="w-full max-w-5xl h-[88vh] bg-black border border-neutral-800 rounded-none shadow-2xl flex flex-col justify-between overflow-hidden relative">
        
        {/* Top Minimalist Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-black">
          <div className="flex items-center gap-3">
            <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-none font-sans">
              ERSATZTEILSTORE
            </span>
            <span className="text-neutral-400 text-xs font-mono">
              STRATEGIC EXECUTIVE BRIEFING &bull; SLIDE {currentSlide + 1} OF {totalSlides}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-neutral-500 text-[11px] font-mono">
              Use [←] and [→] keys
            </span>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent hover:border-neutral-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Body */}
        <div className="flex-1 p-6 sm:p-12 overflow-y-auto flex flex-col justify-center">
          
          {/* SLIDE 1: Title */}
          {currentSlide === 0 && (
            <div className="max-w-3xl mx-auto text-left space-y-6">
              <div className="inline-block bg-red-600/10 border border-red-600/30 text-red-500 font-mono text-xs font-bold px-3 py-1 uppercase tracking-wider">
                Proof of Concept & Execution Plan
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight tracking-tight">
                The AI Profit Engine for <span className="text-red-600 underline decoration-red-600/50">20 Million</span> Spare Parts.
              </h1>
              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-sans">
                Moving from vanity marketing metrics to true net unit economics. A self-optimizing control system for Ersatzteilstore’s multi-country expansion across <strong>Switzerland, Germany, Spain, and Italy</strong>.
              </p>

              <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400">
                <div>
                  <span className="text-neutral-200 font-bold block">PREPARED FOR:</span>
                  <span>Afram & Ersatzteilstore Leadership</span>
                </div>
                <div>
                  <span className="text-neutral-200 font-bold block">ARCHITECTURE:</span>
                  <span>Shopify Plus &bull; Google Ads &bull; Meta &bull; GA4 &bull; ERP</span>
                </div>
                <div>
                  <span className="text-neutral-200 font-bold block">ENGINEER:</span>
                  <span className="text-white">Tudor Crișan</span>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: The Core Problem */}
          {currentSlide === 1 && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center gap-2 text-red-500 font-mono text-xs font-bold uppercase tracking-wider">
                <Flame className="w-4 h-4" />
                <span>The High-SKU Blindspot</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                "In spare parts, revenue is vanity. Margin is sanity. Cash flow is reality."
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-5 bg-neutral-950 border border-neutral-800">
                  <span className="text-red-500 font-mono text-xl font-bold block mb-1">01. Return Rates</span>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    Customers misdiagnose car/appliance faults and order wrong variants. Heavy automotive parts reach <strong>32%+ return rates</strong>, turning paper profits negative.
                  </p>
                </div>

                <div className="p-5 bg-neutral-950 border border-neutral-800">
                  <span className="text-red-500 font-mono text-xl font-bold block mb-1">02. Freight & Weight</span>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    Shipping heavy brake discs or motors cross-border (CH to DE/ES) carries surcharges that traditional ad algorithms completely ignore.
                  </p>
                </div>

                <div className="p-5 bg-neutral-950 border border-neutral-800">
                  <span className="text-red-500 font-mono text-xl font-bold block mb-1">03. The ROAS Trap</span>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    Google & Meta optimize for top-line revenue. An ad with <strong>4.5x ROAS</strong> can easily lose 2,000+ CHF if returns and COGS are not stitched in real time.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-neutral-900 border-l-4 border-red-600 text-xs font-mono text-neutral-300">
                <strong>THE SOLUTION:</strong> ProfitPulse AI shifts the core KPI from ROAS to <strong>POAS (Profit On Ad Spend)</strong> and Contribution Margin 3 (CM3).
              </div>
            </div>
          )}

          {/* SLIDE 3: Case Study 1 */}
          {currentSlide === 2 && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center gap-2 text-red-500 font-mono text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>Question #2: "Where are we currently losing money?"</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                Case Study: The 4.58x ROAS Illusion (Brembo Brake Discs DE)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-6 bg-neutral-950 border border-neutral-800 space-y-3">
                  <span className="text-neutral-400 font-mono text-xs uppercase font-bold block">
                    What The Ad Agency / Google Shows You:
                  </span>
                  <div className="text-3xl font-serif font-bold text-white">
                    4.58x <span className="text-xs font-mono text-neutral-400 font-normal">ROAS (28,400 CHF Rev)</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    Standard agency reporting celebrates this as a winning campaign and asks for more budget.
                  </p>
                  <div className="inline-block px-2 py-1 bg-neutral-800 text-neutral-300 font-mono text-[11px]">
                    Status: "Scaling"
                  </div>
                </div>

                <div className="p-6 bg-red-950/20 border border-red-600/40 space-y-3">
                  <span className="text-red-500 font-mono text-xs uppercase font-bold block">
                    What ProfitPulse AI Calculates (The Reality):
                  </span>
                  <div className="text-3xl font-serif font-bold text-red-500">
                    -2,150 CHF <span className="text-xs font-mono text-neutral-400 font-normal">Net Cash Loss</span>
                  </div>
                  <ul className="text-xs text-neutral-300 space-y-1.5 font-sans">
                    <li>&bull; <strong>32.4% Return Rate:</strong> Customers ordering wrong diameter for BMW G30/G31.</li>
                    <li>&bull; <strong>Freight Penalty:</strong> 4,800 CHF return shipping on 22kg cast iron discs.</li>
                    <li>&bull; <strong>True POAS:</strong> <strong className="text-red-400">-0.34x</strong> (Every 1 CHF ad spend destroys 34 cents).</li>
                  </ul>
                  <div className="inline-block px-2 py-1 bg-red-600 text-white font-mono text-[11px] font-bold">
                    Action: Gated Checkout + Ad Bid Reduction
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 4: Case Study 2 */}
          {currentSlide === 3 && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center gap-2 text-red-500 font-mono text-xs font-bold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>Question #1: "Which products are most profitable?"</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                Uncovering The Stars: High Margin OEM & Heating Spares
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 bg-neutral-950 border border-neutral-800">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-serif font-bold text-white text-lg">Kärcher Brass Cylinder Head</span>
                    <span className="font-mono text-xs bg-red-600 text-white px-2 py-0.5 font-bold">5.66x POAS</span>
                  </div>
                  <p className="text-xs text-neutral-400 font-mono mb-3">SKU: ET-KRC-5100 &bull; Cleaning Spares</p>
                  <div className="space-y-1 text-xs text-neutral-300 font-sans">
                    <div className="flex justify-between"><span>Net Margin:</span><strong className="text-white">53.1% (Best in Catalog)</strong></div>
                    <div className="flex justify-between"><span>Return Rate:</span><strong className="text-white">1.8% (Negligible)</strong></div>
                    <div className="flex justify-between"><span>Net Profit:</span><strong className="text-white">+9,350 CHF</strong></div>
                  </div>
                </div>

                <div className="p-5 bg-neutral-950 border border-neutral-800">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-serif font-bold text-white text-lg">Grundfos Alpha2 Heating Pump</span>
                    <span className="font-mono text-xs bg-red-600 text-white px-2 py-0.5 font-bold">5.46x POAS</span>
                  </div>
                  <p className="text-xs text-neutral-400 font-mono mb-3">SKU: ET-GRU-1205 &bull; HVAC & Domestic</p>
                  <div className="space-y-1 text-xs text-neutral-300 font-sans">
                    <div className="flex justify-between"><span>Net Margin:</span><strong className="text-white">38.0%</strong></div>
                    <div className="flex justify-between"><span>Return Rate:</span><strong className="text-white">2.6%</strong></div>
                    <div className="flex justify-between"><span>Net Profit:</span><strong className="text-white">+13,125 CHF</strong></div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 font-sans">
                💡 <strong>The Strategic Insight:</strong> Swiss exact-match search for Grundfos and Kärcher currently suffers from a <strong>21% lost impression share</strong> due to budget caps. Uncapping these campaigns yields an immediate <strong>+18,200 CHF in net margin</strong>.
              </div>
            </div>
          )}

          {/* SLIDE 5: Budget Optimization */}
          {currentSlide === 4 && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center gap-2 text-red-500 font-mono text-xs font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>Question #3: "Which marketing budgets should we optimize?"</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                Zero-Net-Spend Reallocation: +14,650 CHF/mo Bottom Line
              </h2>

              <div className="overflow-x-auto border border-neutral-800">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 font-mono uppercase text-[11px]">
                      <th className="p-3">Channel / Campaign</th>
                      <th className="p-3">Current POAS</th>
                      <th className="p-3">Action</th>
                      <th className="p-3">Budget Shift</th>
                      <th className="p-3 text-right">Profit Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80 bg-neutral-950 font-mono">
                    <tr className="text-neutral-300">
                      <td className="p-3 font-sans font-medium text-white">Meta Broad Cold Prospecting (DE/ES)</td>
                      <td className="p-3 text-red-500 font-bold">-0.42x</td>
                      <td className="p-3 text-red-400 font-bold">CUT / PAUSE</td>
                      <td className="p-3 text-red-500">-6,200 CHF</td>
                      <td className="p-3 text-right text-white font-bold">+2,600 CHF (Loss stopped)</td>
                    </tr>
                    <tr className="text-neutral-300">
                      <td className="p-3 font-sans font-medium text-white">Google Shopping DE (Heavy Braking)</td>
                      <td className="p-3 text-neutral-400">0.21x</td>
                      <td className="p-3 text-neutral-400 font-bold">TRIM</td>
                      <td className="p-3 text-neutral-400">-2,300 CHF</td>
                      <td className="p-3 text-right text-white font-bold">+1,850 CHF (Loss stopped)</td>
                    </tr>
                    <tr className="text-neutral-300 bg-red-950/10">
                      <td className="p-3 font-sans font-medium text-white">Google CH Exact Match OEM Parts</td>
                      <td className="p-3 text-white font-bold">4.88x</td>
                      <td className="p-3 text-red-500 font-bold">SCALE</td>
                      <td className="p-3 text-white font-bold">+4,500 CHF</td>
                      <td className="p-3 text-right text-red-500 font-bold">+18,200 CHF</td>
                    </tr>
                    <tr className="text-neutral-300 bg-red-950/10">
                      <td className="p-3 font-sans font-medium text-white">Google PMax CH High Margin Spares</td>
                      <td className="p-3 text-white font-bold">3.42x</td>
                      <td className="p-3 text-red-500 font-bold">SCALE</td>
                      <td className="p-3 text-white font-bold">+2,500 CHF</td>
                      <td className="p-3 text-right text-red-500 font-bold">+6,800 CHF</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-black border border-red-600 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <div>
                  <span className="text-neutral-400 block">TOTAL BUDGET CHANGE:</span>
                  <span className="text-white font-bold text-base">0 CHF (Budget Neutral)</span>
                </div>
                <div className="text-right">
                  <span className="text-neutral-400 block">NET CASH PROFIT GAIN:</span>
                  <span className="text-red-500 font-bold text-xl">+14,650 CHF / Month</span>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 6: Autonomous AI Watchdog */}
          {currentSlide === 5 && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center gap-2 text-red-500 font-mono text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Autonomous Vision</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                Not Just A Dashboard: A Continuous Control System
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-5 bg-neutral-950 border border-neutral-800 space-y-2">
                  <span className="bg-red-600 text-white font-mono text-[10px] px-2 py-0.5 font-bold uppercase">Loop 1</span>
                  <h3 className="font-serif font-bold text-white text-base">Ad Guardrails</h3>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    Automatically lowers bids or pauses campaigns if 7-day rolling POAS drops below 1.0x. Prevents 10,000+ CHF ad waste before humans notice.
                  </p>
                </div>

                <div className="p-5 bg-neutral-950 border border-neutral-800 space-y-2">
                  <span className="bg-red-600 text-white font-mono text-[10px] px-2 py-0.5 font-bold uppercase">Loop 2</span>
                  <h3 className="font-serif font-bold text-white text-base">Checkout Gating</h3>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    When an automotive SKU return rate surpasses 15%, the system injects a mandatory VIN / Chassis selector into Shopify checkout to ensure fitment.
                  </p>
                </div>

                <div className="p-5 bg-neutral-950 border border-neutral-800 space-y-2">
                  <span className="bg-red-600 text-white font-mono text-[10px] px-2 py-0.5 font-bold uppercase">Loop 3</span>
                  <h3 className="font-serif font-bold text-white text-base">Conversational Copilot</h3>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    Leadership asks questions directly in plain text (e.g. <em>"How is Spain expansion tracking vs Switzerland?"</em>) and receives instant tabular answers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 7: 5-Layer Architecture */}
          {currentSlide === 6 && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center gap-2 text-red-500 font-mono text-xs font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Enterprise Architecture</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                Built to Scale to 20M SKUs & Multi-Country Operations
              </h2>

              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-red-500 font-bold mr-2">LAYER 1:</span>
                    <span className="text-white">Unified Ingestion Adapters</span>
                  </div>
                  <span className="text-neutral-500">Shopify Plus &bull; Google Ads &bull; Meta &bull; TikTok &bull; GA4</span>
                </div>
                <div className="p-3 bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-red-500 font-bold mr-2">LAYER 2:</span>
                    <span className="text-white">Identity Resolution & Normalization</span>
                  </div>
                  <span className="text-neutral-500">20M OEM Part Graph &bull; Live CHF/EUR Spot FX</span>
                </div>
                <div className="p-3 bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-red-500 font-bold mr-2">LAYER 3:</span>
                    <span className="text-white">Unit Economics Core (CM1, CM2, CM3)</span>
                  </div>
                  <span className="text-neutral-500">POAS Engine &bull; Return Surcharges &bull; Weight Bands</span>
                </div>
                <div className="p-3 bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-red-500 font-bold mr-2">LAYER 4:</span>
                    <span className="text-white">Autonomous AI Monitoring & LLM Reasoning</span>
                  </div>
                  <span className="text-neutral-500">Heuristic Watchdog &bull; Natural Language Copilot</span>
                </div>
                <div className="p-3 bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-red-500 font-bold mr-2">LAYER 5:</span>
                    <span className="text-white">Action Execution Layer</span>
                  </div>
                  <span className="text-neutral-500">Meta/Google API Ad Pauses &bull; Shopify Checkout Scripts</span>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 8: Roadmap & Next Steps */}
          {currentSlide === 7 && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center gap-2 text-red-500 font-mono text-xs font-bold uppercase tracking-wider">
                <ArrowRight className="w-4 h-4" />
                <span>Next Step</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                14-Day Production Implementation Plan
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 font-sans">
                <div className="p-4 bg-neutral-950 border border-neutral-800 space-y-2">
                  <span className="font-mono text-xs font-bold text-red-500">DAYS 1–3</span>
                  <h4 className="font-bold text-white text-sm">OAuth Handshake</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Connect live Shopify Plus, Google Ads & Meta tokens in read-only sandbox.
                  </p>
                </div>

                <div className="p-4 bg-neutral-950 border border-neutral-800 space-y-2">
                  <span className="font-mono text-xs font-bold text-red-500">DAYS 4–7</span>
                  <h4 className="font-bold text-white text-sm">COGS & Margin Ingestion</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Map historical returns & supplier costs to establish baseline CM3 per SKU.
                  </p>
                </div>

                <div className="p-4 bg-neutral-950 border border-neutral-800 space-y-2">
                  <span className="font-mono text-xs font-bold text-red-500">DAYS 8–10</span>
                  <h4 className="font-bold text-white text-sm">POAS Automated Rules</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Set up automatic loss-prevention alerts and budget shifting triggers.
                  </p>
                </div>

                <div className="p-4 bg-neutral-950 border border-neutral-800 space-y-2">
                  <span className="font-mono text-xs font-bold text-red-500">DAYS 11–14</span>
                  <h4 className="font-bold text-white text-sm">DE/ES Expansion</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Deploy cross-border currency conversion & localized return handling.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-red-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif font-bold text-xl">Let’s move forward into collaboration.</h3>
                  <p className="text-xs font-sans text-red-100">Working prototype is live and ready to connect to Ersatzteilstore's data.</p>
                </div>
                <a
                  href="mailto:contact@tudorbuilds.com"
                  className="px-6 py-2.5 bg-black text-white hover:bg-neutral-900 font-mono text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
                >
                  Contact Tudor Crișan &rarr;
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Minimalist Controls Bar */}
        <div className="px-6 py-4 border-t border-neutral-800 flex items-center justify-between bg-black">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 transition-all ${
                  currentSlide === idx ? 'w-8 bg-red-600' : 'w-2 bg-neutral-800 hover:bg-neutral-600'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
              disabled={currentSlide === 0}
              className="p-2 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 disabled:opacity-30 disabled:hover:border-neutral-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-neutral-400 px-2">
              {currentSlide + 1} / {totalSlides}
            </span>
            <button
              onClick={() => setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1))}
              disabled={currentSlide === totalSlides - 1}
              className="p-2 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 disabled:opacity-30 disabled:hover:border-neutral-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
