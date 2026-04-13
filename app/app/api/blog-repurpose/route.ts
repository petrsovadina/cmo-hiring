import Anthropic from "@anthropic-ai/sdk";

export const runtime = "edge";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: Request) {
  const { blogContent, blogUrl, platforms } = await request.json();

  const targetPlatforms = platforms || ["LinkedIn", "Twitter/X", "Newsletter", "Instagram Carousel", "Video Script", "Podcast Notes"];

  const systemPrompt = `You are a content repurposing expert for Abugo portfolio companies. You transform blog content into platform-native content. Each format should feel native to that platform — not just the same text at different lengths.`;

  const userPrompt = `Repurpose the following blog content into platform-native formats.

${blogUrl ? `**Source URL:** ${blogUrl}` : ""}

**Blog content:**
${blogContent}

---

First, extract the key content atoms:

## CONTENT ATOMS
List 5-7 key insights, stats, quotes, or stories from the article that have standalone value.

---

Then produce platform-native content for each platform:

${targetPlatforms.map((p: string) => `## ${p}`).join("\n\n[content]\n\n")}

[content]

---

Platform guidelines:
- **LinkedIn:** 150-250 words, insight-first hook, professional tone, 1-2 hashtags, ends with question
- **Twitter/X:** 5-7 tweet thread, each ≤280 chars, numbered, bold opener
- **Newsletter:** Subject line + preview + 150-200 word body + CTA
- **Instagram Carousel:** 6-8 slides, each with header + 1-2 sentences, last slide = CTA
- **Video Script:** 60-90 second hook script (opening 15s hook + 3 main points + CTA)
- **Podcast Notes:** Episode title + 3-sentence description + 5 talking points + key quotes`;

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
