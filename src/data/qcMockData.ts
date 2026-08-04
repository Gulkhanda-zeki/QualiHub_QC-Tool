export const PLATFORM = {
  adminName: "Zeki",
  displayName: "Zeki Control",
  role: "Super Admin",
  initials: "ZC",
  dateRange: "28 Jul – 3 Aug 2026",
  refreshedAgo: "2 min ago",
  criticalIssues: 3,
  alertSummary:
    "2 companies waiting for an answer · 2 invoices unpaid · 1 company near its minute limit",
};

export const NAV_SECTIONS = [
  {
    label: "Operate",
    items: [
      { id: "overview", label: "Platform", icon: "home", badge: null },
      { id: "alerts", label: "Alerts", icon: "bell", badge: "5" },
      { id: "companies", label: "Companies", icon: "building", badge: "28" },
      { id: "billing", label: "Billing", icon: "bolt", badge: "1" },
      { id: "system", label: "System", icon: "chart", badge: "4" },
    ],
  },
  {
    label: "Govern",
    items: [
      { id: "requests", label: "Requests", icon: "clipboard", badge: "2" },
      { id: "audit", label: "Audit log", icon: "shield", badge: null },
      { id: "settings", label: "Settings", icon: "settings", badge: null },
    ],
  },
];

export const KPI = {
  mrr: {
    value: "$2,340",
    trend: "↑ 8.2% vs last month",
    sub: "ARR $28.1k",
  },
  companies: {
    active: 24,
    total: 28,
    sub: "3 blocked · 1 on trial · +2 this month",
  },
  minutes: {
    used: 41208,
    total: 65000,
    sub: "63% of fleet allowance · 2 near cap",
  },
  seats: {
    used: 148,
    total: 198,
    sub: "75% licensed · upsell signal at 90%",
  },
};

export const REVENUE_CHART = {
  title: "Revenue",
  subtitle: "Revenue billed each month · 2026 · August is still in progress",
  yAxisLabels: ["$2.4k", "$1.8k", "$1.2k", "$600", "0"],
  months: [
    { label: "Jan", value: null },
    { label: "Feb", value: 1280, display: "$1.28k" },
    { label: "Mar", value: 1430, display: "$1.43k" },
    { label: "Apr", value: 1620, display: "$1.62k" },
    { label: "May", value: 1790, display: "$1.79k" },
    { label: "Jun", value: 1960, display: "$1.96k" },
    { label: "Jul", value: 2260, display: "$2.26k" },
    { label: "Aug", value: 2340, display: "$2.34k", highlight: true },
  ],
  maxValue: 2400,
};

export const BUSIEST_COMPANIES = [
  { rank: 1, name: "Helios Travel Group", initials: "H", color: "#1A1A1A", calls: 1142, minutes: 2674 },
  { rank: 2, name: "Vertex Financial", initials: "V", color: "#1A1A1A", calls: 824, minutes: 1910 },
  { rank: 3, name: "Northgate Telecom", initials: "N", color: "#8B6914", calls: 512, minutes: 1204 },
  { rank: 4, name: "Marisol Health", initials: "M", color: "#113C94", calls: 347, minutes: 812 },
  { rank: 5, name: "Cardinal Utilities", initials: "C", color: "#12B76A", calls: 268, minutes: 640 },
];

export const MINUTE_CAP_COMPANIES = [
  { name: "Helios Travel Group", used: 2674, cap: 3000 },
  { name: "Marisol Health", used: 812, cap: 1000 },
  { name: "Vertex Financial", used: 1910, cap: 3000 },
  { name: "Cardinal Utilities", used: 648, cap: 1000 },
];

export const CALLS_OVERVIEW = {
  labels: ["Jul 28", "Jul 29", "Jul 30", "Jul 31", "Aug 1", "Aug 2", "Aug 3"],
  values: [3820, 4102, 3950, 4523, 4680, 4210, 4390],
  highlightIndex: 3,
  highlightLabel: "4.52k",
};

export const SENTIMENT = {
  total: 24578,
  segments: [
    { label: "Positive", calls: 9456, pct: 38.5, color: "#12B76A" },
    { label: "Neutral", calls: 10124, pct: 41.2, color: "#113C94" },
    { label: "Negative", calls: 5998, pct: 24.3, color: "#F04438" },
  ],
};

export const TOP_COMPANIES = [
  { rank: 1, name: "Bright Connect", initials: "B", color: "#113C94", calls: 2345, score: 89.2 },
  { rank: 2, name: "VoiceWorks", initials: "V", color: "#7c3aed", calls: 1987, score: 87.1 },
  { rank: 3, name: "CallPro Soluti...", initials: "C", color: "#2E90FA", calls: 1765, score: 84.6 },
  { rank: 4, name: "CustomerXpe...", initials: "C", color: "#2E90FA", calls: 1456, score: 82.3 },
  { rank: 5, name: "NextGen Sup...", initials: "N", color: "#F79009", calls: 1234, score: 80.5 },
];

export const NEEDS_ATTENTION = {
  openCount: 5,
  filters: ["All", "Billing", "Usage", "Pipeline", "Request", "Churn risk"],
  items: [
    {
      id: "na-1",
      filter: "Billing",
      title: "Vertex Financial — payment failed",
      sub: "Invoice INV-2081 · $100 · Stripe declined, 2 retries left",
      tag: "Billing",
      time: "4h ago",
      done: false,
    },
    {
      id: "na-2",
      filter: "Usage",
      title: "Helios Travel Group at 89% of minutes",
      sub: "2,674 of 3,000 min used · projected to exhaust 26 Aug",
      tag: "Usage",
      time: "today",
      done: false,
    },
    {
      id: "na-3",
      filter: "Pipeline",
      title: "4 transcription jobs failed",
      sub: "Sortformer OOM on files longer than 55 min",
      tag: "Pipeline",
      time: "6h ago",
      done: false,
    },
    {
      id: "na-4",
      filter: "Request",
      title: "Marisol Health requests Standard → Pro",
      sub: "Submitted by their admin · seats 6 → 12",
      tag: "Request",
      time: "2d ago",
      done: false,
    },
    {
      id: "na-5",
      filter: "Churn risk",
      title: "Orchard Collections — no activity in 21 days",
      sub: "Last call processed 12 Jul · 3 of 6 seats never signed in",
      tag: "Churn risk",
      time: "21d ago",
      done: false,
    },
  ],
};

export const PANEL_LABELS: Record<string, string> = {
  overview: "Platform",
  alerts: "Alerts",
  companies: "Companies",
  billing: "Billing",
  system: "System health",
  requests: "Requests",
  audit: "Audit log",
  settings: "Platform settings",
};

export const ALERTS_PANEL = {
  subtitle:
    "2 companies waiting for an answer · 2 invoices unpaid · 1 company near its minute limit · oldest open 21 days",
  filters: ["All", "Request", "Billing", "Usage"],
  statusLine: "5 open · sorted by severity",
  footer:
    "Alerts are raised for: minutes at 80% / 95% / 100%, an invoice unpaid for more than 3 days, a new request from a company, and processing failures above 5%.",
  items: [
    {
      id: "a1",
      filter: "Request",
      severity: "high" as const,
      title: "Bluewater Insurance wants to subscribe",
      sub: "Asking for the Pro plan · 12 seats · their trial ends in 3 days",
      tag: "Request",
      time: "today",
      action: "Review request",
    },
    {
      id: "a2",
      filter: "Request",
      severity: "high" as const,
      title: "Marisol Health wants to move to Pro",
      sub: "Asked for by their own admin · seats 6 → 12",
      tag: "Request",
      time: "2d ago",
      action: "Review request",
    },
    {
      id: "a3",
      filter: "Billing",
      severity: "medium" as const,
      title: "Helios Travel Group — August invoice unpaid",
      sub: "INV-2081 · $100 · reason given: waiting for their finance approval",
      tag: "Billing",
      time: "4d ago",
      action: "Open company",
    },
    {
      id: "a4",
      filter: "Billing",
      severity: "medium" as const,
      title: "Vertex Financial — August invoice unpaid",
      sub: "INV-2080 · $100 · reason given: purchase order not issued yet",
      tag: "Billing",
      time: "12d ago",
      action: "Open company",
    },
    {
      id: "a5",
      filter: "Usage",
      severity: "medium" as const,
      title: "Helios Travel Group at 89% of minutes",
      sub: "2,674 of 3,000 min used · will finish around 26 Aug",
      tag: "Usage",
      time: "today",
      action: "Open company",
    },
  ],
};

