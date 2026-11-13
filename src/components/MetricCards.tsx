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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
      {/* 1. True Net Profit */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 shadow-sm relative overflow-hidden group hover:border-blue-500/40 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all"></div>
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">True Net Profit</span>
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-white tracking-tight">
          {netProfit.toLocaleString()} <span className="text-sm font-semibold text-slate-400">{currencySymbol}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2.5 text-xs text-emerald-400 font-medium">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>+14.8% vs last month</span>
        </div>
        <p className="text-[10px] text-slate-500 mt-1">After COGS, Ads, Shipping & Returns</p>
      </div>

      {/* 2. Blended POAS (Profit On Ad Spend) */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 shadow-sm relative overflow-hidden group hover:border-indigo-500/40 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all"></div>
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium uppercase tracking-wider">Blended POAS</span>
            <div title="Profit On Ad Spend = True Gross Profit / Ad Spend. Far more reliable than ROAS." className="cursor-help">
              <HelpCircle className="w-3 h-3 text-slate-500" />
            </div>
          </div>
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-white tracking-tight">
          {poas}x
        </div>
        <div className="flex items-center gap-1.5 mt-2.5 text-xs text-emerald-400 font-medium">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>Healthy (&gt;2.0x target)</span>
        </div>
        <p className="text-[10px] text-slate-500 mt-1">Replaces vanity ROAS ({FINANCIAL_OVERVIEW.blendedRoas}x)</p>
      </div>

      {/* 3. Gross Revenue */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 shadow-sm hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Gross Revenue</span>
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
            <ShoppingBag className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-white tracking-tight">
          {revenue.toLocaleString()} <span className="text-sm font-semibold text-slate-400">{currencySymbol}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2.5 text-xs text-emerald-400 font-medium">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>+8.2% YoY growth</span>
        </div>
        <p className="text-[10px] text-slate-500 mt-1">Shopify multi-store aggregated</p>
      </div>

      {/* 4. Total Paid Ad Spend */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 shadow-sm hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Total Ad Spend</span>
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
            <Percent className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-white tracking-tight">
          {adSpend.toLocaleString()} <span className="text-sm font-semibold text-slate-400">{currencySymbol}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2.5 text-xs text-slate-400 font-medium">
          <span>Google (64%) • Meta (36%)</span>
        </div>
        <p className="text-[10px] text-slate-500 mt-1">16.6% of gross revenue</p>
      </div>

      {/* 5. Return Rate */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 shadow-sm hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Return Rate</span>
          <div className={`p-1.5 rounded-lg ${returnRate > 10 ? 'bg-rose-500/10 text-rose-400' : 'bg-slate-800 text-slate-300'}`}>
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-white tracking-tight flex items-baseline gap-2">
          <span>{returnRate}%</span>
          {returnRate > 10 && (
            <span className="text-[11px] font-semibold text-rose-400 px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
              High
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-2.5 text-xs text-rose-400 font-medium">
          <ArrowDownRight className="w-3.5 h-3.5" />
          <span>DE Chassis Parts driving loss</span>
        </div>
        <p className="text-[10px] text-slate-500 mt-1">CH is only 2.4% vs DE 14.2%</p>
      </div>

      {/* 6. Net Profit Margin */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 shadow-sm hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Net Margin (CM3)</span>
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Percent className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-emerald-400 tracking-tight">
          {netMargin}%
        </div>
        <div className="flex items-center gap-1.5 mt-2.5 text-xs text-emerald-400 font-medium">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>+3.2% vs target</span>
        </div>
        <p className="text-[10px] text-slate-500 mt-1">E-commerce industry avg is 12-18%</p>
      </div>
    </div>
  );
};
