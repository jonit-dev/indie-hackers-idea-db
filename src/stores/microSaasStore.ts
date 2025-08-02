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
  filterNiche: string;
  filterComp: string;
  filterComplexity: string;
  filterOneKMrrChance: string;
  showAdvancedFilters: boolean;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  
  // Actions
  setSelectedIdea: (idea: MicroSaasIdea | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setSearchTerm: (term: string) => void;
  setFilterNiche: (niche: string) => void;
  setFilterComp: (comp: string) => void;
  setFilterComplexity: (complexity: string) => void;
  setFilterOneKMrrChance: (chance: string) => void;
  setShowAdvancedFilters: (show: boolean) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  clearAllFilters: () => void;
  openModal: (idea: MicroSaasIdea) => void;
  closeModal: () => void;
  
  // Computed
  getFilteredIdeas: () => MicroSaasIdea[];
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
      filterNiche: 'All',
      filterComp: 'All',
      filterComplexity: 'All',
      filterOneKMrrChance: 'All',
      showAdvancedFilters: false,
      sortBy: 'score',
      sortOrder: 'desc',
      
      // Actions
      setSelectedIdea: (idea) => set({ selectedIdea: idea }),
      setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
      setSearchTerm: (term) => set({ searchTerm: term }),
      setFilterNiche: (niche) => set({ filterNiche: niche }),
      setFilterComp: (comp) => set({ filterComp: comp }),
      setFilterComplexity: (complexity) => set({ filterComplexity: complexity }),
      setFilterOneKMrrChance: (chance) => set({ filterOneKMrrChance: chance }),
      setShowAdvancedFilters: (show) => set({ showAdvancedFilters: show }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (order) => set({ sortOrder: order }),
      
      clearAllFilters: () => set({
        searchTerm: '',
        filterNiche: 'All',
        filterComp: 'All',
        filterComplexity: 'All',
        filterOneKMrrChance: 'All',
        sortBy: 'score',
        sortOrder: 'desc',
      }),
      
      openModal: (idea) => set({ selectedIdea: idea, isModalOpen: true }),
      closeModal: () => set({ selectedIdea: null, isModalOpen: false }),
      
      // Computed functions
      getFilteredIdeas: () => {
        const state = get();
        let filtered = state.ideas.filter(idea => {
          const matchesSearch = idea.niche.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            idea.rationale.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            idea.user.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            idea.channel.toLowerCase().includes(state.searchTerm.toLowerCase());
          
          const matchesNiche = state.filterNiche === 'All' || idea.niche === state.filterNiche;
          const matchesComp = state.filterComp === 'All' || idea.comp === state.filterComp;
          const matchesComplexity = state.filterComplexity === 'All' || idea.complexity.toString() === state.filterComplexity;
          const matchesOneKMrrChance = state.filterOneKMrrChance === 'All' || idea.oneKMrrChance === state.filterOneKMrrChance;
          
          return matchesSearch && matchesNiche && matchesComp && matchesComplexity && matchesOneKMrrChance;
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
      
      hasActiveFilters: () => {
        const state = get();
        return !!(state.searchTerm || state.filterNiche !== 'All' || state.filterComp !== 'All' || 
          state.filterComplexity !== 'All' || state.filterOneKMrrChance !== 'All');
      },
      
      getTotalIdeas: () => get().ideas.length,
      
      getHighScoreIdeas: () => get().ideas.filter(idea => idea.score >= 80).length,
      
      getAvgScore: () => {
        const ideas = get().ideas;
        return Math.round(ideas.reduce((sum, idea) => sum + idea.score, 0) / ideas.length);
      },
      
      getNiches: () => {
        const niches = Array.from(new Set(get().ideas.map(idea => idea.niche)));
        return ['All', ...niches];
      },
    }),
    {
      name: 'micro-saas-store',
    }
  )
);