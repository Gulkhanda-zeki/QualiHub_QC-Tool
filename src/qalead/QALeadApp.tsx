import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Bell,
  Sparkles,
  PanelLeftClose,
  PanelLeft,
  Search,
  Sun,
  ClipboardList,
  BarChart3,
  Phone,
  Users,
  GraduationCap,
  FileText,
  CheckSquare,
  FolderOpen,
  Settings,
  ChevronDown,
  UserRound,
  ChevronRight,
  Calendar,
} from "lucide-react";
import {
  QA_PLATFORM,
  QA_NAV_SECTIONS,
  QA_PANEL_LABELS,
  QA_PANEL_SECTIONS,
} from "../data/qaleadMockData";
import { SidebarFooter } from "../shared/dashboardUi";
import {
  QATodayPanel,
  QAReviewQueuePanel,
  QAAnalyzePanel,
  QACallsPanel,
  QAAgentsPanel,
  QACoachingPanel,
  QAAnalyticsPanel,
  QAReportsPanel,
  QAScorecardPanel,
  QACampaignsPanel,
  QASettingsPanel,
  type QANavigate,
  type AgentTab,
} from "./panels";
import { AskAIModal } from "../AskAIModal";

const NAV_ICONS: Record<string, typeof Sun> = {
  sun: Sun,
  clipboard: ClipboardList,
  chart: BarChart3,
  phone: Phone,
  users: Users,
  coach: GraduationCap,
  analytics: BarChart3,
  file: FileText,
  checklist: CheckSquare,
  folder: FolderOpen,
  settings: Settings,
};

