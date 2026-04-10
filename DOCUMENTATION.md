# CMO Hiring Challenge — Kompletní dokumentace

## Tento dokument slouží jako předávací dokumentace celého projektu.

---

## 1. Co je tento projekt

Řešení všech 5 challenges z CMO hiring challenge od Abugo (commerce-focused SaaS holding, Brno, 150 lidí, 7 produktových firem: Reservio, Smartsupp, Survio, Shopsys, Convertim, Tanganica, Sounds Good Agency).

Namísto tradičního přístupu "vyber si 2, zpracuj ručně" byl zvolen radikálně odlišný přístup: 5 autonomních AI agentů pracujících paralelně, orchestrovaných přes Gas Town — multi-agentní systém.

## 2. Proč právě takhle

Abugo v zadání explicitně říká:
- "We want to see how you think and build, not polished final deliverables."
- "Focus on process and automation breadth."
- "We're especially interested in seeing you use AI-native development workflows."

Cíl byl ukázat, že moderní CMO je architekt automatizovaných pipeline, ne autor jednotlivých postů. Orchestrace 5 AI agentů souběžně demonstruje škálovatelný přístup k marketing operations.

## 3. Technická infrastruktura

### Gas Town (github.com/steveyegge/gastown)

Open-source multi-agent orchestrátor od Stevea Yeggeho. Napsaný v Go. Klíčové komponenty:

| Role | Funkce | Lifecycle |
|------|--------|-----------|
| Mayor | Globální koordinátor | Singleton, persistent |
| Deacon | Daemon/watchdog | Singleton, persistent |
| Witness | Per-rig monitor polecatů | Per-rig, persistent |
| Refinery | Merge queue | Per-rig, persistent |
| Polecats | Efemérní AI workeři | Transient, Witness-managed |
| Overseer | Lidský operátor | - |

### Instalace a setup (pro reprodukci)

```bash
# Prerekvizity
brew install gastown    # nebo: go install github.com/steveyegge/gastown/cmd/gt@latest
go install github.com/steveyegge/beads/cmd/bd@latest
# Potřeba: Go 1.24+, Git 2.20+, tmux 3.0+, Claude Code

# Workspace
gt install ~/gt --git
cd ~/gt
gt rig add cmo https://github.com/petrsovadina/cmo-hiring.git
gt crew add petr --rig cmo
gt daemon start

# Beady (úkoly) — vytvářet v ~/gt/cmo
cd ~/gt/cmo
bd create "Challenge 01 - Content Engine: ..."
bd create "Challenge 02 - Landing Page Pipeline: ..."
bd create "Challenge 03 - A/B Test Generator: ..."
bd create "Challenge 04 - Blog to Multiplatform: ..."
bd create "Challenge 05 - Competitive Intelligence: ..."

# Convoy + sling — zpět v ~/gt
cd ~/gt
gt convoy create "CMO Hiring" <id1> <id2> <id3> <id4> <id5>
gt sling <id1> cmo    # spawnuje polecat "rust"
gt sling <id2> cmo    # spawnuje polecat "chrome"
gt sling <id3> cmo    # spawnuje polecat "nitro"
gt sling <id4> cmo    # spawnuje polecat "guzzle"
gt sling <id5> cmo    # spawnuje polecat "shiny"

# Monitoring
gt status              # 10 aktivních sessions
gt convoy list         # stav konvojů
gt attach cmo/rust     # připojit se k agentovi (Ctrl+B, D = odpojit)
```

### Důležité poznámky pro reprodukci

1. Beady MUSÍ být vytvořeny z adresáře rigu (~/gt/cmo), ne z town root (~/gt) — jinak dostanou prefix "hq-" místo "cmo-" a sling selže
2. Všechny gt příkazy se pouští z ~/gt (town root)
3. gt doctor --fix opraví většinu problémů
4. Daemon vyžaduje tmux 3.0+

## 4. Co bylo vytvořeno — inventář

### Challenge 01: Content Engine (polecat: rust)

Opakovatelný systém pro multiplatformní obsah Abugo group.

| Soubor | Účel | Řádky |
|--------|------|-------|
| pipeline/content-pillars.md | 5 strategických pilířů | 113 |
| pipeline/tone-guide.md | Brand voice Abugo | 95 |
| pipeline/seed-to-content-prompt.md | Master prompt seed→obsah | 189 |
| pipeline/platform-templates.md | Formáty pro 4 platformy | 200 |
| pipeline/workflow-automation.md | n8n/Make workflow | 199 |
| pipeline/README.md | Dokumentace pipeline | 49 |
| output/30-day-calendar.md | 30denní kalendář | 1069 |

### Challenge 02: Landing Page Pipeline (polecat: chrome)

4-fázový pipeline pro landing pages Reservia.

