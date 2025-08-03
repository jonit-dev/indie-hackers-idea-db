import React, { useEffect, useState } from 'react';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const ScoreRing: React.FC<ScoreRingProps> = ({ 
  score, 
  size = 60, 
  strokeWidth = 4,
  className = ""
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  // Generate unique IDs for gradients to avoid conflicts
  const uniqueId = React.useId();
  const successGradientId = `successGradient-${uniqueId}`;
  const warningGradientId = `warningGradient-${uniqueId}`;
  const errorGradientId = `errorGradient-${uniqueId}`;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [score]);
  
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedScore / 100) * circumference;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981"; // green
    if (score >= 60) return "#f59e0b"; // orange
    return "#ef4444"; // red
  };
  
  const getScoreTextColor = (score: number) => {
    if (score >= 80) return "text-green-400"; // green
    if (score >= 60) return "text-orange-400"; // orange
    return "text-red-400"; // red
  };
  
  const getScoreGradient = (score: number) => {
    if (score >= 80) return `url(#${successGradientId})`;
    if (score >= 60) return `url(#${warningGradientId})`;
    return `url(#${errorGradientId})`;
  };
  
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id={successGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id={warningGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id={errorGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(148, 163, 184, 0.2)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getScoreGradient(score)}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 6px ${getScoreColor(score)}30)`
          }}
        />
      </svg>
      
      {/* Score text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-sm font-bold ${getScoreTextColor(score)}`}>
          {Math.round(animatedScore)}
        </span>
      </div>
      
      {/* Subtle pulse animation for high scores */}
      {score >= 80 && (
        <div 
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle, ${getScoreColor(score)}15 0%, transparent 70%)`
          }}
        />
      )}
    </div>
  );
};

export default ScoreRing;