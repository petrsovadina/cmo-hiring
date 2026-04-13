"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StreamingOutput } from "@/components/streaming-output";
import { FlaskConical, Loader2 } from "lucide-react";

const SEGMENTS = [
  {
    value: "pricing_page_abandoners",
    label: "Pricing Page Abandoners",
    desc: "Viewed pricing, bounced — objection: price / unclear ROI",
    temp: "Warm · Bottom of funnel",
  },
  {
    value: "inactive_trials",
    label: "Inactive Trials",
    desc: "Signed up, never installed widget — objection: too complex / forgot",
    temp: "Medium · Activation",
  },
  {
    value: "active_trials_no_conversion",
    label: "Active Trials, No Conversion",
    desc: "Using free plan, not upgrading — objection: free is enough",
    temp: "Medium-High · Monetization",
  },
];

const PRODUCTS = ["Smartsupp", "Reservio", "Survio", "Tanganica", "Convertim"];

export default function AbGeneratorPage() {
  const [segment, setSegment] = useState("pricing_page_abandoners");
  const [product, setProduct] = useState<string>("Smartsupp");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setOutput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ab-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ segment, product }),
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

  const selectedSegment = SEGMENTS.find(s => s.value === segment);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-amber-500/10">
            <FlaskConical className="w-5 h-5 text-amber-400" />
          </div>
          <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-400 border-amber-500/20">Challenge 03</Badge>
        </div>
        <h1 className="text-2xl font-bold mb-2">A/B Test Generator</h1>
        <p className="text-muted-foreground">
          Select a remarketing segment and generate a structured variant matrix — 6–8 variants for Google Display and Meta, each testing exactly one variable.
        </p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Campaign Setup</CardTitle>
            <CardDescription className="text-xs">Configure product and target segment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Product</label>
              <Select value={product} onValueChange={(v) => v && setProduct(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCTS.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Remarketing segment</label>
              <div className="grid gap-2">
                {SEGMENTS.map((seg) => (
                  <button
                    key={seg.value}
                    onClick={() => setSegment(seg.value)}
                    className={`text-left p-3 rounded-lg border transition-colors ${
                      segment === seg.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <p className="text-sm font-medium">{seg.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{seg.desc}</p>
                    <Badge variant="outline" className="mt-1.5 text-xs">{seg.temp}</Badge>
                  </button>
                ))}
              </div>
            </div>

            {selectedSegment && (
              <div className="p-3 rounded-lg bg-accent/50 text-xs text-muted-foreground">
                Will generate 6–8 variants for <strong className="text-foreground">{product} — {selectedSegment.label}</strong> with Google Display + Meta copy, hypotheses, and recommended testing sequence.
              </div>
            )}

            <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
              {isLoading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating variants...</>
              ) : (
                <><FlaskConical className="w-4 h-4 mr-2" /> Generate Variants</>
              )}
            </Button>
          </CardContent>
        </Card>

        <StreamingOutput content={output} isLoading={isLoading} />
      </div>
    </div>
  );
}
