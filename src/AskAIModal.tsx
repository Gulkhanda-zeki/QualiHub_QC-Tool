import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { ArrowUp, Menu, Plus, Sparkles, X } from "lucide-react";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

type ChatThread = {
  id: string;
  title: string;
  date: string;
};

const INITIAL_CHATS: ChatThread[] = [
  { id: "c1", title: "Which companies are past due?", date: "02/07/2026" },
  { id: "c2", title: "What's our total MRR and ARR?", date: "02/07/2026" },
  { id: "c3", title: "Which companies are near credit cap?", date: "01/07/2026" },
  { id: "c4", title: "Compare Pro vs Standard companies", date: "01/07/2026" },
];

const SUGGESTIONS = [
  "Which companies are past due?",
  "What's our total MRR and ARR?",
  "Which companies are near their credit cap?",
  "Compare Pro vs Standard companies",
];

const WELCOME =
  "Hi! I'm your platform assistant. Ask about companies, revenue (MRR/ARR), licenses, seats, credit usage and platform health across every company. I remember each conversation.";

const MOCK_REPLIES: Record<string, string> = {
  "Which companies are past due?":
    "3 companies have unpaid invoices: Bright Connect ($2,400), VoiceWorks ($890), and Cardinal Utilities ($1,120). Bright Connect is 18 days overdue.",
  "What's our total MRR and ARR?":
    "Platform MRR is $48,200 this period. Annualized ARR is about $578,400 across all active companies.",
  "Which companies are near their credit cap?":
    "Helios Travel Group is at 94% of minutes and Northgate Telecom is at 88%. Both are on track to hit cap before period end.",
  "Compare Pro vs Standard companies":
    "Pro accounts average 2.4× minutes and 1.8× seats vs Standard, with ~12% higher retention. Standard makes up 61% of companies but 34% of MRR.",
};

function mockReply(question: string) {
  return (
    MOCK_REPLIES[question] ??
    `Here's what I found in QCTool for “${question}”. I can dig into companies, billing, seats, or system health — ask a follow-up anytime.`
  );
}

type AskAIModalProps = {
  open: boolean;
  onClose: () => void;
};

