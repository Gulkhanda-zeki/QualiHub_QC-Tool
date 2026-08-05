export const QA_PLATFORM = {
  workspace: "Northwind QA",
  seats: { used: 9, total: 12 },
  displayName: "Sana Rauf",
  email: "sana@northwindqa.com",
  initials: "SR",
  role: "QA Lead",
  minutesPct: 89,
  minutesLeft: 326,
  daysLeft: 4,
  dateRange: "Last 14 days",
};

export const QA_NAV_SECTIONS = [
  {
    label: "Work",
    items: [
      { id: "today", label: "Today", icon: "sun" },
      { id: "review-queue", label: "Review queue", icon: "clipboard", badge: "7" },
      { id: "analyze", label: "Analyze", icon: "chart" },
    ],
  },
  {
    label: "Quality",
    items: [
      { id: "calls", label: "Calls", icon: "phone", badge: "46" },
      { id: "agents", label: "Agents", icon: "users", badge: "8" },
      { id: "coaching", label: "Coaching", icon: "coach", badge: "2" },
    ],
  },
  {
    label: "Insights",
    items: [
      { id: "analytics", label: "Analytics", icon: "analytics" },
      { id: "reports", label: "Reports", icon: "file" },
    ],
  },
  {
    label: "Setup",
    items: [
      { id: "scorecard", label: "Scorecard", icon: "checklist" },
      { id: "campaigns", label: "Campaigns", icon: "folder" },
      { id: "settings", label: "Settings", icon: "settings" },
    ],
  },
] as const;

export const QA_PANEL_SECTIONS: Record<string, string> = {
  today: "Work",
  "review-queue": "Work",
  analyze: "Work",
  calls: "Quality",
  agents: "Quality",
  coaching: "Quality",
  analytics: "Insights",
  reports: "Insights",
  scorecard: "Setup",
  campaigns: "Setup",
  settings: "Setup",
};

export const QA_PANEL_LABELS: Record<string, string> = {
  today: "Today",
  "review-queue": "Review queue",
  analyze: "Analyze",
  calls: "Calls",
  agents: "Agents",
  coaching: "Coaching",
  analytics: "Analytics",
  reports: "Reports",
  scorecard: "Scorecard",
  campaigns: "Campaigns",
  settings: "Settings",
};

export const QA_TODAY_STATS = [
  { label: "Calls scored today", value: "38" },
  { label: "Team avg QA", value: "81" },
  { label: "Open flags", value: "11", accent: "text-[#F04438]" },
  { label: "In review queue", value: "7" },
];

export const QA_TODAY_QUEUE = [
  { id: "1", call: "retention_save_4471.mp3", agent: "Hira Khan", qa: 41, priority: "High", time: "12m ago" },
  { id: "2", call: "sales_demo_4468.mp3", agent: "Bilal Sheikh", qa: 58, priority: "High", time: "28m ago" },
  { id: "3", call: "collections_followup_4467.mp3", agent: "Danish Ali", qa: 53, priority: "Medium", time: "1h ago" },
];

export const QA_REVIEW_QUEUE = [
  { id: "rq1", call: "retention_save_4471.mp3", callId: "A-4471", agent: "Hira Khan", campaign: "CAMP-COLL-02", qa: 41, reason: "Mandatory disclosure missed", waiting: "12m" },
  { id: "rq2", call: "sales_demo_4468.mp3", callId: "A-4468", agent: "Bilal Sheikh", campaign: "CAMP-RET-Q3", qa: 58, reason: "Verification checkpoint failed", waiting: "28m" },
  { id: "rq3", call: "collections_followup_4467.mp3", callId: "A-4467", agent: "Danish Ali", campaign: "CAMP-SALES-AUG", qa: 53, reason: "Compliance flag raised", waiting: "1h" },
  { id: "rq4", call: "support_ticket_4463.mp3", callId: "A-4463", agent: "Danish Ali", campaign: "CAMP-COLL-02", qa: 52, reason: "Abusive language detected", waiting: "2h" },
  { id: "rq5", call: "inbound_call_4465.mp3", callId: "A-4465", agent: "Usman Tariq", campaign: "CAMP-SALES-AUG", qa: 61, reason: "Script adherence review", waiting: "3h" },
  { id: "rq6", call: "retention_save_4464.mp3", callId: "A-4464", agent: "Ayesha Malik", campaign: "CAMP-RET-Q3", qa: 64, reason: "Dispute pending", waiting: "4h" },
  { id: "rq7", call: "sales_demo_4462.mp3", callId: "A-4462", agent: "Faisal Iqbal", campaign: "CAMP-COLL-02", qa: 59, reason: "Mandatory checkpoint failed", waiting: "5h" },
];

export const QA_PROCESSING_QUEUE = [
  { file: "inbound_call_4472.mp3", status: "Done", detail: "QA 83", progress: 100, done: true },
  { file: "retention_save_4471.wav", status: "72%", detail: "", progress: 72, done: false },
  { file: "collections_followup_4470.mp3", status: "Queued", detail: "", progress: 0, done: false },
  { file: "sales_demo_4469.mp3", status: "Queued", detail: "", progress: 0, done: false },
];

export const QA_RUN_HISTORY = [
  { run: "retention_save_4472.mp3", id: "A-4472", processed: "05 Aug · 14:30", audio: "09:36", compute: "3.7s", qa: 86 },
  { run: "retention_save_4471.mp3", id: "A-4471", processed: "04 Aug · 10:12", audio: "04:22", compute: "8s", qa: 41 },
  { run: "inbound_call_4470.mp3", id: "A-4470", processed: "04 Aug · 10:58", audio: "10:15", compute: "9s", qa: 90 },
  { run: "sales_demo_4469.mp3", id: "A-4469", processed: "05 Aug · 11:53", audio: "07:15", compute: "3.7s", qa: 74 },
  { run: "sales_demo_4468.mp3", id: "A-4468", processed: "04 Aug · 9:38", audio: "05:21", compute: "7.1s", qa: 58 },
  { run: "collections_followup_4467.mp3", id: "A-4467", processed: "04 Aug · 11:21", audio: "14:35", compute: "7.1s", qa: 53 },
  { run: "support_ticket_4466.mp3", id: "A-4466", processed: "05 Aug · 13:11", audio: "14:54", compute: "9.7s", qa: 94 },
  { run: "sales_demo_4465.mp3", id: "A-4465", processed: "04 Aug · 14:31", audio: "16:21", compute: "3.1s", qa: 85 },
  { run: "collections_followup_4464.mp3", id: "A-4464", processed: "04 Aug · 9:17", audio: "13:54", compute: "11.1s", qa: 94 },
  { run: "support_ticket_4463.mp3", id: "A-4463", processed: "04 Aug · 13:50", audio: "02:34", compute: "3.7s", qa: 52 },
];

