import React, { useState } from 'react';
import { CampaignItem } from '../types';

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
    <div className="p-6 bg-black border border-neutral-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight">
              Paid Ad Campaigns & POAS Contribution
            </h3>
            <span className="bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-[10px] uppercase font-bold px-2 py-0.5">
              Google Ads &bull; Meta &bull; TikTok
            </span>
          </div>
          <p className="text-xs text-neutral-400 font-sans mt-0.5">
            POAS reveals which campaigns generate cash flow vs vanity ROAS that burns margin
          </p>
        </div>

        <div className="flex items-center border border-neutral-800 bg-neutral-950 p-1 font-mono text-xs">
          {['ALL', 'Google Ads', 'Meta Ads', 'TikTok Ads'].map((p) => (
            <button
              key={p}
              onClick={() => setPlatformFilter(p)}
              className={`px-3 py-1 font-medium transition-all ${
                platformFilter === p
                  ? 'bg-red-600 text-white font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse font-sans">
          <thead>
            <tr className="border-b border-neutral-800 bg-neutral-950 text-neutral-400 font-mono uppercase tracking-wider text-[11px]">
              <th className="py-3 px-3">Platform & Campaign</th>
              <th className="py-3 px-3">Region</th>
              <th className="py-3 px-3">Ad Spend</th>
              <th className="py-3 px-3">Gross Rev</th>
              <th className="py-3 px-3">ROAS (Vanity)</th>
              <th className="py-3 px-3 text-red-500 font-bold">POAS (True Margin)</th>
              <th className="py-3 px-3">Net Contribution</th>
              <th className="py-3 px-3">AI Diagnostic</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/80 bg-black font-mono">
            {filteredCampaigns.map((c) => {
              const isBleeding = c.poas < 0;
              const isWarning = c.poas >= 0 && c.poas < 1.0;
              const isStar = c.poas >= 3.0;

              return (
                <tr key={c.id} className="hover:bg-neutral-950 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 ${
                          c.platform === 'Google Ads'
                            ? 'bg-neutral-300'
                            : c.platform === 'Meta Ads'
                            ? 'bg-red-600'
                            : 'bg-neutral-500'
                        }`}
                      ></span>
                      <div>
                        <div className="font-serif font-bold text-white text-sm">
                          {c.name}
                        </div>
                        <span className="text-[10px] text-neutral-400 font-mono uppercase">
                          {c.platform} &bull; {c.campaignType}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-[10px] font-bold">
                      {c.region}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-neutral-200">
                    {c.spend.toLocaleString()} CHF
                  </td>

                  <td className="py-3.5 px-3 text-neutral-300">
                    {c.revenue.toLocaleString()} CHF
                  </td>

                  <td className="py-3.5 px-3 text-neutral-400">
                    {c.roas.toFixed(2)}x
                  </td>

                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 font-bold ${
                        isBleeding
                          ? 'bg-red-600 text-white'
                          : isWarning
                          ? 'bg-neutral-800 text-neutral-200 border border-neutral-700'
                          : 'bg-neutral-900 border border-neutral-600 text-white'
                      }`}
                    >
                      {c.poas.toFixed(2)}x
                    </span>
                  </td>

                  <td className="py-3.5 px-3 font-bold">
                    <span className={c.netContribution >= 0 ? 'text-white' : 'text-red-500'}>
                      {c.netContribution >= 0 ? `+${c.netContribution.toLocaleString()} CHF` : `${c.netContribution.toLocaleString()} CHF`}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 font-sans">
                    <div className="max-w-xs text-[11px] text-neutral-300 leading-snug">
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
