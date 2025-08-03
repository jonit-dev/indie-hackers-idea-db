Below is the same prompt with **all rating fields standardized to the five-point scale “Very Low → Very High.”**
Letter shortcuts (H/M/L/P etc.) and numeric shorthand have been removed.

────────────────────────────────────────────────────────────────────────────
Unified Prompt – “Micro-SaaS Idea-Mining on X (Twitter)” (v7-revised)
────────────────────────────────────────────────────────────────────────────

🎯 **Objective**
Unearth _clone-worthy_ micro-SaaS ideas tweeted by bootstrapped founders in the **last 12 months**.
• Normalise any revenue numbers to **MRR (USD)**.
• Score each idea on the dimensions below, including early-validation criteria.
• Return the **TOP 10 ideas** as **one JSON array** (no prose, no Markdown) that follows the schema in §4.

────────────────────────────────────────────────────────────────────────────
0 Eligibility Filters — ONLY consider tweets that…
────────────────────────────────────────────────────────────────────────────

1. Explicitly **name** the product **or clearly describe what it does**.
2. Provide a plain-language **problem + solution** summary.
3. Show at least one of: product name, demo link, screenshot, feature list.
4. Contain enough detail to fill both `description` and `productName` without guessing.

If **any** of the above is missing → **discard the tweet**.

────────────────────────────────────────────────────────────────────────────
1 Search Strategy
────────────────────────────────────────────────────────────────────────────
• Use **Twitter Advanced Search** (or the v2 API) with queries that combine revenue milestones, indie-hacker keywords, and time filters, e.g.:

```
"reached $k MRR" OR "hit $k MRR" ("#buildinpublic" OR indie OR SaaS)
     min_faves:10 since:YYYY-MM-DD until:YYYY-MM-DD
```

– Replace `$k` with numbers like 1k, 5k, 10k, 30k, 50k, 100k.
– Set _since_ = _today − 12 months_ and _until_ = _today_.
– Vary keywords (`bootstrapped`, `launched`, `ARR`, `side-project`, `solo-founder`, etc.) to widen coverage.
• De-dup retweets & quote-tweets; keep the original author’s post.
• Ignore giveaway threads, vague teasers, funding announcements, press-release “coming soon,” or anything that violates the eligibility filters.

────────────────────────────────────────────────────────────────────────────
2 Data to Extract for Each Candidate
────────────────────────────────────────────────────────────────────────────

| JSON field       | How to determine / notes                                                                                               |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **id**           | Tweet’s numeric ID **or** any stable hash (must be unique within the response).                                        |
| source           | Always `"X (Twitter)"`.                                                                                                |
| url              | Full tweet link.                                                                                                       |
| niche            | Concise domain label (e.g. “DevTools – CI metrics”, “SEO Tools”, “HR”).                                                |
| mrr              | Monthly Recurring Revenue in USD. If ARR given → ARR / 12.                                                             |
| pricing          | Short model: `"$29/mo"`, `"Freemium"`, `"Usage-based"`, `"?"` if unknown.                                              |
| user             | Primary persona (“Founders”, “Product teams”, “Marketers”, “Indie devs”…).                                             |
| channel          | Main acquisition channel the founder cites or that’s obvious (X, SEO, etc.).                                           |
| comp             | Competitive intensity: **Very Low, Low, Medium, High, Very High**.                                                     |
| platDep          | Platform-dependence risk: **Very Low, Low, Medium, High, Very High** (_use “None” only if literally zero dependence_). |
| complexity       | Build difficulty: **Very Low, Low, Medium, High, Very High**.                                                          |
| mvpWk            | Estimated **days** to build a scrappy but functional MVP.                                                              |
| oneKMrrChance    | Likelihood to hit **≥ \$1 k MRR** within 6-12 mo: **Very Low, Low, Medium, High, Very High**.                          |
| maintHours       | Estimated maintenance hours per month.                                                                                 |
| marketProof      | **Yes** if ≥ 1 indie outside this tweet is at ≥ \$30 k MRR in the same niche/model; else **No**.                       |
| distFit          | Channel alignment: **Very Low, Low, Medium, High, Very High**.                                                         |
| churn            | Value if disclosed, else `"?"`.                                                                                        |
| passiveness      | Passive-income grade: **Very Low, Low, Medium, High, Very High**.                                                      |
| revenuePotential | Total addressable upside: **Very Low, Low, Medium, High, Very High**.                                                  |
| legalRisk        | **Very Low, Low, Medium, High, Very High**.                                                                            |
| score            | Final 0-100 attractiveness score (see §3).                                                                             |
| rationale        | 1-2 sentences tying the score together.                                                                                |
| dateAdded        | Tweet date in **YYYY-MM-DD**.                                                                                          |
| description      | One-line, plain-language what-it-does summary.                                                                         |
| productName      | Actual name. If none provided but description is clear → `"Unnamed <niche>"`.                                          |
| technicalImplementation | Technical stack and implementation details (frontend, backend, database, APIs, deployment).                     |

