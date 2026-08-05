import {
  AlertTriangle,
  Users,
  BarChart3,
  Zap,
  CheckCircle2,
} from "lucide-react";
import {
  ORG_PLATFORM,
  ORG_OVERVIEW_KPIS,
  ORG_CRITICAL_ATTENTION,
  ORG_USAGE_CHART,
  ORG_PLAN_LIMITS,
  ORG_COACHING_QUEUE,
  ORG_RECENT_ACTIVITY,
} from "../data/orgMockData";

const KPI_ICONS = [Users, BarChart3, Zap, CheckCircle2];

function severityDotClass(severity: string): string {
  if (severity === "high") return "oa-severity-dot high";
  if (severity === "medium") return "oa-severity-dot medium";
  return "oa-severity-dot low";
}

function qaPillClass(qa: number): string {
  if (qa >= 85) return "oa-qa-pill high";
  if (qa >= 75) return "oa-qa-pill mid";
  return "oa-qa-pill low";
}

type OverviewProps = {
  onNavigate: (id: string) => void;
};

export function OverviewPanel({ onNavigate }: OverviewProps) {
  const attention = ORG_CRITICAL_ATTENTION;
  const minPct = ORG_PLAN_LIMITS.usagePct;
  const gaugeColor = "#1a1a1a";
  const gaugeOffset = Math.round(314 - (314 * minPct) / 100);
  const minutesLeft = ORG_PLATFORM.planMinutes - ORG_PLAN_LIMITS.minutes.used;

  return (
    <div>
      <div style={{ marginBottom: 18 }}>
        <h1 className="oa-page-title">Good morning, {ORG_PLATFORM.firstName}</h1>
        <p className="oa-page-subtitle">
          Manage {ORG_PLATFORM.workspace} — users, quality and billing for your {ORG_PLATFORM.plan} workspace.
        </p>
      </div>

      {attention.length > 0 ? (
        <div className="oa-critical-bar">
          <span className="oa-critical-icon">
            <AlertTriangle size={17} strokeWidth={1.8} />
          </span>
          <span className="oa-critical-summary">
            {attention.length === 1 ? "1 item needs attention" : `${attention.length} items need attention`}
          </span>
          <span className="oa-critical-divider" />
          <span className="oa-critical-lead">{attention.map((a) => a.title).join(" · ")}</span>
          <button type="button" className="oa-btn-yellow" style={{ marginLeft: "auto" }} onClick={() => onNavigate("alerts")}>
            View all
          </button>
        </div>
      ) : null}

      <div className="oa-kpi-grid">
        {ORG_OVERVIEW_KPIS.map((k, i) => {
          const Icon = KPI_ICONS[i] ?? Users;
          return (
            <div key={k.label} className="oa-card oa-kpi-card">
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
                <span className="oa-kpi-icon">
                  <Icon size={16} strokeWidth={1.8} />
                </span>
                <span className="oa-kpi-label">{k.label}</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
                <span className="oa-kpi-value">{k.value}</span>
                {k.of ? <span className="oa-kpi-of">{k.of}</span> : null}
              </div>
              <div className="oa-kpi-sub">{k.sub}</div>
            </div>
          );
        })}
      </div>

      <div className="oa-grid-usage">
        <div className="oa-card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{ORG_USAGE_CHART.title}</h3>
            <span className="oa-live-badge">
              <span className="oa-live-dot" />
              Live
            </span>
          </div>
          <p style={{ margin: "0 0 18px", fontSize: 12.5, color: "var(--oa-muted)" }}>{ORG_USAGE_CHART.subtitle}</p>
          <div className="oa-usage-bars">
            {ORG_USAGE_CHART.days.map((day, i) => {
              const h = Math.round((day.value / ORG_USAGE_CHART.maxValue) * 100);
              return (
                <div
                  key={i}
                  className={`oa-usage-bar ${day.highlight ? "highlight" : ""}`}
                  style={{ height: `${h}%` }}
                  title={day.label || undefined}
                />
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "var(--oa-mono)",
              fontSize: 10.5,
              color: "var(--oa-muted-light)",
              marginTop: 9,
            }}
          >
            <span>14d ago</span>
            <span>Today</span>
          </div>
        </div>

        <div className="oa-card" style={{ padding: 20, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 1 }}>Plan limits</div>
          <div style={{ fontSize: 12.5, color: "var(--oa-muted)", marginBottom: 12 }}>This billing cycle</div>
          <div className="oa-gauge-wrap">
            <svg viewBox="0 0 120 120" className="oa-gauge-svg">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#fff9e5" strokeWidth="12" />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke={gaugeColor}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="314"
                strokeDashoffset={gaugeOffset}
              />
            </svg>
          </div>
          <div className="oa-gauge-pct">{minPct}%</div>
          <div className="oa-gauge-caption">of minutes used this cycle</div>
          <div style={{ fontSize: 12, color: "var(--oa-muted)", textAlign: "center", lineHeight: 1.5 }}>
            Renews {ORG_PLATFORM.planRenewal}
            {minPct > 85 ? " — nearing cap, consider upgrading" : ""}
          </div>
          <button type="button" className="oa-btn-ghost" style={{ marginTop: 16 }} onClick={() => onNavigate("billing")}>
            Manage plan
          </button>
          <div style={{ marginTop: 12, fontSize: 11, color: "var(--oa-muted-light)", textAlign: "center" }}>
            {minutesLeft} min remaining · {ORG_PLAN_LIMITS.users.used}/{ORG_PLAN_LIMITS.users.total} users
          </div>
        </div>
      </div>

      <div className="oa-grid-2">
        <div className="oa-card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 1 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Coaching queue</h3>
            <button type="button" className="oa-btn-link" onClick={() => onNavigate("agents")}>
              Agent Performance
            </button>
          </div>
          <p style={{ margin: "0 0 12px", fontSize: 12, color: "var(--oa-muted)" }}>Agents below QA threshold this month</p>
          {ORG_COACHING_QUEUE.length === 0 ? (
            <div style={{ padding: "20px 0", textAlign: "center", fontSize: 12.5, color: "var(--oa-muted-light)" }}>
              Everyone is above threshold — nice work.
            </div>
          ) : (
            ORG_COACHING_QUEUE.map((u) => (
              <div key={u.initials} className="oa-queue-row">
                <span className="oa-avatar-warm">{u.initials}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {u.name}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--oa-muted-light)" }}>
                    {u.role} · trend {u.trend}
                  </div>
                </div>
                <span className={qaPillClass(u.qa)}>{u.qa}</span>
                <button type="button" className="oa-btn-ghost" style={{ height: 28, padding: "0 11px", fontSize: 11.5 }} onClick={() => onNavigate("agents")}>
                  Coach
                </button>
              </div>
            ))
          )}
        </div>

        <div className="oa-card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Recent activity</h3>
            <button type="button" className="oa-btn-link" onClick={() => onNavigate("activity")}>
              Audit log
            </button>
          </div>
          {ORG_RECENT_ACTIVITY.map((e, i) => (
            <div key={i} className="oa-activity-row">
              <span className={severityDotClass(e.severity)} style={{ marginTop: 5 }} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, color: "#25384B", lineHeight: 1.4 }}>{e.action}</div>
                <div className="oa-mono" style={{ fontSize: 11, color: "var(--oa-muted-light)" }}>
                  {e.actor} · {e.when}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
