import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Search, Plus, Database, TrendingUp, SlidersHorizontal, X, Tag, ChevronDown, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import IdeasTable from './components/IdeasTable';
import InsightsModal from './components/InsightsModal';
import { useMicroSaasStore } from './stores/microSaasStore';

const MultiSelectDropdown: React.FC<{
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
}> = memo(({ options, selected, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleOption = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="w-full px-3 py-2.5 text-sm font-medium text-left text-white bg-slate-700 border border-slate-600 rounded-lg focus:border-slate-500 focus:outline-none flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">
          {selected.length === 0 
            ? placeholder 
            : selected.length === 1 
              ? selected[0] 
              : `${selected.length} niches selected`
          }
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              className="flex items-center px-3 py-2 text-sm text-white hover:bg-slate-700 cursor-pointer"
              onClick={() => handleToggleOption(option)}
            >
              <div className={`w-4 h-4 mr-3 border border-slate-500 rounded flex items-center justify-center ${
                selected.includes(option) ? 'bg-purple-600 border-purple-500' : 'bg-transparent'
              }`}>
                {selected.includes(option) && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="truncate">{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

MultiSelectDropdown.displayName = 'MultiSelectDropdown';

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (count: number) => void;
}> = memo(({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange, onItemsPerPageChange }) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }
    
    if (currentPage - delta > 2) {
      range.unshift('...');
    }
    if (currentPage + delta < totalPages - 1) {
      range.push('...');
    }
    
    range.unshift(1);
    if (totalPages !== 1) {
      range.push(totalPages);
    }
    
    return range;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-t border-slate-700">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="px-2 py-1 text-sm bg-slate-700 border border-slate-600 rounded text-white focus:border-slate-500 focus:outline-none"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-sm text-slate-400">per page</span>
        </div>
        <div className="text-sm text-slate-400">
          Showing {startItem}-{endItem} of {totalItems} results
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-400"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
              page === currentPage
                ? 'bg-purple-600 border-purple-500 text-white'
                : page === '...'
                  ? 'border-transparent text-slate-500 cursor-default'
                  : 'border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-400"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});

Pagination.displayName = 'Pagination';

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
    currentPage,
    itemsPerPage,
    setSearchTerm,
    setFilterNiche,
    setFilterComp,
    setFilterComplexity,
    setFilterOneKMrrChance,
    setFilterAI,
    setShowAdvancedFilters,
    setSortBy,
    setSortOrder,
    setCurrentPage,
    setItemsPerPage,
    clearAllFilters,
    openModal,
    closeModal,
    getFilteredIdeas,
    getPaginatedIdeas,
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
  const paginatedData = getPaginatedIdeas();
  
  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage > paginatedData.totalPages && paginatedData.totalPages > 0) {
      setCurrentPage(1);
    }
  }, [searchTerm, filterNiche, filterComp, filterComplexity, filterOneKMrrChance, filterAI, currentPage, paginatedData.totalPages, setCurrentPage]);

  const handleRowClick = useCallback(openModal, [openModal]);
  const handleCloseModal = useCallback(closeModal, [closeModal]);


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

        {/* Compact Filters */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-6">
          <div className="flex flex-col gap-4">
            {/* Single Row Filters */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end">
              {/* Search - takes most space */}
              <div className="lg:col-span-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search ideas..."
                    className="w-full pl-10 pr-4 py-2.5 text-sm font-medium text-white placeholder-slate-400 bg-slate-700 border border-slate-600 rounded-lg focus:border-slate-500 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Niche Filter */}
              <div className="lg:col-span-2">
                <MultiSelectDropdown
                  options={niches}
                  selected={filterNiche}
                  onChange={setFilterNiche}
                  placeholder="Niches"
                />
              </div>

              {/* Competition Filter */}
              <div className="lg:col-span-2">
                <select
                  className="w-full px-3 py-2.5 text-sm font-medium text-white bg-slate-700 border border-slate-600 rounded-lg focus:border-slate-500 focus:outline-none"
                  value={filterComp}
                  onChange={(e) => setFilterComp(e.target.value)}
                >
                  {competitions.map(comp => (
                    <option key={comp} value={comp} className="bg-slate-800 text-white">
                      {comp === 'All' ? 'Competition' : comp}
                    </option>
                  ))}
                </select>
              </div>

              {/* AI Filter */}
              <div className="lg:col-span-2">
                <select
                  className="w-full px-3 py-2.5 text-sm font-medium text-white bg-slate-700 border border-slate-600 rounded-lg focus:border-slate-500 focus:outline-none"
                  value={filterAI}
                  onChange={(e) => setFilterAI(e.target.value)}
                >
                  {aiOptions.map(option => (
                    <option key={option} value={option} className="bg-slate-800 text-white">{option}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="lg:col-span-1">
                <select
                  className="w-full px-3 py-2.5 text-sm font-medium text-white bg-slate-700 border border-slate-600 rounded-lg focus:border-slate-500 focus:outline-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="score" className="bg-slate-800 text-white">Score</option>
                  <option value="mrr" className="bg-slate-800 text-white">MRR</option>
                  <option value="mvpWk" className="bg-slate-800 text-white">MVP</option>
                  <option value="niche" className="bg-slate-800 text-white">Niche</option>
                </select>
              </div>

              {/* Actions */}
              <div className="lg:col-span-1 flex gap-1">
                <button 
                  className={`px-2 py-2.5 text-sm font-medium rounded-lg border transition-colors flex items-center justify-center ${
                    showAdvancedFilters 
                      ? 'bg-slate-600 border-slate-500 text-white' 
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                  }`}
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
                {activeFilters && (
                  <button 
                    className="px-2 py-2.5 text-sm font-medium rounded-lg border bg-red-900/20 border-red-800 text-red-400 hover:bg-red-900/30 transition-colors flex items-center justify-center"
                    onClick={clearAllFilters}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Advanced Filters (Collapsible) */}
            {showAdvancedFilters && (
              <div className="border-t border-slate-700 pt-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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
                    <label className="block text-xs font-medium text-slate-400 mb-1">Sort Order</label>
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
              </div>
            )}
            
            {/* Selected Filters Display */}
            {filterNiche.length > 0 && (
              <div className="border-t border-slate-700 pt-3">
                <div className="flex flex-wrap gap-2">
                  {filterNiche.map(niche => (
                    <span
                      key={niche}
                      className="px-2 py-1 bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-medium rounded-md flex items-center gap-1"
                    >
                      {niche}
                      <button
                        onClick={() => setFilterNiche(filterNiche.filter(n => n !== niche))}
                        className="hover:text-purple-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-slate-300 text-sm font-medium">
              Showing <span className="font-bold text-white">{paginatedData.totalItems}</span> of <span className="font-bold text-slate-400">{totalIdeas}</span> ideas
            </p>
            {activeFilters && (
              <p className="text-xs text-slate-500 mt-1">
                Filters applied - <button className="text-purple-400 hover:text-purple-300 font-medium" onClick={clearAllFilters}>clear all</button>
              </p>
            )}
          </div>
        </div>

        {/* Ideas Table */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <IdeasTable ideas={paginatedData.items} onRowClick={handleRowClick} />
          <Pagination
            currentPage={currentPage}
            totalPages={paginatedData.totalPages}
            totalItems={paginatedData.totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>

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