import { useState } from "react";
import heroArt from "@/assets/hero-art.webp.asset.json";
import { useParallax, useReveal } from "@/hooks/use-reveal";

const TABS = [
  {
    id: "unix",
    label: "macOS / Linux",
    command: "curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash",
  },
  {
    id: "win",
    label: "Windows",
    command:
      "irm https://hermes-agent.nousresearch.com/install.ps1 | iex",
  },
];

export function Hero() {
  const [tab, setTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const { ref, shown } = useReveal(0.05);
  const art = useParallax<HTMLDivElement>();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(TABS[tab]!.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden border-b border-border pt-36 pb-16 md:pt-44"
    >
      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-12 px-6 md:px-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <p
            className={`reveal ${shown ? "reveal-in" : ""} font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground`}
          >
            Open Source • MIT License
          </p>

          <h1 className="mt-8 font-display text-[13vw] leading-[0.86] tracking-[-0.01em] uppercase sm:text-[9vw] lg:text-[6.5vw]">
            {["The Agent", "That Grows", "With You"].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <span
                  className={`reveal ${shown ? "reveal-in" : ""} block`}
                  style={{ ["--reveal-delay" as string]: `${120 + i * 130}ms` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div
            className={`reveal ${shown ? "reveal-in" : ""} mt-12 max-w-xl`}
            style={{ ["--reveal-delay" as string]: "560ms" }}
          >
            <p className="font-mono text-xs tracking-[0.24em] uppercase text-muted-foreground">
              Install desktop app
            </p>
            <a
              href="#download"
              className="group mt-3 inline-flex items-center gap-3 border border-foreground bg-foreground px-6 py-3 font-mono text-sm tracking-[0.18em] uppercase text-background transition-colors duration-300 hover:bg-background hover:text-foreground"
            >
              <span className="inline-block transition-transform duration-500 group-hover:rotate-12">
                ⌘
              </span>
              Install via terminal
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

          <div
            className={`reveal ${shown ? "reveal-in" : ""} mt-10 max-w-xl`}
            style={{ ["--reveal-delay" as string]: "680ms" }}
          >
            <p className="font-mono text-xs tracking-[0.24em] uppercase text-muted-foreground">
              Install via terminal
            </p>
            <div className="mt-3 border border-border">
              <div className="flex items-center gap-6 border-b border-border px-4 py-2">
                {TABS.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(i)}
                    className={`relative font-mono text-xs tracking-[0.14em] transition-colors duration-300 ${
                      i === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t.label}
                    <span
                      className={`absolute -bottom-[9px] left-0 h-px w-full origin-left bg-foreground transition-transform duration-500 ${
                        i === tab ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-600 ease-[cubic-bezier(0.76,0,0.24,1)]"
                  style={{ transform: `translateX(-${tab * 100}%)` }}
                >
                  {TABS.map((t) => (
                    <pre
                      key={t.id}
                      className="w-full shrink-0 overflow-x-auto px-4 py-3 font-mono text-xs whitespace-pre"
                    >
                      {t.command}
                      <span className="caret ml-1 inline-block">▌</span>
                    </pre>
                  ))}
                </div>
                <button
                  onClick={copy}
                  aria-label="Copy install command"
                  className="absolute top-1/2 right-2 -translate-y-1/2 border border-border px-2 py-1 font-mono text-[10px] tracking-[0.14em] uppercase transition-colors hover:bg-foreground hover:text-background"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div ref={art.ref} className="relative">
          <img
            src={heroArt.url}
            alt="Engraving of Hermes with many arms radiating light"
            className={`clip-reveal ${shown ? "clip-reveal-in" : ""} float-slow mx-auto w-full max-w-[680px]`}
            style={{
              transform: `translateY(${(art.progress - 0.5) * -60}px)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
