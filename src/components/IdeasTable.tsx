import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MicroSaasIdea } from '../types/idea';
import { TrendingUp, Clock, Users, Zap, Target, ExternalLink, DollarSign, Shield, TrendingDown, CheckCircle, Activity, HelpCircle, ChevronUp, ChevronDown, Brain } from 'lucide-react';

interface IdeasTableProps {
  ideas: MicroSaasIdea[];
  onRowClick: (idea: MicroSaasIdea) => void;
}

type SortField = keyof MicroSaasIdea;
type SortDirection = 'asc' | 'desc' | null;

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setPosition({
          x: rect.left + rect.width / 2,
          y: rect.top - 8
        });
      }
    };

    if (isVisible) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
    }

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isVisible]);

  const tooltip = isVisible && (
    <div
      className="fixed px-3 py-2 bg-slate-900 text-white text-xs rounded-lg shadow-lg border border-slate-600 whitespace-nowrap pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%)',
        zIndex: 9999
      }}
    >
      {text}
      <div 
        className="absolute border-4 border-transparent border-t-slate-900"
        style={{
          left: '50%',
          top: '100%',
          transform: 'translateX(-50%)'
        }}
      />
    </div>
  );

  return (
    <>
      <div
        ref={triggerRef}
        className="inline-block"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {typeof document !== 'undefined' && createPortal(tooltip, document.body)}
    </>
  );
};

