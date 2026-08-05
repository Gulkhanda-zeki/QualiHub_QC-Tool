import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  Plus,
  Search,
  GripVertical,
  MoreHorizontal,
  X,
  Lock,
  Check,
  Users,
  CheckCircle2,
  Mail,
  ShieldCheck,
  User,
  Copy,
} from "lucide-react";
import {
  ORG_PLATFORM,
  ORG_TEAM_STATS,
  ORG_USERS,
  ORG_ROLES,
  ORG_PERMISSIONS,
  ORG_INVOICES,
  ORG_PAYMENT_METHOD,
  ORG_PLAN_LIMITS,
  ORG_CAMPAIGNS,
  ORG_CHECKPOINTS,
  ORG_AGENT_PERFORMANCE,
  ORG_AGENT_DRAWER_CHECKPOINTS,
  ORG_AGENT_COACHING_NOTES,
  ORG_DISPUTES,
  ORG_ALERTS,
  ORG_ALERT_FILTERS,
  ORG_REPORT_TYPES,
  ORG_RECENT_REPORTS,
  ORG_ACTIVITY_LOG,
  ORG_NOTIFICATION_PREFS,
} from "../data/orgMockData";

export type OANavigate = (id: string) => void;

/* ── Shared helpers ── */

function PageHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
  return (
    <div className="oa-page-header" style={{ marginBottom: 18 }}>
      <div>
        <h1 className="oa-page-title">{title}</h1>
        <p className="oa-page-subtitle">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function FilterPills({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`oa-filter-btn ${value === opt ? "active" : ""}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </>
  );
}

function qaPillClass(qa: number): string {
  if (qa >= 85) return "oa-qa-pill high";
  if (qa >= 75) return "oa-qa-pill mid";
  return "oa-qa-pill low";
}

function rolePillClass(role: string): string {
  if (role === "QA Lead") return "oa-role-pill qalead";
  if (role === "Agent") return "oa-role-pill agent";
  return "oa-role-pill assistant";
}

function rolePermValue(roleName: string, perm: (typeof ORG_PERMISSIONS)[number]): boolean {
  const key = roleName === "Admin" ? "admin" : roleName === "QA Lead" ? "qalead" : roleName === "Agent" ? "agent" : "assistant";
  return perm[key as keyof typeof perm] as boolean;
}

function severityChip(severity: string): string {
  if (severity === "high") return "oa-chip danger";
  if (severity === "medium") return "oa-chip warn";
  return "oa-chip success";
}

function alertTagClass(tag: string): string {
  const map: Record<string, string> = {
    "Mandatory fail": "oa-tag request",
    Compliance: "oa-tag request",
    Pattern: "oa-tag usage",
  };
  return map[tag] ?? "oa-tag neutral";
}

function OaToggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button type="button" className={`oa-toggle ${on ? "on" : ""}`} onClick={onToggle} aria-pressed={on}>
      <span className="oa-toggle-knob" />
    </button>
  );
}

function OaModal({
  open,
  onClose,
  title,
  step,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  step?: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="oa-modal-overlay">
      <button type="button" className="oa-modal-backdrop" aria-label="Close" onClick={onClose} />
      <div className="oa-modal-card" role="dialog" aria-modal="true">
        <div className="oa-modal-header">
          <h3 className="oa-modal-title">{title}</h3>
          {step ? <span className="oa-modal-step oa-mono">{step}</span> : null}
        </div>
        {children}
        <div className="oa-modal-footer-slot">{footer}</div>
      </div>
    </div>,
    document.body,
  );
}

function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="oa-step-dots">
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={`oa-step-dot ${i < step ? "done" : ""}`} />
      ))}
    </div>
  );
}

const INVITE_ROLE_OPTIONS = [
  {
    role: "QA Lead",
    summary: "Edits scorecards, sees all scores, resolves disputes.",
    icon: ShieldCheck,
    iconClass: "lead",
  },
  {
    role: "Agent",
    summary: "Analyzes calls in their own console. No admin access.",
    icon: User,
    iconClass: "agent",
  },
] as const;

function buildInviteLink(email: string): string {
  const slug =
    email
      .split("@")[0]
      .replace(/[^a-z0-9]/gi, "")
      .toLowerCase() || "xxxxxx";
  return `https://app.qctool.io/join/${ORG_PLATFORM.workspaceCode}?t=${slug}`;
}

function useToast() {
  const [toast, setToast] = useState("");
  const show = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 2600);
  };
  const node = (
    <div className={`oa-toast ${toast ? "" : "hidden"}`}>
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#ffd54f",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        <Check size={11} strokeWidth={2.2} color="#1a1a1a" />
      </span>
      {toast}
    </div>
  );
  return { show, node };
}

