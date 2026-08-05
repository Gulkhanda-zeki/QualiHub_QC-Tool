export const ORG_PLATFORM = {
  workspace: "Helios Travel Group",
  workspaceCode: "HEL-0114",
  displayName: "Jordan Maes",
  firstName: "Jordan",
  email: "admin@heliostravel.io",
  role: "Workspace Admin",
  initials: "JM",
  plan: "Pro",
  planPrice: "$100/mo",
  planMinutes: 3000,
  planUsers: 12,
  planRenewal: "1 Sep 2026",
};

export const ORG_OVERVIEW_KPIS = [
  { label: "Users", value: "9", of: "/ 12", sub: "3 seats remaining" },
  { label: "Calls analyzed", value: "1,842", of: "this month", sub: "+12% vs last month" },
  { label: "Minutes left", value: "330", of: "of 3,000", sub: "Nearing cap — consider upgrading" },
  { label: "Avg QA score", value: "81", of: "/ 100", sub: "+3 pts vs last month" },
];

export const ORG_CRITICAL_ATTENTION = [
  {
    id: "1",
    severity: "high" as const,
    title: "Mandatory checkpoint failed — call CL-4821",
    tag: "Red flag",
  },
  {
    id: "2",
    severity: "medium" as const,
    title: "Score dispute raised on call CL-4790",
    tag: "Dispute",
  },
  {
    id: "3",
    severity: "medium" as const,
    title: "Invoice INV-0091 unpaid for 4 days",
    tag: "Billing",
  },
  {
    id: "4",
    severity: "low" as const,
    title: "Plan-change request pending review",
    tag: "Request",
  },
];

export const ORG_COACHING_QUEUE = [
  { initials: "NF", name: "Noor Fatima", role: "Agent", qa: 74, trend: "-6" },
];

export const ORG_NAV_SECTIONS = [
  {
    label: "Manage",
    items: [
      { id: "overview", label: "Overview", icon: "home" },
      { id: "users", label: "User Management", icon: "users" },
      { id: "roles", label: "Roles & Permissions", icon: "shield" },
      { id: "billing", label: "Account & Billing", icon: "bolt" },
    ],
  },
  {
    label: "Quality",
    items: [
      { id: "campaigns", label: "Campaigns & Scorecards", icon: "clipboard" },
      { id: "agents", label: "Agent Performance", icon: "chart" },
    ],
  },
  {
    label: "Govern",
    items: [
      { id: "alerts", label: "Alerts", icon: "bell", badge: "4" },
      { id: "reports", label: "Reports", icon: "file" },
      { id: "activity", label: "Activity Log", icon: "clock" },
      { id: "settings", label: "Settings", icon: "settings" },
    ],
  },
] as const;

export const ORG_PANEL_LABELS: Record<string, string> = {
  overview: "Overview",
  users: "User Management",
  roles: "Roles & Permissions",
  billing: "Account & Billing",
  campaigns: "Campaigns & Scorecards",
  agents: "Agent Performance",
  alerts: "Alerts",
  reports: "Reports",
  activity: "Activity Log",
  settings: "Settings",
};

export const ORG_USAGE_CHART = {
  title: "Usage trend",
  subtitle: "Calls processed per day · last 14 days",
  days: [
    { label: "14d ago", value: 42 },
    { label: "", value: 55 },
    { label: "", value: 48 },
    { label: "", value: 62 },
    { label: "", value: 58 },
    { label: "", value: 71 },
    { label: "", value: 65 },
    { label: "", value: 78 },
    { label: "", value: 82 },
    { label: "", value: 76 },
    { label: "", value: 88 },
    { label: "", value: 91 },
    { label: "", value: 85 },
    { label: "Today", value: 94, highlight: true },
  ],
  maxValue: 100,
};

export const ORG_PLAN_LIMITS = {
  usagePct: 89,
  users: { used: 9, total: 12 },
  minutes: { used: 2670, total: 3000 },
};

export const ORG_TEAM_PERFORMANCE = [
  { initials: "NF", name: "Noor Fatima", role: "Agent", calls: 214, avgQa: 74, color: "#C4A574" },
  { initials: "AR", name: "Ali Raza", role: "QA Lead", calls: 198, avgQa: 88, color: "#8B9DC3" },
  { initials: "SK", name: "Sana Khalid", role: "QA Lead", calls: 181, avgQa: 91, color: "#7BA38F" },
  { initials: "BA", name: "Bilal Ahmed", role: "Agent", calls: 166, avgQa: 79, color: "#B8956A" },
  { initials: "HS", name: "Hira Shah", role: "QA Assistant", calls: 140, avgQa: 85, color: "#9CAF88" },
];

