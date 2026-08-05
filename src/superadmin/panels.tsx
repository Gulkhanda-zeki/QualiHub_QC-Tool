import { useState, type ReactNode } from "react";
import {
  Plus,
  ChevronRight,
  RefreshCw,
  X,
  Clock,
  Cpu,
  AlertTriangle,
  Search,
  Filter,
  Download,
} from "lucide-react";
import {
  ALERTS_PANEL,
  COMPANIES_PANEL,
  BILLING_PANEL,
  SYSTEM_PANEL,
  REQUESTS_PANEL,
  AUDIT_PANEL,
  SETTINGS_PANEL,
  PLATFORM,
} from "../data/qcMockData";
import { AddClientWorkspaceModal } from "../AddClientWorkspaceModal";
import { ReviewRequestModal } from "../ReviewRequestModal";
import { EditPlanCatalogModal } from "../EditPlanCatalogModal";
import { InvoiceDetailModal } from "../InvoiceDetailModal";
import { CompanyHubPanel } from "./CompanyHubPanel";
import { RequestApprovedModal } from "../RequestApprovedModal";

export type SANavigate = (id: string) => void;

function tagClass(tag: string): string {
  const map: Record<string, string> = {
    Request: "sa-tag request",
    Billing: "sa-tag billing",
    Usage: "sa-tag usage",
    Pipeline: "sa-tag pipeline",
    "Churn risk": "sa-tag churn",
  };
  return map[tag] ?? "sa-tag neutral";
}

function accessChip(access: string): string {
  if (access === "Active") return "sa-chip success";
  if (access === "Suspended") return "sa-chip warn";
  return "sa-chip neutral";
}

function billingChip(billing: string): string {
  if (billing === "Paid") return "sa-chip success";
  if (billing === "Unpaid") return "sa-chip danger";
  return "sa-chip neutral";
}

function severityChip(severity: string): string {
  if (severity === "high") return "sa-chip danger";
  if (severity === "medium") return "sa-chip warn";
  return "sa-chip neutral";
}

function statusChip(label: string): string {
  const map: Record<string, string> = {
    Active: "sa-chip success",
    Paid: "sa-chip success",
    Warm: "sa-chip success",
    Unpaid: "sa-chip danger",
    Suspended: "sa-chip warn",
    Pending: "sa-chip warn",
    Approved: "sa-chip success",
    Declined: "sa-chip danger",
    Degraded: "sa-chip warn",
    Pro: "sa-chip plan",
    Standard: "sa-chip plan",
  };
  return map[label] ?? "sa-chip neutral";
}

function invoiceStatusChip(status: string): string {
  const map: Record<string, string> = {
    Paid: "sa-invoice-chip paid",
    Unpaid: "sa-invoice-chip unpaid",
    Pending: "sa-invoice-chip pending",
    Refunded: "sa-invoice-chip refunded",
  };
  return map[status] ?? "sa-invoice-chip refunded";
}

function LedgerFilterPills({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`sa-ledger-filter-pill ${value === opt ? "active" : ""}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </>
  );
}

function FilterPills({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`sa-filter-pill ${value === opt ? "active" : ""}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </>
  );
}

