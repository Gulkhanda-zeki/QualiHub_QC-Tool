import { useState, type ReactNode } from "react";
import {
  Plus,
  ChevronRight,
  RefreshCw,
  X,
  Clock,
  Cpu,
  AlertTriangle,
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
} from "./data/qcMockData";
import {
  TABLE_CARD,
  TABLE_CLASS,
  TH,
  TD,
  rowClass,
  RowCheckbox,
  HeaderCheckbox,
  DotPill,
  statusDotStyle,
  TableToolbar,
  useTableSelection,
  ActionButton,
  RoundIconButton,
  OutlinePillButton,
  TableFilters,
} from "./tableUi";
import { AddClientWorkspaceModal } from "./AddClientWorkspaceModal";
import { ReviewRequestModal } from "./ReviewRequestModal";
import { EditPlanCatalogModal } from "./EditPlanCatalogModal";
import { InvoiceDetailModal } from "./InvoiceDetailModal";
import { CompanyDetailPanel } from "./CompanyDetailPanel";
import { RequestApprovedModal } from "./RequestApprovedModal";

const CARD = "crextio-card !bg-white";

function FilterPills({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return <TableFilters options={options} value={value} onChange={onChange} />;
}

function PanelHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0 flex-1">
        <h1 className="text-3xl font-bold tracking-tight text-crextio-dark md:text-4xl">{title}</h1>
        <p className="mt-2 max-w-3xl text-sm text-crextio-gray">{subtitle}</p>
      </div>
      {action ? <div className="flex shrink-0 gap-2">{action}</div> : null}
    </div>
  );
}

