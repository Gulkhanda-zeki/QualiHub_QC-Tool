import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, X } from "lucide-react";

export type ReviewRequestAlert = {
  id: string;
  title: string;
  sub: string;
  tag: string;
  time: string;
};

type ReviewRequestModalProps = {
  open: boolean;
  alert: ReviewRequestAlert | null;
  onClose: () => void;
};

export function ReviewRequestModal({ open, alert, onClose }: ReviewRequestModalProps) {
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

  if (!open || !alert) return null;

  const raisedLabel = alert.time === "today" ? "raised today" : `raised ${alert.time}`;

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
        className="relative z-10 w-full max-w-[520px] rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_24px_64px_rgba(0,0,0,0.18)] sm:p-8"
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
          {alert.title}
        </h2>

        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          <span className="inline-flex rounded-lg bg-[#F3F0E8] px-2.5 py-1 text-[11px] font-semibold text-[#6B7280]">
            {alert.tag}
          </span>
          <span className="text-[12px] text-[#9CA3AF]">{raisedLabel}</span>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-[#6B7280]">{alert.sub}</p>

        <button
          type="button"
          className="mt-5 flex w-full items-center justify-between gap-3 rounded-2xl bg-[#F3F0E8] px-4 py-3.5 text-left text-sm font-semibold text-crextio-dark transition-colors hover:bg-[#EDE9DF]"
        >
          Open the full record for the details
          <ArrowRight size={16} className="shrink-0 text-crextio-dark" strokeWidth={2} />
        </button>

        <div className="mt-7 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-[#E8E2D9] bg-white px-5 py-2.5 text-sm font-semibold text-crextio-dark transition-colors hover:bg-[#FAF8F4]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-crextio-dark px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Review request
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
