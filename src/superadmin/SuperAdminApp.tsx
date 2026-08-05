import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Search,
  LayoutDashboard,
  Building2,
  Zap,
  BarChart3,
  ClipboardList,
  ShieldCheck,
  Settings,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import {
  PLATFORM,
  NAV_SECTIONS,
  PANEL_LABELS,
  REQUESTS_PANEL,
} from "../data/qcMockData";
import { AskAIModal } from "../AskAIModal";
import { OverviewPanel } from "./overview";
import {
  AlertsPanel,
  CompaniesPanel,
  BillingPanel,
  SystemPanel,
  RequestsPanel,
  AuditPanel,
  SettingsPanel,
} from "./panels";
import "./superadmin.css";

const NAV_ICONS: Record<string, typeof LayoutDashboard> = {
  home: LayoutDashboard,
  bell: Bell,
  building: Building2,
  bolt: Zap,
  chart: BarChart3,
  clipboard: ClipboardList,
  shield: ShieldCheck,
  settings: Settings,
};

const DANGER_BADGE_IDS = new Set(["alerts", "billing", "system"]);

type SuperAdminAppProps = {
  onLogout: () => void;
};

export function SuperAdminApp({ onLogout }: SuperAdminAppProps) {
  const [hubCrumb, setHubCrumb] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState("overview");
  const [askAiOpen, setAskAiOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [bellMenuOpen, setBellMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const bellMenuRef = useRef<HTMLDivElement>(null);

  const crumb = hubCrumb ?? PANEL_LABELS[activePanel] ?? "Platform";

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

  const bellItems = REQUESTS_PANEL.items.filter((r) => r.status === "Pending");

  return (
    <div className="sa-app">
      <div className="sa-shell">
        <aside className="sa-sidebar">
          <div className="sa-sidebar-strip">
            <span className="sa-sidebar-strip-mark" aria-hidden />
            Zeki Expert Solutions
          </div>
          <div className="sa-sidebar-brand">
            <span className="sa-sidebar-logo">Q</span>
            <span className="sa-sidebar-title">QCTool</span>
            <span className="sa-sidebar-badge">SUPER</span>
          </div>

          <nav className="sa-nav">
            {NAV_SECTIONS.map((section) => (
              <div key={section.label}>
                <div className="sa-nav-section">{section.label}</div>
                {section.items.map((item) => {
                  const Icon = NAV_ICONS[item.icon] ?? LayoutDashboard;
                  const isActive = activePanel === item.id;
                  const isDanger = DANGER_BADGE_IDS.has(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`sa-nav-item ${isActive ? "active" : ""}`}
                      onClick={() => {
                        setHubCrumb(null);
                        setActivePanel(item.id);
                      }}
                    >
                      <Icon size={18} strokeWidth={1.75} />
                      <span>{item.label}</span>
                      {item.badge ? (
                        <span className={`sa-nav-badge ${isDanger && !isActive ? "danger" : ""}`}>
                          {item.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          <div className="sa-sidebar-footer">
            <span className="sa-status-dot" />
            All systems operational
          </div>
        </aside>

        <div className="sa-main-col">
          <header className="sa-header">
            <div className="sa-breadcrumb">
              Zeki Platform Control
              <span className="sa-breadcrumb-sep">/</span>
              <span className="sa-breadcrumb-current">{crumb}</span>
            </div>

            <div className="sa-header-actions">
              <button type="button" className="sa-search-btn">
                <Search size={17} strokeWidth={1.7} />
                <span style={{ flex: 1, whiteSpace: "nowrap", fontSize: 12.5 }}>Search or run a command…</span>
              </button>

              <button type="button" className="sa-ask-ai-btn" onClick={() => setAskAiOpen(true)}>
                <Sparkles size={16} strokeWidth={1.8} />
                Ask AI
              </button>

              <div style={{ position: "relative" }} ref={bellMenuRef}>
                <button
                  type="button"
                  className="sa-icon-btn"
                  aria-label="Notifications"
                  onClick={() => {
                    setBellMenuOpen((o) => !o);
                    setUserMenuOpen(false);
                  }}
                >
                  <Bell size={19} strokeWidth={1.7} />
                  {bellItems.length > 0 ? (
                    <span className="sa-bell-badge">{bellItems.length}</span>
                  ) : null}
                </button>
                {bellMenuOpen ? (
                  <div className="sa-dropdown" style={{ width: 280 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 8px 10px" }}>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>Requests</span>
                      <button
                        type="button"
                        style={{ background: "none", border: "none", padding: 0, fontFamily: "inherit", fontSize: 11.5, fontWeight: 600, color: "var(--sa-accent-secondary)", cursor: "pointer" }}
                        onClick={() => setBellMenuOpen(false)}
                      >
                        Mark as read
                      </button>
                    </div>
                    {bellItems.length === 0 ? (
                      <div style={{ padding: "22px 8px", textAlign: "center", fontSize: 12.5, color: "var(--sa-muted-light)" }}>
                        No pending requests.
                      </div>
                    ) : (
                      bellItems.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          className="sa-bell-item"
                          onClick={() => {
                            setActivePanel("requests");
                            setBellMenuOpen(false);
                          }}
                        >
                          <span className="sa-severity-dot high" />
                          <span style={{ minWidth: 0, flex: 1 }}>
                            <span style={{ display: "block", fontSize: 13, fontWeight: 600, lineHeight: 1.35 }}>
                              {b.title}
                            </span>
                            <span style={{ display: "block", fontSize: 11.5, color: "var(--sa-muted-light)", marginTop: 2 }}>
                              {b.meta}
                            </span>
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
                  className="sa-user-btn"
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                  onClick={() => {
                    setUserMenuOpen((o) => !o);
                    setBellMenuOpen(false);
                  }}
                >
                  <span className="sa-user-avatar">{PLATFORM.initials}</span>
                  <span>
                    <span className="sa-user-name">{PLATFORM.displayName}</span>
                    <span className="sa-user-role">{PLATFORM.role}</span>
                  </span>
                  <ChevronDown size={14} strokeWidth={1.8} color="#6B6759" />
                </button>
                {userMenuOpen ? (
                  <div className="sa-dropdown">
                    <div className="sa-dropdown-header">
                      <div style={{ fontSize: 13.5, fontWeight: 600 }}>{PLATFORM.displayName}</div>
                      <div className="sa-mono" style={{ fontSize: 11, color: "var(--sa-muted-light)" }}>
                        superadmin@zekiexpert.com
                      </div>
                    </div>
                    <button type="button" className="sa-dropdown-item" onClick={() => { setUserMenuOpen(false); setActivePanel("settings"); }}>
                      My profile
                    </button>
                    <button type="button" className="sa-dropdown-item" onClick={() => { setUserMenuOpen(false); setActivePanel("settings"); }}>
                      Platform settings
                    </button>
                    <button type="button" className="sa-dropdown-item danger" onClick={() => { setUserMenuOpen(false); onLogout(); }}>
                      Sign out
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </header>

          <main className="sa-content">
            {activePanel === "overview" && <OverviewPanel onNavigate={setActivePanel} />}
            {activePanel === "alerts" && <AlertsPanel onNavigate={setActivePanel} />}
            {activePanel === "companies" && (
              <CompaniesPanel
                onHubChange={(name) => setHubCrumb(name)}
              />
            )}
            {activePanel === "billing" && <BillingPanel />}
            {activePanel === "system" && <SystemPanel />}
            {activePanel === "requests" && <RequestsPanel />}
            {activePanel === "audit" && <AuditPanel />}
            {activePanel === "settings" && <SettingsPanel />}
          </main>
        </div>
      </div>

      <AskAIModal open={askAiOpen} onClose={() => setAskAiOpen(false)} />
    </div>
  );
}