function StatusBadge({ label }: { label: string }) {
  const styles: Record<string, string> = {
    Active: "bg-[#D1FADF] text-[#027A48]",
    Paid: "bg-[#D1FADF] text-[#027A48]",
    Warm: "bg-[#D1FADF] text-[#027A48]",
    Unpaid: "border border-[#F04438]/40 text-[#B42318] bg-[#FEE4E2]",
    Suspended: "bg-[#FEF0C7] text-[#B54708]",
    Cancelled: "border border-black/15 text-crextio-gray bg-transparent",
    Trial: "border border-black/15 text-crextio-gray bg-transparent",
    Pending: "bg-[#FEF0C7] text-[#B54708]",
    Approved: "bg-[#D1FADF] text-[#027A48]",
    Declined: "bg-[#FEE4E2] text-[#B42318]",
    Refunded: "bg-[#F2F4F7] text-[#667085]",
    Degraded: "bg-[#FEF0C7] text-[#B54708]",
    Pro: "bg-[#F7F8FA] text-crextio-dark",
    Standard: "bg-[#F7F8FA] text-crextio-dark",
    high: "bg-[#FEE4E2] text-[#B42318]",
    medium: "bg-[#FEF0C7] text-[#B54708]",
    low: "bg-[#F2F4F7] text-[#667085]",
    Request: "bg-[#FEE4E2] text-[#B42318]",
    Billing: "bg-[#FEF0C7] text-[#B54708]",
    Usage: "bg-[#FFEAD5] text-[#C4320A]",
    "Super admin": "bg-crextio-yellow/50 text-crextio-dark",
    Support: "bg-[#F7F8FA] text-crextio-dark",
    Finance: "bg-[#D1FADF] text-[#027A48]",
  };

  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold ${
        styles[label] ?? "bg-[#F7F8FA] text-crextio-dark"
      }`}
    >
      {label}
    </span>
  );
}

export function AlertsPanel() {
  const [filter, setFilter] = useState("All");
  const [reviewAlert, setReviewAlert] = useState<(typeof ALERTS_PANEL.items)[number] | null>(null);
  const { selectedId, setSelectedId, checked, toggleCheck } = useTableSelection("a1");
  const items =
    filter === "All" ? ALERTS_PANEL.items : ALERTS_PANEL.items.filter((i) => i.filter === filter);

  return (
    <div className="px-4 pt-6 pb-6 xl:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-crextio-dark md:text-4xl">Alerts</h1>
        <p className="mt-2 max-w-3xl text-sm text-crextio-gray">{ALERTS_PANEL.subtitle}</p>
      </div>

      <div className={TABLE_CARD}>
        <TableToolbar
          filters={ALERTS_PANEL.filters}
          filterValue={filter}
          onFilterChange={setFilter}
          searchPlaceholder="Search alerts..."
          actions={
            <RoundIconButton label="Add">
              <Plus size={16} />
            </RoundIconButton>
          }
        />

        <div className="overflow-x-auto">
          <table className={`${TABLE_CLASS} min-w-[860px]`}>
            <thead>
              <tr>
                <th className={`w-10 ${TH}`}>
                  <HeaderCheckbox />
                </th>
                <th className={TH}>Type</th>
                <th className={TH}>Alert</th>
                <th className={TH}>Details</th>
                <th className={TH}>Opened</th>
                <th className={TH}>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const style = statusDotStyle(item.tag);
                const isSelected = selectedId === item.id;
                return (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={rowClass(isSelected)}
                  >
                    <td className={TD}>
                      <RowCheckbox
                        checked={!!checked[item.id]}
                        label={`Select ${item.title}`}
                        onChange={() => toggleCheck(item.id)}
                      />
                    </td>
                    <td className={TD}>
                      <DotPill label={item.tag} dotClass={style.dot} pillClass={style.pill} />
                    </td>
                    <td className={TD}>
                      <p className="text-[13px] font-semibold text-crextio-dark">{item.title}</p>
                    </td>
                    <td className={`max-w-[320px] ${TD}`}>
                      <p className="truncate text-[12px] text-[#6B7280]">{item.sub}</p>
                    </td>
                    <td className={`whitespace-nowrap ${TD} text-[12px] text-[#9CA3AF]`}>{item.time}</td>
                    <td className={TD}>
                      <ActionButton
                        label={item.action}
                        selected={isSelected}
                        onClick={
                          item.action === "Review request"
                            ? () => setReviewAlert(item)
                            : undefined
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-[#EEF0F3] pt-3">
          <p className="text-[11px] text-crextio-gray">{ALERTS_PANEL.statusLine}</p>
          <p className="max-w-xl text-right text-[11px] leading-relaxed text-crextio-gray">{ALERTS_PANEL.footer}</p>
        </div>
      </div>

      <ReviewRequestModal
        open={!!reviewAlert}
        alert={reviewAlert}
        onClose={() => setReviewAlert(null)}
      />
    </div>
  );
}

export function CompaniesPanel() {
  const [filter, setFilter] = useState("All");
  const [addOpen, setAddOpen] = useState(false);
  const [detailCompanyId, setDetailCompanyId] = useState<string | null>(null);
  const { selectedId, setSelectedId, checked, toggleCheck } = useTableSelection(
    COMPANIES_PANEL.companies[0]?.id,
  );
  const companies =
    filter === "All"
      ? COMPANIES_PANEL.companies
      : filter === "Blocked"
        ? COMPANIES_PANEL.companies.filter((c) => c.access === "Suspended")
        : COMPANIES_PANEL.companies.filter((c) => c.plan === filter);

  if (detailCompanyId) {
    return (
      <CompanyDetailPanel
        companyId={detailCompanyId}
        onBack={() => setDetailCompanyId(null)}
      />
    );
  }

  return (
    <div className="px-4 pt-6 pb-6 xl:px-8">
      <PanelHeader
        title="Companies"
        subtitle={`${COMPANIES_PANEL.companies.length} companies · ${COMPANIES_PANEL.sortLabel}`}
        action={
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="flex shrink-0 items-center gap-2 rounded-full bg-crextio-dark px-4 py-2.5 text-sm font-medium text-white"
          >
            <Plus size={16} />
            Add Organization
          </button>
        }
      />

      <div className={TABLE_CARD}>
        <TableToolbar
          filters={COMPANIES_PANEL.filters}
          filterValue={filter}
          onFilterChange={setFilter}
          searchPlaceholder="Search companies..."
        />

        <div className="overflow-x-auto">
          <table className={`${TABLE_CLASS} min-w-[900px]`}>
            <thead>
              <tr>
                <th className={`w-10 ${TH}`}>
                  <HeaderCheckbox />
                </th>
                <th className={TH}>Company</th>
                <th className={TH}>Plan</th>
                <th className={TH}>Access / Billing</th>
                <th className={TH}>Seats</th>
                <th className={TH}>Minutes used</th>
                <th className={TH}>MRR</th>
                <th className={TH} />
              </tr>
            </thead>
            <tbody>
              {companies.map((co) => {
                const isSelected = selectedId === co.id;
                const planStyle = statusDotStyle(co.plan);
                const accessStyle = statusDotStyle(co.access);
                const billingStyle = statusDotStyle(co.billing);
                return (
                  <tr
                    key={co.id}
                    onClick={() => setSelectedId(co.id)}
                    className={rowClass(isSelected)}
                  >
                    <td className={TD}>
                      <RowCheckbox
                        checked={!!checked[co.id]}
                        label={`Select ${co.name}`}
                        onChange={() => toggleCheck(co.id)}
                      />
                    </td>
                    <td className={TD}>
                      <div className="flex items-center gap-2.5">
                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{ background: co.color }}
                        >
                          {co.initials}
                        </span>
                        <div>
                          <p className="text-[13px] font-semibold text-crextio-dark">{co.name}</p>
                          <p className="text-[11px] text-[#9CA3AF]">{co.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className={TD}>
                      <DotPill label={co.plan} dotClass={planStyle.dot} pillClass={planStyle.pill} />
                    </td>
                    <td className={TD}>
                      <div className="flex flex-wrap gap-1.5">
                        <DotPill label={co.access} dotClass={accessStyle.dot} pillClass={accessStyle.pill} />
                        <DotPill label={co.billing} dotClass={billingStyle.dot} pillClass={billingStyle.pill} />
                      </div>
                    </td>
                    <td className={`${TD} text-[13px] tabular-nums text-crextio-dark`}>
                      {co.seatsUsed} / {co.seatsTotal}
                    </td>
                    <td className={`min-w-[180px] ${TD}`}>
                      <div className="h-2 overflow-hidden rounded-full bg-[#F3F4F6]">
                        <div
                          className={`h-full rounded-full ${co.pct >= 80 ? "bg-[#B8860B]" : "bg-crextio-dark"}`}
                          style={{ width: `${co.pct}%` }}
                        />
                      </div>
                      <p className="mt-1 text-[11px] text-[#9CA3AF]">
                        {co.minsUsed.toLocaleString()} / {co.minsTotal.toLocaleString()} min · {co.pct}%
                      </p>
                    </td>
                    <td className={`${TD} text-[13px] font-semibold tabular-nums text-crextio-dark`}>
                      {co.mrr}
                    </td>
                    <td className={`${TD} text-right`}>
                      <button
                        type="button"
                        aria-label={`Open ${co.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetailCompanyId(co.id);
                        }}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#9CA3AF] transition-colors hover:bg-black/5 hover:text-crextio-dark"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AddClientWorkspaceModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}

export function BillingPanel() {
  const [filter, setFilter] = useState("All");
  const [editPlanOpen, setEditPlanOpen] = useState(false);
  const [viewInvoice, setViewInvoice] = useState<(typeof BILLING_PANEL.invoices)[number] | null>(
    null,
  );
  const [invoiceRows, setInvoiceRows] = useState(() => [...BILLING_PANEL.invoices]);
  const { selectedId, setSelectedId, checked, toggleCheck } = useTableSelection(
    BILLING_PANEL.invoices[0]?.id,
  );
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
          ? {
              ...inv,
              status: "Sent",
              note: "Invoice emailed to the company admin",
              action: "View",
            }
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
    if (inv.action === "View") {
      setViewInvoice(inv);
    }
  };

  return (
    <div className="px-4 pt-6 pb-6 xl:px-8">
      <PanelHeader
        title="Billing"
        subtitle={BILLING_PANEL.subtitle}
        action={<OutlinePillButton>Export statements</OutlinePillButton>}
      />

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {BILLING_PANEL.kpis.map((kpi) => (
          <div key={kpi.label} className={`${CARD} p-4`}>
            <p className="text-xs text-crextio-gray">{kpi.label}</p>
            <p className="mt-2 text-2xl font-light text-crextio-dark">{kpi.value}</p>
            <p className={`mt-1 text-xs font-semibold ${kpi.trendUp ? "text-[#12B76A]" : "text-[#F04438]"}`}>
              {kpi.trend}
            </p>
            <p className="mt-1 text-[11px] text-crextio-gray">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className={`${TABLE_CARD} xl:col-span-2`}>
          <div className="mb-3">
            <p className="text-sm font-semibold text-crextio-dark">Invoice ledger</p>
          </div>
          <TableToolbar
            filters={BILLING_PANEL.invoiceFilters}
            filterValue={filter}
            onFilterChange={setFilter}
            searchPlaceholder="Search invoices..."
          />
          <div className="overflow-x-auto">
            <table className={`${TABLE_CLASS} min-w-[700px]`}>
              <thead>
                <tr>
                  <th className={`w-10 ${TH}`}>
                    <HeaderCheckbox />
                  </th>
                  <th className={TH}>Invoice</th>
                  <th className={TH}>Company</th>
                  <th className={TH}>Amount</th>
                  <th className={TH}>Status</th>
                  <th className={TH}>Note</th>
                  <th className={TH}>Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => {
                  const isSelected = selectedId === inv.id;
                  const style = statusDotStyle(inv.status);
                  return (
                    <tr
                      key={inv.id}
                      onClick={() => setSelectedId(inv.id)}
                      className={rowClass(isSelected)}
                    >
                      <td className={TD}>
                        <RowCheckbox
                          checked={!!checked[inv.id]}
                          label={`Select ${inv.id}`}
                          onChange={() => toggleCheck(inv.id)}
                        />
                      </td>
                      <td className={TD}>
                        <p className="text-[13px] font-semibold text-crextio-dark">{inv.id}</p>
                      </td>
                      <td className={TD}>
                        <p className="text-[13px] font-semibold text-crextio-dark">{inv.company}</p>
                        <p className="text-[11px] text-[#9CA3AF]">{inv.plan}</p>
                      </td>
                      <td className={`${TD} text-[13px] tabular-nums text-crextio-dark`}>{inv.amount}</td>
                      <td className={TD}>
                        <DotPill label={inv.status} dotClass={style.dot} pillClass={style.pill} />
                      </td>
                      <td
                        className={`max-w-[200px] ${TD} text-[12px] ${
                          inv.note !== "—" ? "text-[#B42318]" : "text-[#9CA3AF]"
                        }`}
                      >
                        <p className="truncate">{inv.note}</p>
                      </td>
                      <td className={TD}>
                        <ActionButton
                          label={inv.action}
                          selected={isSelected}
                          onClick={
                            inv.action === "Mark paid" ||
                            inv.action === "View" ||
                            inv.action === "Send"
                              ? () => handleInvoiceAction(inv)
                              : undefined
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${CARD} p-5`}>
          <div className="mb-1 flex items-center justify-between">
            <p className="text-sm font-semibold text-crextio-dark">Plan catalog</p>
            <button
              type="button"
              onClick={() => setEditPlanOpen(true)}
              className="text-xs font-semibold text-crextio-dark hover:underline"
            >
              Edit
            </button>
          </div>
          <p className="mb-4 text-[11px] text-crextio-gray">
            Single source of truth — the API reads these, the UI never sends prices.
          </p>
          <ul className="flex flex-col gap-3">
            {BILLING_PANEL.plans.map((plan) => (
              <li key={plan.name} className="flex items-start justify-between gap-3 border-b border-[#EEF0F3] pb-3 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-crextio-dark">{plan.name}</p>
                  <p className="text-[11px] text-crextio-gray">{plan.detail}</p>
                </div>
                <p className="text-sm font-bold text-crextio-dark">{plan.price}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[10px] font-semibold uppercase tracking-wide text-crextio-gray">Overage policy</p>
          <p className="mt-2 text-[11px] leading-relaxed text-crextio-gray">{BILLING_PANEL.overageNote}</p>
        </div>
      </div>

      <EditPlanCatalogModal open={editPlanOpen} onClose={() => setEditPlanOpen(false)} />
      <InvoiceDetailModal
        open={!!viewInvoice}
        invoice={
          viewInvoice
            ? (invoiceRows.find((r) => r.id === viewInvoice.id) ?? viewInvoice)
            : null
        }
        onClose={() => setViewInvoice(null)}
        onMarkPaid={markPaid}
      />
    </div>
  );
}

export function SystemPanel() {
  const maxQ = Math.max(...SYSTEM_PANEL.queueData);
  const modelSel = useTableSelection(SYSTEM_PANEL.models[0]?.name);

  return (
    <div className="px-4 pt-6 pb-6 xl:px-8">
      <PanelHeader
        title={SYSTEM_PANEL.title}
        subtitle={SYSTEM_PANEL.subtitle}
        action={
          <span className="rounded-full bg-[#FEF0C7] px-3 py-1.5 text-xs font-semibold text-[#B54708]">
            {SYSTEM_PANEL.statusPill}
          </span>
        }
      />
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {SYSTEM_PANEL.kpis.map((kpi) => {
          const meta =
            kpi.label.includes("waiting")
              ? { Icon: Clock, iconClass: "bg-crextio-gray-light text-crextio-dark" }
              : kpi.label.includes("GPU")
                ? { Icon: Cpu, iconClass: "bg-[#FFF9E5] text-crextio-dark" }
                : { Icon: AlertTriangle, iconClass: "bg-[#FEE4E2] text-[#F04438]" };
          const { Icon, iconClass } = meta;

          return (
            <div key={kpi.label} className="stat-metric-card min-w-0">
              <div className="mb-3 flex items-start justify-between gap-2">
                <span className="text-xs font-medium leading-snug text-crextio-gray">{kpi.label}</span>
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconClass}`}>
                  <Icon size={16} strokeWidth={1.75} />
                </span>
              </div>
              <p className="text-[1.75rem] font-light leading-none tracking-tight text-crextio-dark md:text-[2rem]">
                {kpi.value}
              </p>
              <p className="mt-2.5 text-[11px] leading-snug text-crextio-gray">{kpi.sub}</p>
            </div>
          );
        })}
      </div>

      <div className={`mb-5 ${TABLE_CARD}`}>
        <div className="mb-3">
          <p className="text-sm font-semibold text-crextio-dark">Models & services</p>
        </div>

        <div className="overflow-x-auto">
          <table className={`${TABLE_CLASS} min-w-[420px]`}>
            <thead>
              <tr>
                <th className={`w-10 ${TH}`}>
                  <HeaderCheckbox />
                </th>
                <th className={TH}>Service</th>
                <th className={TH}>Details</th>
                <th className={TH}>Status</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_PANEL.models.map((m) => {
                const isSelected = modelSel.selectedId === m.name;
                const style = statusDotStyle(m.status);
                return (
                  <tr
                    key={m.name}
                    onClick={() => modelSel.setSelectedId(m.name)}
                    className={rowClass(isSelected)}
                  >
                    <td className={TD}>
                      <RowCheckbox
                        checked={!!modelSel.checked[m.name]}
                        label={`Select ${m.name}`}
                        onChange={() => modelSel.toggleCheck(m.name)}
                      />
                    </td>
                    <td className={TD}>
                      <p className="text-[13px] font-semibold text-crextio-dark">{m.name}</p>
                    </td>
                    <td className={`max-w-[180px] ${TD}`}>
                      <p className="truncate text-[12px] text-[#6B7280]">{m.sub}</p>
                    </td>
                    <td className={TD}>
                      <DotPill label={m.status} dotClass={style.dot} pillClass={style.pill} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`${CARD} p-5`}>
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-crextio-dark">Queue depth</p>
            <p className="text-[11px] text-crextio-gray">{SYSTEM_PANEL.queueSubtitle}</p>
          </div>
          <p className="text-[11px] text-crextio-gray">{SYSTEM_PANEL.queuePeriod}</p>
        </div>
        <div className="flex h-28 items-end gap-1">
          {SYSTEM_PANEL.queueData.map((v, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t ${v >= 40 ? "bg-crextio-yellow" : "bg-crextio-dark"}`}
              style={{ height: `${Math.round((v / maxQ) * 100)}%` }}
            />
          ))}
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
    <div className="px-4 pt-6 pb-6 xl:px-8">
      <PanelHeader title="Requests" subtitle={REQUESTS_PANEL.subtitle} />
      <div className="mb-5">
        <FilterPills options={REQUESTS_PANEL.filters} value={filter} onChange={setFilter} />
      </div>

      <div className="flex flex-col gap-4">
        {items.map((req) => (
          <div key={req.id} className={`${CARD} overflow-hidden p-0`}>
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    req.tone === "danger" ? "bg-[#FEE4E2] text-[#F04438]" : "bg-[#F7F8FA] text-crextio-gray"
                  }`}
                >
                  {req.tone === "danger" ? <X size={18} /> : <RefreshCw size={18} />}
                </span>
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-crextio-dark">{req.title}</p>
                    <StatusBadge label={req.status} />
                  </div>
                  <p className="text-xs text-crextio-gray">{req.description}</p>
                  <p className="mt-2 text-[11px] text-crextio-gray">{req.meta}</p>
                </div>
              </div>
              {req.status === "Pending" ? (
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => approveRequest(req.id, req.title)}
                    className="rounded-full bg-crextio-dark px-4 py-2 text-xs font-semibold text-white"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-crextio-dark"
                  >
                    Decline
                  </button>
                </div>
              ) : null}
            </div>
            <div className="border-t border-[#EEF0F3] bg-[#FAF8F4] px-5 py-3 text-[11px] leading-relaxed text-crextio-gray">
              {req.onApproval}
            </div>
          </div>
        ))}
      </div>

      <RequestApprovedModal
        open={!!approvedTitle}
        requestTitle={approvedTitle}
        onClose={() => setApprovedTitle(null)}
      />
    </div>
  );
}

export function AuditPanel() {
  const [filter, setFilter] = useState("All");
  const { selectedId, setSelectedId, checked, toggleCheck } = useTableSelection("0");
  const entries =
    filter === "All"
      ? AUDIT_PANEL.entries
      : AUDIT_PANEL.entries.filter((e) => e.severity.toLowerCase() === filter.toLowerCase());

  return (
    <div className="px-4 pt-6 pb-6 xl:px-8">
      <PanelHeader title="Audit log" subtitle={AUDIT_PANEL.subtitle} />

      <div className={TABLE_CARD}>
        <TableToolbar
          filters={AUDIT_PANEL.filters}
          filterValue={filter}
          onFilterChange={setFilter}
          searchPlaceholder="Search actor, action, company..."
          actions={
            <>
              <span className="rounded-full border border-black/8 bg-white px-3.5 py-2 text-xs font-medium text-crextio-gray">
                {AUDIT_PANEL.dateRange}
              </span>
              <OutlinePillButton>Export full log</OutlinePillButton>
            </>
          }
        />

        <div className="overflow-x-auto">
          <table className={`${TABLE_CLASS} min-w-[800px]`}>
            <thead>
              <tr>
                <th className={`w-10 ${TH}`}>
                  <HeaderCheckbox />
                </th>
                <th className={TH}>Action</th>
                <th className={TH}>Actor</th>
                <th className={TH}>Company</th>
                <th className={TH}>Severity</th>
                <th className={TH}>Time</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((row, i) => {
                const rowId = String(i);
                const isSelected = selectedId === rowId;
                const style = statusDotStyle(row.severity);
                return (
                  <tr
                    key={`${row.action}-${i}`}
                    onClick={() => setSelectedId(rowId)}
                    className={rowClass(isSelected)}
                  >
                    <td className={TD}>
                      <RowCheckbox
                        checked={!!checked[rowId]}
                        label={`Select ${row.action}`}
                        onChange={() => toggleCheck(rowId)}
                      />
                    </td>
                    <td className={TD}>
                      <p className="text-[13px] font-semibold text-crextio-dark">{row.action}</p>
                    </td>
                    <td className={`${TD} text-[12px] text-[#6B7280]`}>{row.actor}</td>
                    <td className={`${TD} text-[13px] text-crextio-dark`}>{row.company}</td>
                    <td className={TD}>
                      <DotPill label={row.severity} dotClass={style.dot} pillClass={style.pill} />
                    </td>
                    <td className={`whitespace-nowrap ${TD} text-[12px] text-[#9CA3AF]`}>{row.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-3 border-t border-[#EEF0F3] pt-3">
          <p className="text-[11px] text-crextio-gray">{AUDIT_PANEL.footer}</p>
        </div>
      </div>
    </div>
  );
}

export function SettingsPanel() {
  const p = SETTINGS_PANEL.profile;

  return (
    <div className="px-4 pt-6 pb-6 xl:px-8">
      <PanelHeader title="Platform settings" subtitle={SETTINGS_PANEL.subtitle} />

      <div className={`${CARD} mb-5 p-5`}>
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-crextio-dark text-sm font-bold text-white">
              {PLATFORM.initials}
            </span>
            <div>
              <p className="text-sm font-semibold text-crextio-dark">My profile</p>
              <p className="text-xs text-crextio-gray">{p.roleLine}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="button" className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-crextio-dark">
              Change password
            </button>
            <button type="button" className="rounded-full bg-crextio-dark px-4 py-2 text-xs font-semibold text-white">
              Save changes
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { label: "Full name", value: p.name },
            { label: "Email address", value: p.email },
            { label: "Phone number", value: p.phone },
            { label: "Job title", value: p.title },
          ].map((field) => (
            <label key={field.label} className="block">
              <span className="mb-1.5 block text-xs font-medium text-crextio-gray">{field.label}</span>
              <input
                readOnly
                value={field.value}
                className="w-full rounded-xl border border-black/8 bg-[#F7F8FA] px-3 py-2.5 text-sm text-crextio-dark outline-none"
              />
            </label>
          ))}
        </div>
      </div>

      <div className={`${CARD} p-5`}>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-crextio-dark">Platform staff</p>
            <p className="mt-1 text-xs text-crextio-gray">
              Scoped roles so finance and support do not need full super-admin rights.
            </p>
          </div>
          <button type="button" className="flex shrink-0 items-center gap-1 rounded-full bg-crextio-dark px-4 py-2 text-xs font-semibold text-white">
            <Plus size={14} />
            Invite staff
          </button>
        </div>
        <ul className="flex flex-col">
          {SETTINGS_PANEL.staff.map((s, i) => (
            <li
              key={s.email}
              className={`flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between ${
                i > 0 ? "border-t border-[#EEF0F3]" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-crextio-yellow text-xs font-bold text-crextio-dark">
                  {s.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-crextio-dark">{s.name}</p>
                  <p className="text-[11px] text-crextio-gray">{s.email}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                <StatusBadge label={s.role} />
                <p className="text-[11px] text-crextio-gray">{s.scope}</p>
                <button type="button" className="text-xs font-semibold text-crextio-dark hover:underline">
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
