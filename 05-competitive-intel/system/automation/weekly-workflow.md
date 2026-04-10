# Weekly CI Automation Workflow

## Overview
This workflow automates the weekly competitive intelligence cycle using n8n (or Make/Zapier).

## Architecture

```
WEEKLY TRIGGER (Monday 7:00 AM CET)
│
├─→ [COLLECT] Run all collectors in parallel
│     ├─ Website snapshots (HTTP Request nodes)
│     ├─ Pricing page capture
│     ├─ G2/Capterra latest reviews (RSS or scrape)
│     ├─ Blog RSS feed check
│     ├─ LinkedIn posts (via API or manual input)
│     └─ Job postings check
│
├─→ [STORE] Save raw data
│     └─ Google Sheets / Airtable (append to weekly log)
│
├─→ [DIFF] Compare with previous week
│     ├─ Text diff on website snapshots
│     ├─ Price comparison
│     └─ New reviews since last check
│
├─→ [ANALYZE] Feed changes to AI
│     ├─ Input: All collector outputs + diffs
│     ├─ Prompt: Master analysis prompt
│     ├─ Model: Claude 3.5 Sonnet / GPT-4o
│     └─ Output: Structured CI report
│
├─→ [CLASSIFY] Triage signals
│     ├─ Run signal classification on each finding
│     └─ Flag CRITICAL/HIGH for immediate alert
│
├─→ [REPORT] Generate & distribute
│     ├─ Format using weekly report template
│     ├─ Post to Slack #competitive-intel
│     ├─ Email digest to stakeholders
│     └─ If CRITICAL signals: send immediate alert
│
└─→ [ARCHIVE] Store for trend analysis
      └─ Archive report in Google Drive / Notion
```

## n8n Workflow Steps

### 1. Trigger
- **Node**: Schedule Trigger
- **Config**: Every Monday at 7:00 AM CET

### 2. Collect — Website Snapshots
- **Node**: HTTP Request (x2, parallel)
- **URLs**: smartsupp.com, tidio.com (+ pricing pages)
- **Output**: HTML content

### 3. Collect — Reviews
- **Node**: HTTP Request
- **URLs**: G2 RSS feeds or API endpoints
- **Output**: Latest review data

### 4. Collect — Blog Posts
- **Node**: RSS Read
- **URLs**: Blog RSS feeds
- **Output**: New posts since last run

### 5. Store Raw Data
- **Node**: Google Sheets (Append Row)
- **Data**: Date, source, raw content hash, summary

### 6. Compare with Previous
- **Node**: Code (JavaScript)
- **Logic**: Diff current vs. stored previous snapshot
- **Output**: List of changes

### 7. AI Analysis
- **Node**: AI Agent / HTTP Request to Claude API
- **Input**: All collected data + diffs
- **Prompt**: Master competitive analysis prompt
- **Output**: Structured report JSON

### 8. Format Report
- **Node**: Code (Markdown formatting)
- **Input**: AI analysis output
- **Output**: Formatted markdown report

### 9. Distribute
- **Node**: Slack (Send Message)
- **Channel**: #competitive-intel
- **Content**: Formatted report

### 10. Alert (Conditional)
- **Node**: IF (signal urgency === CRITICAL || HIGH)
- **Then**: Slack DM to CMO + separate alert message
- **Else**: Skip

## Environment Variables

```
SMARTSUPP_URLS=smartsupp.com,smartsupp.com/pricing,smartsupp.com/blog
TIDIO_URLS=tidio.com,tidio.com/pricing,tidio.com/blog
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
CLAUDE_API_KEY=sk-ant-...
GOOGLE_SHEETS_ID=...
ALERT_RECIPIENTS=cmo@company.com,vp-product@company.com
```

## Manual Intervention Points
1. **LinkedIn/Social data** — currently requires manual paste (API access limited)
2. **Job postings** — careers pages don't have standard APIs, manual check recommended
3. **Review deep-dive** — AI summary should be validated by human for nuance
4. **Report approval** — optional human review before distribution (can be skipped for speed)

## Cost Estimate
- AI API calls: ~$0.50-1.00 per weekly run (Claude Sonnet)
- n8n: Self-hosted (free) or Cloud (~$20/month)
- Total: <$25/month for weekly automated CI