────────────────────────────────────────────────────────────────────────────
3 Scoring Guidelines (Weighted Rubric → 0-100 score)
────────────────────────────────────────────────────────────────────────────

| Factor (JSON fields)                   | Weight | Excellent (90-100)            | Good (70-89)      | Fair (50-69)         | Weak (< 50)        |
| -------------------------------------- | ------ | ----------------------------- | ----------------- | -------------------- | ------------------ |
| **Speed to MVP (mvpWk)**               | 25 %   | ≤ 3 days                      | 4-7 days          | 8-14 days            | > 14 days          |
| **Chance ≥ \$1 k MRR (oneKMrrChance)** | 25 %   | **Very High**                 | **High**          | **Medium**           | **Low / Very Low** |
| **Maintenance Drag (maintHours)**      | 20 %   | ≤ 5 h/mo                      | 6-10 h/mo         | 11-20 h/mo           | > 20 h/mo          |
| **Market Proof (marketProof)**         | 15 %   | Yes + multiple peers ≥ \$30 k | Yes (single peer) | No (partial promise) | No + unproven      |
| **Distribution Fit (distFit)**         | 10 %   | **Very High**                 | **High**          | **Medium**           | **Low / Very Low** |
| **Other Risks (platDep, legalRisk)**   | 5 %    | **Very Low / Low**            | **Medium**        | **High**             | **Very High**      |

• Compute a weighted average, then round to the nearest whole number → `score`.

────────────────────────────────────────────────────────────────────────────
4 Output Schema & Example
────────────────────────────────────────────────────────────────────────────
• Respond with **only** a JSON array containing **exactly 10 objects**.
• Objects **must** include every field listed in §2 using the exact casing shown.
• Sort the array by `score` **descending** (highest first).
• Do **not** wrap the JSON in Markdown fences or add extra commentary.

```json
[
  {
    "id": "1725468990123456789",
    "source": "X (Twitter)",
    "url": "https://x.com/PrajwalTomar_/status/1949810090976100686",
    "niche": "AI MVP",
    "mrr": 30000,
    "pricing": "?",
    "user": "Founders",
    "channel": "X",
    "comp": "Medium",
    "platDep": "Low",
    "complexity": "Medium",
    "mvpWk": 6,
    "oneKMrrChance": "High",
    "maintHours": 8,
    "marketProof": "Yes",
    "distFit": "High",
    "churn": "?",
    "passiveness": "High",
    "revenuePotential": "Medium",
    "legalRisk": "Low",
    "score": 80,
    "rationale": "Agency + SaaS hybrid; strong build-in-public momentum.",
    "dateAdded": "2025-01-02",
    "description": "AI MVP agency & community doing $30k MRR.",
    "productName": "SampleName",
    "technicalImplementation": "Next.js frontend, Supabase backend, OpenAI/Claude APIs, PostgreSQL database, Stripe payments, Vercel deployment"
  }
  // … nine more objects …
]
```
