import React, { useState } from 'react';
import { CampaignItem } from '../types';
import { AlertCircle, CheckCircle, TrendingUp, Filter, ExternalLink, HelpCircle } from 'lucide-react';

interface CampaignsTableProps {
  campaigns: CampaignItem[];
}

export const CampaignsTable: React.FC<CampaignsTableProps> = ({ campaigns }) => {
  const [platformFilter, setPlatformFilter] = useState<string>('ALL');

  const filteredCampaigns = campaigns.filter(c => {
    if (platformFilter === 'ALL') return true;
    return c.platform === platformFilter;
  });

  return (
    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-white tracking-tight">
              Cross-Channel Ad Performance & Net Contribution
            </h3>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
              Google Ads + Meta + TikTok
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            POAS reveals which campaigns generate cash flow vs vanity ROAS that burns margin
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
          {['ALL', 'Google Ads', 'Meta Ads', 'TikTok Ads'].map((p) => (
            <button
              key={p}
              onClick={() => setPlatformFilter(p)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                platformFilter === p
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-3">Platform & Campaign</th>
              <th className="py-3 px-3">Region</th>
              <th className="py-3 px-3">Ad Spend</th>
              <th className="py-3 px-3">Gross Rev</th>
              <th className="py-3 px-3">
                <div className="flex items-center gap-1">
                  <span>ROAS</span>
                  <span className="text-slate-500 text-[9px]">(Vanity)</span>
                </div>
              </th>
              <th className="py-3 px-3">
                <div className="flex items-center gap-1 text-blue-400">
                  <span>POAS</span>
                  <span className="text-[9px] font-bold text-blue-300">(Net Profit / Ad Spend)</span>
                </div>
              </th>
              <th className="py-3 px-3">Net Contribution</th>
              <th className="py-3 px-3">AI Diagnostic</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredCampaigns.map((c) => {
              const isBleeding = c.poas < 0;
              const isWarning = c.poas >= 0 && c.poas < 1.0;
              const isStar = c.poas >= 3.0;

              return (
                <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          c.platform === 'Google Ads'
                            ? 'bg-blue-500'
                            : c.platform === 'Meta Ads'
                            ? 'bg-indigo-500'
                            : 'bg-rose-500'
                        }`}
                      ></span>
                      <div>
                        <div className="font-medium text-slate-200 flex items-center gap-1.5">
                          <span>{c.name}</span>
                          <span className="text-[10px] px-1 rounded bg-slate-800 text-slate-400 font-normal">
                            {c.campaignType}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{c.platform}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                      {c.region}
                    </span>
                  </td>

                  <td className="py-3 px-3 font-medium text-slate-200">
                    {c.spend.toLocaleString()} CHF
                  </td>

                  <td className="py-3 px-3 text-slate-300">
                    {c.revenue.toLocaleString()} CHF
                  </td>

                  <td className="py-3 px-3 text-slate-300 font-medium">
                    {c.roas.toFixed(2)}x
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold ${
                        isBleeding
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : isWarning
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {c.poas.toFixed(2)}x
                    </span>
                  </td>

                  <td className="py-3 px-3 font-semibold">
                    <span className={c.netContribution >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {c.netContribution >= 0 ? `+${c.netContribution.toLocaleString()} CHF` : `${c.netContribution.toLocaleString()} CHF`}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <div className="max-w-xs text-[11px] text-slate-300 leading-snug">
                      {c.aiRecommendation}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