function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
}) {
  return (
    <div className="sa-page-header" style={{ marginBottom: 18 }}>
      <div>
        <h1 className="sa-page-title">{title}</h1>
        <p className="sa-page-subtitle">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

export function AlertsPanel({ onNavigate }: { onNavigate?: SANavigate }) {
  const [filter, setFilter] = useState("All");
  const [reviewAlert, setReviewAlert] = useState<(typeof ALERTS_PANEL.items)[number] | null>(null);
  const items =
    filter === "All" ? ALERTS_PANEL.items : ALERTS_PANEL.items.filter((i) => i.filter === filter);

  return (
    <div>
      <PageHeader title="Alerts" subtitle={ALERTS_PANEL.subtitle} />

      <section className="sa-card sa-section-card">
        <div className="sa-filter-row">
          <FilterPills options={ALERTS_PANEL.filters} value={filter} onChange={setFilter} />
          <span className="sa-filter-meta">{ALERTS_PANEL.statusLine}</span>
        </div>

        {items.length === 0 ? (
          <div className="sa-empty-state">
            <div className="sa-empty-title">Nothing open in this category</div>
            <div className="sa-empty-sub">Switch to All to see the rest.</div>
          </div>
        ) : (
          items.map((a) => (
            <div key={a.id} className="sa-alert-row">
              <span className={`sa-severity-dot ${a.severity}`} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>{a.title}</div>
                <div style={{ fontSize: 12.5, color: "var(--sa-muted)", marginTop: 2 }}>{a.sub}</div>
              </div>
              <span className={tagClass(a.tag)}>{a.tag}</span>
              <span className="sa-mono" style={{ fontSize: 11.5, color: "var(--sa-muted-light)", width: 64, textAlign: "right" }}>
                {a.time}
              </span>
              <button
                type="button"
                className="sa-btn-yellow"
                onClick={() => {
                  if (a.action === "Review request") setReviewAlert(a);
                  else if (a.action === "Open company") onNavigate?.("companies");
                }}
              >
                {a.action}
              </button>
            </div>
          ))
        )}

        <div className="sa-footer-note">{ALERTS_PANEL.footer}</div>
      </section>

      <ReviewRequestModal open={!!reviewAlert} alert={reviewAlert} onClose={() => setReviewAlert(null)} />
    </div>
  );
}

export function CompaniesPanel({
  onHubChange,
}: {
  onHubChange?: (companyName: string | null) => void;
}) {
  const [filter, setFilter] = useState("All");
  const [addOpen, setAddOpen] = useState(false);
  const [detailCompanyId, setDetailCompanyId] = useState<string | null>(null);
  const companies =
    filter === "All"
      ? COMPANIES_PANEL.companies
      : filter === "Blocked"
        ? COMPANIES_PANEL.companies.filter((c) => c.access === "Suspended")
        : COMPANIES_PANEL.companies.filter((c) => c.plan === filter);

  if (detailCompanyId) {
    return (
      <CompanyHubPanel
        companyId={detailCompanyId}
        onBack={() => {
          setDetailCompanyId(null);
          onHubChange?.(null);
        }}
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Companies"
        subtitle={`${COMPANIES_PANEL.companies.length} companies · ${COMPANIES_PANEL.sortLabel}`}
      />

      <div className="sa-card sa-section-card">
        <div className="sa-filter-row">
          <FilterPills options={COMPANIES_PANEL.filters} value={filter} onChange={setFilter} />
          <div className="sa-search-inline">
            <Search size={15} strokeWidth={1.7} />
            Search…
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button type="button" className="sa-icon-circle navy" onClick={() => setAddOpen(true)} title="Add client">
              <Plus size={15} strokeWidth={2} />
            </button>
            <button type="button" className="sa-icon-circle warm" title="Filters">
              <Filter size={15} strokeWidth={1.7} />
            </button>
            <button type="button" className="sa-btn-yellow" style={{ height: 38, display: "flex", alignItems: "center", gap: 7 }}>
              <Download size={14} strokeWidth={1.8} />
              Export
            </button>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <div className="sa-company-grid-header">
            <span style={{ width: 16, height: 16, borderRadius: 5, border: "1.5px solid #D8D2BC" }} />
            <div>Company ↕</div>
            <div>Plan ↕</div>
            <div>Access / billing</div>
            <div>Seats ↕</div>
            <div>Minutes used ↕</div>
            <div style={{ textAlign: "right" }}>MRR ↕</div>
            <div />
          </div>

          {companies.length === 0 ? (
            <div className="sa-empty-state">
              <div className="sa-empty-title">No companies match this filter</div>
              <div className="sa-empty-sub">Switch to All to see every company.</div>
            </div>
          ) : (
            companies.map((c) => (
              <div
                key={c.id}
                className="sa-company-grid-row"
                onClick={() => {
                  setDetailCompanyId(c.id);
                  onHubChange?.(c.name);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setDetailCompanyId(c.id)}
              >
                <span
                  onClick={(e) => e.stopPropagation()}
                  style={{ width: 16, height: 16, borderRadius: 5, border: "1.5px solid #D8D2BC", background: "#fff" }}
                />
                <div style={{ display: "flex", alignItems: "center", gap: 11, minWidth: 0 }}>
                  <span className="sa-avatar" style={{ background: c.color }}>
                    {c.initials}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {c.name}
                    </div>
                    <div className="sa-mono" style={{ fontSize: 11, color: "var(--sa-muted-light)" }}>
                      {c.id}
                    </div>
                  </div>
                </div>
                <div>
                  <span className={statusChip(c.plan)}>{c.plan}</span>
                </div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  <span className={accessChip(c.access)}>{c.access}</span>
                  <span className={billingChip(c.billing)}>{c.billing}</span>
                </div>
                <div className="sa-mono" style={{ fontSize: 12.5, color: "var(--sa-muted)" }}>
                  {c.seatsUsed}/{c.seatsTotal}
                </div>
                <div>
                  <div className="sa-progress-track">
                    <div
                      className={`sa-progress-bar ${c.pct >= 90 ? "danger" : c.pct >= 80 ? "warn" : ""}`}
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                  <div className="sa-mono" style={{ fontSize: 11, color: "var(--sa-muted)" }}>
                    {c.minsUsed.toLocaleString()} / {c.minsTotal.toLocaleString()}
                  </div>
                </div>
                <div className="sa-mono" style={{ fontSize: 13, fontWeight: 600, textAlign: "right" }}>
                  {c.mrr}
                </div>
                <div style={{ textAlign: "right", color: "var(--sa-muted-light)", display: "flex", justifyContent: "flex-end" }}>
                  <ChevronRight size={16} strokeWidth={1.8} />
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 20px", fontSize: 12.5, color: "var(--sa-muted)" }}>
          <span>{companies.length} companies shown</span>
          <div style={{ display: "flex", gap: 6 }}>
            <button type="button" className="sa-btn-ghost" style={{ height: 32, borderRadius: 8 }}>
              Previous
            </button>
            <button type="button" className="sa-btn-ghost" style={{ height: 32, borderRadius: 8 }}>
              Next
            </button>
          </div>
        </div>
      </div>

      <AddClientWorkspaceModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}

export function BillingPanel() {
  const [filter, setFilter] = useState("All");
  const [editPlanOpen, setEditPlanOpen] = useState(false);
  const [viewInvoice, setViewInvoice] = useState<(typeof BILLING_PANEL.invoices)[number] | null>(null);
  const [invoiceRows, setInvoiceRows] = useState(() => [...BILLING_PANEL.invoices]);
  const invoices =
    filter === "All" ? invoiceRows : invoiceRows.filter((inv) => inv.status === filter);

  const markPaid = (id: string) => {
    setInvoiceRows((rows) =>
      rows.map((inv) =>
        inv.id === id && (inv.action === "Mark paid" || inv.status === "Unpaid")
          ? { ...inv, status: "Paid", note: "—", action: "View" }
          : inv,
      ),
    );
  };

  const markSent = (id: string) => {
    setInvoiceRows((rows) =>
      rows.map((inv) =>
        inv.id === id && inv.action === "Send"
          ? { ...inv, status: "Sent", note: "Invoice emailed to the company admin", action: "View" }
          : inv,
      ),
    );
  };

  const handleInvoiceAction = (inv: (typeof BILLING_PANEL.invoices)[number]) => {
    if (inv.action === "Mark paid") {
      markPaid(inv.id);
      return;
    }
    if (inv.action === "Send") {
      markSent(inv.id);
      return;
    }
    if (inv.action === "View") setViewInvoice(inv);
  };

  return (
    <div>
      <PageHeader
        title="Billing"
        subtitle={BILLING_PANEL.subtitle}
        action={<button type="button" className="sa-btn-outline">Export statements</button>}
      />

      <div className="sa-billing-kpis">
        {BILLING_PANEL.kpis.map((kpi) => (
          <div key={kpi.label} className="sa-card sa-billing-kpi">
            <span className="sa-kpi-icon sa-billing-kpi-icon">
              <TrendIcon />
            </span>
            <div className="sa-kpi-label">{kpi.label}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginTop: 8 }}>
              <span className="sa-billing-kpi-value">{kpi.value}</span>
              <span className={`sa-billing-kpi-delta ${kpi.trendUp ? "up" : "down"}`}>{kpi.trend}</span>
            </div>
            <div className="sa-billing-kpi-sub">{kpi.sub}</div>
          </div>
        ))}
      </div>

      <div className="sa-billing-layout">
        <div className="sa-card sa-billing-ledger">
          <div className="sa-billing-ledger-header">
            <h3 className="sa-billing-ledger-title">Invoice ledger</h3>
            <div className="sa-billing-filter-bar">
              <LedgerFilterPills options={BILLING_PANEL.invoiceFilters} value={filter} onChange={setFilter} />
              <button type="button" className="sa-btn-yellow sa-billing-export-btn">
                <Download size={11} strokeWidth={1.8} />
                Export
              </button>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            {invoices.length === 0 ? (
              <div className="sa-empty-state">
                <div className="sa-empty-title">No invoices with this status</div>
                <div className="sa-empty-sub">Switch to All to see the ledger.</div>
              </div>
            ) : (
              invoices.map((l) => (
                <div key={l.id} className="sa-billing-ledger-row">
                  <div className="sa-mono sa-billing-invoice-id">{l.id}</div>
                  <div style={{ minWidth: 0 }}>
                    <div className="sa-billing-company">{l.company}</div>
                    <div className="sa-billing-plan">{l.plan}</div>
                  </div>
                  <div className="sa-mono sa-billing-amount">{l.amount}</div>
                  <div>
                    <span className={invoiceStatusChip(l.status)}>{l.status}</span>
                  </div>
                  <div className={`sa-billing-note ${l.note !== "—" ? "alert" : ""}`}>{l.note}</div>
                  <button
                    type="button"
                    className="sa-billing-action"
                    onClick={() => handleInvoiceAction(l)}
                  >
                    {l.action}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="sa-card sa-billing-catalog">
          <div className="sa-billing-catalog-header">
            <h3 className="sa-billing-ledger-title">Plan catalog</h3>
            <button type="button" className="sa-btn-catalog-edit" onClick={() => setEditPlanOpen(true)}>
              Edit
            </button>
          </div>
          <p className="sa-billing-catalog-desc">
            Single source of truth — the API reads these, the UI never sends prices.
          </p>
          {BILLING_PANEL.plans.map((p) => (
            <div key={p.name} className={`sa-plan-card ${p.live ? "live" : "inactive"}`}>
              <div className="sa-plan-card-head">
                <span className="sa-plan-card-name">{p.name}</span>
                <span className="sa-mono sa-plan-card-price">{p.price}</span>
              </div>
              <div className="sa-plan-card-detail">{p.detail}</div>
            </div>
          ))}
          <p className="sa-billing-overage-label">Overage policy</p>
          <p className="sa-billing-overage-text">{BILLING_PANEL.overageNote}</p>
        </div>
      </div>

      <EditPlanCatalogModal open={editPlanOpen} onClose={() => setEditPlanOpen(false)} />
      <InvoiceDetailModal
        open={!!viewInvoice}
        invoice={viewInvoice ? (invoiceRows.find((r) => r.id === viewInvoice.id) ?? viewInvoice) : null}
        onClose={() => setViewInvoice(null)}
        onMarkPaid={markPaid}
      />
    </div>
  );
}

function TrendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={17} height={17}>
      <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
    </svg>
  );
}

export function SystemPanel() {
  const maxQ = Math.max(...SYSTEM_PANEL.queueData);

  return (
    <div>
      <PageHeader
        title={SYSTEM_PANEL.title}
        subtitle={SYSTEM_PANEL.subtitle}
        action={
          <span className="sa-warn-pill">
            <span className="sa-warn-pill-dot" />
            {SYSTEM_PANEL.statusPill}
          </span>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 16 }}>
        {SYSTEM_PANEL.kpis.map((kpi) => {
          const Icon = kpi.label.includes("waiting") ? Clock : kpi.label.includes("GPU") ? Cpu : AlertTriangle;
          return (
            <div key={kpi.label} className="sa-card" style={{ padding: "17px 18px" }}>
              <span className="sa-kpi-icon" style={{ marginBottom: 12, display: "grid" }}>
                <Icon size={17} strokeWidth={1.8} />
              </span>
              <div style={{ fontSize: 12, color: "var(--sa-muted)" }}>{kpi.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginTop: 8 }}>
                <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em" }}>{kpi.value.split(" ")[0]}</span>
                <span style={{ fontSize: 12.5, color: "var(--sa-muted-light)" }}>
                  {kpi.value.split(" ").slice(1).join(" ")}
                </span>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--sa-muted-light)", marginTop: 5 }}>{kpi.sub}</div>
            </div>
          );
        })}
      </div>

      <div className="sa-card" style={{ padding: 20, marginBottom: 16 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Models &amp; services</h3>
        {SYSTEM_PANEL.models.map((s) => (
          <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: "1px solid var(--sa-bg-warm)" }}>
            <span className={`sa-severity-dot ${s.status === "Degraded" ? "medium" : "low"}`} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>{s.name}</div>
              <div className="sa-mono" style={{ fontSize: 11, color: "var(--sa-muted-light)", marginTop: 2 }}>
                {s.sub}
              </div>
            </div>
            <span className={statusChip(s.status)}>{s.status}</span>
          </div>
        ))}
      </div>

      <div className="sa-card" style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Queue depth</h3>
          <span className="sa-mono" style={{ fontSize: 11.5, color: "var(--sa-muted)" }}>
            {SYSTEM_PANEL.queuePeriod}
          </span>
        </div>
        <p style={{ margin: "0 0 18px", fontSize: 12.5, color: "var(--sa-muted)" }}>{SYSTEM_PANEL.queueSubtitle}</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 150 }}>
          {SYSTEM_PANEL.queueData.map((v, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                borderRadius: "4px 4px 0 0",
                background: v >= 40 ? "#ffd54f" : "#1a1a1a",
                height: `${Math.round((v / maxQ) * 100)}%`,
                minHeight: 4,
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--sa-mono)", fontSize: 10.5, color: "var(--sa-muted-light)", marginTop: 9 }}>
          <span>00:00</span>
          <span>12:00</span>
          <span>now</span>
        </div>
      </div>
    </div>
  );
}

export function RequestsPanel() {
  const [filter, setFilter] = useState("All");
  const [approvedTitle, setApprovedTitle] = useState<string | null>(null);
  const [requestRows, setRequestRows] = useState(() => [...REQUESTS_PANEL.items]);
  const items =
    filter === "All"
      ? requestRows
      : requestRows.filter((r) => r.filter === filter || r.status === filter);

  const approveRequest = (id: string, title: string) => {
    setRequestRows((rows) =>
      rows.map((r) => (r.id === id ? { ...r, status: "Approved", filter: "Approved" } : r)),
    );
    setApprovedTitle(title);
  };

  return (
    <div>
      <PageHeader title="Requests" subtitle={REQUESTS_PANEL.subtitle} />

      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        <FilterPills options={REQUESTS_PANEL.filters} value={filter} onChange={setFilter} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.length === 0 ? (
          <div className="sa-card sa-empty-state">
            <div className="sa-empty-title">Nothing here</div>
            <div className="sa-empty-sub">No requests with this status.</div>
          </div>
        ) : (
          items.map((r) => (
            <div key={r.id} className="sa-request-card">
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: 20 }}>
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                    background: r.tone === "danger" ? "#FBE9E7" : "var(--sa-bg-warm)",
                    color: r.tone === "danger" ? "var(--sa-danger)" : "var(--sa-muted)",
                  }}
                >
                  {r.tone === "danger" ? <X size={18} /> : <RefreshCw size={18} />}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 15, fontWeight: 700 }}>{r.title}</span>
                    <span className={statusChip(r.status)}>{r.status}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--sa-muted)", marginTop: 5, lineHeight: 1.5 }}>{r.description}</div>
                  <div className="sa-mono" style={{ fontSize: 11.5, color: "var(--sa-muted-light)", marginTop: 7 }}>
                    {r.meta}
                  </div>
                </div>
                {r.status === "Pending" ? (
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <button type="button" className="sa-btn-yellow" style={{ height: 36 }} onClick={() => approveRequest(r.id, r.title)}>
                      Approve
                    </button>
                    <button type="button" className="sa-btn-ghost" style={{ height: 36, background: "var(--sa-bg-warm)", border: "none" }}>
                      Decline
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="sa-request-impact">{r.onApproval}</div>
            </div>
          ))
        )}
      </div>

      <RequestApprovedModal open={!!approvedTitle} requestTitle={approvedTitle} onClose={() => setApprovedTitle(null)} />
    </div>
  );
}

