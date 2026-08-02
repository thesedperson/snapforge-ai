import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Showcase } from "@/components/showcase";
import { Stats } from "@/components/stats";
import { Platforms } from "@/components/platforms";
import { Features } from "@/components/features";
import { Wordmark } from "@/components/wordmark";
import { Portal } from "@/components/portal";

const title = "SnapForge AI — Your Personal AI Command Center";
const description =
  "SnapForge AI is an open-source MIT-licensed AI agent with persistent memory, scheduling, deep research, and document editing — on macOS, Windows, and Linux.";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
}));

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <Showcase />
      <Stats />
      <Features />
      <Platforms />
      <Wordmark />
      <Portal />
    </main>
  );
}
