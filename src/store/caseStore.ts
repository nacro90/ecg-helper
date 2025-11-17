/**
 * Case Management Store
 * Manages saved cases and case history
 */

import { create } from 'zustand';
import type {
  SavedCase,
  CaseSummary,
  CaseFilter,
  CaseSortBy,
  CaseSortOrder,
} from '@/src/shared/types';

interface CaseStore {
  // Cases
  cases: CaseSummary[];
  currentCase: SavedCase | null;

  // Filters and sorting
  filter: CaseFilter;
  sortBy: CaseSortBy;
  sortOrder: CaseSortOrder;

  // Actions
  setCases: (cases: CaseSummary[]) => void;
  setCurrentCase: (caseData: SavedCase | null) => void;
  addCase: (caseData: SavedCase) => void;
  updateCase: (id: string, caseData: Partial<SavedCase>) => void;
  deleteCase: (id: string) => void;
  setFilter: (filter: CaseFilter) => void;
  setSorting: (sortBy: CaseSortBy, sortOrder: CaseSortOrder) => void;
  clearFilter: () => void;
}

export const useCaseStore = create<CaseStore>(set => ({
  cases: [],
  currentCase: null,
  filter: {},
  sortBy: 'date',
  sortOrder: 'desc',

  setCases: cases => {
    set({ cases });
  },

  setCurrentCase: caseData => {
    set({ currentCase: caseData });
  },

  addCase: caseData => {
    const summary: CaseSummary = {
      id: caseData.id,
      caseName: caseData.caseName,
      createdAt: caseData.createdAt,
      primarySite: caseData.analysisResult.primarySite.site,
      confidence: caseData.analysisResult.primarySite.confidence,
      qrsDuration: caseData.ecgData.qrsDuration,
      tags: caseData.tags,
    };
    set(state => ({
      cases: [...state.cases, summary],
    }));
  },

  updateCase: (id, updatedData) => {
    set(state => ({
      cases: state.cases.map(c => (c.id === id ? { ...c, ...updatedData } : c)),
      currentCase:
        state.currentCase?.id === id ? { ...state.currentCase, ...updatedData } : state.currentCase,
    }));
  },

  deleteCase: id => {
    set(state => ({
      cases: state.cases.filter(c => c.id !== id),
      currentCase: state.currentCase?.id === id ? null : state.currentCase,
    }));
  },

  setFilter: filter => {
    set({ filter });
  },

  setSorting: (sortBy, sortOrder) => {
    set({ sortBy, sortOrder });
  },

  clearFilter: () => {
    set({ filter: {} });
  },
}));
