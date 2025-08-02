import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { MicroSaasIdea } from '../types/idea';
import microSaasIdeasData from '../data/microSaasIdeas.json';

interface MicroSaasState {
  // Data
  ideas: MicroSaasIdea[];
  selectedIdea: MicroSaasIdea | null;
  
  // UI State
  isModalOpen: boolean;
  searchTerm: string;
  filterNiche: string[];
  filterComp: string;
  filterComplexity: string;
  filterOneKMrrChance: string;
  filterAI: string;
  showAdvancedFilters: boolean;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  itemsPerPage: number;
  
  // Actions
  setSelectedIdea: (idea: MicroSaasIdea | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setSearchTerm: (term: string) => void;
  setFilterNiche: (niches: string[]) => void;
  setFilterComp: (comp: string) => void;
  setFilterComplexity: (complexity: string) => void;
  setFilterOneKMrrChance: (chance: string) => void;
  setFilterAI: (ai: string) => void;
  setShowAdvancedFilters: (show: boolean) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (count: number) => void;
  clearAllFilters: () => void;
  openModal: (idea: MicroSaasIdea) => void;
  closeModal: () => void;
  
  // Computed
  getFilteredIdeas: () => MicroSaasIdea[];
  getPaginatedIdeas: () => { items: MicroSaasIdea[]; totalPages: number; totalItems: number };
  hasActiveFilters: () => boolean;
  getTotalIdeas: () => number;
  getHighScoreIdeas: () => number;
  getAvgScore: () => number;
  getNiches: () => string[];
}

export const useMicroSaasStore = create<MicroSaasState>()(
  devtools(
    (set, get) => ({
      // Initial Data - Hydrated from JSON
      ideas: microSaasIdeasData as MicroSaasIdea[],
      selectedIdea: null,
      
      // Initial UI State
      isModalOpen: false,
      searchTerm: '',
      filterNiche: [],
      filterComp: 'All',
      filterComplexity: 'All',
      filterOneKMrrChance: 'All',
      filterAI: 'All',
      showAdvancedFilters: false,
      sortBy: 'score',
      sortOrder: 'desc',
      currentPage: 1,
      itemsPerPage: 10,
      
      // Actions
      setSelectedIdea: (idea) => set({ selectedIdea: idea }),
      setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
      setSearchTerm: (term) => set({ searchTerm: term, currentPage: 1 }),
      setFilterNiche: (niches) => set({ filterNiche: niches, currentPage: 1 }),
      setFilterComp: (comp) => set({ filterComp: comp, currentPage: 1 }),
      setFilterComplexity: (complexity) => set({ filterComplexity: complexity, currentPage: 1 }),
      setFilterOneKMrrChance: (chance) => set({ filterOneKMrrChance: chance, currentPage: 1 }),
      setFilterAI: (ai) => set({ filterAI: ai, currentPage: 1 }),
      setShowAdvancedFilters: (show) => set({ showAdvancedFilters: show }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (order) => set({ sortOrder: order }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setItemsPerPage: (count) => set({ itemsPerPage: count, currentPage: 1 }),
      
      clearAllFilters: () => set({
        searchTerm: '',
        filterNiche: [],
        filterComp: 'All',
        filterComplexity: 'All',
        filterOneKMrrChance: 'All',
        filterAI: 'All',
        sortBy: 'score',
        sortOrder: 'desc',
        currentPage: 1,
      }),
      
      openModal: (idea) => set({ selectedIdea: idea, isModalOpen: true }),
      closeModal: () => set({ selectedIdea: null, isModalOpen: false }),
      
      // Computed functions
      getFilteredIdeas: () => {
        const state = get();
        
        const isAIRelated = (idea: MicroSaasIdea) => {
          const searchText = `${idea.niche} ${idea.rationale}`.toLowerCase();
          return searchText.includes('ai ') || 
                 searchText.includes('artificial intelligence') ||
                 searchText.includes('machine learning') ||
                 searchText.includes('ml ') ||
                 searchText.includes('chatbot') ||
                 searchText.includes('gpt') ||
                 searchText.includes('llm') ||
                 searchText.includes('ai-') ||
                 searchText.includes('automation') ||
                 searchText.includes('intelligent') ||
                 searchText.includes('smart ') ||
                 searchText.includes('neural') ||
                 searchText.includes('deep learning');
        };
        
        let filtered = state.ideas.filter(idea => {
          const matchesSearch = idea.niche.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            idea.rationale.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            idea.user.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            idea.channel.toLowerCase().includes(state.searchTerm.toLowerCase());
          
          const matchesNiche = state.filterNiche.length === 0 || state.filterNiche.includes(idea.niche);
          const meetsMrrThreshold = idea.mrr >= 100;
          const matchesComp = state.filterComp === 'All' || idea.comp === state.filterComp;
          const matchesComplexity = state.filterComplexity === 'All' || idea.complexity === state.filterComplexity;
          const matchesOneKMrrChance = state.filterOneKMrrChance === 'All' || idea.oneKMrrChance === state.filterOneKMrrChance;
          
          const matchesAI = state.filterAI === 'All' || 
            (state.filterAI === 'AI' && isAIRelated(idea)) ||
            (state.filterAI === 'Non-AI' && !isAIRelated(idea));
          
          return matchesSearch && matchesNiche && meetsMrrThreshold && matchesComp && matchesComplexity && matchesOneKMrrChance && matchesAI;
        });

        // Sort the filtered results
        filtered.sort((a, b) => {
          let aValue, bValue;
          
          switch (state.sortBy) {
            case 'niche':
              aValue = a.niche.toLowerCase();
              bValue = b.niche.toLowerCase();
              break;
            case 'mrr':
              aValue = a.mrr;
              bValue = b.mrr;
              break;
            case 'mvpWk':
              aValue = a.mvpWk;
              bValue = b.mvpWk;
              break;
            case 'score':
              aValue = a.score;
              bValue = b.score;
              break;
            case 'dateAdded':
              aValue = a.dateAdded ? new Date(a.dateAdded).getTime() : 0;
              bValue = b.dateAdded ? new Date(b.dateAdded).getTime() : 0;
              break;
            default:
              aValue = a.score;
              bValue = b.score;
          }

          if (typeof aValue === 'string') {
            return state.sortOrder === 'asc' ? aValue.localeCompare(bValue as string) : (bValue as string).localeCompare(aValue);
          } else {
            return state.sortOrder === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
          }
        });

        return filtered;
      },
      
      getPaginatedIdeas: () => {
        const state = get();
        const filtered = state.getFilteredIdeas();
        const totalItems = filtered.length;
        const totalPages = Math.ceil(totalItems / state.itemsPerPage);
        const startIndex = (state.currentPage - 1) * state.itemsPerPage;
        const endIndex = startIndex + state.itemsPerPage;
        const items = filtered.slice(startIndex, endIndex);
        
        return { items, totalPages, totalItems };
      },
      
      hasActiveFilters: () => {
        const state = get();
        return !!(state.searchTerm || state.filterNiche.length > 0 || state.filterComp !== 'All' || 
          state.filterComplexity !== 'All' || state.filterOneKMrrChance !== 'All' || state.filterAI !== 'All');
      },
      
      getTotalIdeas: () => get().ideas.length,
      
      getHighScoreIdeas: () => get().ideas.filter(idea => idea.score >= 80).length,
      
      getAvgScore: () => {
        const ideas = get().ideas;
        return Math.round(ideas.reduce((sum, idea) => sum + idea.score, 0) / ideas.length);
      },
      
      getNiches: () => {
        const niches = Array.from(new Set(get().ideas.map(idea => idea.niche)));
        return niches.sort();
      },
    }),
    {
      name: 'micro-saas-store',
    }
  )
);