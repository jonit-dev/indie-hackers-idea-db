import React from 'react';
import { MicroSaasIdea } from '../types/idea';
import { TrendingUp, Clock, Users, Zap, Target, ExternalLink, DollarSign, Shield, TrendingDown, CheckCircle, Activity } from 'lucide-react';

interface IdeasTableProps {
  ideas: MicroSaasIdea[];
  onRowClick: (idea: MicroSaasIdea) => void;
}

const IdeasTable: React.FC<IdeasTableProps> = ({ ideas, onRowClick }) => {
  const getComplexityColor = (complexity: number) => {
    if (complexity <= 2) return 'text-green-400 bg-green-500/20 border-green-500/30';
    if (complexity <= 3) return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
    return 'text-red-400 bg-red-500/20 border-red-500/30';
  };

  const getOneKMrrChanceColor = (chance: string) => {
    switch (chance) {
      case 'H': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'M': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'L': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'Low': return 'text-green-400';
      case 'Med': return 'text-orange-400';
      case 'High': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getPlatformRiskColor = (risk: string) => {
    switch (risk) {
      case 'None': 
      case 'Low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Med': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'High': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getRevenuePotentialColor = (potential: string) => {
    switch (potential) {
      case 'H': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'M': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'L': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getMarketProofColor = (proof: string) => {
    return proof === 'Yes' ? 'text-green-400' : 'text-red-400';
  };

  const getPassivenessColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'B': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'C': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'D': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getMaintenanceColor = (hours: number) => {
    if (hours <= 5) return 'text-green-400';
    if (hours <= 10) return 'text-orange-400';
    return 'text-red-400';
  };

  if (ideas.length === 0) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="p-4 bg-slate-700 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <TrendingUp className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">No Ideas Found</h3>
          <p className="text-slate-400 font-medium">
            Try adjusting your search terms or filters to find more ideas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Niche
              </th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                MRR
              </th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Complexity
              </th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                MVP Days
              </th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                1k MRR
              </th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Competition
              </th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Platform Risk
              </th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Revenue Pot.
              </th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Market Proof
              </th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Passiveness
              </th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Maint (h/mo)
              </th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Score
              </th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                User
              </th>
            </tr>
          </thead>
          <tbody>
            {ideas.map((idea) => (
              <tr 
                key={idea.id} 
                className="border-b border-slate-700/30 hover:bg-slate-800/30 cursor-pointer transition-all duration-200 group"
                onClick={() => onRowClick(idea)}
              >
                <td className="py-3 px-4 max-w-xs">
                  <div className="flex flex-col">
                    <div className="font-semibold text-white text-sm mb-1 group-hover:text-purple-300 transition-colors flex items-center gap-2">
                      <span className="truncate">{idea.niche}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                    <div className="text-xs text-slate-400 line-clamp-2 mb-2">
                      {idea.rationale}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-500">{idea.pricing || '?'}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-500">{idea.channel}</span>
                    </div>
                  </div>
                </td>
                <td className="text-center py-3 px-3">
                  <div className="flex items-center justify-center gap-1">
                    <DollarSign className="w-3 h-3 text-green-400" />
                    <span className="text-white font-semibold text-sm">{idea.mrr.toLocaleString()}</span>
                  </div>
                </td>
                <td className="text-center py-3 px-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getComplexityColor(idea.complexity)}`}>
                    {idea.complexity}
                  </span>
                </td>
                <td className="text-center py-3 px-3">
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3 text-orange-400" />
                    <span className="text-white font-semibold text-sm">{idea.mvpWk}</span>
                    <span className="text-slate-500 text-xs">d</span>
                  </div>
                </td>
                <td className="text-center py-3 px-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getOneKMrrChanceColor(idea.oneKMrrChance)}`}>
                    {idea.oneKMrrChance}
                  </span>
                </td>
                <td className="text-center py-3 px-3">
                  <div className="flex items-center justify-center gap-1">
                    <Users className={`w-3 h-3 ${getCompetitionColor(idea.comp)}`} />
                    <span className={`font-semibold text-sm ${getCompetitionColor(idea.comp)}`}>
                      {idea.comp}
                    </span>
                  </div>
                </td>
                <td className="text-center py-3 px-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getPlatformRiskColor(idea.platDep)}`}>
                    {idea.platDep}
                  </span>
                </td>
                <td className="text-center py-3 px-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getRevenuePotentialColor(idea.revenuePotential)}`}>
                    {idea.revenuePotential}
                  </span>
                </td>
                <td className="text-center py-3 px-3">
                  <div className="flex items-center justify-center gap-1">
                    <CheckCircle className={`w-3 h-3 ${getMarketProofColor(idea.marketProof)}`} />
                    <span className={`font-semibold text-sm ${getMarketProofColor(idea.marketProof)}`}>
                      {idea.marketProof}
                    </span>
                  </div>
                </td>
                <td className="text-center py-3 px-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getPassivenessColor(idea.passiveness)}`}>
                    {idea.passiveness}
                  </span>
                </td>
                <td className="text-center py-3 px-3">
                  <div className="flex items-center justify-center gap-1">
                    <Activity className={`w-3 h-3 ${getMaintenanceColor(idea.maintHours)}`} />
                    <span className={`font-semibold text-sm ${getMaintenanceColor(idea.maintHours)}`}>
                      {idea.maintHours}
                    </span>
                  </div>
                </td>
                <td className="text-center py-3 px-3">
                  <div className="flex items-center justify-center gap-1">
                    <Target className={`w-3 h-3 ${getScoreColor(idea.score)}`} />
                    <span className={`font-bold text-sm ${getScoreColor(idea.score)}`}>
                      {idea.score}
                    </span>
                  </div>
                </td>
                <td className="text-center py-3 px-3">
                  <span className="text-slate-300 text-xs font-medium">
                    {idea.user}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IdeasTable;