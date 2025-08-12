import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip as ChartTooltip
} from 'chart.js';
import { 
  Clock, 
  DollarSign, 
  ExternalLink, 
  Heart, 
  Target, 
  TrendingUp, 
  Users, 
  X, 
  Zap,
  Code,
  Megaphone,
  Server,
  Calendar,
  Search,
  Share2,
  User,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import React from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import { MicroSaasIdea } from '../types/idea';
import { calculateDeterministicScore } from '../utils/scoring';
import { useMicroSaasStore } from '../stores/microSaasStore';
import Tooltip from './Tooltip';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

interface InsightsModalProps {
  idea: MicroSaasIdea | null;
  isOpen: boolean;
  onClose: () => void;
}

const InsightsModal: React.FC<InsightsModalProps> = ({ idea, isOpen, onClose }) => {
  const { toggleFavorite, isFavorite } = useMicroSaasStore();
  
  if (!idea || !isOpen) return null;

  const isIdeaFavorite = isFavorite(idea.id);

  const getRevenuePotentialScore = (potential: string) => {
    switch (potential) {
      case 'H': return 85;
      case 'M': return 60;
      case 'L': return 35;
      default: return 50;
    }
  };

  const getOneKMrrChanceScore = (chance: string) => {
    switch (chance) {
      case 'H': return 85;
      case 'M': return 60;
      case 'L': return 35;
      default: return 50;
    }
  };

  // Calculate overall quality score for color interpolation
  const qualityScore = (
    calculateDeterministicScore(idea) +
    getOneKMrrChanceScore(idea.oneKMrrChance) +
    getRevenuePotentialScore(idea.revenuePotential) +
    (idea.marketProof === 'Yes' ? 80 : 30)
  ) / 4;

  // Interpolate between red and green based on quality
  const getQualityColor = (score: number, alpha: number = 1) => {
    const red = Math.max(0, Math.min(255, 255 - (score - 20) * 3.2));
    const green = Math.max(0, Math.min(255, (score - 20) * 3.2));
    return `rgba(${red}, ${green}, 50, ${alpha})`;
  };

  const radarData = {
    labels: ['Score', '1k MRR Chance', 'Revenue Potential', 'Market Proof'],
    datasets: [
      {
        label: 'Analysis Metrics',
        data: [
          calculateDeterministicScore(idea),
          getOneKMrrChanceScore(idea.oneKMrrChance),
          getRevenuePotentialScore(idea.revenuePotential),
          idea.marketProof === 'Yes' ? 80 : 30,
        ],
        backgroundColor: getQualityColor(qualityScore, 0.15),
        borderColor: getQualityColor(qualityScore, 0.8),
        borderWidth: 3,
        pointBackgroundColor: getQualityColor(qualityScore, 1),
        pointBorderColor: 'rgba(30, 41, 59, 1)',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverBackgroundColor: getQualityColor(qualityScore, 1),
        pointHoverBorderColor: 'rgba(30, 41, 59, 1)',
        pointHoverRadius: 8,
      },
    ],
  };

  // Performance metrics with normalized scales and better visualization
  const barData = {
    labels: ['Revenue Score', 'Time Efficiency', 'Market Viability', 'Build Feasibility'],
    datasets: [
      {
        label: 'Performance Metrics',
        data: [
          Math.min(100, (idea.mrr / 1000) * 10), // Normalize MRR to 0-100 scale
          Math.max(0, 100 - (idea.mvpWk / 7) * 10), // Invert MVP weeks (less time = higher score)
          calculateDeterministicScore(idea), // Direct score
          Math.max(0, 100 - (idea.complexity * 20)), // Invert complexity (lower complexity = higher score)
        ],
        backgroundColor: [
          getQualityColor(Math.min(100, (idea.mrr / 1000) * 10), 0.8),
          getQualityColor(Math.max(0, 100 - (idea.mvpWk / 7) * 10), 0.8),
          getQualityColor(calculateDeterministicScore(idea), 0.8),
          getQualityColor(Math.max(0, 100 - (idea.complexity * 20)), 0.8),
        ],
        borderColor: [
          getQualityColor(Math.min(100, (idea.mrr / 1000) * 10), 1),
          getQualityColor(Math.max(0, 100 - (idea.mvpWk / 7) * 10), 1),
          getQualityColor(calculateDeterministicScore(idea), 1),
          getQualityColor(Math.max(0, 100 - (idea.complexity * 20)), 1),
        ],
        borderWidth: 2,
        borderRadius: 12,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend for cleaner look
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: getQualityColor(qualityScore, 0.3),
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: function (context: { dataset: { label?: string }; parsed: { y: number } }) {
            const label = context.dataset.label || '';
            const value = Math.round(context.parsed.y);
            return `${label}: ${value}/100`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(71, 85, 105, 0.3)',
          drawBorder: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 11,
            weight: '500',
          },
          maxRotation: 45,
        },
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          color: 'rgba(71, 85, 105, 0.3)',
          drawBorder: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 12,
            weight: '500',
          },
          stepSize: 25,
        },
      },
    },
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'center' as const,
        labels: {
          color: '#cbd5e1',
          font: {
            size: 13,
            weight: '500',
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        angleLines: {
          color: 'rgba(71, 85, 105, 0.4)',
          lineWidth: 1,
        },
        grid: {
          color: 'rgba(71, 85, 105, 0.4)',
          lineWidth: 1,
        },
        ticks: {
          color: '#64748b',
          backdropColor: 'transparent',
          font: {
            size: 11,
          },
          stepSize: 20,
        },
        pointLabels: {
          color: '#cbd5e1',
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-4xl max-h-[90vh] bg-slate-800 border border-slate-700 rounded-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-slate-700">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-bold text-xl text-white">{idea.productName || idea.niche}</h3>
              {idea.productName && idea.productName !== idea.niche && (
                <span className="text-slate-400 text-sm">({idea.niche})</span>
              )}
            </div>
            {idea.description && (
              <p className="text-slate-300 text-sm leading-relaxed mb-3">{idea.description}</p>
            )}
            <p className="text-slate-400 text-xs leading-relaxed mb-3 italic">{idea.rationale}</p>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2 py-1 rounded text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {idea.user}
              </span>
              <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {idea.channel}
              </span>
              {idea.founder && (
                <span className="px-2 py-1 rounded text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {idea.founder}
                </span>
              )}
              <span className="text-slate-500 text-xs">
                {idea.dateAdded && new Date(idea.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <a href={idea.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                View Source
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(idea.id)}
              className={`p-2 rounded-lg border transition-all duration-200 ${
                isIdeaFavorite 
                  ? 'border-amber-500 text-amber-400 hover:text-amber-500' 
                  : 'border-slate-600 text-slate-400 hover:text-amber-400 hover:border-amber-500/50'
              }`}
              title={isIdeaFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart 
                className={`w-5 h-5 ${isIdeaFavorite ? 'fill-amber-400' : ''}`} 
              />
            </button>
            <button
              className="p-2 rounded-lg bg-slate-700 border border-slate-600 hover:bg-slate-600 transition-colors"
              onClick={onClose}
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 modal-scroll">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-xs text-slate-400 font-medium">MRR</span>
              </div>
              <div className="text-white font-bold text-lg">${idea.mrr.toLocaleString()}</div>
              <div className="text-xs text-slate-500">{idea.pricing || 'Unknown pricing'}</div>
            </div>

            <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-slate-400 font-medium">MVP Time</span>
              </div>
              <div className="text-white font-bold text-lg">{idea.mvpWk} days</div>
              <div className="text-xs text-slate-500">To build MVP</div>
            </div>

            <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className={`w-4 h-4 ${idea.complexity <= 2 ? 'text-green-400' :
                    idea.complexity <= 3 ? 'text-orange-400' : 'text-red-400'
                  }`} />
                <span className="text-xs text-slate-400 font-medium">Complexity</span>
              </div>
              <div className={`font-bold text-lg ${idea.complexity <= 2 ? 'text-green-400' :
                  idea.complexity <= 3 ? 'text-orange-400' : 'text-red-400'
                }`}>
                {idea.complexity}/5
              </div>
              <div className="text-xs text-slate-500">Build difficulty</div>
            </div>

            <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className={`w-4 h-4 ${idea.comp === 'Low' ? 'text-green-400' :
                    idea.comp === 'Med' ? 'text-orange-400' : 'text-red-400'
                  }`} />
                <span className="text-xs text-slate-400 font-medium">Competition</span>
              </div>
              <div className={`font-bold text-lg ${idea.comp === 'Low' ? 'text-green-400' :
                  idea.comp === 'Med' ? 'text-orange-400' : 'text-red-400'
                }`}>
                {idea.comp}
              </div>
              <div className="text-xs text-slate-500">Market density</div>
            </div>
          </div>

          {/* Marketing & Growth Metrics */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Megaphone className="w-5 h-5 text-indigo-400" />
              <h4 className="text-lg font-bold text-white">Marketing & Growth</h4>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {idea.firstDollarDays && (
                <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-slate-400 font-medium">First Revenue</span>
                    <Tooltip content="Time from launch to earning the first dollar. Shorter times indicate faster market validation and customer acquisition." />
                  </div>
                  <div className="text-white font-bold text-lg">{idea.firstDollarDays} days</div>
                  <div className="text-xs text-slate-500">To first $1</div>
                </div>
              )}
              
              {idea.marketingEase && (
                <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Megaphone className={`w-4 h-4 ${idea.marketingEase === 'Easy' ? 'text-green-400' :
                        idea.marketingEase === 'Medium' ? 'text-orange-400' : 'text-red-400'
                      }`} />
                    <span className="text-xs text-slate-400 font-medium">Marketing Ease</span>
                    <Tooltip content="How easy it is to market this product. Easy means clear target audience and distribution channels. Hard means complex sales cycles or niche markets." />
                  </div>
                  <div className={`font-bold text-lg ${idea.marketingEase === 'Easy' ? 'text-green-400' :
                      idea.marketingEase === 'Medium' ? 'text-orange-400' : 'text-red-400'
                    }`}>
                    {idea.marketingEase}
                  </div>
                  <div className="text-xs text-slate-500">To acquire customers</div>
                </div>
              )}

              {idea.seoDep && (
                <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Search className={`w-4 h-4 ${idea.seoDep === 'High' ? 'text-green-400' :
                        idea.seoDep === 'Medium' ? 'text-orange-400' : 'text-red-400'
                      }`} />
                    <span className="text-xs text-slate-400 font-medium">SEO Dependency</span>
                    <Tooltip content="How much the business relies on search engine optimization for growth. High SEO dependency means organic search is a primary growth channel." />
                  </div>
                  <div className={`font-bold text-lg ${idea.seoDep === 'High' ? 'text-green-400' :
                      idea.seoDep === 'Medium' ? 'text-orange-400' : 'text-red-400'
                    }`}>
                    {idea.seoDep}
                  </div>
                  <div className="text-xs text-slate-500">SEO reliance</div>
                </div>
              )}

              {idea.networkEffects && (
                <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Share2 className={`w-4 h-4 ${idea.networkEffects === 'Strong' ? 'text-green-400' :
                        idea.networkEffects === 'Medium' ? 'text-orange-400' : 'text-slate-400'
                      }`} />
                    <span className="text-xs text-slate-400 font-medium">Network Effects</span>
                    <Tooltip content="How much the product becomes more valuable as more users join. Strong network effects create competitive moats and viral growth." />
                  </div>
                  <div className={`font-bold text-lg ${idea.networkEffects === 'Strong' ? 'text-green-400' :
                      idea.networkEffects === 'Medium' ? 'text-orange-400' : 'text-slate-400'
                    }`}>
                    {idea.networkEffects}
                  </div>
                  <div className="text-xs text-slate-500">User growth effect</div>
                </div>
              )}
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <h4 className="text-lg font-bold text-white">Market Analysis</h4>
              </div>
              <div className="h-64">
                <Radar data={radarData} options={radarOptions} />
              </div>
            </div>

            <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h4 className="text-lg font-bold text-white">Performance Metrics</h4>
              </div>
              <div className="h-64">
                <Bar data={barData} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* Infrastructure Compatibility */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-cyan-400" />
              <h4 className="text-lg font-bold text-white">Infrastructure & Technical</h4>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {idea.canSupabaseOnly ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-xs text-slate-400 font-medium">Supabase Only</span>
                  </div>
                  <Tooltip content="Can this product run entirely on Supabase backend? This means simple CRUD operations, basic auth, and minimal external dependencies." />
                </div>
                <div className={`font-bold text-lg ${idea.canSupabaseOnly ? 'text-green-400' : 'text-red-400'}`}>
                  {idea.canSupabaseOnly ? 'Yes' : 'No'}
                </div>
                <div className="text-xs text-slate-500">Simple backend needs</div>
              </div>

              <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {idea.canSupaEdgeStack ? (
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-xs text-slate-400 font-medium">Edge Stack</span>
                  </div>
                  <Tooltip content="Can run on lean edge stack (Supabase + Cloudflare Workers). Suitable for automation, scheduling, and moderate complexity features." />
                </div>
                <div className={`font-bold text-lg ${idea.canSupaEdgeStack ? 'text-blue-400' : 'text-red-400'}`}>
                  {idea.canSupaEdgeStack ? 'Yes' : 'No'}
                </div>
                <div className="text-xs text-slate-500">Edge-compatible</div>
              </div>

              <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code className={`w-4 h-4 ${(!idea.canSupabaseOnly && !idea.canSupaEdgeStack) ? 'text-purple-400' : 'text-slate-400'}`} />
                  <span className="text-xs text-slate-400 font-medium">Complex Infra</span>
                  <Tooltip content="Requires dedicated or specialized infrastructure for high-performance computing, real-time processing, or heavy data workloads." />
                </div>
                <div className={`font-bold text-lg ${(!idea.canSupabaseOnly && !idea.canSupaEdgeStack) ? 'text-purple-400' : 'text-slate-400'}`}>
                  {(!idea.canSupabaseOnly && !idea.canSupaEdgeStack) ? 'Required' : 'Not needed'}
                </div>
                <div className="text-xs text-slate-500">Dedicated servers</div>
              </div>
            </div>
            
            {idea.infraExplanation && (
              <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Server className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-white">Infrastructure Requirements</span>
                </div>
                <p className="text-slate-300 text-sm">{idea.infraExplanation}</p>
              </div>
            )}

            {idea.technicalImplementation && (
              <div className="bg-slate-700 border border-slate-600 rounded-lg p-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-white">Technical Stack</span>
                  <Tooltip content="Recommended technology stack and implementation approach for building this product." />
                </div>
                <p className="text-slate-300 text-sm">{idea.technicalImplementation}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Additional Metrics */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-purple-400" />
                <h4 className="text-lg font-bold text-white">Additional Details</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">1k MRR Chance:</span>
                    <Tooltip content="Probability of reaching $1,000 monthly recurring revenue based on market size, competition, and execution difficulty." />
                  </div>
                  <span className={`font-medium ${idea.oneKMrrChance === 'H' ? 'text-green-400' :
                      idea.oneKMrrChance === 'M' ? 'text-orange-400' : 'text-red-400'
                    }`}>{idea.oneKMrrChance === 'H' ? 'High' : idea.oneKMrrChance === 'M' ? 'Medium' : 'Low'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Market Proof:</span>
                    <Tooltip content="Whether there's evidence of existing demand for this type of product. 'Yes' means similar products exist and are successful." />
                  </div>
                  <span className={`font-medium ${idea.marketProof === 'Yes' ? 'text-green-400' : 'text-red-400'}`}>
                    {idea.marketProof}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Distribution Fit:</span>
                    <Tooltip content="How well the product matches its primary distribution channel. Good fit means the channel naturally reaches the target audience." />
                  </div>
                  <span className={`font-medium ${idea.distFit === 'Good' ? 'text-green-400' :
                      idea.distFit === 'Avg' ? 'text-orange-400' : 'text-red-400'
                    }`}>{idea.distFit}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Maintenance:</span>
                    <Tooltip content="Estimated monthly hours needed to maintain, update, and support the product after launch." />
                  </div>
                  <span className="text-white font-medium">{idea.maintHours}h/mo</span>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-cyan-400" />
                <h4 className="text-lg font-bold text-white">Risk Assessment</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Platform Dependency:</span>
                    <Tooltip content="Risk of being dependent on external platforms (APIs, app stores, etc.). High dependency means platform changes could break the business." />
                  </div>
                  <span className={`font-medium ${idea.platDep === 'None' || idea.platDep === 'Low' ? 'text-green-400' :
                      idea.platDep === 'Med' ? 'text-orange-400' : 'text-red-400'
                    }`}>{idea.platDep}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Legal Risk:</span>
                    <Tooltip content="Potential legal challenges including regulations, compliance requirements, or liability issues that could affect the business." />
                  </div>
                  <span className={`font-medium ${idea.legalRisk === 'None' || idea.legalRisk === 'Low' ? 'text-green-400' :
                      idea.legalRisk === 'Med' ? 'text-orange-400' : 'text-red-400'
                    }`}>{idea.legalRisk}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Revenue Potential:</span>
                    <Tooltip content="Maximum revenue potential based on market size, pricing model, and scalability. High means potential for significant revenue growth." />
                  </div>
                  <span className={`font-medium ${idea.revenuePotential === 'H' ? 'text-green-400' :
                      idea.revenuePotential === 'M' ? 'text-orange-400' : 'text-red-400'
                    }`}>{idea.revenuePotential === 'H' ? 'High' : idea.revenuePotential === 'M' ? 'Medium' : 'Low'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Passiveness:</span>
                    <Tooltip content="How much ongoing work is required after launch. Grade A means highly passive income, Grade D means constant hands-on management needed." />
                  </div>
                  <span className={`font-medium ${idea.passiveness === 'A' ? 'text-green-400' :
                      idea.passiveness === 'B' ? 'text-blue-400' :
                        idea.passiveness === 'C' ? 'text-orange-400' : 'text-red-400'
                    }`}>Grade {idea.passiveness}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4 text-purple-400" />
                <span className="text-white font-semibold">{calculateDeterministicScore(idea)}/100</span>
                <span className="text-slate-400 text-sm">Overall Score</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-white font-semibold">${idea.mrr.toLocaleString()}</span>
                <span className="text-slate-400 text-sm">MRR</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="text-white font-semibold">{idea.mvpWk}d</span>
                <span className="text-slate-400 text-sm">MVP Time</span>
              </div>
            </div>
            <button
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg border border-slate-600 transition-colors text-white font-medium"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsModal;
