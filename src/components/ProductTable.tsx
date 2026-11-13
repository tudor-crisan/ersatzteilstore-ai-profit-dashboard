import React, { useState } from 'react';
import { ProductItem } from '../types';
import { Search, Filter, ArrowUpDown, AlertCircle, CheckCircle, Flame, Sparkles } from 'lucide-react';

interface ProductTableProps {
  products: ProductItem[];
}

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'star' | 'bleeding' | 'opportunity'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const categories = ['ALL', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    const matchesCategory = categoryFilter === 'ALL' || p.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-white tracking-tight">
              SKU-Level Unit Economics & Profit Contribution
            </h3>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
              Real Margin After Returns & Ads
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Deducts individual supplier COGS, attributed CPC/PMax ad spend, freight, and return inspection costs
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 20M SKUs, brands, parts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-56"
            />
          </div>

          {/* Status filters */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-2 py-1 rounded-lg ${statusFilter === 'ALL' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('star')}
              className={`px-2 py-1 rounded-lg flex items-center gap-1 ${statusFilter === 'star' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Sparkles className="w-3 h-3 text-yellow-300" />
              Stars
            </button>
            <button
              onClick={() => setStatusFilter('bleeding')}
              className={`px-2 py-1 rounded-lg flex items-center gap-1 ${statusFilter === 'bleeding' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Flame className="w-3 h-3 text-rose-300" />
              Bleeding
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-3">Part Name & SKU</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Region</th>
              <th className="py-3 px-3">Gross Revenue</th>
              <th className="py-3 px-3">COGS</th>
              <th className="py-3 px-3">Ad Spend</th>
              <th className="py-3 px-3">Return Rate</th>
              <th className="py-3 px-3">True Net Profit</th>
              <th className="py-3 px-3">Net Margin</th>
              <th className="py-3 px-3">POAS</th>
              <th className="py-3 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredProducts.map((p) => {
              const isBleeding = p.status === 'bleeding';
              const isStar = p.status === 'star';

              return (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3">
                    <div>
                      <div className="font-semibold text-slate-200">{p.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                          {p.sku}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {p.brand}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-slate-300">
                    {p.category}
                  </td>

                  <td className="py-3 px-3">
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                      {p.region}
                    </span>
                  </td>

                  <td className="py-3 px-3 font-medium text-slate-200">
                    {p.grossRevenue.toLocaleString()} CHF
                    <div className="text-[10px] text-slate-500">{p.unitsSold} units</div>
                  </td>

                  <td className="py-3 px-3 text-slate-400">
                    {p.cogs.toLocaleString()} CHF
                  </td>

                  <td className="py-3 px-3 text-slate-400">
                    {p.adSpend.toLocaleString()} CHF
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded font-medium ${
                        p.returnRate > 15
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold'
                          : 'text-slate-300'
                      }`}
                    >
                      {p.returnRate}%
                    </span>
                  </td>

                  <td className="py-3 px-3 font-bold">
                    <span className={p.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {p.netProfit >= 0 ? `+${p.netProfit.toLocaleString()} CHF` : `${p.netProfit.toLocaleString()} CHF`}
                    </span>
                  </td>

                  <td className="py-3 px-3 font-semibold">
                    <span className={p.netMargin >= 25 ? 'text-emerald-400' : p.netMargin < 0 ? 'text-rose-400' : 'text-slate-300'}>
                      {p.netMargin}%
                    </span>
                  </td>

                  <td className="py-3 px-3 font-mono font-medium text-slate-200">
                    {p.poas.toFixed(2)}x
                  </td>

                  <td className="py-3 px-3">
                    {isBleeding ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full">
                        <Flame className="w-3 h-3 text-rose-400" />
                        Bleeding Cash
                      </span>
                    ) : isStar ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        <Sparkles className="w-3 h-3 text-yellow-300" />
                        Profit Driver
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                        Stable
                      </span>
                    )}
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
