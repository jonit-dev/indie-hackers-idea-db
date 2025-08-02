export interface IndieHackerIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  marketPotential: number; // 1-10 scale
  timeToMarket: number; // weeks
  techStack: string[];
  estimatedRevenue: string;
  competition: 'Low' | 'Medium' | 'High';
  dateAdded: string;
  status: 'Idea' | 'In Progress' | 'Launched' | 'Abandoned';
  tags: string[];
  upvotes: number;
  insights: {
    marketSize: number;
    growthPotential: number;
    technicalComplexity: number;
    resourceRequirement: number;
  };
}