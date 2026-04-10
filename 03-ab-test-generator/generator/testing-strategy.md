# Testing Strategy — Smartsupp Pricing Page Abandoners

## Why This Segment First

Pricing page abandoners are the highest-intent remarketing segment:
- They already know the product exists
- They actively evaluated pricing (bottom of funnel)
- Their objection is quantifiable (price/ROI) — easier to address in ad copy
- Expected ROAS is highest here due to proximity to conversion

## Variable Priority (What to Test and Why)

### 1. Headline Angle (Priority: HIGHEST)

The headline determines whether someone even reads the ad. For pricing page abandoners, the key question is: **which frame overcomes the "is it worth it?" objection?**

| Angle | Rationale | Expected Impact |
|-------|-----------|-----------------|
| ROI reframe | Directly addresses price objection with numbers | High |
| Social proof | Reduces perceived risk ("if 50K chose it, it's safe") | Medium-High |
| Loss aversion | Creates urgency without discounting | High |
| Competitor comparison | Repositions price as "affordable" vs. alternatives | Medium |

**Test this first** because it has the largest expected effect size and informs all subsequent copy decisions.

### 2. CTA Copy (Priority: HIGH)

The CTA bridges intent to action. Standard CTAs ("Try Free", "Sign Up") are expected by users. Testing value-oriented CTAs ("Calculate Your ROI", "See the Math") may better match the analytical mindset of someone who was on a pricing page.

### 3. Emotional Trigger (Priority: MEDIUM)

The body copy reinforces the headline. Testing the emotional undercurrent (FOMO vs. trust vs. pain) is a secondary lever. Only test after headline angle is settled.

### 4. Visual Concept (Priority: LOW)

Visual testing requires design resources. Test last, and only if headline/CTA tests show the copy approach is solid.

## Testing Methodology

### Sequential A/B Testing (Not Multivariate)

We use **sequential A/B testing** (not multivariate) because:
- Lower traffic requirement per test
- Clearer signal per variable
- Easier to implement across both Google and Meta
- Each phase builds on the previous winner

### Sample Size Calculation

For a baseline CTR of 0.5% (Google Display) and minimum detectable effect of 25% relative lift:
- **~10,000 impressions per variant** for 80% power at 95% confidence
- At typical remarketing audience sizes, this means **7-14 days per test phase**

For Meta (baseline CTR ~1.5%):
- **~3,000 impressions per variant** for equivalent power
- **5-7 days per test phase**

### Winner Selection Criteria

A variant "wins" when:
1. CTR difference is statistically significant (p < 0.05)
2. The winning variant also shows equal or better downstream conversion (trial signup rate)
3. CPA remains within target (< EUR 25/trial)

If CTR is better but CPA is worse, the variant loses — we optimize for acquisition cost, not clicks.

## Iteration Protocol

After each test phase:

```
1. Export results (impressions, clicks, CTR, conversions, CPA per variant)
2. Update config.yaml with winning angle/CTA
3. Re-run generator with updated inputs
4. Generate next batch of variants that refine the winner
5. Archive previous results in output/archive/
```

This creates a **feedback loop** where each test round produces better inputs for the next generation.

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Creative fatigue (CTR drops over time) | Rotate variants every 2 weeks, frequency cap at 3/day |
| Low remarketing audience size | Extend cookie window from 30 to 45 days if needed |
| Statistical noise (false positives) | Always run full 7-day minimum, never stop early on "good" results |
| Brand safety (competitor naming) | Review Variant 5 with legal — comparative ads are allowed but need factual backing |
| Urgency variant attracts low-quality leads | Monitor trial-to-paid conversion separately for Variant 7 |
