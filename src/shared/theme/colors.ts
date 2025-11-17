/**
 * EKG Helper Color Palette
 * Following clinical app best practices with clear, accessible colors
 */

export const colors = {
  // Primary colors - medical blue theme
  primary: {
    main: '#1976D2',
    light: '#42A5F5',
    dark: '#1565C0',
    contrast: '#FFFFFF',
  },

  // Secondary colors - for accents
  secondary: {
    main: '#00ACC1',
    light: '#26C6DA',
    dark: '#00838F',
    contrast: '#FFFFFF',
  },

  // Status colors for confidence levels and validation
  status: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },

  // Confidence level colors
  confidence: {
    high: '#4CAF50', // Green
    moderate: '#FF9800', // Orange
    low: '#F44336', // Red
  },

  // Text colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
    hint: '#9E9E9E',
  },

  // Background colors
  background: {
    default: '#FAFAFA',
    paper: '#FFFFFF',
    elevated: '#F5F5F5',
  },

  // Border and divider colors
  border: {
    main: '#E0E0E0',
    light: '#F5F5F5',
    dark: '#BDBDBD',
  },

  // Lead-specific colors (for ECG lead visualization)
  leads: {
    limb: '#1976D2', // Blue for limb leads
    precordial: '#7B1FA2', // Purple for precordial leads
    positive: '#4CAF50', // Green for positive polarity
    negative: '#F44336', // Red for negative polarity
    isoelectric: '#9E9E9E', // Gray for isoelectric
  },

  // Quadrant colors (for anatomical visualization)
  quadrants: {
    rightUpper: '#E57373', // Light red
    leftUpper: '#64B5F6', // Light blue
    rightLower: '#FFB74D', // Light orange
    leftLower: '#81C784', // Light green
  },
};

export type Colors = typeof colors;
