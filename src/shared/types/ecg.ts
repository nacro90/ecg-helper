/**
 * ECG Data Types
 * Core type definitions for 12-lead ECG data and measurements
 */

/**
 * ECG Lead names (12-lead standard)
 */
export type LeadName =
  | 'I'
  | 'II'
  | 'III'
  | 'aVR'
  | 'aVL'
  | 'aVF'
  | 'V1'
  | 'V2'
  | 'V3'
  | 'V4'
  | 'V5'
  | 'V6';

/**
 * QRS polarity (morphology)
 */
export type Polarity = 'positive' | 'negative' | 'isoelectric';

/**
 * Bundle Branch Block pattern
 */
export type BundleBranchBlockPattern = 'RBBB' | 'LBBB' | 'none';

/**
 * Lead data with polarity information
 */
export interface LeadData {
  lead: LeadName;
  polarity: Polarity;
  notes?: string;
}

/**
 * Precordial transition point (V1-V6)
 */
export type TransitionPoint = 'V1' | 'V2' | 'V3' | 'V4' | 'V5' | 'V6';

/**
 * Complete 12-lead ECG data
 */
export interface ECGData {
  // Limb leads
  leads: {
    I: LeadData;
    II: LeadData;
    III: LeadData;
    aVR: LeadData;
    aVL: LeadData;
    aVF: LeadData;
    V1: LeadData;
    V2: LeadData;
    V3: LeadData;
    V4: LeadData;
    V5: LeadData;
    V6: LeadData;
  };

  // QRS duration (in milliseconds)
  qrsDuration: number;

  // Precordial transition point
  transitionPoint?: TransitionPoint;

  // Bundle branch block pattern
  bbbPattern: BundleBranchBlockPattern;

  // Additional measurements
  measurements?: {
    v2TransitionRatio?: number; // For LVOT vs RVOT differentiation
    maxDeflectionIndex?: number; // For epicardial markers
  };

  // Metadata
  patientId?: string;
  recordingDate?: Date;
  notes?: string;
}

/**
 * Helper type for accessing lead data by name
 */
export type LeadDataMap = ECGData['leads'];

/**
 * ECG data validation result
 */
export interface ECGValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  completeness: number; // 0-100 percentage
}
