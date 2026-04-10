# Review Collector

## Purpose
Aggregate and analyze customer reviews from G2, Capterra, and Trustpilot to understand sentiment, strengths, and weaknesses of both products.

## Sources

| Platform | Smartsupp | Tidio |
|----------|----------|-------|
| G2 | g2.com/products/Smartsupp | g2.com/products/Tidio |
| Capterra | capterra.com/p/Smartsupp | capterra.com/p/Tidio |
| Trustpilot | trustpilot.com/review/smartsupp.com | trustpilot.com/review/tidio.com |
| WordPress | wordpress.org/plugins/smartsupp | wordpress.org/plugins/tidio |
| Shopify App Store | apps.shopify.com/smartsupp | apps.shopify.com/tidio |

## Collection Method

### Monthly Deep Review
1. Capture overall rating (out of 5)
2. Capture total review count
3. Read last 20 reviews for each platform
4. Extract recurring themes (positive & negative)

### AI Analysis Prompt

```
You are a customer insight analyst. Analyze these customer reviews:

SMARTSUPP REVIEWS (last 30 days):
{{smartsupp_reviews}}

TIDIO REVIEWS (last 30 days):
{{tidio_reviews}}

For each product, identify:

1. PRAISE THEMES (what customers love)
   - List top 5 positive themes with frequency
   - Quote 2-3 representative reviews

2. COMPLAINT THEMES (what frustrates customers)
   - List top 5 negative themes with frequency
   - Quote 2-3 representative reviews

3. SWITCHING SIGNALS
   - Reviews mentioning switching FROM the competitor
   - Reasons cited for switching
   - What they expected vs. what they got

4. FEATURE REQUESTS
   - Most requested features/improvements
   - Features customers compare against competitor

5. COMPETITIVE INSIGHTS
   - Direct competitor mentions
   - Comparative statements ("better than X", "unlike Y")

6. SENTIMENT TREND
   - Is sentiment improving or declining vs. previous period?
   - Any sudden shifts? (post-price-change, post-feature-launch)

7. RECOMMENDATIONS FOR SMARTSUPP
   - What competitive vulnerabilities does Tidio's review data reveal?
   - What strengths should Smartsupp amplify based on its own reviews?
   - What should Smartsupp fix to prevent churn to Tidio?
```

## Review Sentiment Tracking Template

```
| Metric              | Smartsupp | Tidio | Delta | Trend |
|---------------------|----------|-------|-------|-------|
| G2 Rating           |          |       |       |       |
| G2 Review Count     |          |       |       |       |
| Capterra Rating     |          |       |       |       |
| Capterra Count      |          |       |       |       |
| WordPress Rating    |          |       |       |       |
| Shopify Rating      |          |       |       |       |
| Top Praise Theme    |          |       |       |       |
| Top Complaint Theme |          |       |       |       |
```
