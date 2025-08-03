import React from 'react';
import { MicroSaasIdea } from '../types/idea';

interface RadialChartProps {
  idea: MicroSaasIdea;
  size?: number;
  className?: string;
}

const RadialChart: React.FC<RadialChartProps> = ({ idea, size = 200, className = '' }) => {
  // Calculate metrics for the radial chart
  const getScoreValue = (score: number) => (score / 100) * 360;
  const getMrrValue = (mrr: number) => Math.min((mrr / 100000) * 360, 360); // Scale to 100k max
  const getComplexityValue = (complexity: string | number) => {
    const complexityNum = typeof complexity === 'string' ? parseInt(complexity) || 1 : complexity;
    return ((5 - complexityNum) / 4) * 360; // Invert so lower complexity = higher score
  };
  const getChanceValue = (chance: string) => {
    const chanceMap = { 'High': 0.9, 'Medium': 0.6, 'Low': 0.3, 'H': 0.9, 'M': 0.6, 'L': 0.3 };
    return (chanceMap[chance as keyof typeof chanceMap] || 0.5) * 360;
  };

  const metrics = [
    {
      label: 'Overall Score',
      value: getScoreValue(idea.score),
      color: '#8b5cf6', // purple-500
      percentage: idea.score
    },
    {
      label: 'Revenue Potential', 
      value: getMrrValue(idea.mrr),
      color: '#10b981', // emerald-500
      percentage: Math.min(Math.round((idea.mrr / 100000) * 100), 100)
    },
    {
      label: 'Build Ease',
      value: getComplexityValue(idea.complexity),
      color: '#f59e0b', // amber-500
      percentage: Math.round(((5 - (typeof idea.complexity === 'string' ? parseInt(idea.complexity) || 1 : idea.complexity)) / 4) * 100)
    },
    {
      label: '1K MRR Chance',
      value: getChanceValue(idea.oneKMrrChance),
      color: '#3b82f6', // blue-500
      percentage: Math.round((getChanceValue(idea.oneKMrrChance) / 360) * 100)
    }
  ];

  const radius = size / 2 - 20;
  const center = size / 2;
  const strokeWidth = 12;

  const createPath = (startAngle: number, endAngle: number, radius: number) => {
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circles */}
          {metrics.map((_, index) => (
            <circle
              key={`bg-${index}`}
              cx={center}
              cy={center}
              r={radius - (index * (strokeWidth + 4))}
              fill="none"
              stroke="rgba(148, 163, 184, 0.1)"
              strokeWidth={strokeWidth}
            />
          ))}
          
          {/* Progress arcs */}
          {metrics.map((metric, index) => (
            <path
              key={`arc-${index}`}
              d={createPath(0, metric.value)}
              fill="none"
              stroke={metric.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="drop-shadow-sm"
              style={{
                filter: `drop-shadow(0 0 8px ${metric.color}40)`
              }}
            />
          ))}
        </svg>
        
        {/* Center score */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{idea.score}</div>
            <div className="text-xs text-slate-400 font-medium">AI Score</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 mt-6 w-full max-w-sm">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: metric.color }}
            />
            <div className="flex-1">
              <div className="text-slate-300 font-medium">{metric.label}</div>
              <div className="text-slate-500 text-xs">{metric.percentage}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadialChart;