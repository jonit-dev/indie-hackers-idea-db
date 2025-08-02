import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, Database, TrendingUp, SlidersHorizontal, X } from 'lucide-react';
import IdeasTable from './components/IdeasTable';
import InsightsModal from './components/InsightsModal';
import { IndieHackerIdea } from './types/idea';
import { mockIdeas } from './data/mockData';

function App() {
  const [ideas] = useState<IndieHackerIdea[]>(mockIdeas);
  const [selectedIdea, setSelectedIdea] = useState<IndieHackerIdea | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [filterCompetition, setFilterCompetition] = useState('All');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sortBy, setSortBy] = useState('upvotes');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(ideas.map(idea => idea.category)));
    return ['All', ...cats];
  }, [ideas]);

  const statuses = useMemo(() => {
    const stats = Array.from(new Set(ideas.map(idea => idea.status)));
    return ['All', ...stats];
  }, [ideas]);

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const competitions = ['All', 'Low', 'Medium', 'High'];

  const filteredIdeas = useMemo(() => {
    let filtered = ideas.filter(idea => {
      const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = filterCategory === 'All' || idea.category === filterCategory;
      const matchesStatus = filterStatus === 'All' || idea.status === filterStatus;
      const matchesDifficulty = filterDifficulty === 'All' || idea.difficulty === filterDifficulty;
      const matchesCompetition = filterCompetition === 'All' || idea.competition === filterCompetition;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesDifficulty && matchesCompetition;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'marketPotential':
          aValue = a.marketPotential;
          bValue = b.marketPotential;
          break;
        case 'timeToMarket':
          aValue = a.timeToMarket;
          bValue = b.timeToMarket;
          break;
        case 'upvotes':
          aValue = a.upvotes;
          bValue = b.upvotes;
          break;
        case 'dateAdded':
          aValue = new Date(a.dateAdded).getTime();
          bValue = new Date(b.dateAdded).getTime();
          break;
        default:
          aValue = a.upvotes;
          bValue = b.upvotes;
      }

      if (typeof aValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue as string) : (bValue as string).localeCompare(aValue);
      } else {
        return sortOrder === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
      }
    });

    return filtered;
  }, [ideas, searchTerm, filterCategory, filterStatus, filterDifficulty, filterCompetition, sortBy, sortOrder]);

  const handleRowClick = (idea: IndieHackerIdea) => {
    setSelectedIdea(idea);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIdea(null);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilterCategory('All');
    setFilterStatus('All');
    setFilterDifficulty('All');
    setFilterCompetition('All');
    setSortBy('upvotes');
    setSortOrder('desc');
  };

  const hasActiveFilters = searchTerm || filterCategory !== 'All' || filterStatus !== 'All' || 
    filterDifficulty !== 'All' || filterCompetition !== 'All';

  const totalIdeas = ideas.length;
  const launchedIdeas = ideas.filter(idea => idea.status === 'Launched').length;
  const avgMarketPotential = Math.round(ideas.reduce((sum, idea) => sum + idea.marketPotential, 0) / ideas.length);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-slate-700 rounded-lg">
                <Database className="w-6 h-6 text-slate-300" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Indie Hacker Ideas
                </h1>
                <p className="text-slate-400 text-sm">Discover innovative startup concepts</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg border border-slate-600 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4 text-white" />
              <span className="text-white font-medium text-sm">Add Idea</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:bg-slate-750 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-slate-700 rounded-lg">
                <Database className="w-5 h-5 text-slate-300" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{totalIdeas}</div>
                <div className="text-xs text-slate-400">total</div>
              </div>
            </div>
            <div className="text-sm font-medium text-slate-300">Total Ideas</div>
            <div className="text-xs text-slate-500 mt-1">In the database</div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:bg-slate-750 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-slate-700 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{launchedIdeas}</div>
                <div className="text-xs text-slate-400">launched</div>
              </div>
            </div>
            <div className="text-sm font-medium text-slate-300">Launched Projects</div>
            <div className="text-xs text-slate-500 mt-1">Successfully launched</div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:bg-slate-750 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-slate-700 rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{avgMarketPotential}/10</div>
                <div className="text-xs text-slate-400">score</div>
              </div>
            </div>
            <div className="text-sm font-medium text-slate-300">Avg Market Potential</div>
            <div className="text-xs text-slate-500 mt-1">Across all ideas</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-6">
          <div className="flex flex-col gap-4">
            {/* Main Filter Row */}
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search ideas, descriptions, or tags..."
                    className="w-full pl-10 pr-4 py-2.5 text-sm font-medium text-white placeholder-slate-400 bg-slate-700 border border-slate-600 rounded-lg focus:border-slate-500 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <select
                  className="px-3 py-2.5 text-sm font-medium text-white min-w-[120px] bg-slate-700 border border-slate-600 rounded-lg focus:border-slate-500 focus:outline-none"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-slate-800 text-white">
                      {category === 'All' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>

                <select
                  className="px-3 py-2.5 text-sm font-medium text-white min-w-[100px] bg-slate-700 border border-slate-600 rounded-lg focus:border-slate-500 focus:outline-none"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  {statuses.map(status => (
                    <option key={status} value={status} className="bg-slate-800 text-white">
                      {status === 'All' ? 'All Status' : status}
                    </option>
                  ))}
                </select>

                <button 
                  className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors flex items-center gap-2 ${
                    showAdvancedFilters 
                      ? 'bg-slate-600 border-slate-500 text-white' 
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                  }`}
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>More</span>
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="border-t border-slate-700 pt-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Difficulty</label>
                    <select
                      className="w-full px-3 py-2 text-sm font-medium text-white bg-slate-700 border border-slate-600 rounded-lg focus:border-slate-500 focus:outline-none"
                      value={filterDifficulty}
                      onChange={(e) => setFilterDifficulty(e.target.value)}
                    >
                      {difficulties.map(difficulty => (
                        <option key={difficulty} value={difficulty} className="bg-slate-800 text-white">{difficulty}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Competition</label>
                    <select
                      className="w-full px-3 py-2 text-sm font-medium text-white bg-slate-700 border border-slate-600 rounded-lg focus:border-slate-500 focus:outline-none"
                      value={filterCompetition}
                      onChange={(e) => setFilterCompetition(e.target.value)}
                    >
                      {competitions.map(competition => (
                        <option key={competition} value={competition} className="bg-slate-800 text-white">{competition}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Sort By</label>
                    <select
                      className="w-full px-3 py-2 text-sm font-medium text-white bg-slate-700 border border-slate-600 rounded-lg focus:border-slate-500 focus:outline-none"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="upvotes" className="bg-slate-800 text-white">Upvotes</option>
                      <option value="marketPotential" className="bg-slate-800 text-white">Market Potential</option>
                      <option value="timeToMarket" className="bg-slate-800 text-white">Time to Market</option>
                      <option value="title" className="bg-slate-800 text-white">Title</option>
                      <option value="dateAdded" className="bg-slate-800 text-white">Date Added</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Order</label>
                    <select
                      className="w-full px-3 py-2 text-sm font-medium text-white bg-slate-700 border border-slate-600 rounded-lg focus:border-slate-500 focus:outline-none"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    >
                      <option value="desc" className="bg-slate-800 text-white">Descending</option>
                      <option value="asc" className="bg-slate-800 text-white">Ascending</option>
                    </select>
                  </div>
                </div>

                {hasActiveFilters && (
                  <div className="flex justify-end">
                    <button 
                      className="px-3 py-2 text-sm font-medium rounded-lg border bg-red-900/20 border-red-800 text-red-400 hover:bg-red-900/30 transition-colors flex items-center gap-1"
                      onClick={clearAllFilters}
                    >
                      <X className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-slate-300 text-sm font-medium">
              Showing <span className="font-bold text-white">{filteredIdeas.length}</span> of <span className="font-bold text-slate-400">{totalIdeas}</span> ideas
            </p>
            {hasActiveFilters && (
              <p className="text-xs text-slate-500 mt-1">
                Filters applied - <button className="text-purple-400 hover:text-purple-300 font-medium" onClick={clearAllFilters}>clear all</button>
              </p>
            )}
          </div>
        </div>

        {/* Ideas Table */}
        <IdeasTable ideas={filteredIdeas} onRowClick={handleRowClick} />

        {/* Insights Modal */}
        <InsightsModal
          idea={selectedIdea}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}

export default App;