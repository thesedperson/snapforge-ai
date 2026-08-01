import mac from "@/assets/platform-art-mac.webp.asset.json";
import windows from "@/assets/platform-art-windows.webp.asset.json";
import linux from "@/assets/platform-art-linux.webp.asset.json";
import { useReveal } from "@/hooks/use-reveal";

const PLATFORMS = [
  {
    art: mac.url,
    req: "macOS 12+",
    name: "Mac OS",
    cta: "Download",
    href: "https://hermes-assets.nousresearch.com/Hermes-Setup.dmg",
  },
  {
    art: windows.url,
    req: "Windows 10/11",
    name: "Windows",
    cta: "Download",
    href: "https://hermes-assets.nousresearch.com/Hermes-Setup.exe",
  },
  {
    art: linux.url,
    req: "Any distro",
    name: "Linux",
    cta: "Install via terminal",
    href: "#install",
  },
];

export function Platforms() {
  const { ref, shown } = useReveal(0.1);

  return (
    <section id="download" ref={ref} className="border-b border-border">
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
            <img
              src={p.art}
              alt={`${p.name} artwork`}
              className="h-52 w-auto transition-[filter] duration-500 group-hover:invert"
              loading="lazy"
            />
            <p className="mt-6 font-mono text-[11px] tracking-[0.28em] uppercase opacity-70">
              {p.req}
            </p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">{p.name}</h2>
            <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase">
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