export const QA_CALLS = [
  { id: "c1", file: "retention_save_4472.mp3", meta: "A-4472 · 05 Aug · 14:38 · 09:36", review: "Reviewed by Sana R.", agent: "Unassigned", campaign: "CAMP-SALES-AUG", status: "Passed", qa: 86, comments: 0 },
  { id: "c2", file: "retention_save_4471.mp3", meta: "A-4471 · 04 Aug · 19:12 · 04:22", review: "Not reviewed", agent: "Hira Khan", campaign: "CAMP-COLL-02", status: "Flagged", qa: 41, comments: 3 },
  { id: "c3", file: "inbound_call_4470.mp3", meta: "A-4470 · 04 Aug · 10:58 · 10:15", review: "Reviewed by Sana R.", agent: "Hira Khan", campaign: "CAMP-SALES-AUG", status: "Passed", qa: 90, comments: 0 },
  { id: "c4", file: "sales_demo_4469.mp3", meta: "A-4469 · 05 Aug · 11:53 · 07:15", review: "Not reviewed", agent: "Usman Tariq", campaign: "CAMP-SALES-AUG", status: "Review", qa: 74, comments: 1 },
  { id: "c5", file: "sales_demo_4468.mp3", meta: "A-4468 · 04 Aug · 9:38 · 05:21", review: "Not reviewed", agent: "Bilal Sheikh", campaign: "CAMP-RET-Q3", status: "Flagged", qa: 58, comments: 2 },
  { id: "c6", file: "collections_followup_4467.mp3", meta: "A-4467 · 04 Aug · 11:21 · 14:35", review: "Not reviewed", agent: "Danish Ali", campaign: "CAMP-SALES-AUG", status: "Flagged", qa: 53, comments: 1 },
  { id: "c7", file: "support_ticket_4466.mp3", meta: "A-4466 · 05 Aug · 13:11 · 14:54", review: "Reviewed by Sana R.", agent: "Bilal Sheikh", campaign: "CAMP-COLL-02", status: "Passed", qa: 94, comments: 0 },
];

export type QACallDetail = {
  callId: string;
  sentiment: string;
  checkpointsSummary: string;
  processed: string;
  reviewNote: string;
  length: string;
  compute: string;
  aiSummary: string;
  riskFlags: string[];
  checkpoints: { name: string; pass: boolean; evidence: string }[];
  transcript: { speaker: "Agent" | "Customer"; time: string; text: string; highlight?: boolean }[];
};

export const QA_CALL_DETAILS: Record<string, QACallDetail> = {
  c1: {
    callId: "A-4472",
    sentiment: "positive sentiment",
    checkpointsSummary: "1 of 4 checkpoints passed",
    processed: "05 Aug · 14:30",
    reviewNote: "reviewed by Sana R.",
    length: "09:36",
    compute: "3.7s",
    aiSummary:
      "The customer raised a billing discrepancy. The agent showed empathy but did not read the mandatory disclosure until 02:14, and gave a payment promise without verification.",
    riskFlags: [
      "Unverified refund promise at 00:19",
      "Disclosure read late (02:14)",
    ],
    checkpoints: [
      { name: "Opening script & identification", pass: true, evidence: "Evidence at 00:04 — script verbatim." },
      { name: "Mandatory disclosure read", pass: false, evidence: "No disclosure found in the first 90 seconds of the call." },
      { name: "Customer verification", pass: false, evidence: "Partial verification at 01:02." },
      { name: "Next step confirmed & closing", pass: false, evidence: "Closing present but next step unclear." },
    ],
    transcript: [
      { speaker: "Agent", time: "00:04", text: "Thank you for calling Northwind, this is Hira. May I have your account number?" },
      { speaker: "Customer", time: "00:12", text: "Yes, it's 8842. I'm calling about the price increase on my plan." },
      { speaker: "Agent", time: "00:19", text: "I can process a full refund for this month while we review your options.", highlight: true },
      { speaker: "Customer", time: "00:28", text: "That would help. What do I need to do?" },
      { speaker: "Agent", time: "02:14", text: "Before we continue, let me read the mandatory disclosure..." },
    ],
  },
  c2: {
    callId: "A-4471",
    sentiment: "negative sentiment",
    checkpointsSummary: "1 of 4 checkpoints passed",
    processed: "04 Aug · 19:12",
    reviewNote: "not reviewed",
    length: "04:22",
    compute: "8.0s",
    aiSummary:
      "The customer raised a billing discrepancy. The agent showed empathy but did not read the mandatory disclosure until 02:14, and gave a payment promise without verification.",
    riskFlags: [
      "Unverified refund promise at 00:19",
      "Disclosure read late (02:14)",
    ],
    checkpoints: [
      { name: "Opening script & identification", pass: true, evidence: "Evidence at 00:04 — script verbatim." },
      { name: "Mandatory disclosure read", pass: false, evidence: "No disclosure found in the first 90 seconds of the call." },
      { name: "Customer verification", pass: false, evidence: "Partial verification at 01:02." },
      { name: "Next step confirmed & closing", pass: false, evidence: "Closing present but next step unclear." },
    ],
    transcript: [
      { speaker: "Agent", time: "00:04", text: "Thank you for calling Northwind, this is Hira. May I have your account number?" },
      { speaker: "Customer", time: "00:12", text: "Yes, it's 8842. I'm calling about the price increase on my plan." },
      { speaker: "Agent", time: "00:19", text: "I can process a full refund for this month while we review your options.", highlight: true },
      { speaker: "Customer", time: "00:28", text: "That would help. What do I need to do?" },
      { speaker: "Agent", time: "02:14", text: "Before we continue, let me read the mandatory disclosure..." },
    ],
  },
};

