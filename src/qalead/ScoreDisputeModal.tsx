import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, X } from "lucide-react";
import { QA_CALLS, getQAScoreDispute } from "../data/qaleadMockData";
import { BTN_MODAL_CANCEL, BTN_MODAL_PRIMARY } from "../shared/dashboardUi";

type CallRow = (typeof QA_CALLS)[number];

function UpholdConfirmModal({
  score,
  open,
  onCancel,
  onConfirm,
}: {
  score: number;
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-[#1A1A1A]/50 backdrop-blur-[4px]"
        onClick={onCancel}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-[440px] rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_24px_64px_rgba(0,0,0,0.22)] sm:p-8"
      >
        <h2 id={titleId} className="text-2xl font-bold tracking-tight text-crextio-dark">
          Uphold the original score?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-crextio-gray">
          The score stays at {score}, and the agent is notified with your reason.
        </p>
        <div className="mt-7 flex flex-wrap justify-end gap-3">
          <button type="button" className={BTN_MODAL_CANCEL} onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className={BTN_MODAL_PRIMARY} onClick={onConfirm}>
            Uphold score
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function ReviseConfirmModal({
  currentScore,
  claimedScore,
  open,
  onCancel,
  onConfirm,
}: {
  currentScore: number;
  claimedScore: number;
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-[#1A1A1A]/50 backdrop-blur-[4px]"
        onClick={onCancel}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-[440px] rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_24px_64px_rgba(0,0,0,0.22)] sm:p-8"
      >
        <h2 id={titleId} className="text-2xl font-bold tracking-tight text-crextio-dark">
          Revise this score?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-crextio-gray">
          {currentScore} → {claimedScore}. The scorecard, the agent average and the compliance report will all update.
        </p>
        <div className="mt-7 flex flex-wrap justify-end gap-3">
          <button type="button" className={BTN_MODAL_CANCEL} onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className={BTN_MODAL_PRIMARY} onClick={onConfirm}>
            Revise score
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function PanelConfirmModal({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-[#1A1A1A]/50 backdrop-blur-[4px]"
        onClick={onCancel}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-[440px] rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_24px_64px_rgba(0,0,0,0.22)] sm:p-8"
      >
        <h2 id={titleId} className="text-2xl font-bold tracking-tight text-crextio-dark">
          Send to calibration panel?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-crextio-gray">
          Three reviewers will be assigned to re-score the call blind.
        </p>
        <div className="mt-7 flex flex-wrap justify-end gap-3">
          <button type="button" className={BTN_MODAL_CANCEL} onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className={BTN_MODAL_PRIMARY} onClick={onConfirm}>
            Send to panel
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function ScoreDisputeModal({
  call,
  open,
  onClose,
}: {
  call: CallRow | null;
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const [upholdOpen, setUpholdOpen] = useState(false);
  const [reviseOpen, setReviseOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      setUpholdOpen(false);
      setReviseOpen(false);
      setPanelOpen(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (upholdOpen) setUpholdOpen(false);
        else if (reviseOpen) setReviseOpen(false);
        else if (panelOpen) setPanelOpen(false);
        else onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, upholdOpen, reviseOpen, panelOpen]);

  if (!open || !call) return null;

  const dispute = getQAScoreDispute(call);

  return createPortal(
    <>
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-[#1A1A1A]/45 backdrop-blur-[3px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-[520px] rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_24px_64px_rgba(0,0,0,0.2)] sm:p-8"
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
          Score dispute · {dispute.callId}
        </h2>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 rounded-2xl border border-[#FECDCA] bg-[#FEF3F2] px-4 py-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#B42318]">Current score</p>
            <p className="mt-1 text-4xl font-bold text-[#B42318]">{dispute.currentScore}</p>
          </div>
          <ArrowRight size={18} className="shrink-0 text-crextio-gray" aria-hidden />
          <div className="flex-1 rounded-2xl border border-[#A6F4C5] bg-[#ECFDF3] px-4 py-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#027A48]">Agent claims</p>
            <p className="mt-1 text-4xl font-bold text-[#027A48]">{dispute.claimedScore}</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-xs font-medium text-crextio-gray">Disputed checkpoint</p>
            <p className="mt-1 text-sm font-semibold text-crextio-dark">{dispute.checkpoint}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-crextio-gray">Reason given by {dispute.reasonBy}</p>
            <p className="mt-1 text-sm leading-relaxed text-crextio-dark">{dispute.reasoning}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <button type="button" className={BTN_MODAL_CANCEL} onClick={() => setPanelOpen(true)}>
            Send to panel
          </button>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={BTN_MODAL_CANCEL} onClick={() => setUpholdOpen(true)}>
              Uphold {dispute.currentScore}
            </button>
            <button type="button" className={BTN_MODAL_PRIMARY} onClick={() => setReviseOpen(true)}>
              Revise to {dispute.claimedScore}
            </button>
          </div>
        </div>
      </div>
    </div>

    <UpholdConfirmModal
      score={dispute.currentScore}
      open={upholdOpen}
      onCancel={() => setUpholdOpen(false)}
      onConfirm={() => {
        setUpholdOpen(false);
        onClose();
      }}
    />

    <ReviseConfirmModal
      currentScore={dispute.currentScore}
      claimedScore={dispute.claimedScore}
      open={reviseOpen}
      onCancel={() => setReviseOpen(false)}
      onConfirm={() => {
        setReviseOpen(false);
        onClose();
      }}
    />

    <PanelConfirmModal
      open={panelOpen}
      onCancel={() => setPanelOpen(false)}
      onConfirm={() => {
        setPanelOpen(false);
        onClose();
      }}
    />
    </>,
    document.body,
  );
}