function QASidebar({
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
    <aside className={`sidebar sidebar--qalead ${collapsed ? "collapsed" : ""}`}>
      <div className={`mb-5 flex shrink-0 items-center px-2 ${collapsed ? "flex-col gap-3" : "justify-between"}`}>
        <div className={`flex min-w-0 items-center ${collapsed ? "" : "gap-2.5"}`}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-crextio-yellow text-xs font-bold text-crextio-dark">
            N
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-[14px] font-bold tracking-tight text-crextio-dark">{QA_PLATFORM.workspace}</p>
              <p className="truncate text-[11px] text-crextio-gray">
                Pro · {QA_PLATFORM.seats.used}/{QA_PLATFORM.seats.total} seats
              </p>
            </div>
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

      <nav className={`sidebar-qalead-nav flex flex-1 flex-col ${collapsed ? "gap-3 w-full" : "gap-4"}`}>
        {QA_NAV_SECTIONS.map((section) => (
          <div key={section.label} className="w-full">
            {!collapsed && (
              <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-[#b0b0b0]">
                {section.label}
              </p>
            )}
            <ul className={`flex flex-col ${collapsed ? "items-center gap-1" : "gap-0.5 px-1"}`}>
              {section.items.map((item) => {
                const Icon = NAV_ICONS[item.icon] ?? Sun;
                const isActive = activeId === item.id;
                const isDangerBadge = item.id === "review-queue";
                const isWarnBadge = item.id === "coaching";
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
                      {!collapsed && <span className="min-w-0 flex-1 truncate text-left">{item.label}</span>}
                      {badge && !collapsed && (
                        <span
                          className={`ml-auto shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none ${
                            isActive
                              ? "bg-white/20 text-white"
                              : isDangerBadge
                                ? "bg-[#FEE4E2] text-[#F04438]"
                                : isWarnBadge
                                  ? "bg-crextio-yellow/60 text-crextio-dark"
                                  : "bg-black/8 text-crextio-dark"
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
                                : isWarnBadge
                                  ? "bg-crextio-yellow/60 text-crextio-dark"
                                  : "bg-black/8 text-crextio-dark"
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

function QATopBar({
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

  const section = QA_PANEL_SECTIONS[activePanel] ?? "Work";

  return (
    <>
      <header className="sticky top-0 z-40 flex flex-wrap items-center gap-3 border-b border-black/5 bg-[rgba(253,252,248,0.92)] px-4 py-3.5 backdrop-blur-md xl:gap-4 xl:px-8">
        <div className="flex min-w-0 shrink-0 items-center gap-2 text-sm">
          <span className="truncate font-medium text-crextio-gray">{section}</span>
          <ChevronRight size={14} className="shrink-0 text-crextio-gray" />
          <span className="truncate font-semibold text-crextio-dark">
            {QA_PANEL_LABELS[activePanel] ?? activePanel}
          </span>
          <span className="ml-1 hidden items-center gap-1.5 rounded-full border border-[#A6F4C5] bg-[#ECFDF3] px-2.5 py-1 text-[10px] font-semibold text-[#027A48] sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#12B76A]" />
            PIPELINE LIVE
          </span>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
          <button
            type="button"
            className="flex w-full max-w-md items-center gap-2 rounded-full border border-black/8 bg-white/70 px-4 py-2.5 text-sm text-crextio-gray"
          >
            <Search size={15} className="shrink-0" />
            <span className="truncate">Search calls, agents...</span>
            <span className="ml-auto hidden shrink-0 rounded-md bg-black/5 px-1.5 py-0.5 text-[10px] font-medium sm:inline">
              ?K
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
            className="hidden items-center gap-2 rounded-full border border-black/8 bg-white/70 px-3.5 py-2 text-sm font-medium text-crextio-dark sm:flex"
          >
            <Calendar size={15} className="text-crextio-gray" />
            {QA_PLATFORM.dateRange}
            <ChevronDown size={14} className="text-crextio-gray" />
          </button>

          <button
            type="button"
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
                {QA_PLATFORM.initials}
              </div>
              <div className="hidden min-w-0 text-left sm:block">
                <p className="truncate text-sm font-semibold leading-tight text-crextio-dark">
                  {QA_PLATFORM.displayName}
                </p>
                <p className="truncate text-[11px] leading-tight text-crextio-gray">{QA_PLATFORM.role}</p>
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
                  <p className="text-sm font-semibold text-crextio-dark">{QA_PLATFORM.displayName}</p>
                  <p className="mt-0.5 text-xs text-crextio-gray">{QA_PLATFORM.email}</p>
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
                  Settings
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

function renderPanel(
  id: string,
  onNavigate: QANavigate,
  analyzeTab: string,
  agentId: string | null,
  agentTab: AgentTab,
  onAgentTabChange: (tab: AgentTab) => void,
  onAgentBack: () => void,
): ReactNode {
  switch (id) {
    case "today":
      return <QATodayPanel onNavigate={onNavigate} />;
    case "review-queue":
      return <QAReviewQueuePanel onNavigate={onNavigate} />;
    case "analyze":
      return <QAAnalyzePanel key={analyzeTab} initialTab={analyzeTab} />;
    case "calls":
      return <QACallsPanel />;
    case "agents":
      return (
        <QAAgentsPanel
          agentId={agentId ?? undefined}
          agentTab={agentTab}
          onAgentTabChange={onAgentTabChange}
          onNavigate={onNavigate}
          onBack={onAgentBack}
        />
      );
    case "coaching":
      return <QACoachingPanel />;
    case "analytics":
      return <QAAnalyticsPanel />;
    case "reports":
      return <QAReportsPanel />;
    case "scorecard":
      return <QAScorecardPanel />;
    case "campaigns":
      return <QACampaignsPanel />;
    case "settings":
      return <QASettingsPanel />;
    default:
      return <QATodayPanel onNavigate={onNavigate} />;
  }
}

export function QALeadApp({ onLogout }: { onLogout: () => void }) {
  const [activePanel, setActivePanel] = useState("today");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [analyzeTab, setAnalyzeTab] = useState("New analysis");
  const [agentId, setAgentId] = useState<string | null>(null);
  const [agentTab, setAgentTab] = useState<AgentTab>("profile");

  const handleAgentBack = () => {
    setAgentId(null);
    setAgentTab("profile");
  };

  const handleNavigate: QANavigate = (id, options) => {
    if (id === "analyze" && options?.analyzeTab) {
      setAnalyzeTab(options.analyzeTab);
    }
    if (options?.agentId) {
      setAgentId(options.agentId);
    } else {
      setAgentId(null);
    }
    if (options?.agentTab) {
      setAgentTab(options.agentTab);
    }
    setActivePanel(id);
  };

  return (
    <div className="min-h-screen w-full">
      <div className="dashboard-shell flex h-screen w-full overflow-hidden">
        <QASidebar
          activeId={activePanel}
          onNavigate={handleNavigate}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
          onLogout={onLogout}
        />

        <div className="main-canvas flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="crextio-container flex min-h-0 flex-1 flex-col">
            <QATopBar activePanel={activePanel} onNavigate={setActivePanel} onLogout={onLogout} />
            <div className="crextio-scroll">
              {renderPanel(activePanel, handleNavigate, analyzeTab, agentId, agentTab, setAgentTab, handleAgentBack)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
