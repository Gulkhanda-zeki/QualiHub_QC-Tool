import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { QA_CALLS, getQACallDetail } from "../data/qaleadMockData";
import { ScoreDisputeModal } from "./ScoreDisputeModal";
import "./qalead.css";

type CallRow = (typeof QA_CALLS)[number];

function qaScoreStyle(score: number) {
  if (score >= 85) return { ring: "#0E7A57", fg: "#0E7A57" };
  if (score >= 70) return { ring: "#ffd54f", fg: "#8A5A00" };
  return { ring: "#C4362F", fg: "#C4362F" };
}

function statusStyle(status: string) {
  if (status === "Passed") return { bg: "#E3F8F0", fg: "#0E7A57" };
  if (status === "Review") return { bg: "#FFF4DE", fg: "#8A5A00" };
  return { bg: "#FBE9E7", fg: "#C4362F" };
}

export function CallDetailModal({
  call,
  open,
  onClose,
  onMarkReviewed,
}: {
  call: CallRow | null;
  open: boolean;
  onClose: () => void;
  onMarkReviewed?: () => void;
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
  const score = qaScoreStyle(call.qa);
  const status = statusStyle(call.status);

  return createPortal(
    <div className="ql-call-modal-overlay">
      <button type="button" className="ql-call-modal-backdrop" aria-label="Close dialog" onClick={onClose} />

      <div role="dialog" aria-modal="true" aria-labelledby={titleId} className="ql-call-modal">
        <div className="ql-call-modal-header">
          <div className="ql-call-modal-header-top">
            <div
              className="ql-call-modal-score-ring"
              style={{ background: `${score.ring}28`, borderColor: score.ring }}
            >
              <span className="ql-call-modal-score-inner" style={{ color: score.fg }}>
                {call.qa}
              </span>
            </div>

            <div className="ql-call-modal-head-text">
              <div className="ql-call-modal-badges">
                <span className="ql-call-modal-id">{detail.callId}</span>
                <span className="ql-call-modal-status" style={{ background: status.bg, color: status.fg }}>
                  {call.status}
                </span>
                <span className="ql-call-modal-sentiment">{detail.sentiment}</span>
              </div>
              <h2 id={titleId} className="ql-call-modal-filename">
                {call.file}
              </h2>
              <p className="ql-call-modal-subline ql-mono">
                {detail.checkpointsSummary} · {detail.processed} · {detail.reviewNote}
              </p>
            </div>

            <button type="button" className="ql-call-modal-close" onClick={onClose} aria-label="Close">
              <X size={16} strokeWidth={2} />
            </button>
          </div>

          <div className="ql-call-modal-meta-grid">
            {[
              { label: "Agent", value: call.agent },
              { label: "Campaign", value: call.campaign },
              { label: "Length", value: detail.length },
              { label: "Compute", value: detail.compute },
            ].map((stat) => (
              <div key={stat.label} className="ql-call-modal-meta-card">
                <div className="ql-call-modal-meta-label">{stat.label}</div>
                <div className="ql-call-modal-meta-value">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="ql-call-modal-body">
          <section className="ql-call-modal-summary">
            <div className="ql-call-modal-summary-label">AI SUMMARY</div>
            <p className="ql-call-modal-summary-text">{detail.aiSummary}</p>
          </section>

          {detail.riskFlags.length > 0 ? (
            <section className="ql-call-modal-section">
              <h3 className="ql-call-modal-section-title">Risk flags</h3>
              <ul className="ql-call-modal-flags">
                {detail.riskFlags.map((flag) => (
                  <li key={flag} className="ql-call-modal-flag">
                    <span aria-hidden>●</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="ql-call-modal-section">
            <h3 className="ql-call-modal-section-title">Checkpoints</h3>
            <ul className="ql-call-modal-checkpoints">
              {detail.checkpoints.map((cp) => (
                <li key={cp.name} className="ql-call-modal-checkpoint">
                  <div className="ql-call-modal-checkpoint-head">
                    <span
                      className={`ql-call-modal-cp-badge ${cp.pass ? "pass" : "fail"}`}
                    >
                      {cp.pass ? "PASS" : "FAIL"}
                    </span>
                    <span className="ql-call-modal-cp-name">{cp.name}</span>
                  </div>
                  <p className="ql-call-modal-cp-evidence">{cp.evidence}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="ql-call-modal-section">
            <h3 className="ql-call-modal-section-title">Transcript</h3>
            <ul className="ql-call-modal-transcript">
              {detail.transcript.map((line, i) => (
                <li
                  key={`${line.time}-${i}`}
                  className={`ql-call-modal-turn ${line.highlight ? "highlight" : ""}`}
                >
                  <div className="ql-call-modal-turn-head">
                    <span className={`ql-call-modal-speaker ${line.speaker === "Agent" ? "agent" : "customer"}`}>
                      {line.speaker}
                    </span>
                    <span className="ql-call-modal-time ql-mono">{line.time}</span>
                  </div>
                  <p className="ql-call-modal-turn-text">{line.text}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="ql-call-modal-footer">
          <button type="button" className="ql-call-modal-footer-btn">
            Coach agent
          </button>
          <button type="button" className="ql-call-modal-footer-btn" onClick={() => setDisputeOpen(true)}>
            Review score
          </button>
          <button
            type="button"
            className="ql-btn-primary ql-call-modal-mark"
            onClick={() => {
              onMarkReviewed?.();
              onClose();
            }}
          >
            Mark reviewed
          </button>
        </div>
      </div>

      <ScoreDisputeModal call={call} open={disputeOpen} onClose={() => setDisputeOpen(false)} />
    </div>,
    document.body,
  );
}