export const COMPANIES_PANEL = {
  filters: ["All", "Pro", "Standard", "Blocked"],
  sortLabel: "sorted by minutes used ↓",
  companies: [
    {
      id: "HEL-0114",
      name: "Helios Travel Group",
      initials: "H",
      color: "#1A1A1A",
      plan: "Pro",
      access: "Active",
      billing: "Unpaid",
      seatsUsed: 9,
      seatsTotal: 12,
      minsUsed: 2674,
      minsTotal: 3000,
      pct: 89,
      mrr: "$100",
    },
    {
      id: "VER-0098",
      name: "Vertex Financial",
      initials: "V",
      color: "#1A1A1A",
      plan: "Pro",
      access: "Active",
      billing: "Unpaid",
      seatsUsed: 12,
      seatsTotal: 12,
      minsUsed: 1910,
      minsTotal: 3000,
      pct: 64,
      mrr: "$100",
    },
    {
      id: "NOR-0132",
      name: "Northgate Telecom",
      initials: "N",
      color: "#8B6914",
      plan: "Pro",
      access: "Active",
      billing: "Paid",
      seatsUsed: 7,
      seatsTotal: 12,
      minsUsed: 1204,
      minsTotal: 3000,
      pct: 40,
      mrr: "$100",
    },
    {
      id: "MAR-0121",
      name: "Marisol Health",
      initials: "M",
      color: "#113C94",
      plan: "Standard",
      access: "Active",
      billing: "Paid",
      seatsUsed: 5,
      seatsTotal: 6,
      minsUsed: 812,
      minsTotal: 1000,
      pct: 81,
      mrr: "$50",
    },
    {
      id: "CAR-0087",
      name: "Cardinal Utilities",
      initials: "C",
      color: "#12B76A",
      plan: "Standard",
      access: "Active",
      billing: "Paid",
      seatsUsed: 4,
      seatsTotal: 6,
      minsUsed: 640,
      minsTotal: 1000,
      pct: 64,
      mrr: "$50",
    },
    {
      id: "BLU-0140",
      name: "Bluewater Insurance",
      initials: "B",
      color: "#2E90FA",
      plan: "Standard",
      access: "Active",
      billing: "Trial",
      seatsUsed: 2,
      seatsTotal: 6,
      minsUsed: 180,
      minsTotal: 1000,
      pct: 18,
      mrr: "$0",
    },
    {
      id: "ORC-0076",
      name: "Orchard Collections",
      initials: "O",
      color: "#8A8A8A",
      plan: "Standard",
      access: "Suspended",
      billing: "Cancelled",
      seatsUsed: 3,
      seatsTotal: 6,
      minsUsed: 0,
      minsTotal: 1000,
      pct: 0,
      mrr: "$0",
    },
  ],
};

export type CompanyListItem = (typeof COMPANIES_PANEL.companies)[number];

