"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface StreamingOutputProps {
  content: string;
  isLoading: boolean;
  className?: string;
}

export function StreamingOutput({ content, isLoading, className }: StreamingOutputProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [content, isLoading]);

  if (!content && !isLoading) return null;

  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("# ")) {
        return <h1 key={i} className="text-xl font-bold mt-6 mb-2 text-foreground">{line.slice(2)}</h1>;
      }
      if (line.startsWith("## ")) {
        return <h2 key={i} className="text-base font-semibold mt-5 mb-2 text-foreground border-b border-border pb-1">{line.slice(3)}</h2>;
      }
      if (line.startsWith("### ")) {
        return <h3 key={i} className="text-sm font-semibold mt-3 mb-1 text-foreground">{line.slice(4)}</h3>;
      }
      if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
        return <p key={i} className="font-semibold text-sm text-foreground mt-1">{line.slice(2, -2)}</p>;
      }
      if (line.startsWith("- ") || line.startsWith("• ")) {
        return <li key={i} className="text-sm text-muted-foreground ml-4 list-disc">{line.slice(2)}</li>;
      }
      if (line.match(/^\d+\./)) {
        return <li key={i} className="text-sm text-muted-foreground ml-4 list-decimal">{line.replace(/^\d+\.\s*/, "")}</li>;
      }
      if (line.startsWith("---")) {
        return <hr key={i} className="border-border my-3" />;
      }
      if (line.trim() === "") {
        return <br key={i} />;
      }
      // Handle inline bold
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className="text-sm text-muted-foreground leading-relaxed">
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**")
              ? <strong key={j} className="text-foreground font-medium">{part.slice(2, -2)}</strong>
              : part
          )}
        </p>
      );
    });
  };

  return (
    <div className={cn("rounded-xl border border-border bg-card/30 p-6 min-h-32", className)}>
      <div className="prose prose-sm max-w-none">
        {renderContent(content)}
        {isLoading && (
          <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-0.5 rounded-sm" />
        )}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