| Soubor | Účel | Řádky |
|--------|------|-------|
| pipeline/00-orchestrator.md | Chain všech 4 fází | 145 |
| pipeline/01-research-prompt.md | Vertikální research | 54 |
| pipeline/02-messaging-prompt.md | Positioning | 67 |
| pipeline/03-content-prompt.md | Content generace | 76 |
| pipeline/04-seo-prompt.md | SEO metadata | 66 |
| output/01-research-brief.md | Research output | 194 |
| output/02-messaging-strategy.md | Messaging output | 154 |
| output/03-landing-page-content.md | Content output | 191 |
| output/04-seo-metadata.md | SEO output | 325 |
| output/fitness-studios-landing-page.md | Kompletní LP | 418 |

### Challenge 03: A/B Test Generator (polecat: nitro)

Generátor A/B variant pro Smartsupp remarketing.

| Soubor | Účel | Řádky |
|--------|------|-------|
| generator/config.yaml | Segmenty, platformy, data | 152 |
| generator/system-prompt.md | AI rules & format | 54 |
| generator/generation-prompt.md | Generační task | 72 |
| generator/testing-strategy.md | Metodologie | 89 |
| generator/generate.sh | Automatizace | 90 |
| generator/README.md | Dokumentace | 54 |
| output/variant-matrix.md | A/B varianty | 230 |

### Challenge 04: Blog → Multiplatform (polecat: guzzle)

Pipeline pro repurposing blogu na 6 platforem.

| Soubor | Účel | Řádky |
|--------|------|-------|
| pipeline/01-extract.md | Extrakce atomů | 96 |
| pipeline/02-adapt.md | Adaptace na platformy | 292 |
| pipeline/config.yaml | Platform specs | 112 |
| pipeline/run-pipeline.sh | Automatizace | 92 |
| pipeline/README.md | Dokumentace | 85 |
| output/atoms.md | Extrahované atomy | 104 |
| output/multiplatform-content.md | 6 platforem | 314 |

### Challenge 05: Competitive Intelligence (polecat: shiny)

CI systém Smartsupp vs Tidio.

| Soubor | Účel | Řádky |
|--------|------|-------|
| system/collectors/website-monitor.md | Web monitoring | 62 |
| system/collectors/pricing-monitor.md | Pricing tracking | 72 |
| system/collectors/review-collector.md | G2/Capterra reviews | 81 |
| system/collectors/content-tracker.md | Blog/SEO monitoring | 97 |
| system/collectors/social-monitor.md | Social media | 55 |
| system/collectors/jobs-monitor.md | Job postings | 58 |
| system/analysis/competitive-analysis-prompt.md | Master analýza | 133 |
| system/analysis/signal-classification.md | Urgence signálů | 77 |
| system/reports/weekly-report-template.md | Týdenní šablona | 88 |
| system/reports/alert-template.md | Urgentní alert | 40 |
| system/reports/battle-card-template.md | Battle card | 78 |
| system/distribution/stakeholder-map.md | Distribuce | 66 |
| system/automation/weekly-workflow.md | n8n/Make workflow | 118 |
| system/README.md | Dokumentace | 62 |
| output/competitive-intelligence-report.md | Plný report | 386 |

## 5. Jak pipeline fungují — pro předání

### Obecný princip

Všechny pipeline jsou "prompt-first" — strukturované prompty, které fungují s jakýmkoli LLM. Žádný vendor lock-in, žádný custom kód nutný k provozu.

### Spuštění bez Gas Town

```bash
# Challenge 01: Content Engine
# 1. Zadej seed input (téma, milník, insight)
# 2. Spusť master prompt s kontextem pilířů
cat 01-content-engine/pipeline/seed-to-content-prompt.md | claude --print

# Challenge 02: Landing Page
# Změň "fitness studios" na jinou vertikálu v orchestrátoru
cat 02-landing-page-pipeline/pipeline/00-orchestrator.md | claude --print

# Challenge 03: A/B Generator
cd 03-ab-test-generator/generator && ./generate.sh pricing_page_abandoners ../output

# Challenge 04: Blog Repurposing
cd 04-blog-to-multiplatform/pipeline && ./run-pipeline.sh <blog-url>

# Challenge 05: Competitive Intel
# Spusť master analysis prompt s daty od kolektorů
cat 05-competitive-intel/system/analysis/competitive-analysis-prompt.md | claude --print
```

### Spuštění s Gas Town (plná automatizace)

Viz sekce 3 výše. Výhoda: paralelizace, monitoring, merge queue, atribuce.

## 6. Co vylepšit

1. Quality gate — přidat review stage s scoring proti brand guidelines
2. Feedback loop — napojit výkonnostní data zpět do pipeline
3. Více vertikálů — batch spuštění LP pipeline pro 20+ vertikálů
4. Real-time CI — webhooky pro okamžité competitive alerts
5. API integrace — napojit A/B generator na Google Ads / Meta Ads API
6. Metrics dashboard — vizualizace výkonu generovaného obsahu

## 7. Kontakt

Petr Sovadina
📧 petr.sovadina9@gmail.com
🔗 github.com/petrsovadina
