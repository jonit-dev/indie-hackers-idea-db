import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, SlidersHorizontal, X, ChevronDown, Check, ChevronLeft, ChevronRight, Brain, Zap, Activity, Heart } from 'lucide-react';
import IdeasTable from '../components/IdeasTable';
import { useMicroSaasStore } from '../stores/microSaasStore';

const MultiSelectDropdown: React.FC<{
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
}> = memo(({ options, selected, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [isOpen]);

  const handleToggleOption = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  const dropdownContent = isOpen ? (
    <div 
      ref={dropdownRef}
      className="fixed glass-card rounded-xl shadow-lg max-h-60 overflow-y-auto animate-slide-up"
      style={{
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        width: dropdownPosition.width,
        zIndex: 99999
      }}
    >
      {options.map((option) => (
        <div
          key={option}
          className="flex items-center px-3 py-2 text-sm text-white hover:bg-white/5 cursor-pointer rounded-lg mx-1 transition-colors"
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
  ) : null;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        className="w-full input-modern flex items-center justify-between"
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

      {createPortal(dropdownContent, document.body)}
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

function Dashboard() {
  const navigate = useNavigate();
  const {
    searchTerm,
    filterNiche,
    filterComp,
    filterComplexity,
    filterOneKMrrChance,
    filterAI,
    filterFavorites,
    filterInfrastructure,
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
    setFilterFavorites,
    setFilterInfrastructure,
    setShowAdvancedFilters,
    setSortBy,
    setSortOrder,
    setCurrentPage,
    setItemsPerPage,
    clearAllFilters,
    getPaginatedIdeas,
    hasActiveFilters,
    getTotalIdeas,
    getHighScoreIdeas,
    getAvgScore,
    getNiches
  } = useMicroSaasStore();

  const niches = getNiches();

  const competitions = ['All', 'Low', 'Medium', 'High'];
  const complexities = ['All', 'Very Low', 'Low', 'Medium', 'High', 'Very High'];
  const oneKMrrChances = ['All', 'High', 'Medium', 'Low'];
  const aiOptions = ['All', 'AI', 'Non-AI'];
  const favoritesOptions = ['All', 'Favorites', 'Non-Favorites'];
  const infrastructureOptions = ['All', 'Supabase Only', 'Edge Stack', 'Complex'];

  const paginatedData = getPaginatedIdeas();
  
  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage > paginatedData.totalPages && paginatedData.totalPages > 0) {
      setCurrentPage(1);
    }
  }, [searchTerm, filterNiche, filterComp, filterComplexity, filterOneKMrrChance, filterAI, filterFavorites, filterInfrastructure, currentPage, paginatedData.totalPages, setCurrentPage]);

  const handleRowClick = useCallback((idea: { id: string }) => {
    navigate(`/idea/${idea.id}`);
  }, [navigate]);

  const activeFilters = hasActiveFilters();

  const totalIdeas = getTotalIdeas();
  const highScoreIdeas = getHighScoreIdeas();
  const avgScore = getAvgScore();
  const { favorites } = useMicroSaasStore();

  return (
    <div className="min-h-screen modern-typography" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="glass-effect border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 glass-card rounded-xl">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white heading-font gradient-text">
                  StartupIntel AI
                </h1>
                <p className="text-slate-300 text-sm font-medium">AI-Powered Startup Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* My Ideas Section */}
              <div className="flex items-center gap-2 px-3 py-2 glass-card rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                   onClick={() => setFilterFavorites('Favorites')}>
                <Heart className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-slate-300 font-medium">My Ideas</span>
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full">
                  {favorites.length}
                </span>
              </div>
              
              <button 
                onClick={() => navigate('/pricing')}
                className="btn-modern flex items-center gap-2 animate-scale-in"
              >
                <Zap className="w-4 h-4" />
                <span className="font-semibold text-sm">Get Premium</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content with container constraints */}
      <div className="container mx-auto px-6 py-6">

        {/* Compact Stats */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="glass-card rounded-lg p-2 text-center">
            <div className="text-base font-bold text-white">{totalIdeas}</div>
            <div className="text-xs text-slate-400">Ideas</div>
          </div>
          <div className="glass-card rounded-lg p-2 text-center">
            <div className="text-base font-bold text-white">{highScoreIdeas}</div>
            <div className="text-xs text-slate-400">High Score</div>
          </div>
          <div className="glass-card rounded-lg p-2 text-center">
            <div className="text-base font-bold text-white">{avgScore}</div>
            <div className="text-xs text-slate-400">Avg Score</div>
          </div>
          <div className="glass-card rounded-lg p-2 text-center">
            <div className="flex justify-center mb-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-xs text-slate-400">Live Data</div>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-xl p-4 mb-4">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end">
              {/* Search - takes most space */}
              <div className="lg:col-span-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search AI-analyzed opportunities..."
                    className="w-full pl-10 pr-4 input-modern"
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
                <label className="block text-xs font-medium text-slate-400 mb-1">Competition</label>
                <select
                  className="w-full select-modern"
                  value={filterComp}
                  onChange={(e) => setFilterComp(e.target.value)}
                >
                  {competitions.map(comp => (
                    <option key={comp} value={comp} className="bg-slate-800 text-white">
                      {comp === 'All' ? 'All Competition' : comp}
                    </option>
                  ))}
                </select>
              </div>

              {/* AI Filter */}
              <div className="lg:col-span-2">
                <label className="block text-xs font-medium text-slate-400 mb-1">AI Filter</label>
                <select
                  className="w-full select-modern"
                  value={filterAI}
                  onChange={(e) => setFilterAI(e.target.value)}
                >
                  {aiOptions.map(option => (
                    <option key={option} value={option} className="bg-slate-800 text-white">
                      {option === 'All' ? 'All Tools' : option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Favorites Filter */}
              <div className="lg:col-span-2">
                <label className="block text-xs font-medium text-slate-400 mb-1">Favorites</label>
                <select
                  className="w-full select-modern"
                  value={filterFavorites}
                  onChange={(e) => setFilterFavorites(e.target.value)}
                >
                  {favoritesOptions.map(option => (
                    <option key={option} value={option} className="bg-slate-800 text-white">
                      {option === 'All' ? 'All Ideas' : option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="lg:col-span-1">
                <label className="block text-xs font-medium text-slate-400 mb-1">Sort By</label>
                <select
                  className="w-full select-modern"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="score" className="bg-slate-800 text-white">Score</option>
                  <option value="mrr" className="bg-slate-800 text-white">MRR</option>
                  <option value="mvpWk" className="bg-slate-800 text-white">MVP Time</option>
                  <option value="niche" className="bg-slate-800 text-white">Niche</option>
                </select>
              </div>

              {/* Actions */}
              <div className="lg:col-span-1 flex gap-1 items-end">
                <button 
                  className={`filter-button ${showAdvancedFilters ? 'active' : ''}`}
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
                {activeFilters && (
                  <button 
                    className="filter-button danger"
                    onClick={clearAllFilters}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Advanced Filters (Collapsible) */}
            {showAdvancedFilters && (
              <div className="border-t border-white/10 pt-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Complexity</label>
                    <select
                      className="w-full select-modern"
                      value={filterComplexity}
                      onChange={(e) => setFilterComplexity(e.target.value)}
                    >
                      {complexities.map(complexity => (
                        <option key={complexity} value={complexity} className="bg-slate-800 text-white">
                          {complexity === 'All' ? 'All Complexity' : complexity}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">1k MRR Chance</label>
                    <select
                      className="w-full select-modern"
                      value={filterOneKMrrChance}
                      onChange={(e) => setFilterOneKMrrChance(e.target.value)}
                    >
                      {oneKMrrChances.map(chance => (
                        <option key={chance} value={chance} className="bg-slate-800 text-white">
                          {chance === 'All' ? 'All Chances' : chance}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Infrastructure</label>
                    <select
                      className="w-full select-modern"
                      value={filterInfrastructure}
                      onChange={(e) => setFilterInfrastructure(e.target.value)}
                    >
                      {infrastructureOptions.map(option => (
                        <option key={option} value={option} className="bg-slate-800 text-white">
                          {option === 'All' ? 'All Infrastructure' : option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Sort Order</label>
                    <select
                      className="w-full select-modern"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    >
                      <option value="desc" className="bg-slate-800 text-white">High to Low</option>
                      <option value="asc" className="bg-slate-800 text-white">Low to High</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {/* Selected Filters Display */}
            {filterNiche.length > 0 && (
              <div className="border-t border-white/10 pt-3">
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

        {/* Intelligence Results */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-slate-300 text-sm font-medium">
                <span className="font-bold text-white">{paginatedData.totalItems}</span> AI-validated opportunities
              </p>
              {activeFilters && (
                <p className="text-xs text-slate-500 mt-1">
                  Smart filters active - <button className="text-purple-400 hover:text-purple-300 font-medium" onClick={clearAllFilters}>clear all</button>
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 px-3 py-1 glass-card rounded-full">
              <Brain className="w-3 h-3 text-purple-400" />
              <span className="text-xs text-slate-300">Grok 4 Analysis</span>
            </div>
          </div>
        </div>

        {/* Ideas Table - Full Width */}
        <div className="glass-card rounded-xl overflow-hidden animate-slide-up">
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
        {/* Quick Insights - Horizontal Layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <Brain className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-semibold text-white">AI Insights</h3>
            </div>
            <div className="text-xs text-slate-300">AI Tools seeing 400% growth this month</div>
          </div>

          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h3 className="text-sm font-semibold text-white">Success Pattern</h3>
            </div>
            <div className="text-xs text-slate-300">SaaS ideas hitting $1K MRR 30% faster</div>
          </div>

          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-semibold text-white">Community</h3>
            </div>
            <div className="text-xs text-slate-300">47 active builders, $127K total MRR</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;