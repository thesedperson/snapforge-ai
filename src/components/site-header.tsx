import { useEffect, useState } from "react";
import nousMark from "@/assets/nous.webp.asset.json";

const NAV_LEFT = [
  { label: "NOUS", href: "https://nousresearch.com" },
  { label: "DOCS", href: "https://github.com/NousResearch" },
];

const PRODUCTS = [
  { label: "HERMES AGENT", href: "#top" },
  { label: "NOUS PORTAL", href: "https://portal.nousresearch.com" },
  { label: "NOUS RESEARCH", href: "https://nousresearch.com" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/90 py-3 backdrop-blur-md"
          : "border-b border-transparent py-6"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 md:px-10">
        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LEFT.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="link-underline font-display text-sm tracking-[0.18em] uppercase"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#top" className="group flex flex-col items-center gap-1">
          <span
            className={`font-display leading-[0.9] tracking-[0.06em] uppercase transition-all duration-500 ${
              scrolled ? "text-lg" : "text-xl md:text-2xl"
            }`}
          >
            <span className="block text-center">Hermes</span>
            <span className="block text-center">Agent</span>
          </span>
          <span className="flex items-center gap-3 opacity-70 transition-opacity group-hover:opacity-100">
            <SocialIcon href="https://discord.gg/nousresearch" label="Discord">
              <path d="M20.3 4.4A19 19 0 0 0 15.6 3l-.2.4a13 13 0 0 1 3.4 1.6 12 12 0 0 0-10.4 0A13 13 0 0 1 11.8 3.4L11.6 3a19 19 0 0 0-4.7 1.4C3.9 8.9 3.1 13.2 3.5 17.5a19 19 0 0 0 5.7 2.9l1-1.7a12 12 0 0 1-1.9-.9l.5-.4a13 13 0 0 0 11 0l.5.4c-.6.4-1.2.7-1.9.9l1 1.7a19 19 0 0 0 5.7-2.9c.5-5-.8-9.3-4.8-13.1ZM9.5 15c-1 0-1.9-1-1.9-2.1 0-1.2.8-2.1 1.9-2.1s1.9 1 1.9 2.1c0 1.2-.9 2.1-1.9 2.1Zm5 0c-1 0-1.9-1-1.9-2.1 0-1.2.9-2.1 1.9-2.1s1.9 1 1.9 2.1c0 1.2-.8 2.1-1.9 2.1Z" />
            </SocialIcon>
            <SocialIcon href="https://github.com/NousResearch" label="GitHub">
              <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
            </SocialIcon>
          </span>
        </a>

        <nav className="flex items-center gap-6 md:gap-10">
          <div
            className="relative hidden md:block"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button className="font-display text-sm tracking-[0.18em] uppercase">
              Products <span className={`inline-block transition-transform duration-300 ${open ? "rotate-180" : ""}`}>▾</span>
            </button>
            <div
              className={`absolute top-full right-0 mt-3 w-56 border border-border bg-background transition-all duration-300 ${
                open
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
            >
              {PRODUCTS.map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  className="block px-4 py-3 font-mono text-xs tracking-[0.18em] uppercase transition-colors hover:bg-foreground hover:text-background"
                >
                  {p.label}
                </a>
              ))}
            </div>
          </div>

          <a
            href="#install"
            className="group font-display text-sm tracking-[0.18em] uppercase"
          >
            Install{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>

          <img
            src={nousMark.url}
            alt="Nous Research"
            className="hidden h-6 w-auto lg:block"
            loading="lazy"
          />
        </nav>
      </div>
    </header>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4 transition-transform duration-300 hover:scale-125"
      >
        {children}
      </svg>
    </a>
  );
}
