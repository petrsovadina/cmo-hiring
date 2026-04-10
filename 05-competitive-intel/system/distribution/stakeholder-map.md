# Stakeholder Distribution Map

## Who Gets What

### CMO / VP Marketing
- **Gets**: Full weekly CI report, all CRITICAL/HIGH alerts
- **Format**: Executive summary + threat dashboard
- **Cadence**: Weekly (Monday AM) + real-time alerts
- **Channel**: Email digest + Slack #competitive-intel
- **Cares about**: Positioning shifts, pricing changes, brand threats

### VP Product
- **Gets**: Feature gap analysis, product signal section
- **Format**: Feature comparison matrix + priority recommendations
- **Cadence**: Bi-weekly deep dive, real-time for product launches
- **Channel**: Slack #product-intel
- **Cares about**: Feature parity, technical differentiation, roadmap implications

### Head of Content / SEO
- **Gets**: Content & SEO section, keyword gap analysis
- **Format**: Content velocity comparison + keyword opportunities
- **Cadence**: Weekly with editorial calendar alignment
- **Channel**: Slack #content-team
- **Cares about**: Content gaps, SEO opportunities, comparison page strategy

### Sales Team
- **Gets**: Competitive battle cards (refreshed monthly)
- **Format**: Quick-reference objection handling + feature comparison
- **Cadence**: Monthly refresh + ad-hoc updates for major changes
- **Channel**: Slack #sales-enablement + CRM notes
- **Cares about**: Pricing comparison, win/loss reasons, feature differentiators

### CEO / Board
- **Gets**: Quarterly competitive landscape summary
- **Format**: 1-page threat assessment + trend analysis
- **Cadence**: Quarterly
- **Channel**: Email + board deck appendix
- **Cares about**: Market position, strategic threats, competitive moat

## Distribution Workflow

```
CI System runs weekly
  │
  ├── Monday 8:00 AM: Full report generated
  │     ├── Auto-post to #competitive-intel (Slack)
  │     ├── Email digest to CMO + VP Product
  │     └── Tag relevant sections for content/sales
  │
  ├── Real-time: CRITICAL/HIGH alerts
  │     ├── Slack DM to CMO
  │     ├── Post to #competitive-intel
  │     └── Create action item in project management tool
  │
  └── Monthly: Battle card refresh
        ├── Update sales enablement materials
        └── Post to #sales-enablement
```

## Feedback Loop

Each report includes a 1-question survey:
> "Was this week's most important competitive signal [X]?
> 👍 Yes, this is what I needed | 👎 No, I care more about [free text]"

This feedback tunes the signal classification system over time.
