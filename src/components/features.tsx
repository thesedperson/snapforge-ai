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
    kicker: "Connect",
    title: "Lives Everywhere",
    art: connect.url,
    body: "Telegram, Discord, Slack, WhatsApp, Signal, Email, CLI — and a growing list of platforms. One agent, one memory, every surface.",
  },
  {
    n: "#2",
    kicker: "Remember",
    title: "Persistent Memory",
    art: memory.url,
    body: "It learns your projects, auto-generates skills, and never forgets how it solved a problem.",
  },
  {
    n: "#3",
    kicker: "Schedule",
    title: "Focused Automation",
    art: automation.url,
    body: "Natural-language scheduling for reports, backups, and briefings — running unattended through the gateway, focused every time.",
  },
  {
    n: "#4",
    kicker: "Delegate",
    title: "Tasks Multiplied",
    art: tasks.url,
    body: "Isolated subagents with their own conversations, terminals, and Python RPC scripts for zero-context-cost pipelines.",
  },
  {
    n: "#5",
    kicker: "Search",
    title: "Browse the Web",
    art: browse.url,
    body: "Web search, browser automation, vision, image generation, text-to-speech, and multi-model reasoning.",
  },
  {
    n: "#6",
    kicker: "Experiment",
    title: "Isolated Sandboxing",
    art: sandbox.url,
    body: "Five backends — local, Docker, SSH, Singularity, Modal — with container hardening and namespace isolation.",
  },
];

export function Features() {
  const [mode, setMode] = useState<"feature" | "preview">("feature");
  const { ref, shown } = useReveal(0.05);

  return (
    <section id="features" ref={ref} className="border-b border-border py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <div className="flex justify-end">
          <div className="relative flex border border-foreground font-mono text-[11px] tracking-[0.22em] uppercase">
            <span
              className={`absolute inset-y-0 w-1/2 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                mode === "preview" ? "translate-x-full" : "translate-x-0"
              }`}
            />
            {(["feature", "preview"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`relative z-10 px-4 py-1.5 transition-colors duration-300 ${
                  mode === m ? "text-background" : "text-foreground"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <article
              key={f.n}
              className={`reveal ${shown ? "reveal-in" : ""} group`}
              style={{ ["--reveal-delay" as string]: `${(i % 3) * 120}ms` }}
            >
              <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-muted-foreground">
                {f.n} {f.kicker}
              </p>
              <h3 className="mt-3 max-w-[10ch] font-display text-4xl leading-[1.02] md:text-5xl">
                {f.title}
              </h3>
              <div className="art-hover mt-7 aspect-[1334/1148] border border-border">
                <img
                  src={f.art}
                  alt={f.title}
                  className={`h-full w-full object-cover transition-all duration-700 ${
                    mode === "preview" ? "contrast-150 grayscale-0 saturate-0" : ""
                  }`}
                  loading="lazy"
                />
              </div>
              <p className="mt-6 max-w-[38ch] font-mono text-xs leading-relaxed tracking-[0.08em] uppercase text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
