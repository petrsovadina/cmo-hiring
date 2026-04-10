# Blog-to-Multiplatform Repurposing Pipeline

## Overview

This pipeline takes a single blog post and produces platform-native content across
6 target channels. It's built as a prompt-driven workflow designed to run with
Claude or any capable LLM.

## Architecture

```
Blog Post URL
     │
     ▼
┌─────────────────┐
│  01-extract.md  │  Extract content atoms (stats, quotes, insights, stories)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    config.yaml  │  Platform specs, brand voice, audience context
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  02-adapt.md    │  Adapt atoms → platform-native content per channel
└────────┬────────┘
         │
         ▼
   output/*.md       Ready-to-publish content per platform
```

## Pipeline Steps

### Step 1: Extract Content Atoms (`01-extract.md`)

Feed the blog post content + this prompt to your LLM. It produces a structured
inventory of reusable "content atoms":

- **Statistics & data points** — numbers that grab attention
- **Key insights** — non-obvious takeaways
- **Actionable tips** — things the reader can do immediately
- **Stories & examples** — relatable scenarios
- **Quotable lines** — short, punchy, shareable phrases
- **Pain points addressed** — problems the article solves

### Step 2: Adapt to Platforms (`02-adapt.md`)

Feed the extracted atoms + platform config + this prompt to your LLM.
It produces native content for each target platform, respecting each
channel's format, tone, and audience expectations.

## Target Platforms

1. **LinkedIn** — 2 posts (insight angle + contrarian take)
2. **Twitter/X** — 1 thread (7-10 tweets)
3. **Newsletter** — 1 digest section (~200 words)
4. **Instagram Carousel** — 5-7 slides with hook/value/CTA structure
5. **Short-form Video Script** — 60s script for Reels/TikTok/Shorts
6. **Dev Community** (Dev.to/Hashnode) — 1 adapted article

## Usage

```bash
# Manual (copy-paste prompts into Claude/ChatGPT):
# 1. Paste blog content + 01-extract.md → get atoms
# 2. Paste atoms + config.yaml + 02-adapt.md → get platform content

# Automated (requires Claude CLI):
./run-pipeline.sh <blog-post-url>
```

## Source Blog Post

**Reservio Blog**: "8-Step Service Menu Audit to Improve Booking Conversion"
https://www.reservio.com/blog/tips/service-menu-audit

## Design Decisions

- **Prompt-first approach**: The pipeline is a set of structured prompts, not code.
  This makes it portable across any LLM tool (Claude, ChatGPT, Cursor, etc.)
- **Two-stage extraction**: Separating atom extraction from platform adaptation
  produces higher quality output — the LLM focuses on one task at a time
- **Config-driven**: Platform specs and brand voice live in config.yaml,
  making it easy to swap source brands or add new platforms
