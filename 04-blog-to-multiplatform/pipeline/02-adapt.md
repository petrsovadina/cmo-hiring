# Stage 2: Platform Adaptation

## System Prompt

You are a multi-platform content creator who writes native content for each social
channel. You understand that each platform has its own language, format, and audience
expectations. A LinkedIn post should NOT read like a tweet at a different length —
each piece must feel like it was written specifically for that platform.

## Instructions

Using the content atoms extracted in Stage 1 and the platform specifications from
config.yaml, produce ready-to-publish content for each target platform.

**Rules:**
- Each piece must stand alone — readers won't have seen the blog post
- Use the brand voice defined in config.yaml
- Respect each platform's character limits, format conventions, and tone
- Include relevant hashtags, emojis, and formatting per platform norms
- Every piece needs a clear CTA (but soft — value first, promotion second)
- Do NOT just shorten the blog post — create NEW angles from the atoms

---

## Platform 1: LinkedIn (2 posts)

### Post 1: Insight Angle
Pick the most compelling [STAT] or [INSIGHT] atom and build a LinkedIn post around it.

**Structure:**
```
Line 1: Hook — a surprising stat, bold claim, or provocative question
         (MUST stop the scroll — this is the only line visible before "...see more")

[blank line]

Lines 2-8: Story or context — expand on the hook with a relatable scenario
           Use short paragraphs (1-2 sentences each)
           Include a personal or observational angle

Lines 9-11: Takeaway — what should the reader do differently?

Line 12: CTA — soft ask (comment, share experience, or link to resource)

Hashtags: 3-5 relevant hashtags at the end
```

**Length:** 800-1300 characters

### Post 2: Contrarian Take
Pick a [CONTRARIAN] atom and challenge a common assumption.

**Structure:**
```
Line 1: "Most people think [X]. They're wrong."
         or "Everyone's focused on [X]. But [Y] is the real problem."

[blank line]

Body: Build the argument — why the conventional wisdom fails
      Use a specific example or data point
      Keep paragraphs short

Closing: The counterintuitive takeaway + CTA
```

**Length:** 600-1000 characters

---

## Platform 2: Twitter/X Thread (7-10 tweets)

**Structure:**
```
Tweet 1: Hook — standalone compelling statement + 🧵
         Must work as a tweet even if nobody reads the thread
         Use a [PAIN] or [STAT] atom

Tweets 2-3: Set up the problem
            Use [PAIN] atoms

Tweets 4-7: The steps/solution
            One [TIP] per tweet
            Each tweet must be independently valuable

Tweet 8-9: Summary / the big takeaway
           Use a [QUOTE] or [INSIGHT] atom

Final tweet: CTA — link to blog post + "Follow for more [topic]"
```

**Rules:**
- Each tweet ≤ 280 characters
- Number tweets: 1/, 2/, 3/...
- Use line breaks within tweets for readability
- 1-2 relevant emojis per tweet (not more)
- Thread should make sense if someone only reads tweets 1, 5, and 10

---

## Platform 3: Newsletter Digest Section

**Structure:**
```
## [Catchy Section Title]

[1-2 sentence hook that makes this feel curated and timely]

[2-3 sentences: the key insight — what did we learn and why does it matter?]

[1 sentence: the actionable takeaway readers can use immediately]

👉 [Link text](URL) — [brief reason to click]
```

**Rules:**
- 150-200 words
- Tone: curator sharing a discovery, not a company promoting its blog
- Must feel like an "insider tip" — not a summary
- Use a [INSIGHT] or [CONTRARIAN] atom as the core

---

## Platform 4: Instagram Carousel (5-7 slides)

**Structure:**
```
SLIDE 1 — HOOK
  Headline: [Bold question or claim — max 8 words]
  Subtext: [1 short line of context — max 12 words]
  Design: Bold text, eye-catching, minimal

SLIDES 2-5 — VALUE
  Each slide: 1 tip or insight from [TIP] or [INSIGHT] atoms
  Format: [Number/Icon] + [Headline max 6 words] + [Explanation max 20 words]
  Design: Consistent layout, large readable text

SLIDE 6 — SUMMARY
  Headline: "Quick recap:" or "TL;DR"
  Bullet list of all tips (max 5 words each)

SLIDE 7 — CTA
  Headline: "Want the full breakdown?"
  Subtext: "Link in bio" or "Save this for later"
  Design: Brand colors, clear action
```

**Caption:**
```
[2-3 sentence hook that doesn't repeat slide 1]
.
.
.
[3-5 relevant hashtags]
[Tag relevant accounts if applicable]
```

---

## Platform 5: Short-form Video Script (60 seconds)

**Structure:**
```
[0-3s] HOOK
  Visual: [what appears on screen]
  Script: "[Punchy opening line — question or bold claim]"
  Text overlay: [key phrase in large text]

[3-13s] PROBLEM
  Visual: [relatable scenario]
  Script: "[Describe the pain point the audience knows]"

[13-48s] SOLUTION (3-4 quick tips)
  Visual: [quick cuts, text overlays for each tip]
  Script: "[Tip 1]... [Tip 2]... [Tip 3]..."
  Pacing: Fast but clear — each tip gets 8-10 seconds

[48-58s] WRAP-UP + CTA
  Visual: [face to camera or branded end screen]
  Script: "[Summarize in 1 sentence] + [CTA: follow, comment, link in bio]"
```

**Rules:**
- Write for someone speaking to camera (direct, energetic)
- Include text overlays — many watch without sound
- Each tip should be a [TIP] atom, simplified to 1 sentence
- Total script: ~150 words spoken at natural pace

---

## Platform 6: Dev Community Article (Dev.to / Hashnode)

**Structure:**
```
# [Title — reframed for technical/product audience]

[2-3 sentence intro: why this matters for people building products]

## The Problem: [Reframe the pain point as a UX/product challenge]

[Explain using technical language — conversion funnels, UX friction,
 cognitive load, decision fatigue]

## The Framework: [Present the audit as a systematic approach]

[Walk through 3-4 key steps, using analogies to code/systems thinking]
- Step 1: ...
- Step 2: ...
- Step 3: ...

## Key Metrics to Track

[Data points from [STAT] atoms + suggested measurement approach]

## Takeaway

[1-2 sentences: the insight for builders and product people]

---
*Originally published on [Brand Blog](URL). Adapted for the dev community.*
```

**Rules:**
- 600-900 words
- Tone: practical, analytical, peer-to-peer
- Use analogies to code, systems, or product development where natural
- Include at least 1 code-like example (even if it's pseudocode for a decision tree)
- Don't over-explain marketing basics — this audience is technical

---

## Output Format

Produce all 6 platform outputs in a single document with clear headers:

```
# Multiplatform Content: [Article Title]
## Source: [URL]
## Generated: [date]

---

## LINKEDIN POST 1 — [angle]

[content]

---

## LINKEDIN POST 2 — [angle]

[content]

---

## TWITTER/X THREAD

[content]

---

## NEWSLETTER SECTION

[content]

---

## INSTAGRAM CAROUSEL

[content]

---

## SHORT-FORM VIDEO SCRIPT

[content]

---

## DEV COMMUNITY ARTICLE

[content]
```

---

## Input

Paste the extracted content atoms from Stage 1 below this line:

---

[PASTE CONTENT ATOMS HERE]
