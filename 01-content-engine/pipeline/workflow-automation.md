# Content Engine Automation Workflow

## Overview

This workflow automates the weekly content generation cycle using n8n (or Make/Zapier).
It takes seed inputs, runs them through the content engine, and delivers platform-ready
content to a review queue.

## Architecture

```
[Seed Sources]          [Content Engine]           [Distribution]
     |                       |                          |
  Airtable/Notion   ->   Claude API    ->    Google Sheets (calendar)
  RSS feeds              (master prompt)       Slack (review queue)
  LinkedIn alerts         + platform           Buffer/Hootsuite (scheduling)
  Team submissions        templates            Substack (newsletter)
                                               WordPress (blog)
```

## Weekly Workflow

### Trigger: Every Monday 7:00 AM CET

### Step 1: Collect Seed Inputs
**Source:** Airtable base "Content Seeds" (or Notion database)

Fields:
- `topic` (text) -- What happened or what's the insight
- `source` (select) -- Company milestone / Industry trend / Product update / Team insight
- `pillar` (select) -- 1-5 content pillar
- `portfolio_company` (select) -- Which company to feature
- `key_data` (text) -- Specific numbers, dates, facts
- `priority` (select) -- High / Medium / Low
- `status` (select) -- New / Generating / Review / Approved / Published

**Filter:** status = "New" AND priority IN ("High", "Medium")
**Limit:** Top 3-5 seeds per week

### Step 2: Generate Content (per seed)
**Tool:** Claude API (claude-sonnet-4-5-20250514 for speed, claude-opus-4-0-20250115 for quality)

**API call:**
```json
{
  "model": "claude-sonnet-4-5-20250514",
  "max_tokens": 4000,
  "system": "[system prompt from seed-to-content-prompt.md]",
  "messages": [
    {
      "role": "user",
      "content": "## Seed Input\n\nTopic: {{topic}}\nSource: {{source}}\nPillar: {{pillar}}\nPortfolio company focus: {{portfolio_company}}\nKey data points: {{key_data}}\n\n## Generate\n\nProduce content for all 4 platforms."
    }
  ]
}
```

**Cost:** ~$0.03-0.08 per seed (Sonnet), ~$0.15-0.40 per seed (Opus)
**Weekly cost:** ~$0.15-2.00 for 5 seeds

### Step 3: Parse & Store
**Action:** Parse Claude's response into separate platform outputs

Store in Google Sheet "Content Calendar" with columns:
- Week, Day, Platform, Pillar, Title/Hook, Full Content, Status, Publish URL

### Step 4: Review Queue
**Action:** Post to Slack #content-review channel

```
New content batch ready for review:
- 5 LinkedIn posts
- 5 Twitter/X threads
- 5 Newsletter sections
- 5 Blog posts

Review sheet: [link]
Deadline: Wednesday 17:00 CET
```

### Step 5: Schedule Approved Content
**Trigger:** When status changes to "Approved" in the Google Sheet

Route to appropriate tool:
- LinkedIn -> Buffer or native scheduling
- Twitter/X -> Buffer or TweetDeck
- Newsletter -> Substack draft
- Blog -> WordPress draft via REST API

## Daily Publishing Schedule

| Day | Time (CET) | Platform | Content Type |
|-----|-----------|----------|--------------|
| Mon | 09:00 | LinkedIn | Thought leadership post |
| Mon | 12:00 | Twitter/X | Thread |
| Tue | 08:00 | Blog | Long-form article |
| Wed | 09:00 | LinkedIn | Product insight |
| Wed | 12:00 | Twitter/X | Standalone insight |
| Thu | 10:00 | Newsletter | Weekly digest |
| Thu | 09:00 | LinkedIn | Case study |
| Fri | 09:00 | LinkedIn | Team/culture |
| Fri | 12:00 | Twitter/X | Quick take |

## Feedback Loop

### Weekly Metrics Collection (Friday 17:00 CET)

**Automated collection via APIs:**
- LinkedIn: impressions, engagement rate, comments, shares (LinkedIn API)
- Twitter/X: impressions, engagements, retweets, replies (X API)
- Newsletter: open rate, click rate, unsubscribes (Substack/Mailchimp API)
- Blog: pageviews, time on page, bounce rate (GA4 API)

### Monthly Performance Review Prompt

```
## Monthly Content Performance Review

Here are this month's content performance metrics:

[paste metrics from Google Sheet]

Analyze:
1. Which content pillars drove the most engagement?
2. Which platforms are over/underperforming?
3. What topics resonated most?
4. What should we do more of next month?
5. What should we stop doing?
6. Suggest 5 seed topics for next month based on what's working.
```

### Quarterly Strategy Adjustment

Feed the monthly reviews into a quarterly prompt:

```
## Quarterly Content Strategy Review

Monthly reviews:
[Month 1 analysis]
[Month 2 analysis]
[Month 3 analysis]

Recommend:
1. Content pillar adjustments (add/remove/reweight)
2. Platform strategy changes
3. Tone/voice evolution
4. New content formats to test
5. Updated keyword targets
```

## Seed Input Sources (Automated)

### Source 1: Portfolio Company RSS
Monitor blogs of all 7 companies for new posts:
- reservio.com/blog/feed
- smartsupp.com/blog/feed
- survio.com/blog/feed
- shopsys.com/blog/feed

**Auto-create seed:** When new blog post detected, create seed with:
- topic: blog post title
- source: Product update
- pillar: Auto-assign based on keyword matching
- portfolio_company: Detected from RSS source

### Source 2: LinkedIn Activity Monitor
Track LinkedIn pages of portfolio companies for announcements:
- Company page new posts
- Employee milestone posts (tagged with company)

### Source 3: Industry Trend Alerts
Google Alerts for:
- "commerce SaaS" + "Europe"
- "e-commerce automation"
- "AI chatbot e-commerce"
- "headless commerce"
- Competitor names (Tidio, Calendly, Typeform, etc.)

### Source 4: Team Submission Form
Simple Typeform/Google Form for team members:
- "What's happening this week worth sharing?"
- Auto-routes to Content Seeds database

## Tool Stack

| Function | Tool | Cost |
|----------|------|------|
| Seed database | Airtable Free / Notion | Free |
| Content generation | Claude API | ~$8/month |
| Workflow automation | n8n (self-hosted) or Make | Free - $29/month |
| Content calendar | Google Sheets | Free |
| Review queue | Slack | Existing |
| Social scheduling | Buffer | $6/month |
| Newsletter | Substack | Free |
| Blog | WordPress / Ghost | Existing |
| Analytics | GA4 + platform native | Free |

**Total monthly cost: ~$15-45/month** (mostly automation platform)
