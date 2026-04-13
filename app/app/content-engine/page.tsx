"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StreamingOutput } from "@/components/streaming-output";
import { Zap, Loader2 } from "lucide-react";

const EXAMPLE_SEEDS = [
  "Reservio just hit 20M bookings — what does that mean for small business digitalization in CEE?",
  "We integrated Smartsupp AI chatbots with Shopsys stores and reduced support tickets by 40%",
  "Why European SaaS companies have an unfair advantage with GDPR compliance vs US competitors",
  "Abugo is hiring 30 engineers this year — what it's like to build 7 SaaS products from Brno",
];

const COMPANIES = [
  "Abugo Group",
  "Reservio",
  "Smartsupp",
  "Survio",
  "Shopsys",
  "Convertim",
  "Tanganica",
  "Sounds Good Agency",
];

export default function ContentEnginePage() {
  const [seed, setSeed] = useState("");
  const [company, setCompany] = useState("Abugo Group");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!seed.trim()) return;
    setOutput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/content-engine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seed, company }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setOutput((prev) => prev + decoder.decode(value));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Zap className="w-5 h-5 text-blue-400" />
          </div>
          <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/20">Challenge 01</Badge>
        </div>
        <h1 className="text-2xl font-bold mb-2">Content Engine</h1>
        <p className="text-muted-foreground">
          Feed a seed topic, milestone, or insight — get ready-to-publish content for LinkedIn, Twitter/X, Newsletter, and Blog.
        </p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Configuration</CardTitle>
            <CardDescription className="text-xs">Set the company voice and seed input</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Company voice</label>
              <Select value={company} onValueChange={(v) => v && setCompany(v)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COMPANIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Seed input</label>
              <Textarea
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                placeholder="A topic, milestone, insight, or trend to turn into content..."
                className="min-h-24 resize-none"
              />
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Quick examples</p>
              <div className="grid gap-1.5">
                {EXAMPLE_SEEDS.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setSeed(ex)}
                    className="text-left text-xs text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!seed.trim() || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
              ) : (
                <><Zap className="w-4 h-4 mr-2" /> Generate Content</>
              )}
            </Button>
          </CardContent>
        </Card>

        <StreamingOutput content={output} isLoading={isLoading} />
      </div>
    </div>
  );
}
