import { useParallax, useReveal } from "@/hooks/use-reveal";

export function Wordmark() {
  const { ref } = useParallax<HTMLDivElement>();
  const r = useReveal(0.1);

  return (
    <section ref={ref} className="overflow-hidden border-b border-border py-10">
      <div className="marquee-track select-none">
        {[0, 1].map((k) => (
          <span
            key={k}
            className="font-cinzel text-[22vw] leading-[0.8] tracking-[0.05em] whitespace-nowrap uppercase"
          >
            SnapForge&nbsp;AI&nbsp;—&nbsp;
          </span>
        ))}
      </div>

      <div
        ref={r.ref}
        className={`reveal ${r.shown ? "reveal-in" : ""} mx-auto mt-10 max-w-2xl px-6 text-center`}
      >
        <p className="font-sans text-sm leading-relaxed text-muted-foreground">
          SnapForge AI is fully open-source under MIT. Every feature — agents, memory,
          research, email, scheduling — is included from day one. No paywalls, no tiers,
          no data harvesting. Your machine, your data, your forge.
        </p>
        <a
          href="https://github.com/AcademixAI"
          target="_blank"
          rel="noreferrer"
          className="group mt-8 inline-flex items-center gap-2 border border-foreground px-6 py-3 font-mono text-xs tracking-[0.24em] uppercase transition-colors duration-300 hover:bg-foreground hover:text-background"
        >
          View on GitHub
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
