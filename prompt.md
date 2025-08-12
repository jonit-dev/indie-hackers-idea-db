Got it — here’s your updated **v8 prompt** with `score` and `rationale` removed from the schema and from the extraction/scoring section.

---

## Unified Prompt – “Micro-SaaS Idea-Mining on X (Twitter)” (v9)

---

🎯 **Objective**
Unearth _clone-worthy_ micro-SaaS ideas tweeted by bootstrapped founders in the **last 12 months**.
• Normalize revenue numbers to **MRR (USD)**.
• Collect full structured details, including early-validation criteria.
• Return the **TOP 10 ideas** as **one JSON array** that follows the schema in §4.

---

### 0 Eligibility Filters — ONLY consider tweets that…

1. Explicitly **name** the product **or clearly describe what it does**.
2. Provide a plain-language **problem + solution** summary.
3. Show at least one of: product name, demo link, screenshot, feature list.
4. Contain enough detail to fill both `description` and `productName` without guessing.

If **any** of the above is missing → **discard the tweet**.

---

### 1 Search Strategy

Use **Twitter Advanced Search** (or the v2 API) with queries combining revenue milestones, indie-hacker keywords, and time filters, e.g.:

```
"reached $k MRR" OR "hit $k MRR" ("#buildinpublic" OR indie OR SaaS)
     min_faves:10 since:YYYY-MM-DD until:YYYY-MM-DD
```

– Replace `$k` with numbers like 1k, 5k, 10k, 30k, 50k, 100k.
– Set _since_ = _today − 12 months_ and _until_ = _today_.
– Vary keywords (`bootstrapped`, `launched`, `ARR`, `side-project`, `solo-founder`, etc.).
– De-dup retweets & quote-tweets; keep the original author’s post.
– Ignore giveaway threads, vague teasers, funding announcements, or anything failing eligibility.

---

### 2 Data to Extract for Each Candidate

| JSON field              | How to determine / notes                                                                           |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| **id**                  | Tweet’s numeric ID or a unique hash.                                                               |
| source                  | Always `"X (Twitter)"`.                                                                            |
| url                     | Full tweet link.                                                                                   |
| niche                   | Concise domain label (e.g. “Content Generation”, “SEO Tools”, “DevTools – CI metrics”).            |
| mrr                     | MRR in USD. Convert ARR → ARR / 12.                                                                |
| pricing                 | Short format: `"$29/mo"`, `"Freemium"`, `"Usage-based"`, `"?"` if unknown.                         |
| user                    | Main persona (e.g. “Founders”, “LinkedIn creators”, “Marketers”).                                  |
| channel                 | Primary acquisition channel mentioned or obvious (X, SEO, etc.).                                   |
| comp                    | Competitive intensity: **Very Low → Very High**.                                                   |
| platDep                 | Platform-dependence risk: **Very Low → Very High** (use “None” only if literally zero dependence). |
| complexity              | Build difficulty: **Very Low → Very High**.                                                        |
| mvpWk                   | Days to build a scrappy MVP.                                                                       |
| oneKMrrChance           | Likelihood to hit ≥ \$1k MRR in 6–12 mo: **Very Low → Very High**.                                 |
| maintHours              | Estimated monthly maintenance hours.                                                               |
| marketProof             | **Yes** if ≥ 1 indie outside tweet is at ≥ \$30k MRR in same niche/model; else **No**.             |
| distFit                 | Channel alignment: **Very Low → Very High**.                                                       |
| churn                   | Value if disclosed, else `"?"`.                                                                    |
| passiveness             | Passive-income grade: **Very Low → Very High**.                                                    |
| revenuePotential        | Upside potential: **Very Low → Very High**.                                                        |
| legalRisk               | **Very Low → Very High**.                                                                          |
| dateAdded               | Tweet date in YYYY-MM-DD.                                                                          |
| description             | One-line summary of what it does.                                                                  |
| productName             | Actual name, or `"Unnamed <niche>"` if none.                                                       |
| founder                 | Twitter/X handle of founder.                                                                       |
| canSupabaseOnly         | Boolean — true if can be built entirely on Supabase.                                               |
| canSupaEdgeStack        | Boolean — true if can run on Supabase Edge Functions + DB.                                         |
| infraExplanation        | Plain-language infra reasoning.                                                                    |
| technicalImplementation | Stack & tech details (frontend, backend, DB, APIs, hosting, etc.).                                 |
| seoDep                  | SEO dependency: **Very Low → Very High**.                                                          |
| firstDollarDays         | Days until first dollar earned.                                                                    |
| marketingEase           | Marketing difficulty: **Very Low → Very High**.                                                    |
| networkEffects          | Network effect strength: **Very Low → Very High**.                                                 |

---

### 3 Output Schema & Example

• Return only a JSON array of exactly 10 objects.
• Include every field above.
• Sort by `mrr` descending (highest first).
• No Markdown fences, no commentary.

```json
[
  {
    "id": "1",
    "source": "X (Twitter)",
    "url": "https://x.com/RubenHssd/status/1857447480478101589",
    "niche": "Content Generation",
    "mrr": 42110,
    "pricing": "$60/mo",
    "user": "LinkedIn creators",
    "channel": "Community",
    "comp": "High",
    "platDep": "Low",
    "complexity": "Very Low",
    "mvpWk": 3,
    "oneKMrrChance": "High",
    "maintHours": 5,
    "marketProof": "Yes",
    "distFit": "Good",
    "churn": "?",
    "passiveness": "Very High",
    "revenuePotential": "High",
    "legalRisk": "Low",
    "dateAdded": "2024-01-15",
    "description": "AI-powered LinkedIn post generator bootstrapped to $42,110 MRR in 182 days.",
    "productName": "EasyGen",
    "founder": "@RubenHssd",
    "canSupabaseOnly": true,
    "canSupaEdgeStack": true,
    "infraExplanation": "Simple AI content tools can run entirely on Supabase with edge functions calling AI APIs.",
    "technicalImplementation": "Next.js/React frontend, Supabase backend, PostgreSQL, OpenAI/Claude API, Stripe payments, TailwindCSS UI, Vercel hosting",
    "seoDep": "High",
    "firstDollarDays": 14,
    "marketingEase": "Easy",
    "networkEffects": "Strong"
  }
  // … nine more objects …
]
```
