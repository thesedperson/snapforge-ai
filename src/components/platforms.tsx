import mac from "@/assets/platform-art-mac.webp.asset.json";
import windows from "@/assets/platform-art-windows.webp.asset.json";
import linux from "@/assets/platform-art-linux.webp.asset.json";
import { useReveal } from "@/hooks/use-reveal";

const PLATFORMS = [
  {
    art: mac.url,
    req: "macOS 12+",
    name: "Mac OS",
    cta: "Access Dashboard",
    href: "http://localhost:8080/dashboard",
  },
  {
    art: windows.url,
    req: "Windows 10/11",
    name: "Windows",
    cta: "Access Dashboard",
    href: "http://localhost:8080/dashboard",
  },
  {
    art: linux.url,
    req: "Any distro",
    name: "Linux",
    cta: "Run Repository",
    href: "http://localhost:8080/dashboard",
  },
];

export function Platforms() {
  const { ref, shown } = useReveal(0.1);

  return (
    <section id="platforms" ref={ref} className="border-b border-border">
      <div className="mx-auto grid w-full max-w-[1600px] gap-px bg-border md:grid-cols-3">
        {PLATFORMS.map((p, i) => (
          <a
            key={p.name}
            href={p.href}
            target={p.href.startsWith("#") ? undefined : "_blank"}
            rel="noreferrer"
            className={`reveal ${shown ? "reveal-in" : ""} art-hover group relative flex flex-col items-center bg-background px-8 pt-10 pb-12 transition-colors duration-500 hover:bg-foreground hover:text-background`}
            style={{ ["--reveal-delay" as string]: `${i * 140}ms` }}
          >
            <div className="flex h-64 w-full items-center justify-center overflow-hidden border border-border/40">
              <img
                src={p.art}
                alt={`${p.name} artwork`}
                className="h-full w-full object-cover transition-[filter,transform] duration-500 group-hover:invert group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <p className="mt-6 font-mono text-[11px] tracking-[0.25em] uppercase opacity-70">
              {p.req}
            </p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">{p.name}</h2>
            <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs tracking-[0.24em] uppercase">
              {p.cta}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