export function AskAIModal({ open, onClose }: AskAIModalProps) {
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState(INITIAL_CHATS[0]?.id ?? "new");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", role: "assistant", text: WELCOME },
  ]);
  const [draft, setDraft] = useState("");
  const [rememberDraft, setRememberDraft] = useState("");
  const [remembered, setRemembered] = useState<string[]>([]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    const t = window.setTimeout(() => inputRef.current?.focus(), 80);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  if (!open) return null;

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", text: trimmed };
    const assistantMsg: ChatMessage = {
      id: `a-${Date.now() + 1}`,
      role: "assistant",
      text: mockReply(trimmed),
    };

    setMessages((prev) => {
      const base = prev[0]?.id === "welcome" && prev.length === 1 ? [] : prev;
      return [...base, userMsg, assistantMsg];
    });
    setDraft("");

    const title = trimmed.length > 28 ? `${trimmed.slice(0, 28)}…` : trimmed;
    const today = new Date();
    const date = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;

    setChats((prev) => {
      if (activeChatId === "new" || !prev.some((c) => c.id === activeChatId)) {
        const id = `c-${Date.now()}`;
        setActiveChatId(id);
        return [{ id, title, date }, ...prev];
      }
      return prev.map((c) => (c.id === activeChatId ? { ...c, title, date } : c));
    });
  };

  const startNewChat = () => {
    setActiveChatId("new");
    setMessages([{ id: "welcome", role: "assistant", text: WELCOME }]);
    setDraft("");
    inputRef.current?.focus();
  };

  const addRemembered = () => {
    const value = rememberDraft.trim();
    if (!value) return;
    setRemembered((prev) => [...prev, value]);
    setRememberDraft("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(draft);
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 font-sans sm:p-6">
      <button
        type="button"
        aria-label="Close Ask AI"
        className="absolute inset-0 bg-crextio-dark/35 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex h-[min(720px,92vh)] w-full max-w-[980px] overflow-hidden rounded-[28px] border border-black/8 bg-crextio-cream shadow-[0_24px_64px_rgba(0,0,0,0.18)]"
      >
        {/* Left sidebar */}
        <aside
          className={`${
            sidebarOpen ? "flex w-[240px] shrink-0" : "hidden"
          } flex-col border-r border-black/5 bg-[#F8F9FB] p-4`}
        >
          <button
            type="button"
            onClick={startNewChat}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-crextio-dark px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-crextio-charcoal"
          >
            <Plus size={16} strokeWidth={2.25} />
            New chat
          </button>

          <div className="mt-5 min-h-0 flex-1 overflow-y-auto">
            <p className="mb-2 px-1 text-[10px] font-semibold tracking-[0.12em] text-crextio-gray">
              CHATS
            </p>
            <ul className="flex flex-col gap-0.5">
              {chats.map((chat) => {
                const active = chat.id === activeChatId;
                return (
                  <li key={chat.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveChatId(chat.id);
                        setMessages([
                          { id: "welcome", role: "assistant", text: WELCOME },
                          {
                            id: `u-${chat.id}`,
                            role: "user",
                            text: chat.title.replace(/…$/, ""),
                          },
                          {
                            id: `a-${chat.id}`,
                            role: "assistant",
                            text: mockReply(chat.title.replace(/…$/, "")),
                          },
                        ]);
                      }}
                      className={`flex w-full items-start gap-2 rounded-xl px-2.5 py-2 text-left transition-colors ${
                        active ? "bg-white shadow-sm" : "hover:bg-white/80"
                      }`}
                    >
                      <Sparkles
                        size={13}
                        className="mt-0.5 shrink-0 text-crextio-dark"
                        strokeWidth={1.75}
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-medium text-crextio-dark">
                          {chat.title}
                        </span>
                        <span className="mt-0.5 block text-[11px] text-crextio-gray">{chat.date}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-3 border-t border-black/5 pt-3">
            <p className="mb-1.5 flex items-center gap-1.5 px-1 text-[10px] font-semibold tracking-[0.12em] text-crextio-gray">
              <Sparkles size={11} className="text-crextio-dark" />
              REMEMBERED
            </p>
            <p className="mb-2 px-1 text-[11px] leading-relaxed text-crextio-gray">
              Add facts the assistant should always know (e.g. &apos;I lead the Billing queue&apos;).
            </p>
            {remembered.length > 0 && (
              <ul className="mb-2 flex flex-col gap-1 px-1">
                {remembered.map((fact) => (
                  <li
                    key={fact}
                    className="rounded-lg border border-black/5 bg-white px-2 py-1.5 text-[11px] text-crextio-dark"
                  >
                    {fact}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={rememberDraft}
                onChange={(e) => setRememberDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addRemembered();
                  }
                }}
                placeholder="Remember this..."
                className="min-w-0 flex-1 rounded-xl border border-black/8 bg-white px-3 py-2 text-xs text-crextio-dark outline-none placeholder:text-crextio-gray-muted focus:border-crextio-dark/25"
              />
              <button
                type="button"
                onClick={addRemembered}
                aria-label="Add remembered fact"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-crextio-dark text-white transition-colors hover:bg-crextio-charcoal"
              >
                <Plus size={14} strokeWidth={2.25} />
              </button>
            </div>
          </div>
        </aside>

        {/* Main chat */}
        <div className="flex min-w-0 flex-1 flex-col bg-crextio-cream">
          <div className="flex items-center justify-between gap-3 border-b border-black/5 px-4 py-3.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <button
                type="button"
                aria-label="Toggle chats"
                onClick={() => setSidebarOpen((v) => !v)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-crextio-gray hover:bg-black/5 hover:text-crextio-dark"
              >
                <Menu size={18} strokeWidth={1.75} />
              </button>
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-crextio-yellow text-crextio-dark shadow-[0_2px_8px_rgba(255,213,79,0.45)]"
                aria-hidden
              >
                <Sparkles size={16} strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <h2 id={titleId} className="truncate text-[15px] font-bold tracking-tight text-crextio-dark">
                  Platform AI
                </h2>
                <p className="flex items-center gap-1.5 truncate text-[11px] text-crextio-gray">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#12B76A]" />
                  Companies, revenue &amp; licenses · remembers
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-crextio-gray hover:bg-black/5 hover:text-crextio-dark"
            >
              <X size={16} strokeWidth={1.75} />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-5 sm:px-7">
            <div className="flex flex-col gap-4">
              {messages.map((msg) =>
                msg.role === "assistant" ? (
                  <div key={msg.id} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-crextio-yellow text-crextio-dark">
                      <Sparkles size={13} strokeWidth={1.75} />
                    </div>
                    <div className="max-w-[92%] rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm leading-relaxed text-crextio-dark shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div key={msg.id} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl bg-crextio-dark px-4 py-3 text-sm leading-relaxed text-white">
                      {msg.text}
                    </div>
                  </div>
                ),
              )}
            </div>

            {messages.length <= 1 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => sendMessage(suggestion)}
                    className="rounded-full border border-black/8 bg-white px-3.5 py-2 text-left text-[12px] font-medium text-crextio-dark transition-colors hover:border-crextio-yellow hover:bg-crextio-yellow-light"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-black/5 px-5 py-4 sm:px-7">
            <form onSubmit={handleSubmit} className="relative">
              <input
                ref={inputRef}
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask anything about your data..."
                className="w-full rounded-2xl border border-black/8 bg-white py-3.5 pl-4 pr-14 text-sm text-crextio-dark outline-none placeholder:text-crextio-gray-muted focus:border-crextio-dark/25 focus:shadow-[0_0_0_3px_rgba(26,26,26,0.06)]"
              />
              <button
                type="submit"
                aria-label="Send"
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-crextio-yellow text-crextio-dark shadow-[0_2px_8px_rgba(255,213,79,0.45)] transition-colors hover:brightness-95"
              >
                <ArrowUp size={16} strokeWidth={2.25} />
              </button>
            </form>
            <p className="mt-2.5 text-center text-[11px] text-crextio-gray">
              Answers come only from your QCTool data · Super plan
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
