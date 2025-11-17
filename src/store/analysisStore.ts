/**
 * Analysis Store
 * Manages the analysis workflow state and results
 */

import { create } from 'zustand';
import type { AnalysisResult } from '@/src/shared/types';

interface AnalysisStore {
  // Current analysis results
  currentAnalysis: AnalysisResult | null;

  // Workflow state
  currentStep: number;
  totalSteps: number;

  // Actions
  setAnalysisResult: (result: AnalysisResult) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetAnalysis: () => void;
}

export const useAnalysisStore = create<AnalysisStore>(set => ({
  currentAnalysis: null,
  currentStep: 0,
  totalSteps: 5, // QRS Screening, Vertical Axis, Horizontal Axis, Quadrant, Refined

  setAnalysisResult: result => {
    set({ currentAnalysis: result });
  },

  setCurrentStep: step => {
    set({ currentStep: step });
  },

  nextStep: () => {
    set(state => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1),
    }));
  },

  previousStep: () => {
    set(state => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    }));
  },

  resetAnalysis: () => {
    set({
      currentAnalysis: null,
      currentStep: 0,
    });
  },
}));
