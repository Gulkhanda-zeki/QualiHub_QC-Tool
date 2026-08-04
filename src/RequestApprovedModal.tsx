import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { Check, X } from "lucide-react";

type RequestApprovedModalProps = {
  open: boolean;
  requestTitle: string | null;
  onClose: () => void;
};

export function RequestApprovedModal({ open, requestTitle, onClose }: RequestApprovedModalProps) {
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
        className="relative z-10 w-full max-w-[440px] rounded-[28px] border border-white/80 bg-white p-6 text-center shadow-[0_24px_64px_rgba(0,0,0,0.18)] sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-crextio-gray hover:bg-black/5 hover:text-crextio-dark"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ECFDF3]">
          <Check size={28} className="text-[#027A48]" strokeWidth={2.5} />
        </div>

        <h2 id={titleId} className="mt-5 text-2xl font-bold tracking-tight text-crextio-dark">
          Request approved successfully
        </h2>
        {requestTitle ? (
          <p className="mt-2 text-sm font-medium text-crextio-dark">{requestTitle}</p>
        ) : null}
        <p className="mt-3 text-sm leading-relaxed text-crextio-gray">
          The change will reflect on the organization admin panel shortly.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-7 w-full rounded-2xl bg-crextio-dark px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto sm:min-w-[140px]"
        >
          Done
        </button>
      </div>
    </div>,
    document.body,
  );
}
