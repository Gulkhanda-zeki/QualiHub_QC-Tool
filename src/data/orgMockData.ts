export const ORG_PLATFORM = {
  workspace: "Helios Travel Group",
  workspaceCode: "HEL-0114",
  displayName: "Jordan Maes",
  email: "admin@heliostravel.io",
  role: "Workspace Admin",
  initials: "JM",
  plan: "Pro",
  planPrice: "$100/mo",
  planMinutes: 3000,
  planUsers: 12,
  planRenewal: "1 Sep 2026",
};

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
      { id: "calibration", label: "Calibration & Disputes", icon: "scales", badge: "3" },
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
  calibration: "Calibration & Disputes",
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
  { dot: "#12B76A", text: "Bilal Ahmed added as Agent", meta: "Jordan Maes · 10:32 AM" },
  { dot: "#F79009", text: "Scorecard \"Debt Collection\" checkpoint updated", meta: "Sana Khalid · Yesterday" },
  { dot: "#6366F1", text: "Report generated — August compliance audit", meta: "Jordan Maes · Yesterday" },
  { dot: "#F04438", text: "Call CL-4821 flagged — mandatory checkpoint failed", meta: "System · 2 days ago" },
  { dot: "#98A2B3", text: "Payment method updated", meta: "Jordan Maes · 3 days ago" },
];

export const ORG_USERS = [
  { id: "1", initials: "NF", name: "Noor Fatima", email: "noor@heliostravel.io", role: "Agent", added: "12 Jun 2026", roleStyle: "agent" },
  { id: "2", initials: "BA", name: "Bilal Ahmed", email: "bilal@heliostravel.io", role: "Agent", added: "12 Jun 2026", roleStyle: "agent" },
  { id: "3", initials: "SK", name: "Sana Khalid", email: "sana@heliostravel.io", role: "QA Lead", added: "3 Mar 2025", roleStyle: "qalead" },
  { id: "4", initials: "AR", name: "Ali Raza", email: "ali@heliostravel.io", role: "QA Lead", added: "14 Mar 2025", roleStyle: "qalead" },
  { id: "5", initials: "HS", name: "Hira Shah", email: "hira@heliostravel.io", role: "QA Assistant", added: "28 Apr 2026", roleStyle: "assistant" },
];

export const ORG_ROLES = [
  { id: "admin", dot: "#2563EB", name: "Admin", members: 1, description: "Full access — billing, roles, users and every score." },
  { id: "qalead", dot: "#12B76A", name: "QA Lead", members: 2, description: "Edits scorecards, sees all scores, resolves disputes." },
  { id: "agent", dot: "#667085", name: "Agent", members: 2, description: "Analyzes calls in their own console. No admin access." },
  { id: "assistant", dot: "#B8956A", name: "QA Assistant", members: 1, description: "Views team scores and generates reports, read-only." },
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

export const ORG_CAMPAIGNS = ["Debt Collection", "Health Insurance", "Banking & Finance", "Sales & Marketing"];

export const ORG_CHECKPOINTS = [
  { id: "1", title: "Verified caller identity", threshold: "Pass ≥ 76%", mandatory: true },
  { id: "2", title: "Disclosed mini-Miranda statement", threshold: "Pass ≥ 75%", mandatory: true },
  { id: "3", title: "Confirmed debt amount and account", threshold: "Pass ≥ 86%", mandatory: false },
  { id: "4", title: "No threatening language used", threshold: "Pass ≥ 76%", mandatory: false },
];

export const ORG_AGENT_PERFORMANCE = [
  { name: "Sana Khalid", role: "QA Lead", calls: 181, avgQa: 91, trend: "+4", trendUp: true, mandatory: "98%" },
  { name: "Ali Raza", role: "QA Lead", calls: 198, avgQa: 88, trend: "+2", trendUp: true, mandatory: "95%" },
  { name: "Hira Shah", role: "QA Assistant", calls: 140, avgQa: 85, trend: "+1", trendUp: true, mandatory: "93%" },
  { name: "Bilal Ahmed", role: "Agent", calls: 166, avgQa: 79, trend: "-3", trendUp: false, mandatory: "82%" },
  { name: "Noor Fatima", role: "Agent", calls: 214, avgQa: 74, trend: "-6", trendUp: false, mandatory: "71%" },
];

export const ORG_DISPUTES = [
  { call: "CL-4790", agent: "Noor Fatima", checkpoint: "Disclosed mini-Miranda statement", original: 62, requested: 78, status: "Pending" },
  { call: "CL-4712", agent: "Bilal Ahmed", checkpoint: "Disclosed mini-Miranda statement", original: 78, requested: 85, status: "Pending" },
];

export const ORG_ALERTS = [
  { id: "1", dot: "#F04438", title: "Mandatory checkpoint failed — CL-4821", sub: "Agent Noor F. · \"Verified caller identity\" not confirmed", tag: "Mandatory fail", tagStyle: "fail", time: "2h", action: "Review call" },
  { id: "2", dot: "#F04438", title: "Compliance risk flagged — CL-4803", sub: "Possible unauthorized disclosure of account balance", tag: "Compliance", tagStyle: "compliance", time: "5h", action: "Review call" },
  { id: "3", dot: "#F79009", title: "Unusual scoring pattern — Noor Fatima", sub: "Avg QA dropped 12 points over the last 20 calls", tag: "Pattern", tagStyle: "pattern", time: "1d", action: "View agent" },
  { id: "4", dot: "#F79009", title: "Mandatory checkpoint failed — CL-4790", sub: "Agent Bilal A. · \"Disclosed debt amount\" missing", tag: "Mandatory fail", tagStyle: "fail", time: "1d", action: "Review call" },
];

export const ORG_REPORTS_STATS = [
  { label: "Reports generated", value: "14" },
  { label: "Scheduled", value: "0" },
  { label: "Avg QA score", value: "81" },
  { label: "Calls covered", value: "1,842" },
];

export const ORG_RECENT_REPORTS = [
  { name: "August compliance audit", id: "RPT-118 · 3 Aug 2026", calls: "1842", qa: "81", format: "PDF" },
  { name: "Debt Collection · Q3 summary", id: "RPT-117 · 28 Jul 2026", calls: "640", qa: "79", format: "CSV" },
  { name: "July compliance audit", id: "RPT-104 · 2 Jul 2026", calls: "1690", qa: "78", format: "PDF" },
];

export const ORG_ACTIVITY_LOG = [
  { action: "Bilal Ahmed added as Agent", actor: "Jordan Maes", severity: "Low", time: "10:32 AM" },
  { action: "Scorecard \"Debt Collection\" checkpoint updated", actor: "Sana Khalid", severity: "Medium", time: "Yesterday" },
  { action: "Report generated — August compliance audit", actor: "Jordan Maes", severity: "Low", time: "Yesterday" },
  { action: "Call CL-4821 flagged — mandatory checkpoint failed", actor: "System", severity: "High", time: "2 days ago" },
  { action: "Dispute resolved on call CL-4655 — overturned", actor: "Sana Khalid", severity: "Medium", time: "2 days ago" },
  { action: "Payment method updated", actor: "Jordan Maes", severity: "Low", time: "3 days ago" },
];

export const ORG_NOTIFICATION_PREFS = [
  { label: "Red-flag alerts", email: true, inApp: true },
  { label: "Calibration disputes", email: true, inApp: true },
  { label: "Billing & invoice reminders", email: true, inApp: false },
  { label: "Weekly digest", email: false, inApp: true },
];
