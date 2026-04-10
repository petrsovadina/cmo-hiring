# A/B Test Variant Generation Prompt

This is the main generation prompt. Feed this (together with `system-prompt.md`) to an LLM to generate the variant matrix.

---

## Input: Segment & Campaign Brief

**Product:** Smartsupp — live chat & AI chatbot platform for e-commerce
**Pricing:** Free (1 agent, 50 conv/mo) → Standard (EUR 14/mo) → Pro (EUR 19.50/mo) → Ultimate (custom)
**URL:** https://smartsupp.com

**Remarketing Segment:** Pricing Page Abandoners
- **Who:** E-commerce store owners/managers who visited the Smartsupp pricing page
- **What they did:** Compared plans, possibly used the pricing calculator, then bounced
- **Primary objection:** Price sensitivity / unclear ROI
- **Secondary objections:** Not sure which plan fits, need to compare competitors, budget approval needed
- **Intent signal:** High — actively evaluating solutions
- **Funnel stage:** Bottom of funnel (consideration → decision)

**Platforms:** Google Display Network + Meta (Facebook/Instagram)

**Platform Constraints:**
- Google Display: Headline ≤ 30 chars, Description ≤ 90 chars
- Meta: Primary Text ≤ 125 chars, Headline ≤ 40 chars, CTA from preset list

## Instructions

Generate **8 ad variants** for this remarketing segment. Follow this structure:

### Variant 1: Baseline (Control)
- Use a straightforward, benefit-focused message (the "safe" variant)
- This is what we measure everything against

### Variants 2-3: Headline Angle Tests
- Variant 2: **ROI reframe** — lead with concrete numbers/value
- Variant 3: **Social proof** — lead with adoption/trust signals

### Variant 4: Loss Aversion Test
- Frame around what the prospect is losing by NOT using Smartsupp

### Variant 5: Competitor Comparison
- Position Smartsupp against known alternatives (Intercom, Drift, Tidio)

### Variant 6: CTA Test
- Same as best-performing headline angle, but test different CTA copy

### Variant 7: Urgency/Scarcity
- Time-limited offer or scarcity element

### Variant 8: Wild Card
- Unconventional angle — humor, counterintuitive claim, or radically different frame

## Requirements

1. **Character counts are hard limits.** Count every character including spaces. If it doesn't fit, rewrite.
2. **Each variant tests exactly ONE variable.** State what that variable is.
3. **Include a hypothesis** for each variant (what you expect and why).
4. **Provide visual direction** for each variant (what kind of image/creative to pair with the copy).
5. **End with a testing sequence** that explains which variants to run against each other and in what order.
6. **Include evaluation criteria** — what metrics matter, minimum sample sizes, test duration.

## Smartsupp Data Points (use in copy)

- 50,000+ active users
- 4.7/5 rating on G2
- Works with Shopify, WooCommerce, PrestaShop
- AI chatbot handles up to 80% of routine questions
- Average setup time: under 5 minutes
- Plans start at EUR 14/mo (Standard)
- Video recordings included from Pro plan
- Competitors charge 3-10x more for similar features
