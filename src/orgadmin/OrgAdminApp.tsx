import { BrandLogo } from "../shared/BrandLogo.jsx";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Bell,
  Sparkles,
  PanelLeftClose,
  PanelLeft,
  Search,
  LayoutDashboard,
  Users,
  ShieldCheck,
  Zap,
  ClipboardList,
  BarChart3,
  Scale,
  FileText,
  Clock,
  Settings,
  ChevronDown,
  UserRound,
  ChevronRight,
} from "lucide-react";
import {
  ORG_PLATFORM,
  ORG_NAV_SECTIONS,
  ORG_PANEL_LABELS,
} from "../data/orgMockData";
import { SidebarFooter } from "../shared/dashboardUi";
import {
  OrgOverviewPanel,
  OrgUsersPanel,
  OrgRolesPanel,
  OrgBillingPanel,
  OrgCampaignsPanel,
  OrgAgentsPanel,
  OrgCalibrationPanel,
  OrgAlertsPanel,
  OrgReportsPanel,
  OrgActivityPanel,
  OrgSettingsPanel,
} from "./panels";
import { AskAIModal } from "../AskAIModal";

const NAV_ICONS: Record<string, typeof LayoutDashboard> = {
  home: LayoutDashboard,
  users: Users,
  shield: ShieldCheck,
  bolt: Zap,
  clipboard: ClipboardList,
  chart: BarChart3,
  scales: Scale,
  bell: Bell,
  file: FileText,
  clock: Clock,
  settings: Settings,
};