const HELIOS_DETAIL = {
  industry: "travel & hospitality",
  customerSince: "14 Mar 2025",
  accountOwner: "Sana K.",
  callsThisMonth: 1142,
  callsTrend: "+18% vs last month",
  planPrice: "$100 per month",
  onboarding: [
    { label: "Company created", done: true, meta: "14 Mar 2025" },
    { label: "Login details sent once", done: true, meta: "14 Mar 2025" },
    { label: "First call uploaded", done: true, meta: "15 Mar 2025" },
    { label: "Campaign switched on", done: true, meta: "16 Mar 2025" },
    { label: "August invoice paid", done: false, meta: "pending" },
  ],
  notes: [
    {
      body: "They pay by bank transfer — reminded their finance contact to clear August before the 28th.",
      author: "Sana K.",
      when: "2 days ago",
    },
    {
      body: "Wants a Max-tier quote for 8,000 min/mo once their Q4 season starts.",
      author: "Sana K.",
      when: "12 Jul 2026",
    },
    {
      body: "Escalation: 3 diarisation complaints on long conference calls. Linked to the Sortformer OOM issue.",
      author: "Support",
      when: "4 Jul 2026",
    },
  ],
  usageBilling: {
    chartSubtitle: "Daily, this billing period · allowance 3,000 min/mo",
    chartLabels: ["1 Aug", "8 Aug", "15 Aug", "22 Aug", "29 Aug"] as const,
    // 29 daily bars — later days highlighted yellow (near cap)
    dailyMinutes: [
      62, 78, 55, 90, 71, 84, 68, 95, 72, 88, 66, 80, 74, 92, 70, 86, 78, 94, 82, 98, 88, 105, 96,
      112, 108, 118, 115, 122, 110,
    ],
    highlightFromDay: 22,
    periodStats: [
      { label: "Minutes used", value: "2,674" },
      { label: "Allowance", value: "3,000" },
      { label: "Remaining", value: "326" },
      { label: "Calls processed", value: "1,142" },
      { label: "Avg minutes / call", value: "2.34" },
    ],
    warningTitle: "89% of allowance used",
    warningBody:
      "At the current rate they exhaust minutes on 26 Aug. Overage policy is set to warn.",
    unpaidCount: 1,
    invoices: [
      {
        id: "INV-2081",
        period: "Aug 2026 · Pro",
        amount: "$100.00",
        status: "Unpaid",
        reason: "Waiting for their finance approval",
      },
      {
        id: "INV-1994",
        period: "Jul 2026 · Pro",
        amount: "$100.00",
        status: "Paid",
        reason: "—",
      },
      {
        id: "INV-1982",
        period: "Jun 2026 · Pro",
        amount: "$100.00",
        status: "Paid",
        reason: "—",
      },
    ],
  },
  campaigns: {
    intro: "Which campaigns this company is running. Their scores stay inside their own console.",
    items: [
      {
        name: "Travel & hospitality",
        detail: "Running since 14 Mar 2025 · 14 checkpoints",
        status: "Published",
      },
      {
        name: "Sales & marketing",
        detail: "Running since 2 Jun 2025 · 11 checkpoints",
        status: "Published",
      },
      {
        name: "Debt collection",
        detail: "Available on their plan, not switched on",
        status: "Not enabled",
      },
      {
        name: "Helios custom — VIP desk",
        detail: "Drafted with their QA lead, not live yet",
        status: "Draft",
      },
    ],
  },
};

const INDUSTRY_BY_ID: Record<string, string> = {
  "HEL-0114": "travel & hospitality",
  "VER-0098": "financial services",
  "NOR-0132": "telecom",
  "MAR-0121": "healthcare",
  "CAR-0087": "utilities",
  "BLU-0140": "insurance",
  "ORC-0076": "collections",
};

