import { useState } from "react";
import connect from "@/assets/feature-connect.webp.asset.json";
import memory from "@/assets/feature-memory.webp.asset.json";
import automation from "@/assets/feature-automation.webp.asset.json";
import tasks from "@/assets/feature-tasks.webp.asset.json";
import browse from "@/assets/feature-browse.webp.asset.json";
import sandbox from "@/assets/feature-sandbox.webp.asset.json";
import { useReveal } from "@/hooks/use-reveal";

const FEATURES = [
  {
    n: "#1",
    kicker: "Agents",
    title: "Chat & Agents",
    art: connect.url,
    body: "Multi-turn chat with autonomous agents that use bash, files, web, and memory tools.",
  },
  {
    n: "#2",
    kicker: "Memory",
    title: "Persistent Memory",
    art: memory.url,
    body: "ChromaDB vector memory that persists across conversations.",
  },
  {
    n: "#3",
    kicker: "Research",
    title: "Deep Research",
    art: browse.url,
    body: "Multi-step search and synthesis to produce comprehensive reports.",
  },
  {
    n: "#4",
    kicker: "Schedule",
    title: "Calendar & Tasks",
    art: tasks.url,
    body: "CalDAV sync for calendar and task management.",
  },
  {
    n: "#5",
    kicker: "Email",
    title: "Email Integration",
    art: automation.url,
    body: "IMAP/SMTP with AI classification, summarization, and drafting.",
  },
  {
    n: "#6",
    kicker: "Documents",
    title: "Document Editor",
    art: sandbox.url,
    body: "Multi-tab Markdown, HTML, and CSV editing.",
  },
];

export function Features() {
  const [mode, setMode] = useState<"feature" | "preview">("feature");
  const { ref, shown } = useReveal(0.05);

  return (
    <section id="features" ref={ref} className="py-20 md:py-28 bg-foreground text-background">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
        {/* Section header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className={`reveal ${shown ? "reveal-in" : ""} font-mono text-[11px] tracking-[0.25em] uppercase text-background/40`}
            >
              What's inside
            </p>
            <h2
              className={`reveal ${shown ? "reveal-in" : ""} mt-3 font-display text-4xl leading-[1.08] text-background md:text-6xl`}
              style={{ ["--reveal-delay" as string]: "80ms" }}
            >
              Six engines,<br />one forge.
            </h2>
          </div>
          <div className="flex shrink-0">
            <div className="relative flex border border-background/30 font-mono text-[11px] tracking-[0.24em] uppercase">
              <span
                className={`absolute inset-y-0 w-1/2 bg-background transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  mode === "preview" ? "translate-x-full" : "translate-x-0"
                }`}
              />
              {(["feature", "preview"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`relative z-10 px-4 py-1.5 transition-colors duration-300 ${
                    mode === m ? "text-foreground" : "text-background"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <article
              key={f.n}
              className={`reveal ${shown ? "reveal-in" : ""} group`}
              style={{ ["--reveal-delay" as string]: `${(i % 3) * 120 + 200}ms` }}
            >
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-background/40">
                {f.n} {f.kicker}
              </p>
              <h3 className="mt-3 max-w-[10ch] font-display text-4xl leading-[1.02] text-background md:text-5xl">
                {f.title}
              </h3>
              <div className="art-hover mt-7 aspect-[1334/1148] border border-background/20 overflow-hidden">
                <img
                  src={f.art}
                  alt={f.title}
                  className={`h-full w-full object-cover transition-all duration-700 ${
                    mode === "preview" ? "contrast-150 grayscale-0 saturate-0" : ""
                  }`}
                  loading="lazy"
                />
              </div>
              <p className="mt-6 max-w-[38ch] font-sans text-sm leading-relaxed text-background/60 transition-colors duration-300 group-hover:text-background">
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
