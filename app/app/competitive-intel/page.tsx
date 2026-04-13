"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StreamingOutput } from "@/components/streaming-output";
import { BarChart2, Loader2 } from "lucide-react";

const PRESET_PAIRS = [
  { company: "Smartsupp", competitor: "Tidio", label: "Smartsupp vs Tidio" },
  { company: "Smartsupp", competitor: "Intercom", label: "Smartsupp vs Intercom" },
  { company: "Reservio", competitor: "Calendly", label: "Reservio vs Calendly" },
  { company: "Reservio", competitor: "Booksy", label: "Reservio vs Booksy" },
  { company: "Survio", competitor: "Typeform", label: "Survio vs Typeform" },
  { company: "Survio", competitor: "SurveyMonkey", label: "Survio vs SurveyMonkey" },
  { company: "Shopsys", competitor: "Shopify", label: "Shopsys vs Shopify" },
  { company: "Tanganica", competitor: "AdRoll", label: "Tanganica vs AdRoll" },
];

export default function CompetitiveIntelPage() {
  const [company, setCompany] = useState("Smartsupp");
  const [competitor, setCompetitor] = useState("Tidio");
  const [focus, setFocus] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const applyPreset = (preset: { company: string; competitor: string }) => {
    setCompany(preset.company);
    setCompetitor(preset.competitor);
  };

  const handleGenerate = async () => {
    if (!company.trim() || !competitor.trim()) return;
    setOutput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/competitive-intel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, competitor, focus }),
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
          <div className="p-2 rounded-lg bg-red-500/10">
            <BarChart2 className="w-5 h-5 text-red-400" />
          </div>
          <Badge variant="outline" className="text-xs bg-red-500/10 text-red-400 border-red-500/20">Challenge 05</Badge>
        </div>
        <h1 className="text-2xl font-bold mb-2">Competitive Intelligence</h1>
        <p className="text-muted-foreground">
          Deep competitive analysis between any two products — positioning, pricing, features, content strategy, customer sentiment, and actionable recommendations.
        </p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Analysis Setup</CardTitle>
            <CardDescription className="text-xs">Choose a preset or enter custom companies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Quick presets</label>
              <div className="flex flex-wrap gap-2">
                {PRESET_PAIRS.map(preset => (
                  <button
                    key={preset.label}
                    onClick={() => applyPreset(preset)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      company === preset.company && competitor === preset.competitor
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Our product</label>
                <input
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="e.g. Smartsupp"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Competitor</label>
                <input
                  value={competitor}
                  onChange={e => setCompetitor(e.target.value)}
                  placeholder="e.g. Tidio"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Focus area (optional)</label>
              <Textarea
                value={focus}
                onChange={e => setFocus(e.target.value)}
                placeholder="e.g. Pricing strategy, content marketing, or enterprise features..."
                className="min-h-16 resize-none"
              />
            </div>

            <div className="p-3 rounded-lg bg-accent/50 text-xs text-muted-foreground">
              Will generate: positioning analysis · pricing comparison · feature matrix · content strategy · customer sentiment · battle card · 5 recommendations
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!company.trim() || !competitor.trim() || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
              ) : (
                <><BarChart2 className="w-4 h-4 mr-2" /> Run Analysis</>
              )}
            </Button>
          </CardContent>
        </Card>

        <StreamingOutput content={output} isLoading={isLoading} />
      </div>
    </div>
  );
}
