import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Brain, ExternalLink, Star, DollarSign, Users, Clock, 
  Wrench, Shield, TrendingUp, AlertTriangle, Gauge,
  Sparkles, Calendar, Hash, Copy, CheckCircle,
  Server, Cloud, Database, Heart, Share2,
  ChevronRight, Info, Award, Rocket, Package, BarChart3,
  Globe, Code, BookOpen
} from 'lucide-react';
import RadialChart from '../components/RadialChart';
import { useMicroSaasStore } from '../stores/microSaasStore';

const IdeaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ideas, toggleFavorite, favorites } = useMicroSaasStore();
  const [copiedId, setCopiedId] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const idea = ideas.find(i => i.id === id);
  const isFavorite = favorites.includes(id || '');

  if (!idea) {
    return (
      <div className="min-h-screen modern-typography" style={{ background: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-6 py-8">
          <div className="glass-card rounded-xl p-12 text-center max-w-2xl mx-auto">
            <div className="p-4 bg-red-500/10 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Idea Not Found</h1>
            <p className="text-slate-400 mb-8 text-lg">The requested startup idea could not be found in our database.</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-modern flex items-center gap-2 mx-auto px-6 py-3"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Intelligence Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleCopyId = () => {
    navigator.clipboard.writeText(idea.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleToggleFavorite = () => {
    if (id) {
      toggleFavorite(id);
    }
  };

  const getCompetitionColor = (comp: string) => {
    switch (comp.toLowerCase()) {
      case 'low': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'medium': case 'med': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
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

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'none': return 'text-green-400';
      case 'low': return 'text-blue-400';
      case 'medium': case 'med': return 'text-orange-400';
      case 'high': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getPassivenessGrade = (passiveness: string) => {
    const gradeColors: { [key: string]: string } = {
      'A': 'bg-green-500/20 text-green-400 border-green-500/30',
      'B': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'C': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'D': 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    const grade = passiveness?.charAt(0) || '?';
    return { grade, color: gradeColors[grade] || 'bg-slate-500/20 text-slate-400 border-slate-500/30' };
  };

  const getInfrastructureInfo = () => {
    if (idea.canSupabaseOnly) {
      return {
        label: 'Supabase Only',
        icon: <Server className="w-5 h-5" />,
        color: 'text-green-400 bg-green-500/10 border-green-500/30',
        description: 'Can run entirely on Supabase'
      };
    } else if (idea.canSupaEdgeStack) {
      return {
        label: 'Edge Stack',
        icon: <Cloud className="w-5 h-5" />,
        color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
        description: 'Requires edge infrastructure'
      };
    } else {
      return {
        label: 'Complex Infrastructure',
        icon: <Database className="w-5 h-5" />,
        color: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
        description: 'Requires specialized setup'
      };
    }
  };

  const infrastructure = getInfrastructureInfo();
  const { grade: passivenessGrade, color: passivenessColor } = getPassivenessGrade(idea.passiveness);
  const description = idea.description || idea.rationale;
  const truncatedDescription = description.length > 200 ? description.substring(0, 200) + '...' : description;

  return (
    <div className="min-h-screen modern-typography" style={{ background: 'var(--bg-primary)' }}>
      {/* Premium Header */}
      <div className="glass-effect border-b border-white/10 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2.5 glass-card rounded-xl hover:bg-white/10 transition-all group"
              >
                <ArrowLeft className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/20">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white heading-font">
                    StartupIntel AI
                  </h1>
                  <p className="text-slate-400 text-sm">Deep Opportunity Analysis</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-300 font-medium">AI Analyzed</span>
              </div>
              <button 
                onClick={handleToggleFavorite}
                className={`p-2.5 rounded-xl transition-all ${
                  isFavorite 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
                    : 'glass-card hover:bg-white/10'
                }`}
              >
                <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : 'text-slate-300'}`} />
              </button>
              <button className="p-2.5 glass-card rounded-xl hover:bg-white/10 transition-all">
                <Share2 className="w-5 h-5 text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="glass-card rounded-2xl p-8 mb-8 bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Main Info */}
            <div className="lg:col-span-2">
              {/* Title and Tags */}
              <div className="mb-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-white heading-font mb-2">
                      {idea.productName || idea.niche}
                    </h1>
                    {idea.productName && (
                      <p className="text-xl text-slate-300">{idea.niche}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyId}
                      className="flex items-center gap-2 px-3 py-1.5 glass-card rounded-lg hover:bg-white/10 transition-all group"
                    >
                      {copiedId ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Hash className="w-4 h-4 text-slate-400 group-hover:text-white" />
                          <span className="text-sm text-slate-400 group-hover:text-white">{idea.id}</span>
                          <Copy className="w-3 h-3 text-slate-400 group-hover:text-white" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Founder and Source */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {idea.founder && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-blue-300">by {idea.founder}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <Globe className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium text-purple-300">{idea.source}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-500/10 rounded-lg border border-slate-500/20">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-300">{idea.dateAdded}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-lg text-slate-300 leading-relaxed">
                    {showFullDescription ? description : truncatedDescription}
                  </p>
                  {description.length > 200 && (
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-purple-400 hover:text-purple-300 text-sm font-medium mt-2 flex items-center gap-1"
                    >
                      {showFullDescription ? 'Show less' : 'Read more'}
                      <ChevronRight className={`w-4 h-4 transition-transform ${showFullDescription ? 'rotate-90' : ''}`} />
                    </button>
                  )}
                </div>

                {/* Key Metrics Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="glass-card rounded-lg p-3 text-center">
                    <DollarSign className="w-5 h-5 text-green-400 mx-auto mb-1" />
                    <div className="text-2xl font-bold text-white">${idea.mrr.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">MRR</div>
                  </div>
                  <div className="glass-card rounded-lg p-3 text-center">
                    <Gauge className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                    <div className="text-2xl font-bold text-white">{idea.score}</div>
                    <div className="text-xs text-slate-400">Score</div>
                  </div>
                  <div className="glass-card rounded-lg p-3 text-center">
                    <Clock className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <div className="text-2xl font-bold text-white">{idea.mvpWk}w</div>
                    <div className="text-xs text-slate-400">MVP Time</div>
                  </div>
                  <div className="glass-card rounded-lg p-3 text-center">
                    <Wrench className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                    <div className="text-2xl font-bold text-white">{idea.maintHours}h</div>
                    <div className="text-xs text-slate-400">Maintenance</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={idea.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-medium transition-all shadow-lg hover:shadow-xl"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Original Source
                  </a>
                  <button className="inline-flex items-center gap-2 px-6 py-3 glass-card rounded-xl hover:bg-white/10 transition-all text-white font-medium">
                    <Rocket className="w-5 h-5" />
                    Build This Idea
                  </button>
                </div>
              </div>
            </div>

            {/* Right - Performance Chart */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-xl p-6 bg-gradient-to-br from-purple-500/5 to-blue-500/5">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">Performance Analysis</h3>
                  <p className="text-sm text-slate-400">AI-powered market scoring</p>
                </div>
                <RadialChart idea={idea} size={280} />
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="text-xs text-slate-400 mb-1">Market Fit</div>
                    <div className={`text-lg font-bold ${idea.marketProof === 'Yes' ? 'text-green-400' : 'text-orange-400'}`}>
                      {idea.marketProof === 'Yes' ? 'Proven' : 'Unproven'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400 mb-1">1K MRR Chance</div>
                    <div className={`text-lg font-bold ${getChanceColor(idea.oneKMrrChance)}`}>
                      {idea.oneKMrrChance}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Infrastructure Section */}
        {idea.infraExplanation && (
          <div className="glass-card rounded-xl p-6 mb-8 border border-white/10">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${infrastructure.color} border`}>
                {infrastructure.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white">Infrastructure Requirements</h3>
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${infrastructure.color} border`}>
                    {infrastructure.label}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">{idea.infraExplanation}</p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${idea.canSupabaseOnly ? 'bg-green-400' : 'bg-slate-600'}`}></div>
                    <span className={`text-sm ${idea.canSupabaseOnly ? 'text-green-400' : 'text-slate-500'}`}>
                      Supabase Only
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${idea.canSupaEdgeStack ? 'bg-blue-400' : 'bg-slate-600'}`}></div>
                    <span className={`text-sm ${idea.canSupaEdgeStack ? 'text-blue-400' : 'text-slate-500'}`}>
                      Edge Stack
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Business Model */}
          <div className="glass-card rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Package className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Business Model</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Pricing Model</div>
                <div className="text-lg font-semibold text-white">{idea.pricing || 'Unknown'}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Target Users</div>
                <div className="text-lg font-semibold text-white">{idea.user}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Distribution Channel</div>
                <div className="text-lg font-semibold text-white">{idea.channel}</div>
              </div>
            </div>
          </div>

          {/* Build Complexity */}
          <div className="glass-card rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Code className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Development</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Complexity Level</div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-2 rounded-full ${
                        i < (idea.complexity || 0) ? 'bg-blue-400' : 'bg-slate-700'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-white font-semibold">{idea.complexity}/5</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">MVP Timeline</div>
                <div className="text-lg font-semibold text-orange-400">{idea.mvpWk} weeks</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Passiveness Grade</div>
                <div className={`inline-flex px-3 py-1 rounded-lg text-lg font-bold ${passivenessColor} border`}>
                  {passivenessGrade}
                </div>
              </div>
            </div>
          </div>

          {/* Market Analysis */}
          <div className="glass-card rounded-xl p-6 border border-white/10 hover:border-green-500/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Market Analysis</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Competition Level</div>
                <div className={`inline-flex px-3 py-1 rounded-lg text-sm font-bold ${getCompetitionColor(idea.comp)} border`}>
                  {idea.comp}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Market Validation</div>
                <div className={`text-lg font-semibold ${idea.marketProof === 'Yes' ? 'text-green-400' : 'text-orange-400'}`}>
                  {idea.marketProof}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Distribution Fit</div>
                <div className="text-lg font-semibold text-white">{idea.distFit}</div>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="glass-card rounded-xl p-6 border border-white/10 hover:border-orange-500/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Shield className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Risk Profile</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Platform Dependency</div>
                <div className={`text-lg font-semibold ${getRiskColor(idea.platDep)}`}>
                  {idea.platDep}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Legal Risk</div>
                <div className={`text-lg font-semibold ${getRiskColor(idea.legalRisk)}`}>
                  {idea.legalRisk}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Churn Risk</div>
                <div className={`text-lg font-semibold ${
                  idea.churn === 'Low' ? 'text-green-400' : 
                  idea.churn === 'Med' || idea.churn === 'Medium' ? 'text-orange-400' : 
                  idea.churn === 'High' ? 'text-red-400' : 'text-slate-400'
                }`}>
                  {idea.churn || 'Unknown'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Potential */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg">
                <Rocket className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Growth Potential</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card rounded-lg p-4">
                <div className="text-xs text-slate-400 mb-2">Revenue Potential</div>
                <div className={`text-2xl font-bold ${getChanceColor(idea.revenuePotential)}`}>
                  {idea.revenuePotential}
                </div>
              </div>
              <div className="glass-card rounded-lg p-4">
                <div className="text-xs text-slate-400 mb-2">$1K MRR Chance</div>
                <div className={`text-2xl font-bold ${getChanceColor(idea.oneKMrrChance)}`}>
                  {idea.oneKMrrChance}
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-slate-800/30 rounded-lg">
              <div className="text-xs text-slate-400 mb-2">Monthly Maintenance</div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-white">{idea.maintHours}</span>
                <span className="text-lg text-slate-400 mb-1">hours/month</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg">
                <Award className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Success Indicators</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                <span className="text-sm text-slate-300">Market Proof</span>
                <span className={`font-bold ${idea.marketProof === 'Yes' ? 'text-green-400' : 'text-orange-400'}`}>
                  {idea.marketProof === 'Yes' ? '✓ Validated' : '○ Unvalidated'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                <span className="text-sm text-slate-300">Distribution Fit</span>
                <span className={`font-bold ${
                  idea.distFit === 'Good' ? 'text-green-400' :
                  idea.distFit === 'Avg' ? 'text-orange-400' : 'text-red-400'
                }`}>
                  {idea.distFit}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                <span className="text-sm text-slate-300">AI-Powered</span>
                <span className={`font-bold ${
                  idea.niche.toLowerCase().includes('ai') || idea.description?.toLowerCase().includes('ai') 
                    ? 'text-purple-400' : 'text-slate-400'
                }`}>
                  {idea.niche.toLowerCase().includes('ai') || idea.description?.toLowerCase().includes('ai') 
                    ? '✓ Yes' : '○ No'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis Section */}
        <div className="glass-card rounded-xl p-8 border border-white/10 bg-gradient-to-br from-purple-500/5 to-blue-500/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/20">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">AI Intelligence Analysis</h2>
              <p className="text-sm text-slate-400">Deep market insights and strategic evaluation</p>
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed">{idea.rationale}</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">Analysis Date:</span>
                <span className="text-slate-300 font-medium">{idea.dateAdded}</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">Overall Score:</span>
                <span className="text-slate-300 font-bold">{idea.score}/100</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">Data Source:</span>
                <span className="text-slate-300 font-medium">{idea.source}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="mt-8 glass-card rounded-xl p-6 border border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 glass-card rounded-lg hover:bg-white/10 transition-all text-slate-300 font-medium">
                <Heart className="w-4 h-4 inline mr-2" />
                Add to Favorites
              </button>
              <button className="px-4 py-2 glass-card rounded-lg hover:bg-white/10 transition-all text-slate-300 font-medium">
                <BookOpen className="w-4 h-4 inline mr-2" />
                View Similar Ideas
              </button>
            </div>
            <div className="text-sm text-slate-400">
              Last updated: {idea.dateAdded} • Idea #{idea.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetail;