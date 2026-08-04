import { useEffect, useId, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const fieldClass =
  "mt-2 w-full rounded-2xl border border-[#E8E2D9] bg-white px-4 py-3 text-sm text-crextio-dark outline-none transition-shadow placeholder:text-[#B0B0B0] focus:border-crextio-dark/25 focus:shadow-[0_0_0_3px_rgba(26,26,26,0.06)]";

type EditPlanCatalogModalProps = {
  open: boolean;
  onClose: () => void;
};

export function EditPlanCatalogModal({ open, onClose }: EditPlanCatalogModalProps) {
  const titleId = useId();
  const [planName, setPlanName] = useState("Pro");
  const [price, setPrice] = useState("$100");
  const [minutes, setMinutes] = useState("3000");
  const [seats, setSeats] = useState("12");

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

  useEffect(() => {
    if (open) {
      setPlanName("Pro");
      setPrice("$100");
      setMinutes("3000");
      setSeats("12");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClose();
  };

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
          Edit plan catalog
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-crextio-gray">
          New prices apply to new subscriptions straight away, and to existing companies on their next
          invoice.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
          <label className="block">
            <span className="text-sm font-semibold text-crextio-dark">Plan name</span>
            <input
              type="text"
              required
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="Pro"
              className={fieldClass}
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-crextio-dark">Price per month</span>
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="$100"
              className={fieldClass}
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-crextio-dark">Minutes included</span>
            <input
              type="text"
              required
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              placeholder="3000"
              className={fieldClass}
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-crextio-dark">Seats included</span>
            <input
              type="text"
              required
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              placeholder="12"
              className={fieldClass}
            />
          </label>

          <div className="mt-2 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-[#E8E2D9] bg-white px-5 py-2.5 text-sm font-semibold text-crextio-dark transition-colors hover:bg-[#FAF8F4]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-crextio-dark px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Save plans
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
