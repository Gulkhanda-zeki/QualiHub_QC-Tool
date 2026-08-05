import { useEffect, useState } from "react";
import { Plus, MessageSquare, MoreHorizontal, Check, X as XIcon, Upload } from "lucide-react";
import { CallDetailModal } from "./CallDetailModal";
import {
  QA_TODAY_STATS,
  QA_TODAY_QUEUE,
  QA_REVIEW_QUEUE,
  QA_PROCESSING_QUEUE,
  QA_RUN_HISTORY,
  QA_CALLS,
  QA_AGENTS,
  QA_COACHING,
  QA_SCORE_DISTRIBUTION,
  QA_COMPLIANCE_CHECKPOINTS,
  QA_ANALYTICS_CAMPAIGNS,
  QA_REPORTS,
  QA_SCORECARD,
  QA_CAMPAIGNS,
  QA_NOTIFICATION_PREFS,
  QA_BOOK_SESSION,
  QA_ANALYSIS_WIZARD_STEPS,
  QA_PIPELINE_STAGES,
  QA_PIPELINE_STATS,
} from "../data/qaleadMockData";
import {
  PANEL_SHELL,
  CARD,
  FIELD_CLASS,
  BTN_PRIMARY,
  BTN_MODAL_CANCEL,
  BTN_MODAL_PRIMARY,
  PanelHeader,
  StatusBadge,
  StatMetricCard,
  DashboardModal,
  FormLabel,
} from "../shared/dashboardUi";
import {
  TABLE_CARD,
  TABLE_CLASS,
  TH,
  TD,
  rowClass,
  TableToolbar,
  ActionButton,
  OutlinePillButton,
  useTableSelection,
} from "../tableUi";

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-[#12B76A]" : "bg-[#E4E7EC]"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`}
      />
    </span>
  );
}

function qaScoreClass(score: number) {
  if (score >= 85) return "text-[#027A48]";
  if (score >= 70) return "text-[#B54708]";
  return "text-[#B42318]";
}

function qaScoreBg(score: number) {
  if (score >= 85) return "bg-[#ECFDF3] text-[#027A48]";
  if (score >= 70) return "bg-[#FFFAEB] text-[#B54708]";
  return "bg-[#FEF3F2] text-[#B42318]";
}

function qaScoreRing(score: number) {
  if (score >= 85) return "border-[#A6F4C5] bg-[#ECFDF3] text-[#027A48]";
  if (score >= 70) return "border-[#FEDF89] bg-[#FFFAEB] text-[#B54708]";
  return "border-[#FECDCA] bg-[#FEF3F2] text-[#B42318]";
}

function AgentTrendChart({ trend }: { trend: "up" | "down" }) {
  const up = trend === "up";
  const stroke = up ? "#12B76A" : "#F04438";
  const fillId = up ? "agentTrendUp" : "agentTrendDown";
  const linePath = up
    ? "M0,36 C12,30 20,18 36,12 S60,8 80,14 S100,24 120,10"
    : "M0,12 C12,18 20,26 36,22 S60,18 80,28 S100,32 120,36";
  const areaPath = `${linePath} L120,40 L0,40 Z`;

  return (
    <svg viewBox="0 0 120 40" className="h-10 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.18" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${fillId})`} />
      <path d={linePath} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function AgentCard({
  agent,
}: {
  agent: (typeof QA_AGENTS)[number];
}) {
  const trendUp = agent.trend === "up";
  const flagsTone = agent.flagsBad
    ? "text-[#B42318] font-semibold"
    : agent.flagsOk
      ? "text-[#027A48] font-medium"
      : "text-crextio-gray";

  return (
    <button
      type="button"
      className={`${CARD} group flex h-full flex-col p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] md:p-5`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold ${qaScoreRing(agent.score)}`}
          >
            {agent.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-crextio-dark">{agent.name}</p>
            <span className="mt-1 inline-flex rounded-full bg-[#F7F8FA] px-2 py-0.5 text-[10px] font-semibold text-crextio-gray">
              {agent.dept}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-0.5">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold ${qaScoreRing(agent.score)}`}
          >
            {agent.score}
          </span>
          <span className={`text-[10px] font-semibold ${trendUp ? "text-[#027A48]" : "text-[#B42318]"}`}>
            {trendUp ? "↑ 7d" : "↓ 7d"}
          </span>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-black/5 bg-[#FAFBFC] px-3 py-2.5">
        <div className="mb-1 flex items-center justify-between text-[10px] font-medium">
          <span className="text-crextio-gray">QA trend</span>
          <span className={trendUp ? "text-[#027A48]" : "text-[#B42318]"}>
            {trendUp ? "Improving" : "Needs attention"}
          </span>
        </div>
        <AgentTrendChart trend={agent.trend as "up" | "down"} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-black/5 pt-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wide text-crextio-gray">Calls</p>
          <p className="mt-0.5 text-sm font-semibold text-crextio-dark">{agent.calls}</p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wide text-crextio-gray">Compliance</p>
          <p className="mt-0.5 text-sm font-semibold text-crextio-dark">{agent.compliance}</p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wide text-crextio-gray">Flags</p>
          <p className={`mt-0.5 text-xs leading-tight ${flagsTone}`}>{agent.flags}</p>
        </div>
      </div>
    </button>
  );
}

