import { useState, type ReactNode } from "react";
import {
  Bell,
  Sparkles,
  PanelLeftClose,
  PanelLeft,
  ArrowUpRight,
  RefreshCw,
  Plus,
  AlertTriangle,
  Building2,
  Search,
  LayoutDashboard,
  Zap,
  BarChart3,
  ClipboardList,
  ShieldCheck,
  Settings,
  LogOut,
  TrendingUp,
  Globe,
  Clock,
  Users,
} from "lucide-react";
import {
  PLATFORM,
  NAV_SECTIONS,
  KPI,
  REVENUE_CHART,
  BUSIEST_COMPANIES,
  MINUTE_CAP_COMPANIES,
} from "./data/qcMockData";
import {
  AlertsPanel,
  CompaniesPanel,
  BillingPanel,
  SystemPanel,
  RequestsPanel,
  AuditPanel,
  SettingsPanel,
} from "./panels";
import {
  TABLE_CARD,
  TABLE_CLASS,
  TH,
  TD,
  rowClass,
  RowCheckbox,
  HeaderCheckbox,
  useTableSelection,
} from "./tableUi";
import { AddClientWorkspaceModal } from "./AddClientWorkspaceModal";

const CARD = "crextio-card";
const CARD_DARK = "crextio-card-dark";

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

const KPI_CARDS = [
  {
    label: "Monthly recurring revenue",
    value: KPI.mrr.value,
    footer: (
      <>
        <span className="font-semibold text-[#12B76A]">{KPI.mrr.trend}</span>
        {" · "}
        {KPI.mrr.sub}
      </>
    ),
    icon: TrendingUp,
    iconClass: "bg-[#D1FADF] text-[#12B76A]",
  },
  {
    label: "Active companies",
    value: `${KPI.companies.active} / ${KPI.companies.total}`,
    footer: KPI.companies.sub,
    icon: Globe,
    iconClass: "bg-crextio-gray-light text-crextio-dark",
  },
  {
    label: "Minutes used",
    value: `${KPI.minutes.used.toLocaleString()} / ${KPI.minutes.total.toLocaleString()}`,
    footer: KPI.minutes.sub,
    icon: Clock,
    iconClass: "bg-crextio-gray-light text-crextio-dark",
  },
  {
    label: "Seats used",
    value: `${KPI.seats.used} / ${KPI.seats.total}`,
    footer: KPI.seats.sub,
    icon: Users,
    iconClass: "bg-[#FFF9E5] text-crextio-dark",
  },
];

function ExpandButton({ dark = false }: { dark?: boolean }) {
  return (
    <button type="button" className={`expand-icon shrink-0 ${dark ? "bg-white/10 border-white/10" : ""}`} aria-label="Expand">
      <ArrowUpRight size={14} className={dark ? "text-white/70" : "text-crextio-gray"} />
    </button>
  );
}

