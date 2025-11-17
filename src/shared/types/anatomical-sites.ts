/**
 * Anatomical Sites Types
 * Definitions for ventricular arrhythmia origin locations
 */

/**
 * Major anatomical regions
 */
export type AnatomicalRegion =
  | 'RVOT' // Right Ventricular Outflow Tract
  | 'LVOT' // Left Ventricular Outflow Tract
  | 'AorticCusps'
  | 'TricuspidAnnulus'
  | 'MitralAnnulus'
  | 'Fascicles'
  | 'PapillaryMuscles'
  | 'Other';

/**
 * Specific anatomical sites organized by quadrant
 */
export const ANATOMICAL_SITES = {
  // Right Upper Quadrant
  rightUpper: [
    'Posterior RVOT',
    'Right Coronary Cusp (RCC)',
    'Para-Hisian',
    'Superior Tricuspid Annulus',
  ],

  // Left Upper Quadrant
  leftUpper: [
    'Anterior RVOT',
    'Left Coronary Cusp (LCC)',
    'Non-Coronary Cusp (NCC)',
    'Aortomitral Continuity (AMC)',
    'LV Summit',
    'Anterolateral Mitral Annulus',
  ],

  // Right Lower Quadrant
  rightLower: [
    'Inferior Tricuspid Annulus',
    'Moderator Band',
    'Cardiac Crux',
    'Right Ventricular Apex',
  ],

  // Left Lower Quadrant
  leftLower: [
    'Inferior Mitral Annulus',
    'Anterolateral Papillary Muscle',
    'Posteromedial Papillary Muscle',
    'Left Anterior Fascicle',
    'Left Posterior Fascicle',
    'Left Ventricular Apex',
  ],
} as const;

/**
 * Anatomical site information
 */
export interface AnatomicalSite {
  name: string;
  region: AnatomicalRegion;
  quadrant: 'rightUpper' | 'leftUpper' | 'rightLower' | 'leftLower';
  description: string;

  // Typical ECG characteristics
  typicalCharacteristics: {
    verticalAxis: 'inferior' | 'superior';
    horizontalAxis: 'leftward' | 'rightward';
    bbbPattern: 'RBBB' | 'LBBB' | 'none' | 'variable';
    precordialTransition?: string;
    specificFeatures: string[];
  };

  // Clinical information
  clinical: {
    ablationApproach: 'endocardial' | 'epicardial' | 'both';
    successRate?: string;
    challenges: string[];
    proximityRisks: string[];
  };
}

/**
 * Pattern matching rule for a specific site
 */
export interface PatternMatchingRule {
  siteId: string;
  siteName: string;

  // Required criteria (all must match)
  requiredCriteria: {
    qrsDuration?: {
      min?: number;
      max?: number;
    };
    verticalAxis?: 'inferior' | 'superior';
    horizontalAxis?: 'leftward' | 'rightward';
    bbbPattern?: 'RBBB' | 'LBBB' | 'none';
  };

  // High confidence indicators (any one sufficient)
  highConfidenceIndicators: {
    description: string;
    weight: number; // 1-10
  }[];

  // Supporting criteria (increase confidence when present)
  supportingCriteria: {
    description: string;
    weight: number; // 1-5
  }[];

  // Exclusion criteria (rule out this site)
  exclusionCriteria?: string[];
}
