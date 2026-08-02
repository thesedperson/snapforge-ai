import { useEffect, useState } from "react";
import heroArt from "@/assets/hero-art.webp.asset.json";
import { useReveal } from "@/hooks/use-reveal";

const ROTATING_WORDS = [
  "FORGE IDEAS",
  "BUILD AGENTS",
  "SEARCH DEEPLY",
  "WRITE PAPERS",
  "AUTOMATE TASKS",
];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const { ref, shown } = useReveal(0.05);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden border-b border-border pt-36 pb-20 md:pt-44 md:pb-28"
    >
      {/* Subtle animated grain overlay for depth */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
      }} />

      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-12 px-6 md:px-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <p
            className={`reveal ${shown ? "reveal-in" : ""} font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground`}
          >
            Open Source • MIT License
          </p>

          <h1 className="mt-8 font-cinzel text-[7.5vw] leading-[1.05] tracking-[0.04em] uppercase sm:text-[5vw] lg:text-[3.4vw]">
            <span className="block overflow-hidden">
              <span className={`reveal ${shown ? "reveal-in" : ""} block`} style={{ ["--reveal-delay" as string]: "120ms" }}>
                YOUR PERSONAL
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className={`reveal ${shown ? "reveal-in" : ""} block`} style={{ ["--reveal-delay" as string]: "250ms" }}>
                AI COMMAND
              </span>
            </span>
            <span className="block overflow-hidden py-1 h-[1.25em] whitespace-nowrap relative">
              <span
                key={wordIndex}
                className="inline-block animate-fade-slide-up font-bold"
                style={{ color: 'var(--foreground)' }}
              >
                {ROTATING_WORDS[wordIndex]}
              </span>
            </span>
          </h1>

          {/* Animated accent line */}
          <div
            className={`reveal ${shown ? "reveal-in" : ""} mt-4 h-px w-24 bg-foreground/40`}
            style={{
              ["--reveal-delay" as string]: "380ms",
              background: "linear-gradient(90deg, var(--foreground) 0%, transparent 100%)",
            }}
          />

          <p
            className={`reveal ${shown ? "reveal-in" : ""} mt-6 max-w-lg font-cormorant text-xl md:text-2xl leading-relaxed text-muted-foreground/90 font-normal`}
            style={{ ["--reveal-delay" as string]: "400ms" }}
          >
            An autonomous workstation that researches, writes, codes, and manages your digital life — running locally, remembering everything, owned entirely by you.
          </p>

          <div
            className={`reveal ${shown ? "reveal-in" : ""} mt-8 max-w-xl`}
            style={{ ["--reveal-delay" as string]: "560ms" }}
          >
            <a
              href="http://localhost:8080/dashboard"
              className="group inline-block border-2 border-foreground p-1 bg-background transition-transform duration-300 active:scale-95"
            >
              <div className="flex items-center gap-4 border border-foreground bg-foreground px-8 py-4 font-cinzel text-base font-bold tracking-[0.25em] uppercase text-background transition-colors duration-500 group-hover:bg-background group-hover:text-foreground">
                <span className="text-lg transition-transform duration-500 group-hover:rotate-180">
                  ⚡
                </span>
                <span>ENTER DASHBOARD</span>
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </div>
            </a>

            {/* Trust Pillars */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-border/80 pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <div>
                <span className="block font-bold text-foreground">01. FREE FOREVER</span>
                <span className="text-[10px] text-muted-foreground/70">No hidden costs</span>
              </div>
              <div className="border-l border-border/60 pl-4">
                <span className="block font-bold text-foreground">02. PRIVACY FIRST</span>
                <span className="text-[10px] text-muted-foreground/70">Runs locally</span>
              </div>
              <div className="border-l border-border/60 pl-4">
                <span className="block font-bold text-foreground">03. OPEN SOURCE</span>
                <span className="text-[10px] text-muted-foreground/70">MIT Licensed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img
            src={heroArt.url}
            alt="Engraving of a developer working at a desk with headphones, notebook, and laptop radiating light"
            className={`clip-reveal ${shown ? "clip-reveal-in" : ""} block h-auto w-full max-w-[760px] object-contain`}
          />
        </div>
      </div>
    </section>
  );
}