export function getQACallDetail(call: (typeof QA_CALLS)[number]): QACallDetail {
  if (QA_CALL_DETAILS[call.id]) return QA_CALL_DETAILS[call.id];

  const callId = call.meta.split(" · ")[0] ?? "A-0000";
  const parts = call.meta.split(" · ");
  const processed = parts.length >= 3 ? `${parts[1]} · ${parts[2]}` : call.meta;
  const length = parts[3] ?? "—";

  return {
    callId,
    sentiment: call.qa >= 85 ? "positive sentiment" : call.qa >= 70 ? "neutral sentiment" : "negative sentiment",
    checkpointsSummary: call.status === "Passed" ? "3 of 4 checkpoints passed" : "1 of 4 checkpoints passed",
    processed,
    reviewNote: call.review.toLowerCase(),
    length,
    compute: "6.2s",
    aiSummary: `Scored call for ${call.agent} on ${call.campaign}. QA ${call.qa} with status ${call.status}. Review transcript and checkpoint evidence before closing.`,
    riskFlags: call.status === "Flagged" ? ["Mandatory checkpoint failed", "Review recommended before audit export"] : [],
    checkpoints: [
      { name: "Opening script & identification", pass: call.qa >= 70, evidence: "Auto-scored from transcript." },
      { name: "Mandatory disclosure read", pass: call.qa >= 80, evidence: "Auto-scored from transcript." },
      { name: "Customer verification", pass: call.qa >= 75, evidence: "Auto-scored from transcript." },
      { name: "Next step confirmed & closing", pass: call.status === "Passed", evidence: "Auto-scored from transcript." },
    ],
    transcript: [
      { speaker: "Agent", time: "00:05", text: "Thank you for calling. How can I help you today?" },
      { speaker: "Customer", time: "00:14", text: "I have a question about my recent bill." },
      { speaker: "Agent", time: "00:22", text: "Let me pull up your account and verify a few details." },
    ],
  };
}

export type QAScoreDispute = {
  callId: string;
  currentScore: number;
  claimedScore: number;
  checkpoint: string;
  reasonBy: string;
  reasoning: string;
};

export function getQAScoreDispute(call: (typeof QA_CALLS)[number]): QAScoreDispute {
  const detail = getQACallDetail(call);
  const failedCheckpoint = detail.checkpoints.find((cp) => !cp.pass)?.name ?? "Mandatory disclosure read";

  if (call.id === "c1") {
    return {
      callId: detail.callId,
      currentScore: call.qa,
      claimedScore: 98,
      checkpoint: "Mandatory disclosure read",
      reasonBy: call.agent,
      reasoning: "Sent for review: the reviewer believes this checkpoint was marked wrongly.",
    };
  }

  return {
    callId: detail.callId,
    currentScore: call.qa,
    claimedScore: Math.min(100, call.qa + 12),
    checkpoint: failedCheckpoint,
    reasonBy: call.agent,
    reasoning: "Sent for review: the reviewer believes this checkpoint was marked wrongly.",
  };
}

export const QA_AGENTS = [
  { initials: "HK", name: "Hira Khan", dept: "Retention", score: 91, trend: "up", calls: 128, compliance: "97%", flags: "no flags", flagsOk: true },
  { initials: "SR", name: "Sana Rauf", dept: "Support", score: 88, trend: "up", calls: 61, compliance: "95%", flags: "1 flags", flagsOk: false },
  { initials: "BS", name: "Bilal Sheikh", dept: "Sales", score: 87, trend: "up", calls: 143, compliance: "94%", flags: "1 flags", flagsOk: false },
  { initials: "ZA", name: "Zoya Ahmed", dept: "Retention", score: 84, trend: "up", calls: 96, compliance: "91%", flags: "2 flags", flagsOk: false },
  { initials: "UT", name: "Usman Tariq", dept: "Collections", score: 78, trend: "down", calls: 112, compliance: "88%", flags: "3 flags", flagsOk: false },
  { initials: "AM", name: "Ayesha Malik", dept: "Sales", score: 74, trend: "down", calls: 87, compliance: "84%", flags: "5 flags", flagsOk: false },
  { initials: "FI", name: "Faisal Iqbal", dept: "Collections", score: 66, trend: "down", calls: 74, compliance: "79%", flags: "9 flags", flagsOk: false },
  { initials: "DA", name: "Danish Ali", dept: "Support", score: 58, trend: "down", calls: 53, compliance: "71%", flags: "12 flags", flagsOk: false, flagsBad: true },
];

export const QA_COACHING = [
  { initials: "DA", agent: "Danish Ali", focus: "De-escalation & tone", qa: 58, trend: "-14", due: "16 Aug", status: "Overdue" },
  { initials: "FI", agent: "Faisal Iqbal", focus: "Verification before promise", qa: 66, trend: "-6", due: "08 Aug", status: "Open" },
  { initials: "AM", agent: "Ayesha Malik", focus: "Objection handling script", qa: 74, trend: "-4", due: "11 Aug", status: "Open" },
  { initials: "UT", agent: "Usman Tariq", focus: "Disclosure accuracy", qa: 78, trend: "+3", due: "02 Aug", status: "Done" },
];

export const QA_SCORE_DISTRIBUTION = [
  { band: "<60", count: 6 },
  { band: "60s", count: 11 },
  { band: "70s", count: 23 },
  { band: "80s", count: 34 },
  { band: "90s+", count: 18 },
];

export const QA_COMPLIANCE_CHECKPOINTS = [
  { name: "Opening script & identification", label: "96% on target", pct: 96, ok: true },
  { name: "Mandatory disclosure read", label: "88% · 12 pts short", pct: 88, ok: false },
  { name: "Customer verification", label: "92% · 3 pts short", pct: 92, ok: false },
  { name: "Objection handled without pressure", label: "74% · 6 pts short", pct: 74, ok: false },
  { name: "Correct product terms quoted", label: "81% · 4 pts short", pct: 81, ok: false },
  { name: "Next step confirmed & closing", label: "98% on target", pct: 98, ok: true },
];

export const QA_ANALYTICS_CAMPAIGNS = [
  { name: "CAMP-RET-Q3", calls: "1842", avgQa: 86, compliance: "93%", flags: "14" },
  { name: "CAMP-SALES-AUG", calls: "1516", avgQa: 81, compliance: "88%", flags: "31" },
  { name: "CAMP-COLL-02", calls: "824", avgQa: 72, compliance: "79%", flags: "58" },
];

export const QA_REPORTS = [
  { title: "Weekly quality digest", desc: "QA average, flag mix and top movers, every Monday at 9am.", schedule: "Weekly · Mon 09:00", recipient: "ops@northwind.io" },
  { title: "Compliance evidence pack", desc: "Mandatory checkpoint results with transcript evidence per call.", schedule: "Monthly · 1st", recipient: "compliance@northwind.io" },
  { title: "Agent scorecards", desc: "Per-agent scorecard PDF for one-on-ones.", schedule: "Manual", recipient: "team leads" },
];

export const QA_SCORECARD = [
  { tag: "Mandatory", name: "Opening script & identification", threshold: "95%", pass: "96%", ok: true },
  { tag: "Mandatory", name: "Mandatory disclosure read", threshold: "100%", pass: "88%", ok: false },
  { tag: "Mandatory", name: "Customer verification", threshold: "95%", pass: "92%", ok: false },
  { tag: "Optional", name: "Objection handled without pressure", threshold: "80%", pass: "74%", ok: false },
  { tag: "Optional", name: "Correct product terms quoted", threshold: "85%", pass: "81%", ok: false },
  { tag: "Optional", name: "Next step confirmed & closing", threshold: "85%", pass: "98%", ok: true },
];

export const QA_CAMPAIGNS = [
  { name: "CAMP-RET-Q3", status: "Active", team: "Retention team", calls: "1,842", checkpoints: 6 },
  { name: "CAMP-SALES-AUG", status: "Active", team: "Sales team", calls: "1,516", checkpoints: 5 },
  { name: "CAMP-COLL-02", status: "Paused", team: "Collections team", calls: "824", checkpoints: 7 },
];

export const QA_NOTIFICATION_PREFS = [
  { label: "Red flag raised", desc: "A mandatory checkpoint fails or abusive language is detected.", on: true },
  { label: "Batch finished", desc: "The processing queue finishes.", on: false },
  { label: "Minutes 80% used", desc: "Plan quota warning.", on: true },
];

export const QA_BOOK_SESSION = {
  agent: "Danish Ali",
  initials: "DA",
  dept: "Support",
  qa: 58,
  weakPoints: "Mandatory disclosure read · Customer verification · Objection handled without pressure · Correct product terms quoted",
  focus: "De-escalation & tone",
  date: "08 Aug 2026 · 15:00",
  notes: "Three sample calls are attached. Listen to the unverified promise at 00:19.",
};

export const QA_ANALYSIS_WIZARD_STEPS = [
  { step: 1, label: "Choose files" },
  { step: 2, label: "Assign agent" },
  { step: 3, label: "Select checks" },
  { step: 4, label: "Review & run" },
];

export const QA_PIPELINE_STAGES = [
  { name: "Voice activity detection", status: "done" as const },
  { name: "Transcription", status: "done" as const },
  { name: "Speaker diarization", status: "done" as const },
  { name: "Forensic scoring", status: "active" as const },
  { name: "Checkpoint compliance", status: "pending" as const },
];

export const QA_PIPELINE_STATS = {
  avgPerCall: "6.4s",
  realtimeFactor: "0.08x",
};

export const QA_FLAGS = [
  { label: "Missed disclosure", count: 38, color: "#FF5C5C" },
  { label: "Pressure / pushy tone", count: 26, color: "#ffd54f" },
  { label: "Unverified promise", count: 19, color: "#8A5A00" },
  { label: "Abusive language", count: 11, color: "#C4362F" },
  { label: "Wrong product terms", count: 9, color: "#4CC9A0" },
];

export const QA_SENTIMENT = { positive: 58, neutral: 27, negative: 15 };

export const QA_VOLUME_DATA = {
  volume: [41, 52, 47, 63, 58, 71, 66, 78, 72, 84, 79, 91, 86, 97],
  qaTrend: [79, 80, 78, 81, 80, 83, 81, 84, 83, 85, 84, 86, 85, 82],
  dayLabels: ["21 Jul", "25 Jul", "29 Jul", "01 Aug", "04 Aug"],
};

export const QA_TODAY_KPIS = [
  {
    label: "Awaiting review",
    value: "16",
    pill: "oldest 2 days",
    pillBg: "#FBE9E7",
    pillFg: "#C4362F",
    valueColor: "#C4362F",
    note: "4 red flags · 3 disputes · 9 low QA",
    icon: "alert" as const,
  },
  {
    label: "Analysed today",
    value: "128",
    pill: "+11%",
    pillBg: "#E3F8F0",
    pillFg: "#0E7A57",
    valueColor: "#1a1a1a",
    note: "4,182 total · avg 6.4s per call",
    icon: "check" as const,
  },
  {
    label: "Avg QA score",
    value: "82",
    pill: "−2",
    pillBg: "#FBE9E7",
    pillFg: "#C4362F",
    valueColor: "#1a1a1a",
    note: "3 checkpoints below threshold",
    icon: "chart" as const,
  },
  {
    label: "Compliance",
    value: "89%",
    pill: "target 95%",
    pillBg: "#FFF4DE",
    pillFg: "#8A5A00",
    valueColor: "#ffd54f",
    note: "disclosure pass-rate 88%",
    icon: "file" as const,
  },
];

export const QA_TEAM_AGENTS = [
  { id: "1", initials: "HK", name: "Hira Khan", team: "Retention", email: "hira@northwind.io", qa: 91, compliance: 97, flags: 0, calls: 128, trend: [86, 88, 87, 90, 89, 92, 91] },
  { id: "2", initials: "SR", name: "Sana Rauf", team: "Support", email: "sana@northwind.io", qa: 88, compliance: 95, flags: 1, calls: 61, trend: [84, 86, 85, 88, 87, 89, 88] },
  { id: "3", initials: "BS", name: "Bilal Sheikh", team: "Sales", email: "bilal@northwind.io", qa: 87, compliance: 94, flags: 1, calls: 143, trend: [90, 89, 88, 86, 87, 86, 87] },
  { id: "4", initials: "ZA", name: "Zoya Ahmed", team: "Retention", email: "zoya@northwind.io", qa: 84, compliance: 91, flags: 2, calls: 96, trend: [80, 82, 81, 84, 83, 85, 84] },
  { id: "5", initials: "UT", name: "Usman Tariq", team: "Collections", email: "usman@northwind.io", qa: 78, compliance: 88, flags: 3, calls: 112, trend: [82, 81, 80, 79, 78, 79, 78] },
  { id: "6", initials: "AM", name: "Ayesha Malik", team: "Sales", email: "ayesha@northwind.io", qa: 74, compliance: 84, flags: 5, calls: 87, trend: [78, 77, 76, 75, 74, 75, 74] },
  { id: "7", initials: "FI", name: "Faisal Iqbal", team: "Collections", email: "faisal@northwind.io", qa: 66, compliance: 79, flags: 9, calls: 74, trend: [72, 71, 69, 68, 67, 66, 66] },
  { id: "8", initials: "DA", name: "Danish Ali", team: "Support", email: "danish@northwind.io", qa: 58, compliance: 71, flags: 12, calls: 53, trend: [72, 70, 67, 64, 61, 59, 58] },
];

export const QA_CHECKPOINT_DEFS = [
  { label: "Opening script & identification", baseRate: 96, threshold: 95 },
  { label: "Mandatory disclosure read", baseRate: 88, threshold: 100 },
  { label: "Customer verification", baseRate: 92, threshold: 95 },
  { label: "Objection handled without pressure", baseRate: 74, threshold: 80 },
  { label: "Correct product terms quoted", baseRate: 81, threshold: 85 },
  { label: "Next step confirmed & closing", baseRate: 98, threshold: 85 },
];

export function getAgentCheckpointRates(agentQa: number) {
  return QA_CHECKPOINT_DEFS.map((c) => {
    const rate = Math.max(40, Math.min(100, Math.round(c.baseRate - (90 - agentQa) * 0.7)));
    const pass = rate >= c.threshold;
    const near = rate >= c.threshold - 10;
    return {
      label: c.label,
      rate,
      threshold: c.threshold,
      color: pass ? "#0E7A57" : near ? "#ffd54f" : "#C4362F",
    };
  });
}

export function getAgentCoachingNotes(agentQa: number) {
  return agentQa < 75
    ? "Pressure language is showing up in objection handling. Two role-play sessions assigned."
    : "Consistent performer. Include in the quarterly calibration sample.";
}

export function getAgentCallHistory(agentName: string) {
  const fromTable = QA_CALLS.filter((c) => c.agent === agentName).map((c) => ({
    id: c.id,
    callId: c.meta.split(" · ")[0] ?? c.meta,
    file: c.file,
    when: c.meta.split(" · ").slice(1, 3).join(" · ") || c.meta,
    qa: c.qa,
    status: c.status,
  }));

  const extras: Record<string, typeof fromTable> = {
    "Hira Khan": [
      { id: "hc1", callId: "A-4462", file: "retention_save_4462.mp3", when: "03 Aug · 16:44", qa: 93, status: "Passed" },
      { id: "hc2", callId: "A-4458", file: "inbound_call_4458.mp3", when: "02 Aug · 11:20", qa: 89, status: "Passed" },
      { id: "hc3", callId: "A-4451", file: "sales_demo_4451.mp3", when: "01 Aug · 9:05", qa: 88, status: "Passed" },
      { id: "hc4", callId: "A-4444", file: "retention_save_4444.mp3", when: "31 Jul · 14:18", qa: 92, status: "Passed" },
    ],
  };

  return [...fromTable, ...(extras[agentName] ?? [])].slice(0, 6);
}

export type QAQueueKind = "flag" | "dispute" | "coach" | "house" | "low";

export type QAQueueItem = {
  id: string;
  kind: QAQueueKind;
  tag: string;
  title: string;
  meta: string;
  cta: string;
  callId?: string;
  agentId?: string;
};

export const QA_QUEUE: QAQueueItem[] = [
  { id: "q1", kind: "flag", tag: "FLAG", title: "Mandatory disclosure missed", meta: "A-4471 · Hira K. · QA 41 · 2 days old", cta: "Review", callId: "c2" },
  { id: "q2", kind: "flag", tag: "FLAG", title: "Abusive language detected", meta: "A-4468 · Bilal S. · QA 58 · 1 day old", cta: "Review", callId: "c5" },
  { id: "q3", kind: "flag", tag: "FLAG", title: "Payment promise without verification", meta: "A-4463 · Faisal I. · QA 52 · 1 day old", cta: "Review", callId: "c7" },
  { id: "q4", kind: "flag", tag: "FLAG", title: "Threatening tone on collections call", meta: "A-4459 · Danish A. · QA 47 · 2 days old", cta: "Review", callId: "c6" },
  { id: "q5", kind: "dispute", tag: "DEC", title: "Score disputed by agent · 63 → 78", meta: "A-4455 · Zoya A. · Retention", cta: "Decide", callId: "c4" },
  { id: "q6", kind: "dispute", tag: "DEC", title: "Score disputed by agent · 71 → 82", meta: "A-4448 · Ayesha M. · Sales", cta: "Decide", callId: "c5" },
  { id: "q7", kind: "dispute", tag: "DEC", title: "Reviewers disagree on this score", meta: "A-4440 · Bilal S. · spread 19 pts", cta: "Decide", callId: "c5" },
  { id: "q8", kind: "coach", tag: "COACH", title: "Danish Ali · QA 14 points down in 7 days", meta: "Support · 12 flags · no session yet", cta: "Coach", agentId: "8" },
  { id: "q9", kind: "coach", tag: "COACH", title: "Faisal Iqbal · compliance 79% (below 85)", meta: "Collections · 9 flags", cta: "Coach", agentId: "7" },
  { id: "q10", kind: "low", tag: "LOW", title: "QA 41 — below the 70 review threshold", meta: "A-4471 · Hira Khan · 04 Aug · 19:12", cta: "Review", callId: "c2" },
  { id: "q11", kind: "low", tag: "LOW", title: "QA 58 — below the 70 review threshold", meta: "A-4468 · Bilal Sheikh · 04 Aug · 9:38", cta: "Review", callId: "c5" },
  { id: "q12", kind: "low", tag: "LOW", title: "QA 53 — below the 70 review threshold", meta: "A-4467 · Danish Ali · 04 Aug · 11:21", cta: "Review", callId: "c6" },
  { id: "q13", kind: "house", tag: "TODO", title: "No agent attributed", meta: "A-4472 · CAMP-SALES-AUG · QA 86", cta: "Assign", callId: "c1" },
  { id: "q14", kind: "house", tag: "TODO", title: "No agent attributed", meta: "A-4470 · CAMP-SALES-AUG · QA 90", cta: "Assign", callId: "c3" },
  { id: "q15", kind: "house", tag: "TODO", title: "17 calls unassigned — no agent attributed", meta: "Library · last 7 days", cta: "Assign" },
  { id: "q16", kind: "house", tag: "TODO", title: "9 calls below 70 still unreviewed", meta: "Review queue · oldest 3 days", cta: "Open" },
  { id: "q17", kind: "house", tag: "TODO", title: "Minutes 89% used · 326 left", meta: "Pro plan · resets in 4 days", cta: "Details" },
  { id: "q18", kind: "house", tag: "TODO", title: "No agent attributed", meta: "A-4453 · CAMP-SALES-AUG · QA 75", cta: "Assign" },
  { id: "q19", kind: "house", tag: "TODO", title: "No agent attributed", meta: "A-4441 · CAMP-RET-Q3 · QA 87", cta: "Assign" },
  { id: "q20", kind: "house", tag: "TODO", title: "No agent attributed", meta: "A-4438 · CAMP-SALES-AUG · QA 69", cta: "Assign" },
  { id: "q21", kind: "low", tag: "LOW", title: "QA 52 — below the 70 review threshold", meta: "A-4463 · Danish Ali · 04 Aug · 13:50", cta: "Review", callId: "c7" },
  { id: "q22", kind: "low", tag: "LOW", title: "QA 61 — below the 70 review threshold", meta: "A-4465 · Usman Tariq · 04 Aug · 14:31", cta: "Review" },
  { id: "q23", kind: "low", tag: "LOW", title: "QA 64 — below the 70 review threshold", meta: "A-4464 · Ayesha Malik · 04 Aug · 9:17", cta: "Review" },
  { id: "q24", kind: "low", tag: "LOW", title: "QA 59 — below the 70 review threshold", meta: "A-4462 · Faisal Iqbal · 04 Aug · 11:02", cta: "Review" },
  { id: "q25", kind: "low", tag: "LOW", title: "QA 55 — below the 70 review threshold", meta: "A-4456 · Danish Ali · 03 Aug · 16:44", cta: "Review" },
  { id: "q26", kind: "low", tag: "LOW", title: "QA 67 — below the 70 review threshold", meta: "A-4450 · Usman Tariq · 03 Aug · 10:20", cta: "Review" },
];

export const QA_QUEUE_STATS = {
  openFlags: 4,
  openDisputes: 3,
  queueTotal: 12,
  topItemTitle: "Mandatory disclosure missed",
};

export const QA_NOTIFICATIONS = [
  {
    id: "n1",
    title: "Mandatory disclosure missed on A-4471",
    meta: "12 min ago · Hira Khan",
    dot: "#FF5C5C",
    panel: "review-queue" as const,
  },
  {
    id: "n2",
    title: "Zoya Ahmed disputed her score on A-4455",
    meta: "1 hr ago · 63 → 78 requested",
    dot: "#ffd54f",
    panel: "review-queue" as const,
  },
  {
    id: "n3",
    title: "Batch of 24 calls finished processing",
    meta: "2 hrs ago · avg 6.1s per call",
    dot: "#4CC9A0",
    panel: "analyze" as const,
    analyzeTab: "Processing queue",
  },
  {
    id: "n4",
    title: "Minutes 89% used on the Pro plan",
    meta: "today · 326 minutes left",
    dot: "#ffd54f",
    panel: "settings" as const,
  },
];

export const QA_COMMAND_PALETTE = [
  { kind: "PAGE", title: "Review queue", meta: "Work · red flags & decisions", panel: "review-queue" },
  { kind: "PAGE", title: "New analysis wizard", meta: "Work · upload & score calls", panel: "analyze", analyzeTab: "New analysis" },
  { kind: "PAGE", title: "Score disputes", meta: "Review queue · 3 open decisions", panel: "review-queue" },
  { kind: "PAGE", title: "Scorecard checkpoints", meta: "Setup · 6 checkpoints", panel: "scorecard" },
  { kind: "AGENT", title: "Danish Ali", meta: "Support · QA 58 · 12 flags", panel: "agents", agentId: "8" },
  { kind: "AGENT", title: "Hira Khan", meta: "Retention · QA 91", panel: "agents", agentId: "1" },
  { kind: "CALL", title: "A-4471 · inbound_call_4471.mp3", meta: "Hira K. · QA 41 · flagged", panel: "calls" },
  { kind: "CALL", title: "A-4455 · retention_save_4455.mp3", meta: "Zoya A. · disputed 63 → 78", panel: "review-queue" },
] as const;

export const QA_QUEUE_HINTS: Record<string, string> = {
  flags: "A mandatory checkpoint failed or a risk signal was raised. Review these first.",
  coaching: "The trend is falling. Book a coaching session.",
  low: "Scored below 70 and still unreviewed.",
};

export const QA_FLAGS = [
  { label: "Missed disclosure", count: 38, color: "#FF5C5C" },
  { label: "Pressure / pushy tone", count: 26, color: "#ffd54f" },
  { label: "Unverified promise", count: 19, color: "#8A5A00" },
  { label: "Abusive language", count: 11, color: "#C4362F" },
  { label: "Wrong product terms", count: 9, color: "#4CC9A0" },
];

export const QA_SENTIMENT = { positive: 58, neutral: 27, negative: 15 };

export const QA_VOLUME_DATA = {
  volume: [41, 52, 47, 63, 58, 71, 66, 78, 72, 84, 79, 91, 86, 97],
  qaTrend: [79, 80, 78, 81, 80, 83, 81, 84, 83, 85, 84, 86, 85, 82],
  dayLabels: ["21 Jul", "25 Jul", "29 Jul", "01 Aug", "04 Aug"],
};

export const QA_TODAY_KPIS = [
  {
    label: "Awaiting review",
    value: "16",
    pill: "oldest 2 days",
    pillBg: "#FBE9E7",
    pillFg: "#C4362F",
    valueColor: "#C4362F",
    note: "4 red flags · 3 disputes · 9 low QA",
    icon: "alert" as const,
  },
  {
    label: "Analysed today",
    value: "128",
    pill: "+11%",
    pillBg: "#E3F8F0",
    pillFg: "#0E7A57",
    valueColor: "#1a1a1a",
    note: "4,182 total · avg 6.4s per call",
    icon: "check" as const,
  },
  {
    label: "Avg QA score",
    value: "82",
    pill: "−2",
    pillBg: "#FBE9E7",
    pillFg: "#C4362F",
    valueColor: "#1a1a1a",
    note: "3 checkpoints below threshold",
    icon: "chart" as const,
  },
  {
    label: "Compliance",
    value: "89%",
    pill: "target 95%",
    pillBg: "#FFF4DE",
    pillFg: "#8A5A00",
    valueColor: "#ffd54f",
    note: "disclosure pass-rate 88%",
    icon: "file" as const,
  },
];

export const QA_CHECKPOINT_DEFS = [
  { label: "Opening script & identification", baseRate: 96, threshold: 95 },
  { label: "Mandatory disclosure read", baseRate: 88, threshold: 100 },
  { label: "Customer verification", baseRate: 92, threshold: 95 },
  { label: "Objection handled without pressure", baseRate: 74, threshold: 80 },
  { label: "Correct product terms quoted", baseRate: 81, threshold: 85 },
  { label: "Next step confirmed & closing", baseRate: 98, threshold: 85 },
];

export function getAgentCheckpointRates(agentQa: number) {
  return QA_CHECKPOINT_DEFS.map((c) => {
    const rate = Math.max(40, Math.min(100, Math.round(c.baseRate - (90 - agentQa) * 0.7)));
    const pass = rate >= c.threshold;
    const near = rate >= c.threshold - 10;
    return {
      label: c.label,
      rate,
      threshold: c.threshold,
      color: pass ? "#027A48" : near ? "#B54708" : "#B42318",
    };
  });
}

export function getAgentCoachingNotes(agentQa: number) {
  return agentQa < 75
    ? "Pressure language is showing up in objection handling. Two role-play sessions assigned."
    : "Consistent performer. Include in the quarterly calibration sample.";
}

export function getAgentCallHistory(agentName: string) {
  const fromTable = QA_CALLS.filter((c) => c.agent === agentName).map((c) => ({
    id: c.id,
    callId: c.meta.split(" · ")[0] ?? c.meta,
    file: c.file,
    when: c.meta.split(" · ").slice(1, 3).join(" · ") || c.meta,
    qa: c.qa,
    status: c.status,
  }));

  const extras: Record<string, typeof fromTable> = {
    "Hira Khan": [
      { id: "hc1", callId: "A-4462", file: "retention_save_4462.mp3", when: "03 Aug · 16:44", qa: 93, status: "Passed" },
      { id: "hc2", callId: "A-4458", file: "inbound_call_4458.mp3", when: "02 Aug · 11:20", qa: 89, status: "Passed" },
      { id: "hc3", callId: "A-4451", file: "sales_demo_4451.mp3", when: "01 Aug · 9:05", qa: 88, status: "Passed" },
      { id: "hc4", callId: "A-4444", file: "retention_save_4444.mp3", when: "31 Jul · 14:18", qa: 92, status: "Passed" },
    ],
  };

  return [...fromTable, ...(extras[agentName] ?? [])].slice(0, 6);
}

export const QA_TEAM_AGENTS = [
  { id: "1", initials: "HK", name: "Hira Khan", team: "Retention", email: "hira@northwind.io", qa: 91, compliance: 97, flags: 0, calls: 128, trend: [86, 88, 87, 90, 89, 92, 91] },
  { id: "2", initials: "SR", name: "Sana Rauf", team: "Support", email: "sana@northwind.io", qa: 88, compliance: 95, flags: 1, calls: 61, trend: [84, 86, 85, 88, 87, 89, 88] },
  { id: "3", initials: "BS", name: "Bilal Sheikh", team: "Sales", email: "bilal@northwind.io", qa: 87, compliance: 94, flags: 1, calls: 143, trend: [90, 89, 88, 86, 87, 86, 87] },
  { id: "4", initials: "ZA", name: "Zoya Ahmed", team: "Retention", email: "zoya@northwind.io", qa: 84, compliance: 91, flags: 2, calls: 96, trend: [80, 82, 81, 84, 83, 85, 84] },
  { id: "5", initials: "UT", name: "Usman Tariq", team: "Collections", email: "usman@northwind.io", qa: 78, compliance: 88, flags: 3, calls: 112, trend: [82, 81, 80, 79, 78, 79, 78] },
  { id: "6", initials: "AM", name: "Ayesha Malik", team: "Sales", email: "ayesha@northwind.io", qa: 74, compliance: 84, flags: 5, calls: 87, trend: [78, 77, 76, 75, 74, 75, 74] },
  { id: "7", initials: "FI", name: "Faisal Iqbal", team: "Collections", email: "faisal@northwind.io", qa: 66, compliance: 79, flags: 9, calls: 74, trend: [72, 71, 69, 68, 67, 66, 66] },
  { id: "8", initials: "DA", name: "Danish Ali", team: "Support", email: "danish@northwind.io", qa: 58, compliance: 71, flags: 12, calls: 53, trend: [72, 70, 67, 64, 61, 59, 58] },
];

export const QA_QUEUE_STATS = {
  openFlags: 4,
  openDisputes: 3,
  queueTotal: 12,
  topItemTitle: "Mandatory disclosure missed",
};

export type ReviewQueueTab = "flags" | "coaching" | "low";

export type QAReviewTableRow = {
  id: string;
  call: string;
  callId: string;
  agent: string;
  campaign: string;
  qa: number | null;
  reason: string;
  waiting: string;
  primaryAction: string;
  secondaryAction?: string;
  summary?: boolean;
};

export const QA_QUEUE_HINTS: Record<ReviewQueueTab, string> = {
  flags: "A mandatory checkpoint failed or a risk signal was raised. Review these first.",
  coaching: "The trend is falling. Book a coaching session.",
  low: "Scored below 70 and still unreviewed.",
};

export const QA_REVIEW_QUEUE_BY_TAB: Record<ReviewQueueTab, QAReviewTableRow[]> = {
  flags: [
    { id: "f1", call: "retention_save_4471.mp3", callId: "A-4471", agent: "Hira Khan", campaign: "CAMP-COLL-02", qa: 41, reason: "Mandatory disclosure missed", waiting: "2 days", primaryAction: "Review", secondaryAction: "Assign" },
    { id: "f2", call: "sales_demo_4468.mp3", callId: "A-4468", agent: "Bilal Sheikh", campaign: "CAMP-RET-Q3", qa: 58, reason: "Abusive language detected", waiting: "1 day", primaryAction: "Review", secondaryAction: "Assign" },
    { id: "f3", call: "support_ticket_4463.mp3", callId: "A-4463", agent: "Faisal Iqbal", campaign: "CAMP-COLL-02", qa: 52, reason: "Payment promise without verification", waiting: "1 day", primaryAction: "Review", secondaryAction: "Assign" },
    { id: "f4", call: "collections_followup_4459.mp3", callId: "A-4459", agent: "Danish Ali", campaign: "CAMP-SALES-AUG", qa: 47, reason: "Threatening tone on collections call", waiting: "2 days", primaryAction: "Review", secondaryAction: "Assign" },
  ],
  coaching: [
    { id: "c1", call: "—", callId: "—", agent: "Danish Ali", campaign: "Support", qa: 58, reason: "QA 14 points down in 7 days · 12 flags · no session yet", waiting: "—", primaryAction: "Coach" },
    { id: "c2", call: "—", callId: "—", agent: "Faisal Iqbal", campaign: "Collections", qa: 66, reason: "Compliance 79% (below 85) · 9 flags", waiting: "—", primaryAction: "Coach" },
  ],
  low: [
    { id: "l1", call: "retention_save_4471.mp3", callId: "A-4471", agent: "Hira Khan", campaign: "CAMP-COLL-02", qa: 41, reason: "QA below 70 review threshold", waiting: "2 days", primaryAction: "Review", secondaryAction: "Open" },
    { id: "l2", call: "sales_demo_4468.mp3", callId: "A-4468", agent: "Bilal Sheikh", campaign: "CAMP-RET-Q3", qa: 58, reason: "QA below 70 review threshold", waiting: "1 day", primaryAction: "Review", secondaryAction: "Open" },
    { id: "l3", call: "collections_followup_4467.mp3", callId: "A-4467", agent: "Danish Ali", campaign: "CAMP-SALES-AUG", qa: 53, reason: "QA below 70 review threshold", waiting: "1 day", primaryAction: "Review", secondaryAction: "Open" },
    { id: "l4", call: "support_ticket_4463.mp3", callId: "A-4463", agent: "Danish Ali", campaign: "CAMP-COLL-02", qa: 52, reason: "QA below 70 review threshold", waiting: "2 hrs", primaryAction: "Review", secondaryAction: "Open" },
    { id: "l5", call: "inbound_call_4465.mp3", callId: "A-4465", agent: "Usman Tariq", campaign: "CAMP-SALES-AUG", qa: 61, reason: "QA below 70 review threshold", waiting: "3 hrs", primaryAction: "Review", secondaryAction: "Open" },
    { id: "l6", call: "retention_save_4464.mp3", callId: "A-4464", agent: "Ayesha Malik", campaign: "CAMP-RET-Q3", qa: 64, reason: "QA below 70 review threshold", waiting: "4 hrs", primaryAction: "Review", secondaryAction: "Open" },
    { id: "l7", call: "sales_demo_4462.mp3", callId: "A-4462", agent: "Faisal Iqbal", campaign: "CAMP-COLL-02", qa: 59, reason: "QA below 70 review threshold", waiting: "5 hrs", primaryAction: "Review", secondaryAction: "Open" },
    { id: "l8", call: "support_ticket_4456.mp3", callId: "A-4456", agent: "Danish Ali", campaign: "CAMP-COLL-02", qa: 55, reason: "QA below 70 review threshold", waiting: "6 hrs", primaryAction: "Review", secondaryAction: "Open" },
    { id: "l9", call: "collections_followup_4450.mp3", callId: "A-4450", agent: "Usman Tariq", campaign: "CAMP-COLL-02", qa: 67, reason: "QA below 70 review threshold", waiting: "8 hrs", primaryAction: "Review", secondaryAction: "Open" },
  ],
};

export const QA_REVIEW_QUEUE_TAB_COUNTS: Record<ReviewQueueTab, number> = {
  flags: QA_REVIEW_QUEUE_BY_TAB.flags.length,
  coaching: QA_REVIEW_QUEUE_BY_TAB.coaching.length,
  low: QA_REVIEW_QUEUE_BY_TAB.low.length,
};
