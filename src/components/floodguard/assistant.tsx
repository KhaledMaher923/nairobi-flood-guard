import { useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SUGGESTED = [
  "Is it safe to travel from CBD to Embakasi?",
  "Which areas are at highest risk today?",
  "Where are the nearest evacuation centers?",
  "Which route is safest?",
];

function answerFor(q: string) {
  const s = q.toLowerCase();
  if (s.includes("embakasi") || s.includes("travel") || s.includes("safe to"))
    return "⚠️ Travel is not recommended using the current route. Two high-risk flood zones are detected along the route.\n\nRecommended alternative:\n🟢 Route B · +9 minutes · Lower flood exposure";
  if (s.includes("highest") || s.includes("risk today"))
    return "🔴 Highest risk right now: Mukuru kwa Njenga (94%), Dandora Area II (91%) and Kibra (87%). All three sit in low-elevation riverine zones with 42–58 mm of rainfall in the last 24 hours.";
  if (s.includes("evacuation") || s.includes("center") || s.includes("shelter"))
    return "🏥 Nearest evacuation centers:\n• Nairobi Emergency Center — 1.8 km · 62% occupied · Available\n• Makadara Social Hall — 3.1 km · 96% occupied · Full\n• Langata Community Hall — 4.2 km · 81% occupied · Filling up";
  if (s.includes("route"))
    return "🟢 The safest option is the Recommended Route: 32 min, 18.7 km, risk score 18/100 — 82% safer than the fastest route, at a cost of +7 minutes.";
  return "I track live flood susceptibility, road conditions, matatu routes and evacuation capacity across all 85 Nairobi wards. Ask me about a ward, a journey, or where to shelter.";
}

type Msg = { role: "user" | "bot"; text: string };

export function FloodGuardAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: "Hello 👋 I'm the FloodGuard Assistant. I can assess your journey against live flood risk across Nairobi.",
    },
  ]);

  function send(text: string) {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q }, { role: "bot", text: answerFor(q) }]);
    setInput("");
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open FloodGuard Assistant"
        className="fixed bottom-20 right-4 z-50 grid h-14 w-14 place-items-center rounded-2xl bg-navy text-navy-foreground shadow-[var(--shadow-float)] transition-transform hover:scale-105 lg:bottom-6 lg:right-6"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6 text-teal" />}
      </button>

      {open && (
        <div className="fg-glass fg-rise fixed bottom-36 right-4 z-50 flex max-h-[70vh] w-[calc(100vw-2rem)] flex-col rounded-3xl sm:w-[380px] lg:bottom-24 lg:right-6">
          <div className="flex items-center gap-3 border-b border-border/70 px-4 py-3.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy">
              <Sparkles className="h-4 w-4 text-teal" />
            </span>
            <div>
              <p className="font-display text-sm font-bold">FloodGuard Assistant</p>
              <p className="text-[11px] text-muted-foreground">Grounded in live flood-risk & route data</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[86%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "ml-auto bg-navy text-navy-foreground"
                    : "bg-surface-muted text-foreground",
                )}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="border-t border-border/70 px-4 py-3">
            <div className="mb-2.5 flex flex-wrap gap-1.5">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-teal hover:text-teal-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a ward or journey..."
                className="h-10 rounded-xl bg-card text-sm"
              />
              <Button type="submit" size="icon" className="h-10 w-10 shrink-0 rounded-xl bg-navy hover:bg-navy-deep">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