function TabPills({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div className="mb-5 inline-flex flex-wrap gap-1 rounded-full border border-black/8 bg-[#F7F8FA] p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
            active === tab
              ? "bg-white text-crextio-dark shadow-sm"
              : "text-crextio-gray hover:text-crextio-dark"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export type QANavigate = (id: string, options?: { analyzeTab?: string }) => void;

export function QATodayPanel({ onNavigate }: { onNavigate: QANavigate }) {
  return (
    <div className={PANEL_SHELL}>
      <PanelHeader
        title="Today"
        subtitle="Your daily pulse — queue, scores and agents that need attention."
        action={
          <>
            <OutlinePillButton>Export</OutlinePillButton>
            <button
              type="button"
              className={BTN_PRIMARY}
              onClick={() => onNavigate("analyze", { analyzeTab: "New analysis" })}
            >
              <Plus size={16} />
              New analysis
            </button>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {QA_TODAY_STATS.map((stat) => (
          <StatMetricCard key={stat.label} label={stat.label} value={stat.value} accent={stat.accent} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className={`${CARD} p-4 md:p-5`}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-crextio-dark">Review queue</p>
              <p className="mt-0.5 text-xs text-crextio-gray">Calls waiting for your review</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("review-queue")}
              className="text-xs font-semibold text-crextio-dark underline-offset-2 hover:underline"
            >
              View all
            </button>
          </div>
          <ul className="space-y-2">
            {QA_TODAY_QUEUE.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-black/5 bg-[#FAFBFC] px-3.5 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-mono text-xs font-medium text-crextio-dark">{item.call}</p>
                  <p className="mt-0.5 text-[11px] text-crextio-gray">
                    {item.agent} · {item.time}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <StatusBadge label={item.priority} />
                  <span className={`text-sm font-bold ${qaScoreClass(item.qa)}`}>{item.qa}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${CARD} p-4 md:p-5`}>
          <p className="text-sm font-semibold text-crextio-dark">Agent watchlist</p>
          <p className="mt-0.5 text-xs text-crextio-gray">Biggest movers in the last 7 days</p>
          <ul className="mt-4 space-y-3">
            {QA_AGENTS.filter((a) => a.score >= 84 || a.score <= 66).slice(0, 4).map((agent) => (
              <li key={agent.name} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F7F8FA] text-[10px] font-bold text-crextio-dark">
                  {agent.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-crextio-dark">{agent.name}</p>
                  <p className="text-[11px] text-crextio-gray">{agent.dept}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${qaScoreBg(agent.score)}`}>
                  {agent.score}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function QAReviewQueuePanel() {
  const { selectedId, setSelectedId } = useTableSelection();

  return (
    <div className={PANEL_SHELL}>
      <PanelHeader
        title="Review queue"
        subtitle="Calls flagged or disputed — open, assign and close reviews here."
      />

      <div className={TABLE_CARD}>
        <table className={TABLE_CLASS}>
          <thead>
            <tr>
              <th className={TH}>Call</th>
              <th className={TH}>Agent</th>
              <th className={TH}>Campaign</th>
              <th className={TH}>QA</th>
              <th className={TH}>Reason</th>
              <th className={TH}>Waiting</th>
              <th className={TH}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {QA_REVIEW_QUEUE.map((row) => (
              <tr
                key={row.id}
                className={rowClass(selectedId === row.id)}
                onClick={() => setSelectedId(row.id)}
              >
                <td className={TD}>
                  <p className="font-mono text-xs font-medium text-crextio-dark">{row.call}</p>
                  <p className="mt-0.5 text-[11px] text-crextio-gray">{row.callId}</p>
                </td>
                <td className={` text-sm text-crextio-dark`}>{row.agent}</td>
                <td className={TD}>
                  <span className="rounded-md bg-[#F7F8FA] px-2 py-0.5 text-[10px] font-semibold text-crextio-gray">
                    {row.campaign}
                  </span>
                </td>
                <td className={TD}>
                  <span className={`text-sm font-bold ${qaScoreClass(row.qa)}`}>{row.qa}</span>
                </td>
                <td className={` max-w-[180px] text-sm text-crextio-gray`}>{row.reason}</td>
                <td className={` text-sm text-crextio-gray`}>{row.waiting}</td>
                <td className={TD}>
                  <div className="flex gap-2">
                    <ActionButton label="Open" selected />
                    <OutlinePillButton>Assign</OutlinePillButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PipelineStageIcon({ status }: { status: "done" | "active" | "pending" }) {
  if (status === "done") {
    return (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ECFDF3] text-[#12B76A]">
        <Check size={12} strokeWidth={2.5} />
      </span>
    );
  }
  if (status === "active") {
    return <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-crextio-yellow ring-4 ring-crextio-yellow/25" />;
  }
  return <span className="h-4 w-4 shrink-0 rounded-full border-2 border-[#D0D5DD]" />;
}

export function QAAnalyzePanel({ initialTab = "New analysis" }: { initialTab?: string }) {
  const [tab, setTab] = useState(initialTab);
  const [newAnalysisOpen, setNewAnalysisOpen] = useState(false);
  const [files, setFiles] = useState(["inbound_4471.mp3", "retention_4472.wav"]);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  return (
    <div className={PANEL_SHELL}>
      <PanelHeader
        title="Analyze"
        subtitle="Upload, processing queue and run history in one place."
        action={
          <button type="button" className={BTN_PRIMARY} onClick={() => setTab("New analysis")}>
            <Plus size={16} />
            New analysis
          </button>
        }
      />

      <TabPills
        tabs={["New analysis", "Processing queue", "Run history"]}
        active={tab}
        onChange={setTab}
      />

      {tab === "New analysis" && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px]">
          <div className={`${CARD} p-5 md:p-6`}>
            <div className="flex w-full flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-[#E8E2D9] bg-[#FAFBFC] px-6 py-14">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <Upload size={22} className="text-crextio-dark" strokeWidth={1.75} />
              </span>
              <p className="text-base font-semibold text-crextio-dark">Drop your audio files here</p>
              <p className="mt-1.5 text-center text-xs text-crextio-gray">
                MP3, WAV, FLAC, M4A · up to 500 MB · one file or many
              </p>
              <button type="button" className={`${BTN_PRIMARY} mt-6`} onClick={() => setNewAnalysisOpen(true)}>
                Start 4-step wizard
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {QA_ANALYSIS_WIZARD_STEPS.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-black/5 bg-[#F7F8FA] px-3 py-3.5"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-crextio-gray">
                    Step {item.step}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-crextio-dark">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${CARD} flex flex-col p-5 md:p-6`}>
            <p className="text-sm font-semibold text-crextio-dark">Pipeline stages</p>
            <p className="mt-0.5 text-xs text-crextio-gray">Every upload passes through these stages.</p>

            <ul className="mt-5 flex-1 space-y-3.5">
              {QA_PIPELINE_STAGES.map((stage) => (
                <li key={stage.name} className="flex items-center gap-3">
                  <PipelineStageIcon status={stage.status} />
                  <span
                    className={`text-sm ${
                      stage.status === "active"
                        ? "font-semibold text-crextio-dark"
                        : stage.status === "done"
                          ? "text-crextio-dark"
                          : "text-crextio-gray"
                    }`}
                  >
                    {stage.name}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-2xl border border-black/5 bg-[#FAFBFC] px-4 py-3.5">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs text-crextio-gray">Average per call</span>
                <span className="text-lg font-bold text-crextio-dark">{QA_PIPELINE_STATS.avgPerCall}</span>
              </div>
              <p className="mt-1 text-right text-[11px] text-crextio-gray">
                real-time factor {QA_PIPELINE_STATS.realtimeFactor}
              </p>
            </div>
          </div>
        </div>
      )}

      {tab === "Processing queue" && (
        <div className={`${CARD} p-4 md:p-5`}>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-crextio-dark">Processing now</p>
            <span className="rounded-full bg-crextio-yellow/40 px-3 py-1 text-[11px] font-semibold text-crextio-dark">
              1 RUNNING · 2 QUEUED
            </span>
          </div>
          <ul className="space-y-3">
            {QA_PROCESSING_QUEUE.map((item) => (
              <li key={item.file} className="flex items-center gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                  {item.done ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#12B76A] text-white">
                      <Check size={14} />
                    </span>
                  ) : item.progress > 0 ? (
                    <span className="h-3 w-3 rounded-full bg-crextio-yellow" />
                  ) : (
                    <span className="h-3 w-3 rounded-full border-2 border-[#D0D5DD]" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-xs font-medium text-crextio-dark">{item.file}</p>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#EEF0F3]">
                    <div
                      className={`h-full rounded-full ${item.done ? "bg-[#12B76A]" : "bg-crextio-yellow"}`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
                <span className="shrink-0 text-xs font-semibold text-crextio-gray">
                  {item.done ? `Done · ${item.detail}` : item.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === "Run history" && (
        <div className={TABLE_CARD}>
          <table className={TABLE_CLASS}>
            <thead>
              <tr>
                <th className={TH}>Run</th>
                <th className={TH}>Processed</th>
                <th className={TH}>Audio</th>
                <th className={TH}>Compute</th>
                <th className={TH}>Result</th>
              </tr>
            </thead>
            <tbody>
              {QA_RUN_HISTORY.map((row) => (
                <tr key={row.id} className="hover:bg-[#FAFBFC]">
                  <td className={TD}>
                    <p className="font-mono text-xs font-medium text-crextio-dark">{row.run}</p>
                    <p className="mt-0.5 text-[11px] text-crextio-gray">{row.id}</p>
                  </td>
                  <td className={`${TD} text-sm text-crextio-gray`}>{row.processed}</td>
                  <td className={`${TD} font-mono text-sm text-crextio-dark`}>{row.audio}</td>
                  <td className={`${TD} font-mono text-sm text-crextio-gray`}>{row.compute}</td>
                  <td className={TD}>
                    <span className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-bold ${qaScoreBg(row.qa)}`}>
                      QA {row.qa}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <DashboardModal
        open={newAnalysisOpen}
        onClose={() => setNewAnalysisOpen(false)}
        title="New analysis"
        maxWidth="560px"
        footer={
          <>
            <button type="button" className={BTN_MODAL_CANCEL} onClick={() => setNewAnalysisOpen(false)}>
              Back
            </button>
            <button type="button" className={BTN_MODAL_PRIMARY} onClick={() => setNewAnalysisOpen(false)}>
              Continue
            </button>
          </>
        }
      >
        <div className="mb-6 flex items-center justify-between gap-2">
          {["Files", "Attribution", "Checks", "Review"].map((step, i) => (
            <div key={step} className="flex flex-1 flex-col items-center gap-1">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  i === 0 ? "bg-crextio-dark text-white" : "bg-[#EEF0F3] text-crextio-gray"
                }`}
              >
                {i + 1}
              </span>
              <span className="text-[10px] font-medium text-crextio-gray">{step}</span>
            </div>
          ))}
        </div>
        <p className="text-sm font-semibold text-crextio-dark">Audio files</p>
        <p className="mt-1 text-xs text-crextio-gray">
          You can add more than one file. The queue processes them one after another.
        </p>
        <button
          type="button"
          className="mt-4 flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#E8E2D9] bg-[#FAFBFC] px-4 py-10 text-sm text-crextio-gray"
        >
          Click to add a file
          <span className="mt-1 text-[11px]">MP3 · WAV · FLAC · M4A</span>
        </button>
        <ul className="mt-3 space-y-2">
          {files.map((file) => (
            <li
              key={file}
              className="flex items-center justify-between rounded-xl border border-black/5 bg-[#F7F8FA] px-3.5 py-2.5"
            >
              <span className="font-mono text-xs text-crextio-dark">{file}</span>
              <button
                type="button"
                aria-label={`Remove ${file}`}
                onClick={() => setFiles((f) => f.filter((x) => x !== file))}
                className="text-crextio-gray hover:text-crextio-dark"
              >
                <XIcon size={14} />
              </button>
            </li>
          ))}
        </ul>
      </DashboardModal>
    </div>
  );
}

export function QACallsPanel() {
  const [filter, setFilter] = useState("All");
  const [openCallId, setOpenCallId] = useState<string | null>(null);
  const { selectedId, setSelectedId } = useTableSelection();
  const openCall = openCallId ? QA_CALLS.find((c) => c.id === openCallId) ?? null : null;

  return (
    <div className={PANEL_SHELL}>
      <PanelHeader
        title="Calls"
        subtitle="Every scored call — searchable, filterable and kept for audit."
        action={<OutlinePillButton>Export CSV</OutlinePillButton>}
      />

      <TableToolbar
        filters={["All", "Flagged", "Review", "Passed", "Unassigned"]}
        filterValue={filter}
        onFilterChange={setFilter}
        searchPlaceholder="Search by file, agent, campaign or call ID..."
      />

      <div className={`${TABLE_CARD} !px-5 !py-4 md:!py-5`}>
        <div className="overflow-x-auto">
          <table
            className={`${TABLE_CLASS} w-full min-w-[640px] table-fixed [&_td:first-child]:pl-0 [&_td:last-child]:pr-0 [&_th:first-child]:pl-0 [&_th:last-child]:pr-0`}
          >
            <colgroup>
              <col className="w-[32%]" />
              <col className="w-[14%]" />
              <col className="w-[16%]" />
              <col className="w-[12%]" />
              <col className="w-[8%]" />
              <col className="w-[18%]" />
            </colgroup>
            <thead>
              <tr>
                <th className={TH}>Call</th>
                <th className={TH}>Agent</th>
                <th className={TH}>Campaign</th>
                <th className={`${TH} text-center`}>Status</th>
                <th className={`${TH} text-center`}>QA</th>
                <th className={`${TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {QA_CALLS.map((row) => (
                <tr
                  key={row.id}
                  className={rowClass(selectedId === row.id)}
                  onClick={() => setSelectedId(row.id)}
                >
                  <td className={TD}>
                    <p className="truncate font-mono text-xs font-medium text-crextio-dark">{row.file}</p>
                    <p className="mt-0.5 truncate text-[11px] text-crextio-gray">{row.meta}</p>
                    <p className="mt-0.5 truncate text-[11px] text-crextio-gray">{row.review}</p>
                  </td>
                  <td className={`${TD} text-sm text-crextio-dark`}>{row.agent}</td>
                  <td className={TD}>
                    <span className="inline-block max-w-full truncate rounded-md bg-[#F7F8FA] px-2 py-0.5 text-[10px] font-semibold text-crextio-gray">
                      {row.campaign}
                    </span>
                  </td>
                  <td className={`${TD} text-center`}>
                    <StatusBadge label={row.status} />
                  </td>
                  <td className={`${TD} text-center`}>
                    <span className={`text-sm font-bold ${qaScoreClass(row.qa)}`}>{row.qa}</span>
                  </td>
                  <td className={TD}>
                    <div className="flex items-center justify-end gap-2">
                      {row.comments > 0 && (
                        <span className="flex items-center gap-1 text-[11px] text-crextio-gray">
                          <MessageSquare size={13} />
                          {row.comments}
                        </span>
                      )}
                      <ActionButton
                        label="Open"
                        onClick={() => setOpenCallId(row.id)}
                      />
                      <button type="button" className="rounded-full p-1.5 text-crextio-gray hover:bg-black/5">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CallDetailModal
        open={openCallId !== null}
        call={openCall}
        onClose={() => setOpenCallId(null)}
      />
    </div>
  );
}

export function QAAgentsPanel() {
  return (
    <div className={PANEL_SHELL}>
      <PanelHeader
        title="Agents"
        subtitle="Roster, scorecards and coaching, all inside one agent profile."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {QA_AGENTS.map((agent) => (
          <AgentCard key={agent.name} agent={agent} />
        ))}
      </div>
    </div>
  );
}

export function QACoachingPanel() {
  const [bookOpen, setBookOpen] = useState(false);
  const { selectedId, setSelectedId } = useTableSelection();

  return (
    <div className={PANEL_SHELL}>
      <PanelHeader
        title="Coaching"
        subtitle="A failing score is not just a report. Book a session here and track the follow-up."
        action={
          <button type="button" className={BTN_PRIMARY} onClick={() => setBookOpen(true)}>
            <Plus size={16} />
            New session
          </button>
        }
      />

      <div className={TABLE_CARD}>
        <table className={TABLE_CLASS}>
          <thead>
            <tr>
              <th className={TH}>Agent</th>
              <th className={TH}>Focus</th>
              <th className={TH}>QA</th>
              <th className={TH}>7D</th>
              <th className={TH}>Due</th>
              <th className={TH}>Status</th>
            </tr>
          </thead>
          <tbody>
            {QA_COACHING.map((row) => (
              <tr
                key={row.agent}
                className={rowClass(selectedId === row.agent)}
                onClick={() => setSelectedId(row.agent)}
              >
                <td className={TD}>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F8FA] text-[10px] font-bold">
                      {row.initials}
                    </div>
                    <span className="text-sm font-medium text-crextio-dark">{row.agent}</span>
                  </div>
                </td>
                <td className={` text-sm text-crextio-gray`}>{row.focus}</td>
                <td className={TD}>
                  <span className={`text-sm font-bold ${qaScoreClass(row.qa)}`}>{row.qa}</span>
                </td>
                <td className={TD}>
                  <span className={`text-sm font-semibold ${row.trend.startsWith("+") ? "text-[#027A48]" : "text-[#B42318]"}`}>
                    {row.trend}
                  </span>
                </td>
                <td className={` text-sm text-crextio-gray`}>{row.due}</td>
                <td className={TD}>
                  <StatusBadge label={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DashboardModal
        open={bookOpen}
        onClose={() => setBookOpen(false)}
        title={`Coach ${QA_BOOK_SESSION.agent}`}
        subtitle={`${QA_BOOK_SESSION.dept} · QA ${QA_BOOK_SESSION.qa}`}
        maxWidth="520px"
        footer={
          <>
            <button type="button" className={BTN_MODAL_CANCEL} onClick={() => setBookOpen(false)}>
              Cancel
            </button>
            <button type="button" className={BTN_MODAL_PRIMARY} onClick={() => setBookOpen(false)}>
              Book session
            </button>
          </>
        }
      >
        <div className="rounded-2xl border border-crextio-yellow/40 bg-crextio-yellow/15 px-4 py-3 text-sm text-[#8B6914]">
          <p className="font-semibold text-crextio-dark">Weakest checkpoints</p>
          <p className="mt-1 text-xs leading-relaxed">{QA_BOOK_SESSION.weakPoints}</p>
        </div>
        <div className="mt-5">
          <FormLabel>Focus</FormLabel>
          <input className={FIELD_CLASS} defaultValue={QA_BOOK_SESSION.focus} readOnly />
        </div>
        <div className="mt-4">
          <FormLabel>Session date</FormLabel>
          <input className={FIELD_CLASS} defaultValue={QA_BOOK_SESSION.date} readOnly />
        </div>
        <div className="mt-4">
          <FormLabel>Notes for the agent</FormLabel>
          <textarea
            className={`${FIELD_CLASS} min-h-[88px] resize-none`}
            defaultValue={QA_BOOK_SESSION.notes}
            readOnly
          />
        </div>
      </DashboardModal>
    </div>
  );
}

export function QAAnalyticsPanel() {
  const [tab, setTab] = useState("Quality");
  const maxBar = Math.max(...QA_SCORE_DISTRIBUTION.map((d) => d.count));

  return (
    <div className={PANEL_SHELL}>
      <PanelHeader
        title="Analytics"
        subtitle="Deeper analysis. No overlap with Today — this page is for diagnosis."
      />

      <TabPills tabs={["Quality", "Compliance", "Agents", "Campaigns"]} active={tab} onChange={setTab} />

      {tab === "Quality" && (
        <div className={`${CARD} p-4 md:p-5`}>
          <p className="text-sm font-semibold text-crextio-dark">QA score distribution</p>
          <p className="mt-0.5 text-xs text-crextio-gray">which score band calls fall into · Last 14 days</p>
          <div className="mt-6 flex items-end justify-between gap-3" style={{ height: 160 }}>
            {QA_SCORE_DISTRIBUTION.map((band) => {
              const h = Math.round((band.count / maxBar) * 130);
              return (
                <div key={band.band} className="flex flex-1 flex-col items-center justify-end gap-2">
                  <span className="text-xs font-bold text-crextio-dark">{band.count}</span>
                  <div
                    className="w-full max-w-[48px] rounded-t-lg bg-crextio-yellow"
                    style={{ height: `${Math.max(h, 12)}px` }}
                  />
                  <span className="text-[11px] font-medium text-crextio-gray">{band.band}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === "Compliance" && (
        <div className={`${CARD} p-4 md:p-5`}>
          <p className="text-sm font-semibold text-crextio-dark">Checkpoint pass-rate vs threshold</p>
          <ul className="mt-5 space-y-4">
            {QA_COMPLIANCE_CHECKPOINTS.map((cp) => (
              <li key={cp.name}>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="text-sm text-crextio-dark">{cp.name}</span>
                  <span className={`text-xs font-semibold ${cp.ok ? "text-[#027A48]" : "text-[#B42318]"}`}>
                    {cp.label}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#EEF0F3]">
                  <div
                    className={`h-full rounded-full ${cp.ok ? "bg-[#12B76A]" : "bg-[#F04438]"}`}
                    style={{ width: `${cp.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === "Agents" && (
        <div className={`${CARD} p-4 md:p-5`}>
          <p className="text-sm font-semibold text-crextio-dark">Agent comparison</p>
          <ul className="mt-5 space-y-3">
            {QA_AGENTS.map((agent) => (
              <li key={agent.name} className="flex items-center gap-3">
                <span className="w-24 shrink-0 truncate text-xs font-medium text-crextio-dark">{agent.name}</span>
                <div className="min-w-0 flex-1">
                  <div className="h-2 overflow-hidden rounded-full bg-[#EEF0F3]">
                    <div
                      className={`h-full rounded-full ${agent.score >= 85 ? "bg-[#12B76A]" : agent.score >= 70 ? "bg-crextio-yellow" : "bg-[#F04438]"}`}
                      style={{ width: `${agent.score}%` }}
                    />
                  </div>
                </div>
                <span className={`w-8 shrink-0 text-right text-xs font-bold ${qaScoreClass(agent.score)}`}>
                  {agent.score}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === "Campaigns" && (
        <div className={TABLE_CARD}>
          <table className={TABLE_CLASS}>
            <thead>
              <tr>
                <th className={TH}>Campaign</th>
                <th className={TH}>Calls</th>
                <th className={TH}>Avg QA</th>
                <th className={TH}>Compliance</th>
                <th className={TH}>Open flags</th>
              </tr>
            </thead>
            <tbody>
              {QA_ANALYTICS_CAMPAIGNS.map((row) => (
                <tr key={row.name} className="hover:bg-[#FAFBFC]">
                  <td className={` font-mono text-xs font-semibold text-crextio-dark`}>{row.name}</td>
                  <td className={` text-sm text-crextio-dark`}>{row.calls}</td>
                  <td className={TD}>
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${qaScoreBg(row.avgQa)}`}>
                      {row.avgQa}
                    </span>
                  </td>
                  <td className={` text-sm text-crextio-dark`}>{row.compliance}</td>
                  <td className={` text-sm font-semibold text-[#B42318]`}>{row.flags}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function QAReportsPanel() {
  return (
    <div className={PANEL_SHELL}>
      <PanelHeader
        title="Reports"
        subtitle="Four outputs that people actually use, each with its schedule."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {QA_REPORTS.map((report) => (
          <div key={report.title} className={`${CARD} flex flex-col p-5 md:p-6`}>
            <p className="text-base font-semibold text-crextio-dark">{report.title}</p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-crextio-gray">{report.desc}</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#F7F8FA] px-2.5 py-1 text-[10px] font-semibold text-crextio-gray">
                  {report.schedule}
                </span>
                <span className="text-[11px] text-crextio-gray">{report.recipient}</span>
              </div>
              <button type="button" className={BTN_PRIMARY}>
                Generate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function QAScorecardPanel() {
  const [newCheckpointOpen, setNewCheckpointOpen] = useState(false);

  return (
    <div className={PANEL_SHELL}>
      <PanelHeader
        title="Scorecard"
        subtitle="Define your checkpoints. A failed mandatory checkpoint raises a red flag automatically."
        action={
          <button type="button" className={BTN_PRIMARY} onClick={() => setNewCheckpointOpen(true)}>
            <Plus size={16} />
            Add checkpoint
          </button>
        }
      />

      <div className={`${CARD} divide-y divide-black/5 overflow-hidden`}>
        {QA_SCORECARD.map((row) => (
          <div key={row.name} className="flex flex-wrap items-center gap-3 px-4 py-4 md:px-5">
            <StatusBadge label={row.tag} />
            <span className="min-w-[200px] flex-1 text-sm font-medium text-crextio-dark">{row.name}</span>
            <span className="text-xs text-crextio-gray">threshold {row.threshold}</span>
            <span className={`text-sm font-bold ${row.ok ? "text-[#027A48]" : "text-[#B42318]"}`}>
              {row.pass}
            </span>
            <OutlinePillButton>Edit</OutlinePillButton>
          </div>
        ))}
      </div>

      <DashboardModal
        open={newCheckpointOpen}
        onClose={() => setNewCheckpointOpen(false)}
        title="New checkpoint"
        maxWidth="480px"
        footer={
          <>
            <button type="button" className={BTN_MODAL_CANCEL} onClick={() => setNewCheckpointOpen(false)}>
              Cancel
            </button>
            <button type="button" className={BTN_MODAL_PRIMARY} onClick={() => setNewCheckpointOpen(false)}>
              Save checkpoint
            </button>
          </>
        }
      >
        <div>
          <FormLabel>Checkpoint label</FormLabel>
          <input className={FIELD_CLASS} placeholder="e.g. Mandatory disclosure read" />
        </div>
        <div className="mt-4">
          <FormLabel>Pass threshold (%)</FormLabel>
          <input className={FIELD_CLASS} type="number" defaultValue={85} />
        </div>
        <div className="mt-5 flex items-center justify-between rounded-2xl border border-black/5 bg-[#FAFBFC] px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-crextio-dark">Mandatory</p>
            <p className="text-xs text-crextio-gray">Optional — affects the score only</p>
          </div>
          <Toggle on={false} />
        </div>
      </DashboardModal>
    </div>
  );
}

export function QACampaignsPanel() {
  return (
    <div className={PANEL_SHELL}>
      <PanelHeader
        title="Campaigns"
        subtitle="Each campaign has its own scorecard and checkpoint set."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {QA_CAMPAIGNS.map((camp) => (
          <div key={camp.name} className={`${CARD} p-5 md:p-6`}>
            <div className="mb-3 flex items-start justify-between gap-2">
              <p className="font-mono text-sm font-bold text-crextio-dark">{camp.name}</p>
              <StatusBadge label={camp.status} />
            </div>
            <p className="text-sm text-crextio-gray">{camp.team}</p>
            <p className="mt-3 text-xs text-crextio-gray">
              {camp.calls} calls · {camp.checkpoints} checkpoints
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function QASettingsPanel() {
  const [prefs, setPrefs] = useState(QA_NOTIFICATION_PREFS);

  return (
    <div className={PANEL_SHELL}>
      <PanelHeader title="Settings" subtitle="Notification preferences and review rules." />

      <div className={`${CARD} p-4 md:p-5`}>
        <p className="mb-4 text-sm font-semibold text-crextio-dark">Notify me when</p>
        <ul className="divide-y divide-black/5">
          {prefs.map((pref, i) => (
            <li key={pref.label} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-semibold text-crextio-dark">{pref.label}</p>
                <p className="mt-0.5 text-xs text-crextio-gray">{pref.desc}</p>
              </div>
              <button
                type="button"
                aria-pressed={pref.on}
                onClick={() =>
                  setPrefs((p) => p.map((x, j) => (j === i ? { ...x, on: !x.on } : x)))
                }
              >
                <Toggle on={pref.on} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
