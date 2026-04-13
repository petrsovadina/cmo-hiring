import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Globe, FlaskConical, Share2, BarChart2, ArrowRight } from "lucide-react";

const tools = [
  {
    href: "/content-engine",
    icon: Zap,
    title: "Content Engine",
    description: "Turn a single idea into ready-to-publish content across LinkedIn, X, newsletter, and blog. Feed it a seed topic and get platform-native posts in seconds.",
    badge: "Challenge 01",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    input: "Topic / milestone / insight",
    output: "LinkedIn · X/Twitter · Newsletter · Blog",
  },
  {
    href: "/landing-page",
    icon: Globe,
    title: "Landing Page Pipeline",
    description: "Generate a complete landing page content package for any Reservio vertical — hero, features, FAQ, and SEO metadata. No manual research needed.",
    badge: "Challenge 02",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    input: "Vertical name (fitness, dental…)",
    output: "Full landing page copy + SEO",
  },
  {
    href: "/ab-generator",
    icon: FlaskConical,
    title: "A/B Test Generator",
    description: "Generate a structured variant matrix for Smartsupp remarketing campaigns. Each variant tests exactly one variable with clear hypotheses and platform-ready copy.",
    badge: "Challenge 03",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    input: "Remarketing segment",
    output: "6–8 variants · Google + Meta",
  },
  {
    href: "/blog-repurpose",
    icon: Share2,
    title: "Blog Repurpose",
    description: "Drop in a blog post URL and get platform-native content for 6 channels — LinkedIn, X, newsletter, Instagram, video script, and podcast notes.",
    badge: "Challenge 04",
    badgeColor: "bg-green-500/10 text-green-400 border-green-500/20",
    input: "Blog post URL",
    output: "6 platform-native formats",
  },
  {
    href: "/competitive-intel",
    icon: BarChart2,
    title: "Competitive Intelligence",
    description: "Run a deep competitive analysis between any two SaaS products. Covers positioning, pricing, features, reviews, content strategy, and actionable recommendations.",
    badge: "Challenge 05",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
    input: "Company A vs Company B",
    output: "Full CI report + battle card",
  },
];

export default function Home() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <Badge variant="outline" className="mb-4 text-xs">CMO Hiring Challenge · Abugo × Petr Sovadina</Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          The Modern CMO<br />
          <span className="text-muted-foreground">doesn&apos;t write content.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          They build systems that produce it. This toolkit demonstrates 5 AI-powered marketing pipelines built for the Abugo portfolio — each one taking a raw input and producing publication-ready output.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10 p-6 rounded-xl border border-border bg-card/50">
        <div>
          <p className="text-3xl font-bold">5</p>
          <p className="text-sm text-muted-foreground">AI pipelines</p>
        </div>
        <div>
          <p className="text-3xl font-bold">47</p>
          <p className="text-sm text-muted-foreground">deliverable files</p>
        </div>
        <div>
          <p className="text-3xl font-bold">6 875+</p>
          <p className="text-sm text-muted-foreground">lines of output</p>
        </div>
      </div>

      {/* Tools grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link key={tool.href} href={tool.href}>
              <Card className="h-full hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 group cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-2 rounded-lg bg-accent">
                      <Icon className="w-4 h-4" />
                    </div>
                    <Badge variant="outline" className={`text-xs ${tool.badgeColor}`}>
                      {tool.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors flex items-center gap-2">
                    {tool.title}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 transition-transform" />
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">Input:</span>
                      <span>{tool.input}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">Output:</span>
                      <span>{tool.output}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Architecture note */}
      <div className="mt-8 p-6 rounded-xl border border-border bg-card/30">
        <p className="text-sm font-medium mb-2">Architecture</p>
        <p className="text-sm text-muted-foreground">
          Built with Next.js 15 App Router + shadcn/ui. Each tool streams responses directly from Claude via Anthropic API — no database, no auth, no latency from intermediary services. The pipelines are direct implementations of the prompts developed during the multi-agent Gas Town build.
        </p>
      </div>
    </div>
  );
}
