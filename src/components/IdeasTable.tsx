import { Activity, Brain, CheckCircle, ChevronDown, ChevronUp, Clock, DollarSign, ExternalLink, Heart, HelpCircle, TrendingUp, Users } from 'lucide-react';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMicroSaasStore } from '../stores/microSaasStore';
import { MicroSaasIdea } from '../types/idea';
import ScoreRing from './ScoreRing';

// Infrastructure SVG Icons
const SupabaseIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M21.362 9.354H12V.396a.395.395 0 0 0-.716-.233L2.203 12.424l-.005.007a.5.5 0 0 0 .362.848h9.36v8.958a.395.395 0 0 0 .716.233l9.081-12.261.005-.007a.5.5 0 0 0-.36-.848Z"/>
  </svg>
);

const CloudflareIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.815 10.043h-.054c-.052 0-.095.02-.134.051a.135.135 0 0 0-.054.11v.011c0 .061.033.116.087.134.042.015.096.024.147.024h.008c.051 0 .105-.009.147-.024a.157.157 0 0 0 .087-.134v-.011a.135.135 0 0 0-.054-.11.152.152 0 0 0-.134-.051h-.046zM23.999 15.724s-.01.021-.027.051c-.118.303-.408.513-.737.513H5.347c-.33 0-.62-.21-.738-.513-.016-.03-.026-.051-.026-.051l-.001-.004c-.01-.024-.015-.05-.015-.077 0-.027.005-.053.015-.077l.001-.004s.01-.021.026-.051c.118-.303.408-.513.738-.513h17.888c.329 0 .619.21.737.513.017.03.027.051.027.051l.001.004c.01.024.015.05.015.077 0 .027-.005.053-.015.077l-.001.004z"/>
  </svg>
);

const DatabaseIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);

interface IdeasTableProps {

  ideas: MicroSaasIdea[];
  onRowClick: (idea: MicroSaasIdea) => void;
}


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

