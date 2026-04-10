# CMO Hiring Challenge — Petr Sovadina × Abugo

## 🎬 Prezentace

**[→ Otevři presentation.html](./presentation.html)** — interaktivní slide deck s mluveným audio komentářem v češtině (10 slidů, ~8 minut)

> Stáhni repo, otevři `presentation.html` v prohlížeči. Navigace šipkami. Každý slide automaticky spustí naraci.

---

## Přístup

Místo tradičního "vyber si 2 challenges a zpracuj ručně" jsem spustil **5 autonomních AI agentů paralelně** přes [Gas Town](https://github.com/steveyegge/gastown) — open-source multi-agentní orchestrátor.

Důvod je jednoduchý: moderní CMO nepíše obsah. Staví systémy, které obsah produkují.

```
Gas Town Workspace — 10 aktivních tmux sessions
├── Mayor      → globální koordinátor
├── Deacon     → watchdog daemon  
├── Witness    → monitoring agentů
├── Refinery   → merge queue (výsledky → main branch)
└── 5 Polecatů (AI workeři — Claude Code):
    ├── rust   → Challenge 01: Content Engine
    ├── chrome → Challenge 02: Landing Page Pipeline
    ├── nitro  → Challenge 03: A/B Test Generator
    ├── guzzle → Challenge 04: Blog → Multiplatform
    └── shiny  → Challenge 05: Competitive Intelligence
```

---

## Výsledky

| Challenge | Agent | Soubory | Řádky |
|-----------|-------|---------|-------|
| 01 Content Engine | rust | 7 | 1 915 |
| 02 Landing Page Pipeline | chrome | 11 | 1 766 |
| 03 A/B Test Generator | nitro | 7 | 741 |
| 04 Blog → Multiplatform | guzzle | 7 | 1 095 |
| 05 Competitive Intel | shiny | 15 | 1 358 |
| **Celkem** | 5 agentů | **47 souborů** | **6 875+** |

---

## Co je v každém challenge

### 01 — Content Engine (Abugo Group)
Opakovatelný systém pro multiplatformní obsah napříč 7 produktovými firmami.
- `pipeline/content-pillars.md` — 5 strategických pilířů
- `pipeline/tone-guide.md` — brand voice Abugo
- `pipeline/seed-to-content-prompt.md` — master prompt (seed → 4 platformy)
- `pipeline/platform-templates.md` — LinkedIn, X, Newsletter, Blog
- `pipeline/workflow-automation.md` — n8n/Make workflow
- `output/30-day-calendar.md` — **30denní content kalendář (1 069 řádků)**

### 02 — Landing Page Pipeline (Reservio)
4-fázový pipeline: název vertikály → kompletní landing page content package.
- `pipeline/00-orchestrator.md` — řetězí všechny 4 fáze
- `pipeline/01-research-prompt.md` — research trhu a pain pointů
- `pipeline/02-messaging-prompt.md` — positioning a value propositions
- `pipeline/03-content-prompt.md` — hero, features, FAQ, CTA
- `pipeline/04-seo-prompt.md` — meta tags, schema markup
- `output/fitness-studios-landing-page.md` — **demo: kompletní LP (418 řádků)**

### 03 — A/B Test Generator (Smartsupp)
Generátor strukturovaných testovacích variant pro remarketing. Jedna proměnná = jedna varianta.
- `generator/config.yaml` — segmenty, platformy, Smartsupp data
- `generator/system-prompt.md` + `generation-prompt.md` — AI instrukce
- `generator/testing-strategy.md` — metodologie a sample sizes
- `generator/generate.sh` — automatizační skript
- `output/variant-matrix.md` — **A/B matice pro Pricing Page Abandoners**

### 04 — Blog → Multiplatform (Abugo Portfolio)
Dvoustupňový pipeline: 1 blog post → obsah pro 6 platforem.
- `pipeline/01-extract.md` — extrakce content atomů
- `pipeline/02-adapt.md` — adaptace na platformy
- `pipeline/config.yaml` + `run-pipeline.sh` — konfigurace a automatizace
- `output/atoms.md` — extrahované atomy z Reservio blogu
- `output/multiplatform-content.md` — **LinkedIn × 2, X thread, Newsletter, Instagram, Video script**

### 05 — Competitive Intelligence (Smartsupp vs Tidio)
Opakovatelný CI systém s týdenním cyklem. 6 kolektorů, automatická klasifikace signálů.
- `system/collectors/` — website, pricing, reviews, content, social, jobs
- `system/analysis/` — master AI prompt + signal classification framework
- `system/reports/` — šablony (weekly report, alert, battle card)
- `system/distribution/stakeholder-map.md` — kdo dostane co a kdy
- `system/automation/weekly-workflow.md` — n8n/Make automatizace
- `output/competitive-intelligence-report.md` — **plný CI report (386 řádků)**

  Klíčová zjištění: Smartsupp má 33% cenovou výhodu (€19.50 vs €29 Tidio), video recordings = unikátní differenciátor, content gap 2-4 vs 8-12 postů/měsíc.

---

## Jak použít

Každý pipeline funguje samostatně s jakýmkoli LLM:

```bash
# Příklad: landing page pro novou vertikálu
cat 02-landing-page-pipeline/pipeline/01-research-prompt.md
# Nahraď "fitness studios" za "dental clinics" a pošli do Claude / GPT-4
```

Pro škálování s Gas Town:
```bash
brew install gastown
gt install ~/gt --git
gt rig add cmo https://github.com/petrsovadina/cmo-hiring.git
gt daemon start
```

---

## Autor

Petr Sovadina — [petr.sovadina9@gmail.com](mailto:petr.sovadina9@gmail.com) · [github.com/petrsovadina](https://github.com/petrsovadina)