function KebabMenu({
  open,
  onToggle,
  items,
}: {
  open: boolean;
  onToggle: () => void;
  items: { label: string; onClick: () => void; danger?: boolean }[];
}) {
  return (
    <div className="oa-kebab-wrap">
      <button type="button" className="oa-kebab-btn" onClick={(e) => { e.stopPropagation(); onToggle(); }}>
        <MoreHorizontal size={15} />
      </button>
      {open ? (
        <div className="oa-kebab-menu">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`oa-kebab-item ${item.danger ? "danger" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                item.onClick();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

type AgentRow = (typeof ORG_AGENT_PERFORMANCE)[number];

function AgentDrawer({
  agent,
  onClose,
  onSaveNote,
}: {
  agent: AgentRow | null;
  onClose: () => void;
  onSaveNote: () => void;
}) {
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!agent) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [agent, onClose]);

  if (!agent) return null;

  const barColor = (pct: number) => (pct >= 85 ? "#0E7A57" : pct >= 75 ? "#ffd54f" : "#C4362F");

  return createPortal(
    <div className="oa-drawer-overlay">
      <button type="button" className="oa-drawer-backdrop" aria-label="Close" onClick={onClose} />
      <div className="oa-drawer-card">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
          <span className="oa-user-avatar" style={{ width: 44, height: 44, fontSize: 14.5 }}>
            {agent.initials}
          </span>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800 }}>{agent.name}</div>
            <div style={{ fontSize: 12.5, color: "var(--oa-muted)" }}>{agent.role}</div>
          </div>
          <button type="button" onClick={onClose} style={{ marginLeft: "auto", width: 34, height: 34, borderRadius: "50%", border: "none", background: "#fff9e5", cursor: "pointer", display: "grid", placeItems: "center" }}>
            <X size={14} strokeWidth={2} />
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 18 }}>
          {[
            { label: "Calls", value: agent.calls },
            { label: "Avg QA", value: agent.avgQa },
            { label: "Mandatory pass", value: `${agent.mandatoryPass}%` },
          ].map((s) => (
            <div key={s.label} style={{ background: "#fff9e5", borderRadius: 14, padding: 12 }}>
              <div style={{ fontSize: 11, color: "var(--oa-muted)" }}>{s.label}</div>
              <div style={{ fontSize: 19, fontWeight: 800, marginTop: 4 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 10 }}>Checkpoint breakdown</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 20 }}>
          {ORG_AGENT_DRAWER_CHECKPOINTS.map((c) => (
            <div key={c.label}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 4 }}>
                <span style={{ color: "#25384B" }}>{c.label}</span>
                <span className="oa-mono">{c.pct}%</span>
              </div>
              <div className="oa-progress-track">
                <div className="oa-progress-bar" style={{ width: `${c.pct}%`, background: barColor(c.pct) }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 10 }}>Coaching notes</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
          {ORG_AGENT_COACHING_NOTES.map((n, i) => (
            <div key={i} style={{ border: "1px solid var(--oa-border-warm)", borderRadius: 12, padding: 11 }}>
              <div style={{ fontSize: 13, color: "#25384B", lineHeight: 1.5 }}>{n.text}</div>
              <div className="oa-mono" style={{ fontSize: 11, color: "var(--oa-muted-light)", marginTop: 5 }}>
                {n.meta}
              </div>
            </div>
          ))}
        </div>

        <textarea
          className="oa-textarea"
          rows={2}
          placeholder="Add a coaching note…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ marginBottom: 8 }}
        />
        <button
          type="button"
          className="oa-btn-primary"
          style={{ width: "100%", justifyContent: "center" }}
          onClick={() => {
            if (note.trim()) {
              onSaveNote();
              setNote("");
            }
          }}
        >
          Save coaching note
        </button>
      </div>
    </div>,
    document.body,
  );
}

/* ── User Management ── */

export function UsersPanel() {
  const { show, node } = useToast();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteStep, setInviteStep] = useState(1);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Agent");
  const [inviteSendEmail, setInviteSendEmail] = useState(true);
  const [roleFilter, setRoleFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [kebabOpen, setKebabOpen] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);
  const [editUser, setEditUser] = useState<(typeof ORG_USERS)[number] | null>(null);

  const roleFilters = ["All", "QA Lead", "Agent"];
  const filtered = ORG_USERS.filter((m) => {
    const matchRole = roleFilter === "All" || m.role === roleFilter;
    const q = search.trim().toLowerCase();
    const matchSearch = !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q);
    return matchRole && matchSearch;
  });

  const closeInvite = () => {
    setInviteOpen(false);
    setInviteStep(1);
    setInviteName("");
    setInviteEmail("");
    setInviteRole("Agent");
    setInviteSendEmail(true);
  };

  const inviteLink = buildInviteLink(inviteEmail);

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      show("Invite link copied.");
    } catch {
      show("Could not copy link.");
    }
  };

  return (
    <div>
      {node}
      <PageHeader
        title="User Management"
        subtitle={`${ORG_TEAM_STATS.used} of ${ORG_TEAM_STATS.cap} users on your ${ORG_PLATFORM.plan} plan — members sign in to the project console to analyze calls.`}
        action={
          <button type="button" className="oa-btn-primary" onClick={() => setInviteOpen(true)}>
            <Plus size={15} strokeWidth={2} />
            Add user
          </button>
        }
      />

      <div className="oa-kpi-grid oa-users-kpis">
        {[
          { label: "Users", value: ORG_TEAM_STATS.used, suffix: `/${ORG_TEAM_STATS.cap}`, icon: Users },
          { label: "Active", value: ORG_TEAM_STATS.active, icon: CheckCircle2 },
          { label: "Invited", value: ORG_TEAM_STATS.invited, icon: Mail },
          { label: "Remaining seats", value: ORG_TEAM_STATS.cap - ORG_TEAM_STATS.used, icon: Plus },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="oa-card oa-kpi-card oa-users-kpi-card">
              <div className="oa-users-kpi-head">
                <span className="oa-kpi-icon">
                  <Icon size={16} strokeWidth={1.8} />
                </span>
                <span className="oa-kpi-label">{s.label}</span>
              </div>
              <div className="oa-kpi-value oa-users-kpi-value">
                {s.value}
                {s.suffix ? <span className="oa-users-kpi-suffix">{s.suffix}</span> : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className="oa-card oa-users-filter-card">
        <div className="oa-users-filter-row">
          <FilterPills options={roleFilters} value={roleFilter} onChange={setRoleFilter} />
          <div className="oa-search-wrap">
            <Search size={15} strokeWidth={1.8} />
            <input
              className="oa-search-input"
              placeholder="Search name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="oa-card oa-users-table-card">
        <div className="oa-table-wrap">
          <table className="oa-table" style={{ minWidth: 640 }}>
            <thead>
              <tr>
                <th>Member</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last active</th>
                <th style={{ textAlign: "right" }} />
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                      <span className="oa-avatar-warm" style={{ width: 32, height: 32 }}>{m.initials}</span>
                      <div>
                        <div style={{ fontWeight: 600 }}>{m.name}</div>
                        <div className="oa-mono" style={{ fontSize: 11, color: "var(--oa-muted-light)" }}>{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={rolePillClass(m.role)}>{m.role}</span></td>
                  <td>
                    <span className={`oa-status-pill ${m.status}`}>{m.status === "invited" ? "Invited" : "Active"}</span>
                  </td>
                  <td className="oa-mono" style={{ fontSize: 12, color: "var(--oa-muted)" }}>{m.lastActive}</td>
                  <td style={{ textAlign: "right" }}>
                    <KebabMenu
                      open={kebabOpen === m.id}
                      onToggle={() => setKebabOpen(kebabOpen === m.id ? null : m.id)}
                      items={[
                        ...(m.status === "invited"
                          ? [{ label: "Resend invite", onClick: () => { show(`Invite resent to ${m.email}.`); setKebabOpen(null); } }]
                          : []),
                        {
                          label: "Edit role",
                          onClick: () => {
                            setEditUser(m);
                            setEditOpen(true);
                            setKebabOpen(null);
                          },
                        },
                        {
                          label: "Remove",
                          danger: true,
                          onClick: () => {
                            setEditUser(m);
                            setRemoveOpen(true);
                            setKebabOpen(null);
                          },
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <OaModal
        open={inviteOpen}
        onClose={closeInvite}
        title="Add team member"
        step={`Step ${inviteStep} of 3`}
        footer={
          <div className="oa-modal-footer">
            <button
              type="button"
              className="oa-btn-modal-back"
              style={{ visibility: inviteStep > 1 ? "visible" : "hidden" }}
              onClick={() => setInviteStep((s) => Math.max(1, s - 1))}
            >
              Back
            </button>
            <div className="oa-modal-footer-actions">
              <button type="button" className="oa-btn-modal-cancel" onClick={closeInvite}>
                Cancel
              </button>
              <button
                type="button"
                className="oa-btn-modal-primary"
                onClick={() => {
                  if (inviteStep === 1 && (!inviteName.trim() || !inviteEmail.trim())) {
                    show("Enter a name and email.");
                    return;
                  }
                  if (inviteStep < 3) setInviteStep((s) => s + 1);
                  else {
                    show(`Invite sent to ${inviteName}.`);
                    closeInvite();
                  }
                }}
              >
                {inviteStep === 3 ? "Send invite" : "Continue"}
              </button>
            </div>
          </div>
        }
      >
        <StepDots step={inviteStep} total={3} />
        {inviteStep === 1 ? (
          <div className="oa-invite-fields">
            <label className="oa-invite-field">
              <span className="oa-field-label">Name</span>
              <input
                className="oa-input oa-input-lg"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                placeholder="Jordan Maes"
              />
            </label>
            <label className="oa-invite-field">
              <span className="oa-field-label">Email</span>
              <input
                className="oa-input oa-input-lg"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="jordan@yourteam.com"
              />
            </label>
          </div>
        ) : inviteStep === 2 ? (
          <div>
            <div className="oa-field-label" style={{ marginBottom: 8 }}>
              Choose a role
            </div>
            <div className="oa-invite-role-list">
              {INVITE_ROLE_OPTIONS.map(({ role, summary, icon: Icon, iconClass }) => (
                <button
                  key={role}
                  type="button"
                  className={`oa-invite-role-option ${inviteRole === role ? "selected" : ""}`}
                  onClick={() => setInviteRole(role)}
                >
                  <span className={`oa-invite-role-icon ${iconClass}`}>
                    <Icon size={16} strokeWidth={1.8} />
                  </span>
                  <div className="oa-invite-role-copy">
                    <div className="oa-invite-role-name">{role}</div>
                    <div className="oa-invite-role-summary">{summary}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="oa-invite-review">
              {[
                ["Name", inviteName],
                ["Email", inviteEmail],
                ["Role", inviteRole],
              ].map(([label, value]) => (
                <div key={label} className="oa-invite-review-row">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
            <label className="oa-invite-checkbox">
              <input
                type="checkbox"
                checked={inviteSendEmail}
                onChange={(e) => setInviteSendEmail(e.target.checked)}
              />
              Email the invite directly — they set their own password from the link
            </label>
            <div className="oa-invite-link-panel">
              <div className="oa-invite-link-label">Invite link</div>
              <div className="oa-invite-link-row">
                <div className="oa-invite-link-url">{inviteLink}</div>
                <button type="button" className="oa-btn-copy-link" onClick={copyInviteLink}>
                  <Copy size={12} strokeWidth={1.8} />
                  Copy link
                </button>
              </div>
              <div className="oa-invite-link-note">
                Expires in 7 days. Works even if the invite email doesn&apos;t arrive.
              </div>
            </div>
          </div>
        )}
      </OaModal>

      <OaModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit team member"
        footer={
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button type="button" className="oa-btn-ghost" onClick={() => setEditOpen(false)}>Cancel</button>
            <button type="button" className="oa-btn-primary" onClick={() => { show(`${editUser?.name} updated.`); setEditOpen(false); }}>Save changes</button>
          </div>
        }
      >
        {editUser ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label><span className="oa-field-label">Name</span><input className="oa-input" defaultValue={editUser.name} /></label>
            <label><span className="oa-field-label">Email</span><input className="oa-input" defaultValue={editUser.email} /></label>
            <div className="oa-field-label">Role</div>
            {["QA Lead", "Agent"].map((r) => (
              <button key={r} type="button" className={`oa-filter-btn ${editUser.role === r ? "active" : ""}`} style={{ width: "100%", textAlign: "left" }}>
                {r}
              </button>
            ))}
          </div>
        ) : null}
      </OaModal>

      <OaModal
        open={removeOpen}
        onClose={() => setRemoveOpen(false)}
        title={`Remove ${editUser?.name}?`}
        footer={
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button type="button" className="oa-btn-ghost" onClick={() => setRemoveOpen(false)}>Cancel</button>
            <button type="button" style={{ height: 40, padding: "0 18px", borderRadius: 999, border: "none", background: "#C4362F", color: "#fff", fontSize: 13.5, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }} onClick={() => { show(`${editUser?.name} removed.`); setRemoveOpen(false); }}>
              Remove user
            </button>
          </div>
        }
      >
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "var(--oa-muted)" }}>
          They lose access to the project console immediately. Their analyzed calls and the minutes they consumed stay on your usage — nothing is deleted.
        </p>
      </OaModal>
    </div>
  );
}

/* ── Roles & Permissions ── */

export function RolesPanel() {
  const { show, node } = useToast();
  const [createOpen, setCreateOpen] = useState(false);
  const [roleStep, setRoleStep] = useState(1);
  const [roleName, setRoleName] = useState("");
  const [editPermsOpen, setEditPermsOpen] = useState(false);
  const [editRoleName, setEditRoleName] = useState("");

  const closeCreate = () => {
    setCreateOpen(false);
    setRoleStep(1);
    setRoleName("");
  };

  return (
    <div>
      {node}
      <PageHeader
        title="Roles & Permissions"
        subtitle={`Control what each role can see and do inside ${ORG_PLATFORM.workspace}'s console.`}
        action={
          <button type="button" className="oa-btn-primary" onClick={() => setCreateOpen(true)}>
            <Plus size={15} strokeWidth={2} />
            Create role
          </button>
        }
      />

      <div className="oa-roles-grid">
        {ORG_ROLES.map((r) => (
          <div key={r.id} className="oa-card oa-role-card">
            <div className="oa-role-card-head">
              <span className="oa-role-dot" style={{ background: r.dot }} />
              <span className="oa-role-card-name">{r.name}</span>
            </div>
            <div className="oa-role-card-members">
              {r.members} member{r.members !== 1 ? "s" : ""}
            </div>
            <div className="oa-role-card-desc">{r.description}</div>
            <button
              type="button"
              className="oa-role-edit-btn"
              onClick={() => {
                setEditRoleName(r.name);
                setEditPermsOpen(true);
              }}
            >
              Edit permissions
            </button>
          </div>
        ))}
      </div>

      <div className="oa-card oa-perm-table-card">
        <div className="oa-table-wrap">
          <table className="oa-table oa-perm-table">
            <thead>
              <tr>
                <th>Permission</th>
                {ORG_ROLES.map((r) => (
                  <th key={r.id} className="oa-perm-col">{r.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ORG_PERMISSIONS.map((row) => (
                <tr key={row.label}>
                  <td className="oa-perm-label">{row.label}</td>
                  {ORG_ROLES.map((r) => {
                    const allowed = row[r.id as keyof typeof row] as boolean;
                    return (
                      <td key={r.id} className="oa-perm-cell">
                        <span className={allowed ? "oa-perm-yes" : "oa-perm-no"}>{allowed ? "●" : "—"}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <OaModal
        open={createOpen}
        onClose={closeCreate}
        title="Create role"
        step={`Step ${roleStep} of 3`}
        footer={
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <button type="button" className="oa-btn-ghost" style={{ visibility: roleStep > 1 ? "visible" : "hidden" }} onClick={() => setRoleStep((s) => Math.max(1, s - 1))}>Back</button>
            <div style={{ display: "flex", gap: 10 }}>
              <button type="button" className="oa-btn-ghost" onClick={closeCreate}>Cancel</button>
              <button type="button" className="oa-btn-primary" onClick={() => {
                if (roleStep === 1 && !roleName.trim()) return;
                if (roleStep < 3) setRoleStep((s) => s + 1);
                else { show(`Role "${roleName}" created.`); closeCreate(); }
              }}>
                {roleStep === 3 ? "Create role" : "Continue"}
              </button>
            </div>
          </div>
        }
      >
        <StepDots step={roleStep} total={3} />
        {roleStep === 1 ? (
          <label>
            <span className="oa-field-label">Role name</span>
            <input className="oa-input" value={roleName} onChange={(e) => setRoleName(e.target.value)} placeholder="e.g. Senior QA Analyst" />
          </label>
        ) : roleStep === 2 ? (
          <div style={{ maxHeight: 320, overflowY: "auto" }}>
            {ORG_PERMISSIONS.map((p) => (
              <div key={p.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 2px", borderBottom: "1px solid #fff9e5" }}>
                <span style={{ fontSize: 13.5 }}>{p.label}</span>
                <OaToggle on={p.admin} onToggle={() => {}} />
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: 13.5 }}>Creating <b>{roleName}</b> with default permissions from template.</p>
        )}
      </OaModal>

      <OaModal
        open={editPermsOpen}
        onClose={() => setEditPermsOpen(false)}
        title={`Edit ${editRoleName} permissions`}
        footer={
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button type="button" className="oa-btn-ghost" onClick={() => setEditPermsOpen(false)}>Cancel</button>
            <button type="button" className="oa-btn-primary" onClick={() => { show(`${editRoleName} permissions updated.`); setEditPermsOpen(false); }}>Save changes</button>
          </div>
        }
      >
        <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--oa-muted)" }}>Changes apply to every member with this role.</p>
        <div style={{ maxHeight: 320, overflowY: "auto" }}>
          {ORG_PERMISSIONS.map((p) => (
            <div key={p.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 2px", borderBottom: "1px solid #fff9e5" }}>
              <span style={{ fontSize: 13.5 }}>{p.label}</span>
              <OaToggle on={rolePermValue(editRoleName, p)} onToggle={() => {}} />
            </div>
          ))}
        </div>
      </OaModal>
    </div>
  );
}

/* ── Account & Billing ── */

export function BillingPanel() {
  const { show, node } = useToast();
  const [cardOpen, setCardOpen] = useState(false);
  const minutesLeft = ORG_PLATFORM.planMinutes - ORG_PLAN_LIMITS.minutes.used;
  const minutesPct = ORG_PLAN_LIMITS.usagePct;

  return (
    <div>
      {node}
      <PageHeader title="Account & Billing" subtitle={`Plan, minutes, payment method and invoices for ${ORG_PLATFORM.workspace}.`} />

      <div className="oa-billing-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="oa-plan-card">
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
              <span className="oa-plan-icon">{ORG_PLATFORM.plan[0]}</span>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 18, fontWeight: 800, display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
                  {ORG_PLATFORM.plan} plan
                  <span style={{ display: "inline-flex", height: 22, padding: "0 9px", borderRadius: 999, background: "#ffd54f", color: "#1a1a1a", fontSize: 11, fontWeight: 700, alignItems: "center" }}>
                    {ORG_PLATFORM.planPrice}
                  </span>
                </div>
                <div style={{ fontSize: 12.5, color: "#B8C4D6", marginTop: 4 }}>
                  {ORG_PLATFORM.planMinutes.toLocaleString()} minutes / month · up to {ORG_PLATFORM.planUsers} users · renews {ORG_PLATFORM.planRenewal}
                </div>
              </div>
              <button type="button" className="oa-btn-ghost" style={{ background: "#333333", borderColor: "#444444", color: "#fff" }} onClick={() => show("Plan-change request sent to your account manager.")}>
                Request plan change
              </button>
            </div>
            <div style={{ marginTop: 12, fontSize: 12, color: "#B8C4D6", display: "flex", alignItems: "center", gap: 6 }}>
              <Lock size={13} strokeWidth={1.8} />
              Plan changes are reviewed and applied by your account manager — one request per month.
            </div>
          </div>

          <div className="oa-card" style={{ padding: 6 }}>
            <div style={{ padding: "14px 16px", fontSize: 15, fontWeight: 700, borderBottom: "1px dashed var(--oa-border-warm)" }}>Invoices</div>
            <div className="oa-table-wrap">
              <table className="oa-table" style={{ minWidth: 520 }}>
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Period</th>
                    <th style={{ textAlign: "right" }}>Amount</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {ORG_INVOICES.map((inv) => (
                    <tr key={inv.id}>
                      <td className="oa-mono" style={{ fontWeight: 600 }}>{inv.id}</td>
                      <td>{inv.period}</td>
                      <td className="oa-mono" style={{ textAlign: "right", fontWeight: 600 }}>{inv.amount}</td>
                      <td>
                        <span className={inv.status === "Paid" ? "oa-chip success" : "oa-chip danger"}>{inv.status}</span>
                      </td>
                      <td style={{ textAlign: "right", color: "var(--oa-accent-secondary)", cursor: "pointer", fontWeight: 600 }}>Download</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="oa-card" style={{ padding: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Minutes used</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 32, fontWeight: 800 }}>{minutesLeft}</span>
              <span style={{ fontSize: 12.5, color: "var(--oa-muted-light)" }}>min left</span>
            </div>
            <div className="oa-progress-track" style={{ height: 10, marginTop: 12 }}>
              <div className="oa-progress-bar" style={{ width: `${minutesPct}%`, background: "#ffd54f" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--oa-mono)", fontSize: 11, color: "var(--oa-muted-light)", marginTop: 8 }}>
              <span>{ORG_PLAN_LIMITS.minutes.used.toLocaleString()} min used ({minutesPct}%)</span>
              <span>{ORG_PLATFORM.planMinutes.toLocaleString()} / mo</span>
            </div>
          </div>

          <div className="oa-card" style={{ padding: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Payment method</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, border: "1px solid var(--oa-border-warm)", borderRadius: 14, padding: 13 }}>
              <div style={{ width: 42, height: 30, borderRadius: 6, background: "#1a1a1a", color: "#ffd54f", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 800 }}>
                {ORG_PAYMENT_METHOD.brand}
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>•••• {ORG_PAYMENT_METHOD.last4}</div>
                <div style={{ fontSize: 11.5, color: "var(--oa-muted-light)" }}>Expires {ORG_PAYMENT_METHOD.expiry}</div>
              </div>
            </div>
            <button type="button" className="oa-btn-ghost" style={{ marginTop: 12, height: 34, fontSize: 12.5 }} onClick={() => setCardOpen(true)}>
              Update card
            </button>
          </div>
        </div>
      </div>

      <OaModal
        open={cardOpen}
        onClose={() => setCardOpen(false)}
        title="Update payment method"
        footer={
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button type="button" className="oa-btn-ghost" onClick={() => setCardOpen(false)}>Cancel</button>
            <button type="button" className="oa-btn-primary" onClick={() => { show("Payment method updated."); setCardOpen(false); }}>Save card</button>
          </div>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label><span className="oa-field-label">Card number</span><input className="oa-input" placeholder="4242 4242 4242 4242" /></label>
          <label><span className="oa-field-label">Name on card</span><input className="oa-input" /></label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label><span className="oa-field-label">Expiry</span><input className="oa-input" placeholder="MM/YY" /></label>
            <label><span className="oa-field-label">CVC</span><input className="oa-input" placeholder="123" /></label>
          </div>
        </div>
      </OaModal>
    </div>
  );
}

/* ── Campaigns & Scorecards ── */

export function CampaignsPanel() {
  const { show, node } = useToast();
  const [active, setActive] = useState(ORG_CAMPAIGNS[0].id);
  const [newOpen, setNewOpen] = useState(false);
  const [editCpOpen, setEditCpOpen] = useState(false);
  const [editCp, setEditCp] = useState<(typeof ORG_CHECKPOINTS)[number] | null>(null);

  const activeName = ORG_CAMPAIGNS.find((c) => c.id === active)?.name ?? ORG_CAMPAIGNS[0].name;
  const mandatoryCount = ORG_CHECKPOINTS.filter((c) => c.mandatory).length;

  return (
    <div>
      {node}
      <PageHeader
        title="Campaigns & Scorecards"
        subtitle="Create jobs and the checkpoints used to score every call in them."
        action={
          <button type="button" className="oa-btn-primary" onClick={() => setNewOpen(true)}>
            <Plus size={15} strokeWidth={2} />
            New campaign
          </button>
        }
      />

      <div className="oa-card" style={{ padding: 16, marginBottom: 14 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {ORG_CAMPAIGNS.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`oa-filter-btn ${active === c.id ? "active" : ""}`}
              onClick={() => setActive(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="oa-campaign-grid">
        <div className="oa-card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Checkpoints · {activeName}</div>
            <span style={{ display: "inline-flex", height: 24, padding: "0 10px", borderRadius: 999, background: "#fff9e5", color: "var(--oa-muted)", fontSize: 11.5, fontWeight: 700, alignItems: "center" }}>
              {ORG_CHECKPOINTS.length}/8 · {mandatoryCount} mandatory
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {ORG_CHECKPOINTS.map((cp) => (
              <div key={cp.id} className="oa-checkpoint-row">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <GripVertical size={15} color="#9A9587" />
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{cp.label}</span>
                  {cp.mandatory ? <span className="oa-chip danger" style={{ height: 20, fontSize: 10 }}>Mandatory</span> : null}
                  <button
                    type="button"
                    className="oa-btn-ghost"
                    style={{ height: 26, padding: "0 11px", fontSize: 11.5 }}
                    onClick={() => {
                      setEditCp(cp);
                      setEditCpOpen(true);
                    }}
                  >
                    Edit
                  </button>
                </div>
                <div style={{ display: "flex", gap: 18, marginTop: 9, paddingLeft: 25, fontSize: 12, color: "var(--oa-muted)" }}>
                  <span>
                    Pass ≥ <b className="oa-mono" style={{ color: "#25384B" }}>{cp.threshold}%</b>
                  </span>
                  <span>{cp.mandatory ? "Mandatory" : "Optional"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="oa-summary-yellow">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Summary</div>
            <span style={{ display: "inline-flex", height: 22, padding: "0 9px", borderRadius: 999, background: "#1a1a1a", color: "#ffd54f", fontSize: 11, fontWeight: 700, alignItems: "center" }}>
              Saved
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div className="oa-summary-stat">
              <div style={{ fontSize: 11, color: "#5C4A12" }}>Checkpoints</div>
              <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4, color: "#1a1a1a" }}>
                {ORG_CHECKPOINTS.length}<span style={{ fontSize: 13, color: "#5C4A12", fontWeight: 600 }}>/8</span>
              </div>
            </div>
            <div className="oa-summary-stat">
              <div style={{ fontSize: 11, color: "#5C4A12" }}>Mandatory</div>
              <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4, color: "#1a1a1a" }}>{mandatoryCount}</div>
            </div>
          </div>
        </div>
      </div>

      <OaModal
        open={newOpen}
        onClose={() => setNewOpen(false)}
        title="New campaign"
        footer={
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button type="button" className="oa-btn-ghost" onClick={() => setNewOpen(false)}>Cancel</button>
            <button type="button" className="oa-btn-primary" onClick={() => { show("Campaign created."); setNewOpen(false); }}>Create campaign</button>
          </div>
        }
      >
        <p style={{ margin: "0 0 14px", fontSize: 13.5, color: "var(--oa-muted)" }}>Give it a name and start from a preset vertical or a blank scorecard.</p>
        <label><span className="oa-field-label">Campaign name</span><input className="oa-input" placeholder="e.g. Renewals — Winter 2026" /></label>
        <div className="oa-field-label" style={{ marginTop: 12, marginBottom: 8 }}>Base template</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[...ORG_CAMPAIGNS.map((c) => c.name), "Blank scorecard"].map((t) => (
            <button key={t} type="button" className="oa-filter-btn">{t}</button>
          ))}
        </div>
      </OaModal>

      <OaModal
        open={editCpOpen}
        onClose={() => setEditCpOpen(false)}
        title="Edit checkpoint"
        footer={
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button type="button" className="oa-btn-ghost" onClick={() => setEditCpOpen(false)}>Cancel</button>
            <button type="button" className="oa-btn-primary" onClick={() => { show("Checkpoint updated."); setEditCpOpen(false); }}>Save changes</button>
          </div>
        }
      >
        {editCp ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <label><span className="oa-field-label">Checkpoint name</span><input className="oa-input" defaultValue={editCp.label} /></label>
            <label><span className="oa-field-label">Pass threshold (%)</span><input className="oa-input oa-mono" type="number" defaultValue={editCp.threshold} /></label>
          </div>
        ) : null}
      </OaModal>
    </div>
  );
}

/* ── Agent Performance ── */

export function AgentsPanel({ onNavigate: _onNavigate }: { onNavigate?: OANavigate }) {
  const { show, node } = useToast();
  const [drawerAgent, setDrawerAgent] = useState<AgentRow | null>(null);
  const [kebabOpen, setKebabOpen] = useState<string | null>(null);
  const [resolveOpen, setResolveOpen] = useState(false);
  const [resolveDecision, setResolveDecision] = useState<"uphold" | "overturn" | null>(null);
  const dispute = ORG_DISPUTES[0];

  const belowThreshold = ORG_AGENT_PERFORMANCE.filter((a) => a.avgQa < 80).length;

  return (
    <div>
      {node}
      <PageHeader title="Agent Performance & Coaching" subtitle="QA trends per agent and the coaching that keeps them up." />

      <div className="oa-kpi-grid">
        <div className="oa-card oa-kpi-card" style={{ cursor: "default", display: "flex", alignItems: "center", gap: 10 }}>
          <div className="oa-gauge-mini">
            <svg viewBox="0 0 44 44" style={{ width: 44, height: 44, transform: "rotate(-90deg)" }}>
              <circle cx="22" cy="22" r="18" fill="none" stroke="#fff9e5" strokeWidth="4" />
              <circle cx="22" cy="22" r="18" fill="none" stroke="#0E7A57" strokeWidth="4" strokeLinecap="round" strokeDasharray="113.1" strokeDashoffset="21.5" />
            </svg>
            <div className="oa-gauge-mini-val">81</div>
          </div>
          <div>
            <div className="oa-kpi-label">Avg QA</div>
            <div style={{ fontSize: 12, color: "#0E7A57", fontWeight: 700, marginTop: 4 }}>On target</div>
          </div>
        </div>
        <div className="oa-card oa-kpi-card" style={{ cursor: "default" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
            <span className="oa-kpi-icon"><AlertTriangleIcon /></span>
            <span className="oa-kpi-label">Below threshold</span>
          </div>
          <div className="oa-kpi-value" style={{ color: "#C4362F" }}>{belowThreshold}</div>
        </div>
        <div className="oa-card oa-kpi-card" style={{ cursor: "default" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
            <span className="oa-kpi-icon"><Users size={16} strokeWidth={1.8} /></span>
            <span className="oa-kpi-label">Coaching notes</span>
          </div>
          <div className="oa-kpi-value">7 <span style={{ fontSize: 12, color: "var(--oa-muted-light)", fontWeight: 600 }}>this month</span></div>
        </div>
        <div className="oa-card oa-kpi-card" style={{ cursor: "default" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
            <span className="oa-kpi-icon"><Users size={16} strokeWidth={1.8} /></span>
            <span className="oa-kpi-label">Top performer</span>
          </div>
          <div style={{ fontSize: 17, fontWeight: 800 }}>Sana Khalid</div>
        </div>
      </div>

      <div className="oa-card" style={{ padding: 6 }}>
        <div className="oa-table-wrap">
          <table className="oa-table" style={{ minWidth: 680 }}>
            <thead>
              <tr>
                <th>Agent</th>
                <th>Calls</th>
                <th>Avg QA</th>
                <th>Trend</th>
                <th>Mandatory pass</th>
                <th style={{ textAlign: "right" }} />
              </tr>
            </thead>
            <tbody>
              {ORG_AGENT_PERFORMANCE.map((a) => (
                <tr key={a.id} className="clickable" onClick={() => setDrawerAgent(a)}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                      <span className="oa-avatar-warm" style={{ width: 32, height: 32 }}>{a.initials}</span>
                      <div>
                        <div style={{ fontWeight: 600 }}>{a.name}</div>
                        <div style={{ fontSize: 11, color: "var(--oa-muted-light)" }}>{a.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="oa-mono">{a.calls}</td>
                  <td><span className={qaPillClass(a.avgQa)}>{a.avgQa}</span></td>
                  <td className="oa-mono" style={{ color: a.trendUp ? "#0E7A57" : "#C4362F" }}>{a.trend}</td>
                  <td className="oa-mono">{a.mandatoryPass}%</td>
                  <td style={{ textAlign: "right" }} onClick={(e) => e.stopPropagation()}>
                    <KebabMenu
                      open={kebabOpen === a.id}
                      onToggle={() => setKebabOpen(kebabOpen === a.id ? null : a.id)}
                      items={[
                        { label: "View profile", onClick: () => { setDrawerAgent(a); setKebabOpen(null); } },
                        { label: "Send coaching note", onClick: () => { setDrawerAgent(a); setKebabOpen(null); } },
                        {
                          label: "Flag for calibration",
                          danger: true,
                          onClick: () => {
                            show(`${a.name} flagged for calibration review.`);
                            setKebabOpen(null);
                            setResolveOpen(true);
                          },
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AgentDrawer agent={drawerAgent} onClose={() => setDrawerAgent(null)} onSaveNote={() => show("Coaching note saved.")} />

      <OaModal
        open={resolveOpen}
        onClose={() => { setResolveOpen(false); setResolveDecision(null); }}
        title={`Resolve dispute — ${dispute.call}`}
        footer={
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button type="button" className="oa-btn-ghost" onClick={() => setResolveOpen(false)}>Cancel</button>
            <button type="button" className="oa-btn-yellow" style={{ height: 40, padding: "0 18px", fontSize: 13.5, fontWeight: 700 }} onClick={() => {
              if (!resolveDecision) return;
              show(`Dispute on ${dispute.call} ${resolveDecision === "uphold" ? "upheld" : "overturned"}.`);
              setResolveOpen(false);
            }}>
              Submit decision
            </button>
          </div>
        }
      >
        <p style={{ margin: "0 0 14px", fontSize: 13.5, color: "var(--oa-muted)" }}>
          {dispute.agent} disputes &quot;{dispute.checkpoint}&quot; — {dispute.original} given, {dispute.requested} requested.
        </p>
        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          {(["uphold", "overturn"] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setResolveDecision(d)}
              style={{
                flex: 1,
                height: 40,
                borderRadius: 12,
                border: `1px solid ${resolveDecision === d ? "#1a1a1a" : "#e8e8e8"}`,
                background: resolveDecision === d ? "#fff9e5" : "#fff",
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: "pointer",
              }}
            >
              {d === "uphold" ? "Uphold original score" : "Overturn — apply new score"}
            </button>
          ))}
        </div>
        <label>
          <span className="oa-field-label">Note (shared with the agent)</span>
          <textarea className="oa-textarea" rows={3} placeholder="Explain the decision…" />
        </label>
      </OaModal>
    </div>
  );
}

function AlertTriangleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width={16} height={16}>
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10.3 4.3 2.6 18a1.5 1.5 0 0 0 1.3 2.2h16.2a1.5 1.5 0 0 0 1.3-2.2L13.7 4.3a1.5 1.5 0 0 0-2.6 0z" />
    </svg>
  );
}

/* ── Alerts ── */

export function AlertsPanel({ onNavigate }: { onNavigate?: OANavigate }) {
  const [filter, setFilter] = useState("All");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewAlert, setReviewAlert] = useState<(typeof ORG_ALERTS)[number] | null>(null);

  const items = ORG_ALERTS.filter((a) => {
    if (filter === "All") return true;
    if (filter === "Compliance") return a.category === "compliance";
    if (filter === "Mandatory fail") return a.category === "mandatory";
    if (filter === "Unusual pattern") return a.category === "pattern";
    return true;
  });

  const sevClass = (s: string) => (s === "high" ? "high" : s === "medium" ? "medium" : "low");

  return (
    <div>
      <PageHeader title="Alerts" subtitle="Calls flagged for compliance or a failed mandatory checkpoint." />

      <section className="oa-card oa-section-card">
        <div className="oa-filter-row">
          <FilterPills options={ORG_ALERT_FILTERS} value={filter} onChange={setFilter} />
        </div>

        {items.map((a) => (
          <div key={a.id} className="oa-alert-row">
            <span className={`oa-severity-dot ${sevClass(a.severity)}`} />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{a.title}</div>
              <div style={{ fontSize: 12.5, color: "var(--oa-muted)", marginTop: 2 }}>{a.detail}</div>
            </div>
            <span className={alertTagClass(a.tag)}>{a.tag}</span>
            <span className="oa-mono" style={{ fontSize: 11.5, color: "var(--oa-muted-light)", width: 64, textAlign: "right" }}>
              {a.time}
            </span>
            <button
              type="button"
              className="oa-btn-yellow"
              style={{ height: 34, padding: "0 14px" }}
              onClick={() => {
                if (a.action === "View agent") {
                  onNavigate?.("agents");
                } else {
                  setReviewAlert(a);
                  setReviewOpen(true);
                }
              }}
            >
              {a.action}
            </button>
          </div>
        ))}
      </section>

      <OaModal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        title={reviewAlert?.title ?? "Review call"}
        footer={
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button type="button" className="oa-btn-ghost" onClick={() => setReviewOpen(false)}>Dismiss flag</button>
            <button type="button" className="oa-btn-primary" onClick={() => setReviewOpen(false)}>Escalate to QA lead</button>
          </div>
        }
      >
        {reviewAlert ? (
          <>
            <span className="oa-chip danger" style={{ marginBottom: 14 }}>Flag</span>
            <p style={{ margin: "0 0 16px", fontSize: 13.5, lineHeight: 1.6, color: "var(--oa-muted)" }}>{reviewAlert.detail}</p>
            <div style={{ border: "1px solid var(--oa-border-warm)", borderRadius: 14, padding: 14, marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--oa-muted-light)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                Transcript excerpt
              </div>
              <div className="oa-mono" style={{ fontSize: 12.5, lineHeight: 1.7, color: "#25384B" }}>
                <div style={{ marginBottom: 6 }}><b>Agent:</b> &quot;...so I can go ahead and process that for you today.&quot;</div>
                <div><b>Caller:</b> &quot;Okay, sounds good, thank you.&quot;</div>
              </div>
              <div style={{ fontSize: 11.5, color: "#C4362F", marginTop: 10 }}>
                Checkpoint step was skipped before this point — no identity confirmation on record.
              </div>
            </div>
          </>
        ) : null}
      </OaModal>
    </div>
  );
}

/* ── Reports ── */

export function ReportsPanel() {
  const { show, node } = useToast();
  const [periods, setPeriods] = useState<Record<string, string>>({});

  return (
    <div>
      {node}
      <PageHeader title="Reports" subtitle="Generate the audit reports a compliance officer can hand to a regulator." />

      <div className="oa-section-label">Choose a report type</div>
      <div className="oa-report-grid">
        {ORG_REPORT_TYPES.map((rt) => {
          const period = periods[rt.id] ?? "Weekly";
          return (
            <div key={rt.id} className="oa-report-card">
              <div className="oa-report-card-top">
                <div className="oa-report-card-info">
                  <span className="oa-kpi-icon"><Users size={17} strokeWidth={1.8} /></span>
                  <div>
                    <div className="oa-report-card-title">{rt.title}</div>
                    <div className="oa-report-card-subtitle">{rt.subtitle}</div>
                  </div>
                </div>
                <div className="oa-period-toggle">
                  {["Weekly", "Monthly", "Quarterly"].map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`oa-period-btn ${period === p ? "active" : ""}`}
                      onClick={() => setPeriods((prev) => ({ ...prev, [rt.id]: p }))}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="oa-btn-primary oa-report-generate-btn"
                onClick={() => show(`Generating ${rt.title}…`)}
              >
                Generate
              </button>
            </div>
          );
        })}
      </div>

      <div className="oa-card" style={{ padding: 6 }}>
        <div style={{ padding: "14px 16px", fontSize: 15, fontWeight: 700, borderBottom: "1px dashed var(--oa-border-warm)" }}>Recent reports</div>
        <div className="oa-table-wrap">
          <table className="oa-table" style={{ minWidth: 560 }}>
            <thead>
              <tr>
                <th>Report</th>
                <th>Calls</th>
                <th>QA</th>
                <th>Format</th>
                <th style={{ textAlign: "right" }} />
              </tr>
            </thead>
            <tbody>
              {ORG_RECENT_REPORTS.map((r) => (
                <tr key={r.meta}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{r.name}</div>
                    <div className="oa-mono" style={{ fontSize: 11, color: "var(--oa-muted-light)" }}>{r.meta}</div>
                  </td>
                  <td className="oa-mono">{r.calls}</td>
                  <td className="oa-mono">{r.qa}</td>
                  <td>
                    <span className={r.format === "PDF" ? "oa-chip danger" : "oa-chip success"} style={{ height: 22, fontSize: 11 }}>
                      {r.format}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button type="button" className="oa-btn-ghost" style={{ height: 28, padding: "0 11px", fontSize: 11.5 }} onClick={() => show(`Downloading ${r.name}.${r.format.toLowerCase()}`)}>
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Activity Log ── */

export function ActivityPanel() {
  return (
    <div>
      <PageHeader
        title="Activity Log"
        subtitle={`Audit trail for ${ORG_PLATFORM.workspace}.`}
        action={<button type="button" className="oa-btn-ghost" style={{ height: 38 }}>Export</button>}
      />

      <div className="oa-card" style={{ padding: 6 }}>
        <div className="oa-table-wrap">
          <table className="oa-table" style={{ minWidth: 600 }}>
            <thead>
              <tr>
                <th>Action</th>
                <th>Actor</th>
                <th>Severity</th>
                <th style={{ textAlign: "right" }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {ORG_ACTIVITY_LOG.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{row.action}</td>
                  <td className="oa-mono" style={{ fontSize: 12, color: "var(--oa-muted)" }}>{row.actor}</td>
                  <td><span className={severityChip(row.severity)} style={{ textTransform: "capitalize" }}>{row.severity}</span></td>
                  <td className="oa-mono" style={{ textAlign: "right", fontSize: 12, color: "var(--oa-muted-light)" }}>{row.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Settings ── */

export function SettingsPanel() {
  const { show, node } = useToast();
  const [prefs, setPrefs] = useState(ORG_NOTIFICATION_PREFS.map((p) => ({ ...p })));

  return (
    <div>
      {node}
      <PageHeader
        title="Workspace Settings"
        subtitle={`Organization details and notification preferences for ${ORG_PLATFORM.workspace}.`}
        action={
          <button type="button" className="oa-btn-primary" onClick={() => show("Settings saved.")}>
            Save settings
          </button>
        }
      />

      <div className="oa-settings-stack">
        <div className="oa-card oa-settings-card">
          <div className="oa-settings-org-title">Organization</div>
          <div className="oa-settings-org-fields">
            <label><span className="oa-field-label">Workspace name</span><input className="oa-input" defaultValue={ORG_PLATFORM.workspace} /></label>
            <label><span className="oa-field-label">Region</span><input className="oa-input" defaultValue="US-East" /></label>
          </div>
        </div>

        <div className="oa-card oa-settings-card">
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>Notification preferences</div>
          <p style={{ margin: "0 0 12px", fontSize: 12.5, color: "var(--oa-muted)" }}>
            Choose how you&apos;re notified about things that need your attention.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 90px 90px", gap: 8, padding: "8px 0", fontFamily: "var(--oa-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--oa-muted-light)", fontWeight: 600, borderBottom: "1px dashed var(--oa-border-warm)" }}>
            <div />
            <div style={{ textAlign: "center" }}>Email</div>
            <div style={{ textAlign: "center" }}>In-app</div>
          </div>
          {prefs.map((n, i) => (
            <div key={n.label} style={{ display: "grid", gridTemplateColumns: "1.4fr 90px 90px", gap: 8, alignItems: "center", padding: "12px 0", borderBottom: "1px solid #fff9e5" }}>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>{n.label}</div>
              <div style={{ textAlign: "center" }}>
                <OaToggle
                  on={n.email}
                  onToggle={() =>
                    setPrefs((prev) => prev.map((p, j) => (j === i ? { ...p, email: !p.email } : p)))
                  }
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <OaToggle
                  on={n.inApp}
                  onToggle={() =>
                    setPrefs((prev) => prev.map((p, j) => (j === i ? { ...p, inApp: !p.inApp } : p)))
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <div className="oa-card oa-settings-card">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Data & security</div>
            <span className="oa-chip warn" style={{ height: 22, fontSize: 11 }}>Coming soon</span>
          </div>
          <p style={{ margin: "0 0 4px", fontSize: 12.5, color: "var(--oa-muted)" }}>
            PII auto-redaction, required 2FA, and audit-log exports — applies to everyone in this workspace.
          </p>
        </div>
      </div>
    </div>
  );
}
