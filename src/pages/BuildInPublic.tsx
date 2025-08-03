import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Heart, MessageCircle, Share, Plus, Image, Video, Link, TrendingUp, DollarSign, Users, Activity, Star, Search } from 'lucide-react';

interface BuildUpdate {
  id: string;
  user: {
    name: string;
    avatar: string;
    handle: string;
    verified: boolean;
    tier: 'free' | 'pro' | 'enterprise';
  };
  timestamp: string;
  content: string;
  images?: string[];
  metrics?: {
    mrr?: number;
    users?: number;
    growth?: string;
  };
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
  ideaId?: string;
  type: 'milestone' | 'progress' | 'launch' | 'failure' | 'question';
}

const BuildInPublic: React.FC = () => {
  const navigate = useNavigate();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const updates: BuildUpdate[] = [
    {
      id: '1',
      user: {
        name: 'Sarah Chen',
        avatar: '👩‍💻',
        handle: '@sarahbuilds',
        verified: true,
        tier: 'pro'
      },
      timestamp: '2h ago',
      content: '🚀 Just hit $2,000 MRR with my AI writing tool! Started from idea #143 in StartupIntel. The community feedback was invaluable. Next milestone: $5K MRR by end of month! 💪',
      metrics: {
        mrr: 2000,
        users: 150,
        growth: '+25%'
      },
      likes: 47,
      comments: 12,
      shares: 8,
      tags: ['milestone', 'ai-tools', 'mrr'],
      ideaId: '143',
      type: 'milestone'
    },
    {
      id: '2',
      user: {
        name: 'Marcus Torres',
        avatar: '👨‍🚀',
        handle: '@marcustech',
        verified: false,
        tier: 'free'
      },
      timestamp: '5h ago',
      content: 'Week 3 of building my productivity app. UI is coming together nicely! Still validating the market but early user interviews are promising. Building in public forces me to stay accountable 📈',
      likes: 23,
      comments: 5,
      shares: 3,
      tags: ['ui-design', 'validation', 'productivity'],
      ideaId: '87',
      type: 'progress'
    },
    {
      id: '3',
      user: {
        name: 'Elena Vasquez',
        avatar: '👩‍💼',
        handle: '@elenavalidates',
        verified: true,
        tier: 'enterprise'
      },
      timestamp: '8h ago',
      content: 'Market research complete! Interviewed 25 potential customers for my SaaS analytics tool. 84% said they would pay $29/month. Time to build the MVP! 🔥',
      metrics: {
        users: 25
      },
      likes: 31,
      comments: 7,
      shares: 12,
      tags: ['market-research', 'analytics', 'saas'],
      ideaId: '156',
      type: 'milestone'
    }
  ];

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'pro':
        return <div className="w-3 h-3 bg-purple-500 rounded-full border border-purple-400"></div>;
      case 'enterprise':
        return <div className="w-3 h-3 bg-blue-500 rounded-full border border-blue-400"></div>;
      default:
        return <div className="w-3 h-3 bg-slate-500 rounded-full border border-slate-400"></div>;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'milestone': return 'text-green-400';
      case 'launch': return 'text-blue-400';
      case 'progress': return 'text-purple-400';
      case 'failure': return 'text-orange-400';
      case 'question': return 'text-yellow-400';
      default: return 'text-slate-400';
    }
  };

  const handleCreatePost = () => {
    setNewPost('');
    setShowCreatePost(false);
  };

  const filteredUpdates = updates.filter(update => {
    const matchesFilter = filter === 'all' || update.type === filter;
    const matchesSearch = searchTerm === '' || 
      update.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      update.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

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
                    Build in Public
                  </h1>
                  <p className="text-slate-300 text-sm font-medium">Share Your Startup Journey</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 glass-card rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-300 font-medium">500+ Building</span>
              </div>
              <button 
                onClick={() => setShowCreatePost(true)}
                className="btn-modern flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Share Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card rounded-xl p-6 animate-scale-in transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">47</div>
                <div className="text-xs text-slate-400">Active Builders</div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 animate-scale-in transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">$127K</div>
                <div className="text-xs text-slate-400">Total MRR</div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 animate-scale-in transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">156</div>
                <div className="text-xs text-slate-400">Updates Today</div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 animate-scale-in transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Star className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-xs text-slate-400">Launches</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="glass-card rounded-xl p-6 mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search updates, tags, or users..."
                      className="w-full pl-10 pr-4 input-modern"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="select-modern"
                  >
                    <option value="all">All Updates</option>
                    <option value="milestone">Milestones</option>
                    <option value="launch">Launches</option>
                    <option value="progress">Progress</option>
                    <option value="failure">Lessons</option>
                    <option value="question">Questions</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Create Post Modal */}
            {showCreatePost && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
                <div className="glass-card rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Share Your Progress</h3>
                    <button 
                      onClick={() => setShowCreatePost(false)}
                      className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="Share your building journey... What did you accomplish today? What challenges are you facing? What lessons did you learn?"
                      className="w-full px-4 py-3 bg-slate-800/50 rounded-lg text-white placeholder-slate-400 border border-slate-600 focus:border-purple-500 focus:outline-none resize-none"
                      rows={6}
                    />
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                          <Image className="w-4 h-4 text-slate-400" />
                        </button>
                        <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                          <Video className="w-4 h-4 text-slate-400" />
                        </button>
                        <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                          <Link className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setShowCreatePost(false)}
                          className="px-4 py-2 text-slate-400 hover:text-slate-300 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleCreatePost}
                          disabled={!newPost.trim()}
                          className="btn-modern disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Share Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Feed */}
            <div className="space-y-6">
              {filteredUpdates.map((update) => (
                <div key={update.id} className="glass-card rounded-xl p-6 hover:bg-white/5 transition-colors animate-slide-up">
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="text-2xl">{update.user.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{update.user.name}</span>
                        {getTierBadge(update.user.tier)}
                        {update.user.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                        <span className="text-slate-400 text-sm">{update.user.handle}</span>
                        <span className="text-slate-500 text-sm">•</span>
                        <span className="text-slate-500 text-sm">{update.timestamp}</span>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(update.type)} bg-slate-800/50`}>
                          {update.type}
                        </div>
                      </div>
                      {update.ideaId && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-purple-400">Building from idea</span>
                          <button 
                            onClick={() => navigate(`/idea/${update.ideaId}`)}
                            className="text-xs px-2 py-0.5 bg-purple-500/20 hover:bg-purple-500/30 rounded-full text-purple-300 transition-colors"
                          >
                            #{update.ideaId}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <p className="text-slate-300 leading-relaxed">{update.content}</p>
                  </div>

                  {/* Metrics */}
                  {update.metrics && (
                    <div className="flex items-center gap-4 mb-4 p-3 bg-slate-800/30 rounded-lg">
                      {update.metrics.mrr && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-green-400 font-medium">${update.metrics.mrr.toLocaleString()} MRR</span>
                        </div>
                      )}
                      {update.metrics.users && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-blue-400 font-medium">{update.metrics.users} users</span>
                        </div>
                      )}
                      {update.metrics.growth && (
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-purple-400" />
                          <span className="text-sm text-purple-400 font-medium">{update.metrics.growth}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  {update.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {update.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-slate-700/50 rounded-full text-slate-400 text-xs hover:bg-slate-600/50 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-6 pt-3 border-t border-slate-700/50">
                    <button className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{update.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{update.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors">
                      <Share className="w-4 h-4" />
                      <span className="text-sm">{update.shares}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="px-6 py-3 glass-card rounded-lg hover:bg-white/10 transition-colors text-slate-300 font-medium">
                Load More Updates
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trending Tags */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Trending</h3>
              </div>
              <div className="space-y-2">
                {['ai-tools', 'saas', 'mvp', 'validation', 'launch'].map((tag) => (
                  <button
                    key={tag}
                    className="block w-full text-left px-3 py-2 glass-card rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setSearchTerm(tag)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">#{tag}</span>
                      <span className="text-slate-500 text-xs">24 posts</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Community</h3>
              </div>
              <div className="space-y-3 text-sm text-slate-400">
                <p>🚀 Share your wins and failures</p>
                <p>💡 Ask for feedback and advice</p>
                <p>🤝 Support fellow builders</p>
                <p>📈 Share real metrics when possible</p>
              </div>
              <button 
                onClick={() => navigate('/pricing')}
                className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-medium text-sm transition-all"
              >
                Upgrade for More Features
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildInPublic;