import portal from "@/assets/portal-figure.webp.asset.json";
import { useParallax, useReveal } from "@/hooks/use-reveal";

export function Portal() {
  const { ref, shown } = useReveal(0.08);
  const px = useParallax<HTMLDivElement>();

  return (
    <section id="install" ref={ref} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="font-cinzel text-[20vw] leading-[0.82] text-center uppercase text-muted-foreground/15">
          SnapForge
          <br />
          AI
        </span>
      </div>

      <div ref={px.ref} className="relative mx-auto flex max-w-[1600px] justify-center px-6 pt-24">
        <img
          src={portal.url}
          alt="Engraved figure holding a globe"
          className={`reveal-zoom ${shown ? "reveal-in" : ""} w-full max-w-[560px]`}
          style={{ transform: `translateY(${(px.progress - 0.5) * -50}px)` }}
          loading="lazy"
        />
      </div>

      {/* CTA before footer */}
      <div
        className={`reveal ${shown ? "reveal-in" : ""} relative mx-auto max-w-2xl px-6 pb-16 text-center`}
        style={{ ["--reveal-delay" as string]: "200ms" }}
      >
        <h2 className="font-display text-3xl leading-tight md:text-5xl">
          Ready to forge?
        </h2>
        <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
          Access the SnapForge AI web dashboard or repository to start building with autonomous agents today.
        </p>
        <a
          href="http://localhost:8080/dashboard"
          className="group mt-8 inline-flex items-center gap-3 border-2 border-foreground px-8 py-4 font-cinzel text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-500 hover:bg-foreground hover:text-background"
        >
          <span>Access Dashboard</span>
          <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>

      <footer className="relative mx-auto flex w-full max-w-[1600px] flex-wrap items-end justify-between gap-6 border-t border-border px-6 py-10 md:px-10">
        <div>
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
            SnapForge AI v1.0.0
          </p>
          <p className="mt-1 font-mono text-[10px] tracking-wider text-muted-foreground/60">
            Built with care. Shipped with conviction.
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-foreground">
            SnapForge AI
          </p>
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
            MIT License · 2026
          </p>
        </div>
      </footer>
    </section>
  );
}