export function getCompanyDetail(companyId: string) {
  const company = COMPANIES_PANEL.companies.find((c) => c.id === companyId);
  if (!company) return null;

  if (companyId === "HEL-0114") {
    return {
      ...company,
      ...HELIOS_DETAIL,
      invoiceUnpaid: company.billing === "Unpaid",
    };
  }

  const seatsAvailable = Math.max(0, company.seatsTotal - company.seatsUsed);
  const remaining = Math.max(0, company.minsTotal - company.minsUsed);
  const avgMin = company.minsUsed > 0 ? (company.minsUsed / Math.max(1, Math.round(company.minsUsed * 0.4))).toFixed(2) : "0";

  return {
    ...company,
    industry: INDUSTRY_BY_ID[companyId] ?? "general",
    customerSince: "1 Jan 2026",
    accountOwner: "Sana K.",
    callsThisMonth: Math.round(company.minsUsed * 0.4),
    callsTrend: "+8% vs last month",
    planPrice: company.mrr === "$0" ? "Trial" : `${company.mrr} per month`,
    invoiceUnpaid: company.billing === "Unpaid",
    onboarding: [
      { label: "Company created", done: true, meta: "1 Jan 2026" },
      { label: "Login details sent once", done: true, meta: "1 Jan 2026" },
      { label: "First call uploaded", done: company.minsUsed > 0, meta: company.minsUsed > 0 ? "3 Jan 2026" : "pending" },
      { label: "Campaign switched on", done: company.access === "Active" && company.minsUsed > 100, meta: company.minsUsed > 100 ? "5 Jan 2026" : "pending" },
      {
        label: "Current invoice paid",
        done: company.billing === "Paid",
        meta: company.billing === "Paid" ? "paid" : "pending",
      },
    ],
    notes: [
      {
        body: `Account on ${company.plan} with ${company.seatsUsed} of ${company.seatsTotal} seats in use.`,
        author: "Sana K.",
        when: "1 week ago",
      },
      {
        body: seatsAvailable
          ? `${seatsAvailable} seats still available on this licence.`
          : "Seat capacity is fully used.",
        author: "System",
        when: "3 days ago",
      },
    ],
    usageBilling: {
      chartSubtitle: `Daily, this billing period · allowance ${company.minsTotal.toLocaleString()} min/mo`,
      chartLabels: ["1 Aug", "8 Aug", "15 Aug", "22 Aug", "29 Aug"] as const,
      dailyMinutes: Array.from({ length: 29 }, (_, i) =>
        Math.max(20, Math.round((company.minsUsed / 29) * (0.7 + (i / 29) * 0.8))),
      ),
      highlightFromDay: company.pct >= 80 ? 22 : 30,
      periodStats: [
        { label: "Minutes used", value: company.minsUsed.toLocaleString() },
        { label: "Allowance", value: company.minsTotal.toLocaleString() },
        { label: "Remaining", value: remaining.toLocaleString() },
        { label: "Calls processed", value: Math.round(company.minsUsed * 0.4).toLocaleString() },
        { label: "Avg minutes / call", value: avgMin },
      ],
      warningTitle: `${company.pct}% of allowance used`,
      warningBody:
        company.pct >= 80
          ? "At the current rate they may exhaust minutes before period end. Overage policy is set to warn."
          : "Usage is within a healthy range for this billing period.",
      unpaidCount: company.billing === "Unpaid" ? 1 : 0,
      invoices: [
        {
          id: `INV-${company.id.slice(0, 3)}-01`,
          period: `Aug 2026 · ${company.plan}`,
          amount: company.mrr === "$0" ? "$0.00" : `${company.mrr}.00`,
          status: company.billing === "Unpaid" ? "Unpaid" : company.billing === "Paid" ? "Paid" : company.billing,
          reason: company.billing === "Unpaid" ? "Awaiting payment" : "—",
        },
      ],
    },
    campaigns: {
      intro: "Which campaigns this company is running. Their scores stay inside their own console.",
      items: [
        {
          name: `${INDUSTRY_BY_ID[companyId] ?? "General"} core`,
          detail:
            company.minsUsed > 0
              ? "Running since 1 Jan 2026 · 8 checkpoints"
              : "Available on their plan, not switched on",
          status: company.minsUsed > 0 ? "Published" : "Not enabled",
        },
        {
          name: "Sales & marketing",
          detail:
            company.plan === "Pro"
              ? "Running since 2 Jun 2025 · 11 checkpoints"
              : "Available on their plan, not switched on",
          status: company.plan === "Pro" && company.minsUsed > 100 ? "Published" : "Not enabled",
        },
        {
          name: "Debt collection",
          detail: "Available on their plan, not switched on",
          status: "Not enabled",
        },
      ],
    },
  };
}

