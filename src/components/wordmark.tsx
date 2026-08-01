import { useParallax, useReveal } from "@/hooks/use-reveal";

export function Wordmark() {
  const { ref, progress } = useParallax<HTMLDivElement>();
  const r = useReveal(0.1);

  return (
    <section ref={ref} className="overflow-hidden border-b border-border py-10">
      <div className="marquee-track select-none">
        {[0, 1].map((k) => (
          <span
            key={k}
            className="font-display text-[22vw] leading-[0.8] whitespace-nowrap uppercase"
            style={{ transform: `translateX(${(progress - 0.5) * -80}px)` }}
          >
            Hermes&nbsp;Agent&nbsp;—&nbsp;
          </span>
        ))}
      </div>

      <div
        ref={r.ref}
        className={`reveal ${r.shown ? "reveal-in" : ""} mx-auto mt-10 max-w-2xl px-6 text-center`}
      >
        <p className="font-mono text-xs leading-relaxed tracking-[0.22em] uppercase text-muted-foreground">
          All paid tiers include monthly credits for use in Hermes Agent, access to 300+
          cutting-edge models and built-in tool use
        </p>
        <a
          href="https://portal.nousresearch.com"
          target="_blank"
          rel="noreferrer"
          className="group mt-8 inline-flex items-center gap-2 border border-foreground px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:bg-foreground hover:text-background"
        >
          View all our plans
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