function Sidebar({
  activeId,
  onNavigate,
  collapsed,
  onToggleCollapse,
}: {
  activeId: string;
  onNavigate: (id: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className={`mb-8 flex items-center px-1 ${collapsed ? "flex-col gap-3" : "justify-between"}`}>
        <div className={`flex items-center ${collapsed ? "" : "gap-2.5"}`}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-crextio-yellow text-xs font-bold text-crextio-dark">
            Q
          </div>
          {!collapsed && (
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-bold tracking-tight text-crextio-dark">QCTool</span>
              <span className="rounded-md bg-crextio-yellow px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-crextio-dark">
                Super
              </span>
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

      <nav className={`flex flex-1 flex-col ${collapsed ? "gap-3 w-full" : "gap-6"}`}>
        {NAV_SECTIONS.map((section) => (
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
                const isDangerBadge = item.id === "alerts" || item.id === "billing" || item.id === "system";
                return (
                  <li key={item.id} className={collapsed ? "relative w-full" : undefined}>
                    <button
                      type="button"
                      onClick={() => onNavigate(item.id)}
                      title={collapsed ? item.label : undefined}
                      className={`sidebar-nav-item ${isActive ? "active" : ""} ${collapsed ? "relative" : ""}`}
                    >
                      <Icon size={18} strokeWidth={1.75} className="sidebar-nav-icon shrink-0" />
                      {!collapsed && <span className="flex-1">{item.label}</span>}
                      {item.badge && !collapsed && (
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                            isActive
                              ? "bg-white/20 text-white"
                              : isDangerBadge
                                ? "bg-[#FEE4E2] text-[#F04438]"
                                : "bg-crextio-yellow/40 text-crextio-dark"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.badge && collapsed && (
                        <span
                          className={`sidebar-nav-badge rounded-full font-semibold ${
                            isActive
                              ? "bg-white/20 text-white"
                              : isDangerBadge
                                ? "bg-[#FEE4E2] text-[#F04438]"
                                : "bg-crextio-yellow/40 text-crextio-dark"
                          }`}
                        >
                          {item.badge}
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

      <div className={`mt-auto mb-5 border-t border-black/5 pt-4 ${collapsed ? "w-full" : ""}`}>
        {!collapsed && (
          <div className="mb-3 flex items-center gap-2 px-3">
            <span className="h-2 w-2 rounded-full bg-[#12B76A]" />
            <span className="text-xs font-medium text-[#12B76A]">All systems operational</span>
          </div>
        )}
        {collapsed && (
          <div className="mb-3 flex justify-center">
            <span className="h-2 w-2 rounded-full bg-[#12B76A]" title="All systems operational" />
          </div>
        )}
        <button
          type="button"
          title={collapsed ? "Logout" : undefined}
          className={`flex w-full items-center gap-2.5 rounded-xl border border-[#F04438]/18 bg-[#FEF3F2] px-3.5 py-2.5 text-sm font-semibold text-[#B42318] transition-colors hover:border-[#F04438]/30 hover:bg-[#FEE4E2] ${
            collapsed ? "justify-center px-2.5" : ""
          }`}
        >
          <LogOut size={16} strokeWidth={2} className="shrink-0" />
          {!collapsed && "Logout"}
        </button>
        {!collapsed ? (
          <p className="mt-3 px-3 text-[10px] leading-relaxed text-[#A3A3A3]">
            <span className="font-medium text-[#8E8E8E]">© {new Date().getFullYear()} QC Tool</span>
            <br />
            by Zeki Experts Solution
          </p>
        ) : (
          <p
            className="mt-3 text-center text-[9px] leading-tight text-[#A3A3A3]"
            title="QC Tool by Zeki Experts Solution"
          >
            © {new Date().getFullYear()}
          </p>
        )}
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <header className="flex flex-wrap items-center gap-3 border-b border-black/5 px-4 py-3.5 xl:gap-4 xl:px-8">
      {/* Logo */}
      <div className="flex shrink-0 items-center">
        <span className="text-[15px] font-bold tracking-tight text-crextio-dark">
          Zeki Experts Solutions
        </span>
      </div>

      {/* Search + Ask AI */}
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
          className="flex shrink-0 items-center gap-2 rounded-full bg-crextio-yellow px-3.5 py-2.5 text-sm font-semibold text-crextio-dark shadow-[0_2px_8px_rgba(255,213,79,0.45)]"
        >
          <Sparkles size={15} className="text-crextio-dark" strokeWidth={1.75} />
          <span className="hidden sm:inline">Ask AI</span>
        </button>
      </div>

      {/* Notifications + Super Admin */}
      <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-white/70"
          aria-label="Notifications"
        >
          <Bell size={18} className="text-crextio-dark" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#F04438] text-[9px] font-bold text-white">
            3
          </span>
        </button>
        <div className="flex items-center gap-2.5 rounded-full border border-black/8 bg-white/70 py-1 pl-1 pr-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-crextio-dark text-[11px] font-bold text-white">
            {PLATFORM.initials}
          </div>
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-semibold leading-tight text-crextio-dark">{PLATFORM.displayName}</p>
            <p className="truncate text-[11px] leading-tight text-crextio-gray">{PLATFORM.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function KpiOverviewCard({
  label,
  value,
  footer,
  icon: Icon,
  iconClass,
}: {
  label: string;
  value: string;
  footer: ReactNode;
  icon: typeof TrendingUp;
  iconClass: string;
}) {
  return (
    <div className="stat-metric-card min-w-0">
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className="text-xs font-medium leading-snug text-crextio-gray">{label}</span>
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconClass}`}>
          <Icon size={16} strokeWidth={1.75} />
        </span>
      </div>
      <p className="text-[1.75rem] font-light leading-none tracking-tight text-crextio-dark md:text-[2rem]">
        {value}
      </p>
      <p className="mt-2.5 text-[11px] leading-snug text-crextio-gray">{footer}</p>
    </div>
  );
}

function PageHeader() {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <div className="flex flex-col gap-[30px] px-4 pt-6 pb-6 xl:px-8">
      <div className="flex flex-col gap-[30px] xl:flex-row xl:items-end xl:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-[2.75rem] font-bold leading-none tracking-tight text-crextio-dark md:text-[3.25rem]">
            Good morning, {PLATFORM.adminName}
          </h1>
          <p className="text-sm text-crextio-gray">
            Platform performance and insights · {PLATFORM.dateRange} · refreshed{" "}
            {PLATFORM.refreshedAgo}
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-crextio-dark/10 bg-white/60 px-4 py-2.5 text-sm font-medium text-crextio-dark"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 rounded-full bg-crextio-dark px-4 py-2.5 text-sm font-medium text-white"
          >
            <Plus size={16} />
            Add Organization
          </button>
        </div>
      </div>

      <AddClientWorkspaceModal open={addOpen} onClose={() => setAddOpen(false)} />

      <div className="flex items-center gap-4 rounded-[var(--radius-crextio-inner)] border border-[#F04438] bg-[#FEE4E2] px-5 py-4 shadow-[0_4px_16px_rgba(240,68,56,0.12)]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F04438]/15">
          <AlertTriangle size={20} className="text-[#F04438]" />
        </div>
        <p className="flex-1 text-sm leading-snug text-[#7A271A]">
          <span className="font-bold text-[#B42318]">{PLATFORM.criticalIssues} critical issues</span>
          {" | "}
          {PLATFORM.alertSummary}
        </p>
        <button
          type="button"
          className="shrink-0 rounded-full border border-[#F04438]/30 bg-white px-4 py-2 text-sm font-semibold text-[#B42318] shadow-sm"
        >
          View all
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPI_CARDS.map((card) => (
          <KpiOverviewCard key={card.label} {...card} />
        ))}
      </div>
    </div>
  );
}

function RevenueChart() {
  const [period, setPeriod] = useState<"Monthly" | "Yearly">("Monthly");
  const chartHeight = 160;

  return (
    <div className={`${CARD} card-calendar-size bg-white p-4`}>
      <div className="mb-3 flex shrink-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-crextio-dark">{REVENUE_CHART.title}</p>
          <p className="mt-0.5 truncate text-[10px] text-crextio-gray">{REVENUE_CHART.subtitle}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="nav-pill-group flex gap-0.5 p-0.5">
            {(["Monthly", "Yearly"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setPeriod(option)}
                className={`rounded-full px-2 py-1 text-[9px] font-semibold transition-colors ${
                  period === option
                    ? "bg-white text-crextio-dark shadow-sm"
                    : "text-crextio-gray"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <ExpandButton />
        </div>
      </div>

      <div className="dashboard-card-body justify-end">
        <div className="flex gap-2">
          <div className="flex shrink-0 flex-col justify-between py-1 text-[9px] font-medium text-crextio-gray">
            {REVENUE_CHART.yAxisLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="min-w-0 flex-1">
            <div
              className="relative flex items-end justify-between gap-1 border-b border-black/5 pb-1"
              style={{ height: chartHeight }}
            >
              {REVENUE_CHART.months.map((month) => {
                const barHeight =
                  month.value != null
                    ? Math.round((month.value / REVENUE_CHART.maxValue) * (chartHeight - 20))
                    : 0;

                return (
                  <div key={month.label} className="relative flex flex-1 flex-col items-center justify-end gap-1">
                    {month.display && (
                      <span className="text-[8px] font-semibold text-crextio-dark">{month.display}</span>
                    )}
                    <div
                      className={`w-full max-w-[28px] rounded-t-lg ${
                        month.highlight ? "bg-crextio-yellow" : "bg-crextio-dark"
                      }`}
                      style={{ height: `${Math.max(barHeight, month.value ? 6 : 0)}px` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-1.5 flex justify-between gap-1">
              {REVENUE_CHART.months.map((month) => (
                <span key={month.label} className="flex-1 text-center text-[9px] font-medium text-crextio-gray">
                  {month.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BusiestCompaniesCard() {
  const { selectedId, setSelectedId, checked, toggleCheck } = useTableSelection("1");

  return (
    <div className={`${TABLE_CARD} card-full-span`} style={{ backgroundColor: "#ffffff" }}>
      <div className="mb-4 flex shrink-0 items-start justify-between gap-3">
        <p className="text-[15px] font-semibold tracking-tight text-crextio-dark">Busiest companies</p>
        <span className="shrink-0 rounded-full border border-black/8 bg-[#F7F8FA] px-3 py-1.5 text-[11px] font-medium text-crextio-gray">
          this month
        </span>
      </div>

      <div className="dashboard-card-scroll overflow-x-auto">
        <table className={TABLE_CLASS}>
          <thead>
            <tr>
              <th className={`w-10 ${TH}`}>
                <HeaderCheckbox />
              </th>
              <th className={`w-12 ${TH}`}>#</th>
              <th className={TH}>
                <span className="inline-flex items-center gap-1.5">
                  <Building2 size={13} strokeWidth={1.75} className="text-[#9CA3AF]" />
                  Company
                </span>
              </th>
              <th className={`${TH} text-right`}>Calls</th>
              <th className={`${TH} text-right`}>Minutes</th>
            </tr>
          </thead>
          <tbody>
            {BUSIEST_COMPANIES.map((company) => {
              const rowId = String(company.rank);
              const isSelected = selectedId === rowId;
              return (
                <tr
                  key={company.rank}
                  onClick={() => setSelectedId(rowId)}
                  className={rowClass(isSelected)}
                >
                  <td className={TD}>
                    <RowCheckbox
                      checked={!!checked[rowId]}
                      label={`Select ${company.name}`}
                      onChange={() => toggleCheck(rowId)}
                    />
                  </td>
                  <td className={`${TD} text-[13px] tabular-nums text-[#9CA3AF]`}>{company.rank}</td>
                  <td className={TD}>
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white"
                        style={{ background: company.color }}
                      >
                        {company.initials}
                      </span>
                      <span className="truncate text-[13px] font-semibold text-crextio-dark">
                        {company.name}
                      </span>
                    </div>
                  </td>
                  <td className={`${TD} text-right text-[13px] tabular-nums text-[#6B7280]`}>
                    {company.calls.toLocaleString()}
                  </td>
                  <td className={`${TD} text-right`}>
                    <span className="inline-flex rounded-full bg-[#F3F4F6] px-2.5 py-1 text-[12px] font-semibold tabular-nums text-crextio-dark">
                      {company.minutes.toLocaleString()}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex shrink-0 justify-end border-t border-[#EEF0F3] pt-3">
        <button type="button" className="text-[12px] font-semibold text-crextio-dark hover:underline">
          View all companies →
        </button>
      </div>
    </div>
  );
}

function MinuteCapCard() {
  return (
    <div className={`${CARD_DARK} card-calendar-size p-4 text-white`}>
      <div className="mb-3 flex shrink-0 items-center justify-between">
        <p className="text-xs font-semibold">Closest to their minute cap</p>
        <ExpandButton dark />
      </div>

      <button type="button" className="mb-3 shrink-0 self-end text-[10px] font-semibold text-white/50">
        View all
      </button>

      <ul className="dashboard-card-scroll flex flex-col gap-3">
        {MINUTE_CAP_COMPANIES.map((company) => {
          const pct = Math.round((company.used / company.cap) * 100);
          const nearCap = pct >= 80;

          return (
            <li key={company.name}>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="truncate text-[11px] font-medium">{company.name}</span>
                <span className="shrink-0 text-[9px] tabular-nums text-white/50">
                  {company.used.toLocaleString()} / {company.cap.toLocaleString()}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${nearCap ? "bg-crextio-yellow" : "bg-white/40"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function App() {
  const [activePanel, setActivePanel] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full">
      <div className="dashboard-shell flex w-full overflow-hidden">
        <Sidebar
          activeId={activePanel}
          onNavigate={setActivePanel}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
        />

        <div className="main-canvas flex min-w-0 flex-1 flex-col">
          <div className="crextio-container flex min-h-0 flex-1 flex-col">
            <TopBar />

            {activePanel === "overview" && (
              <>
                <PageHeader />
                <main className="grid grid-cols-2 items-stretch gap-5 px-4 pb-6 md:grid-cols-3 xl:grid-cols-4 xl:px-8">
                  <RevenueChart />
                  <MinuteCapCard />
                  <BusiestCompaniesCard />
                </main>
              </>
            )}
            {activePanel === "alerts" && <AlertsPanel />}
            {activePanel === "companies" && <CompaniesPanel />}
            {activePanel === "billing" && <BillingPanel />}
            {activePanel === "system" && <SystemPanel />}
            {activePanel === "requests" && <RequestsPanel />}
            {activePanel === "audit" && <AuditPanel />}
            {activePanel === "settings" && <SettingsPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}
