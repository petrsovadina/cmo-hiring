# Website & Positioning Monitor

## Purpose
Track changes in competitor website messaging, positioning, and value propositions.

## Sources
- Homepage hero section
- Product pages
- About/Company pages
- Meta titles & descriptions

## Collection Method

### Manual (Weekly)
Visit these URLs and capture key messaging:

| Source | Smartsupp URL | Tidio URL |
|--------|--------------|-----------|
| Homepage | smartsupp.com | tidio.com |
| Pricing | smartsupp.com/pricing | tidio.com/pricing |
| Features | smartsupp.com/features | tidio.com/features |
| AI/Chatbot | smartsupp.com/chatbot | tidio.com/lyro-ai-chatbot |
| Integrations | smartsupp.com/integrations | tidio.com/integrations |

### Automated (via n8n/Make)
```
Trigger: Weekly (Monday 8:00 AM)
Step 1: HTTP Request → Fetch each URL
Step 2: HTML Parse → Extract <h1>, <h2>, meta description, pricing elements
Step 3: Compare → Diff against previous week's snapshot
Step 4: If changes detected → Send alert to Slack #competitive-intel
Step 5: Store snapshot → Google Sheets / Airtable for historical tracking
```

## AI Analysis Prompt

```
You are a competitive intelligence analyst. Compare these two website snapshots:

PREVIOUS (week of {{previous_date}}):
{{previous_snapshot}}

CURRENT (week of {{current_date}}):
{{current_snapshot}}

Identify:
1. Any messaging or positioning changes
2. New features or products mentioned
3. Changes in target audience language
4. New CTAs or conversion strategies
5. Significance rating: LOW / MEDIUM / HIGH / CRITICAL

Format as a brief alert if changes are significant.
```

## What to Track
- [ ] Hero headline & subheadline
- [ ] Primary CTA text
- [ ] Key benefit statements
- [ ] Social proof (customer count, logos)
- [ ] Trust signals (badges, certifications)
- [ ] Navigation structure changes
