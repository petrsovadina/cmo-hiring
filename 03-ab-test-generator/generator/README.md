# A/B Test Variant Generator

Prompt-based generator for structured A/B test variant matrices targeting Smartsupp remarketing segments.

## How It Works

```
config.yaml          → Segment data, platform specs, test variables
system-prompt.md     → AI behavior rules and output structure
generation-prompt.md → Specific generation task with segment brief
testing-strategy.md  → Methodology and evaluation framework
generate.sh          → Assembler script (optional — pipes to LLM)
```

The generator is a **prompt pipeline**: config data + system prompt + task prompt → LLM → structured variant matrix.

## Quick Start

### Option A: Run the script (requires `claude` CLI)
```bash
cd generator/
./generate.sh pricing_page_abandoners ../output
```

### Option B: Manual (any LLM)
1. Open `system-prompt.md` — paste as system message
2. Open `generation-prompt.md` — paste as user message
3. The LLM outputs a structured variant matrix
4. Save to `../output/variant-matrix.md`

## Adapting to Other Segments

1. Edit `generation-prompt.md` — change the segment section to one of:
   - `inactive_trials`
   - `active_trials_no_conversion`
2. Reference the segment data in `config.yaml` for objections and behavior patterns
3. Re-run the generator

## Files

| File | Purpose |
|------|---------|
| `config.yaml` | All structured data: segments, platforms, variables, Smartsupp research |
| `system-prompt.md` | AI behavior rules, output format specification |
| `generation-prompt.md` | The actual generation task with segment brief and variant structure |
| `testing-strategy.md` | Testing methodology, sample sizes, evaluation criteria |
| `generate.sh` | Shell script to assemble prompts and pipe to LLM |

## Design Decisions

- **Prompt-based, not code-heavy** — the intelligence is in the prompts and structure, not in code. This makes it easy to iterate and adapt.
- **Config-driven** — changing segments or platform specs means editing YAML, not rewriting prompts.
- **One variable per variant** — proper A/B testing methodology, not "throw everything at the wall."
- **Sequential testing** — each phase builds on the previous winner, maximizing learning velocity with limited traffic.
