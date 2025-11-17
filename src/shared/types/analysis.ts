/**
 * Analysis Types
 * Type definitions for the step-by-step analysis workflow
 */

/**
 * Vertical axis determination (based on leads II, III, aVF)
 */
export type VerticalAxis = 'inferior' | 'superior';

/**
 * Horizontal axis determination (based on lead I)
 */
export type HorizontalAxis = 'leftward' | 'rightward';

/**
 * Anatomical quadrant assignment
 */
export type Quadrant = 'rightUpper' | 'leftUpper' | 'rightLower' | 'leftLower';

/**
 * Confidence level for predictions
 */
export type ConfidenceLevel = 'high' | 'moderate' | 'low';

/**
 * Analysis Step 1: QRS Duration Screening
 */
export interface QRSScreeningResult {
  qrsDuration: number;
  meetsThreshold: boolean; // >120 ms
  notes?: string;
}

/**
 * Analysis Step 2: Vertical Axis Determination
 */
export interface VerticalAxisResult {
  axis: VerticalAxis;
  leadII: 'positive' | 'negative';
  leadIII: 'positive' | 'negative';
  leadAVF: 'positive' | 'negative';
  hasDiscordance: boolean;
  notes?: string;
}

/**
 * Analysis Step 3: Horizontal Axis Determination
 */
export interface HorizontalAxisResult {
  axis: HorizontalAxis;
  leadI: 'positive' | 'negative';
  bbbPattern: 'RBBB' | 'LBBB' | 'none';
  notes?: string;
}

/**
 * Analysis Step 4: Quadrant Assignment
 */
export interface QuadrantResult {
  quadrant: Quadrant;
  verticalAxis: VerticalAxis;
  horizontalAxis: HorizontalAxis;
  possibleSites: string[];
  notes?: string;
}

/**
 * Analysis Step 5: Refined Localization
 */
export interface RefinedLocalizationResult {
  precordialTransition?: string;
  qrsDurationAnalysis?: string;
  specificLeadCharacteristics: string[];
  specialMarkers: string[];
  notes?: string;
}

/**
 * Complete analysis results
 */
export interface AnalysisResult {
  id: string;
  timestamp: Date;

  // Step results
  qrsScreening: QRSScreeningResult;
  verticalAxis: VerticalAxisResult;
  horizontalAxis: HorizontalAxisResult;
  quadrant: QuadrantResult;
  refinedLocalization: RefinedLocalizationResult;

  // Final predictions
  primarySite: AnatomicalSitePrediction;
  differentialDiagnoses: AnatomicalSitePrediction[];

  // Supporting evidence
  supportingEvidence: string[];
  matchedCriteria: string[];

  // Overall confidence
  overallConfidence: ConfidenceLevel;
}

/**
 * Anatomical site prediction with confidence
 */
export interface AnatomicalSitePrediction {
  site: string;
  confidence: ConfidenceLevel;
  confidenceScore: number; // 0-100
  distinguishingFeatures: string[];
  clinicalImplications?: ClinicalImplications;
}

/**
 * Clinical implications for ablation
 */
export interface ClinicalImplications {
  recommendedApproach: 'endocardial' | 'epicardial' | 'both';
  proximityWarnings: string[];
  successRateExpectation?: string;
  proceduralConsiderations: string[];
}
