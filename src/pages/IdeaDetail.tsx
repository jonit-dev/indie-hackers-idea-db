import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Brain, TrendingUp, DollarSign, Clock, Users, Zap, Target, Shield, Activity, CheckCircle, HelpCircle, Star, Calendar, BarChart3, MessageCircle, ThumbsUp } from 'lucide-react';
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

  const getComplexityText = (complexity: string | number) => {
    const complexityNum = typeof complexity === 'string' ? parseInt(complexity) : complexity;
    switch (complexityNum) {
      case 1: return 'Very Low';
      case 2: return 'Low';
      case 3: return 'Medium';
      case 4: return 'High';
      case 5: return 'Very High';
      default: return 'Unknown';
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

      <div className="container mx-auto px-6 py-8">
        {/* Idea Header */}
        <div className="glass-card rounded-xl p-8 mb-8 animate-slide-up">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-sm font-medium border border-purple-500/30">
                  {idea.niche}
                </span>
                <div className="flex items-center gap-2 px-3 py-1 glass-card rounded-full">
                  <Brain className="w-3 h-3 text-purple-400" />
                  <span className="text-xs text-slate-300">Grok 4 Analyzed</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-4 heading-font">
                {idea.niche} Opportunity
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                {idea.rationale}
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href={idea.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all text-white font-semibold shadow-lg"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">View Original Source</span>
                </a>
                <div className="flex items-center gap-2 px-3 py-1 glass-card rounded-lg">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-300">Added {idea.dateAdded}</span>
                </div>
              </div>
            </div>
            <div className="ml-8">
              <RadialChart idea={idea} size={240} className="animate-scale-in" />
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card rounded-xl p-6 animate-scale-in">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">${idea.mrr.toLocaleString()}</div>
                <div className="text-xs text-slate-400">Monthly Revenue</div>
              </div>
            </div>
            <div className="text-sm text-slate-300">Proven MRR</div>
            <div className="text-xs text-slate-500 mt-1">{idea.pricing}</div>
          </div>

          <div className="glass-card rounded-xl p-6 animate-scale-in">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{idea.mvpWk}</div>
                <div className="text-xs text-slate-400">Days to MVP</div>
              </div>
            </div>
            <div className="text-sm text-slate-300">Build Time</div>
            <div className="text-xs text-slate-500 mt-1">{getComplexityText(idea.complexity)} complexity</div>
          </div>

          <div className="glass-card rounded-xl p-6 animate-scale-in">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <TrendingUp className={`w-5 h-5 ${getChanceColor(idea.oneKMrrChance)}`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{idea.oneKMrrChance}</div>
                <div className="text-xs text-slate-400">$1K MRR Chance</div>
              </div>
            </div>
            <div className="text-sm text-slate-300">Success Probability</div>
            <div className="text-xs text-slate-500 mt-1">AI prediction</div>
          </div>

          <div className="glass-card rounded-xl p-6 animate-scale-in">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Activity className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{idea.maintHours}h</div>
                <div className="text-xs text-slate-400">Monthly Maintenance</div>
              </div>
            </div>
            <div className="text-sm text-slate-300">Time Investment</div>
            <div className="text-xs text-slate-500 mt-1">Per month</div>
          </div>
        </div>

        {/* Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Market Analysis */}
          <div className="glass-card rounded-xl p-6 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Market Analysis</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Target User</span>
                <span className="text-white font-medium">{idea.user}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Distribution Channel</span>
                <span className="text-white font-medium">{idea.channel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Competition Level</span>
                <span className={`font-medium ${getCompetitionColor(idea.comp)}`}>{idea.comp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Market Validation</span>
                <div className="flex items-center gap-2">
                  {idea.marketProof === 'Yes' ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <HelpCircle className="w-4 h-4 text-orange-400" />
                  )}
                  <span className="text-white font-medium">{idea.marketProof}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Distribution Fit</span>
                <span className="text-white font-medium">{idea.distFit}</span>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="glass-card rounded-xl p-6 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Risk Assessment</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Platform Dependency</span>
                <span className="text-white font-medium">{idea.platDep}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Legal Risk</span>
                <span className="text-white font-medium">{idea.legalRisk}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Churn Rate</span>
                <span className="text-white font-medium">{idea.churn || '?'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Passiveness Grade</span>
                <span className="text-white font-medium">{idea.passiveness}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Revenue Potential</span>
                <span className="text-white font-medium">{idea.revenuePotential}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Layout for AI Insights and Community */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Insights */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-xl p-8 animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Grok 4 AI Analysis</h2>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-300 font-medium">Real-time Intelligence</span>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <p className="text-slate-300 leading-relaxed">
                  {idea.rationale}
                </p>
              </div>
              
              <div className="mt-6 flex items-center gap-4">
                <button className="btn-modern flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Get Full AI Report
                </button>
                <button className="px-4 py-2 glass-card rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                  <Target className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">Track This Idea</span>
                </button>
              </div>
            </div>
          </div>

          {/* Community Discussion */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-xl p-6 animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Community</h3>
                <span className="px-2 py-1 bg-blue-500/20 rounded-full text-blue-300 text-xs font-medium">
                  8 discussing
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    S
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">Sarah</span>
                      <span className="text-xs text-green-400">Building this</span>
                    </div>
                    <p className="text-sm text-slate-300">Already at $2K MRR! The AI risk assessment was spot on.</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-300">
                        <ThumbsUp className="w-3 h-3" />
                        12
                      </button>
                      <span className="text-xs text-slate-500">2h ago</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    M
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">Marcus</span>
                      <span className="text-xs text-orange-400">Researching</span>
                    </div>
                    <p className="text-sm text-slate-300">Competition seems fiercer than AI analysis suggests. Anyone else seeing this?</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-300">
                        <ThumbsUp className="w-3 h-3" />
                        5
                      </button>
                      <span className="text-xs text-slate-500">4h ago</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    E
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">Elena</span>
                      <span className="text-xs text-blue-400">Validating</span>
                    </div>
                    <p className="text-sm text-slate-300">Just interviewed 10 potential users. Demand is real! 🔥</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-300">
                        <ThumbsUp className="w-3 h-3" />
                        18
                      </button>
                      <span className="text-xs text-slate-500">6h ago</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-4">
                <button className="w-full px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg text-blue-400 font-medium text-sm transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Join Discussion
                </button>
              </div>

              <div className="mt-4 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="text-center">
                  <div className="text-xs text-purple-300 font-medium mb-2">Unlock Full Community</div>
                  <button 
                    onClick={() => navigate('/pricing')}
                    className="w-full px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold text-xs transition-all"
                  >
                    Upgrade to Pro
                  </button>
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