export const BILLING_PANEL = {
  subtitle: "Invoices and the plan catalog · August 2026 · 2 invoices unpaid, $200 outstanding",
  kpis: [
    { label: "Collected this month", value: "$2,140", trend: "+6.1%", sub: "11 of 13 invoices paid", trendUp: true },
    { label: "Unpaid", value: "$200", trend: "2 invoices", sub: "oldest 34 days", trendUp: false },
    { label: "Monthly recurring revenue", value: "$2,340", trend: "+8.2%", sub: "yearly run-rate $28.1k", trendUp: true },
  ],
  invoiceFilters: ["All", "Unpaid", "Paid", "Pending", "Refunded"],
  invoices: [
    { id: "INV-2081", company: "Helios Travel Group", plan: "Pro · Aug 2026", amount: "$100.00", status: "Unpaid", note: "Waiting for their finance approval", action: "Mark paid" },
    { id: "INV-2080", company: "Vertex Financial", plan: "Pro · Aug 2026", amount: "$100.00", status: "Unpaid", note: "Purchase order not issued yet", action: "Mark paid" },
    { id: "INV-2079", company: "Northgate Telecom", plan: "Pro · Aug 2026", amount: "$100.00", status: "Paid", note: "—", action: "View" },
    { id: "INV-2078", company: "Marisol Health", plan: "Standard · Aug 2026", amount: "$50.00", status: "Paid", note: "—", action: "View" },
    { id: "INV-2077", company: "Cardinal Utilities", plan: "Standard · Aug 2026", amount: "$50.00", status: "Paid", note: "—", action: "View" },
    { id: "INV-2076", company: "Sable Energy", plan: "Pro · Aug 2026", amount: "$100.00", status: "Pending", note: "Invoice sent 1 Aug, due 15 Aug", action: "Send" },
    { id: "INV-1998", company: "Orchard Collections", plan: "Standard · Jul 2026", amount: "$50.00", status: "Refunded", note: "Cancelled mid-period, refunded in full", action: "View" },
  ],
  plans: [
    { name: "Standard", price: "$50", detail: "1,000 min · 6 seats · 1 campaign" },
    { name: "Pro", price: "$100", detail: "3,000 min · 12 seats · all campaigns" },
    { name: "Max", price: "Custom", detail: "unlimited · SSO · on-prem" },
  ],
  overageNote:
    "What happens when a company finishes its monthly minutes. Block stops new uploads until the next period, Warn keeps processing and flags the account here, Bill per minute adds $0.04 per extra minute to the next invoice.",
};

export const SYSTEM_PANEL = {
  title: "System health",
  subtitle: "How fast uploaded calls are being processed right now",
  statusPill: "Degraded — queue backing up",
  kpis: [
    { label: "Calls waiting to be processed", value: "52 calls", sub: "about 15 min before each one starts" },
    { label: "GPU memory in use", value: "13.4 / 16 GB", sub: "RTX 3060 Ti · 84% full" },
    { label: "Calls that failed today", value: "4 of 224", sub: "1.8% of uploads · all can be retried" },
  ],
  failedIntro:
    "These recordings were uploaded but the system could not finish analysing them, so the company sees no score yet. Retrying puts them back in the queue.",
  failedJobs: [
    { file: "helios_conf_0812.mp3", error: "Recording too long (71 min) — ran out of GPU memory", company: "Helios Travel Group", time: "06:41" },
    { file: "vertex_collections_44.wav", error: "Audio format not supported — ask them to re-upload as MP3", company: "Vertex Financial", time: "05:12" },
    { file: "helios_conf_0809.mp3", error: "Recording too long (63 min) — ran out of GPU memory", company: "Helios Travel Group", time: "02:58" },
    { file: "northgate_retention_9.m4a", error: "Scoring model did not answer in time", company: "Northgate Telecom", time: "01:28" },
  ],
  models: [
    { name: "Parakeet TDT 0.6B v3", sub: "STT · loaded 4.1 GB VRAM · warm 6d", status: "Warm" },
    { name: "Streaming Sortformer 4spk", sub: "Diarisation · OOM on 68 min+ inputs", status: "Degraded" },
    { name: "Silero VAD", sub: "CPU · negligible", status: "Warm" },
    { name: "Ollama qwen2.5:3b-instruct", sub: "LLM · p95 latency 41 s", status: "Warm" },
    { name: "FFmpeg", sub: "System build 6.1 · transcode ok", status: "Warm" },
  ],
  queueSubtitle: "Sustained depth above 40 means calls are waiting more than 15 minutes for a GPU slot.",
  queuePeriod: "last 24 hours · jobs waiting",
  queueData: [18, 22, 28, 35, 42, 48, 52, 46, 38, 44, 50, 52, 47, 41, 36, 32, 28, 34, 40, 45, 49, 52, 48, 44],
};

