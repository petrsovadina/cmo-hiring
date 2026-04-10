# Pricing Monitor

## Purpose
Track pricing changes, plan restructuring, and monetization strategy shifts.

## Sources
- Pricing pages (primary)
- Product changelog
- G2/Capterra pricing data
- Customer forums (complaints about pricing changes)

## Data Points to Capture

### Per Plan
| Field | Description |
|-------|------------|
| Plan name | e.g., Free, Standard, Pro, Enterprise |
| Monthly price | Per agent/seat |
| Annual price | Per agent/seat (annual discount %) |
| Conversation/chat limits | Monthly caps |
| Agent/seat limits | Max users |
| Key features included | What differentiates this tier |
| Key features excluded | What's gated to higher tiers |

### Strategic Indicators
- Free tier generosity (signal: land-and-expand vs. premium-first)
- Price jump between tiers (signal: where they monetize)
- Enterprise pricing transparency (signal: sales-led vs. product-led)
- AI feature pricing (signal: how they monetize AI)
- Add-on pricing (signal: modular vs. bundled)

## Collection Frequency
- **Weekly**: Quick check for pricing page changes
- **Monthly**: Full pricing comparison update
- **Immediately**: If change detected (alert)

## AI Analysis Prompt

```
You are a SaaS pricing strategist. Analyze these two pricing structures:

SMARTSUPP PRICING:
{{smartsupp_pricing}}

TIDIO PRICING:
{{tidio_pricing}}

Provide:
1. Price-per-feature comparison at each tier
2. Where each company monetizes (what's gated)
3. Pricing advantages for Smartsupp at each buyer segment:
   - Solopreneur / small shop (1 agent)
   - SMB (3-5 agents)
   - Mid-market (10-20 agents)
   - Enterprise (50+ agents)
4. Pricing vulnerabilities — where Tidio undercuts or offers more value
5. Recommendations for Smartsupp pricing strategy
```

## Competitive Pricing Matrix Template

```
| Feature/Limit      | Smartsupp Free | Smartsupp Std | Smartsupp Pro | Tidio Free | Tidio Growth | Tidio Plus |
|-------------------|---------------|--------------|--------------|-----------|-------------|-----------|
| Monthly price     |               |              |              |           |             |           |
| Chat limit        |               |              |              |           |             |           |
| Chatbot scenarios |               |              |              |           |             |           |
| AI conversations  |               |              |              |           |             |           |
| Integrations      |               |              |              |           |             |           |
| Analytics         |               |              |              |           |             |           |
| Video recordings  |               |              |              |           |             |           |
```
