# ProfitPulse AI | Ersatzteilstore Profit & Unit Economics Intelligence

> **Enterprise Proof-of-Concept & Autonomous Control System for Ersatzteilstore (Switzerland, Germany, Spain, Italy)**

---

## 🚀 Executive Summary

**Ersatzteilstore** is Switzerland's leading spare parts retailer with over **20 million articles**, currently scaling aggressively into Germany, Spain, and Italy. 

In high-SKU spare parts e-commerce, **top-line revenue and traditional agency ROAS (Return On Ad Spend) are vanity metrics**. An ad campaign boasting a 4.5x ROAS can actively destroy cash flow if the underlying part suffers from a 32% return rate, high return freight costs, or narrow supplier margins.

**ProfitPulse AI** is not merely a reporting dashboard; it is an **autonomous monitoring and control engine** that unites:
- **Shopify Plus** (Orders, Line-Item COGS, Weight, Returns, Gateways)
- **Google Ads & Merchant Center** (Search, Shopping, PMax item-level spend)
- **Meta Business Manager** (Advantage+, Ad sets, Blended CAC)
- **Google Analytics 4 & TikTok Ads** (Attribution & Funnels)

---

## 🎯 Benchmark Challenge Questions Addressed

This system was built specifically to resolve the core executive questions posed by Afram:

### 1. *"Which products are the most profitable after deducting all costs?"*
- **Solution:** ProfitPulse AI computes true **Contribution Margin 3 (CM3)** and **POAS (Profit On Ad Spend)** at the SKU level.
- **Top Bottom-Line Drivers:**
  - **Kärcher Brass Cylinder Head (SKU: ET-KRC-5100):** 53.1% Net Margin, **5.66x POAS** (highest percentage margin in catalog).
  - **Grundfos Alpha2 25-60 Heating Pump (SKU: ET-GRU-1205):** +13,125 CHF Net Profit, **5.46x POAS**.
  - **Bosch High-Pressure Diesel Pump CP4 (SKU: ET-BOS-9942):** +16,300 CHF Net Profit, **4.23x POAS**.
  - **Miele Dishwasher Drain Pump (SKU: ET-MLE-8820):** 42.3% Net Margin, **3.99x POAS**.

### 2. *"Where are we currently losing money?"*
- **Solution:** Real-time margin leakage detection identifies unprofitable ad sets and return bottlenecks:
  - 🚨 **Brembo Vented Brake Discs (DE - SKU: ET-BRM-8411):** 4.58x vanity ROAS on Google Shopping masked a **32.4% return rate** in Germany (ordering wrong disc diameter for BMW G30/G31). Freight and returns turned this into a **-2,150 CHF net loss**.
  - 🚨 **Valeo Dual Mass Flywheel (ES - SKU: ET-VAL-6330):** 29.1% return rate yielded a **-1,124 CHF net loss**.
  - 🚨 **Meta Broad Cold Prospecting (DE/ES):** 8,200 CHF spend produced only 89 orders with a negative **-0.42x POAS**, draining **-3,440 CHF/month**.

### 3. *"Which marketing budgets should we optimize?"*
- **Solution:** A zero-net-spend capital reallocation strategy:
  - **Cut -8,500 CHF/month:** Stop bleeding on Meta Cold Prospecting (-6,200 CHF) and trim Google Shopping DE heavy chassis (-2,300 CHF).
  - **Reallocate +8,500 CHF/month:** Deploy into Google CH Exact OEM Search (+4,500 CHF, POAS 4.88x), Google PMax Swiss High Margin (+2,500 CHF, POAS 3.42x), and Meta Italian Espresso Spares (+1,500 CHF).
  - **Projected Result:** **+14,650 CHF / month incremental net profit** with zero additional ad budget.

---

## 🏛️ Extensible 5-Layer System Architecture

Designed to scale effortlessly from the initial PoC (Shopify + Google + Meta) to 20M+ catalog items and enterprise ERPs:

```
[ LAYER 1: DATA INGESTION ADAPTERS ]
  ├── Shopify Plus Webhooks (Orders, Line-items, COGS, Returns, Gateways)
  ├── Google Ads API & Merchant Center (Search, Shopping, PMax Item Spend)
  ├── Meta Marketing API & CAPI (Ad Sets, Frequency, Attributed Value)
  ├── TikTok Ads & GA4 BigQuery (Behavioral Event Stream)
  └── WMS / Warehouse ERP (Odoo / SAP Stock & Weight Surcharges)
                     │
                     ▼
[ LAYER 2: IDENTITY RESOLUTION & NORMALIZATION ]
  ├── Multi-Currency Normalizer (CHF, EUR live spot conversion)
  ├── 20M OEM Part Number to Aftermarket Cross-Reference Graph
  └── First-Party Attribution Stitcher (UTM / GCLID to Shopify Order ID)
                     │
                     ▼
[ LAYER 3: UNIT ECONOMICS & PROFIT ENGINE ]
  ├── CM1: Gross Profit (Revenue - Supplier COGS)
  ├── CM2: Net Contribution (CM1 - Shipping - Return Processing - Gateway Fees)
  ├── CM3: Operating Contribution (CM2 - Attributed Ad Spend)
  └── POAS Computation = (True Margin before Ads / Ad Spend)
                     │
                     ▼
[ LAYER 4: AUTONOMOUS AI WATCHDOG & COPILOT ]
  ├── Heuristic Anomaly Detectors (Surge in returns, ad fatigue, bleed alerts)
  ├── Natural Language RAG Copilot (Querying tabular profit models in real-time)
  └── Budget Reallocation Optimization Algorithms
                     │
                     ▼
[ LAYER 5: STOREFRONT & MARKETING AUTOMATION ]
  ├── Automated Ad Pause Hooks (Pauses campaigns when POAS < 1.0x)
  ├── Dynamic Checkout Gating (Mandatory VIN check on high-return SKUs)
  └── Executive P&L Dashboard & Slack/Email Alerts
```

---

## 🛠️ Tech Stack & Key Technologies

- **Frontend & App Framework:** React 18, TypeScript, Vite, Tailwind CSS
- **Visualization:** Recharts & Canvas Confetti (Interactive Waterfall & Performance Charts)
- **UI Components & Icons:** Lucide React, Plus Jakarta Sans, JetBrains Mono
- **Deployment:** Vercel / Netlify (Zero cold-start edge delivery)

---

## 💻 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone <REPO_URL>
   cd ai-profit-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Production Build:**
   ```bash
   npm run build
   ```

---

## 🌐 1-Click Deployment (Vercel / Netlify)

This project is completely production-ready and can be deployed directly to Vercel:

```bash
# Using Vercel CLI
npm install -g vercel
vercel
```

Or connect the GitHub repository to [Vercel](https://vercel.com) for automatic CI/CD deployment.

---

## 📄 License

Proprietary prototype prepared exclusively for **Ersatzteilstore AG**. All rights reserved.
