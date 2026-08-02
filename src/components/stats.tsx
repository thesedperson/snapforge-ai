import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

const STATS = [
  { label: "Active agents", value: 12, suffix: "+", prefix: "" },
  { label: "Tools integrated", value: 40, suffix: "+", prefix: "" },
  { label: "Models supported", value: 300, suffix: "+", prefix: "" },
  { label: "License", value: 0, suffix: "", prefix: "MIT" },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!start || target === 0) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, start]);

  return count;
}

export function Stats() {
  const { ref, shown } = useReveal(0.2);

  return (
    <section ref={ref} className="border-b border-border py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-0 md:divide-x md:divide-border">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} shown={shown} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  index,
  shown,
}: {
  stat: (typeof STATS)[number];
  index: number;
  shown: boolean;
}) {
  const count = useCountUp(stat.value, 1800, shown);

  return (
    <div
      className={`reveal ${shown ? "reveal-in" : ""} flex flex-col items-center text-center md:px-8`}
      style={{ ["--reveal-delay" as string]: `${index * 120}ms` }}
    >
      <span className="font-cinzel text-5xl font-bold tracking-tight md:text-6xl">
        {stat.prefix || count}
        {stat.suffix}
      </span>
      <span className="mt-3 font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
        {stat.label}
      </span>
    </div>
  );
}
