import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Zap, Brain, TrendingUp, Target, Shield, Clock, Star, Sparkles } from 'lucide-react';

const Pricing: React.FC = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for exploring opportunities',
      features: [
        '10 AI-analyzed ideas per month',
        'Basic filtering & search',
        'Read-only community access',
        'Score explanations',
        'Export limited data'
      ],
      limitations: [
        'No real-time updates',
        'Limited advanced filters',
        'No API access'
      ],
      buttonText: 'Get Started',
      buttonClass: 'px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-semibold transition-colors',
      popular: false
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'For serious indie hackers',
      features: [
        'Unlimited AI-analyzed ideas',
        'Real-time Grok 4 updates (24h)',
        'Full community access & messaging',
        'Advanced filtering & sorting',
        'Export to CSV/JSON',
        'Priority customer support',
        'Trend analysis & alerts',
        'Custom scoring weights',
        'Historical data access'
      ],
      buttonText: 'Start Pro Trial',
      buttonClass: 'px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold transition-all',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: 'per month',
      description: 'For teams & organizations',
      features: [
        'Everything in Pro',
        'API access (10,000 calls/month)',
        'Private team community channels',
        'White-label solutions',
        'Custom integrations',
        'Team collaboration tools',
        'Dedicated account manager',
        'Custom scoring models',
        'Bulk data exports',
        'SLA guarantee (99.9% uptime)'
      ],
      buttonText: 'Contact Sales',
      buttonClass: 'px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-semibold transition-colors',
      popular: false
    }
  ];

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
                  <p className="text-slate-300 text-sm font-medium">Choose Your Intelligence Level</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 glass-card rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-300 font-medium">Live Intelligence</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-purple-400 font-semibold">AI-Powered Startup Intelligence</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 heading-font">
            Stop Guessing.
            <span className="gradient-text"> Start Building.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Get instant access to AI-validated startup opportunities with real MRR data, 
            risk analysis, and market intelligence powered by Grok 4.
          </p>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card rounded-xl p-6 text-center">
            <div className="p-3 bg-purple-500/20 rounded-xl w-fit mx-auto mb-4">
              <Brain className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI-Analyzed Intelligence</h3>
            <p className="text-slate-400">Real opportunities from X (Twitter) analyzed by Grok 4 AI with market validation</p>
          </div>
          
          <div className="glass-card rounded-xl p-6 text-center">
            <div className="p-3 bg-green-500/20 rounded-xl w-fit mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Proven Revenue Data</h3>
            <p className="text-slate-400">Every idea includes real MRR numbers, build time estimates, and success probability</p>
          </div>
          
          <div className="glass-card rounded-xl p-6 text-center">
            <div className="p-3 bg-blue-500/20 rounded-xl w-fit mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Real-Time Updates</h3>
            <p className="text-slate-400">Fresh opportunities added daily with live market intelligence and trend analysis</p>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`glass-card rounded-xl p-8 relative ${
                plan.popular ? 'border-2 border-purple-500/50 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400 ml-2">/{plan.period}</span>
                </div>
                <p className="text-slate-400">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
                
                {plan.limitations && (
                  <div className="pt-4 border-t border-slate-700/50">
                    {plan.limitations.map((limitation, idx) => (
                      <div key={idx} className="flex items-start gap-3 opacity-60">
                        <div className="w-5 h-5 flex-shrink-0 mt-0.5 flex items-center justify-center">
                          <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                        </div>
                        <span className="text-slate-400 text-sm">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className={plan.buttonClass + ' w-full'}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* ROI Calculator */}
        <div className="glass-card rounded-xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Return on Investment</h2>
            <p className="text-slate-400">See how StartupIntel AI pays for itself</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">2-5 hours</div>
              <div className="text-slate-300 font-medium mb-2">Time Saved per Idea</div>
              <div className="text-slate-500 text-sm">No more endless scrolling through Twitter/Reddit</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">$2,000+</div>
              <div className="text-slate-300 font-medium mb-2">Avoided Failed Projects</div>
              <div className="text-slate-500 text-sm">AI risk analysis prevents costly mistakes</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">23%</div>
              <div className="text-slate-300 font-medium mb-2">Higher Success Rate</div>
              <div className="text-slate-500 text-sm">Based on validated market opportunities</div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">How fresh is the data?</h3>
              <p className="text-slate-400">Pro subscribers get real-time updates within 24 hours. We continuously monitor X (Twitter) and analyze new opportunities using Grok 4 AI.</p>
            </div>
            
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">What makes this different from manual research?</h3>
              <p className="text-slate-400">Our AI processes thousands of conversations daily, extracts verified MRR data, and provides risk analysis that would take you weeks to research manually.</p>
            </div>
            
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Can I cancel anytime?</h3>
              <p className="text-slate-400">Yes! All subscriptions are month-to-month with no long-term commitments. Cancel anytime from your account settings.</p>
            </div>
            
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Do you offer refunds?</h3>
              <p className="text-slate-400">We offer a 14-day money-back guarantee if you're not satisfied with the quality of our AI analysis and market intelligence.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="glass-card rounded-xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Stop Guessing?</h2>
            <p className="text-slate-400 mb-6">Join 500+ indie hackers who use AI intelligence to validate their next big idea.</p>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold text-lg transition-all flex items-center gap-2 mx-auto">
              <Zap className="w-5 h-5" />
              Start Your Free Trial
            </button>
            <p className="text-slate-500 text-sm mt-3">No credit card required • 14-day money-back guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;