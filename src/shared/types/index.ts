/**
 * Shared Types
 * Central export for all type definitions
 */

// ECG types
export type {
  LeadName,
  Polarity,
  BundleBranchBlockPattern,
  LeadData,
  TransitionPoint,
  ECGData,
  LeadDataMap,
  ECGValidationResult,
} from './ecg';

// Analysis types
export type {
  VerticalAxis,
  HorizontalAxis,
  Quadrant,
  ConfidenceLevel,
  QRSScreeningResult,
  VerticalAxisResult,
  HorizontalAxisResult,
  QuadrantResult,
  RefinedLocalizationResult,
  AnalysisResult,
  AnatomicalSitePrediction,
  ClinicalImplications,
} from './analysis';

// Anatomical site types
export type { AnatomicalRegion, AnatomicalSite, PatternMatchingRule } from './anatomical-sites';
export { ANATOMICAL_SITES } from './anatomical-sites';

// Case management types
export type {
  SavedCase,
  CaseSummary,
  CaseFilter,
  CaseSortBy,
  CaseSortOrder,
  CaseExport,
} from './case';
