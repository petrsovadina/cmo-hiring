# Competitive Intelligence System: Smartsupp vs Tidio

## Overview

This is a repeatable competitive intelligence (CI) system for monitoring Smartsupp's competitive landscape, starting with Tidio as the primary competitor. The system is designed to run weekly with minimal manual effort.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│              CI System Pipeline                      │
│                                                      │
│  1. COLLECT ──> 2. ANALYZE ──> 3. REPORT ──> 4. ACT │
│                                                      │
│  Sources:       Processing:     Output:       Action: │
│  - Websites     - AI analysis   - Report      - Slack │
│  - Pricing      - Diff detect   - Dashboard   - Jira  │
│  - Reviews      - Sentiment     - Alerts      - Brief │
│  - Content      - Trend track                         │
│  - Social                                             │
│  - Jobs                                               │
└─────────────────────────────────────────────────────┘
```

## Components

### 1. Data Collection (`collectors/`)
- `website-monitor.md` — Website & positioning change detection
- `pricing-monitor.md` — Pricing page monitoring
- `review-collector.md` — G2/Capterra review aggregation
- `content-tracker.md` — Blog & SEO content monitoring
- `social-monitor.md` — Social media activity tracking
- `jobs-monitor.md` — Job posting analysis for strategic signals

### 2. Analysis Engine (`analysis/`)
- `competitive-analysis-prompt.md` — Master AI prompt for comparative analysis
- `signal-classification.md` — Framework for classifying competitive signals by urgency

### 3. Report Generation (`reports/`)
- `weekly-report-template.md` — Standard weekly CI report template
- `alert-template.md` — Urgent competitive alert template

### 4. Distribution (`distribution/`)
- `stakeholder-map.md` — Who gets what, when, how

## How to Run

### One-time analysis
```bash
# Use the master analysis prompt with current data
# Feed collectors' output into the analysis engine
# Generate report using the template
```

### Weekly automated run
See `automation/weekly-workflow.md` for the n8n/Make workflow export.

## Designed For
- **CMO/VP Marketing** — Strategic decisions, positioning
- **Product team** — Feature gap priorities
- **Content team** — SEO & content strategy
- **Sales team** — Competitive battle cards