function OrgSidebar({
  activeId,
  onNavigate,
  collapsed,
  onToggleCollapse,
  onLogout,
}: {
  activeId: string;
  onNavigate: (id: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onLogout: () => void;
}) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className={`mb-8 flex items-center px-1 ${collapsed ? "flex-col gap-3" : "justify-between"}`}>
        <div className={`flex items-center ${collapsed ? "" : "gap-2.5"}`}>
          <BrandLogo tone="light" size={36} showWordmark={!collapsed} className="qc-brand--sm min-w-0" />
          {!collapsed && (
            <span className="rounded-md bg-crextio-yellow px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-crextio-dark">
              Pro
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onToggleCollapse}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-crextio-gray hover:bg-black/5"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      <nav className={`flex flex-1 flex-col ${collapsed ? "gap-3 w-full" : "gap-6"}`}>
        {ORG_NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-wide text-[#b0b0b0]">
                {section.label}
              </p>
            )}
            <ul className={`flex flex-col ${collapsed ? "items-center gap-1" : "gap-0.5"}`}>
              {section.items.map((item) => {
                const Icon = NAV_ICONS[item.icon] ?? LayoutDashboard;
                const isActive = activeId === item.id;
                const isDangerBadge = item.id === "alerts";
                const badge = "badge" in item ? item.badge : undefined;
                return (
                  <li key={item.id} className={collapsed ? "relative w-full" : undefined}>
                    <button
                      type="button"
                      onClick={() => onNavigate(item.id)}
                      title={collapsed ? item.label : undefined}
                      className={`sidebar-nav-item ${isActive ? "active" : ""} ${collapsed ? "relative" : ""}`}
                    >
                      <Icon size={18} strokeWidth={1.75} className="sidebar-nav-icon shrink-0" />
                      {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                      {badge && !collapsed && (
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                            isActive
                              ? "bg-white/20 text-white"
                              : isDangerBadge
                                ? "bg-[#FEE4E2] text-[#F04438]"
                                : "bg-crextio-yellow/40 text-crextio-dark"
                          }`}
                        >
                          {badge}
                        </span>
                      )}
                      {badge && collapsed && (
                        <span
                          className={`sidebar-nav-badge rounded-full font-semibold ${
                            isActive
                              ? "bg-white/20 text-white"
                              : isDangerBadge
                                ? "bg-[#FEE4E2] text-[#F04438]"
                                : "bg-crextio-yellow/40 text-crextio-dark"
                          }`}
                        >
                          {badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <SidebarFooter collapsed={collapsed} onLogout={onLogout} />
    </aside>
  );
}

function OrgTopBar({
  activePanel,
  onNavigate,
  onLogout,
}: {
  activePanel: string;
  onNavigate: (id: string) => void;
  onLogout: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [askAiOpen, setAskAiOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
    <header className="sticky top-0 z-40 flex flex-wrap items-center gap-3 border-b border-black/5 bg-[rgba(253,252,248,0.92)] px-4 py-3.5 backdrop-blur-md xl:gap-4 xl:px-8">
      <div className="flex min-w-0 shrink-0 items-center gap-1.5 text-sm">
        <span className="truncate font-medium text-crextio-gray">{ORG_PLATFORM.workspace}</span>
        <ChevronRight size={14} className="shrink-0 text-crextio-gray" />
        <span className="truncate font-semibold text-crextio-dark">
          {ORG_PANEL_LABELS[activePanel] ?? activePanel}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
        <button
          type="button"
          className="flex w-full max-w-md items-center gap-2 rounded-full border border-black/8 bg-white/70 px-4 py-2.5 text-sm text-crextio-gray"
        >
          <Search size={15} className="shrink-0" />
          <span className="truncate">Search or run a command...</span>
          <span className="ml-auto hidden shrink-0 rounded-md bg-black/5 px-1.5 py-0.5 text-[10px] font-medium sm:inline">
            ⌘K
          </span>
        </button>
        <button
          type="button"
          onClick={() => setAskAiOpen(true)}
          className="flex shrink-0 items-center gap-2 rounded-full bg-crextio-yellow px-3.5 py-2.5 text-sm font-semibold text-crextio-dark shadow-[0_2px_8px_rgba(255,213,79,0.45)]"
        >
          <Sparkles size={15} className="text-crextio-dark" strokeWidth={1.75} />
          <span className="hidden sm:inline">Ask AI</span>
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
        <button
          type="button"
          onClick={() => onNavigate("alerts")}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-white/70"
          aria-label="Notifications"
        >
          <Bell size={18} className="text-crextio-dark" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#F04438] text-[9px] font-bold text-white">
            4
          </span>
        </button>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center justify-center gap-2.5 rounded-full border border-black/8 bg-white/70 px-3 py-1.5 transition-colors hover:bg-white"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-crextio-dark text-[11px] font-bold text-white">
              {ORG_PLATFORM.initials}
            </div>
            <div className="hidden min-w-0 text-left sm:block">
              <p className="truncate text-sm font-semibold leading-tight text-crextio-dark">
                {ORG_PLATFORM.displayName}
              </p>
              <p className="truncate text-[11px] leading-tight text-crextio-gray">{ORG_PLATFORM.role}</p>
            </div>
            <ChevronDown
              size={16}
              strokeWidth={2}
              className={`shrink-0 text-crextio-gray transition-transform ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-black/8 bg-white py-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
            >
              <div className="border-b border-black/5 px-3.5 py-2.5">
                <p className="text-sm font-semibold text-crextio-dark">{ORG_PLATFORM.displayName}</p>
                <p className="mt-0.5 text-xs text-crextio-gray">{ORG_PLATFORM.email}</p>
              </div>
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium text-crextio-dark transition-colors hover:bg-[#F7F8FA]"
                onClick={() => setMenuOpen(false)}
              >
                <UserRound size={16} strokeWidth={1.75} className="text-crextio-gray" />
                My profile
              </button>
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium text-crextio-dark transition-colors hover:bg-[#F7F8FA]"
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate("settings");
                }}
              >
                <Settings size={16} strokeWidth={1.75} className="text-crextio-gray" />
                Workspace settings
              </button>
              <div className="my-1 border-t border-black/5" />
              <button
                type="button"
                role="menuitem"
                className="flex w-full px-3.5 py-2.5 text-left text-sm font-medium text-[#B42318] transition-colors hover:bg-[#FEF3F2]"
                onClick={() => {
                  setMenuOpen(false);
                  onLogout();
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
    <AskAIModal open={askAiOpen} onClose={() => setAskAiOpen(false)} />
    </>
  );
}

function renderPanel(id: string, onNavigate: (id: string) => void): ReactNode {
  switch (id) {
    case "overview":
      return <OrgOverviewPanel onNavigate={onNavigate} />;
    case "users":
      return <OrgUsersPanel />;
    case "roles":
      return <OrgRolesPanel />;
    case "billing":
      return <OrgBillingPanel />;
    case "campaigns":
      return <OrgCampaignsPanel />;
    case "agents":
      return <OrgAgentsPanel />;
    case "calibration":
      return <OrgCalibrationPanel />;
    case "alerts":
      return <OrgAlertsPanel />;
    case "reports":
      return <OrgReportsPanel />;
    case "activity":
      return <OrgActivityPanel />;
    case "settings":
      return <OrgSettingsPanel />;
    default:
      return <OrgOverviewPanel onNavigate={onNavigate} />;
  }
}

export function OrgAdminApp({ onLogout }: { onLogout: () => void }) {
  const [activePanel, setActivePanel] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full">
      <div className="dashboard-shell flex h-screen w-full overflow-hidden">
        <OrgSidebar
          activeId={activePanel}
          onNavigate={setActivePanel}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
          onLogout={onLogout}
        />

        <div className="main-canvas flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="crextio-container flex min-h-0 flex-1 flex-col">
            <OrgTopBar activePanel={activePanel} onNavigate={setActivePanel} onLogout={onLogout} />
            <div className="crextio-scroll">{renderPanel(activePanel, setActivePanel)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
