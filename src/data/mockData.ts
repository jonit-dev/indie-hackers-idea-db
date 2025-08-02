import { IndieHackerIdea } from '../types/idea';

export const mockIdeas: IndieHackerIdea[] = [
  {
    id: '1',
    title: 'AI-Powered Code Review Tool',
    description: 'Automated code review system that provides intelligent feedback and suggestions for improving code quality.',
    category: 'Developer Tools',
    difficulty: 'Hard',
    marketPotential: 9,
    timeToMarket: 16,
    techStack: ['React', 'Node.js', 'Python', 'TensorFlow'],
    estimatedRevenue: '$10k-50k MRR',
    competition: 'Medium',
    dateAdded: '2024-01-15',
    status: 'Idea',
    tags: ['AI', 'Developer Tools', 'SaaS'],
    upvotes: 127,
    insights: {
      marketSize: 85,
      growthPotential: 92,
      technicalComplexity: 88,
      resourceRequirement: 85
    }
  },
  {
    id: '2',
    title: 'Micro-SaaS Analytics Dashboard',
    description: 'Simple, beautiful analytics dashboard specifically designed for micro-SaaS businesses with under $10k MRR.',
    category: 'Analytics',
    difficulty: 'Medium',
    marketPotential: 7,
    timeToMarket: 8,
    techStack: ['React', 'Node.js', 'PostgreSQL', 'D3.js'],
    estimatedRevenue: '$5k-25k MRR',
    competition: 'High',
    dateAdded: '2024-01-20',
    status: 'In Progress',
    tags: ['Analytics', 'SaaS', 'Dashboard'],
    upvotes: 89,
    insights: {
      marketSize: 72,
      growthPotential: 78,
      technicalComplexity: 65,
      resourceRequirement: 60
    }
  },
  {
    id: '3',
    title: 'Remote Team Mood Tracker',
    description: 'Daily mood and wellness tracking for remote teams with insights for managers to improve team dynamics.',
    category: 'HR Tech',
    difficulty: 'Easy',
    marketPotential: 6,
    timeToMarket: 6,
    techStack: ['React', 'Firebase', 'Chart.js'],
    estimatedRevenue: '$2k-15k MRR',
    competition: 'Low',
    dateAdded: '2024-02-01',
    status: 'Launched',
    tags: ['HR', 'Remote Work', 'Wellness'],
    upvotes: 156,
    insights: {
      marketSize: 68,
      growthPotential: 82,
      technicalComplexity: 45,
      resourceRequirement: 40
    }
  },
  {
    id: '4',
    title: 'API Documentation Generator',
    description: 'Automatically generate beautiful, interactive API documentation from code comments and schemas.',
    category: 'Developer Tools',
    difficulty: 'Medium',
    marketPotential: 8,
    timeToMarket: 12,
    techStack: ['Vue.js', 'Node.js', 'TypeScript', 'Swagger'],
    estimatedRevenue: '$8k-40k MRR',
    competition: 'Medium',
    dateAdded: '2024-02-10',
    status: 'Idea',
    tags: ['Documentation', 'API', 'Developer Tools'],
    upvotes: 94,
    insights: {
      marketSize: 76,
      growthPotential: 85,
      technicalComplexity: 70,
      resourceRequirement: 65
    }
  },
  {
    id: '5',
    title: 'Newsletter Monetization Platform',
    description: 'Help newsletter creators monetize through sponsored content matching and revenue optimization.',
    category: 'Content',
    difficulty: 'Hard',
    marketPotential: 9,
    timeToMarket: 20,
    techStack: ['React', 'Node.js', 'Stripe', 'SendGrid'],
    estimatedRevenue: '$15k-75k MRR',
    competition: 'High',
    dateAdded: '2024-02-15',
    status: 'Idea',
    tags: ['Newsletter', 'Monetization', 'Content'],
    upvotes: 203,
    insights: {
      marketSize: 88,
      growthPotential: 95,
      technicalComplexity: 82,
      resourceRequirement: 90
    }
  },
  {
    id: '6',
    title: 'Local Business Review Aggregator',
    description: 'Aggregate and display reviews from multiple platforms for local businesses in a single dashboard.',
    category: 'Local Business',
    difficulty: 'Medium',
    marketPotential: 5,
    timeToMarket: 10,
    techStack: ['React', 'Python', 'APIs', 'MongoDB'],
    estimatedRevenue: '$3k-20k MRR',
    competition: 'Low',
    dateAdded: '2024-02-20',
    status: 'Abandoned',
    tags: ['Reviews', 'Local Business', 'Aggregation'],
    upvotes: 67,
    insights: {
      marketSize: 55,
      growthPotential: 62,
      technicalComplexity: 68,
      resourceRequirement: 58
    }
  }
];