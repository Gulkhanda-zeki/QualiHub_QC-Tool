import { useEffect, useId, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const PLANS = [
  "Pro · 3,000 min · 12 seats",
  "Standard · 1,000 min · 6 seats",
  "Max · custom · unlimited",
];

const fieldClass =
  "mt-2 w-full rounded-2xl border border-[#E8E2D9] bg-white px-4 py-3 text-sm text-crextio-dark outline-none transition-shadow placeholder:text-[#B0B0B0] focus:border-crextio-dark/25 focus:shadow-[0_0_0_3px_rgba(26,26,26,0.06)]";

type AddClientWorkspaceModalProps = {
  open: boolean;
  onClose: () => void;
};

export function AddClientWorkspaceModal({ open, onClose }: AddClientWorkspaceModalProps) {
  const titleId = useId();
  const [companyName, setCompanyName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [plan, setPlan] = useState(PLANS[0]);

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
    if (!open) {
      setCompanyName("");
      setAdminEmail("");
      setPlan(PLANS[0]);
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
          Create Organization
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-crextio-gray">
          Creates the company, its licence and the admin login. The invite is emailed — no password is
          stored or shown again.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
          <label className="block">
            <span className="text-sm font-semibold text-crextio-dark">Company name</span>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Acme Contact Center"
              className={fieldClass}
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-crextio-dark">Company admin email</span>
            <input
              type="email"
              required
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="owner@acmecc.com"
              className={fieldClass}
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-crextio-dark">Plan</span>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className={`${fieldClass} appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%239CA3AF%22 stroke-width=%222%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
            >
              {PLANS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
              Add Organization
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
