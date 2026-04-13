"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StreamingOutput } from "@/components/streaming-output";
import { Share2, Loader2, Link } from "lucide-react";

const EXAMPLE_POSTS = [
  {
    url: "https://www.smartsupp.com/blog/",
    title: "Smartsupp Blog",
    desc: "Live chat & AI chatbot tips for e-commerce",
  },
  {
    url: "https://www.reservio.com/blog/",
    title: "Reservio Blog",
    desc: "Booking and business management insights",
  },
  {
    url: "https://www.survio.com/blog/",
    title: "Survio Blog",
    desc: "Survey design and market research",
  },
];

const PLATFORMS = ["LinkedIn", "Twitter/X", "Newsletter", "Instagram Carousel", "Video Script", "Podcast Notes"];

export default function BlogRepurposePage() {
  const [blogUrl, setBlogUrl] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(PLATFORMS);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleGenerate = async () => {
    if (!blogContent.trim() && !blogUrl.trim()) return;
    setOutput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/blog-repurpose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogContent: blogContent || `[Blog post from: ${blogUrl}]`,
          blogUrl,
          platforms: selectedPlatforms,
        }),
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
          <div className="p-2 rounded-lg bg-green-500/10">
            <Share2 className="w-5 h-5 text-green-400" />
          </div>
          <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/20">Challenge 04</Badge>
        </div>
        <h1 className="text-2xl font-bold mb-2">Blog Repurpose</h1>
        <p className="text-muted-foreground">
          Paste a blog post and get platform-native content for up to 6 channels. One article → LinkedIn, X, newsletter, Instagram, video script, podcast notes.
        </p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Source Content</CardTitle>
            <CardDescription className="text-xs">Paste blog content or a URL reference</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                <Link className="w-3 h-3 inline mr-1" />
                Source URL (optional reference)
              </label>
              <input
                type="url"
                value={blogUrl}
                onChange={e => setBlogUrl(e.target.value)}
                placeholder="https://www.smartsupp.com/blog/article..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <div className="flex gap-2 mt-2">
                {EXAMPLE_POSTS.map(p => (
                  <button
                    key={p.url}
                    onClick={() => setBlogUrl(p.url)}
                    className="text-xs px-2 py-1 rounded border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Blog post content</label>
              <Textarea
                value={blogContent}
                onChange={e => setBlogContent(e.target.value)}
                placeholder="Paste the full blog post text here..."
                className="min-h-40 resize-none font-mono text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Target platforms</label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map(platform => (
                  <button
                    key={platform}
                    onClick={() => togglePlatform(platform)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      selectedPlatforms.includes(platform)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={(!blogContent.trim() && !blogUrl.trim()) || isLoading || selectedPlatforms.length === 0}
              className="w-full"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Repurposing...</>
              ) : (
                <><Share2 className="w-4 h-4 mr-2" /> Repurpose Content</>
              )}
            </Button>
          </CardContent>
        </Card>

        <StreamingOutput content={output} isLoading={isLoading} />
      </div>
    </div>
  );
}
