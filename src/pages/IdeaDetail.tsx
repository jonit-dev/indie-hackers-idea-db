import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Brain, ExternalLink, Star, DollarSign, Users, Clock, 
  Wrench, Shield, TrendingUp, AlertTriangle, Gauge,
  Server, Cloud, Database, Heart, Share2,
  ChevronRight, Award, Rocket, Package,
  Globe, Code, Zap, Trophy,
  AlertCircle, CheckCircle2, XCircle, Layers,
  ArrowUpRight, Bot
} from 'lucide-react';
import RadialChart from '../components/RadialChart';
import { useMicroSaasStore } from '../stores/microSaasStore';

// Animated counter component
const AnimatedCounter: React.FC<{ value: number; suffix?: string; prefix?: string; duration?: number }> = ({ 
  value, 
  suffix = '', 
  prefix = '',
  duration = 1000 
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const endValue = value;
    
    const updateValue = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * endValue);
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };
    
    requestAnimationFrame(updateValue);
  }, [value, duration]);

  return <span>{prefix}{displayValue.toLocaleString()}{suffix}</span>;
};

const IdeaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ideas, toggleFavorite, favorites } = useMicroSaasStore();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'market'>('overview');

  const idea = ideas.find(i => i.id === id);
  const isFavorite = favorites.includes(id || '');

  if (!idea) {
    return (
      <div className="min-h-screen modern-typography" style={{ background: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-6 py-8">
          <div className="glass-card rounded-xl p-12 text-center max-w-2xl mx-auto">
            <div className="p-4 bg-red-500/10 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center animate-pulse">
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
      'A': 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30',
      'B': 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30',
      'C': 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400 border-orange-500/30',
      'D': 'bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-400 border-red-500/30',
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
        description: 'Can run entirely on Supabase',
        badge: '🟢 Simple'
      };
    } else if (idea.canSupaEdgeStack) {
      return {
        label: 'Edge Stack',
        icon: <Cloud className="w-5 h-5" />,
        color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
        description: 'Requires edge infrastructure',
        badge: '🔵 Moderate'
      };
    } else {
      return {
        label: 'Complex Infrastructure',
        icon: <Database className="w-5 h-5" />,
        color: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
        description: 'Requires specialized setup',
        badge: '🔴 Advanced'
      };
    }
  };

  const infrastructure = getInfrastructureInfo();
  const { grade: passivenessGrade, color: passivenessColor } = getPassivenessGrade(idea.passiveness);
  const description = idea.description || idea.rationale;
  const truncatedDescription = description.length > 200 ? description.substring(0, 200) + '...' : description;

  // Calculate progress percentages
  const scorePercentage = (idea.score / 100) * 100;

  // Check for AI-powered
  const isAiPowered = idea.niche.toLowerCase().includes('ai') || 
                      idea.description?.toLowerCase().includes('ai') || 
                      idea.rationale?.toLowerCase().includes('ai');

  // Get achievement badges
  const achievements = [];
  if (idea.mrr >= 10000) achievements.push({ icon: Trophy, label: '$10K+ MRR', color: 'text-yellow-400' });
  if (idea.mrr >= 5000) achievements.push({ icon: Award, label: '$5K+ MRR', color: 'text-purple-400' });
  if (idea.score >= 80) achievements.push({ icon: Star, label: 'High Score', color: 'text-blue-400' });
  if (idea.marketProof === 'Yes') achievements.push({ icon: CheckCircle2, label: 'Market Proven', color: 'text-green-400' });
  if (isAiPowered) achievements.push({ icon: Bot, label: 'AI-Powered', color: 'text-purple-400' });
  if (idea.mvpWk <= 4) achievements.push({ icon: Zap, label: 'Quick MVP', color: 'text-orange-400' });

  return (
    <div className="min-h-screen modern-typography relative" style={{ background: 'var(--bg-primary)' }}>

      {/* Premium Header with Glass Effect */}
      <div className="glass-effect border-b border-white/10 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2.5 glass-card rounded-xl hover:bg-white/10 transition-all group hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/20 animate-pulse">
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
                className={`p-2.5 rounded-xl transition-all hover:scale-110 ${
                  isFavorite 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-purple-500/25' 
                    : 'glass-card hover:bg-white/10'
                }`}
              >
                <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : 'text-slate-300'}`} />
              </button>
              <button className="p-2.5 glass-card rounded-xl hover:bg-white/10 transition-all hover:scale-105">
                <Share2 className="w-5 h-5 text-slate-300" />
              </button>
            </div>
          </div>

          {/* Progress bar showing overall quality */}
          <div className="mt-3 h-1 bg-slate-800/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000"
              style={{ width: `${scorePercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Achievement Badges */}
        {achievements.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 glass-card rounded-full border border-white/10 hover:scale-105 transition-transform"
              >
                <achievement.icon className={`w-4 h-4 ${achievement.color}`} />
                <span className="text-sm font-medium text-white">{achievement.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Hero Section with Enhanced Design */}
        <div className="glass-card rounded-2xl p-8 mb-8 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 border border-white/10 relative overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {/* Left - Main Info */}
            <div className="lg:col-span-2">
              {/* Title and Tags */}
              <div className="mb-6">
                <div className="mb-4">
                  <h1 className="text-5xl font-bold text-white heading-font mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    {idea.productName || idea.niche}
                  </h1>
                  {idea.productName && (
                    <p className="text-2xl text-slate-300 font-light">{idea.niche}</p>
                  )}
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
                    <span className="text-sm font-medium text-purple-300">{idea.source} • {idea.dateAdded}</span>
                  </div>
                </div>

                {/* Description with better typography */}
                <div className="mb-6">
                  <p className="text-lg text-slate-300 leading-relaxed">
                    {showFullDescription ? description : truncatedDescription}
                  </p>
                  {description.length > 200 && (
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-purple-400 hover:text-purple-300 text-sm font-medium mt-2 flex items-center gap-1 group"
                    >
                      {showFullDescription ? 'Show less' : 'Read more'}
                      <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${showFullDescription ? 'rotate-90' : ''}`} />
                    </button>
                  )}
                </div>

                {/* Enhanced Key Metrics Bar with animations */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="glass-card rounded-xl p-4 text-center hover:scale-105 transition-transform group">
                    <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2 group-hover:animate-bounce" />
                    <div className="text-3xl font-bold text-white">
                      <AnimatedCounter prefix="$" value={idea.mrr} />
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">MRR</div>
                  </div>
                  <div className="glass-card rounded-xl p-4 text-center hover:scale-105 transition-transform group">
                    <Gauge className="w-6 h-6 text-purple-400 mx-auto mb-2 group-hover:animate-spin" />
                    <div className="text-3xl font-bold text-white">
                      <AnimatedCounter value={idea.score} />
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Score</div>
                  </div>
                  <div className="glass-card rounded-xl p-4 text-center hover:scale-105 transition-transform group">
                    <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2 group-hover:animate-pulse" />
                    <div className="text-3xl font-bold text-white">
                      <AnimatedCounter value={idea.mvpWk} suffix="w" />
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">MVP Time</div>
                  </div>
                  <div className="glass-card rounded-xl p-4 text-center hover:scale-105 transition-transform group">
                    <Wrench className="w-6 h-6 text-orange-400 mx-auto mb-2 group-hover:rotate-12 transition-transform" />
                    <div className="text-3xl font-bold text-white">
                      <AnimatedCounter value={idea.maintHours} suffix="h" />
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Maintenance</div>
                  </div>
                </div>

                {/* Action Buttons with enhanced styling */}
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={idea.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-medium transition-all shadow-lg hover:shadow-xl hover:scale-105 group"
                  >
                    <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    View Original Source
                    <ArrowUpRight className="w-4 h-4 opacity-50" />
                  </a>
                  <button className="inline-flex items-center gap-2 px-6 py-3 glass-card rounded-xl hover:bg-white/10 transition-all text-white font-medium hover:scale-105 border border-white/10">
                    <Rocket className="w-5 h-5 animate-pulse" />
                    Build This Idea
                  </button>
                </div>
              </div>
            </div>

            {/* Right - Enhanced Performance Chart */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-xl p-6 bg-gradient-to-br from-purple-500/5 to-blue-500/5 relative overflow-hidden">
                
                <div className="relative">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">Performance Analysis</h3>
                    <p className="text-sm text-slate-400">AI-powered market scoring</p>
                  </div>
                  <RadialChart idea={idea} size={280} />
                  
                  {/* Quality indicators */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="glass-card rounded-lg p-3 text-center">
                      <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Market Fit</div>
                      <div className={`text-lg font-bold flex items-center justify-center gap-1 ${idea.marketProof === 'Yes' ? 'text-green-400' : 'text-orange-400'}`}>
                        {idea.marketProof === 'Yes' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        {idea.marketProof === 'Yes' ? 'Proven' : 'Unproven'}
                      </div>
                    </div>
                    <div className="glass-card rounded-lg p-3 text-center">
                      <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">1K MRR</div>
                      <div className={`text-lg font-bold ${getChanceColor(idea.oneKMrrChance)}`}>
                        {idea.oneKMrrChance}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Tabbed Content Section */}
        <div className="mb-8">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'overview' 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                  : 'glass-card text-slate-300 hover:bg-white/10'
              }`}
            >
              <Layers className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('technical')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'technical' 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                  : 'glass-card text-slate-300 hover:bg-white/10'
              }`}
            >
              <Code className="w-4 h-4 inline mr-2" />
              Technical
            </button>
            <button
              onClick={() => setActiveTab('market')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'market' 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                  : 'glass-card text-slate-300 hover:bg-white/10'
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Market
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Business Model Card */}
              <div className="glass-card rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all hover:scale-105 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg group-hover:scale-110 transition-transform">
                    <Package className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Business Model</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Pricing</div>
                    <div className="text-lg font-semibold text-white">{idea.pricing || 'Unknown'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Target Users</div>
                    <div className="text-lg font-semibold text-white">{idea.user}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Channel</div>
                    <div className="text-lg font-semibold text-white">{idea.channel}</div>
                  </div>
                </div>
              </div>

              {/* Market Analysis Card */}
              <div className="glass-card rounded-xl p-6 border border-white/10 hover:border-green-500/30 transition-all hover:scale-105 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Market</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Competition</div>
                    <div className={`inline-flex px-3 py-1 rounded-lg text-sm font-bold ${getCompetitionColor(idea.comp)} border`}>
                      {idea.comp}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Validation</div>
                    <div className={`text-lg font-semibold ${idea.marketProof === 'Yes' ? 'text-green-400' : 'text-orange-400'}`}>
                      {idea.marketProof}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Dist. Fit</div>
                    <div className="text-lg font-semibold text-white">{idea.distFit}</div>
                  </div>
                </div>
              </div>

              {/* Development Card */}
              <div className="glass-card rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all hover:scale-105 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg group-hover:scale-110 transition-transform">
                    <Code className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Development</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-slate-400 mb-2 uppercase tracking-wider">Complexity</div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-2 rounded-full transition-all ${
                            i < (idea.complexity || 0) 
                              ? 'bg-gradient-to-r from-blue-400 to-cyan-400' 
                              : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-white font-semibold mt-1">{idea.complexity}/5</span>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">MVP Time</div>
                    <div className="text-lg font-semibold text-orange-400">{idea.mvpWk} weeks</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Passiveness</div>
                    <div className={`inline-flex px-3 py-1 rounded-lg text-lg font-bold ${passivenessColor} border`}>
                      {passivenessGrade}
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Profile Card */}
              <div className="glass-card rounded-xl p-6 border border-white/10 hover:border-orange-500/30 transition-all hover:scale-105 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg group-hover:scale-110 transition-transform">
                    <Shield className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Risk Profile</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Platform</div>
                    <div className={`text-lg font-semibold ${getRiskColor(idea.platDep)}`}>
                      {idea.platDep}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Legal</div>
                    <div className={`text-lg font-semibold ${getRiskColor(idea.legalRisk)}`}>
                      {idea.legalRisk}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Churn</div>
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
          )}

          {activeTab === 'technical' && (
            <div className="space-y-6">
              {/* Infrastructure Requirements with visual progress */}
              {idea.infraExplanation && (
                <div className="glass-card rounded-xl p-6 border border-white/10">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${infrastructure.color} border animate-pulse`}>
                      {infrastructure.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-white">Infrastructure Requirements</h3>
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium ${infrastructure.color} border`}>
                          {infrastructure.badge}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed mb-4">{idea.infraExplanation}</p>
                      
                      {/* Infrastructure compatibility visualization */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 rounded-lg border ${idea.canSupabaseOnly ? 'bg-green-500/10 border-green-500/30' : 'bg-slate-800/30 border-slate-700'}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <Server className={`w-5 h-5 ${idea.canSupabaseOnly ? 'text-green-400' : 'text-slate-500'}`} />
                            <span className={`font-medium ${idea.canSupabaseOnly ? 'text-green-400' : 'text-slate-500'}`}>
                              Supabase Only
                            </span>
                          </div>
                          <div className="text-xs text-slate-400">
                            {idea.canSupabaseOnly ? 'Fully compatible' : 'Not compatible'}
                          </div>
                        </div>
                        <div className={`p-4 rounded-lg border ${idea.canSupaEdgeStack ? 'bg-blue-500/10 border-blue-500/30' : 'bg-slate-800/30 border-slate-700'}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <Cloud className={`w-5 h-5 ${idea.canSupaEdgeStack ? 'text-blue-400' : 'text-slate-500'}`} />
                            <span className={`font-medium ${idea.canSupaEdgeStack ? 'text-blue-400' : 'text-slate-500'}`}>
                              Edge Stack
                            </span>
                          </div>
                          <div className="text-xs text-slate-400">
                            {idea.canSupaEdgeStack ? 'Fully compatible' : 'Not compatible'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {activeTab === 'market' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Growth Potential Analysis */}
              <div className="glass-card rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg">
                    <Rocket className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Growth Potential</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card rounded-lg p-4 hover:scale-105 transition-transform">
                    <div className="text-xs text-slate-400 mb-2 uppercase tracking-wider">Revenue</div>
                    <div className={`text-2xl font-bold ${getChanceColor(idea.revenuePotential)}`}>
                      {idea.revenuePotential}
                    </div>
                  </div>
                  <div className="glass-card rounded-lg p-4 hover:scale-105 transition-transform">
                    <div className="text-xs text-slate-400 mb-2 uppercase tracking-wider">$1K MRR</div>
                    <div className={`text-2xl font-bold ${getChanceColor(idea.oneKMrrChance)}`}>
                      {idea.oneKMrrChance}
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gradient-to-r from-slate-800/30 to-slate-700/30 rounded-lg">
                  <div className="text-xs text-slate-400 mb-2 uppercase tracking-wider">Monthly Maintenance</div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-white">
                      <AnimatedCounter value={idea.maintHours} />
                    </span>
                    <span className="text-lg text-slate-400 mb-1">hours/month</span>
                  </div>
                </div>
              </div>

              {/* Success Indicators */}
              <div className="glass-card rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg">
                    <Award className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Success Indicators</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-800/30 to-slate-700/30 rounded-lg hover:scale-105 transition-transform">
                    <span className="text-sm text-slate-300">Market Proof</span>
                    <span className={`font-bold flex items-center gap-1 ${idea.marketProof === 'Yes' ? 'text-green-400' : 'text-orange-400'}`}>
                      {idea.marketProof === 'Yes' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      {idea.marketProof === 'Yes' ? 'Validated' : 'Unvalidated'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-800/30 to-slate-700/30 rounded-lg hover:scale-105 transition-transform">
                    <span className="text-sm text-slate-300">Distribution Fit</span>
                    <span className={`font-bold ${
                      idea.distFit === 'Good' ? 'text-green-400' :
                      idea.distFit === 'Avg' ? 'text-orange-400' : 'text-red-400'
                    }`}>
                      {idea.distFit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-800/30 to-slate-700/30 rounded-lg hover:scale-105 transition-transform">
                    <span className="text-sm text-slate-300">AI-Powered</span>
                    <span className={`font-bold flex items-center gap-1 ${isAiPowered ? 'text-purple-400' : 'text-slate-400'}`}>
                      {isAiPowered ? <Bot className="w-4 h-4" /> : null}
                      {isAiPowered ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI Analysis Section with Enhanced Styling */}
        <div className="glass-card rounded-xl p-8 border border-white/10 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 relative overflow-hidden">
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/20 animate-pulse">
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

          </div>
        </div>

        {/* Enhanced Quick Actions Footer */}
        <div className="mt-8 glass-card rounded-xl p-6 border border-white/10 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={handleToggleFavorite}
                className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 ${
                  isFavorite 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
                    : 'glass-card hover:bg-white/10 text-slate-300'
                }`}
              >
                <Heart className={`w-4 h-4 inline mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
            <div className="text-sm text-slate-400">
              <span>Added: {idea.dateAdded} • #{idea.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetail;