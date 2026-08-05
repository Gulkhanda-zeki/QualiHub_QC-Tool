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
  { run: "retention_save_4471.mp3", id: "A-4471", processed: "04 Aug · 19:12", audio: "04:22", compute: "8s", qa: 41 },
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
      "Customer called to cancel after a price increase. Agent offered a retention save with verified account details. Mandatory disclosure was read late; an unverified refund promise at 00:19 triggered a compliance flag.",
    riskFlags: [
      "Unverified refund promise at 00:19",
      "Disclosure read late (02:14)",
    ],
    checkpoints: [
      { name: "Opening script & identification", pass: true, evidence: "Evidence at 00:04 — script verbatim." },
      { name: "Mandatory disclosure read", pass: false, evidence: "Read at 02:14 — 90s after threshold." },
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
  { title: "Calibration log", desc: "Every dispute, decision and reviewer spread.", schedule: "Manual", recipient: "audit trail" },
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
  { label: "Score disputed", desc: "Agent challenges a QA score.", on: true },
  { label: "Batch finished", desc: "The processing queue finishes.", on: false },
  { label: "Minutes 80% used", desc: "Plan quota warning.", on: true },
  { label: "Weekly digest email", desc: "Monday 9am summary.", on: true },
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
  realtimeFactor: "8.08x",
};
