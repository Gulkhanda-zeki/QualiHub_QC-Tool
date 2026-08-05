import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { QA_CALLS, getQACallDetail } from "../data/qaleadMockData";
import { StatusBadge, BTN_MODAL_CANCEL, BTN_MODAL_PRIMARY } from "../shared/dashboardUi";
import { ScoreDisputeModal } from "./ScoreDisputeModal";

type CallRow = (typeof QA_CALLS)[number];

function qaScoreRing(score: number) {
  if (score >= 85) return "border-[#A6F4C5] bg-[#ECFDF3] text-[#027A48]";
  if (score >= 70) return "border-[#FEDF89] bg-[#FFFAEB] text-[#B54708]";
  return "border-[#FECDCA] bg-[#FEF3F2] text-[#B42318]";
}

export function CallDetailModal({
  call,
  open,
  onClose,
}: {
  call: CallRow | null;
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const [disputeOpen, setDisputeOpen] = useState(false);

  useEffect(() => {
    if (!open) setDisputeOpen(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (disputeOpen) setDisputeOpen(false);
        else onClose();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, disputeOpen]);

  if (!open || !call) return null;

  const detail = getQACallDetail(call);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-[3px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(90vh,820px)] w-full max-w-[720px] flex-col overflow-hidden rounded-[28px] border border-white/20 bg-[#fdfcf8] shadow-[0_24px_64px_rgba(0,0,0,0.22)]"
      >
        <div className="shrink-0 bg-crextio-dark px-5 pb-5 pt-5 text-white sm:px-6">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-1 gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 text-xl font-bold ${qaScoreRing(call.qa)}`}
              >
                {call.qa}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-white/90">
                    {detail.callId}
                  </span>
                  <StatusBadge label={call.status} />
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/70">
                    {detail.sentiment}
                  </span>
                </div>
                <h2 id={titleId} className="truncate font-mono text-lg font-bold tracking-tight sm:text-xl">
                  {call.file}
                </h2>
                <p className="mt-1 text-xs text-white/60">
                  {detail.checkpointsSummary} · {detail.processed} · {detail.reviewNote}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Agent", value: call.agent },
              { label: "Campaign", value: call.campaign },
              { label: "Length", value: detail.length },
              { label: "Compute", value: detail.compute },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/5 px-3 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/45">{stat.label}</p>
                <p className="mt-0.5 truncate text-sm font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          <section className="mb-4 rounded-2xl border border-[#FEDF89] bg-[#FFFAEB] p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#B54708]">AI summary</p>
            <p className="mt-2 text-sm leading-relaxed text-[#7A4F01]">{detail.aiSummary}</p>
          </section>

          {detail.riskFlags.length > 0 && (
            <section className="mb-4">
              <p className="mb-2 text-xs font-semibold text-crextio-dark">Risk flags</p>
              <ul className="space-y-2">
                {detail.riskFlags.map((flag) => (
                  <li
                    key={flag}
                    className="flex items-start gap-2 rounded-xl border border-[#FECDCA] bg-[#FEF3F2] px-3.5 py-2.5 text-sm text-[#B42318]"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F04438]" />
                    {flag}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mb-4">
            <p className="mb-2 text-xs font-semibold text-crextio-dark">Checkpoints</p>
            <ul className="space-y-2">
              {detail.checkpoints.map((cp) => (
                <li
                  key={cp.name}
                  className="rounded-2xl border border-black/5 bg-white px-3.5 py-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                        cp.pass ? "bg-[#ECFDF3] text-[#027A48]" : "bg-[#FEF3F2] text-[#B42318]"
                      }`}
                    >
                      {cp.pass ? "Pass" : "Fail"}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-crextio-dark">{cp.name}</p>
                      <p className="mt-0.5 text-xs text-crextio-gray">{cp.evidence}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p className="mb-2 text-xs font-semibold text-crextio-dark">Transcript</p>
            <ul className="space-y-2.5">
              {detail.transcript.map((line, i) => (
                <li
                  key={`${line.time}-${i}`}
                  className={`rounded-2xl px-3.5 py-2.5 ${
                    line.highlight
                      ? "border border-[#FECDCA] bg-[#FEF3F2]"
                      : "border border-black/5 bg-white"
                  }`}
                >
                  <div className="mb-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide">
                    <span className={line.speaker === "Agent" ? "text-[#3538CD]" : "text-[#B54708]"}>
                      {line.speaker}
                    </span>
                    <span className="text-crextio-gray">{line.time}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-crextio-dark">{line.text}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-black/5 bg-white px-5 py-4 sm:px-6">
          <div className="flex flex-wrap gap-2">
            <button type="button" className={BTN_MODAL_CANCEL}>
              Coach agent
            </button>
            <button type="button" className={BTN_MODAL_CANCEL} onClick={() => setDisputeOpen(true)}>
              Review score
            </button>
          </div>
          <button type="button" className={BTN_MODAL_PRIMARY} onClick={onClose}>
            Mark reviewed
          </button>
        </div>
      </div>

      <ScoreDisputeModal call={call} open={disputeOpen} onClose={() => setDisputeOpen(false)} />
    </div>,
    document.body,
  );
}
