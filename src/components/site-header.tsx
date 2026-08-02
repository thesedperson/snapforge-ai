import { useEffect, useState } from "react";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

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
        <nav className="flex items-center">
          <a
            href="#features"
            className="link-underline font-cinzel font-bold text-base md:text-xl tracking-[0.2em] uppercase"
          >
            About Us
          </a>
        </nav>

        <div className="group flex flex-col items-center gap-1">
          <a
            href="#top"
            className={`font-cinzel font-bold leading-[0.9] tracking-[0.08em] uppercase transition-all duration-500 ${
              scrolled ? "text-xl md:text-2xl" : "text-2xl md:text-4xl"
            }`}
          >
            <span className="block text-center">SnapForge</span>
            <span className="block text-center">AI</span>
          </a>
          <span className="flex items-center gap-3 opacity-70 transition-opacity group-hover:opacity-100">
            <SocialIcon href="https://github.com/AcademixAI" label="GitHub">
              <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
            </SocialIcon>
          </span>
        </div>

        <nav className="flex items-center">
          <a
            href="#install"
            className="link-underline font-cinzel font-bold text-base md:text-xl tracking-[0.2em] uppercase"
          >
            Contact Us
          </a>
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
