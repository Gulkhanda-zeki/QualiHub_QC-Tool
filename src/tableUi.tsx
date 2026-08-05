import { useState, type ReactNode } from "react";
import { Plus, Search } from "lucide-react";

export const TABLE_CARD = "crextio-card !bg-white overflow-hidden p-4 md:p-5";
export const TABLE_CLASS =
  "w-full border-separate border-spacing-y-1 text-left";
export const TH =
  "px-3 pb-2 pt-1 text-left text-[12px] font-medium text-[#9CA3AF]";
export const TD = "px-3 py-4 align-middle";

export function rowClass(selected: boolean) {
  return `cursor-pointer transition-colors ${
    selected
      ? "bg-crextio-yellow [&_td:first-child]:rounded-l-2xl [&_td:last-child]:rounded-r-2xl"
      : "hover:bg-[#FAFBFC]"
  }`;
}

export function RowCheckbox({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className={`flex h-4 w-4 items-center justify-center rounded border ${
        checked
          ? "border-crextio-dark bg-crextio-dark text-white"
          : "border-black/20 bg-white"
      }`}
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M2.5 6.5L5 9L9.5 3.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

export function HeaderCheckbox() {
  return <span className="inline-flex h-4 w-4 rounded border border-black/20 bg-white" />;
}

export function DotPill({
  label,
  dotClass,
  pillClass,
}: {
  label: string;
  dotClass: string;
  pillClass: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${pillClass}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`} />
      {label}
    </span>
  );
}

/** Soft tinted status pill: pale bg + matching border, colored dot + text. */
export function statusDotStyle(label: string): { dot: string; pill: string } {
  const map: Record<string, { dot: string; pill: string }> = {
    Request: {
      dot: "bg-[#F04438]",
      pill: "border-[#FECDCA] bg-[#FEF3F2] text-[#B42318]",
    },
    Billing: {
      dot: "bg-[#DC6803]",
      pill: "border-[#FEDF89] bg-[#FFFAEB] text-[#B54708]",
    },
    Usage: {
      dot: "bg-[#EC4A0A]",
      pill: "border-[#F9DBAF] bg-[#FEF6EE] text-[#C4320A]",
    },
    Active: {
      dot: "bg-[#12B76A]",
      pill: "border-[#A6F4C5] bg-[#ECFDF3] text-[#027A48]",
    },
    Paid: {
      dot: "bg-[#12B76A]",
      pill: "border-[#A6F4C5] bg-[#ECFDF3] text-[#027A48]",
    },
    Unpaid: {
      dot: "bg-[#F04438]",
      pill: "border-[#FECDCA] bg-[#FEF3F2] text-[#B42318]",
    },
    Suspended: {
      dot: "bg-[#DC6803]",
      pill: "border-[#FEDF89] bg-[#FFFAEB] text-[#B54708]",
    },
    Cancelled: {
      dot: "bg-[#98A2B3]",
      pill: "border-[#E4E7EC] bg-[#F9FAFB] text-[#475467]",
    },
    Trial: {
      dot: "bg-[#98A2B3]",
      pill: "border-[#E4E7EC] bg-[#F9FAFB] text-[#475467]",
    },
    Pending: {
      dot: "bg-[#DC6803]",
      pill: "border-[#FEDF89] bg-[#FFFAEB] text-[#B54708]",
    },
    Sent: {
      dot: "bg-[#6366F1]",
      pill: "border-[#C7D2FE] bg-[#EEF2FF] text-[#4338CA]",
    },
    Refunded: {
      dot: "bg-[#98A2B3]",
      pill: "border-[#E4E7EC] bg-[#F9FAFB] text-[#475467]",
    },
    Pro: {
      dot: "bg-crextio-dark",
      pill: "border-[#E4E7EC] bg-[#F9FAFB] text-crextio-dark",
    },
    Standard: {
      dot: "bg-[#667085]",
      pill: "border-[#E4E7EC] bg-[#F9FAFB] text-[#475467]",
    },
    high: {
      dot: "bg-[#F04438]",
      pill: "border-[#FECDCA] bg-[#FEF3F2] text-[#B42318]",
    },
    medium: {
      dot: "bg-[#DC6803]",
      pill: "border-[#FEDF89] bg-[#FFFAEB] text-[#B54708]",
    },
    low: {
      dot: "bg-[#98A2B3]",
      pill: "border-[#E4E7EC] bg-[#F9FAFB] text-[#475467]",
    },
    Invited: {
      dot: "bg-[#12B76A]",
      pill: "border-[#A6F4C5] bg-[#ECFDF3] text-[#027A48]",
    },
    Absent: {
      dot: "bg-[#98A2B3]",
      pill: "border-[#E4E7EC] bg-[#F9FAFB] text-[#475467]",
    },
    Warm: {
      dot: "bg-[#12B76A]",
      pill: "border-[#A6F4C5] bg-[#ECFDF3] text-[#027A48]",
    },
    Degraded: {
      dot: "bg-[#DC6803]",
      pill: "border-[#FEDF89] bg-[#FFFAEB] text-[#B54708]",
    },
    Published: {
      dot: "bg-[#12B76A]",
      pill: "border-[#A6F4C5] bg-[#ECFDF3] text-[#027A48]",
    },
    "Not enabled": {
      dot: "bg-[#B8860B]",
      pill: "border-[#E8E2D9] bg-[#F3F0E8] text-[#8B6914]",
    },
    Draft: {
      dot: "bg-[#DC6803]",
      pill: "border-[#FEDF89] bg-[#FFFAEB] text-[#B54708]",
    },
  };
  return (
    map[label] ?? {
      dot: "bg-[#98A2B3]",
      pill: "border-[#E4E7EC] bg-[#F9FAFB] text-[#475467]",
    }
  );
}

export function TableFilters({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
            value === opt
              ? "bg-crextio-dark text-white"
              : "border border-black/8 bg-[#F7F8FA] text-crextio-gray hover:bg-white hover:text-crextio-dark"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function TableToolbar({
  filters,
  filterValue,
  onFilterChange,
  searchPlaceholder,
  actions,
}: {
  filters?: string[];
  filterValue?: string;
  onFilterChange?: (v: string) => void;
  searchPlaceholder: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      {filters && filterValue != null && onFilterChange ? (
        <TableFilters options={filters} value={filterValue} onChange={onFilterChange} />
      ) : (
        <div />
      )}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-full border border-black/8 bg-white px-3.5 py-2 text-sm text-crextio-gray lg:min-w-[240px]">
          <Search size={15} />
          {searchPlaceholder}
        </div>
        {actions}
      </div>
    </div>
  );
}

export function useTableSelection(defaultSelected?: string) {
  const [selectedId, setSelectedId] = useState(defaultSelected ?? "");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return { selectedId, setSelectedId, checked, toggleCheck };
}

export function ActionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${
        selected
          ? "bg-crextio-dark text-white"
          : "border border-black/10 bg-white text-crextio-dark"
      }`}
    >
      {label}
    </button>
  );
}

export function RoundIconButton({
  label,
  children,
  onClick,
}: {
  label: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-black/8 bg-white text-crextio-dark"
    >
      {children}
    </button>
  );
}

export function OutlinePillButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-black/8 bg-white px-4 py-2 text-xs font-semibold text-crextio-dark"
    >
      {children}
    </button>
  );
}

export function PrimaryPillButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-full bg-crextio-dark px-4 py-2 text-xs font-semibold text-white"
    >
      <Plus size={14} />
      {children}
    </button>
  );
}
