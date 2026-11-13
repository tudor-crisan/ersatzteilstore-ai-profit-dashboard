export type Region = 'ALL' | 'CH' | 'DE' | 'ES' | 'IT';

export interface ProductItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  brand: string;
  region: 'CH' | 'DE' | 'ES' | 'IT';
  grossRevenue: number;
  unitsSold: number;
  cogs: number; // Cost of Goods Sold
  adSpend: number;
  shippingAndFees: number;
  returnsCount: number;
  returnRate: number; // %
  netProfit: number;
  netMargin: number; // %
  poas: number; // Profit On Ad Spend = Net Margin before ad spend / Ad spend
  roas: number; // Revenue / Ad Spend
  status: 'star' | 'stable' | 'bleeding' | 'opportunity';
}

export interface CampaignItem {
  id: string;
  platform: 'Google Ads' | 'Meta Ads' | 'TikTok Ads';
  campaignType: 'PMax' | 'Shopping' | 'Search' | 'Advantage+' | 'Retargeting';
  name: string;
  region: 'CH' | 'DE' | 'ES' | 'IT';
  spend: number;
  revenue: number;
  roas: number;
  poas: number; // Profit on Ad spend (Net profit / Ad spend)
  netContribution: number;
  conversions: number;
  status: 'active' | 'warning' | 'bleeding';
  aiRecommendation: string;
}

export interface AnomalyAlert {
  id: string;
  type: 'critical_leak' | 'margin_drain' | 'scale_opportunity';
  title: string;
  description: string;
  metric: string;
  impactValue: number;
  region: string;
  actionText: string;
  applied: boolean;
  category: 'Marketing' | 'Inventory' | 'Returns' | 'Pricing';
}

export interface DataConnector {
  id: string;
  name: string;
  icon: string;
  category: 'E-Commerce' | 'Advertising' | 'Analytics' | 'ERP / Warehouse';
  status: 'connected' | 'syncing' | 'ready' | 'planned';
  dataPoints: string[];
  lastSync: string;
  recordsSynced: string;
  latencyMs: number;
  description: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  suggestedActions?: string[];
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
  };
  highlightAlert?: {
    type: 'success' | 'danger' | 'warning';
    title: string;
    description: string;
  };
}
