import showcase from "@/assets/showcase.gif.asset.json";
import { useReveal } from "@/hooks/use-reveal";

export function Showcase() {
  const { ref, shown } = useReveal(0.12);

  return (
    <section ref={ref} className="border-b border-border py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
        {/* Editorial intro */}
        <div className="flex items-end justify-between gap-6">
          <div className="flex-1">
            <p
              className={`reveal ${shown ? "reveal-in" : ""} font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground`}
            >
              Live Dashboard Preview
            </p>
            <h2
              className={`reveal ${shown ? "reveal-in" : ""} mt-3 font-display text-3xl leading-tight md:text-5xl`}
              style={{ ["--reveal-delay" as string]: "100ms" }}
            >
              See it in action
            </h2>
          </div>
        </div>

        {/* Showcase frame */}
        <div
          className={`reveal-zoom ${shown ? "reveal-in" : ""} mt-10 overflow-hidden rounded-xl border border-border/80 shadow-2xl bg-card`}
          style={{ ["--reveal-delay" as string]: "200ms" }}
        >
          <img
            src={showcase.url}
            alt="SnapForge AI desktop app interface showing an agent conversation"
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>

        {/* Contextual caption strip */}
        <div
          className={`reveal ${shown ? "reveal-in" : ""} mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-4`}
          style={{ ["--reveal-delay" as string]: "350ms" }}
        >
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            Multi-agent orchestration • Persistent memory • Real-time tool use
          </p>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 font-mono text-[10px] tracking-wider uppercase text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Beta
          </span>
        </div>
      </div>
    </section>
  );
}
