import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  Clock,
  MessageSquare,
  MoreHorizontal,
  Shield,
  Users,
} from "lucide-react";
import { getCompanyDetail } from "../data/qcMockData";

type Tab = "overview" | "usage" | "campaigns";

type CompanyHubPanelProps = {
  companyId: string;
  onBack: () => void;
};

function statusChip(status: string) {
  const map: Record<string, [string, string]> = {
    Paid: ["#E3F5EC", "#0E7A57"],
    Unpaid: ["#FBE9E7", "#C4362F"],
    Pending: ["#FDF0CF", "#8A5A00"],
    Refunded: ["#fff9e5", "#585858"],
    Published: ["#E3F5EC", "#0E7A57"],
    Draft: ["#FDF0CF", "#8A5A00"],
    "Not enabled": ["#fff9e5", "#585858"],
  };
  const [bg, fg] = map[status] ?? ["#fff9e5", "#585858"];
  return (
    <span className="sa-hub-chip" style={{ background: bg, color: fg }}>
      {status}
    </span>
  );
}

export function CompanyHubPanel({ companyId, onBack }: CompanyHubPanelProps) {
  const [tab, setTab] = useState<Tab>("overview");
  const [moreOpen, setMoreOpen] = useState(false);
  const [invoices, setInvoices] = useState<
    NonNullable<ReturnType<typeof getCompanyDetail>>["usageBilling"]["invoices"]
  >([]);
  const moreRef = useRef<HTMLDivElement>(null);
  const detail = getCompanyDetail(companyId);

  useEffect(() => {
    if (detail?.usageBilling?.invoices) {
      setInvoices(detail.usageBilling.invoices);
    }
  }, [companyId, detail]);

  useEffect(() => {
    if (!moreOpen) return;
    const close = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [moreOpen]);

  if (!detail) {
    return (
      <div>
        <button type="button" className="sa-hub-back" onClick={onBack}>
          <ArrowLeft size={14} strokeWidth={1.8} />
          All companies
        </button>
        <p style={{ marginTop: 24, fontSize: 14, color: "var(--sa-muted)" }}>Company not found.</p>
      </div>
    );
  }

  const seatsAvailable = Math.max(0, detail.seatsTotal - detail.seatsUsed);
  const usage = detail.usageBilling;
  const maxBar = Math.max(...usage.dailyMinutes);
  const unpaidCount = invoices.filter((i) => i.status === "Unpaid").length;

  const hubStats = [
    {
      icon: Clock,
      label: "Minutes used",
      value: detail.minsUsed.toLocaleString(),
      sub: `of ${detail.minsTotal.toLocaleString()} · ${detail.pct}%`,
    },
    {
      icon: MessageSquare,
      label: "Calls this month",
      value: detail.callsThisMonth.toLocaleString(),
      sub: detail.callsTrend,
      subGreen: true,
    },
    {
      icon: Shield,
      label: "Plan",
      value: detail.plan,
      sub: detail.planPrice,
    },
    {
      icon: Users,
      label: "Seats",
      value: `${detail.seatsUsed} / ${detail.seatsTotal}`,
      sub: `${seatsAvailable} available`,
    },
  ];

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "usage", label: "Usage & billing" },
    { id: "campaigns", label: "Campaigns" },
  ];

  return (
    <div className="sa-hub">
      <button type="button" className="sa-hub-back" onClick={onBack}>
        <ArrowLeft size={14} strokeWidth={1.8} />
        All companies
      </button>

      <div className="sa-hub-hero">
        <div className="sa-hub-hero-inner">
          <span className="sa-hub-avatar">{detail.initials}</span>
          <div className="sa-hub-hero-copy">
            <div className="sa-hub-title-row">
              <h1 className="sa-hub-title">{detail.name}</h1>
              {detail.access === "Active" ? (
                <span className="sa-hub-badge active">
                  <span className="sa-hub-badge-dot" />
                  Active
                </span>
              ) : (
                <span className="sa-hub-badge suspended">{detail.access}</span>
              )}
              {detail.invoiceUnpaid ? (
                <span className="sa-hub-badge unpaid">Invoice unpaid</span>
              ) : null}
            </div>
            <p className="sa-hub-meta sa-mono">
              {detail.id} · {detail.plan} plan · {detail.industry} · customer since{" "}
              {detail.customerSince} · account owner {detail.accountOwner}
            </p>
          </div>
          <div className="sa-hub-hero-actions" ref={moreRef}>
            <button
              type="button"
              className="sa-hub-more-btn"
              aria-label="More actions"
              onClick={() => setMoreOpen((o) => !o)}
            >
              <MoreHorizontal size={17} />
            </button>
            {moreOpen ? (
              <div className="sa-dropdown sa-hub-more-menu">
                <button type="button" className="sa-dropdown-item" onClick={() => setMoreOpen(false)}>
                  Change plan…
                </button>
                <button type="button" className="sa-dropdown-item" onClick={() => setMoreOpen(false)}>
                  Set minute allowance…
                </button>
                <button type="button" className="sa-dropdown-item danger" onClick={() => setMoreOpen(false)}>
                  Block company…
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="sa-hub-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`sa-hub-tab ${tab === t.id ? "active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" ? (
        <>
          <div className="sa-hub-stat-grid">
            {hubStats.map(({ icon: Icon, label, value, sub, subGreen }) => (
              <div key={label} className="sa-hub-stat-card">
                <span className="sa-hub-stat-icon">
                  <Icon size={17} strokeWidth={1.8} />
                </span>
                <div className="sa-hub-stat-label">{label}</div>
                <div className="sa-hub-stat-value">{value}</div>
                <div className={`sa-hub-stat-sub ${subGreen ? "green" : ""}`}>{sub}</div>
              </div>
            ))}
          </div>

          <div className="sa-hub-two-col">
            <div className="sa-card sa-hub-panel">
              <h3 className="sa-hub-panel-title">Onboarding progress</h3>
              <ul className="sa-hub-checklist">
                {detail.onboarding.map((step) => (
                  <li key={step.label}>
                    <span className={`sa-hub-check ${step.done ? "done" : "pending"}`}>
                      {step.done ? <Check size={11} strokeWidth={2.4} /> : null}
                    </span>
                    <span className="sa-hub-check-label">{step.label}</span>
                    <span className="sa-hub-check-when sa-mono">{step.meta}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sa-card sa-hub-panel">
              <div className="sa-hub-panel-head">
                <h3 className="sa-hub-panel-title">Account notes</h3>
                <button type="button" className="sa-hub-note-btn">
                  + Note
                </button>
              </div>
              <ul className="sa-hub-notes">
                {detail.notes.map((note, i) => (
                  <li key={`${note.when}-${i}`}>
                    <p className="sa-hub-note-body">{note.body}</p>
                    <p className="sa-hub-note-meta sa-mono">
                      {note.author} · {note.when}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : null}

      {tab === "usage" ? (
        <>
          <div className="sa-hub-usage-grid">
            <div className="sa-card sa-hub-panel">
              <h3 className="sa-hub-panel-title">Minutes processed</h3>
              <p className="sa-hub-panel-sub">{usage.chartSubtitle}</p>
              <div className="sa-hub-bars">
                {usage.dailyMinutes.map((v, i) => {
                  const highlight = i + 1 >= usage.highlightFromDay;
                  return (
                    <div
                      key={i}
                      className={`sa-hub-bar ${highlight ? "warn" : ""}`}
                      style={{ height: `${Math.max(8, Math.round((v / maxBar) * 100))}%` }}
                      title={`Day ${i + 1}: ${v} min`}
                    />
                  );
                })}
              </div>
              <div className="sa-hub-bar-labels sa-mono">
                <span>{usage.chartLabels[0]}</span>
                <span>{usage.chartLabels[usage.chartLabels.length - 1]}</span>
              </div>
            </div>

            <div className="sa-card sa-hub-panel">
              <h3 className="sa-hub-panel-title">This period</h3>
              <ul className="sa-hub-period-stats">
                {usage.periodStats.map((stat) => (
                  <li key={stat.label}>
                    <span>{stat.label}</span>
                    <span className="sa-mono">{stat.value}</span>
                  </li>
                ))}
              </ul>
              <div className="sa-hub-warning-box">
                <div className="sa-hub-warning-title">{usage.warningTitle}</div>
                <div className="sa-hub-warning-body">{usage.warningBody}</div>
              </div>
            </div>
          </div>

          <div className="sa-card sa-hub-invoices">
            <div className="sa-hub-invoices-head">
              <h3 className="sa-hub-panel-title">Invoices</h3>
              {unpaidCount > 0 ? (
                <span className="sa-hub-unpaid-badge">{unpaidCount} unpaid</span>
              ) : null}
              {unpaidCount > 0 ? (
                <button
                  type="button"
                  className="sa-btn-yellow sa-hub-mark-paid"
                  onClick={() =>
                    setInvoices((rows) =>
                      rows.map((inv) =>
                        inv.status === "Unpaid" ? { ...inv, status: "Paid", reason: "—" } : inv,
                      ),
                    )
                  }
                >
                  Mark as paid
                </button>
              ) : null}
            </div>
            <div className="sa-hub-invoice-grid-head sa-mono">
              <div>Invoice ↕</div>
              <div>Period ↕</div>
              <div>Amount ↕</div>
              <div>Status</div>
              <div>Reason if unpaid</div>
            </div>
            {invoices.map((inv) => (
              <div key={inv.id} className="sa-hub-invoice-row">
                <div className="sa-mono sa-hub-invoice-id">{inv.id}</div>
                <div>{inv.period}</div>
                <div className="sa-mono">{inv.amount}</div>
                <div>{statusChip(inv.status)}</div>
                <div className={inv.reason !== "—" ? "sa-hub-reason-unpaid" : ""}>{inv.reason}</div>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {tab === "campaigns" ? (
        <div className="sa-card sa-hub-panel">
          <h3 className="sa-hub-panel-title">Campaigns</h3>
          <p className="sa-hub-panel-sub">{detail.campaigns.intro}</p>
          <ul className="sa-hub-campaigns">
            {detail.campaigns.items.map((campaign) => (
              <li key={campaign.name}>
                <div>
                  <div className="sa-hub-campaign-name">{campaign.name}</div>
                  <div className="sa-hub-campaign-detail">{campaign.detail}</div>
                </div>
                {statusChip(campaign.status)}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
