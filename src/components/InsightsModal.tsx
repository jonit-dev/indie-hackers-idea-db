import React from 'react';
import { IndieHackerIdea } from '../types/idea';
import { X, ExternalLink, Calendar, DollarSign, TrendingUp, Users, Zap, Code, Target } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

interface InsightsModalProps {
  idea: IndieHackerIdea | null;
  isOpen: boolean;
  onClose: () => void;
}

const InsightsModal: React.FC<InsightsModalProps> = ({ idea, isOpen, onClose }) => {
  if (!idea || !isOpen) return null;

  const radarData = {
    labels: ['Market Size', 'Growth Potential', 'Tech Complexity', 'Resources Needed'],
    datasets: [
      {
        label: 'Analysis Score',
        data: [
          idea.insights.marketSize,
          idea.insights.growthPotential,
          idea.insights.technicalComplexity,
          idea.insights.resourceRequirement,
        ],
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderColor: 'rgba(99, 102, 241, 0.8)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: 'rgba(30, 41, 59, 1)',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointHoverBorderColor: 'rgba(30, 41, 59, 1)',
        pointHoverRadius: 8,
      },
    ],
  };

  const barData = {
    labels: ['Market Score', 'Development Time', 'Community Interest'],
    datasets: [
      {
        label: 'Key Metrics',
        data: [idea.marketPotential * 10, idea.timeToMarket * 5, idea.upvotes],
        backgroundColor: [
          'rgba(16, 185, 129, 0.9)',
          'rgba(245, 158, 11, 0.9)',
          'rgba(139, 92, 246, 0.9)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(139, 92, 246, 1)',
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
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
      x: {
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
        },
      },
      y: {
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
            <h3 className="font-bold text-xl text-white mb-2">{idea.title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{idea.description}</p>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium border ${
                idea.status === 'Launched' ? 'text-green-400 bg-green-500/20 border-green-500/30' :
                idea.status === 'In Progress' ? 'text-blue-400 bg-blue-500/20 border-blue-500/30' :
                idea.status === 'Abandoned' ? 'text-red-400 bg-red-500/20 border-red-500/30' : 
                'text-slate-400 bg-slate-500/20 border-slate-500/30'
              }`}>
                {idea.status}
              </span>
              <span className="px-2 py-1 rounded text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {idea.category}
              </span>
              <span className="text-slate-500 text-xs">
                {new Date(idea.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
          <button
            className="ml-4 p-2 rounded-lg bg-slate-700 border border-slate-600 hover:bg-slate-600 transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-xs text-slate-400 font-medium">Revenue</span>
              </div>
              <div className="text-white font-bold text-lg">{idea.estimatedRevenue}</div>
              <div className="text-xs text-slate-500">Monthly</div>
            </div>
            
            <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-slate-400 font-medium">Time</span>
              </div>
              <div className="text-white font-bold text-lg">{idea.timeToMarket}w</div>
              <div className="text-xs text-slate-500">To market</div>
            </div>

            <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className={`w-4 h-4 ${
                  idea.difficulty === 'Easy' ? 'text-green-400' :
                  idea.difficulty === 'Medium' ? 'text-orange-400' : 'text-red-400'
                }`} />
                <span className="text-xs text-slate-400 font-medium">Difficulty</span>
              </div>
              <div className={`font-bold text-lg ${
                idea.difficulty === 'Easy' ? 'text-green-400' :
                idea.difficulty === 'Medium' ? 'text-orange-400' : 'text-red-400'
              }`}>
                {idea.difficulty}
              </div>
              <div className="text-xs text-slate-500">Level</div>
            </div>

            <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className={`w-4 h-4 ${
                  idea.competition === 'Low' ? 'text-green-400' :
                  idea.competition === 'Medium' ? 'text-orange-400' : 'text-red-400'
                }`} />
                <span className="text-xs text-slate-400 font-medium">Competition</span>
              </div>
              <div className={`font-bold text-lg ${
                idea.competition === 'Low' ? 'text-green-400' :
                idea.competition === 'Medium' ? 'text-orange-400' : 'text-red-400'
              }`}>
                {idea.competition}
              </div>
              <div className="text-xs text-slate-500">Level</div>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tech Stack */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-5 h-5 text-purple-400" />
                <h4 className="text-lg font-bold text-white">Technology Stack</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {idea.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-slate-600 text-slate-200 text-sm rounded border border-slate-500">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-cyan-400" />
                <h4 className="text-lg font-bold text-white">Tags</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {idea.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded border border-purple-500/30">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-white font-semibold">{idea.marketPotential}/10</span>
                <span className="text-slate-400 text-sm">Market Score</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-semibold">{idea.upvotes}</span>
                <span className="text-slate-400 text-sm">Upvotes</span>
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