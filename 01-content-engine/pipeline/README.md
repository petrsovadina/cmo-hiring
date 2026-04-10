# Abugo Content Engine Pipeline

## Architecture

```
SEED INPUT (topic, milestone, insight)
    |
    v
[1. Content Pillars Filter] -- Is this on-brand?
    |
    v
[2. Research & Context Enrichment] -- Company data, market context
    |
    v
[3. Master Content Generator] -- Core narrative + key messages
    |
    v
[4. Platform Adapters] -- LinkedIn / Twitter/X / Newsletter / Blog
    |
    v
[5. Quality Gate] -- Brand voice check, CTA alignment
    |
    v
READY-TO-PUBLISH CONTENT (4 platforms)
```

## Files

| File | Purpose |
|------|---------|
| `content-pillars.md` | 5 strategic content pillars with topics and angles |
| `tone-guide.md` | Abugo brand voice, tone rules, do/don't |
| `seed-to-content-prompt.md` | Master prompt: seed input -> multi-platform content |
| `platform-templates.md` | Platform-specific formats, lengths, best practices |
| `workflow-automation.md` | n8n/Make automation workflow for weekly execution |

## How to Use

1. Pick a seed input (company news, industry trend, team insight)
2. Run the master prompt with the seed + pillar context
3. The prompt outputs content for all 4 platforms
4. Review, adjust, schedule

## Platforms Covered

- **LinkedIn** -- Long-form thought leadership (150-300 words)
- **Twitter/X** -- Threads (5-8 tweets) and standalone posts
- **Newsletter** -- Weekly digest sections (200-400 words)
- **Blog** -- SEO-optimized articles (800-1500 words)
