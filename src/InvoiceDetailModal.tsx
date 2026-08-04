import { useEffect, useId, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { DotPill, statusDotStyle } from "./tableUi";

export type InvoiceDetail = {
  id: string;
  company: string;
  plan: string;
  amount: string;
  status: string;
  note: string;
  action: string;
};

type InvoiceDetailModalProps = {
  open: boolean;
  invoice: InvoiceDetail | null;
  onClose: () => void;
  onMarkPaid?: (id: string) => void;
};

function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#EEF0F3] py-3 last:border-0">
      <span className="shrink-0 text-[12px] font-medium text-[#9CA3AF]">{label}</span>
      <div className="min-w-0 text-right text-sm font-semibold text-crextio-dark">{children}</div>
    </div>
  );
}

export function InvoiceDetailModal({
  open,
  invoice,
  onClose,
  onMarkPaid,
}: InvoiceDetailModalProps) {
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

  if (!open || !invoice) return null;

  const style = statusDotStyle(invoice.status);
  const [planName, period] = invoice.plan.split(" · ");

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
        className="relative z-10 w-full max-w-[480px] rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_24px_64px_rgba(0,0,0,0.18)] sm:p-8"
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
          Invoice {invoice.id}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-crextio-gray">
          Billing details for {invoice.company}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <DotPill label={invoice.status} dotClass={style.dot} pillClass={style.pill} />
          {planName && (
            <span className="rounded-lg bg-[#F3F0E8] px-2.5 py-1 text-[11px] font-semibold text-[#6B7280]">
              {planName}
            </span>
          )}
        </div>

        <div className="mt-6 rounded-2xl bg-[#F7F8FA] px-4">
          <DetailRow label="Company">{invoice.company}</DetailRow>
          <DetailRow label="Period">{period ?? invoice.plan}</DetailRow>
          <DetailRow label="Amount">
            <span className="tabular-nums">{invoice.amount}</span>
          </DetailRow>
          <DetailRow label="Status">{invoice.status}</DetailRow>
          <DetailRow label="Note">
            <span
              className={
                invoice.note !== "—" ? "font-medium text-[#B42318]" : "font-medium text-[#9CA3AF]"
              }
            >
              {invoice.note}
            </span>
          </DetailRow>
        </div>

        <div className="mt-7 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-[#E8E2D9] bg-white px-5 py-2.5 text-sm font-semibold text-crextio-dark transition-colors hover:bg-[#FAF8F4]"
          >
            Close
          </button>
          {invoice.action === "Mark paid" && onMarkPaid ? (
            <button
              type="button"
              onClick={() => {
                onMarkPaid(invoice.id);
                onClose();
              }}
              className="rounded-2xl bg-crextio-dark px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Mark paid
            </button>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
