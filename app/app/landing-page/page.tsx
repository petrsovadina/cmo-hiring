"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StreamingOutput } from "@/components/streaming-output";
import { Globe, Loader2 } from "lucide-react";

const VERTICALS = [
  { value: "fitness studios & personal trainers", label: "Fitness Studios & Personal Trainers" },
  { value: "dental clinics", label: "Dental Clinics" },
  { value: "tutoring centers & language schools", label: "Tutoring Centers & Language Schools" },
  { value: "pet grooming salons", label: "Pet Grooming Salons" },
  { value: "auto repair & tire shops", label: "Auto Repair & Tire Shops" },
  { value: "tattoo & piercing studios", label: "Tattoo & Piercing Studios" },
  { value: "beauty salons & barbershops", label: "Beauty Salons & Barbershops" },
  { value: "yoga & pilates studios", label: "Yoga & Pilates Studios" },
];

export default function LandingPagePage() {
  const [vertical, setVertical] = useState("fitness studios & personal trainers");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setOutput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/landing-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vertical }),
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

  const selectedLabel = VERTICALS.find(v => v.value === vertical)?.label;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Globe className="w-5 h-5 text-purple-400" />
          </div>
          <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/20">Challenge 02</Badge>
        </div>
        <h1 className="text-2xl font-bold mb-2">Landing Page Pipeline</h1>
        <p className="text-muted-foreground">
          Select a vertical and generate a complete Reservio landing page — hero, features, FAQ, social proof, and SEO metadata. No manual research needed.
        </p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Target Vertical</CardTitle>
            <CardDescription className="text-xs">Reservio is expanding into new business categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={vertical} onValueChange={(v) => v && setVertical(v)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {VERTICALS.map((v) => (
                  <SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="p-3 rounded-lg bg-accent/50 text-xs text-muted-foreground">
              Will generate: market research → messaging strategy → full page copy → SEO metadata for <strong className="text-foreground">{selectedLabel}</strong>
            </div>

            <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
              {isLoading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating pipeline...</>
              ) : (
                <><Globe className="w-4 h-4 mr-2" /> Run Pipeline</>
              )}
            </Button>
          </CardContent>
        </Card>

        <StreamingOutput content={output} isLoading={isLoading} />
      </div>
    </div>
  );
}
