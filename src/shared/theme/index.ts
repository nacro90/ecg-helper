/**
 * Theme Configuration
 * Central export for all theme-related values
 */

import { colors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius, shadows } from './spacing';

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};

export type Theme = typeof theme;

// Re-export individual modules for convenience
export { colors } from './colors';
export { typography } from './typography';
export { spacing, borderRadius, shadows } from './spacing';
