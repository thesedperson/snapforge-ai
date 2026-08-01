import portal from "@/assets/portal-figure.webp.asset.json";
import nous from "@/assets/nous.webp.asset.json";
import { useParallax, useReveal } from "@/hooks/use-reveal";

export function Portal() {
  const { ref, shown } = useReveal(0.08);
  const px = useParallax<HTMLDivElement>();

  return (
    <section id="install" ref={ref} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="font-display text-[20vw] leading-[0.82] text-center uppercase text-muted-foreground/15">
          Nous
          <br />
          Portal
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

      <footer className="relative mx-auto flex w-full max-w-[1600px] flex-wrap items-end justify-between gap-6 px-6 py-10 md:px-10">
        <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-muted-foreground">
          Hermes Agent v0.19.1
        </p>
        <div className="flex flex-col items-end gap-2">
          <img src={nous.url} alt="Nous Research" className="h-10 w-auto" loading="lazy" />
          <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-muted-foreground">
            Nous Research
          </p>
          <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-muted-foreground">
            MIT License · 2026
          </p>
        </div>
      </footer>
    </section>
  );
}
