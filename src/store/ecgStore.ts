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

  // Image data
  imageUri: string | null;
  imageCapturedAt: Date | null;

  // Actions
  setLeadPolarity: (lead: LeadName, polarity: Polarity) => void;
  setQRSDuration: (duration: number) => void;
  setBBBPattern: (pattern: BundleBranchBlockPattern) => void;
  setTransitionPoint: (point: string) => void;
  setNotes: (notes: string) => void;
  setImageUri: (uri: string | null) => void;
  clearECGData: () => void;
  loadDraft: () => void;
  saveDraft: () => void;
  exportData: () => string;
  importData: (jsonString: string) => boolean;
}

export const useECGStore = create<ECGStore>()(
  persist(
    (set, get) => ({
      ecgData: null,
      imageUri: null,
      imageCapturedAt: null,

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

      setImageUri: uri => {
        set({
          imageUri: uri,
          imageCapturedAt: uri ? new Date() : null,
        });
      },

      clearECGData: () => {
        set({ ecgData: null, imageUri: null, imageCapturedAt: null });
      },

      loadDraft: () => {
        // Draft is automatically loaded by persist middleware
      },

      saveDraft: () => {
        // Draft is automatically saved by persist middleware
      },

      exportData: () => {
        const state = get();
        const exportObject = {
          ecgData: state.ecgData,
          imageUri: state.imageUri,
          imageCapturedAt: state.imageCapturedAt,
          exportedAt: new Date().toISOString(),
          version: '1.0',
        };
        return JSON.stringify(exportObject, null, 2);
      },

      importData: (jsonString: string) => {
        try {
          const importedData = JSON.parse(jsonString);

          // Validate the imported data structure
          if (!importedData || typeof importedData !== 'object') {
            return false;
          }

          // Import the data
          set({
            ecgData: importedData.ecgData || null,
            imageUri: importedData.imageUri || null,
            imageCapturedAt: importedData.imageCapturedAt
              ? new Date(importedData.imageCapturedAt)
              : null,
          });

          return true;
        } catch (error) {
          console.error('Failed to import ECG data:', error);
          return false;
        }
      },
    }),
    {
      name: 'ecg-draft-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
