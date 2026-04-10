# Job Postings Monitor

## Purpose
Job postings reveal strategic direction. Hiring signals investment priorities, market expansion, and upcoming product bets.

## Sources

| Source | Smartsupp | Tidio |
|--------|----------|-------|
| Careers page | smartsupp.com/careers | tidio.com/careers |
| LinkedIn Jobs | linkedin.com/company/smartsupp/jobs | linkedin.com/company/tidio/jobs |
| Glassdoor | glassdoor.com/smartsupp | glassdoor.com/tidio |

## What to Track

### Per Job Posting
- Role title
- Department (Engineering, Marketing, Sales, Product, AI/ML)
- Location / Remote status
- Seniority level
- Key skills/technologies mentioned

### Strategic Signals

| Signal | What It Means |
|--------|--------------|
| AI/ML engineers | Investing in AI capabilities |
| Enterprise sales reps | Moving upmarket |
| Localization / i18n roles | Geographic expansion |
| Platform engineers | Building API/marketplace |
| Content marketers | SEO/content play |
| Partnership managers | Channel strategy |
| New market sales (e.g., DACH, LATAM) | Geographic expansion target |

## Collection Frequency
- **Bi-weekly**: Scan career pages
- **Monthly**: Full analysis with trend comparison

## AI Analysis Prompt

```
You are a competitive strategy analyst specializing in talent signals.
Analyze these job postings:

SMARTSUPP OPEN ROLES:
{{smartsupp_jobs}}

TIDIO OPEN ROLES:
{{tidio_jobs}}

Determine:
1. HEADCOUNT DIRECTION — is each company growing, stable, or contracting?
2. INVESTMENT AREAS — where are they hiring most? (engineering, sales, marketing, AI)
3. STRATEGIC BETS — what do the roles suggest about future product direction?
4. MARKET EXPANSION — any geographic expansion signals?
5. TECHNOLOGY STACK — what technologies are they using/adopting?
6. COMPETITIVE IMPLICATIONS — what should Smartsupp anticipate based on Tidio's hiring?
```
