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

      <div className="container mx-auto px-6 py-6">
        {/* Top Section - Header and Performance Analysis */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* Main Header - 75% (3 columns) */}
          <div className="col-span-3">
            <div className="glass-card rounded-xl p-4 h-full">
              <div className="flex items-center gap-3 mb-3">
                {idea.product_name ? (
                  <h1 className="text-2xl font-bold text-white heading-font">{idea.product_name}</h1>
                ) : (
                  <h1 className="text-2xl font-bold text-white heading-font">{idea.niche}</h1>
                )}
                <span className="px-2 py-1 bg-purple-500/20 rounded text-purple-300 text-xs border border-purple-500/30">
                  #{idea.id}
                </span>
                {idea.founder && (
                  <span className="px-2 py-1 bg-blue-500/20 rounded text-blue-300 text-xs border border-blue-500/30">
                    by {idea.founder}
                  </span>
                )}
              </div>
              
              {idea.product_name && (
                <div className="mb-3">
                  <span className="px-2 py-1 bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded">
                    {idea.niche}
                  </span>
                </div>
              )}
              
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                {idea.description || idea.rationale}
              </p>
              
              <a 
                href={idea.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded text-white font-medium transition-all text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                View Original Source
              </a>
            </div>
          </div>
          
          {/* Performance Analysis - 25% (1 column) */}
          <div className="col-span-1">
            <div className="glass-card rounded-xl p-3 h-full">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-bold text-white">Performance</h3>
              </div>
              <div className="flex justify-center">
                <RadialChart idea={idea} size={280} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Analytics & Metrics */}
          <div className="space-y-6">
            {/* Business Metrics */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Business Metrics</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="text-sm text-slate-400 block mb-2">Revenue Model</span>
                  <span className="text-base font-semibold text-white">{idea.pricing || 'Unknown'}</span>
                </div>
                <div>
                  <span className="text-sm text-slate-400 block mb-2">Target Users</span>
                  <span className="text-base font-semibold text-white">{idea.user}</span>
                </div>
                <div>
                  <span className="text-sm text-slate-400 block mb-2">Distribution Channel</span>
                  <span className="text-base font-semibold text-white">{idea.channel}</span>
                </div>
                <div>
                  <span className="text-sm text-slate-400 block mb-2">Competition Level</span>
                  <span className={`text-base font-semibold ${getCompetitionColor(idea.comp)}`}>{idea.comp}</span>
                </div>
                <div>
                  <span className="text-sm text-slate-400 block mb-2">Market Validation</span>
                  <span className={`text-base font-semibold ${idea.marketProof === 'Yes' ? 'text-green-400' : 'text-red-400'}`}>
                    {idea.marketProof}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-slate-400 block mb-2">Maintenance Hours/mo</span>
                  <span className="text-base font-semibold text-purple-400">{idea.maintHours}h</span>
                </div>
              </div>
            </div>
            
            {/* Build & Risk Assessment */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Build & Risk Assessment</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="text-sm text-slate-400 block mb-2">Build Complexity</span>
                  <span className="text-base font-semibold text-white">{idea.complexity}/5</span>
                </div>
                <div>
                  <span className="text-sm text-slate-400 block mb-2">Passiveness Grade</span>
                  <span className="text-base font-semibold text-white">{idea.passiveness}</span>
                </div>
                <div>
                  <span className="text-sm text-slate-400 block mb-2">Platform Dependency</span>
                  <span className="text-base font-semibold text-white">{idea.platDep}</span>
                </div>
                <div>
                  <span className="text-sm text-slate-400 block mb-2">Legal Risk</span>
                  <span className="text-base font-semibold text-white">{idea.legalRisk}</span>
                </div>
                <div>
                  <span className="text-sm text-slate-400 block mb-2">Revenue Potential</span>
                  <span className="text-base font-semibold text-white">{idea.revenuePotential}</span>
                </div>
                <div>
                  <span className="text-sm text-slate-400 block mb-2">Churn Risk</span>
                  <span className="text-base font-semibold text-white">{idea.churn}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Analysis & Community */}
          <div className="space-y-6">
            {/* AI Analysis */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">AI Analysis Rationale</h2>
              <div className="text-base text-slate-300 leading-relaxed">
                {idea.rationale}
              </div>
              {idea.dateAdded && (
                <div className="mt-6 pt-4 border-t border-slate-700/50">
                  <span className="text-sm text-slate-400">Added to database: </span>
                  <span className="text-sm font-medium text-slate-300">{idea.dateAdded}</span>
                </div>
              )}
            </div>
            
            {/* Source Information */}
            <div className="glass-card rounded-xl p-6 border-2 border-blue-500/30">
              <div className="flex items-center gap-3 mb-6">
                <ExternalLink className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-bold text-white">Original Source</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-slate-400 block mb-2">Platform</span>
                  <div className="text-base font-semibold text-white">{idea.source}</div>
                </div>
                <div>
                  <span className="text-sm text-slate-400 block mb-2">Source URL</span>
                  <div className="text-sm text-slate-300 bg-slate-800/50 rounded-lg p-3 break-all">
                    {idea.url}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Community Discussion */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-bold text-white">Community Discussion</h2>
                <div className="flex items-center gap-2 ml-auto">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-300">8 active</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    S
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-white">Sarah</span>
                      <span className="text-xs text-green-400 px-2 py-1 bg-green-500/20 rounded">Building</span>
                    </div>
                    <p className="text-sm text-slate-300">Already at $2K MRR! The AI risk assessment was spot on.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    M
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-white">Marcus</span>
                      <span className="text-xs text-orange-400 px-2 py-1 bg-orange-500/20 rounded">Researching</span>
                    </div>
                    <p className="text-sm text-slate-300">Competition seems fiercer than AI analysis suggests.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-700/50 space-y-3">
                <button className="w-full px-4 py-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg text-blue-400 font-semibold transition-colors">
                  Join Discussion
                </button>
                
                <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-4 border border-purple-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-purple-300 font-semibold">Unlock Full Community</div>
                      <div className="text-sm text-slate-400">Private channels, expert mentorship</div>
                    </div>
                    <button 
                      onClick={() => navigate('/pricing')}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold transition-all"
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