export const ORG_RECENT_ACTIVITY = [
  { severity: "low" as const, action: "Noor Fatima added as Agent", actor: "Jordan Maes", when: "10:02 AM" },
  { severity: "medium" as const, action: "Scorecard \"Debt Collection\" checkpoint updated", actor: "Sana Khalid", when: "Yesterday" },
  { severity: "low" as const, action: "Report generated — August compliance audit", actor: "Jordan Maes", when: "Yesterday" },
  { severity: "high" as const, action: "Call CL-4821 flagged — mandatory checkpoint failed", actor: "System", when: "2 days ago" },
  { severity: "low" as const, action: "Payment method updated", actor: "Jordan Maes", when: "3 days ago" },
];

export const ORG_PAYMENT_METHOD = {
  brand: "VISA",
  last4: "4242",
  expiry: "08/2029",
};

export const ORG_USERS: Array<{
  id: string;
  initials: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "invited";
  lastActive: string;
}> = [
  { id: "1", initials: "NF", name: "Noor Fatima", email: "noor@heliostravel.io", role: "Agent", status: "active" as const, lastActive: "2h ago" },
  { id: "2", initials: "SK", name: "Sana Khalid", email: "sana@heliostravel.io", role: "QA Lead", status: "active" as const, lastActive: "39m ago" },
];

export const ORG_TEAM_STATS = {
  used: 2,
  cap: 12,
  active: 2,
  invited: 0,
};

export const ORG_ROLES = [
  { id: "qalead", dot: "#1a1a1a", name: "QA Lead", members: 1, description: "Edits scorecards, sees all scores, resolves disputes." },
  { id: "agent", dot: "#ffd54f", name: "Agent", members: 1, description: "Analyzes calls in their own console. No admin access." },
];

export const ORG_PERMISSIONS = [
  { label: "Invite / remove users", admin: true, qalead: false, agent: false, assistant: false },
  { label: "Edit scorecards & checkpoints", admin: true, qalead: true, agent: false, assistant: false },
  { label: "View all agents' scores", admin: true, qalead: true, agent: false, assistant: true },
  { label: "Resolve calibration disputes", admin: true, qalead: true, agent: false, assistant: false },
  { label: "Manage roles & permissions", admin: true, qalead: false, agent: false, assistant: false },
  { label: "Request plan changes", admin: true, qalead: false, agent: false, assistant: false },
  { label: "Generate & export reports", admin: true, qalead: true, agent: false, assistant: true },
  { label: "Edit workspace settings", admin: true, qalead: false, agent: false, assistant: false },
];

export const ORG_INVOICES = [
  { id: "INV-0091", period: "Aug 2026", amount: "$100.00", status: "Unpaid" },
  { id: "INV-0090", period: "Jul 2026", amount: "$100.00", status: "Paid" },
  { id: "INV-0089", period: "Jun 2026", amount: "$100.00", status: "Paid" },
  { id: "INV-0088", period: "May 2026", amount: "$50.00", status: "Paid" },
];

export const ORG_CAMPAIGNS = [
  { id: "debt_collection", name: "Debt Collection" },
  { id: "health_insurance", name: "Health Insurance" },
  { id: "banking_finance", name: "Banking & Finance" },
  { id: "sales_marketing", name: "Sales & Marketing" },
];

export const ORG_CHECKPOINTS = [
  { id: "1", label: "Verified caller identity", threshold: 76, mandatory: true },
  { id: "2", label: "Disclosed mini-Miranda statement", threshold: 75, mandatory: true },
  { id: "3", label: "Confirmed debt amount and account", threshold: 86, mandatory: false },
  { id: "4", label: "No threatening language used", threshold: 76, mandatory: false },
];

export const ORG_AGENT_PERFORMANCE = [
  { id: "sk", initials: "SK", name: "Sana Khalid", role: "QA Lead", calls: 181, avgQa: 91, trend: "+4", trendUp: true, mandatoryPass: 98 },
  { id: "ar", initials: "AR", name: "Ali Raza", role: "QA Lead", calls: 198, avgQa: 88, trend: "+2", trendUp: true, mandatoryPass: 95 },
  { id: "hs", initials: "HS", name: "Hira Shah", role: "QA Assistant", calls: 140, avgQa: 85, trend: "+1", trendUp: true, mandatoryPass: 93 },
  { id: "ba", initials: "BA", name: "Bilal Ahmed", role: "Agent", calls: 166, avgQa: 79, trend: "-3", trendUp: false, mandatoryPass: 82 },
  { id: "nf", initials: "NF", name: "Noor Fatima", role: "Agent", calls: 214, avgQa: 74, trend: "-6", trendUp: false, mandatoryPass: 71 },
];

