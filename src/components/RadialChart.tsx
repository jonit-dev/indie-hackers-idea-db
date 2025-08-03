import React from 'react';
import { MicroSaasIdea } from '../types/idea';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadialChartProps {
  idea: MicroSaasIdea;
  size?: number;
  className?: string;
}

const RadialChart: React.FC<RadialChartProps> = ({ idea, size = 200, className = '' }) => {
  // Calculate normalized scores (0-100 scale)
  const getCompetitionScore = (comp: string) => {
    switch (comp.toLowerCase()) {
      case 'low': return 85;
      case 'med': case 'medium': return 50;
      case 'high': return 20;
      default: return 50;
    }
  };

  const getComplexityScore = (complexity: string | number) => {
    if (typeof complexity === 'string') {
      switch (complexity.toLowerCase()) {
        case 'very low': return 90;
        case 'low': return 75;
        case 'medium': return 50;
        case 'high': return 25;
        case 'very high': return 10;
        default: return 50;
      }
    }
    const complexityNum = complexity;
    return Math.max(0, (6 - complexityNum) * 20); // Invert: lower complexity = higher score
  };

  const getPlatformDepScore = (platDep: string) => {
    switch (platDep.toLowerCase()) {
      case 'none': return 100;
      case 'low': return 75;
      case 'med': case 'medium': return 45;
      case 'high': return 20;
      default: return 50;
    }
  };

  const getChanceScore = (chance: string) => {
    switch (chance.toUpperCase()) {
      case 'H': case 'HIGH': return 85;
      case 'M': case 'MEDIUM': case 'MED': return 60;
      case 'L': case 'LOW': return 35;
      default: return 50;
    }
  };

  const getMarketProofScore = (proof: string) => {
    return proof === 'Yes' ? 85 : 35;
  };

  const getMaintainabilityScore = (hours: number) => {
    if (hours <= 5) return 90;
    if (hours <= 10) return 70;
    if (hours <= 20) return 50;
    if (hours <= 40) return 30;
    return 10;
  };

  // Calculate overall potential score for color determination
  const scores = [
    idea.score,
    getCompetitionScore(idea.comp),
    getComplexityScore(idea.complexity),
    getPlatformDepScore(idea.platDep),
    getChanceScore(idea.oneKMrrChance),
    getMarketProofScore(idea.marketProof),
    getMaintainabilityScore(idea.maintHours)
  ];
  
  // Use the main idea score for color determination
  
  // Dynamic color based on the main AI score (matching ScoreRing thresholds)
  const getColor = (score: number) => {
    if (score >= 80) {
      // High potential - Green
      return {
        bg: 'rgba(34, 197, 94, 0.2)',
        border: 'rgba(34, 197, 94, 1)',
        point: 'rgba(34, 197, 94, 1)'
      };
    } else if (score >= 60) {
      // Medium potential - Yellow/Orange
      return {
        bg: 'rgba(251, 191, 36, 0.2)',
        border: 'rgba(251, 191, 36, 1)',
        point: 'rgba(251, 191, 36, 1)'
      };
    } else {
      // Low potential - Red
      return {
        bg: 'rgba(239, 68, 68, 0.2)',
        border: 'rgba(239, 68, 68, 1)',
        point: 'rgba(239, 68, 68, 1)'
      };
    }
  };
  
  const colors = getColor(idea.score);

  const data = {
    labels: [
      'Overall Score',
      'Competition',
      'Build Ease',
      'Platform Risk',
      '1K MRR Chance',
      'Market Proof',
      'Maintainability'
    ],
    datasets: [
      {
        label: 'Metrics',
        data: scores,
        backgroundColor: colors.bg,
        borderColor: colors.border,
        borderWidth: 2,
        pointBackgroundColor: colors.point,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colors.border,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(148, 163, 184, 0.2)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `Score: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        beginAtZero: true,
        angleLines: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        pointLabels: {
          color: '#94a3b8',
          font: {
            size: 11,
            weight: '500'
          }
        },
        ticks: {
          stepSize: 20,
          color: '#64748b',
          font: {
            size: 9
          },
          backdropColor: 'transparent'
        }
      }
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <Radar data={data} options={options} />
      </div>
      
      {/* Score display below chart */}
      <div className="mt-2 text-center">
        <div className="text-xl font-bold text-white">{idea.score}</div>
        <div className="text-xs text-slate-400">AI Score</div>
      </div>
    </div>
  );
};

export default RadialChart;