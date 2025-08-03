import React, { useState } from 'react';
import { Camera, Heart, MessageCircle, Share, Plus, Image, Video, Link, TrendingUp, DollarSign, Users } from 'lucide-react';

interface BuildUpdate {
  id: string;
  user: {
    name: string;
    avatar: string;
    handle: string;
    verified: boolean;
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
}

const BuildInPublicFeed: React.FC = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState('');

  const updates: BuildUpdate[] = [
    {
      id: '1',
      user: {
        name: 'Sarah Chen',
        avatar: '👩‍💻',
        handle: '@sarahbuilds',
        verified: true
      },
      timestamp: '2h ago',
      content: '🚀 Just hit $2,000 MRR with my AI writing tool! Started from idea #143 in StartupIntel. The community feedback was invaluable. Next milestone: $5K MRR by end of month! 💪',
      images: ['screenshot-mrr.png'],
      metrics: {
        mrr: 2000,
        users: 150,
        growth: '+25%'
      },
      likes: 47,
      comments: 12,
      shares: 8,
      tags: ['milestone', 'ai-tools', 'mrr'],
      ideaId: '143'
    },
    {
      id: '2',
      user: {
        name: 'Marcus Torres',
        avatar: '👨‍🚀',
        handle: '@marcustech',
        verified: false
      },
      timestamp: '5h ago',
      content: 'Week 3 of building my productivity app. UI is coming together nicely! Still validating the market but early user interviews are promising. Building in public forces me to stay accountable 📈',
      images: ['ui-mockup.png', 'user-feedback.png'],
      likes: 23,
      comments: 5,
      shares: 3,
      tags: ['ui-design', 'validation', 'productivity'],
      ideaId: '87'
    },
    {
      id: '3',
      user: {
        name: 'Elena Vasquez',
        avatar: '👩‍💼',
        handle: '@elenavalidates',
        verified: true
      },
      timestamp: '8h ago',
      content: 'Market research complete! Interviewed 25 potential customers for my SaaS analytics tool. 84% said they\'d pay $29/month. Time to build the MVP! 🔥',
      metrics: {
        users: 25
      },
      likes: 31,
      comments: 7,
      shares: 12,
      tags: ['market-research', 'analytics', 'saas'],
      ideaId: '156'
    },
    {
      id: '4',
      user: {
        name: 'Alex Kim',
        avatar: '👨‍💻',
        handle: '@alexcodes',
        verified: false
      },
      timestamp: '12h ago',
      content: 'Failed attempt #3 at building a social media scheduler. But learned so much! Sometimes the best lessons come from failures. On to the next idea from StartupIntel 💪',
      likes: 19,
      comments: 15,
      shares: 2,
      tags: ['failure', 'learning', 'social-media']
    },
    {
      id: '5',
      user: {
        name: 'Nina Patel',
        avatar: '👩‍🎨',
        handle: '@ninadesigns',
        verified: true
      },
      timestamp: '1d ago',
      content: 'Just launched the beta of my design feedback platform! 100 users signed up in the first 24 hours. The power of building with community feedback is real 🎨✨',
      metrics: {
        users: 100,
        growth: '+100 users'
      },
      likes: 56,
      comments: 18,
      shares: 14,
      tags: ['launch', 'design-tools', 'beta'],
      ideaId: '92'
    }
  ];

  const handleCreatePost = () => {
    // Handle post creation logic
    setNewPost('');
    setShowCreatePost(false);
  };

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            You
          </div>
          <div className="flex-1">
            {!showCreatePost ? (
              <button
                onClick={() => setShowCreatePost(true)}
                className="w-full text-left px-4 py-3 bg-slate-800/50 rounded-lg text-slate-400 hover:bg-slate-700/50 transition-colors"
              >
                Share your building progress...
              </button>
            ) : (
              <div className="space-y-3">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What are you building today? Share your progress, wins, or lessons learned..."
                  className="w-full px-4 py-3 bg-slate-800/50 rounded-lg text-white placeholder-slate-400 border border-slate-600 focus:border-purple-500 focus:outline-none resize-none"
                  rows={4}
                />
                <div className="flex items-center justify-between">
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
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowCreatePost(false)}
                      className="px-4 py-2 text-slate-400 hover:text-slate-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreatePost}
                      disabled={!newPost.trim()}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors"
                    >
                      Share Update
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {updates.map((update) => (
          <div key={update.id} className="glass-card rounded-xl p-6 hover:bg-white/5 transition-colors">
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="text-2xl">{update.user.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{update.user.name}</span>
                  {update.user.verified && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  <span className="text-slate-400 text-sm">{update.user.handle}</span>
                  <span className="text-slate-500 text-sm">•</span>
                  <span className="text-slate-500 text-sm">{update.timestamp}</span>
                </div>
                {update.ideaId && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-purple-400">Building from idea</span>
                    <span className="text-xs px-2 py-0.5 bg-purple-500/20 rounded-full text-purple-300">
                      #{update.ideaId}
                    </span>
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
      <div className="text-center">
        <button className="px-6 py-3 glass-card rounded-lg hover:bg-white/10 transition-colors text-slate-300 font-medium">
          Load More Updates
        </button>
      </div>
    </div>
  );
};

export default BuildInPublicFeed;