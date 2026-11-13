import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { FINANCIAL_OVERVIEW } from '../data/mockData';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

interface WaterfallProps {
  appliedProfitBoost: number;
}

export const ProfitWaterfallChart: React.FC<WaterfallProps> = ({ appliedProfitBoost }) => {
  const currentNetProfit = FINANCIAL_OVERVIEW.netProfit + appliedProfitBoost;

  const data = [
    { name: 'Gross Revenue', amount: 228900, type: 'positive', fill: '#ffffff' },
    { name: 'COGS', amount: -97850, type: 'cost', fill: '#52525b' },
    { name: 'Ad Spend (Paid)', amount: -38150, type: 'cost', fill: '#71717a' },
    { name: 'Shipping & Freight', amount: -17709, type: 'cost', fill: '#a1a1aa' },
    { name: 'Returns & Losses', amount: -(9600 - Math.min(appliedProfitBoost, 5000)), type: 'leak', fill: '#dc2626' },
    { name: 'Payment Fees', amount: -5722, type: 'cost', fill: '#52525b' },
    { name: 'True Net Profit', amount: currentNetProfit, type: 'result', fill: '#dc2626' },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-black border border-neutral-700 p-3 rounded-none shadow-xl text-xs font-mono">
          <p className="font-bold text-white uppercase">{item.name}</p>
          <p className={`font-bold text-sm mt-1 ${item.amount >= 0 ? 'text-white' : 'text-red-500'}`}>
            {item.amount >= 0 ? `+${item.amount.toLocaleString()} CHF` : `${item.amount.toLocaleString()} CHF`}
          </p>
          <p className="text-neutral-400 text-[11px] mt-0.5">
            {item.type === 'result' ? 'Final bottom-line margin' : `${((Math.abs(item.amount) / 228900) * 100).toFixed(1)}% of gross sales`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 bg-black border border-neutral-800 flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight">
                True Unit Economics Waterfall
              </h3>
              <span className="bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-[10px] uppercase font-bold px-2 py-0.5">
                Shopify + Ads + Returns
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-sans mt-0.5">
              How 228.9k CHF top-line converts down to actual net cash profit after all hidden drains
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-white"></span>
              <span>Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-neutral-500"></span>
              <span>COGS/Ads</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-red-600"></span>
              <span className="text-red-500 font-bold">Return Waste</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-red-600"></span>
              <span className="text-white font-bold">Net Profit</span>
            </div>
          </div>
        </div>

        <div className="h-64 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 25 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#1f1f1f" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#71717a" 
                fontSize={11} 
                tickLine={false}
                interval={0}
                angle={-15}
                textAnchor="end"
                fontFamily="JetBrains Mono"
              />
              <YAxis 
                stroke="#71717a" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(val) => `${val / 1000}k`}
                fontFamily="JetBrains Mono"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" radius={0}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3 bg-neutral-950 border border-neutral-800">
          <span className="font-bold text-white block">Gross Margin: 57.2%</span>
          <p className="text-[11px] text-neutral-400 font-sans mt-0.5">OEM & aftermarket suppliers healthy</p>
        </div>
        <div className="p-3 bg-neutral-950 border border-neutral-800">
          <span className="font-bold text-neutral-300 block">Ad Spend Drag: 16.6%</span>
          <p className="text-[11px] text-neutral-400 font-sans mt-0.5">3,440 CHF burned in Meta broad cold ads</p>
        </div>
        <div className="p-3 bg-neutral-950 border border-neutral-800 border-l-2 border-l-red-600">
          <span className="font-bold text-red-500 block">Return Drag: 4.2%</span>
          <p className="text-[11px] text-neutral-400 font-sans mt-0.5">9,600 CHF wasted on wrong fitments in DE/ES</p>
        </div>
      </div>
    </div>
  );
};
