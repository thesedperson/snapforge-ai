import showcase from "@/assets/showcase.webp.asset.json";
import badge from "@/assets/badge.webp.asset.json";
import { useParallax, useReveal } from "@/hooks/use-reveal";

export function Showcase() {
  const { ref, shown } = useReveal(0.12);
  const px = useParallax<HTMLDivElement>();

  return (
    <section ref={ref} className="border-b border-border py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <div className="flex items-end justify-between gap-6">
          <p
            className={`reveal ${shown ? "reveal-in" : ""} font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground`}
          >
            Hermes Desktop — Beta Preview
          </p>
          <img
            src={badge.url}
            alt="Hermes badge"
            className={`reveal ${shown ? "reveal-in" : ""} float-slow h-16 w-auto md:h-24`}
            style={{ ["--reveal-delay" as string]: "160ms" }}
            loading="lazy"
          />
        </div>

        <div
          ref={px.ref}
          className={`art-hover reveal-zoom ${shown ? "reveal-in" : ""} mt-8 border border-border`}
          style={{ ["--reveal-delay" as string]: "120ms" }}
        >
          <img
            src={showcase.url}
            alt="Hermes desktop app interface showing an agent conversation"
            className="w-full"
            style={{ transform: `translateY(${(px.progress - 0.5) * -24}px) scale(1.04)` }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
