import Anthropic from "@anthropic-ai/sdk";

export const runtime = "edge";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: Request) {
  const { company, competitor, focus } = await request.json();

  const systemPrompt = `You are a competitive intelligence analyst specializing in SaaS products. You produce actionable competitive intelligence reports with specific recommendations, not just observations. Use publicly available knowledge about these products.`;

  const userPrompt = `Generate a comprehensive competitive intelligence report for **${company} vs. ${competitor}**.

${focus ? `**Focus area:** ${focus}` : ""}

Structure your report as follows:

# Competitive Intelligence Report: ${company} vs. ${competitor}

## Executive Summary
3-4 sentence overview of the competitive landscape and key finding.

## 1. Positioning Analysis
- How each company positions itself
- Target customer differences
- Key messaging themes
- Positioning gaps and opportunities

## 2. Pricing Comparison
| Tier | ${company} | ${competitor} |
Detailed breakdown of pricing tiers, what's included, and strategic pricing differences.

## 3. Feature Comparison
Key features — what each has, what's missing, what's differentiating.

## 4. Content & Marketing Strategy
- Content volume and frequency
- Topics and themes they own
- Distribution channels
- Content gaps ${company} can exploit

## 5. Customer Sentiment
Based on public reviews (G2, Capterra, Trustpilot patterns):
- What customers love about each
- Common complaints
- Switching motivations

## 6. Competitive Signals to Monitor
List 6 specific signals with monitoring method (e.g., "Watch ${competitor}'s pricing page monthly for plan changes")

## 7. Battle Card
Quick reference for sales/marketing:

**When prospect mentions ${competitor}:**
- Their strength to acknowledge:
- Your counter-argument:
- Questions to ask:
- Winning message:

## 8. Recommendations
5 specific, actionable recommendations for ${company} based on this analysis. Each with: action, rationale, and expected impact.`;

  const stream = await client.messages.stream({
    model: "claude-opus-4-5",
    max_tokens: 3000,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
          controller.enqueue(new TextEncoder().encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
