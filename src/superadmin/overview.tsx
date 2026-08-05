import { useState } from "react";
import {
  Plus,
  AlertTriangle,
  TrendingUp,
  Globe,
  Clock,
  Users,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import {
  PLATFORM,
  KPI,
  REVENUE_CHART,
  BUSIEST_COMPANIES,
  MINUTE_CAP_COMPANIES,
  SYSTEM_STATUS,
  SYSTEM_STATUS_FOOTER,
} from "../data/qcMockData";
import { AddClientWorkspaceModal } from "../AddClientWorkspaceModal";

type ChartPoint = { x: number; y: number; label: string; value: string; display?: boolean };

const ORG_COLORS: Record<string, string> = {
  H: "#1a1a1a",
  V: "#1a1a1a",
  N: "#8A5A00",
  M: "#2F5FA8",
  C: "#0E7A57",
};

const REV_SETS = {
  Monthly: {
    max: 2400,
    axis: ["$2.4k", "$1.8k", "$1.2k", "$600", "0"],
    sub: "Revenue billed each month · 2026 · August is still in progress",
    data: REVENUE_CHART.months
      .filter((m) => m.value != null)
      .map((m) => [m.label, m.value!] as [string, number]),
  },
  Yearly: {
    max: 30000,
    axis: ["$30k", "$22.5k", "$15k", "$7.5k", "0"],
    sub: "Revenue billed each year · 2026 is a projection from the current run-rate",
    data: [
      ["2023", 8400],
      ["2024", 14200],
      ["2025", 21600],
      ["2026", 28100],
    ] as [string, number][],
  },
};

function smoothPath(pts: ChartPoint[]): string {
  if (pts.length < 3) {
    return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  }
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 3.2;
    const c1y = p1.y + (p2.y - p0.y) / 3.2;
    const c2x = p2.x - (p3.x - p1.x) / 3.2;
    const c2y = p2.y - (p3.y - p1.y) / 3.2;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}

function statusChipClass(state: string): string {
  if (state === "Operational") return "sa-chip success";
  if (state === "Degraded") return "sa-chip warn";
  return "sa-chip danger";
}

function statusDotClass(state: string): string {
  if (state === "Operational") return "sa-severity-dot low";
  if (state === "Degraded") return "sa-severity-dot medium";
  return "sa-severity-dot high";
}

type OverviewProps = {
  onNavigate: (id: string) => void;
};

export function OverviewPanel({ onNavigate }: OverviewProps) {
  const [addOpen, setAddOpen] = useState(false);
  const [revView, setRevView] = useState<"Monthly" | "Yearly">("Monthly");

  const revSet = REV_SETS[revView];
  const revN = revSet.data.length;
  const revPts: ChartPoint[] = revSet.data.map(([label, v], i) => ({
    x: revN > 1 ? (i / (revN - 1)) * 100 : 50,
    y: 94 - Math.min(94, (v / revSet.max) * 84),
    label,
    value: v >= 10000 ? `$${(v / 1000).toFixed(1)}k` : `$${(v / 1000).toFixed(2)}k`,
    display: i === revN - 1,
  }));
  const revPath = smoothPath(revPts);
  const revAreaPath = `${revPath} L100,100 L0,100 Z`;
  const lastPt = revPts[revPts.length - 1];

  const kpis = [
    {
      icon: TrendingUp,
      label: "Monthly recurring revenue",
      value: KPI.mrr.value,
      of: "",
      sub: `${KPI.mrr.trend} · ARR $28.1k`,
      pct: 82,
      barColor: "#0E7A57",
      go: () => onNavigate("billing"),
    },
    {
      icon: Globe,
      label: "Active companies",
      value: String(KPI.companies.active),
      of: `/ ${KPI.companies.total}`,
      sub: KPI.companies.sub,
      pct: Math.round((KPI.companies.active / KPI.companies.total) * 100),
      barColor: "#2F5FA8",
      go: () => onNavigate("companies"),
    },
    {
      icon: Clock,
      label: "Minutes used",
      value: KPI.minutes.used.toLocaleString(),
      of: `/ ${KPI.minutes.total.toLocaleString()}`,
      sub: KPI.minutes.sub,
      pct: Math.round((KPI.minutes.used / KPI.minutes.total) * 100),
      barColor: "#8A5A00",
      go: () => onNavigate("companies"),
    },
    {
      icon: Users,
      label: "Seats used",
      value: String(KPI.seats.used),
      of: `/ ${KPI.seats.total}`,
      sub: KPI.seats.sub,
      pct: Math.round((KPI.seats.used / KPI.seats.total) * 100),
      barColor: "#ffd54f",
      go: () => onNavigate("companies"),
    },
  ];

  return (
    <div>
      <div className="sa-page-header">
        <div>
          <h1 className="sa-page-title">Good morning, {PLATFORM.adminName}</h1>
          <p className="sa-page-subtitle">
            Platform performance and insights · {PLATFORM.dateRange} · refreshed{" "}
            {PLATFORM.refreshedAgo}
          </p>
        </div>
        <button type="button" className="sa-btn-primary" onClick={() => setAddOpen(true)}>
          <Plus size={15} strokeWidth={2} />
          Add Organization
        </button>
      </div>

      <div className="sa-critical-bar">
        <span className="sa-critical-icon">
          <AlertTriangle size={17} strokeWidth={1.8} />
        </span>
        <span className="sa-critical-summary">{PLATFORM.criticalIssues} critical issues</span>
        <span className="sa-critical-divider" />
        <span className="sa-critical-lead">{PLATFORM.alertSummary}</span>
        <button type="button" className="sa-btn-yellow" style={{ marginLeft: "auto" }} onClick={() => onNavigate("alerts")}>
          View all
        </button>
      </div>

      <div className="sa-kpi-grid">
        {kpis.map((k) => (
          <button
            key={k.label}
            type="button"
            className="sa-card sa-kpi-card"
            onClick={k.go}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
              <span className="sa-kpi-icon">
                <k.icon size={16} strokeWidth={1.8} />
              </span>
              <span className="sa-kpi-label">{k.label}</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
              <span className="sa-kpi-value">{k.value}</span>
              {k.of ? <span className="sa-kpi-of">{k.of}</span> : null}
            </div>
            <div className="sa-kpi-track">
              <div
                className="sa-kpi-bar"
                style={{
                  width: `${k.pct}%`,
                  background: k.pct >= 90 ? "#C4362F" : k.barColor,
                }}
              />
            </div>
            <div className="sa-kpi-sub">{k.sub}</div>
          </button>
        ))}
      </div>

      <div className="sa-card sa-revenue-chart">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Revenue</h3>
          <div className="sa-pill-toggle">
            {(["Monthly", "Yearly"] as const).map((option) => (
              <button
                key={option}
                type="button"
                className={`sa-pill-toggle-btn ${revView === option ? "active" : ""}`}
                onClick={() => setRevView(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <p style={{ margin: "0 0 18px", fontSize: 12.5, color: "var(--sa-muted)" }}>{revSet.sub}</p>
        <div style={{ display: "flex", gap: 12 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: 190,
              fontFamily: "var(--sa-mono)",
              fontSize: 10.5,
              color: "var(--sa-muted-light)",
              textAlign: "right",
            }}
          >
            {revSet.axis.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sa-chart-area">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d={revAreaPath} fill="#ffd54f" opacity={0.22} />
                <path
                  d={revPath}
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              {lastPt?.display ? (
                <>
                  <span
                    style={{
                      position: "absolute",
                      left: `${lastPt.x}%`,
                      top: `${lastPt.y}%`,
                      transform: "translate(-50%, calc(-100% - 14px))",
                      fontFamily: "var(--sa-mono)",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#1a1a1a",
                      whiteSpace: "nowrap",
                      background: "#ffd54f",
                      padding: "3px 8px",
                      borderRadius: 6,
                    }}
                  >
                    {lastPt.value}
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      left: `${lastPt.x}%`,
                      top: `${lastPt.y}%`,
                      width: 13,
                      height: 13,
                      borderRadius: "50%",
                      background: "#ffd54f",
                      border: "2.5px solid #1a1a1a",
                      transform: "translate(-50%, -50%)",
                      boxShadow: "0 1px 3px rgba(40,34,12,.2)",
                    }}
                  />
                </>
              ) : null}
            </div>
            <div style={{ display: "flex", gap: 12, padding: "0 10px", marginTop: 9 }}>
              {revPts.map((p) => (
                <span
                  key={p.label}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontFamily: "var(--sa-mono)",
                    fontSize: 10.5,
                    color: "var(--sa-muted-light)",
                  }}
                >
                  {p.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="sa-grid-2">
        <div className="sa-card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Busiest companies</h3>
            <span className="sa-mono" style={{ fontSize: 11, color: "var(--sa-muted)" }}>
              this month
            </span>
          </div>
          <div
            className="sa-table-header"
            style={{ gridTemplateColumns: "22px 1fr 62px 74px" }}
          >
            <div />
            <div>Company</div>
            <div style={{ textAlign: "right" }}>Calls</div>
            <div style={{ textAlign: "right" }}>Minutes</div>
          </div>
          {BUSIEST_COMPANIES.map((o) => (
            <div
              key={o.rank}
              className="sa-table-row"
              style={{ gridTemplateColumns: "22px 1fr 62px 74px" }}
            >
              <span className="sa-mono" style={{ fontSize: 11.5, color: "var(--sa-muted-light)" }}>
                {o.rank}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
                <span
                  className="sa-avatar sa-avatar-sm"
                  style={{ background: ORG_COLORS[o.initials] ?? "#6B6759" }}
                >
                  {o.initials}
                </span>
                <span style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {o.name}
                </span>
              </div>
              <span className="sa-mono" style={{ fontSize: 12.5, color: "var(--sa-muted)", textAlign: "right" }}>
                {o.calls.toLocaleString()}
              </span>
              <span className="sa-mono" style={{ fontSize: 12.5, fontWeight: 600, textAlign: "right" }}>
                {o.minutes.toLocaleString()}
              </span>
            </div>
          ))}
          <button type="button" className="sa-btn-link" style={{ margin: "12px 0 0 auto" }} onClick={() => onNavigate("companies")}>
            View all companies
            <ArrowRight size={14} strokeWidth={1.9} />
          </button>
        </div>

        <div className="sa-card-dark sa-minute-cap">
          <div className="sa-minute-cap-header">
            <h3 className="sa-minute-cap-title">Closest to their minute cap</h3>
            <button type="button" className="sa-minute-cap-expand" onClick={() => onNavigate("companies")} aria-label="View all">
              <ArrowUpRight size={16} strokeWidth={1.8} />
            </button>
          </div>
          <div style={{ textAlign: "right", marginBottom: 18 }}>
            <button
              type="button"
              onClick={() => onNavigate("companies")}
              style={{ fontSize: 13, fontWeight: 600, color: "#8E8A7C", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
            >
              View all
            </button>
          </div>
          {MINUTE_CAP_COMPANIES.map((t) => {
            const pct = Math.round((t.used / t.cap) * 100);
            return (
              <div key={t.name} className="sa-minute-cap-item">
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, marginBottom: 9 }}>
                  <span style={{ fontWeight: 600, color: "#fff" }}>{t.name}</span>
                  <span className="sa-mono" style={{ color: "#8E8A7C", fontSize: 13 }}>
                    {t.used.toLocaleString()} / {t.cap.toLocaleString()}
                  </span>
                </div>
                <div className="sa-minute-cap-track">
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      borderRadius: 999,
                      background: pct >= 80 ? "#ffd54f" : "rgba(255,255,255,0.4)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="sa-card" style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>System status</h3>
          <button type="button" className="sa-btn-link" onClick={() => onNavigate("system")}>
            Details
          </button>
        </div>
        <div className="sa-system-grid">
          {SYSTEM_STATUS.map((s) => (
            <div key={s.label} className="sa-system-item">
              <span className={statusDotClass(s.state)} />
              <span style={{ flex: 1, minWidth: 0, fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {s.label}
              </span>
              <span className={statusChipClass(s.state)}>{s.state}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, fontSize: 12, color: "var(--sa-muted-light)", lineHeight: 1.5 }}>
          {SYSTEM_STATUS_FOOTER}
        </div>
      </div>

      <AddClientWorkspaceModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}
