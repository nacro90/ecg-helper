/**
 * ECG Data Store
 * Manages the current ECG data entry state
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ECGData, LeadName, Polarity, BundleBranchBlockPattern } from '@/src/shared/types';

interface ECGStore {
  // Current ECG data
  ecgData: Partial<ECGData> | null;

  // Actions
  setLeadPolarity: (lead: LeadName, polarity: Polarity) => void;
  setQRSDuration: (duration: number) => void;
  setBBBPattern: (pattern: BundleBranchBlockPattern) => void;
  setTransitionPoint: (point: string) => void;
  setNotes: (notes: string) => void;
  clearECGData: () => void;
  loadDraft: () => void;
  saveDraft: () => void;
}

export const useECGStore = create<ECGStore>()(
  persist(
    (set, get) => ({
      ecgData: null,

      setLeadPolarity: (lead, polarity) => {
        set(state => ({
          ecgData: {
            ...state.ecgData,
            leads: {
              ...state.ecgData?.leads,
              [lead]: {
                lead,
                polarity,
              },
            },
          } as Partial<ECGData>,
        }));
      },

      setQRSDuration: duration => {
        set(state => ({
          ecgData: {
            ...state.ecgData,
            qrsDuration: duration,
          } as Partial<ECGData>,
        }));
      },

      setBBBPattern: pattern => {
        set(state => ({
          ecgData: {
            ...state.ecgData,
            bbbPattern: pattern,
          } as Partial<ECGData>,
        }));
      },

      setTransitionPoint: point => {
        set(state => ({
          ecgData: {
            ...state.ecgData,
            transitionPoint: point as any,
          } as Partial<ECGData>,
        }));
      },

      setNotes: notes => {
        set(state => ({
          ecgData: {
            ...state.ecgData,
            notes,
          } as Partial<ECGData>,
        }));
      },

      clearECGData: () => {
        set({ ecgData: null });
      },

      loadDraft: () => {
        // Draft is automatically loaded by persist middleware
      },

      saveDraft: () => {
        // Draft is automatically saved by persist middleware
      },
    }),
    {
      name: 'ecg-draft-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
