import { AIChatMessage, ProductItem, CampaignItem } from '../types';

export function analyzeQuery(query: string, products: ProductItem[], campaigns: CampaignItem[]): AIChatMessage {
  const q = query.toLowerCase();

  // Question 1: Most profitable products
  if (q.includes('profitable') || q.includes('most profit') || q.includes('deducting all costs') || q.includes('margin')) {
    const profitableProducts = [...products]
      .sort((a, b) => b.netProfit - a.netProfit)
      .slice(0, 4);

    return {
      id: `ai-${Date.now()}`,
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `### 🎯 Most Profitable Products (True Net Profit Contribution)

After deducting all direct **COGS, attributed Ad Spend (Google + Meta), shipping costs, return processing, and merchant fees**, here are our top bottom-line drivers:

1. **Bosch High-Pressure Diesel Pump CP4 (SKU: ET-BOS-9942)**
   - **Net Profit:** 16,300 CHF (33.3% Net Margin)
   - **Ad Spend:** 3,850 CHF | **POAS:** 4.23x
   - **Insight:** Low return rate (3.2%) and high average order value makes this our highest gross profit contributor.

2. **Grundfos Alpha2 25-60 Heating Pump (SKU: ET-GRU-1205)**
   - **Net Profit:** 13,125 CHF (38.0% Net Margin)
   - **Ad Spend:** 2,400 CHF | **POAS:** 5.46x
   - **Insight:** Highest POAS in the heating catalog. Excellent organic + search conversion intent.

3. **Miele Dishwasher Drain Pump (SKU: ET-MLE-8820)**
   - **Net Profit:** 11,192 CHF (42.3% Net Margin)
   - **Ad Spend:** 2,800 CHF | **POAS:** 3.99x
   - **Insight:** High margins on appliance OEM replacement parts. Very low return rate (2.1%).

4. **Kärcher Brass Cylinder Head (SKU: ET-KRC-5100)**
   - **Net Profit:** 9,350 CHF (**53.1% Net Margin**)
   - **Ad Spend:** 1,650 CHF | **POAS:** 5.66x
   - **Insight:** Best margin percentage across all 20M catalog items.

---
💡 **AI Recommendation:** Increase Google PMax bid caps on the **Appliance & HVAC categories** by 18%. Every additional 1,000 CHF spent here generates approximately 4,200 CHF to 5,400 CHF in net margin.`,
      tableData: {
        headers: ['Part / SKU', 'Gross Rev', 'Ad Spend', 'Returns', 'Net Profit', 'Net Margin', 'POAS'],
        rows: profitableProducts.map(p => [
          `${p.name.substring(0, 24)}... (${p.sku})`,
          `${p.grossRevenue.toLocaleString()} CHF`,
          `${p.adSpend.toLocaleString()} CHF`,
          `${p.returnRate}%`,
          `+${p.netProfit.toLocaleString()} CHF`,
          `${p.netMargin}%`,
          `${p.poas}x`
        ])
      },
      suggestedActions: [
        'Scale Google Search budget for Grundfos & Bosch (+2,000 CHF)',
        'Check inventory lead times with suppliers',
        'Create dedicated bundle for installation gaskets'
      ],
      highlightAlert: {
        type: 'success',
        title: 'High POAS Cluster Detected',
        description: 'HVAC & Appliance replacement parts are yielding an average 4.85x POAS, outpacing automotive parts by 160%.'
      }
    };
  }

  // Question 2: Where are we losing money?
  if (q.includes('losing money') || q.includes('loss') || q.includes('leak') || q.includes('bleeding') || q.includes('drain')) {
    return {
      id: `ai-${Date.now()}`,
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `### 🚨 Critical Profit Leaks: Where We Are Currently Losing Money

We identified **3 primary leakages** causing an estimated **-6,714 CHF** monthly bottom-line drain:

#### 1. The "Vanity ROAS" Trap: Brembo Brake Discs (SKU: ET-BRM-8411)
- **The Illusion:** Google Shopping reports a healthy **4.58x ROAS**.
- **The Reality:** A catastrophic **32.4% return rate** in Germany (customers ordering incorrect disc diameter for BMW G30/G31).
- **Financial Toll:** High freight costs on heavy steel discs + return inspections produce an actual **Net Loss of -2,150 CHF** (POAS: **-0.34x**).

#### 2. Valeo Dual Mass Flywheel (SKU: ET-VAL-6330) in Spain
- **The Problem:** 29.1% return rate due to engine code mismatches.
- **Financial Toll:** Net loss of **-1,124 CHF** despite a 5.28x ROAS on paper.

#### 3. Unproductive Social Prospecting: Meta Broad Automotive DE/ES
- **The Problem:** Broad cold audience targeting for spare parts.
- **Financial Toll:** Spent **8,200 CHF** for only 89 conversions. After subtracting COGS and returns, the campaign generated a **-3,440 CHF net loss** (POAS: **-0.42x**).

---
🛡️ **Immediate AI Mitigations:**
1. **Pause Meta Prospecting DE/ES** immediately to save 8,200 CHF/month in wasted ad spend.
2. **Add Mandatory VIN / Chassis Compatibility Selector** at Shopify checkout for all braking & transmission parts to slash return rates from 32% to under 5%.`,
      tableData: {
        headers: ['Leak Source', 'Type', 'Reported ROAS', 'True POAS', 'Return Rate', 'Monthly Drain'],
        rows: [
          ['Meta Broad Automotive DE/ES', 'Ad Campaign', '2.30x', '-0.42x', 'N/A', '-3,440 CHF'],
          ['Brembo Brake Discs G30/G31', 'SKU Loss', '4.58x', '-0.34x', '32.4%', '-2,150 CHF'],
          ['Valeo Dual Mass Flywheel (ES)', 'SKU Loss', '5.28x', '-0.19x', '29.1%', '-1,124 CHF']
        ]
      },
      suggestedActions: [
        'Pause Meta Broad DE/ES Campaign now',
        'Enable VIN Validator on Shopify Checkout',
        'Exclude heavy chassis parts from Google Shopping until VIN check is live'
      ],
      highlightAlert: {
        type: 'danger',
        title: 'Immediate Savings Identified: 6,714 CHF/mo',
        description: 'Pausing the unprofitable Meta ad set and fixing fitment selection stops the profit leak instantly.'
      }
    };
  }

  // Question 3: Which marketing budgets should we optimize?
  if (q.includes('budget') || q.includes('optimize') || q.includes('marketing') || q.includes('ad spend') || q.includes('roas') || q.includes('poas')) {
    return {
      id: `ai-${Date.now()}`,
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `### 📈 Marketing Budget Optimization Plan (POAS-Driven Reallocation)

Standard marketing dashboards optimize for **ROAS** (Revenue / Spend), which encourages spending on high-cost, high-return SKUs that destroy net margins.

We re-calculated our entire portfolio based on **POAS (Profit On Ad Spend)** to deliver this capital reallocation model:

#### 🔻 Budgets to Cut (-8,500 CHF/mo)
1. **Meta Ads Broad Prospecting (DE/ES):**
   - **Action:** Cut by **-6,200 CHF** (or pause entirely). Current POAS is **-0.42x**.
2. **Google Shopping DE Heavy Braking:**
   - **Action:** Reduce spend by **-2,300 CHF** until the 32% return rate is resolved with fitment filtering.

#### 🔺 Budgets to Scale (+8,500 CHF/mo Reallocated)
1. **Google Ads CH Exact OEM Numbers:**
   - **Current POAS:** **4.88x** | Lost Impression Share: **21%**.
   - **Action:** Increase budget by **+4,500 CHF**. Expected incremental net profit: **+18,200 CHF**.
2. **Google PMax High Margin OEM Spares (CH):**
   - **Current POAS:** **3.42x**.
   - **Action:** Increase budget by **+2,500 CHF**.
3. **Meta Ads Coffee Machine Spares (Italy & DACH):**
   - **Current POAS:** **1.62x** with 48% repeat purchase rate within 6 months.
   - **Action:** Increase budget by **+1,500 CHF**.

---
📊 **Projected Financial Outcome:**
- **Net Marketing Spend Change:** **0 CHF** (Clean reallocation).
- **Projected Net Profit Increase:** **+14,650 CHF / month (+24.4% bottom-line boost)**.`,
      tableData: {
        headers: ['Channel & Campaign', 'Current Spend', 'Adjusted Spend', 'Current POAS', 'Projected Profit Impact'],
        rows: [
          ['Google CH Exact Match OEM', '4,200 CHF', '8,700 CHF (+4.5k)', '4.88x', '+18,200 CHF'],
          ['Google CH PMax High Margin', '7,850 CHF', '10,350 CHF (+2.5k)', '3.42x', '+6,800 CHF'],
          ['Meta Coffee Machine DIY', '6,400 CHF', '7,900 CHF (+1.5k)', '1.62x', '+2,100 CHF'],
          ['Google Shopping DE Braking', '9,400 CHF', '7,100 CHF (-2.3k)', '0.21x', '+1,850 CHF (Loss avoided)'],
          ['Meta Broad Cold DE/ES', '8,200 CHF', '2,000 CHF (-6.2k)', '-0.42x', '+2,600 CHF (Loss avoided)']
        ]
      },
      suggestedActions: [
        'Apply automated 8,500 CHF budget shift across Google & Meta',
        'Set up automated POAS rule (<1.0x pauses ad automatically)',
        'Sync real-time Shopify net margins to Google Ads via Enhanced Conversions'
      ],
      highlightAlert: {
        type: 'warning',
        title: 'Zero-Cost Bottom Line Expansion',
        description: 'Reallocating 8,500 CHF from negative POAS campaigns to high-intent search yields +14,650 CHF net profit without raising total ad budget.'
      }
    };
  }

  // Question on International Expansion: Germany, Spain, Italy vs Switzerland
  if (q.includes('expansion') || q.includes('germany') || q.includes('spain') || q.includes('italy') || q.includes('international') || q.includes('market')) {
    return {
      id: `ai-${Date.now()}`,
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `### 🌍 Regional Expansion Analysis: Switzerland vs. DE, ES, IT

Here is how Ersatzteilstore's profitability breaks down across your active expansion markets:

1. **🇨🇭 Switzerland (Domestic Core):**
   - **Net Margin:** **34.2%** | **Blended POAS:** **3.85x**
   - **Return Rate:** **2.4%** (Extremely disciplined, customer accuracy high).
   - **Conclusion:** Rock-solid cash-flow generator. Has room to scale ad spend in OEM parts.

2. **🇩🇪 Germany (First Expansion Stage):**
   - **Net Margin:** **14.8%** | **Blended POAS:** **1.42x**
   - **Return Rate:** **14.2%** (Driven by automotive DIY misdiagnoses).
   - **Conclusion:** High volume, but shipping across border and return logistics are eating 48% of gross margin.

3. **🇮🇹 Italy (Specialty Market):**
   - **Net Margin:** **28.4%** | **Blended POAS:** **2.10x**
   - **Return Rate:** **4.1%**
   - **Conclusion:** Dominated by espresso machine parts (De'Longhi, Gaggia). Very profitable niche with low freight weight.

4. **🇪🇸 Spain (Emerging):**
   - **Net Margin:** **11.2%** | **Blended POAS:** **1.15x**
   - **Return Rate:** **12.6%**
   - **Conclusion:** High price sensitivity; need to focus on fast-moving universal maintenance kits.`,
      tableData: {
        headers: ['Market', 'Gross Revenue', 'Ad Spend', 'Avg Return Rate', 'Net Margin', 'POAS'],
        rows: [
          ['Switzerland (CHF)', '127,400 CHF', '15,900 CHF', '2.4%', '34.2%', '3.85x'],
          ['Germany (EUR)', '59,900 €', '12,350 €', '14.2%', '14.8%', '1.42x'],
          ['Italy (EUR)', '24,200 €', '5,800 €', '4.1%', '28.4%', '2.10x'],
          ['Spain (EUR)', '17,400 €', '4,100 €', '12.6%', '11.2%', '1.15x']
        ]
      },
      suggestedActions: [
        'Deploy Swiss profit playbook to German appliance parts',
        'Localize Spanish return hubs to cut return shipping by 40%',
        'Double down on Italian espresso spares via localized Meta ads'
      ]
    };
  }

  // Fallback / General inquiry
  return {
    id: `ai-${Date.now()}`,
    sender: 'assistant',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    text: `### 🤖 ProfitPulse AI Intelligence Briefing

I continuously evaluate live data across **Shopify, Google Ads, Meta Business Manager, and GA4** across your **20 million article catalog**.

Here are key metrics you can explore right now:
- **Total Blended Net Profit:** **59,869 CHF** on **228,900 CHF** Gross Revenue (Net Margin: **26.15%**)
- **Blended POAS:** **2.57x** (Net contribution exceeds ad spend by 157%)
- **Active Anomalies:** 3 alerts detected (2 cost leakages, 1 high-POAS scale opportunity)

Try clicking one of the suggested prompts below or ask any specific question about your catalog, channels, or European expansion!`,
    suggestedActions: [
      'Which products are the most profitable after deducting all costs?',
      'Where are we currently losing money?',
      'Which marketing budgets should we optimize?'
    ]
  };
}
