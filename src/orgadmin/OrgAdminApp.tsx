import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Search,
  LayoutDashboard,
  Users,
  ShieldCheck,
  Zap,
  ClipboardList,
  BarChart3,
  FileText,
  Clock,
  Settings,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import {
  ORG_PLATFORM,
  ORG_NAV_SECTIONS,
  ORG_PANEL_LABELS,
  ORG_CRITICAL_ATTENTION,
  ORG_ALERTS,
} from "../data/orgMockData";
import { AskAIModal } from "../AskAIModal";
import { OverviewPanel } from "./overview";
import {
  UsersPanel,
  RolesPanel,
  BillingPanel,
  CampaignsPanel,
  AgentsPanel,
  AlertsPanel,
  ReportsPanel,
  ActivityPanel,
  SettingsPanel,
} from "./panels";
import "./orgadmin.css";

const NAV_ICONS: Record<string, typeof LayoutDashboard> = {
  home: LayoutDashboard,
  users: Users,
  shield: ShieldCheck,
  bolt: Zap,
  clipboard: ClipboardList,
  chart: BarChart3,
  bell: Bell,
  file: FileText,
  clock: Clock,
  settings: Settings,
};

function QcLogo() {
  return (
    <svg viewBox="0 0 32 32" className="oa-sidebar-logo-svg" aria-hidden>
      <rect x="0" y="0" width="32" height="32" rx="9" fill="#1a1a1a" />
      <circle cx="13.5" cy="14" r="6.3" stroke="#ffd54f" strokeWidth="2.5" fill="none" />
      <path
        d="M17 17.3l2.8 3 5.6-9.3"
        stroke="#ffd54f"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

type OrgAdminAppProps = {
  onLogout: () => void;
};

export function OrgAdminApp({ onLogout }: OrgAdminAppProps) {
  const [activePanel, setActivePanel] = useState("overview");
  const [askAiOpen, setAskAiOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [bellMenuOpen, setBellMenuOpen] = useState(false);
  const [bellRead, setBellRead] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const bellMenuRef = useRef<HTMLDivElement>(null);

  const crumb = ORG_PANEL_LABELS[activePanel] ?? "Overview";
  const alertsCount = bellRead ? 0 : ORG_ALERTS.length;
  const bellItems = ORG_CRITICAL_ATTENTION.slice(0, 3);

  useEffect(() => {
    if (!userMenuOpen && !bellMenuOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (userMenuOpen && userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (bellMenuOpen && bellMenuRef.current && !bellMenuRef.current.contains(event.target as Node)) {
        setBellMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setUserMenuOpen(false);
        setBellMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [userMenuOpen, bellMenuOpen]);

  return (
    <div className="oa-app">
      <div className="oa-shell">
        <aside className="oa-sidebar">
          <div className="oa-sidebar-strip">
            <span className="oa-sidebar-strip-mark" aria-hidden />
            Zeki Expert Solutions
          </div>
          <div className="oa-sidebar-brand">
            <QcLogo />
            <span className="oa-sidebar-title">QC Tool</span>
            <span className="oa-sidebar-badge">{ORG_PLATFORM.plan.toUpperCase()}</span>
          </div>

          <nav className="oa-nav">
            {ORG_NAV_SECTIONS.map((section) => (
              <div key={section.label}>
                <div className="oa-nav-section">{section.label}</div>
                {section.items.map((item) => {
                  const Icon = NAV_ICONS[item.icon] ?? LayoutDashboard;
                  const isActive = activePanel === item.id;
                  const isDanger = item.id === "alerts";
                  const badge = "badge" in item ? item.badge : undefined;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`oa-nav-item ${isActive ? "active" : ""}`}
                      onClick={() => setActivePanel(item.id)}
                    >
                      <Icon size={18} strokeWidth={1.75} />
                      <span>{item.label}</span>
                      {badge ? (
                        <span className={`oa-nav-badge ${isDanger && !isActive ? "danger" : ""}`}>
                          {badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          <div className="oa-sidebar-footer">
            <span className="oa-status-dot" />
            {ORG_PLATFORM.workspace} · {ORG_PLATFORM.workspaceCode}
          </div>
        </aside>

        <div className="oa-main-col">
          <header className="oa-header">
            <div className="oa-breadcrumb">
              {ORG_PLATFORM.workspace}
              <span className="oa-breadcrumb-sep">/</span>
              <span className="oa-breadcrumb-current">{crumb}</span>
            </div>

            <div className="oa-header-actions">
              <button type="button" className="oa-search-btn">
                <Search size={17} strokeWidth={1.7} />
                <span style={{ flex: 1, whiteSpace: "nowrap", fontSize: 12.5 }}>Search or run a command…</span>
              </button>

              <button type="button" className="oa-ask-ai-btn" onClick={() => setAskAiOpen(true)}>
                <Sparkles size={16} strokeWidth={1.8} />
                Ask AI
              </button>

              <div style={{ position: "relative" }} ref={bellMenuRef}>
                <button
                  type="button"
                  className="oa-icon-btn"
                  aria-label="Notifications"
                  onClick={() => {
                    setBellMenuOpen((o) => !o);
                    setUserMenuOpen(false);
                  }}
                >
                  <Bell size={19} strokeWidth={1.7} />
                  {alertsCount > 0 ? <span className="oa-bell-badge">{alertsCount}</span> : null}
                </button>
                {bellMenuOpen ? (
                  <div className="oa-dropdown" style={{ width: 300 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 8px 10px" }}>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>Alerts</span>
                      <button
                        type="button"
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          fontFamily: "inherit",
                          fontSize: 11.5,
                          fontWeight: 600,
                          color: "var(--oa-accent-secondary)",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setBellRead(true);
                          setBellMenuOpen(false);
                        }}
                      >
                        Mark as read
                      </button>
                    </div>
                    {bellItems.length === 0 ? (
                      <div style={{ padding: "22px 8px", textAlign: "center", fontSize: 12.5, color: "var(--oa-muted-light)" }}>
                        No pending alerts.
                      </div>
                    ) : (
                      bellItems.map((b, i) => (
                        <button
                          key={b.id}
                          type="button"
                          className="oa-bell-item"
                          onClick={() => {
                            setActivePanel("alerts");
                            setBellMenuOpen(false);
                          }}
                        >
                          <span className={`oa-severity-dot ${i === 0 ? "high" : b.severity === "high" ? "high" : "medium"}`} />
                          <span style={{ minWidth: 0, flex: 1 }}>
                            <span style={{ display: "block", fontSize: 13, fontWeight: 600, lineHeight: 1.35 }}>{b.title}</span>
                            <span style={{ display: "block", fontSize: 11.5, color: "var(--oa-muted-light)", marginTop: 2 }}>{b.tag}</span>
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                ) : null}
              </div>

              <div style={{ position: "relative" }} ref={userMenuRef}>
                <button
                  type="button"
                  className="oa-user-btn"
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                  onClick={() => {
                    setUserMenuOpen((o) => !o);
                    setBellMenuOpen(false);
                  }}
                >
                  <span className="oa-user-avatar">{ORG_PLATFORM.initials}</span>
                  <span>
                    <span className="oa-user-name">{ORG_PLATFORM.displayName}</span>
                    <span className="oa-user-role">{ORG_PLATFORM.role}</span>
                  </span>
                  <ChevronDown size={14} strokeWidth={1.8} color="#6B6759" />
                </button>
                {userMenuOpen ? (
                  <div className="oa-dropdown">
                    <div className="oa-dropdown-header">
                      <div style={{ fontSize: 13.5, fontWeight: 600 }}>{ORG_PLATFORM.displayName}</div>
                      <div className="oa-mono" style={{ fontSize: 11, color: "var(--oa-muted-light)" }}>
                        {ORG_PLATFORM.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="oa-dropdown-item"
                      onClick={() => {
                        setUserMenuOpen(false);
                        setActivePanel("settings");
                      }}
                    >
                      My profile
                    </button>
                    <button
                      type="button"
                      className="oa-dropdown-item"
                      onClick={() => {
                        setUserMenuOpen(false);
                        setActivePanel("settings");
                      }}
                    >
                      Workspace settings
                    </button>
                    <button
                      type="button"
                      className="oa-dropdown-item danger"
                      onClick={() => {
                        setUserMenuOpen(false);
                        onLogout();
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </header>

          <main className="oa-content">
            {activePanel === "overview" && <OverviewPanel onNavigate={setActivePanel} />}
            {activePanel === "users" && <UsersPanel />}
            {activePanel === "roles" && <RolesPanel />}
            {activePanel === "billing" && <BillingPanel />}
            {activePanel === "campaigns" && <CampaignsPanel />}
            {activePanel === "agents" && <AgentsPanel onNavigate={setActivePanel} />}
            {activePanel === "alerts" && <AlertsPanel onNavigate={setActivePanel} />}
            {activePanel === "reports" && <ReportsPanel />}
            {activePanel === "activity" && <ActivityPanel />}
            {activePanel === "settings" && <SettingsPanel />}
          </main>
        </div>
      </div>

      <AskAIModal open={askAiOpen} onClose={() => setAskAiOpen(false)} />
    </div>
  );
}
