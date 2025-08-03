import { ArrowLeft, Brain, ExternalLink, Star } from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RadialChart from '../components/RadialChart';
import { useMicroSaasStore } from '../stores/microSaasStore';

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
        {/* Header Section */}
        <div className="glass-card rounded-xl p-6 mb-8">
          <div className="flex items-start justify-between gap-6">
            {/* Left - Main Info */}
            <div className="flex-1">
              <div className="mb-4">
                {idea.productName ? (
                  <h1 className="text-3xl font-bold text-white heading-font">{idea.productName}</h1>
                ) : (
                  <h1 className="text-3xl font-bold text-white heading-font">{idea.niche}</h1>
                )}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 text-purple-300 text-sm font-semibold rounded-lg">
                  {idea.niche}
                </span>
                {idea.founder && (
                  <span className="px-3 py-1 bg-blue-500/20 rounded-lg text-blue-300 text-sm font-medium border border-blue-500/30">
                    by {idea.founder}
                  </span>
                )}
                <span className="px-3 py-1 bg-green-500/20 rounded-lg text-green-300 text-sm font-medium border border-green-500/30">
                  ${idea.mrr.toLocaleString()} MRR
                </span>
              </div>

              <p className="text-slate-300 text-base leading-relaxed mb-6 max-w-2xl">
                {idea.description || idea.rationale}
              </p>

              <div className="flex items-center gap-4">
                <a
                  href={idea.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-medium transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Original Source
                </a>
                <span className="text-sm text-slate-400">
                  Source: {idea.source}
                </span>
              </div>
            </div>

            {/* Right - Performance Chart */}
            <div className="flex-shrink-0">
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-white mb-2">Performance Score</h3>
                <p className="text-sm text-slate-400">AI-powered market analysis</p>
              </div>
              <RadialChart idea={idea} size={300} />
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue & Market */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Revenue & Market
            </h2>
            <div className="space-y-5">
              <div>
                <span className="text-sm text-slate-400 block mb-1">Revenue Model</span>
                <span className="text-lg font-semibold text-white">{idea.pricing || 'Unknown'}</span>
              </div>
              <div>
                <span className="text-sm text-slate-400 block mb-1">Target Users</span>
                <span className="text-lg font-semibold text-white">{idea.user}</span>
              </div>
              <div>
                <span className="text-sm text-slate-400 block mb-1">Distribution</span>
                <span className="text-lg font-semibold text-white">{idea.channel}</span>
              </div>
              <div>
                <span className="text-sm text-slate-400 block mb-1">Market Validation</span>
                <span className={`text-lg font-semibold ${idea.marketProof === 'Yes' ? 'text-green-400' : 'text-red-400'}`}>
                  {idea.marketProof}
                </span>
              </div>
              <div>
                <span className="text-sm text-slate-400 block mb-1">1K MRR Chance</span>
                <span className={`text-lg font-semibold ${getChanceColor(idea.oneKMrrChance)}`}>
                  {idea.oneKMrrChance}
                </span>
              </div>
            </div>
          </div>

          {/* Build & Operations */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Build & Operations
            </h2>
            <div className="space-y-5">
              <div>
                <span className="text-sm text-slate-400 block mb-1">Build Complexity</span>
                <span className="text-lg font-semibold text-white">{idea.complexity}/5</span>
              </div>
              <div>
                <span className="text-sm text-slate-400 block mb-1">MVP Timeline</span>
                <span className="text-lg font-semibold text-orange-400">{idea.mvpWk} weeks</span>
              </div>
              <div>
                <span className="text-sm text-slate-400 block mb-1">Maintenance</span>
                <span className="text-lg font-semibold text-purple-400">{idea.maintHours}h/month</span>
              </div>
              <div>
                <span className="text-sm text-slate-400 block mb-1">Passiveness</span>
                <span className="text-lg font-semibold text-white">{idea.passiveness}</span>
              </div>
              <div>
                <span className="text-sm text-slate-400 block mb-1">Distribution Fit</span>
                <span className="text-lg font-semibold text-white">{idea.distFit}</span>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              Risk Assessment
            </h2>
            <div className="space-y-5">
              <div>
                <span className="text-sm text-slate-400 block mb-1">Competition</span>
                <span className={`text-lg font-semibold ${getCompetitionColor(idea.comp)}`}>{idea.comp}</span>
              </div>
              <div>
                <span className="text-sm text-slate-400 block mb-1">Platform Risk</span>
                <span className="text-lg font-semibold text-white">{idea.platDep}</span>
              </div>
              <div>
                <span className="text-sm text-slate-400 block mb-1">Legal Risk</span>
                <span className="text-lg font-semibold text-white">{idea.legalRisk}</span>
              </div>
              <div>
                <span className="text-sm text-slate-400 block mb-1">Revenue Potential</span>
                <span className="text-lg font-semibold text-white">{idea.revenuePotential}</span>
              </div>
              <div>
                <span className="text-sm text-slate-400 block mb-1">Churn Risk</span>
                <span className="text-lg font-semibold text-white">{idea.churn}</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Brain className="w-6 h-6 text-purple-400" />
            AI Analysis & Rationale
          </h2>
          <div className="text-base text-slate-300 leading-relaxed">
            {idea.rationale}
          </div>
          {idea.dateAdded && (
            <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-between">
              <div>
                <span className="text-sm text-slate-400">Added to database: </span>
                <span className="text-sm font-medium text-slate-300">{idea.dateAdded}</span>
              </div>
              <div className="text-right">
                <span className="text-sm text-slate-400">ID #{idea.id} • Source: </span>
                <span className="text-sm font-medium text-slate-300">{idea.source}</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default IdeaDetail;
