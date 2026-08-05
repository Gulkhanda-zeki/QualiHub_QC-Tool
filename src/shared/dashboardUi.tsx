import { useEffect, useId, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { LogOut, X } from "lucide-react";

export const PANEL_SHELL = "px-4 pt-6 pb-6 xl:px-8";
export const CARD = "crextio-card !bg-white";
export const CARD_DARK = "crextio-card-dark";

export const FIELD_CLASS =
  "mt-2 w-full rounded-2xl border border-[#E8E2D9] bg-white px-4 py-3 text-sm text-crextio-dark outline-none transition-shadow placeholder:text-[#B0B0B0] focus:border-crextio-dark/25 focus:shadow-[0_0_0_3px_rgba(26,26,26,0.06)]";

export const BTN_PRIMARY =
  "flex shrink-0 items-center gap-2 rounded-full bg-crextio-dark px-4 py-2.5 text-sm font-medium text-white";

export const BTN_MODAL_CANCEL =
  "rounded-2xl border border-[#E8E2D9] bg-white px-5 py-2.5 text-sm font-semibold text-crextio-dark transition-colors hover:bg-[#FAF8F4]";

export const BTN_MODAL_PRIMARY =
  "rounded-2xl bg-crextio-dark px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90";

export function PanelHeader({
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

export function StatusBadge({ label }: { label: string }) {
  const styles: Record<string, string> = {
    Active: "bg-[#D1FADF] text-[#027A48]",
    Paid: "bg-[#D1FADF] text-[#027A48]",
    Warm: "bg-[#D1FADF] text-[#027A48]",
    Saved: "bg-[#D1FADF] text-[#027A48]",
    Unpaid: "border border-[#F04438]/40 text-[#B42318] bg-[#FEE4E2]",
    Suspended: "bg-[#FEF0C7] text-[#B54708]",
    Cancelled: "border border-black/15 text-crextio-gray bg-transparent",
    Trial: "border border-black/15 text-crextio-gray bg-transparent",
    Pending: "bg-[#FEF0C7] text-[#B54708]",
    Approved: "bg-[#D1FADF] text-[#027A48]",
    Declined: "bg-[#FEE4E2] text-[#B42318]",
    Refunded: "bg-[#F2F4F7] text-[#667085]",
    Degraded: "bg-[#FEF0C7] text-[#B54708]",
    Pro: "bg-crextio-yellow/50 text-crextio-dark",
    Standard: "bg-[#F7F8FA] text-crextio-dark",
    high: "bg-[#FEE4E2] text-[#B42318]",
    medium: "bg-[#FEF0C7] text-[#B54708]",
    low: "bg-[#F2F4F7] text-[#667085]",
    Low: "bg-[#D1FADF] text-[#027A48]",
    Medium: "bg-[#FEF0C7] text-[#B54708]",
    High: "bg-[#FEE4E2] text-[#B42318]",
    Request: "bg-[#FEE4E2] text-[#B42318]",
    Billing: "bg-[#FEF0C7] text-[#B54708]",
    Usage: "bg-[#FFEAD5] text-[#C4320A]",
    Agent: "bg-[#FFEAD5] text-[#C4320A]",
    "QA Lead": "bg-[#F7F8FA] text-crextio-dark",
    "QA Assistant": "bg-[#D1FADF] text-[#027A48]",
    Mandatory: "bg-[#FEE4E2] text-[#B42318]",
    "Mandatory fail": "bg-[#FEE4E2] text-[#B42318]",
    Compliance: "bg-[#FCE7F3] text-[#C11574]",
    Pattern: "bg-[#FEF0C7] text-[#B54708]",
    PDF: "bg-[#FEE4E2] text-[#B42318]",
    CSV: "bg-[#D1FADF] text-[#027A48]",
    Support: "bg-[#F7F8FA] text-crextio-dark",
    Finance: "bg-[#D1FADF] text-[#027A48]",
    Passed: "bg-[#D1FADF] text-[#027A48]",
    Flagged: "bg-[#FEE4E2] text-[#B42318]",
    Review: "bg-[#FEF0C7] text-[#B54708]",
    Overdue: "bg-[#FEE4E2] text-[#B42318]",
    Open: "bg-[#FEF0C7] text-[#B54708]",
    Done: "bg-[#D1FADF] text-[#027A48]",
    Paused: "bg-[#FEF0C7] text-[#B54708]",
    Optional: "bg-[#EEF4FF] text-[#3538CD]",
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

export function StatMetricCard({
  label,
  value,
  sub,
  accent,
  badge,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
  badge?: string;
}) {
  return (
    <div className="stat-metric-card min-w-0">
      <p className="text-xs font-medium text-crextio-gray">{label}</p>
      {badge ? (
        <div className="mt-2">
          <StatusBadge label={badge} />
        </div>
      ) : (
        <p className={`mt-2 text-[1.75rem] font-light leading-none tracking-tight text-crextio-dark md:text-[2rem] ${accent ?? ""}`}>
          {value}
        </p>
      )}
      {sub && <p className="mt-2 text-[11px] text-crextio-gray">{sub}</p>}
    </div>
  );
}

export function DashboardModal({
  open,
  onClose,
  title,
  subtitle,
  step,
  children,
  footer,
  maxWidth = "520px",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  step?: string;
  children: ReactNode;
  footer: ReactNode;
  maxWidth?: string;
}) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-[#1A1A1A]/35 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_24px_64px_rgba(0,0,0,0.18)] sm:p-8"
        style={{ maxWidth }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-crextio-gray hover:bg-black/5 hover:text-crextio-dark"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <h2 id={titleId} className="pr-8 text-2xl font-bold tracking-tight text-crextio-dark">
          {title}
        </h2>
        {subtitle && <p className="mt-2 text-sm leading-relaxed text-crextio-gray">{subtitle}</p>}
        {step && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-medium text-crextio-gray">{step}</p>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-full ${i === 0 ? "bg-crextio-dark" : "bg-black/10"}`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-7">{children}</div>
        <div className="mt-7 flex flex-wrap justify-end gap-3">{footer}</div>
      </div>
    </div>,
    document.body,
  );
}

export function FormLabel({ children }: { children: ReactNode }) {
  return <span className="text-sm font-semibold text-crextio-dark">{children}</span>;
}

export function SidebarFooter({
  collapsed,
  onLogout,
}: {
  collapsed: boolean;
  onLogout: () => void;
}) {
  const year = new Date().getFullYear();

  return (
    <div className={`sidebar-footer mt-auto mb-5 border-t border-black/5 pt-4 ${collapsed ? "w-full" : ""}`}>
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
        onClick={onLogout}
        className={`flex w-full items-center gap-2.5 rounded-xl border border-[#F04438]/18 bg-[#FEF3F2] px-3.5 py-2.5 text-sm font-semibold text-[#B42318] transition-colors hover:border-[#F04438]/30 hover:bg-[#FEE4E2] ${
          collapsed ? "justify-center px-2.5" : ""
        }`}
      >
        <LogOut size={16} strokeWidth={2} className="shrink-0" />
        {!collapsed && "Logout"}
      </button>
      {!collapsed ? (
        <p className="mt-3 px-3 text-[10px] leading-relaxed text-[#A3A3A3]">
          <span className="font-medium text-[#8E8E8E]">© {year} QC Tool</span>
          <br />
          by Zeki Experts Solution
        </p>
      ) : (
        <p
          className="mt-3 text-center text-[9px] leading-tight text-[#A3A3A3]"
          title="QC Tool by Zeki Experts Solution"
        >
          © {year}
        </p>
      )}
    </div>
  );
}