export const REQUESTS_PANEL = {
  subtitle:
    "New subscriptions, plan changes and cancellations asked for by companies. Approving applies the change to the company, its licence and its next invoice together.",
  filters: ["All", "Pending", "Approved", "Declined"],
  items: [
    {
      id: "r1",
      filter: "Pending",
      status: "Pending",
      title: "Bluewater Insurance · new subscription",
      description: "Their trial ends in 3 days and they want to continue on the Pro plan.",
      meta: "requested by ceo@bluewaterins.com · 3 Aug 2026",
      onApproval:
        "On approval: trial becomes a paid Pro subscription — 12 seats, 3,000 minutes, $100 per month — and the first invoice is issued today.",
      tone: "info" as const,
    },
    {
      id: "r2",
      filter: "Pending",
      status: "Pending",
      title: "Marisol Health · Standard → Pro",
      description: "Their QA team grew past 6 seats and they need the debt-collection campaign set.",
      meta: "requested by fatima@marisolhealth.com · 1 Aug 2026 · 1 request per 30 days",
      onApproval:
        "On approval: seats 6 → 12, minutes 1,000 → 3,000, MRR $50 → $100, licence updated and a prorated invoice issued for the remaining 28 days.",
      tone: "info" as const,
    },
    {
      id: "r3",
      filter: "Pending",
      status: "Pending",
      title: "Cardinal Utilities · cancel subscription",
      description: 'Reason given: "budget freeze until January".',
      meta: "requested by ops@cardinalutilities.com · 30 Jul 2026",
      onApproval:
        "On approval: access ends at period end (31 Aug), MRR −$50, data retained 90 days then purged per policy.",
      tone: "danger" as const,
    },
  ],
};

export const AUDIT_PANEL = {
  subtitle: "Append-only record of every privileged action · retained 24 months",
  filters: ["All", "High", "Medium", "Low"],
  dateRange: "1 Jul – 3 Aug 2026",
  footer: "Showing 10 of 4,182 entries · filters and paging run server-side",
  entries: [
    { action: "Invoice INV-2079 marked as paid", actor: "superadmin@zekiexpert.com", company: "Northgate Telecom", severity: "medium", time: "3 Aug 09:41" },
    { action: "Plan catalog edited — Pro price $100", actor: "superadmin@zekiexpert.com", company: "—", severity: "high", time: "3 Aug 08:12" },
    { action: "Blocked company", actor: "superadmin@zekiexpert.com", company: "Sable Energy", severity: "high", time: "2 Aug 17:20" },
    { action: "Minute allowance 1,000 → 1,500", actor: "superadmin@zekiexpert.com", company: "Marisol Health", severity: "medium", time: "2 Aug 15:03" },
    { action: "Approved request #418 (plan change)", actor: "superadmin@zekiexpert.com", company: "Northgate Telecom", severity: "high", time: "2 Aug 11:47" },
    { action: "Declined request #412 (cancellation)", actor: "superadmin@zekiexpert.com", company: "Sable Energy", severity: "medium", time: "2 Aug 11:20" },
    { action: "Overage policy changed to Warn", actor: "superadmin@zekiexpert.com", company: "—", severity: "medium", time: "1 Aug 16:22" },
    { action: "Staff role updated — Finance", actor: "superadmin@zekiexpert.com", company: "—", severity: "high", time: "1 Aug 10:09" },
    { action: "Company login created and emailed once", actor: "superadmin@zekiexpert.com", company: "Bluewater Insurance", severity: "medium", time: "30 Jul 12:00" },
    { action: "New company created", actor: "superadmin@zekiexpert.com", company: "Bluewater Insurance", severity: "medium", time: "30 Jul 11:58" },
  ],
};

export const SETTINGS_PANEL = {
  subtitle: "Your own account details, and the staff who can sign in to this console.",
  profile: {
    name: "Zeki Control",
    email: "superadmin@zekiexpert.com",
    phone: "+92 300 1234567",
    title: "Platform owner",
    roleLine: "Super admin · full access to every company",
  },
  staff: [
    {
      initials: "ZC",
      name: "Zeki Control",
      email: "superadmin@zekiexpert.com",
      role: "Super admin",
      scope: "Everything, including staff and secrets",
    },
    {
      initials: "SK",
      name: "Sana Khalid",
      email: "sana@zekiexpert.com",
      role: "Support",
      scope: "Companies, users, impersonation · no billing",
    },
    {
      initials: "IY",
      name: "Imran Yousaf",
      email: "imran@zekiexpert.com",
      role: "Finance",
      scope: "Billing, invoices, plan catalog · read-only elsewhere",
    },
  ],
};
