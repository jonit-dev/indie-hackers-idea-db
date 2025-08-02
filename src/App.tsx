import React from 'react';
import { Search, Plus, Database, TrendingUp, SlidersHorizontal, X } from 'lucide-react';
import IdeasTable from './components/IdeasTable';
import InsightsModal from './components/InsightsModal';
import { useMicroSaasStore } from './stores/microSaasStore';

function App() {
  const {
    selectedIdea,
    isModalOpen,
    searchTerm,
    filterNiche,
    filterComp,
    filterComplexity,
    filterOneKMrrChance,
    filterAI,
    showAdvancedFilters,
    sortBy,
    sortOrder,
    setSearchTerm,
    setFilterNiche,
    setFilterComp,
    setFilterComplexity,
    setFilterOneKMrrChance,
    setFilterAI,
    setShowAdvancedFilters,
    setSortBy,
    setSortOrder,
    clearAllFilters,
    openModal,
    closeModal,
    getFilteredIdeas,
    hasActiveFilters,
    getTotalIdeas,
    getHighScoreIdeas,
    getAvgScore,
    getNiches
  } = useMicroSaasStore();

  const niches = getNiches();

  const competitions = ['All', 'Low', 'Med', 'High'];
  const complexities = ['All', '1', '2', '3', '4', '5'];
  const oneKMrrChances = ['All', 'H', 'M', 'L'];
  const aiOptions = ['All', 'AI', 'Non-AI'];

  const filteredIdeas = getFilteredIdeas();

  const handleRowClick = openModal;
  const handleCloseModal = closeModal;


  const activeFilters = hasActiveFilters();

  const totalIdeas = getTotalIdeas();
  const highScoreIdeas = getHighScoreIdeas();
  const avgScore = getAvgScore();

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
                <div className="text-2xl font-bold text-white">{highScoreIdeas}</div>
                <div className="text-xs text-slate-400">high score</div>
              </div>
            </div>
            <div className="text-sm font-medium text-slate-300">Score ≥ 80</div>
            <div className="text-xs text-slate-500 mt-1">High potential ideas</div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:bg-slate-750 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-slate-700 rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{avgScore}/100</div>
                <div className="text-xs text-slate-400">average</div>
              </div>
            </div>
            <div className="text-sm font-medium text-slate-300">Avg Score</div>
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
                  value={filterNiche}
                  onChange={(e) => setFilterNiche(e.target.value)}
                >
                  {niches.map(niche => (
                    <option key={niche} value={niche} className="bg-slate-800 text-white">
                      {niche === 'All' ? 'All Niches' : niche}
                    </option>
                  ))}
                </select>

                <select
                  className="px-3 py-2.5 text-sm font-medium text-white min-w-[100px] bg-slate-700 border border-slate-600 rounded-lg focus:border-slate-500 focus:outline-none"
                  value={filterComp}
                  onChange={(e) => setFilterComp(e.target.value)}
                >
                  {competitions.map(comp => (
                    <option key={comp} value={comp} className="bg-slate-800 text-white">
                      {comp === 'All' ? 'All Competition' : comp}
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
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Complexity</label>
                    <select
                      className="w-full px-3 py-2 text-sm font-medium text-white bg-slate-700 border border-slate-600 rounded-lg focus:border-slate-500 focus:outline-none"
                      value={filterComplexity}
                      onChange={(e) => setFilterComplexity(e.target.value)}
                    >
                      {complexities.map(complexity => (
                        <option key={complexity} value={complexity} className="bg-slate-800 text-white">{complexity}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">1k MRR Chance</label>
                    <select
                      className="w-full px-3 py-2 text-sm font-medium text-white bg-slate-700 border border-slate-600 rounded-lg focus:border-slate-500 focus:outline-none"
                      value={filterOneKMrrChance}
                      onChange={(e) => setFilterOneKMrrChance(e.target.value)}
                    >
                      {oneKMrrChances.map(chance => (
                        <option key={chance} value={chance} className="bg-slate-800 text-white">{chance}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">AI Type</label>
                    <select
                      className="w-full px-3 py-2 text-sm font-medium text-white bg-slate-700 border border-slate-600 rounded-lg focus:border-slate-500 focus:outline-none"
                      value={filterAI}
                      onChange={(e) => setFilterAI(e.target.value)}
                    >
                      {aiOptions.map(option => (
                        <option key={option} value={option} className="bg-slate-800 text-white">{option}</option>
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
                      <option value="score" className="bg-slate-800 text-white">Score</option>
                      <option value="mrr" className="bg-slate-800 text-white">MRR</option>
                      <option value="mvpWk" className="bg-slate-800 text-white">MVP Weeks</option>
                      <option value="niche" className="bg-slate-800 text-white">Niche</option>
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

                {activeFilters && (
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
            {activeFilters && (
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