const IdeasTable: React.FC<IdeasTableProps> = ({ ideas, onRowClick }) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedIdeas = React.useMemo(() => {
    if (!sortField || !sortDirection) return ideas;

    return [...ideas].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortDirection === 'asc' ? 1 : -1;
      if (bValue == null) return sortDirection === 'asc' ? -1 : 1;

      // Handle numeric values
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Handle string values
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      
      if (aStr < bStr) return sortDirection === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [ideas, sortField, sortDirection]);

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    if (sortDirection === 'asc') return <ChevronUp className="w-3 h-3" />;
    if (sortDirection === 'desc') return <ChevronDown className="w-3 h-3" />;
    return null;
  };

  const SortableHeader: React.FC<{ field: SortField; children: React.ReactNode; className?: string }> = ({ 
    field, 
    children, 
    className = "text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider" 
  }) => (
    <th 
      className={`${className} cursor-pointer hover:text-slate-300 transition-colors select-none`}
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        {getSortIcon(field)}
      </div>
    </th>
  );
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

  const isAIRelated = (idea: MicroSaasIdea) => {
    const searchText = `${idea.niche} ${idea.rationale}`.toLowerCase();
    return searchText.includes('ai ') || 
           searchText.includes('artificial intelligence') ||
           searchText.includes('machine learning') ||
           searchText.includes('ml ') ||
           searchText.includes('chatbot') ||
           searchText.includes('gpt') ||
           searchText.includes('llm') ||
           searchText.includes('ai-') ||
           searchText.includes('automation') ||
           searchText.includes('intelligent') ||
           searchText.includes('smart ') ||
           searchText.includes('neural') ||
           searchText.includes('deep learning');
  };

  if (sortedIdeas.length === 0) {
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
        <table className="w-full min-w-[1200px]">
          <thead>
            <tr className="border-b border-slate-700/50">
              <SortableHeader field="niche" className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider w-80">
                <Tooltip text="Product domain/market niche (e.g. SEO, HR, DevTools)">
                  <div className="flex items-center gap-1 cursor-help">
                    Niche
                    <HelpCircle className="w-3 h-3 opacity-60" />
                  </div>
                </Tooltip>
              </SortableHeader>
              <SortableHeader field="mrr" className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-24">
                <Tooltip text="Monthly Recurring Revenue in USD">
                  <div className="flex items-center gap-1 cursor-help justify-center">
                    MRR
                    <HelpCircle className="w-3 h-3 opacity-60" />
                  </div>
                </Tooltip>
              </SortableHeader>
              <SortableHeader field="complexity" className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-20">
                <Tooltip text="Build complexity (1 = trivial, 5 = hard R&D)">
                  <div className="flex items-center gap-1 cursor-help justify-center">
                    Complexity
                    <HelpCircle className="w-3 h-3 opacity-60" />
                  </div>
                </Tooltip>
              </SortableHeader>
              <SortableHeader field="mvpWk" className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-20">
                <Tooltip text="Days to build MVP (target ≤ 7)">
                  <div className="flex items-center gap-1 cursor-help justify-center">
                    MVP Days
                    <HelpCircle className="w-3 h-3 opacity-60" />
                  </div>
                </Tooltip>
              </SortableHeader>
              <SortableHeader field="oneKMrrChance" className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-20">
                <Tooltip text="Likelihood to hit ≥ $1k MRR in 6-12 months (H/M/L)">
                  <div className="flex items-center gap-1 cursor-help justify-center">
                    1k MRR
                    <HelpCircle className="w-3 h-3 opacity-60" />
                  </div>
                </Tooltip>
              </SortableHeader>
              <SortableHeader field="comp" className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-24">
                <Tooltip text="Competitive intensity in the market">
                  <div className="flex items-center gap-1 cursor-help justify-center">
                    Competition
                    <HelpCircle className="w-3 h-3 opacity-60" />
                  </div>
                </Tooltip>
              </SortableHeader>
              <SortableHeader field="platDep" className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-24">
                <Tooltip text="Platform-dependence risk (None/Low/Med/High)">
                  <div className="flex items-center gap-1 cursor-help justify-center">
                    Platform Risk
                    <HelpCircle className="w-3 h-3 opacity-60" />
                  </div>
                </Tooltip>
              </SortableHeader>
              <SortableHeader field="revenuePotential" className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-24">
                <Tooltip text="Revenue potential assessment (H/M/L)">
                  <div className="flex items-center gap-1 cursor-help justify-center">
                    Revenue Pot.
                    <HelpCircle className="w-3 h-3 opacity-60" />
                  </div>
                </Tooltip>
              </SortableHeader>
              <SortableHeader field="marketProof" className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-24">
                <Tooltip text="At least one indie hits ≥ 30k MRR in same niche">
                  <div className="flex items-center gap-1 cursor-help justify-center">
                    Market Proof
                    <HelpCircle className="w-3 h-3 opacity-60" />
                  </div>
                </Tooltip>
              </SortableHeader>
              <SortableHeader field="passiveness" className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-20">
                <Tooltip text="Passiveness grade (A = highly passive, D = hands-on)">
                  <div className="flex items-center gap-1 cursor-help justify-center">
                    Passiveness
                    <HelpCircle className="w-3 h-3 opacity-60" />
                  </div>
                </Tooltip>
              </SortableHeader>
              <SortableHeader field="maintHours" className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-24">
                <Tooltip text="Monthly maintenance hours (goal ≤ 10)">
                  <div className="flex items-center gap-1 cursor-help justify-center">
                    Maint (h/mo)
                    <HelpCircle className="w-3 h-3 opacity-60" />
                  </div>
                </Tooltip>
              </SortableHeader>
              <SortableHeader field="score" className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-20">
                <Tooltip text="Overall attractiveness score (0-100)">
                  <div className="flex items-center gap-1 cursor-help justify-center">
                    Score
                    <HelpCircle className="w-3 h-3 opacity-60" />
                  </div>
                </Tooltip>
              </SortableHeader>
              <SortableHeader field="user" className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-24">
                <Tooltip text="Primary target user persona">
                  <div className="flex items-center gap-1 cursor-help justify-center">
                    User
                    <HelpCircle className="w-3 h-3 opacity-60" />
                  </div>
                </Tooltip>
              </SortableHeader>
            </tr>
          </thead>
          <tbody>
            {sortedIdeas.map((idea) => (
              <tr 
                key={idea.id} 
                className="border-b border-slate-700/30 hover:bg-slate-800/30 cursor-pointer transition-all duration-200 group"
                onClick={() => onRowClick(idea)}
              >
                <td className="py-3 px-4 w-80">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-md truncate">
                        {idea.niche}
                      </span>
                      {isAIRelated(idea) && (
                        <span className="px-1.5 py-0.5 bg-cyan-600/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold rounded flex items-center gap-1">
                          <Brain className="w-3 h-3" />
                          AI
                        </span>
                      )}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-slate-400" />
                    </div>
                    <div className="text-xs text-slate-300 line-clamp-2 mb-2 leading-relaxed">
                      {idea.rationale}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 bg-green-600/20 border border-green-500/30 text-green-300 rounded font-medium">
                        {idea.pricing || '?'}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400 font-medium">{idea.channel}</span>
                    </div>
                  </div>
                </td>
                <td className="text-center py-3 px-3">
                  <div className="flex items-center justify-center gap-1">
                    <DollarSign className="w-3 h-3 text-green-400" />
                    <span className="text-green-300 font-bold text-sm bg-green-600/10 px-2 py-1 rounded border border-green-600/20">
                      ${idea.mrr.toLocaleString()}
                    </span>
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
                    <span className="text-orange-300 font-bold text-sm bg-orange-600/10 px-2 py-1 rounded border border-orange-600/20">
                      {idea.mvpWk}d
                    </span>
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
                    <span className={`font-bold text-sm px-2 py-1 rounded border ${getScoreColor(idea.score)} ${
                      idea.score >= 80 ? 'bg-green-600/10 border-green-600/20' :
                      idea.score >= 60 ? 'bg-orange-600/10 border-orange-600/20' :
                      'bg-red-600/10 border-red-600/20'
                    }`}>
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