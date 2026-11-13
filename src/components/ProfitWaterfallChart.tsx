import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { FINANCIAL_OVERVIEW } from '../data/mockData';
import { HelpCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface WaterfallProps {
  appliedProfitBoost: number;
}

export const ProfitWaterfallChart: React.FC<WaterfallProps> = ({ appliedProfitBoost }) => {
  const currentNetProfit = FINANCIAL_OVERVIEW.netProfit + appliedProfitBoost;

  const data = [
    { name: 'Gross Revenue', amount: 228900, type: 'positive', fill: '#3b82f6' },
    { name: 'COGS', amount: -97850, type: 'cost', fill: '#64748b' },
    { name: 'Ad Spend (Paid)', amount: -38150, type: 'cost', fill: '#f59e0b' },
    { name: 'Shipping & Freight', amount: -17709, type: 'cost', fill: '#94a3b8' },
    { name: 'Returns & Losses', amount: -(9600 - Math.min(appliedProfitBoost, 5000)), type: 'leak', fill: '#ef4444' },
    { name: 'Payment Fees', amount: -5722, type: 'cost', fill: '#cbd5e1' },
    { name: 'True Net Profit', amount: currentNetProfit, type: 'result', fill: '#10b981' },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-xs">
          <p className="font-semibold text-slate-200">{item.name}</p>
          <p className={`font-bold text-sm mt-1 ${item.amount >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {item.amount >= 0 ? `+${item.amount.toLocaleString()} CHF` : `${item.amount.toLocaleString()} CHF`}
          </p>
          <p className="text-slate-400 text-[11px] mt-0.5">
            {item.type === 'result' ? 'Final bottom-line margin' : `${((Math.abs(item.amount) / 228900) * 100).toFixed(1)}% of gross sales`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-white tracking-tight">True Unit Economics Waterfall</h3>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                Shopify + Ads + Logistics Blended
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              How 228.9k CHF top-line revenue converts down to true net profit after all hidden drains
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span className="text-slate-300">Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-slate-300">Ad Spend</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span className="text-slate-300">Return Waste</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-300">Net Profit</span>
            </div>
          </div>
        </div>

        <div className="h-64 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false}
                interval={0}
                angle={-15}
                textAnchor="end"
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(val) => `${val / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="flex items-start gap-2 text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">Gross Margin (CM1): 57.2%</span>
            <p className="text-[11px] text-slate-400 mt-0.5">Catalog product margin healthy across OEM & Aftermarket</p>
          </div>
        </div>
        <div className="flex items-start gap-2 text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">Ad Cost Drag: 16.6%</span>
            <p className="text-[11px] text-slate-400 mt-0.5">3,440 CHF burned in Meta broad cold prospecting</p>
          </div>
        </div>
        <div className="flex items-start gap-2 text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">Return Drag: 4.2%</span>
            <p className="text-[11px] text-slate-400 mt-0.5">9,600 CHF total cost from wrong fitments in Germany & Spain</p>
          </div>
        </div>
      </div>
    </div>
  );
};