export function AuditPanel() {
  const [filter, setFilter] = useState("All");
  const entries =
    filter === "All"
      ? AUDIT_PANEL.entries
      : AUDIT_PANEL.entries.filter((e) => e.severity.toLowerCase() === filter.toLowerCase());

  return (
    <div>
      <PageHeader
        title="Audit log"
        subtitle={AUDIT_PANEL.subtitle}
        action={<button type="button" className="sa-btn-ghost" style={{ height: 40, borderRadius: 999, background: "var(--sa-bg-warm)", border: "none" }}>Export full log</button>}
      />

      <div className="sa-card sa-section-card">
        <div className="sa-filter-row">
          <div className="sa-search-inline" style={{ width: 230, flex: "none" }}>
            <Search size={16} strokeWidth={1.7} />
            Search…
          </div>
          <FilterPills options={AUDIT_PANEL.filters} value={filter} onChange={setFilter} />
          <div style={{ marginLeft: "auto", height: 40, padding: "0 15px", borderRadius: 999, background: "var(--sa-bg-warm)", display: "flex", alignItems: "center", fontSize: 13, color: "var(--sa-muted)" }}>
            {AUDIT_PANEL.dateRange}
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(160px,1.7fr) minmax(110px,1.1fr) minmax(100px,1fr) 84px 100px",
              gap: 10,
              minWidth: 600,
              padding: "13px 16px 15px",
              borderBottom: "1px dashed var(--sa-border-warm)",
              fontFamily: "var(--sa-mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--sa-muted-light)",
              fontWeight: 600,
            }}
          >
            <div>Action ↕</div>
            <div>Actor ↕</div>
            <div>Company ↕</div>
            <div>Severity</div>
            <div style={{ textAlign: "right" }}>Time ↕</div>
          </div>

          {entries.length === 0 ? (
            <div className="sa-empty-state">
              <div className="sa-empty-title">No entries at this severity</div>
              <div className="sa-empty-sub">Widen the filter or the date range.</div>
            </div>
          ) : (
            entries.map((a, i) => (
              <div
                key={`${a.action}-${i}`}
                className="sa-alert-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(160px,1.7fr) minmax(110px,1.1fr) minmax(100px,1fr) 84px 100px",
                  gap: 10,
                  minWidth: 600,
                  alignItems: "center",
                  padding: "12px 16px",
                }}
              >
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{a.action}</div>
                <div className="sa-mono" style={{ fontSize: 11.5, color: "var(--sa-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {a.actor}
                </div>
                <div style={{ fontSize: 12.5, color: "var(--sa-muted)" }}>{a.company}</div>
                <div>
                  <span className={severityChip(a.severity)}>{a.severity}</span>
                </div>
                <div className="sa-mono" style={{ fontSize: 11.5, color: "var(--sa-muted-light)", textAlign: "right" }}>
                  {a.time}
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ padding: "13px 20px", fontSize: 12.5, color: "var(--sa-muted)" }}>{AUDIT_PANEL.footer}</div>
      </div>
    </div>
  );
}

