import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, TrendingUp, Star, Zap, CheckCircle, DollarSign, Users, BarChart3, Sparkles, Play, X, Quote } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const stats = [
    { value: '500+', label: 'Indie Hackers', description: 'Trust our AI analysis' },
    { value: '163', label: 'Validated Ideas', description: 'With real MRR data' },
    { value: '23%', label: 'Higher Success', description: 'vs manual research' },
    { value: '2.4hrs', label: 'Saved per Idea', description: 'Average time savings' }
  ];

  const features = [
    {
      icon: Brain,
      title: 'Grok 4 AI Analysis',
      description: 'Real-time idea sourcing from X (Twitter) with advanced AI validation and scoring',
      highlight: 'Live Intelligence'
    },
    {
      icon: DollarSign,
      title: 'Verified MRR Data',
      description: 'Every opportunity includes real revenue numbers, build costs, and time estimates',
      highlight: 'Proven Revenue'
    },
    {
      icon: Users,
      title: 'Elite Community Access',
      description: 'Connect with 500+ successful indie hackers, share insights, and get feedback on your ideas',
      highlight: 'Network Effect'
    },
    {
      icon: TrendingUp,
      title: 'Risk Assessment',
      description: 'AI-powered market analysis with competition, platform dependency, and legal risks',
      highlight: 'Smart Insights'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Solo Founder',
      avatar: '👩‍💻',
      quote: 'Found my $8K MRR idea in the first week. The AI analysis saved me months of research.',
      result: '$8,000 MRR in 4 months'
    },
    {
      name: 'Marcus Torres',
      role: 'Serial Entrepreneur',
      avatar: '👨‍🚀',
      quote: 'The risk assessment prevented me from building in a saturated market. Worth every penny.',
      result: 'Avoided $15K mistake'
    },
    {
      name: 'Elena Vasquez',
      role: 'Product Manager',
      avatar: '👩‍💼',
      quote: 'Real MRR data gave me confidence to quit my job. Now at $12K MRR and growing.',
      result: '$12,000 MRR'
    }
  ];

  const painPoints = [
    'Spending weeks scrolling Twitter/Reddit for opportunities',
    'Building ideas that already have 50+ competitors',
    'No real revenue data - just guesswork and hopes',
    'Missing market trends and emerging opportunities',
    'Wasting months on ideas with high platform risk'
  ];

  return (
    <div className="min-h-screen modern-typography" style={{ background: 'var(--bg-primary)' }}>
      {/* Navigation */}
      <nav className="glass-effect border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 glass-card rounded-xl">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white heading-font gradient-text">
                  StartupIntel AI
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="text-slate-300 hover:text-white transition-colors"
              >
                View Intelligence
              </button>
              <button 
                onClick={() => navigate('/pricing')}
                className="px-4 py-2 glass-card rounded-lg hover:bg-white/10 transition-colors text-slate-300"
              >
                Pricing
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="btn-modern flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-purple-400 font-semibold">AI-Powered Startup Intelligence</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 heading-font leading-tight">
            Stop Building
            <span className="gradient-text block">Random Ideas</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Get instant access to <strong className="text-white">AI-validated startup opportunities</strong> with real MRR data, 
            risk analysis, and <strong className="text-purple-400">exclusive community access</strong> to 500+ successful indie hackers.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-white font-semibold text-lg transition-all flex items-center gap-3 min-w-64"
            >
              <Brain className="w-6 h-6" />
              Explore AI Intelligence
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => setIsVideoOpen(true)}
              className="px-8 py-4 glass-card rounded-xl text-white font-semibold text-lg hover:bg-white/10 transition-all flex items-center gap-3 min-w-64"
            >
              <Play className="w-6 h-6" />
              Watch Demo (2min)
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              14-day money-back guarantee
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Instant access
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-slate-300 mb-1">{stat.label}</div>
              <div className="text-sm text-slate-500">{stat.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Tired of Building in the Dark?
          </h2>
          <p className="text-xl text-slate-400 mb-12">
            Most indie hackers waste months on ideas that were doomed from day one
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {painPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-4 p-4 glass-card rounded-xl">
                <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <X className="w-4 h-4 text-red-400" />
                </div>
                <p className="text-slate-300">{point}</p>
              </div>
            ))}
          </div>
          
          <div className="glass-card rounded-xl p-8 border-l-4 border-purple-500">
            <h3 className="text-2xl font-bold text-white mb-4">The Reality Check</h3>
            <div className="space-y-4 text-slate-300">
              <p><strong className="text-red-400">73%</strong> of indie hackers quit within 6 months</p>
              <p><strong className="text-red-400">$2,847</strong> average loss on failed projects</p>
              <p><strong className="text-red-400">127 hours</strong> wasted on manual research per idea</p>
            </div>
            <div className="mt-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <p className="text-purple-300 font-medium">What if you could validate ideas in minutes, not months?</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Meet Your AI Research Assistant
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            While you sleep, our AI scans thousands of conversations, validates opportunities, 
            and serves you a curated list of proven winners every morning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="glass-card rounded-xl p-8 hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <feature.icon className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                    <span className="px-2 py-1 bg-green-500/20 rounded-full text-green-300 text-xs font-medium">
                      {feature.highlight}
                    </span>
                  </div>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-white font-semibold text-lg transition-all inline-flex items-center gap-3"
          >
            <Brain className="w-6 h-6" />
            Experience the Intelligence
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Real Results from Real Founders
          </h2>
          <p className="text-xl text-slate-400">
            Join hundreds of indie hackers who've transformed their approach to startup validation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-card rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-slate-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-slate-300 mb-6 leading-relaxed">
                <Quote className="w-4 h-4 text-purple-400 inline mr-2" />
                {testimonial.quote}
              </blockquote>
              
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="text-green-300 font-semibold text-sm">Result:</div>
                <div className="text-green-400 font-bold">{testimonial.result}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="container mx-auto px-6 py-16">
        <div className="glass-card rounded-xl p-12 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              See Your ROI in Real Numbers
            </h2>
            <p className="text-xl text-slate-400">
              StartupIntel AI pays for itself with just one avoided mistake
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-400 mb-4">$2,847</div>
              <div className="text-lg font-semibold text-white mb-2">Average Failed Project Cost</div>
              <div className="text-slate-400">Time + development + opportunity cost</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-4">$228</div>
              <div className="text-lg font-semibold text-white mb-2">Annual StartupIntel Cost</div>
              <div className="text-slate-400">Pro plan with full AI intelligence</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-4">1,250%</div>
              <div className="text-lg font-semibold text-white mb-2">ROI from One Save</div>
              <div className="text-slate-400">Just avoid one bad idea and you're ahead</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 py-16">
        <div className="glass-card rounded-xl p-12 text-center max-w-4xl mx-auto border-l-4 border-purple-500">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build with Confidence?
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Join 500+ indie hackers who've stopped guessing and started building 
            validated opportunities with AI-powered intelligence.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-white font-semibold text-lg transition-all flex items-center gap-3 min-w-64"
            >
              <Brain className="w-6 h-6" />
              Start Free Trial Now
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => navigate('/pricing')}
              className="px-8 py-4 glass-card rounded-xl text-white font-semibold text-lg hover:bg-white/10 transition-all flex items-center gap-3 min-w-64"
            >
              <BarChart3 className="w-6 h-6" />
              View Pricing Plans
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <CheckCircle className="w-4 h-4 text-green-400" />
              No setup required
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Cancel anytime
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Live AI updates
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 glass-card rounded-xl">
                <Brain className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="font-bold text-white">StartupIntel AI</div>
                <div className="text-slate-400 text-sm">AI-Powered Startup Intelligence</div>
              </div>
            </div>
            <div className="text-slate-500 text-sm">
              © 2025 StartupIntel AI. Built with AI for builders.
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-slate-900 rounded-xl p-6 max-w-4xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">StartupIntel AI Demo</h3>
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <p className="text-slate-400">Demo video coming soon...</p>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition-colors"
                >
                  Explore Live Platform Instead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;