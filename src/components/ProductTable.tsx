import React, { useState } from 'react';
import { ProductItem } from '../types';
import { Search } from 'lucide-react';

interface ProductTableProps {
  products: ProductItem[];
}

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'star' | 'bleeding' | 'opportunity'>('ALL');

  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-black border border-neutral-800">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight">
              SKU-Level Unit Economics Drilldown
            </h3>
            <span className="bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-[10px] uppercase font-bold px-2 py-0.5">
              20.4M Catalog Sample
            </span>
          </div>
          <p className="text-xs text-neutral-400 font-sans mt-0.5">
            Deducts individual supplier COGS, attributed CPC/PMax ad spend, freight, and return inspection costs
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 20M SKUs, brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 w-60 rounded-none text-xs font-mono"
            />
          </div>

          {/* Status filters */}
          <div className="flex items-center border border-neutral-800 bg-neutral-950 p-1">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1 font-medium transition-all ${
                statusFilter === 'ALL' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('star')}
              className={`px-3 py-1 font-medium transition-all ${
                statusFilter === 'star' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Profit Drivers
            </button>
            <button
              onClick={() => setStatusFilter('bleeding')}
              className={`px-3 py-1 font-medium transition-all ${
                statusFilter === 'bleeding' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Bleeding Cash
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse font-sans">
          <thead>
            <tr className="border-b border-neutral-800 bg-neutral-950 text-neutral-400 font-mono uppercase tracking-wider text-[11px]">
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
          <tbody className="divide-y divide-neutral-800/80 bg-black font-mono">
            {filteredProducts.map((p) => {
              const isBleeding = p.status === 'bleeding';
              const isStar = p.status === 'star';

              return (
                <tr key={p.id} className="hover:bg-neutral-950 transition-colors">
                  <td className="py-3 px-3">
                    <div>
                      <div className="font-serif font-bold text-white text-sm">{p.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-[10px] text-neutral-300 bg-neutral-900 px-1.5 py-0.2 border border-neutral-800">
                          {p.sku}
                        </span>
                        <span className="text-[11px] text-neutral-400 font-sans">
                          {p.brand}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-neutral-300 font-sans">
                    {p.category}
                  </td>

                  <td className="py-3 px-3">
                    <span className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-[10px] font-bold">
                      {p.region}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-white font-medium">
                    {p.grossRevenue.toLocaleString()} CHF
                    <div className="text-[10px] text-neutral-400 font-mono">{p.unitsSold} units</div>
                  </td>

                  <td className="py-3 px-3 text-neutral-400">
                    {p.cogs.toLocaleString()} CHF
                  </td>

                  <td className="py-3 px-3 text-neutral-400">
                    {p.adSpend.toLocaleString()} CHF
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-1.5 py-0.5 font-bold ${
                        p.returnRate > 15
                          ? 'bg-red-600 text-white'
                          : 'text-neutral-300'
                      }`}
                    >
                      {p.returnRate}%
                    </span>
                  </td>

                  <td className="py-3 px-3 font-bold">
                    <span className={p.netProfit >= 0 ? 'text-white' : 'text-red-500'}>
                      {p.netProfit >= 0 ? `+${p.netProfit.toLocaleString()} CHF` : `${p.netProfit.toLocaleString()} CHF`}
                    </span>
                  </td>

                  <td className="py-3 px-3 font-bold">
                    <span className={p.netMargin >= 30 ? 'text-white' : p.netMargin < 0 ? 'text-red-500' : 'text-neutral-400'}>
                      {p.netMargin}%
                    </span>
                  </td>

                  <td className="py-3 px-3 text-white font-bold">
                    {p.poas.toFixed(2)}x
                  </td>

                  <td className="py-3 px-3">
                    {isBleeding ? (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-red-500 border border-red-600/60 px-2 py-0.5 bg-red-950/20">
                        Bleeding Cash
                      </span>
                    ) : isStar ? (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-white border border-neutral-700 px-2 py-0.5 bg-neutral-900">
                        Profit Driver
                      </span>
                    ) : (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-neutral-400 border border-neutral-800 px-2 py-0.5">
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
