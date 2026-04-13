import Anthropic from "@anthropic-ai/sdk";

export const runtime = "edge";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: Request) {
  const { vertical } = await request.json();

  const systemPrompt = `You are a landing page content pipeline for Reservio (reservio.com) — an online booking and business management system processing 20M+ bookings/year, part of the Abugo portfolio. You generate complete landing page content packages for specific verticals.

Brand positioning: Professional but approachable, benefit-focused, data-driven where possible.`;

  const userPrompt = `Generate a complete landing page content package for Reservio targeting the **${vertical}** vertical.

Execute all 4 stages:

## STAGE 1: VERTICAL RESEARCH SUMMARY
Brief market overview, top 3 booking pain points, and 3 key competitors with their gaps.

## STAGE 2: MESSAGING STRATEGY
- Primary value proposition (1 sentence)
- 3 key messages with supporting proof points
- Tone adjustments for this vertical

## STAGE 3: LANDING PAGE CONTENT

### Hero Section
**Headline:** (max 8 words, benefit-focused)
**Subheadline:** (max 20 words)
**CTA Button:** (3-4 words)
**Supporting stat or proof point:**

### Feature Blocks (3 features)
For each: Feature name · Benefit headline · 2-sentence description

### Social Proof
3 realistic testimonial frameworks (role, pain solved, result)

### FAQ (5 questions)
Common objections and concerns for this vertical

### Footer CTA
Headline + subtext + button

## STAGE 4: SEO METADATA
**Title tag:** (55-60 chars)
**Meta description:** (145-155 chars)
**H1:** 
**Target keyword:** 
**3 secondary keywords:**`;

  const stream = await client.messages.stream({
    model: "claude-opus-4-5",
    max_tokens: 2500,
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