export function SettingsPanel() {
  const p = SETTINGS_PANEL.profile;

  return (
    <div>
      <PageHeader title="Platform settings" subtitle={SETTINGS_PANEL.subtitle} />

      <div className="sa-card" style={{ padding: 20, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, flexWrap: "wrap" }}>
          <span className="sa-user-avatar" style={{ width: 44, height: 44, fontSize: 14.5 }}>
            {PLATFORM.initials}
          </span>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>My profile</h3>
            <div style={{ fontSize: 12.5, color: "var(--sa-muted)", marginTop: 2 }}>{p.roleLine}</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 9 }}>
            <button type="button" className="sa-btn-ghost">Change password</button>
            <button type="button" className="sa-btn-primary" style={{ height: 36 }}>Save changes</button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {[
            { label: "Full name", value: p.name },
            { label: "Email address", value: p.email },
            { label: "Phone number", value: p.phone },
            { label: "Job title", value: p.title },
          ].map((field) => (
            <label key={field.label} style={{ display: "block" }}>
              <span style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#25384B", marginBottom: 5 }}>
                {field.label}
              </span>
              <input
                readOnly
                value={field.value}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  height: 42,
                  borderRadius: 11,
                  border: "1px solid var(--sa-border-warm)",
                  padding: "0 13px",
                  fontFamily: "inherit",
                  fontSize: 13.5,
                  color: "var(--sa-text)",
                  outline: "none",
                }}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="sa-card" style={{ padding: 20 }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700 }}>Platform staff</h3>
        <p style={{ margin: "0 0 12px", fontSize: 12.5, color: "var(--sa-muted)" }}>
          Scoped roles so finance and support do not need full super-admin rights.
        </p>
        {SETTINGS_PANEL.staff.map((s) => (
          <div
            key={s.email}
            style={{
              display: "grid",
              gridTemplateColumns: "1.6fr 1fr 1.4fr 80px",
              gap: 14,
              alignItems: "center",
              padding: "12px 0",
              borderTop: "1px solid var(--sa-bg-warm)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <span style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--sa-yellow)", color: "var(--sa-accent)", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700 }}>
                {s.initials}
              </span>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>{s.name}</div>
                <div className="sa-mono" style={{ fontSize: 11, color: "var(--sa-muted-light)" }}>{s.email}</div>
              </div>
            </div>
            <span className={statusChip(s.role)}>{s.role}</span>
            <div style={{ fontSize: 12, color: "var(--sa-muted)" }}>{s.scope}</div>
            <button type="button" className="sa-btn-link" style={{ justifyContent: "flex-end" }}>
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
