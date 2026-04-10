# Landing Page Pipeline for Reservio

## Architecture

This pipeline takes a **vertical name** as input and produces a complete landing page content package through 4 sequential stages:

```
INPUT: vertical name (e.g., "fitness studios")
  │
  ▼
┌─────────────────────────┐
│ Stage 1: RESEARCH       │  → Vertical analysis, pain points, competitor landscape
│ (01-research-prompt.md) │     search intent, audience segments
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│ Stage 2: MESSAGING      │  → Value propositions, tone of voice, positioning,
│ (02-messaging-prompt.md)│     differentiation angles, proof points
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│ Stage 3: CONTENT GEN    │  → Hero section, feature blocks, FAQ, social proof,
│ (03-content-prompt.md)  │     CTA strategy, testimonial framing
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│ Stage 4: SEO & META     │  → Title tags, meta descriptions, OG data,
│ (04-seo-prompt.md)      │     schema markup suggestions, keyword mapping
└──────────┬──────────────┘
           │
           ▼
OUTPUT: Complete landing page content package (output/)
```

## How to Run

Each stage is a structured prompt designed for Claude or any capable LLM. The output of each stage feeds into the next.

**Quick run (single command):**
```bash
# Run the orchestrator which chains all 4 stages
cat pipeline/00-orchestrator.md | claude --print
```

**Stage-by-stage (for iteration):**
```bash
# 1. Research
cat pipeline/01-research-prompt.md | claude --print > output/01-research.md

# 2. Messaging (uses research output)
cat output/01-research.md pipeline/02-messaging-prompt.md | claude --print > output/02-messaging.md

# 3. Content generation (uses research + messaging)
cat output/01-research.md output/02-messaging.md pipeline/03-content-prompt.md | claude --print > output/03-content.md

# 4. SEO optimization (uses all previous)
cat output/01-research.md output/03-content.md pipeline/04-seo-prompt.md | claude --print > output/04-seo.md
```

## Scaling to 20+ Verticals

The pipeline is parameterized by vertical name. To scale:

1. **Batch execution**: Loop through a verticals list, running the pipeline for each
2. **Vertical config**: Add `verticals/` directory with per-vertical overrides (competitor list, specific pain points, regional data)
3. **Quality gate**: Add a review stage (05-review-prompt.md) that scores output against brand guidelines
4. **A/B variants**: Add variant parameter to content generation stage to produce 2-3 headline/CTA alternatives per vertical

## Testing & Iteration

- **Pre-launch**: Run pipeline output through a scoring prompt that checks brand consistency, CTA clarity, and vertical accuracy
- **Post-launch**: Track conversion rate, bounce rate, time-on-page per vertical. Feed performance data back into Stage 2 (messaging) to refine positioning
- **A/B testing**: Generate variant content by adjusting the `tone` and `cta_style` parameters in Stage 3