export const ORG_AGENT_DRAWER_CHECKPOINTS = [
  { label: "Opening & identification", pct: 88 },
  { label: "Compliance disclosure", pct: 74 },
  { label: "Resolution offered", pct: 91 },
  { label: "Mandatory checkpoints", pct: 71 },
];

export const ORG_AGENT_COACHING_NOTES = [
  { text: "Great de-escalation on a frustrated caller — keep leading with empathy before the compliance script.", meta: "Sana Khalid · 3 days ago" },
  { text: "Missed the identity-verification step twice this week — walk through the checklist together.", meta: "Sana Khalid · 1 week ago" },
];

export const ORG_DISPUTES = [
  { call: "CL-4790", agent: "Noor Fatima", checkpoint: "Disclosed mini-Miranda statement", original: 62, requested: 78, status: "Pending" },
  { call: "CL-4712", agent: "Bilal Ahmed", checkpoint: "Disclosed mini-Miranda statement", original: 78, requested: 85, status: "Pending" },
];

export const ORG_ALERTS = [
  { id: "1", severity: "high" as const, category: "mandatory", title: "Mandatory checkpoint failed — CL-4821", detail: "Agent Noor F. · \"Verified caller identity\" not confirmed", tag: "Mandatory fail", time: "2h", action: "Review call" },
  { id: "2", severity: "high" as const, category: "compliance", title: "Compliance risk flagged — CL-4803", detail: "Possible unauthorized disclosure of account balance", tag: "Compliance", time: "5h", action: "Review call" },
  { id: "3", severity: "medium" as const, category: "pattern", title: "Unusual scoring pattern — Noor Fatima", detail: "Avg QA dropped 12 points over the last 20 calls", tag: "Pattern", time: "1d", action: "View agent" },
  { id: "4", severity: "medium" as const, category: "mandatory", title: "Mandatory checkpoint failed — CL-4790", detail: "Agent Bilal A. · \"Disclosed debt amount\" missing", tag: "Mandatory fail", time: "1d", action: "Review call" },
];

export const ORG_ALERT_FILTERS = ["All", "Compliance", "Mandatory fail", "Unusual pattern"];

export const ORG_REPORTS_STATS = [
  { label: "Reports generated", value: "14" },
  { label: "Scheduled", value: "0" },
  { label: "Avg QA score", value: "81" },
  { label: "Calls covered", value: "1,842" },
];

export const ORG_REPORT_TYPES = [
  { id: "compliance", title: "Compliance audit", subtitle: "Mandatory checkpoints" },
  { id: "performance", title: "Team performance", subtitle: "QA scores by agent" },
  { id: "campaign", title: "Campaign summary", subtitle: "Volume and coverage" },
  { id: "dispute", title: "Disputes & red flags", subtitle: "Resolved and open cases" },
];

export const ORG_RECENT_REPORTS = [
  { name: "August compliance audit", meta: "RPT-118 · 3 Aug 2026", calls: "1842", qa: "81", format: "PDF" as const },
  { name: "Debt Collection · Q3 summary", meta: "RPT-117 · 28 Jul 2026", calls: "640", qa: "79", format: "CSV" as const },
  { name: "July compliance audit", meta: "RPT-104 · 2 Jul 2026", calls: "1690", qa: "78", format: "PDF" as const },
];

export const ORG_ACTIVITY_LOG = [
  { action: "Noor Fatima added as Agent", actor: "Jordan Maes", severity: "low" as const, when: "10:02 AM" },
  { action: "Scorecard \"Debt Collection\" checkpoint updated", actor: "Sana Khalid", severity: "medium" as const, when: "Yesterday" },
  { action: "Report generated — August compliance audit", actor: "Jordan Maes", severity: "low" as const, when: "Yesterday" },
  { action: "Call CL-4821 flagged — mandatory checkpoint failed", actor: "System", severity: "high" as const, when: "2 days ago" },
  { action: "Dispute resolved on call CL-4655 — overturned", actor: "Sana Khalid", severity: "medium" as const, when: "2 days ago" },
  { action: "Payment method updated", actor: "Jordan Maes", severity: "low" as const, when: "3 days ago" },
];

export const ORG_NOTIFICATION_PREFS = [
  { label: "Red-flag alerts", email: true, inApp: true },
  { label: "Calibration disputes", email: true, inApp: true },
  { label: "Billing & invoice reminders", email: true, inApp: false },
  { label: "Weekly digest", email: false, inApp: true },
];
