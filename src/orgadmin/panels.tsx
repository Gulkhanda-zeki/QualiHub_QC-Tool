import { useState } from "react";
import { Plus, GripVertical, Sparkles, Lock } from "lucide-react";
import {
  ORG_PLATFORM,
  ORG_USAGE_CHART,
  ORG_PLAN_LIMITS,
  ORG_TEAM_PERFORMANCE,
  ORG_RECENT_ACTIVITY,
  ORG_USERS,
  ORG_ROLES,
  ORG_PERMISSIONS,
  ORG_INVOICES,
  ORG_CAMPAIGNS,
  ORG_CHECKPOINTS,
  ORG_AGENT_PERFORMANCE,
  ORG_DISPUTES,
  ORG_ALERTS,
  ORG_REPORTS_STATS,
  ORG_RECENT_REPORTS,
  ORG_ACTIVITY_LOG,
  ORG_NOTIFICATION_PREFS,
} from "../data/orgMockData";
import {
  PANEL_SHELL,
  CARD,
  CARD_DARK,
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
  DotPill,
  statusDotStyle,
  TableFilters,
  TableToolbar,
  ActionButton,
  OutlinePillButton,
  useTableSelection,
} from "../tableUi";

const ALERT_TAG_STYLE: Record<string, string> = {
  "Mandatory fail": "Request",
  Compliance: "Billing",
  Pattern: "Usage",
};

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

