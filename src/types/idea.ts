export interface MicroSaasIdea {
  id: string;
  source: string; // Always "X (Twitter)" for this schema
  url: string; // Full tweet link
  niche: string; // Product domain (e.g. SEO, HR, DevTools)
  mrr: number; // Monthly Recurring Revenue in USD
  pricing: string; // Short model description (e.g. "$19/mo freemium", "$99/seat")
  user: string; // Primary persona (e.g. SaaS founders, marketers, devs)
  channel: string; // Main acquisition channel (SEO, X, AppSumo, etc.)
  comp: 'Low' | 'Med' | 'High'; // Competitive intensity
  platDep: 'None' | 'Low' | 'Med' | 'High'; // Platform-dependence risk
  complexity: 1 | 2 | 3 | 4 | 5; // Build complexity (1 = trivial, 5 = hard R&D)
  mvpWk: number; // Days to build MVP (target ≤ 7)
  oneKMrrChance: 'H' | 'M' | 'L'; // Likelihood to hit ≥ $1k MRR in 6-12 months
  maintHours: number; // Monthly maintenance hours (goal ≤ 10)
  marketProof: 'Yes' | 'No'; // At least one indie hits ≥ 30k MRR in same niche
  distFit: 'Good' | 'Avg' | 'Poor'; // Distribution alignment with proven indie channels
  churn: string; // Churn rate if available, else "?"
  passiveness: 'A' | 'B' | 'C' | 'D'; // Passiveness grade (A = highly passive)
  revenuePotential: 'H' | 'M' | 'L'; // Revenue potential
  legalRisk: 'None' | 'Low' | 'Med' | 'High'; // Legal risk assessment
  score: number; // Overall attractiveness 0-100
  rationale: string; // 1-2 sentences explaining the scores
  dateAdded?: string; // When added to database
}