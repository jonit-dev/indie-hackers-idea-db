import React from 'react';
import { IndieHackerIdea } from '../types/idea';
import { TrendingUp, Clock, Users, Zap, Target, ExternalLink } from 'lucide-react';

interface IdeasTableProps {
  ideas: IndieHackerIdea[];
  onRowClick: (idea: IndieHackerIdea) => void;
}

const IdeasTable: React.FC<IdeasTableProps> = ({ ideas, onRowClick }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Medium': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'Hard': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Launched': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'In Progress': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'Abandoned': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-orange-400';
      case 'High': return 'text-red-400';
      default: return 'text-slate-400';
    }
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
                Idea
              </th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Category
              </th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Market
              </th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Time
              </th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Competition
              </th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Upvotes
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
                      <span className="truncate">{idea.title}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                    <div className="text-xs text-slate-400 line-clamp-2 mb-2">
                      {idea.description}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {idea.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 bg-slate-700/40 text-slate-300 text-xs rounded border border-slate-600/30">
                          {tag}
                        </span>
                      ))}
                      {idea.tags.length > 2 && (
                        <span className="px-1.5 py-0.5 bg-slate-600/30 text-slate-400 text-xs rounded">
                          +{idea.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="text-center py-3 px-3">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {idea.category}
                  </span>
                </td>
                <td className="text-center py-3 px-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(idea.difficulty)}`}>
                    {idea.difficulty}
                  </span>
                </td>
                <td className="text-center py-3 px-3">
                  <div className="flex items-center justify-center gap-1">
                    <TrendingUp className="w-3 h-3 text-blue-400" />
                    <span className="text-white font-semibold text-sm">{idea.marketPotential}</span>
                    <span className="text-slate-500 text-xs">/10</span>
                  </div>
                </td>
                <td className="text-center py-3 px-3">
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3 text-orange-400" />
                    <span className="text-white font-semibold text-sm">{idea.timeToMarket}</span>
                    <span className="text-slate-500 text-xs">w</span>
                  </div>
                </td>
                <td className="text-center py-3 px-3">
                  <div className="flex items-center justify-center gap-1">
                    <Users className={`w-3 h-3 ${getCompetitionColor(idea.competition)}`} />
                    <span className={`font-semibold text-sm ${getCompetitionColor(idea.competition)}`}>
                      {idea.competition}
                    </span>
                  </div>
                </td>
                <td className="text-center py-3 px-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(idea.status)}`}>
                    {idea.status}
                  </span>
                </td>
                <td className="text-center py-3 px-3">
                  <div className="flex items-center justify-center gap-1">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span className="text-white font-bold text-sm">{idea.upvotes}</span>
                  </div>
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