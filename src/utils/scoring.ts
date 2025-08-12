import { MicroSaasIdea } from '../types/idea';

/**
 * Deterministic scoring system for micro-SaaS ideas
 * Total score: 0-100 points across 6 categories
 */

export function calculateDeterministicScore(idea: MicroSaasIdea): number {
  let score = 0;

  // 1. Revenue Potential (25 points max)
  score += calculateRevenueScore(idea);

  // 2. Market Viability (20 points max)
  score += calculateMarketScore(idea);

  // 3. Execution Risk (20 points max)
  score += calculateExecutionScore(idea);

  // 4. Speed to Market (15 points max)
  score += calculateSpeedScore(idea);

  // 5. Growth Potential (10 points max)
  score += calculateGrowthScore(idea);

  // 6. Operational Efficiency (10 points max)
  score += calculateOperationalScore(idea);

  return Math.round(Math.max(0, Math.min(100, score)));
}

function calculateRevenueScore(idea: MicroSaasIdea): number {
  let score = 0;

  // MRR Score (15 points max) - Logarithmic scale
  if (idea.mrr >= 50000) score += 15;
  else if (idea.mrr >= 20000) score += 13;
  else if (idea.mrr >= 10000) score += 11;
  else if (idea.mrr >= 5000) score += 9;
  else if (idea.mrr >= 2000) score += 7;
  else if (idea.mrr >= 1000) score += 5;
  else if (idea.mrr >= 500) score += 3;
  else if (idea.mrr >= 100) score += 1;

  // Revenue Potential (10 points max)
  switch (idea.revenuePotential?.toLowerCase()) {
    case 'high': case 'h': score += 10; break;
    case 'medium': case 'med': case 'm': score += 6; break;
    case 'low': case 'l': score += 2; break;
  }

  return score;
}

function calculateMarketScore(idea: MicroSaasIdea): number {
  let score = 0;

  // Market Proof (10 points max)
  if (idea.marketProof?.toLowerCase() === 'yes') score += 10;

  // Competition (10 points max)
  switch (idea.comp?.toLowerCase()) {
    case 'low': score += 10; break;
    case 'medium': case 'med': score += 6; break;
    case 'high': score += 2; break;
  }

  return score;
}

function calculateExecutionScore(idea: MicroSaasIdea): number {
  let score = 0;

  // Complexity (15 points max)
  switch (idea.complexity) {
    case 1: score += 15; break;
    case 2: score += 12; break;
    case 3: score += 9; break;
    case 4: score += 6; break;
    case 5: score += 3; break;
    default: score += 0;
  }

  // Platform Dependency (5 points max)
  switch (idea.platDep?.toLowerCase()) {
    case 'none': score += 5; break;
    case 'low': score += 4; break;
    case 'medium': case 'med': score += 2; break;
    case 'high': score += 0; break;
  }

  return score;
}

function calculateSpeedScore(idea: MicroSaasIdea): number {
  let score = 0;

  // MVP Weeks (10 points max)
  if (idea.mvpWk <= 2) score += 10;
  else if (idea.mvpWk <= 4) score += 8;
  else if (idea.mvpWk <= 8) score += 6;
  else if (idea.mvpWk <= 12) score += 4;
  else score += 2;

  // First Dollar Days (5 points max)
  if (idea.firstDollarDays <= 7) score += 5;
  else if (idea.firstDollarDays <= 14) score += 4;
  else if (idea.firstDollarDays <= 21) score += 3;
  else if (idea.firstDollarDays <= 30) score += 2;
  else score += 1;

  return score;
}

function calculateGrowthScore(idea: MicroSaasIdea): number {
  let score = 0;

  // Marketing Ease (5 points max)
  switch (idea.marketingEase?.toLowerCase()) {
    case 'easy': score += 5; break;
    case 'medium': case 'med': score += 3; break;
    case 'hard': score += 1; break;
  }

  // Network Effects (5 points max)
  switch (idea.networkEffects?.toLowerCase()) {
    case 'strong': score += 5; break;
    case 'weak': score += 3; break;
    case 'none': score += 0; break;
  }

  return score;
}

function calculateOperationalScore(idea: MicroSaasIdea): number {
  let score = 0;

  // Passiveness (5 points max)
  switch (idea.passiveness?.toLowerCase()) {
    case 'very high': score += 5; break;
    case 'high': case 'a': score += 4; break;
    case 'medium': case 'med': case 'b': score += 3; break;
    case 'low': case 'c': score += 2; break;
    case 'very low': case 'd': score += 1; break;
  }

  // Maintenance Hours (5 points max)
  if (idea.maintHours <= 5) score += 5;
  else if (idea.maintHours <= 10) score += 4;
  else if (idea.maintHours <= 20) score += 3;
  else if (idea.maintHours <= 40) score += 2;
  else score += 1;

  return score;
}

/**
 * Get a breakdown of scores by category for debugging/analysis
 */
export function getScoreBreakdown(idea: MicroSaasIdea) {
  return {
    revenue: calculateRevenueScore(idea),
    market: calculateMarketScore(idea),
    execution: calculateExecutionScore(idea),
    speed: calculateSpeedScore(idea),
    growth: calculateGrowthScore(idea),
    operational: calculateOperationalScore(idea),
    total: calculateDeterministicScore(idea)
  };
}