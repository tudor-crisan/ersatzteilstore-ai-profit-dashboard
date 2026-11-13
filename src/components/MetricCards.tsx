import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign, Percent, ShoppingBag, ShieldCheck, HelpCircle } from 'lucide-react';
import { FINANCIAL_OVERVIEW } from '../data/mockData';
import { Region } from '../types';

interface MetricCardsProps {
  currentRegion: Region;
  appliedProfitBoost: number;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ currentRegion, appliedProfitBoost }) => {
  const currencySymbol = currentRegion === 'CH' || currentRegion === 'ALL' ? 'CHF' : '€';
  const multiplier = currentRegion === 'CH' ? 0.55 : currentRegion === 'DE' ? 0.26 : currentRegion === 'IT' ? 0.11 : currentRegion === 'ES' ? 0.08 : 1.0;

  const netProfit = Math.round((FINANCIAL_OVERVIEW.netProfit + appliedProfitBoost) * multiplier);
  const revenue = Math.round(FINANCIAL_OVERVIEW.grossRevenue * multiplier);
  const adSpend = Math.round(FINANCIAL_OVERVIEW.adSpend * multiplier);
  const returnRate = currentRegion === 'DE' ? 14.2 : currentRegion === 'CH' ? 2.4 : currentRegion === 'ES' ? 12.6 : currentRegion === 'IT' ? 4.1 : 6.8;
  const poas = (netProfit / adSpend + 1).toFixed(2);
  const netMargin = ((netProfit / revenue) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
      {/* 1. True Net Profit */}
      <div className="p-5 bg-black border border-neutral-800 hover:border-red-600 transition-colors relative">
        <div className="flex items-center justify-between text-neutral-400 mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 font-bold">True Net Profit</span>
          <span className="text-red-500 font-mono text-xs font-bold">CHF/EUR</span>
        </div>
        <div className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
          {netProfit.toLocaleString()} <span className="text-xs font-mono text-neutral-400 font-normal">{currencySymbol}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-neutral-300">
          <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />
          <span>+14.8% vs last month</span>
        </div>
        <p className="text-[10px] text-neutral-400 font-sans mt-1">After COGS, Ads, Shipping & Returns</p>
      </div>

      {/* 2. Blended POAS */}
      <div className="p-5 bg-black border border-neutral-800 hover:border-red-600 transition-colors relative">
        <div className="flex items-center justify-between text-neutral-400 mb-2">
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 font-bold">Blended POAS</span>
          </div>
          <span className="bg-red-600 text-white font-mono text-[9px] px-1.5 py-0.2 font-bold uppercase">KPI</span>
        </div>
        <div className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
          {poas}x
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-neutral-300">
          <span className="text-red-500 font-bold">POAS</span>
          <span>&gt; 2.0x Target</span>
        </div>
        <p className="text-[10px] text-neutral-400 font-sans mt-1">Replaces vanity ROAS ({FINANCIAL_OVERVIEW.blendedRoas}x)</p>
      </div>

      {/* 3. Gross Revenue */}
      <div className="p-5 bg-black border border-neutral-800 hover:border-neutral-700 transition-colors">
        <div className="flex items-center justify-between text-neutral-400 mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 font-bold">Gross Revenue</span>
          <span className="text-neutral-400 font-mono text-xs">Top-line</span>
        </div>
        <div className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
          {revenue.toLocaleString()} <span className="text-xs font-mono text-neutral-400 font-normal">{currencySymbol}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-neutral-300">
          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
          <span>+8.2% YoY growth</span>
        </div>
        <p className="text-[10px] text-neutral-400 font-sans mt-1">Shopify multi-store aggregated</p>
      </div>

      {/* 4. Total Paid Ad Spend */}
      <div className="p-5 bg-black border border-neutral-800 hover:border-neutral-700 transition-colors">
        <div className="flex items-center justify-between text-neutral-400 mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 font-bold">Total Ad Spend</span>
          <span className="text-neutral-400 font-mono text-xs">Paid Ads</span>
        </div>
        <div className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
          {adSpend.toLocaleString()} <span className="text-xs font-mono text-neutral-400 font-normal">{currencySymbol}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-neutral-400">
          <span>Google 64% &bull; Meta 36%</span>
        </div>
        <p className="text-[10px] text-neutral-400 font-sans mt-1">16.6% of gross revenue</p>
      </div>

      {/* 5. Return Rate */}
      <div className="p-5 bg-black border border-neutral-800 hover:border-red-600 transition-colors">
        <div className="flex items-center justify-between text-neutral-400 mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 font-bold">Return Rate</span>
          {returnRate > 10 && (
            <span className="bg-red-600 text-white font-mono text-[9px] px-1.5 py-0.2 font-bold uppercase">Leak</span>
          )}
        </div>
        <div className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
          {returnRate}%
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-red-500 font-bold">
          <ArrowDownRight className="w-3.5 h-3.5" />
          <span>DE Chassis misdiagnosis</span>
        </div>
        <p className="text-[10px] text-neutral-400 font-sans mt-1">CH is 2.4% vs DE 14.2%</p>
      </div>

      {/* 6. Net Profit Margin */}
      <div className="p-5 bg-black border border-neutral-800 hover:border-neutral-700 transition-colors">
        <div className="flex items-center justify-between text-neutral-400 mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 font-bold">Net Margin (CM3)</span>
          <span className="text-neutral-400 font-mono text-xs">Bottom-line</span>
        </div>
        <div className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
          {netMargin}%
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-neutral-300">
          <span>+3.2% vs target</span>
        </div>
        <p className="text-[10px] text-neutral-400 font-sans mt-1">Catalog target is &gt;20%</p>
      </div>
    </div>
  );
};
