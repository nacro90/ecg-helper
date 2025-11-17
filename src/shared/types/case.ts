/**
 * Case Management Types
 * Type definitions for saved cases and case history
 */

import { ECGData } from './ecg';
import { AnalysisResult } from './analysis';

/**
 * Saved case with ECG data and analysis results
 */
export interface SavedCase {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  // Case identification
  caseName?: string;
  tags?: string[];
  notes?: string;

  // Patient information (optional, anonymized)
  patientInfo?: {
    age?: number;
    gender?: 'male' | 'female' | 'other';
    clinicalContext?: string;
  };

  // ECG data
  ecgData: ECGData;

  // Analysis results
  analysisResult: AnalysisResult;

  // Outcome tracking (for validation)
  outcome?: {
    ablationPerformed: boolean;
    actualSite?: string;
    successful?: boolean;
    procedureDate?: Date;
    notes?: string;
  };
}

/**
 * Case summary for list views
 */
export interface CaseSummary {
  id: string;
  caseName?: string;
  createdAt: Date;
  primarySite: string;
  confidence: 'high' | 'moderate' | 'low';
  qrsDuration: number;
  tags?: string[];
}

/**
 * Case filter criteria
 */
export interface CaseFilter {
  searchTerm?: string;
  tags?: string[];
  confidenceLevel?: ('high' | 'moderate' | 'low')[];
  dateRange?: {
    from?: Date;
    to?: Date;
  };
  anatomicalSite?: string[];
  hasOutcome?: boolean;
}

/**
 * Case sort options
 */
export type CaseSortBy = 'date' | 'name' | 'confidence' | 'site';
export type CaseSortOrder = 'asc' | 'desc';

/**
 * Case export format
 */
export interface CaseExport {
  version: string;
  exportDate: Date;
  cases: SavedCase[];
}
