import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Brain, Star, BarChart3, MessageCircle } from 'lucide-react';
import { useMicroSaasStore } from '../stores/microSaasStore';
import RadialChart from '../components/RadialChart';

const IdeaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ideas } = useMicroSaasStore();
  
  const idea = ideas.find(i => i.id === id);
  
  if (!idea) {
    return (
      <div className="min-h-screen modern-typography" style={{ background: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-6 py-8">
          <div className="glass-card rounded-xl p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Idea Not Found</h1>
            <p className="text-slate-400 mb-6">The requested startup idea could not be found.</p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="btn-modern flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Intelligence Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getCompetitionColor = (comp: string) => {
    switch (comp.toLowerCase()) {
      case 'low': return 'text-green-400';
      case 'medium': case 'med': return 'text-orange-400';
      case 'high': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };


  const getChanceColor = (chance: string) => {
    switch (chance.toLowerCase()) {
      case 'high': case 'h': return 'text-green-400';
      case 'medium': case 'med': case 'm': return 'text-orange-400';
      case 'low': case 'l': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="min-h-screen modern-typography" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="glass-effect border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="p-2 glass-card rounded-lg hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-300" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-3 glass-card rounded-xl">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white heading-font gradient-text">
                    StartupIntel AI
                  </h1>
                  <p className="text-slate-300 text-sm font-medium">Opportunity Analysis</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 glass-card rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-300 font-medium">AI Analysis</span>
              </div>
              <button className="btn-modern flex items-center gap-2">
                <Star className="w-4 h-4" />
                Save Idea
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-2">
        {/* Single Header */}
        <div className="glass-card rounded-lg p-4 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                {idea.product_name ? (
                  <h1 className="text-xl font-bold text-white heading-font">{idea.product_name}</h1>
                ) : (
                  <h1 className="text-xl font-bold text-white heading-font">{idea.niche}</h1>
                )}
                <span className="px-2 py-1 bg-purple-500/20 rounded text-purple-300 text-xs border border-purple-500/30">
                  #{idea.id}
                </span>
                {idea.founder && (
                  <span className="px-2 py-1 bg-blue-500/20 rounded text-blue-300 text-xs border border-blue-500/30">
                    by {idea.founder}
                  </span>
                )}
                <a 
                  href={idea.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-semibold text-sm transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Original Source
                </a>
              </div>
              {idea.product_name && (
                <div className="mb-2">
                  <span className="px-2 py-1 bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-md">
                    {idea.niche}
                  </span>
                </div>
              )}
              <p className="text-slate-300 text-sm leading-relaxed pr-8">
                {idea.description || idea.rationale}
              </p>
            </div>
            
            {/* Metrics in header */}
            <div className="flex items-center gap-6 ml-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">${idea.mrr.toLocaleString()}</div>
                <div className="text-xs text-slate-400">MRR</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{idea.mvpWk}d</div>
                <div className="text-xs text-slate-400">MVP</div>
              </div>
              <div className="text-center">
                <div className={`text-xl font-bold ${getChanceColor(idea.oneKMrrChance)}`}>
                  {idea.oneKMrrChance}
                </div>
                <div className="text-xs text-slate-400">1K Chance</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-400">{idea.maintHours}h</div>
                <div className="text-xs text-slate-400">Maint</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Three Column Layout */}
        <div className="grid grid-cols-3 gap-4">
          {/* Left Column - Chart */}
          <div className="space-y-4">
            <div className="glass-card rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-semibold text-white">Metrics Analysis</h3>
              </div>
              <div className="flex justify-center">
                <RadialChart idea={idea} size={160} />
              </div>
            </div>
            
            {/* Product Information */}
            {(idea.description || idea.product_name || idea.founder) && (
              <div className="glass-card rounded-lg p-3">
                <h3 className="text-xs font-semibold text-white mb-2">Product Information</h3>
                <div className="space-y-2">
                  {idea.product_name && (
                    <div>
                      <span className="text-xs text-slate-400">Product Name:</span>
                      <div className="text-sm font-medium text-white mt-1">{idea.product_name}</div>
                    </div>
                  )}
                  {idea.founder && (
                    <div>
                      <span className="text-xs text-slate-400">Founder:</span>
                      <div className="text-sm font-medium text-blue-300 mt-1">{idea.founder}</div>
                    </div>
                  )}
                  {idea.description && (
                    <div>
                      <span className="text-xs text-slate-400">Description:</span>
                      <div className="text-xs text-slate-300 mt-1 leading-relaxed">{idea.description}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Middle Column - Key Metrics */}
          <div className="space-y-4">
            <div className="glass-card rounded-lg p-3">
              <h3 className="text-xs font-semibold text-white mb-2">Business Metrics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">MRR</span>
                  <span className="text-xs font-medium text-green-400">${idea.mrr.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Pricing</span>
                  <span className="text-xs font-medium text-white">{idea.pricing || '?'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Target Users</span>
                  <span className="text-xs font-medium text-white">{idea.user}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Channel</span>
                  <span className="text-xs font-medium text-white">{idea.channel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Competition</span>
                  <span className={`text-xs font-medium ${getCompetitionColor(idea.comp)}`}>{idea.comp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Market Proof</span>
                  <span className={`text-xs font-medium ${idea.marketProof === 'Yes' ? 'text-green-400' : 'text-red-400'}`}>
                    {idea.marketProof}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-lg p-3">
              <h3 className="text-xs font-semibold text-white mb-2">Build & Operations</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Complexity</span>
                  <span className="text-xs font-medium text-white">{idea.complexity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">MVP Days</span>
                  <span className="text-xs font-medium text-orange-400">{idea.mvpWk}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Maintenance (h/mo)</span>
                  <span className="text-xs font-medium text-purple-400">{idea.maintHours}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Passiveness</span>
                  <span className="text-xs font-medium text-white">{idea.passiveness}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Platform Risk</span>
                  <span className="text-xs font-medium text-white">{idea.platDep}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Legal Risk</span>
                  <span className="text-xs font-medium text-white">{idea.legalRisk}</span>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-lg p-3">
              <h3 className="text-xs font-semibold text-white mb-2">Success Indicators</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">1K MRR Chance</span>
                  <span className={`text-xs font-medium ${getChanceColor(idea.oneKMrrChance)}`}>{idea.oneKMrrChance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Revenue Potential</span>
                  <span className="text-xs font-medium text-white">{idea.revenuePotential}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Distribution Fit</span>
                  <span className="text-xs font-medium text-white">{idea.distFit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Churn</span>
                  <span className="text-xs font-medium text-white">{idea.churn}</span>
                </div>
                {idea.dateAdded && (
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-400">Date Added</span>
                    <span className="text-xs font-medium text-slate-300">{idea.dateAdded}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column - Analysis & Community */}
          <div className="space-y-4">
            {/* AI Analysis Rationale */}
            <div className="glass-card rounded-lg p-3">
              <h3 className="text-xs font-semibold text-white mb-2">AI Analysis Rationale</h3>
              <div className="text-xs text-slate-300 leading-relaxed">
                {idea.rationale}
              </div>
              <div className="mt-3 pt-2 border-t border-slate-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Overall Score</span>
                  <span className="text-lg font-bold text-purple-400">{idea.score}/100</span>
                </div>
              </div>
            </div>
            
            {/* Source Information - Prominent */}
            <div className="glass-card rounded-lg p-4 border-2 border-blue-500/30">
              <div className="flex items-center gap-2 mb-3">
                <ExternalLink className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-semibold text-white">Original Source</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-xs text-slate-400">Platform:</span>
                  <div className="text-sm font-medium text-white mt-1">{idea.source}</div>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Original Post:</span>
                  <div className="mt-1">
                    <a 
                      href={idea.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-semibold text-sm transition-all shadow-lg hover:shadow-xl transform hover:scale-105 w-full justify-center"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Read Full Details on {idea.source}
                    </a>
                  </div>
                </div>
                <div className="text-xs text-slate-400 bg-slate-800/50 rounded p-2">
                  <span className="font-medium">URL:</span> {idea.url}
                </div>
              </div>
            </div>
            
            {/* Community Discussion */}
            <div className="glass-card rounded-lg p-3">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-semibold text-white">Community Discussion</h3>
                <div className="flex items-center gap-1 ml-auto">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-300">8 active</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                    S
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-white">Sarah</span>
                      <span className="text-xs text-green-400 px-1.5 py-0.5 bg-green-500/20 rounded text-xs">Building</span>
                    </div>
                    <p className="text-xs text-slate-300">Already at $2K MRR! The AI risk assessment was spot on.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                    M
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-white">Marcus</span>
                      <span className="text-xs text-orange-400 px-1.5 py-0.5 bg-orange-500/20 rounded text-xs">Researching</span>
                    </div>
                    <p className="text-xs text-slate-300">Competition seems fiercer than AI analysis suggests.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-slate-700/50 space-y-2">
                <button className="w-full px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg text-blue-400 font-medium text-xs transition-colors">
                  Join Discussion
                </button>
                
                <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-2 border border-purple-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-purple-300 font-medium">Unlock Full Community</div>
                      <div className="text-xs text-slate-400">Private channels, expert mentorship</div>
                    </div>
                    <button 
                      onClick={() => navigate('/pricing')}
                      className="px-2 py-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded text-white font-medium text-xs transition-all"
                    >
                      Upgrade
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IdeaDetail;