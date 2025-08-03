export interface MicroSaasIdea {
  id: string;
  source: string; // Always "X (Twitter)" for this schema
  url: string; // Full tweet link
  niche: string; // Product domain (e.g. SEO, HR, DevTools)
  mrr: number; // Monthly Recurring Revenue in USD
  pricing: string; // Short model description (e.g. "$19/mo freemium", "$99/seat")
  user: string; // Primary persona (e.g. SaaS founders, marketers, devs)
  channel: string; // Main acquisition channel (SEO, X, AppSumo, etc.)
  comp: 'Low' | 'Medium' | 'High'; // Competitive intensity
  platDep: 'None' | 'Low' | 'Medium' | 'High'; // Platform-dependence risk
  complexity: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High'; // Build complexity
  mvpWk: number; // Days to build MVP (target ≤ 7)
  oneKMrrChance: 'High' | 'Medium' | 'Low'; // Likelihood to hit ≥ $1k MRR in 6-12 months
  maintHours: number; // Monthly maintenance hours (goal ≤ 10)
  marketProof: 'Yes' | 'No'; // At least one indie hits ≥ 30k MRR in same niche
  distFit: 'Good' | 'Average' | 'Poor'; // Distribution alignment with proven indie channels
  churn: string; // Churn rate if available, else "?"
  passiveness: 'Very High' | 'High' | 'Medium' | 'Low'; // Passiveness grade (Very High = highly passive)
  revenuePotential: 'High' | 'Medium' | 'Low'; // Revenue potential
  legalRisk: 'None' | 'Low' | 'Medium' | 'High'; // Legal risk assessment
  score: number; // Overall attractiveness 0-100
  rationale: string; // 1-2 sentences explaining the scores
  dateAdded?: string; // When added to database
  description?: string; // Detailed description of the product/service
  productName?: string; // Actual name of the product
  founder?: string; // Founder's Twitter handle
}
