import { useState } from "react";
import { Check, MoreHorizontal, Plus } from "lucide-react";
import { getCompanyDetail } from "./data/qcMockData";
import {
  DotPill,
  statusDotStyle,
  TABLE_CLASS,
  TH,
  TD,
  rowClass,
} from "./tableUi";

const CARD = "crextio-card !bg-white";

type CompanyDetailPanelProps = {
  companyId: string;
  onBack: () => void;
};

function UsageBillingTab({
  detail,
}: {
  detail: NonNullable<ReturnType<typeof getCompanyDetail>>;
}) {
  const usage = detail.usageBilling;
  const maxBar = Math.max(...usage.dailyMinutes);
  const [invoices, setInvoices] = useState(usage.invoices);
  const unpaidCount = invoices.filter((i) => i.status === "Unpaid").length;

  const markAllPaid = () => {
    setInvoices((rows) =>
      rows.map((inv) =>
        inv.status === "Unpaid" ? { ...inv, status: "Paid", reason: "—" } : inv,
      ),
    );
  };

  return (
    <>
      <div className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className={`${CARD} p-5 xl:col-span-2`}>
          <p className="text-sm font-semibold text-crextio-dark">Minutes processed</p>
          <p className="mt-1 text-[12px] text-crextio-gray">{usage.chartSubtitle}</p>
          <div className="mt-5 flex h-40 items-end gap-1">
            {usage.dailyMinutes.map((v, i) => {
              const highlight = i + 1 >= usage.highlightFromDay;
              return (
                <div
                  key={i}
                  className={`min-w-0 flex-1 rounded-t ${
                    highlight ? "bg-crextio-yellow" : "bg-crextio-dark"
                  }`}
                  style={{ height: `${Math.max(8, Math.round((v / maxBar) * 100))}%` }}
                  title={`Day ${i + 1}: ${v} min`}
                />
              );
            })}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-crextio-gray">
            {usage.chartLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>

        <div className={`${CARD} flex flex-col p-5`}>
          <p className="mb-3 text-sm font-semibold text-crextio-dark">This period</p>
          <ul className="flex flex-col">
            {usage.periodStats.map((stat) => (
              <li
                key={stat.label}
                className="flex items-center justify-between gap-3 border-t border-[#EEF0F3] py-2.5 first:border-0 first:pt-0"
              >
                <span className="text-[13px] text-crextio-gray">{stat.label}</span>
                <span className="text-[13px] font-semibold tabular-nums text-crextio-dark">
                  {stat.value}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-auto rounded-2xl bg-[#FFF8E0] px-4 py-3">
            <p className="text-[12px] font-semibold text-crextio-dark">{usage.warningTitle}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-crextio-gray">{usage.warningBody}</p>
          </div>
        </div>
      </div>

      <div className={`${CARD} overflow-hidden p-5`}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-crextio-dark">Invoices</p>
            {unpaidCount > 0 ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FECDCA] bg-[#FEF3F2] px-2.5 py-1 text-[11px] font-medium text-[#B42318]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F04438]" />
                {unpaidCount} unpaid
              </span>
            ) : null}
          </div>
          {unpaidCount > 0 ? (
            <button
              type="button"
              onClick={markAllPaid}
              className="rounded-full bg-crextio-dark px-4 py-2 text-xs font-semibold text-white"
            >
              Mark as paid
            </button>
          ) : null}
        </div>

        <div className="overflow-x-auto">
          <table className={`${TABLE_CLASS} min-w-[640px]`}>
            <thead>
              <tr>
                <th className={TH}>Invoice</th>
                <th className={TH}>Period</th>
                <th className={TH}>Amount</th>
                <th className={TH}>Status</th>
                <th className={TH}>Reason if unpaid</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => {
                const style = statusDotStyle(inv.status);
                const isSelected = i === 0;
                return (
                  <tr key={inv.id} className={rowClass(isSelected)}>
                    <td className={TD}>
                      <p className="text-[13px] font-semibold text-crextio-dark">{inv.id}</p>
                    </td>
                    <td className={`${TD} text-[13px] text-[#6B7280]`}>{inv.period}</td>
                    <td className={`${TD} text-[13px] tabular-nums text-crextio-dark`}>{inv.amount}</td>
                    <td className={TD}>
                      <DotPill label={inv.status} dotClass={style.dot} pillClass={style.pill} />
                    </td>
                    <td
                      className={`${TD} text-[12px] ${
                        inv.reason !== "—" ? "text-[#B42318]" : "text-[#9CA3AF]"
                      }`}
                    >
                      {inv.reason}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export function CompanyDetailPanel({ companyId, onBack }: CompanyDetailPanelProps) {
  const [tab, setTab] = useState<"Overview" | "Usage & billing" | "Campaigns">("Overview");
  const detail = getCompanyDetail(companyId);

  if (!detail) {
    return (
      <div className="px-4 pt-6 pb-6 xl:px-8">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-crextio-gray hover:text-crextio-dark"
        >
          ← All companies
        </button>
        <p className="mt-6 text-sm text-crextio-gray">Company not found.</p>
      </div>
    );
  }

  const accessStyle = statusDotStyle(detail.access);
  const seatsAvailable = Math.max(0, detail.seatsTotal - detail.seatsUsed);
  const tabs = ["Overview", "Usage & billing", "Campaigns"] as const;

  return (
    <div className="px-4 pt-6 pb-6 xl:px-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 text-sm font-medium text-crextio-gray transition-colors hover:text-crextio-dark"
      >
        ← All companies
      </button>

      {/* Company header */}
      <div className={`${CARD} mb-4 p-5 md:p-6`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 gap-4">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white"
              style={{ background: detail.color }}
            >
              {detail.initials}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-crextio-dark md:text-[1.75rem]">
                  {detail.name}
                </h1>
                <DotPill label={detail.access} dotClass={accessStyle.dot} pillClass={accessStyle.pill} />
                {detail.invoiceUnpaid ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FECDCA] bg-[#FEF3F2] px-2.5 py-1 text-[11px] font-medium text-[#B42318]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F04438]" />
                    Invoice unpaid
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-crextio-gray">
                {detail.id} · {detail.plan} plan · {detail.industry} · customer since{" "}
                {detail.customerSince} · account owner {detail.accountOwner}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/8 bg-white text-crextio-dark"
            aria-label="More actions"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-5 flex gap-6 border-b border-[#EEF0F3]">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`relative pb-3 text-sm font-semibold transition-colors ${
              tab === t ? "text-crextio-dark" : "text-crextio-gray hover:text-crextio-dark"
            }`}
          >
            {t}
            {tab === t ? (
              <span className="absolute inset-x-0 -bottom-px h-[3px] rounded-full bg-crextio-dark" />
            ) : null}
          </button>
        ))}
      </div>

      {tab === "Overview" ? (
        <>
          {/* Metric cards */}
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className={`${CARD} p-5`}>
              <p className="text-[13px] text-crextio-gray">Minutes used</p>
              <p className="mt-2 text-[1.75rem] font-semibold leading-none tracking-tight text-crextio-dark">
                {detail.minsUsed.toLocaleString()}
              </p>
              <p className="mt-2 text-[12px] text-crextio-gray">
                of {detail.minsTotal.toLocaleString()} · {detail.pct}%
              </p>
            </div>
            <div className={`${CARD} p-5`}>
              <p className="text-[13px] text-crextio-gray">Calls this month</p>
              <p className="mt-2 text-[1.75rem] font-semibold leading-none tracking-tight text-crextio-dark">
                {detail.callsThisMonth.toLocaleString()}
              </p>
              <p className="mt-2 text-[12px] text-[#027A48]">{detail.callsTrend}</p>
            </div>
            <div className={`${CARD} p-5`}>
              <p className="text-[13px] text-crextio-gray">Plan</p>
              <p className="mt-2 text-[1.75rem] font-semibold leading-none tracking-tight text-crextio-dark">
                {detail.plan}
              </p>
              <p className="mt-2 text-[12px] text-crextio-gray">{detail.planPrice}</p>
            </div>
            <div className={`${CARD} p-5`}>
              <p className="text-[13px] text-crextio-gray">Seats</p>
              <p className="mt-2 text-[1.75rem] font-semibold leading-none tracking-tight text-crextio-dark">
                {detail.seatsUsed} / {detail.seatsTotal}
              </p>
              <p className="mt-2 text-[12px] text-crextio-gray">{seatsAvailable} available</p>
            </div>
          </div>

          {/* Onboarding + Notes */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className={`${CARD} p-5 md:p-6`}>
              <p className="mb-5 text-sm font-semibold text-crextio-dark">Onboarding progress</p>
              <ul className="flex flex-col gap-4">
                {detail.onboarding.map((step) => (
                  <li key={step.label} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {step.done ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#12B76A] text-white">
                          <Check size={13} strokeWidth={2.75} />
                        </span>
                      ) : (
                        <span className="h-6 w-6 rounded-full border-[1.5px] border-[#E5DFD3] bg-[#F3F0E8]" />
                      )}
                      <span className="text-sm font-medium text-crextio-dark">{step.label}</span>
                    </div>
                    <span
                      className={`shrink-0 text-[12px] ${
                        step.done ? "text-crextio-gray" : "text-crextio-gray"
                      }`}
                    >
                      {step.meta}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${CARD} p-5 md:p-6`}>
              <div className="mb-5 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-crextio-dark">Account notes</p>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-full border border-black/8 bg-white px-3 py-1.5 text-xs font-semibold text-crextio-dark"
                >
                  <Plus size={12} />
                  Note
                </button>
              </div>
              <ul className="flex flex-col">
                {detail.notes.map((note, i) => (
                  <li
                    key={`${note.when}-${i}`}
                    className="border-t border-[#EEF0F3] py-4 first:border-0 first:pt-0 last:pb-0"
                  >
                    <p className="text-sm leading-relaxed text-crextio-dark">{note.body}</p>
                    <p className="mt-2 text-[11px] text-crextio-gray">
                      {note.author} · {note.when}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : tab === "Usage & billing" ? (
        <UsageBillingTab detail={detail} />
      ) : (
        <div className={`${CARD} p-5 md:p-6`}>
          <p className="text-sm font-semibold text-crextio-dark">Campaigns</p>
          <p className="mt-1 max-w-2xl text-[12px] leading-relaxed text-crextio-gray">
            {detail.campaigns.intro}
          </p>
          <ul className="mt-5 flex flex-col">
            {detail.campaigns.items.map((campaign) => {
              const style = statusDotStyle(campaign.status);
              return (
                <li
                  key={campaign.name}
                  className="flex items-center justify-between gap-4 border-t border-[#EEF0F3] py-4 first:border-0 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-crextio-dark">{campaign.name}</p>
                    <p className="mt-1 text-[12px] text-crextio-gray">{campaign.detail}</p>
                  </div>
                  <DotPill label={campaign.status} dotClass={style.dot} pillClass={style.pill} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