export function OrgOverviewPanel({ onNavigate }: { onNavigate: (id: string) => void }) {
  const chartHeight = 140;

  return (
    <div className={PANEL_SHELL}>
      <main className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className={`${CARD} p-4 md:p-5 lg:col-span-1`}>
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-crextio-dark">{ORG_USAGE_CHART.title}</p>
              <p className="mt-0.5 text-xs text-crextio-gray">{ORG_USAGE_CHART.subtitle}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D1FADF] px-2.5 py-1 text-[11px] font-semibold text-[#027A48]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#12B76A]" />
              Live
            </span>
          </div>
          <div className="flex items-end justify-between gap-1" style={{ height: chartHeight }}>
            {ORG_USAGE_CHART.days.map((day, i) => {
              const h = Math.round((day.value / ORG_USAGE_CHART.maxValue) * (chartHeight - 24));
              return (
                <div key={i} className="flex flex-1 flex-col items-center justify-end gap-1">
                  <div
                    className={`w-full max-w-[20px] rounded-t-md ${day.highlight ? "bg-crextio-dark" : "bg-crextio-yellow"}`}
                    style={{ height: `${Math.max(h, 8)}px` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex justify-between text-[10px] font-medium text-crextio-gray">
            <span>14d ago</span>
            <span>Today</span>
          </div>
        </div>

        <div className={`${CARD} p-4 md:p-5`}>
          <p className="text-sm font-semibold text-crextio-dark">Plan limits</p>
          <p className="mt-0.5 text-xs text-crextio-gray">This billing cycle</p>
          <div className="mt-4 flex items-center gap-6">
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#EEF0F3" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="#F04438"
                  strokeWidth="3"
                  strokeDasharray={`${ORG_PLAN_LIMITS.usagePct} ${100 - ORG_PLAN_LIMITS.usagePct}`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-xl font-bold text-crextio-dark">{ORG_PLAN_LIMITS.usagePct}%</span>
            </div>
            <div className="min-w-0 flex-1 space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-crextio-gray">Users</span>
                  <span className="font-semibold text-crextio-dark">
                    {ORG_PLAN_LIMITS.users.used} / {ORG_PLAN_LIMITS.users.total}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#EEF0F3]">
                  <div
                    className="h-full rounded-full bg-crextio-dark"
                    style={{ width: `${(ORG_PLAN_LIMITS.users.used / ORG_PLAN_LIMITS.users.total) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-crextio-gray">Minutes</span>
                  <span className="font-semibold text-crextio-dark">
                    {ORG_PLAN_LIMITS.minutes.used.toLocaleString()} / {ORG_PLAN_LIMITS.minutes.total.toLocaleString()}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#EEF0F3]">
                  <div
                    className="h-full rounded-full bg-[#F04438]"
                    style={{ width: `${(ORG_PLAN_LIMITS.minutes.used / ORG_PLAN_LIMITS.minutes.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("billing")}
            className="mt-4 w-full rounded-full border border-crextio-dark/10 bg-white/60 py-2.5 text-sm font-medium text-crextio-dark"
          >
            Manage plan
          </button>
        </div>

        <div className={`${CARD} p-4 md:p-5`}>
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-crextio-dark">Team performance</p>
              <p className="mt-0.5 text-xs text-crextio-gray">Top agents by calls this week</p>
            </div>
            <button type="button" onClick={() => onNavigate("agents")} className="text-[12px] font-semibold text-crextio-dark hover:underline">
              Agent Performance
            </button>
          </div>
          <ul className="space-y-3">
            {ORG_TEAM_PERFORMANCE.map((agent) => (
              <li key={agent.initials} className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                  style={{ background: agent.color }}
                >
                  {agent.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-crextio-dark">{agent.name}</p>
                  <p className="text-xs text-crextio-gray">{agent.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold tabular-nums text-crextio-dark">{agent.calls}</p>
                  <p className="text-[11px] text-crextio-gray">avg QA {agent.avgQa}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${CARD} p-4 md:p-5`}>
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-crextio-dark">Recent activity</p>
            </div>
            <button type="button" onClick={() => onNavigate("activity")} className="text-[12px] font-semibold text-crextio-dark hover:underline">
              Audit log
            </button>
          </div>
          <ul className="space-y-3">
            {ORG_RECENT_ACTIVITY.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: item.dot }} />
                <div className="min-w-0">
                  <p className="text-sm text-crextio-dark">{item.text}</p>
                  <p className="text-xs text-crextio-gray">{item.meta}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export function OrgUsersPanel() {
  const [addOpen, setAddOpen] = useState(false);
  const { selectedId, setSelectedId } = useTableSelection(ORG_USERS[0]?.id);

  return (
    <div className={PANEL_SHELL}>
      <PanelHeader
        title="User Management"
        subtitle="5 of 12 users on your Pro plan — members sign in to the project console to analyze calls."
        action={
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className={BTN_PRIMARY}
          >
            <Plus size={16} />
            Add user
          </button>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatMetricCard label="Users" value="5/12" />
        <StatMetricCard label="Remaining" value="7" accent="text-[#12B76A]" />
        <StatMetricCard label="Plan" value="" badge="Pro" />
        <StatMetricCard label="Console" value="Pro project" />
      </div>

      <div className={TABLE_CARD}>
        <div className="overflow-x-auto">
          <table className={`${TABLE_CLASS} min-w-[720px]`}>
            <thead>
              <tr>
                <th className={TH}>Member</th>
                <th className={TH}>Role</th>
                <th className={TH}>Added</th>
                <th className={TH}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ORG_USERS.map((user) => {
                const isSelected = selectedId === user.id;
                return (
                <tr key={user.id} onClick={() => setSelectedId(user.id)} className={rowClass(isSelected)}>
                  <td className={TD}>
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5E6D3] text-[11px] font-bold text-crextio-dark">
                        {user.initials}
                      </span>
                      <div>
                        <p className="text-[13px] font-semibold text-crextio-dark">{user.name}</p>
                        <p className="text-[11px] text-[#9CA3AF]">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className={TD}>
                    <StatusBadge label={user.role} />
                  </td>
                  <td className={`${TD} text-[13px] text-[#9CA3AF]`}>{user.added}</td>
                  <td className={TD}>
                    <div className="flex gap-3">
                      <button type="button" className="text-[11px] font-semibold text-crextio-dark">Edit</button>
                      <button type="button" className="text-[11px] font-semibold text-[#B42318]">Remove</button>
                    </div>
                  </td>
                </tr>
              );})}
            </tbody>
          </table>
        </div>
      </div>

      <DashboardModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add team member"
        step="Step 1 of 3"
        footer={
          <>
            <button type="button" onClick={() => setAddOpen(false)} className={BTN_MODAL_CANCEL}>
              Cancel
            </button>
            <button type="button" onClick={() => setAddOpen(false)} className={BTN_MODAL_PRIMARY}>
              Continue
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <label className="block">
            <FormLabel>Name</FormLabel>
            <input defaultValue="Jordan Maes" className={FIELD_CLASS} />
          </label>
          <label className="block">
            <FormLabel>Email</FormLabel>
            <input defaultValue="jordan@yourteam.com" className={FIELD_CLASS} />
          </label>
        </div>
      </DashboardModal>
    </div>
  );
}

export function OrgRolesPanel() {
  const [createOpen, setCreateOpen] = useState(false);
  const [template, setTemplate] = useState("Agent");

  return (
    <div className={PANEL_SHELL}>
      <PanelHeader
        title="Roles & Permissions"
        subtitle={`Control what each role can see and do inside ${ORG_PLATFORM.workspace}'s console.`}
        action={
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className={BTN_PRIMARY}
          >
            <Plus size={16} />
            Create role
          </button>
        }
      />

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ORG_ROLES.map((role) => (
          <div key={role.id} className={`${CARD} p-5`}>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: role.dot }} />
              <span className="text-sm font-bold text-crextio-dark">{role.name}</span>
              <span className="text-xs text-crextio-gray">{role.members} member{role.members > 1 ? "s" : ""}</span>
            </div>
            <p className="mb-4 min-h-[40px] text-xs leading-relaxed text-crextio-gray">{role.description}</p>
            <button type="button" className="w-full rounded-full border border-black/10 py-2 text-xs font-semibold text-crextio-dark">
              Edit permissions
            </button>
          </div>
        ))}
      </div>

      <div className={TABLE_CARD}>
        <div className="overflow-x-auto">
          <table className={`${TABLE_CLASS} min-w-[640px]`}>
            <thead>
              <tr>
                <th className={TH}>Permission</th>
                <th className={`${TH} text-center`}>Admin</th>
                <th className={`${TH} text-center`}>QA Lead</th>
                <th className={`${TH} text-center`}>Agent</th>
                <th className={`${TH} text-center`}>QA Assistant</th>
              </tr>
            </thead>
            <tbody>
              {ORG_PERMISSIONS.map((row) => (
                <tr key={row.label} className="hover:bg-[#FAFBFC]">
                  <td className={`${TD} text-sm text-crextio-dark`}>{row.label}</td>
                  {[row.admin, row.qalead, row.agent, row.assistant].map((allowed, i) => (
                    <td key={i} className={`${TD} text-center`}>
                      {allowed ? (
                        <span className="inline-block h-2 w-2 rounded-full bg-crextio-dark" />
                      ) : (
                        <span className="text-crextio-gray">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DashboardModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create role"
        step="Step 1 of 3"
        footer={
          <>
            <button type="button" onClick={() => setCreateOpen(false)} className={BTN_MODAL_CANCEL}>
              Cancel
            </button>
            <button type="button" onClick={() => setCreateOpen(false)} className={BTN_MODAL_PRIMARY}>
              Continue
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <label className="block">
            <FormLabel>Role name</FormLabel>
            <input placeholder="e.g. Senior QA Analyst" className={FIELD_CLASS} />
          </label>
          <div>
            <p className="mb-2 text-xs font-medium text-crextio-gray">Start from a template</p>
            <div className="flex flex-wrap gap-2">
              {["Admin", "QA Lead", "Agent", "QA Assistant"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTemplate(t)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    template === t ? "bg-crextio-dark text-white" : "border border-black/10 text-crextio-dark"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
}

export function OrgBillingPanel() {
  const minutesLeft = ORG_PLATFORM.planMinutes - ORG_PLAN_LIMITS.minutes.used;
  const minutesPct = Math.round((ORG_PLAN_LIMITS.minutes.used / ORG_PLATFORM.planMinutes) * 100);

  return (
    <div className={PANEL_SHELL}>
      <PanelHeader
        title="Account & Billing"
        subtitle={`Plan, minutes, payment method and invoices for ${ORG_PLATFORM.workspace}.`}
      />

      <div className={`${CARD_DARK} mb-5 p-6 text-white`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-crextio-yellow text-lg font-bold text-crextio-dark">
              P
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">Pro plan</span>
                <StatusBadge label="Pro" />
              </div>
              <p className="mt-1 text-sm text-white/70">
                {ORG_PLATFORM.planMinutes.toLocaleString()} minutes / month · up to {ORG_PLATFORM.planUsers} users · renews {ORG_PLATFORM.planRenewal}
              </p>
            </div>
          </div>
          <button type="button" className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold">
            Request plan change
          </button>
        </div>
        <p className="mt-4 flex items-center gap-2 text-xs text-white/50">
          <Lock size={12} />
          Plan changes are reviewed and applied by your account manager — one request per month.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className={`${TABLE_CARD} lg:col-span-2`}>
          <p className="mb-4 text-sm font-semibold text-crextio-dark">Invoices</p>
          <div className="overflow-x-auto">
            <table className={TABLE_CLASS}>
              <thead>
                <tr>
                  <th className={TH}>Invoice</th>
                  <th className={TH}>Period</th>
                  <th className={TH}>Amount</th>
                  <th className={TH}>Status</th>
                  <th className={TH} />
                </tr>
              </thead>
              <tbody>
                {ORG_INVOICES.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[#FAFBFC]">
                    <td className={`${TD} text-sm font-semibold`}>{inv.id}</td>
                    <td className={`${TD} text-sm text-crextio-gray`}>{inv.period}</td>
                    <td className={`${TD} text-sm`}>{inv.amount}</td>
                    <td className={TD}>
                      <StatusBadge label={inv.status} />
                    </td>
                    <td className={TD}>
                      <button type="button" className="text-xs font-semibold text-crextio-dark">Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-5">
          <div className={`${CARD} p-4 md:p-5`}>
            <p className="text-sm font-semibold text-crextio-dark">Minutes used</p>
            <p className="mt-2 text-[1.75rem] font-light leading-none tracking-tight text-crextio-dark md:text-[2rem]">{minutesLeft} min left</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#EEF0F3]">
              <div className="h-full rounded-full bg-crextio-yellow" style={{ width: `${minutesPct}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-xs text-crextio-gray">
              <span>{ORG_PLAN_LIMITS.minutes.used.toLocaleString()} min used ({minutesPct}%)</span>
              <span>{ORG_PLATFORM.planMinutes.toLocaleString()} / mo</span>
            </div>
          </div>

          <div className={`${CARD} p-4 md:p-5`}>
            <p className="mb-3 text-sm font-semibold text-crextio-dark">Payment method</p>
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-crextio-dark px-2 py-1 text-[10px] font-bold text-white">VISA</span>
              <div>
                <p className="text-sm font-semibold text-crextio-dark">Visa •••• 4242</p>
                <p className="text-xs text-crextio-gray">Expires 08/2029</p>
              </div>
            </div>
            <button type="button" className="mt-4 w-full rounded-full border border-black/10 py-2 text-xs font-semibold">
              Update card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrgCampaignsPanel() {
  const [active, setActive] = useState("Debt Collection");
  const [newOpen, setNewOpen] = useState(false);

  return (
    <div className={PANEL_SHELL}>
      <PanelHeader
        title="Campaigns & Scorecards"
        subtitle="Create jobs and the checkpoints used to score every call in them."
        action={
          <button
            type="button"
            onClick={() => setNewOpen(true)}
            className={BTN_PRIMARY}
          >
            <Plus size={16} />
            New campaign
          </button>
        }
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {ORG_CAMPAIGNS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold ${
              active === c ? "bg-crextio-dark text-white" : "border border-black/8 bg-white text-crextio-dark"
            }`}
          >
            {active === c && <Sparkles size={12} />}
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          <p className="text-sm font-semibold text-crextio-dark">
            Checkpoints · {active} <span className="font-normal text-crextio-gray">4/8 · 2 mandatory</span>
          </p>
          {ORG_CHECKPOINTS.map((cp) => (
            <div key={cp.id} className={`${CARD} flex items-center gap-3 p-4`}>
              <GripVertical size={16} className="shrink-0 text-crextio-gray" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-crextio-dark">{cp.title}</p>
                <p className="text-xs text-crextio-gray">
                  {cp.threshold} {cp.mandatory ? "Mandatory" : "Optional"}
                </p>
              </div>
              {cp.mandatory && <StatusBadge label="Mandatory" />}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className={`${CARD} p-4 md:p-5`}>
            <p className="mb-3 text-sm font-semibold text-crextio-dark">Summary</p>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-crextio-gray">Checkpoints</dt><dd className="font-semibold">4</dd></div>
              <div className="flex justify-between"><dt className="text-crextio-gray">Mandatory</dt><dd className="font-semibold">2</dd></div>
              <div className="flex justify-between items-center"><dt className="text-crextio-gray">Status</dt><dd><StatusBadge label="Saved" /></dd></div>
            </dl>
          </div>
          <div className={`${CARD} p-4 md:p-5`}>
            <p className="mb-2 text-sm font-semibold text-crextio-dark">How scoring works</p>
            <p className="text-xs leading-relaxed text-crextio-gray">
              Each call is scored per checkpoint. A checkpoint passes when its detected score meets <strong>Pass ≥</strong>.{" "}
              <strong>Mandatory</strong> checkpoints fail the whole call if missed.
            </p>
          </div>
        </div>
      </div>

      <DashboardModal
        open={newOpen}
        onClose={() => setNewOpen(false)}
        title="New campaign"
        subtitle="Give it a name and start from a preset vertical or a blank scorecard."
        footer={
          <>
            <button type="button" onClick={() => setNewOpen(false)} className={BTN_MODAL_CANCEL}>
              Cancel
            </button>
            <button type="button" onClick={() => setNewOpen(false)} className={BTN_MODAL_PRIMARY}>
              Create campaign
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <label className="block">
            <FormLabel>Campaign name</FormLabel>
            <input placeholder="e.g. Renewals — Winter 2026" className={FIELD_CLASS} />
          </label>
          <div>
            <p className="mb-2 text-xs font-medium text-crextio-gray">Base template</p>
            <div className="flex flex-wrap gap-2">
              {[...ORG_CAMPAIGNS, "Blank scorecard"].map((t) => (
                <button key={t} type="button" className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold">
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
}

export function OrgAgentsPanel() {
  const { selectedId, setSelectedId } = useTableSelection(ORG_AGENT_PERFORMANCE[0]?.name);

  return (
    <div className={PANEL_SHELL}>
      <PanelHeader
        title="Agent Performance & Coaching"
        subtitle="QA trends per agent and the coaching that keeps them up."
      />

      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatMetricCard label="Team avg QA" value="81" />
        <StatMetricCard label="Below threshold" value="2" accent="text-[#F04438]" />
        <StatMetricCard label="Coaching notes" value="7" sub="this month" />
        <StatMetricCard label="Top performer" value="Sana Khalid" />
      </div>

      <div className={TABLE_CARD}>
        <div className="overflow-x-auto">
          <table className={`${TABLE_CLASS} min-w-[720px]`}>
            <thead>
              <tr>
                <th className={TH}>Agent</th>
                <th className={TH}>Calls</th>
                <th className={TH}>Avg QA</th>
                <th className={TH}>Trend</th>
                <th className={TH}>Mandatory pass</th>
                <th className={`${TH} w-10`} />
              </tr>
            </thead>
            <tbody>
              {ORG_AGENT_PERFORMANCE.map((row) => {
                const isSelected = selectedId === row.name;
                return (
                <tr key={row.name} onClick={() => setSelectedId(row.name)} className={rowClass(isSelected)}>
                  <td className={TD}>
                    <p className="text-[13px] font-semibold text-crextio-dark">{row.name}</p>
                    <p className="text-[11px] text-[#9CA3AF]">{row.role}</p>
                  </td>
                  <td className={`${TD} text-[13px] tabular-nums text-[#6B7280]`}>{row.calls}</td>
                  <td className={TD}>
                    <span
                      className={`inline-flex rounded-md px-2 py-0.5 text-[13px] font-semibold tabular-nums ${
                        row.avgQa >= 85 ? "text-[#027A48]" : row.avgQa >= 80 ? "text-[#B54708]" : "text-[#B42318]"
                      }`}
                    >
                      {row.avgQa}
                    </span>
                  </td>
                  <td className={TD}>
                    <span className={`text-[13px] font-semibold ${row.trendUp ? "text-[#12B76A]" : "text-[#F04438]"}`}>
                      {row.trend}
                    </span>
                  </td>
                  <td className={`${TD} text-[13px] tabular-nums text-[#6B7280]`}>{row.mandatory}</td>
                  <td className={TD}>⋯</td>
                </tr>
              );})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function OrgCalibrationPanel() {
  const [filter, setFilter] = useState("Pending (2)");
  const [resolveOpen, setResolveOpen] = useState(false);
  const [decision, setDecision] = useState<"uphold" | "overturn">("uphold");
  const { selectedId, setSelectedId } = useTableSelection(ORG_DISPUTES[0]?.call);

  return (
    <div className={PANEL_SHELL}>
      <PanelHeader
        title="Calibration & Dispute Review"
        subtitle="Agents can dispute a score; resolving keeps scoring consistent across your QA team."
      />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <TableFilters
          options={["Pending (2)", "All", "Upheld", "Overturned"]}
          value={filter}
          onChange={setFilter}
        />
        <OutlinePillButton>Filters</OutlinePillButton>
      </div>

      <div className={TABLE_CARD}>
        <div className="overflow-x-auto">
          <table className={`${TABLE_CLASS} min-w-[860px]`}>
            <thead>
              <tr>
                <th className={TH}>Call</th>
                <th className={TH}>Agent</th>
                <th className={TH}>Checkpoint disputed</th>
                <th className={TH}>Original</th>
                <th className={TH}>Requested</th>
                <th className={TH}>Status</th>
                <th className={TH}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ORG_DISPUTES.map((row) => {
                const isSelected = selectedId === row.call;
                return (
                <tr key={row.call} onClick={() => setSelectedId(row.call)} className={rowClass(isSelected)}>
                  <td className={`${TD} text-[13px] font-semibold text-crextio-dark`}>{row.call}</td>
                  <td className={`${TD} text-[13px] text-crextio-dark`}>{row.agent}</td>
                  <td className={`${TD} text-[12px] text-[#6B7280]`}>{row.checkpoint}</td>
                  <td className={`${TD} text-[13px] tabular-nums text-[#6B7280]`}>{row.original}</td>
                  <td className={`${TD} text-[13px] tabular-nums text-[#6B7280]`}>{row.requested}</td>
                  <td className={TD}><StatusBadge label={row.status} /></td>
                  <td className={TD}>
                    <ActionButton label="Resolve" selected={isSelected} onClick={() => setResolveOpen(true)} />
                  </td>
                </tr>
              );})}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-sm text-crextio-gray">
        Analyst agreement rate this month: <strong className="text-crextio-dark">92%</strong> — two analysts scoring the same call land within 5 points of each other.
      </p>

      <DashboardModal
        open={resolveOpen}
        onClose={() => setResolveOpen(false)}
        title="Resolve dispute —"
        footer={
          <>
            <button type="button" onClick={() => setResolveOpen(false)} className={BTN_MODAL_CANCEL}>
              Cancel
            </button>
            <button type="button" onClick={() => setResolveOpen(false)} className={BTN_MODAL_PRIMARY}>
              Submit decision
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setDecision("uphold")}
              className={`rounded-2xl border px-4 py-3.5 text-sm font-semibold ${
                decision === "uphold" ? "border-crextio-dark bg-crextio-dark/5" : "border-[#E8E2D9] bg-white"
              }`}
            >
              Uphold original score
            </button>
            <button
              type="button"
              onClick={() => setDecision("overturn")}
              className={`rounded-2xl border px-4 py-3.5 text-sm font-semibold ${
                decision === "overturn" ? "border-crextio-dark bg-crextio-dark/5" : "border-[#E8E2D9] bg-white"
              }`}
            >
              Overturn — apply new score
            </button>
          </div>
          <label className="block">
            <FormLabel>Note (shared with the agent)</FormLabel>
            <textarea placeholder="Explain the decision..." rows={3} className={FIELD_CLASS} />
          </label>
        </div>
      </DashboardModal>
    </div>
  );
}

export function OrgAlertsPanel() {
  const [filter, setFilter] = useState("All");
  const { selectedId, setSelectedId } = useTableSelection(ORG_ALERTS[0]?.id);

  return (
    <div className={PANEL_SHELL}>
      <PanelHeader
        title="Alerts"
        subtitle="Calls flagged for compliance or a failed mandatory checkpoint."
      />

      <div className={TABLE_CARD}>
        <TableToolbar
          filters={["All", "Compliance", "Mandatory fail", "Unusual pattern"]}
          filterValue={filter}
          onFilterChange={setFilter}
          searchPlaceholder="Search alerts..."
        />

        <div className="overflow-x-auto">
          <table className={`${TABLE_CLASS} min-w-[860px]`}>
            <thead>
              <tr>
                <th className={TH}>Type</th>
                <th className={TH}>Alert</th>
                <th className={TH}>Details</th>
                <th className={TH}>Opened</th>
                <th className={TH}>Action</th>
              </tr>
            </thead>
            <tbody>
              {ORG_ALERTS.map((alert) => {
                const tagKey = ALERT_TAG_STYLE[alert.tag] ?? alert.tag;
                const style = statusDotStyle(tagKey);
                const isSelected = selectedId === alert.id;
                return (
                  <tr key={alert.id} onClick={() => setSelectedId(alert.id)} className={rowClass(isSelected)}>
                    <td className={TD}>
                      <DotPill label={alert.tag} dotClass={style.dot} pillClass={style.pill} />
                    </td>
                    <td className={TD}>
                      <p className="text-[13px] font-semibold text-crextio-dark">{alert.title}</p>
                    </td>
                    <td className={`max-w-[320px] ${TD}`}>
                      <p className="truncate text-[12px] text-[#6B7280]">{alert.sub}</p>
                    </td>
                    <td className={`whitespace-nowrap ${TD} text-[12px] text-[#9CA3AF]`}>{alert.time}</td>
                    <td className={TD}>
                      <ActionButton label={alert.action} selected={isSelected} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function OrgReportsPanel() {
  const [period, setPeriod] = useState("Weekly");

  return (
    <div className={PANEL_SHELL}>
      <PanelHeader
        title="Reports"
        subtitle="Generate the audit reports a compliance officer can hand to a regulator."
      />

      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {ORG_REPORTS_STATS.map((s) => (
          <StatMetricCard key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className={`${CARD} p-4 md:p-5`}>
          <p className="mb-4 text-sm font-semibold text-crextio-dark">Generate a report</p>
          <label className="mb-4 block">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-crextio-gray">Job / scope</span>
            <select className={FIELD_CLASS}>
              <option>All jobs</option>
            </select>
          </label>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-crextio-gray">Period</p>
          <div className="mb-5 flex gap-1 rounded-full nav-pill-group p-1">
            {["Weekly", "Monthly", "Quarterly"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={`flex-1 rounded-full py-2 text-xs font-semibold transition-colors ${
                  period === p ? "bg-crextio-dark text-white shadow-sm" : "text-crextio-gray"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button type="button" className={`w-full ${BTN_MODAL_PRIMARY}`}>
            Generate report
          </button>
        </div>

        <div className={`${CARD} p-4 md:p-5`}>
          <p className="mb-4 text-sm font-semibold text-crextio-dark">Recent reports</p>
          <div className="overflow-x-auto">
            <table className={TABLE_CLASS}>
              <thead>
                <tr>
                  <th className={TH}>Report</th>
                  <th className={TH}>Calls</th>
                  <th className={TH}>QA</th>
                  <th className={TH}>Format</th>
                </tr>
              </thead>
              <tbody>
                {ORG_RECENT_REPORTS.map((r) => (
                  <tr key={r.id} className="hover:bg-[#FAFBFC]">
                    <td className={TD}>
                      <p className="text-sm font-semibold text-crextio-dark">{r.name}</p>
                      <p className="text-xs text-crextio-gray">{r.id}</p>
                    </td>
                    <td className={`${TD} text-sm tabular-nums`}>{r.calls}</td>
                    <td className={`${TD} text-sm tabular-nums`}>{r.qa}</td>
                    <td className={TD}><StatusBadge label={r.format} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrgActivityPanel() {
  const { selectedId, setSelectedId } = useTableSelection("0");

  return (
    <div className={PANEL_SHELL}>
      <PanelHeader title="Activity Log" subtitle={`Audit trail for ${ORG_PLATFORM.workspace}.`} action={
        <OutlinePillButton>Export</OutlinePillButton>
      } />

      <div className={TABLE_CARD}>
        <div className="overflow-x-auto">
          <table className={`${TABLE_CLASS} min-w-[720px]`}>
            <thead>
              <tr>
                <th className={TH}>Action</th>
                <th className={TH}>Actor</th>
                <th className={TH}>Severity</th>
                <th className={TH}>Time</th>
              </tr>
            </thead>
            <tbody>
              {ORG_ACTIVITY_LOG.map((row, i) => {
                const rowId = String(i);
                const isSelected = selectedId === rowId;
                return (
                <tr key={rowId} onClick={() => setSelectedId(rowId)} className={rowClass(isSelected)}>
                  <td className={`${TD} text-[13px] text-crextio-dark`}>{row.action}</td>
                  <td className={`${TD} text-[13px] text-[#6B7280]`}>{row.actor}</td>
                  <td className={TD}><StatusBadge label={row.severity} /></td>
                  <td className={`${TD} text-[12px] text-[#9CA3AF]`}>{row.time}</td>
                </tr>
              );})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function OrgSettingsPanel() {
  return (
    <div className={PANEL_SHELL}>
      <PanelHeader
        title="Workspace Settings"
        subtitle={`Organization details and notification preferences for ${ORG_PLATFORM.workspace}.`}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className={`${CARD} p-4 md:p-5`}>
          <p className="mb-4 text-sm font-semibold text-crextio-dark">Organization</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <FormLabel>Workspace name</FormLabel>
              <input defaultValue={ORG_PLATFORM.workspace} className={FIELD_CLASS} />
            </label>
            <label className="block">
              <FormLabel>Region</FormLabel>
              <input defaultValue="US-East" className={FIELD_CLASS} />
            </label>
          </div>
        </div>

        <div className={`${CARD} p-4 md:p-5`}>
          <p className="mb-1 text-sm font-semibold text-crextio-dark">Notification preferences</p>
          <p className="mb-4 text-xs text-crextio-gray">Choose how you&apos;re notified about things that need your attention.</p>
          <div className="overflow-x-auto">
            <table className={TABLE_CLASS}>
              <thead>
                <tr>
                  <th className={TH} />
                  <th className={`${TH} text-center`}>Email</th>
                  <th className={`${TH} text-center`}>In-app</th>
                </tr>
              </thead>
              <tbody>
                {ORG_NOTIFICATION_PREFS.map((row) => (
                  <tr key={row.label}>
                    <td className={`${TD} text-sm text-crextio-dark`}>{row.label}</td>
                    <td className={`${TD} text-center`}><Toggle on={row.email} /></td>
                    <td className={`${TD} text-center`}><Toggle on={row.inApp} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${CARD} p-5 lg:col-span-2`}>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-crextio-dark">Data & security</p>
            <span className="rounded-md bg-crextio-yellow/50 px-2 py-0.5 text-[10px] font-bold text-crextio-dark">Coming soon</span>
          </div>
          <p className="mt-2 text-sm text-crextio-gray">
            PII auto-redaction, required 2FA, and audit-log exports — applies to everyone in this workspace.
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button type="button" className={BTN_MODAL_PRIMARY}>
          Save settings
        </button>
      </div>
    </div>
  );
}
