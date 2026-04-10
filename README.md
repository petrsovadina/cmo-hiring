# CMO Hiring Challenge — Petr Sovadina

## Přístup: 5 autonomních AI agentů, 5 challenges, paralelně

Namísto tradičního přístupu „vyber si 2, zpracuj ručně" jsem zvolil radikálně odlišnou cestu: **5 autonomních AI agentů pracujících paralelně**, orchestrovaných přes [Gas Town](https://github.com/steveyegge/gastown) — open-source multi-agentní systém.

**Proč?** Protože moderní CMO nepíše obsah ručně — staví systémy, které obsah produkují. A pokud může orchestrovat 5 AI agentů souběžně, může škálovat marketing operace způsobem, který je manuálně nemožný.

> 🎬 **[Loom Video: TODO — doplnit link]** — walkthrough celého přístupu, pipeline a live demo

---

## Architektura

```
Gas Town Workspace — 10 aktivních sessions
├── Mayor (globální koordinátor)
├── Deacon (watchdog daemon)
├── Witness (monitoring workerů)
├── Refinery (merge queue → GitHub)
└── 5 Polecatů (Claude Code agentů):
    ├── rust    → Challenge 01: Content Engine
    ├── chrome  → Challenge 02: Landing Page Pipeline  
    ├── nitro   → Challenge 03: A/B Test Generator
    ├── guzzle  → Challenge 04: Blog → Multiplatform
    └── shiny   → Challenge 05: Competitive Intelligence
```

Každý polecat pracoval ve **svém izolovaném Git worktree**. Refinery automaticky mergovala hotovou práci na main. Celkem **47 deliverable souborů**.

---

## Challenges — přehled

| # | Challenge | Agent | Typ | Klíčové výstupy |
|---|-----------|-------|-----|-----------------|
| 01 | [Content Engine](01-content-engine/) | rust | Kreativní | 5 content pillars, master prompt, 30denní kalendář |
| 02 | [Landing Page Pipeline](02-landing-page-pipeline/) | chrome | Kreativní | 4-fázový pipeline, kompletní LP pro fitness vertikál |
| 03 | [A/B Test Generator](03-ab-test-generator/) | nitro | Analytický | Config-driven generátor, variant matice, testing strategy |
| 04 | [Blog → Multiplatform](04-blog-to-multiplatform/) | guzzle | Kreativní | Extract→Adapt pipeline, 6 platforem obsahu |
| 05 | [Competitive Intel](05-competitive-intel/) | shiny | Analytický | 6 kolektorů, CI report Smartsupp vs Tidio, battle cards |

---

## 01 — Content Engine (Abugo Group)

**Pipeline:** seed input → content pillars filter → research enrichment → multi-platform content → quality gate

Systém vezme jeden „seed" (milník, trend, insight) a vygeneruje native obsah pro LinkedIn, X, Newsletter a Blog. Včetně 30denního content kalendáře a n8n/Make workflow pro automatizaci.

**Klíčové soubory:** `pipeline/seed-to-content-prompt.md` (master prompt), `output/30-day-calendar.md` (1069 řádků hotového obsahu)

## 02 — Landing Page Pipeline (Reservio)

**Pipeline:** vertical name → research → messaging → content → SEO

4-fázový pipeline parametrizovaný názvem vertikály. Demo output pro „fitness studios" — kompletní landing page s research briefem, messaging strategií, hero sekcí, features, FAQ, CTAs a SEO metadaty.

**Škálování:** Stačí změnit vstupní parametr a spustit pro dalších 20+ vertikálů Reservia.

## 03 — A/B Test Generator (Smartsupp)

**Generator:** config.yaml (segment data) + system prompt + generation prompt → LLM → variant matice

Strukturovaný generátor pro remarketing varianty. Každá varianta testuje **jednu proměnnou** — proper A/B metodologie. Výstup respektuje character limity Google Display a Meta Ads. Včetně shell skriptu pro automatizaci.

## 04 — Blog → Multiplatform (Abugo Portfolio)

**Pipeline:** blog URL → extract atoms → adapt per platform → 6 channels

Dvoustupňový přístup: nejdřív extrakce „content atomů" (statistiky, insights, quotes), pak adaptace do platform-native formátů (LinkedIn, X thread, newsletter, Instagram carousel, video script, Dev.to). Demo na Reservio blog postu.

## 05 — Competitive Intelligence (Smartsupp vs Tidio)

**Systém:** 6 kolektorů → AI analýza → reporting → distribuce

Opakovatelný CI systém s weekly cadence. Klíčové findings: Smartsupp má 33% cenovou výhodu na entry tieru, Tidio dominuje v content marketingu (8-12 vs 2-4 postů/měsíc), Smartsupp video recordings = unikátní moat.

---

## Nástroje a přístup

- **Gas Town** — multi-agent orchestrátor (koordinace 5 Claude Code instancí)
- **Claude Code** — AI coding agent (runtime pro všech 5 polecatů)
- **Beads** — Git-native issue tracker (task management)
- **tmux** — terminal multiplexer (sessions management)

Všechny pipeline jsou **prompt-first** — fungují s jakýmkoli LLM (Claude, GPT, Gemini). Žádný vendor lock-in.

---

## Jak spustit pipeline lokálně

```bash
# Content Engine — vygeneruj obsah ze seedu
cat 01-content-engine/pipeline/seed-to-content-prompt.md | claude --print

# Landing Page — změň vertikálu a spusť
cat 02-landing-page-pipeline/pipeline/00-orchestrator.md | claude --print

# A/B Generator
cd 03-ab-test-generator/generator && ./generate.sh pricing_page_abandoners ../output

# Blog Repurposing
cd 04-blog-to-multiplatform/pipeline && ./run-pipeline.sh <blog-url>
```

---

*Vytvořil Petr Sovadina — AI-first přístup k marketingu. 📧 petr.sovadina9@gmail.com*