const IdeasTable: React.FC<IdeasTableProps> = memo(({ ideas, onRowClick }) => {
  const { sortBy, sortOrder, setSortBy, setSortOrder, toggleFavorite, isFavorite } = useMicroSaasStore();

  const handleSort = (field: string) => {
    if (sortBy === field) {
      // Toggle sort order if same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field with descending order (default for most fields)
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const memoizedIsAIRelated = useMemo(() => {
    const cache = new Map<string, boolean>();
    return (idea: MicroSaasIdea) => {
      const key = `${idea.niche}-${idea.rationale}`;
      if (!cache.has(key)) {
        const searchText = `${idea.niche} ${idea.rationale}`.toLowerCase();
        const result = searchText.includes('ai ') ||
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
        cache.set(key, result);
      }
      return cache.get(key)!;
    };
  }, []);

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return null;
    if (sortOrder === 'asc') return <ChevronUp className="w-3 h-3" />;
    if (sortOrder === 'desc') return <ChevronDown className="w-3 h-3" />;
    return null;
  };

  const SortableHeader: React.FC<{ field: string; children: React.ReactNode; className?: string }> = ({
    field,
    children,
    className = "text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider"
  }) => (
    <th
      className={`${className} cursor-pointer hover:text-slate-300 transition-colors select-none`}
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1 justify-center">
        {children}
        {getSortIcon(field)}
      </div>
    </th>
  );
  const getComplexityColor = (complexity: string | number) => {
    const complexityStr = complexity.toString();
    switch (complexityStr) {
      case '1':
      case 'Very Low':
      case 'Low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case '2':
      case '3':
      case 'Medium': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case '4':
      case '5':
      case 'High':
      case 'Very High': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getOneKMrrChanceColor = (chance: string) => {
    switch (chance) {
      case 'Very High':
      case 'High': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Medium': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'Low': return 'text-red-400 bg-red-500/20 border-red-500/30';
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getPlatformRiskColor = (risk: string) => {
    switch (risk) {
      case 'None':
      case 'Low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Medium': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'High': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getRevenuePotentialColor = (potential: string) => {
    switch (potential) {
      case 'High': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Medium': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'Low': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getMarketProofColor = (proof: string) => {
    return proof === 'Yes' ? 'text-green-400' : 'text-red-400';
  };

  const getPassivenessColor = (grade: string) => {
    switch (grade) {
      case 'Very High': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'High': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'Medium': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'Low': return 'text-red-400 bg-red-500/20 border-red-500/30';
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
    <div className="table-container">
      <table className="table-modern">
        <thead>
          <tr className="border-b border-slate-700/50">
            <th
              className="text-left py-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-80 cursor-pointer hover:text-slate-300 transition-colors select-none"
              onClick={() => handleSort('niche')}
            >
              <div className="flex items-center gap-1">
                <Tooltip text="Product domain/market niche (e.g. SEO, HR, DevTools)">
                  <div className="flex items-center gap-1 cursor-help">
                    Niche
                    <HelpCircle className="w-3 h-3 opacity-60" />
                  </div>
                </Tooltip>
                {getSortIcon('niche')}
              </div>
            </th>
            <SortableHeader field="score" className="text-center py-2 px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider w-16">
              <Tooltip text="Overall attractiveness score (0-100)">
                <div className="flex items-center gap-1 cursor-help justify-center">
                  Score
                  <HelpCircle className="w-3 h-3 opacity-60" />
                </div>
              </Tooltip>
            </SortableHeader>
            <SortableHeader field="mrr" className="text-center py-2 px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider w-20">
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
              <Tooltip text="Weeks to build MVP (target ≤ 7)">
                <div className="flex items-center gap-1 cursor-help justify-center">
                  MVP Weeks
                  <HelpCircle className="w-3 h-3 opacity-60" />
                </div>
              </Tooltip>
            </SortableHeader>
            <SortableHeader field="oneKMrrChance" className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-20">
              <Tooltip text="Likelihood to hit ≥ $1k MRR in 6-12 months (H/M/L)">
                <div className="flex items-center gap-1 cursor-help justify-center">
                  1k MRR Chance
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
              <Tooltip text="Revenue potential assessment (High/Medium/Low)">
                <div className="flex items-center gap-1 cursor-help justify-center">
                  Rev. Potential
                  <HelpCircle className="w-3 h-3 opacity-60" />
                </div>
              </Tooltip>
            </SortableHeader>
            <SortableHeader field="marketProof" className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-24">
              <Tooltip text="At least one indie hits ≥ 30k MRR in same niche">
                <div className="flex items-center gap-1 cursor-help justify-center">
                  Market Validation
                  <HelpCircle className="w-3 h-3 opacity-60" />
                </div>
              </Tooltip>
            </SortableHeader>
            <SortableHeader field="passiveness" className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-20">
              <Tooltip text="Passiveness grade (Very High = highly passive, Low = hands-on)">
                <div className="flex items-center gap-1 cursor-help justify-center">
                  Passiveness
                  <HelpCircle className="w-3 h-3 opacity-60" />
                </div>
              </Tooltip>
            </SortableHeader>
            <SortableHeader field="maintHours" className="text-center py-2 px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider w-16">
              <Tooltip text="Monthly maintenance hours (goal ≤ 10)">
                <div className="flex items-center gap-1 cursor-help justify-center">
                  Maintenance
                  <HelpCircle className="w-3 h-3 opacity-60" />
                </div>
              </Tooltip>
            </SortableHeader>
            <SortableHeader field="user" className="text-center py-2 px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider w-20">
              <Tooltip text="Primary target market/user persona">
                <div className="flex items-center gap-1 cursor-help justify-center">
                  Target
                  <HelpCircle className="w-3 h-3 opacity-60" />
                </div>
              </Tooltip>
            </SortableHeader>
            <th className="text-center py-2 px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider w-24">
              <Tooltip text="Infrastructure compatibility: Supabase-only, Edge Stack (Supabase + CF Workers), or Complex setup">
                <div className="flex items-center gap-1 cursor-help justify-center">
                  Infrastructure
                  <HelpCircle className="w-3 h-3 opacity-60" />
                </div>
              </Tooltip>
            </th>
          </tr>
        </thead>
        <tbody>
          {ideas.map((idea) => {
            const isIdeaFavorite = isFavorite(idea.id);
            return (
            <tr
              key={idea.id}
              className={`table-row-modern group ${isIdeaFavorite ? 'bg-amber-500/10' : ''}`}
              style={isIdeaFavorite ? { boxShadow: 'inset 4px 0 0 0 rgb(251 191 36)' } : {}}
              onClick={() => onRowClick(idea)}
            >
              <td className="py-2 px-3 w-80">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-md truncate">
                      {idea.niche}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(idea.id);
                      }}
                      className={`p-1 rounded transition-all duration-200 ${
                        isIdeaFavorite 
                          ? 'text-amber-400 hover:text-amber-500' 
                          : 'text-slate-500 hover:text-amber-400'
                      }`}
                      title={isIdeaFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart 
                        className={`w-4 h-4 ${
                          isIdeaFavorite 
                            ? 'fill-amber-400' 
                            : ''
                        }`} 
                      />
                    </button>
                    {memoizedIsAIRelated(idea) && (
                      <span className="px-1.5 py-0.5 bg-cyan-600/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold rounded flex items-center gap-1">
                        <Brain className="w-3 h-3" />
                        AI
                      </span>
                    )}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-slate-400" />
                  </div>
                  {/* Product Name */}
                  {idea.productName && (
                    <div className="mb-1">
                      <span className="text-sm font-semibold text-white">
                        {idea.productName}
                      </span>
                      {idea.founder && (
                        <span className="ml-2 text-xs text-slate-400">
                          by {idea.founder}
                        </span>
                      )}
                    </div>
                  )}
                  {/* Description or Rationale */}
                  <div className="text-xs text-slate-300 line-clamp-1 mb-1 leading-relaxed">
                    {idea.description || idea.rationale}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-1.5 py-0.5 bg-green-600/20 border border-green-500/30 text-green-300 rounded font-medium">
                      {idea.pricing || '?'}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400 font-medium">{idea.channel}</span>
                  </div>
                </div>
              </td>
              <td className="text-center py-2 px-2">
                <div className="flex items-center justify-center">
                  <ScoreRing score={idea.score} size={40} className="animate-scale-in" />
                </div>
              </td>
              <td className="text-center py-2 px-2">
                <div className="flex items-center justify-center gap-1">
                  <DollarSign className="w-3 h-3 text-green-400" />
                  <span className="score-badge text-xs">
                    ${idea.mrr.toLocaleString()}
                  </span>
                </div>
              </td>
              <td className="text-center py-2 px-2">
                <span className={`px-1.5 py-0.5 rounded text-xs font-medium border ${getComplexityColor(idea.complexity)}`}>
                  {idea.complexity}
                </span>
              </td>
              <td className="text-center py-2 px-2">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3 text-orange-400" />
                  <span className="text-orange-300 font-semibold text-xs">
                    {idea.mvpWk}w
                  </span>
                </div>
              </td>
              <td className="text-center py-2 px-2">
                <span className={`px-1.5 py-0.5 rounded text-xs font-medium border ${getOneKMrrChanceColor(idea.oneKMrrChance)}`}>
                  {idea.oneKMrrChance}
                </span>
              </td>
              <td className="text-center py-2 px-2">
                <div className="flex items-center justify-center gap-1">
                  <Users className={`w-3 h-3 ${getCompetitionColor(idea.comp)}`} />
                  <span className={`font-semibold text-xs ${getCompetitionColor(idea.comp)}`}>
                    {idea.comp}
                  </span>
                </div>
              </td>
              <td className="text-center py-2 px-2">
                <span className={`px-1.5 py-0.5 rounded text-xs font-medium border ${getPlatformRiskColor(idea.platDep)}`}>
                  {idea.platDep}
                </span>
              </td>
              <td className="text-center py-2 px-2">
                <span className={`px-1.5 py-0.5 rounded text-xs font-medium border ${getRevenuePotentialColor(idea.revenuePotential)}`}>
                  {idea.revenuePotential}
                </span>
              </td>
              <td className="text-center py-2 px-2">
                <div className="flex items-center justify-center gap-1">
                  <CheckCircle className={`w-3 h-3 ${getMarketProofColor(idea.marketProof)}`} />
                  <span className={`font-semibold text-xs ${getMarketProofColor(idea.marketProof)}`}>
                    {idea.marketProof}
                  </span>
                </div>
              </td>
              <td className="text-center py-2 px-2">
                <span className={`px-1.5 py-0.5 rounded text-xs font-medium border ${getPassivenessColor(idea.passiveness)}`}>
                  {idea.passiveness}
                </span>
              </td>
              <td className="text-center py-2 px-2">
                <div className="flex items-center justify-center gap-1">
                  <Activity className={`w-3 h-3 ${getMaintenanceColor(idea.maintHours)}`} />
                  <span className={`font-semibold text-xs ${getMaintenanceColor(idea.maintHours)}`}>
                    {idea.maintHours}
                  </span>
                </div>
              </td>
              <td className="text-center py-2 px-2">
                <span className="text-slate-300 text-xs font-medium">
                  {idea.user}
                </span>
              </td>
              <td className="text-center py-2 px-2">
                <div className="flex items-center justify-center gap-1">
                  {idea.canSupabaseOnly ? (
                    <Tooltip text="Can run entirely on Supabase backend">
                      <div className="flex items-center gap-1">
                        <SupabaseIcon className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-xs font-medium">SB</span>
                      </div>
                    </Tooltip>
                  ) : idea.canSupaEdgeStack ? (
                    <Tooltip text="Can run on Supabase + Cloudflare Workers edge stack">
                      <div className="flex items-center gap-1">
                        <SupabaseIcon className="w-3 h-3 text-blue-400" />
                        <CloudflareIcon className="w-3 h-3 text-orange-400" />
                        <span className="text-blue-400 text-xs font-medium">Edge</span>
                      </div>
                    </Tooltip>
                  ) : (
                    <Tooltip text="Requires complex infrastructure setup">
                      <div className="flex items-center gap-1">
                        <DatabaseIcon className="w-4 h-4 text-red-400" />
                        <span className="text-red-400 text-xs font-medium">Complex</span>
                      </div>
                    </Tooltip>
                  )}
                </div>
              </td>
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

IdeasTable.displayName = 'IdeasTable';

export default IdeasTable;
