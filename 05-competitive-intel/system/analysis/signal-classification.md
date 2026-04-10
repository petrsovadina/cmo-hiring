# Signal Classification Framework

## Purpose
Not all competitive signals are equal. This framework classifies signals by urgency and impact to help prioritize response.

## Signal Categories

### By Type
| Category | Examples | Collection Source |
|----------|---------|-------------------|
| Pricing | Price changes, new tiers, discounts | Pricing monitor |
| Product | New features, deprecations, pivots | Website, changelog |
| Positioning | Messaging changes, new target segments | Website monitor |
| People | Key hires, departures, reorgs | LinkedIn, job postings |
| Partnerships | New integrations, strategic alliances | Website, press |
| Content | SEO campaigns, new content programs | Content tracker |
| Funding | Investment rounds, acquisitions | Press, Crunchbase |
| Customer | Review trends, churn signals | Review collector |

### By Urgency

```
┌──────────────────────────────────────────────────┐
│                URGENCY MATRIX                     │
│                                                   │
│  CRITICAL (respond within 24h)                    │
│  ├─ Major pricing change                         │
│  ├─ New product launch in our core segment        │
│  ├─ Acquisition or major funding round            │
│  └─ Viral negative press about us                 │
│                                                   │
│  HIGH (respond within 1 week)                     │
│  ├─ New feature that fills a gap we also have     │
│  ├─ Aggressive comparison page targeting us       │
│  ├─ Key hire from our team/industry               │
│  └─ Significant review sentiment shift            │
│                                                   │
│  MEDIUM (track, act within month)                 │
│  ├─ New content program / SEO push                │
│  ├─ New integration announcement                  │
│  ├─ Job postings signaling strategic shift        │
│  └─ Social media campaign launch                  │
│                                                   │
│  LOW (monitor, note in monthly report)            │
│  ├─ Minor website copy changes                    │
│  ├─ Social media activity changes                 │
│  ├─ Minor blog post topics                        │
│  └─ Team growth in non-competitive areas          │
│                                                   │
└──────────────────────────────────────────────────┘
```

## Response Protocol

| Urgency | Action | Owner | Timeline |
|---------|--------|-------|----------|
| CRITICAL | Immediate Slack alert + emergency brief | CMO | 24 hours |
| HIGH | Priority item in weekly CI report | Marketing Lead | 1 week |
| MEDIUM | Section in monthly CI report | CI Analyst | 1 month |
| LOW | Logged for trend analysis | CI System (auto) | Quarterly |

## AI Classification Prompt

```
You are a competitive intelligence triage analyst. Classify this competitive signal:

SIGNAL: {{signal_description}}
SOURCE: {{source}}
DATE: {{date_detected}}

Rate:
- URGENCY: CRITICAL / HIGH / MEDIUM / LOW
- IMPACT AREA: Pricing / Product / Positioning / People / Content / Other
- AFFECTED TEAMS: CMO / Product / Sales / Content / Engineering
- RECOMMENDED RESPONSE: {{specific action}}
- REASONING: {{why this urgency level}}
```
