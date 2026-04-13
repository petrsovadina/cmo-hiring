import Anthropic from "@anthropic-ai/sdk";

export const runtime = "edge";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are an expert performance marketing strategist specializing in SaaS remarketing campaigns. You generate structured A/B test variant matrices for paid advertising.

Rules:
- One variable per variant. Each variant must clearly state what it's testing and differ from the baseline in exactly one dimension.
- Platform-ready. Every piece of copy must fit within the platform's character limits.
- Label everything. Each variant must include: variant ID, test variable, hypothesis, and expected outcome.
- Be specific. Use real numbers, real product features. No generic filler.

Character limits:
- Google Display Headline: ≤30 chars
- Google Display Description: ≤90 chars
- Meta Primary Text: ≤125 chars
- Meta Headline: ≤40 chars`;

export async function POST(request: Request) {
  const { segment, product } = await request.json();

  const segmentData: Record<string, { name: string; behavior: string; objection: string; funnel: string }> = {
    pricing_page_abandoners: {
      name: "Pricing Page Abandoners",
      behavior: "Visited pricing page, compared plans, bounced without converting",
      objection: "Price sensitivity / unclear ROI",
      funnel: "Bottom of funnel (consideration/decision)",
    },
    inactive_trials: {
      name: "Inactive Trials",
      behavior: "Signed up for trial, never installed the chat widget",
      objection: "Too complex / forgot / not priority",
      funnel: "Activation",
    },
    active_trials_no_conversion: {
      name: "Active Trials, No Conversion",
      behavior: "Using free plan, didn't upgrade to paid",
      objection: "Unclear upgrade value / free is enough",
      funnel: "Monetization",
    },
  };

  const seg = segmentData[segment] || segmentData.pricing_page_abandoners;
  const prod = product || "Smartsupp";

  const userPrompt = `Generate a complete A/B test variant matrix for ${prod} remarketing.

**Segment:** ${seg.name}
**Behavior:** ${seg.behavior}
**Primary objection:** ${seg.objection}
**Funnel stage:** ${seg.funnel}

${prod === "Smartsupp" ? `**Product context:** Smartsupp is a live chat & AI chatbot platform for e-commerce. Pricing: Free → Standard (€14/mo) → Pro (€19.50/mo) → Ultimate (custom). Key value props: increase conversions, automate support with AI, understand visitors via video recordings.` : `**Product:** ${prod}`}

Generate 6-8 variants. For each variant:

VARIANT [N] — [Name]
Testing: [variable] ([specific variation])
Hypothesis: [what we expect and why]

Google Display:
  Headline (≤30 chars): [text] ([N] chars)
  Description (≤90 chars): [text] ([N] chars)

Meta:
  Primary Text (≤125 chars): [text] ([N] chars)
  Headline (≤40 chars): [text] ([N] chars)
  CTA: [button]

Visual Direction: [brief creative concept]
---

After all variants, add:
## Testing Sequence
Recommended order to run these variants and why (which to test first for maximum learning velocity).`;

  const stream = await client.messages.stream({
    model: "claude-opus-4-5",
    max_tokens: 2500,
    system: SYSTEM_PROMPT,
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
