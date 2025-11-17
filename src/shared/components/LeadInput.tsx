/**
 * Lead Input Component
 * Displays a lead label with polarity selector
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import type { LeadName, Polarity } from '@/src/shared/types';
import { PolaritySelector } from './PolaritySelector';
import { colors, spacing } from '@/src/shared/theme';

export interface LeadInputProps {
  lead: LeadName;
  polarity: Polarity | null;
  onPolarityChange: (polarity: Polarity) => void;
  disabled?: boolean;
  showDescription?: boolean;
}

const LEAD_DESCRIPTIONS: Record<LeadName, string> = {
  I: 'Lateral view (LA − RA)',
  II: 'Inferior view (LL − RA)',
  III: 'Inferior view (LL − LA)',
  aVR: 'Right view',
  aVL: 'Lateral view',
  aVF: 'Inferior view',
  V1: 'Septal view',
  V2: 'Septal view',
  V3: 'Anterior view',
  V4: 'Anterior view',
  V5: 'Lateral view',
  V6: 'Lateral view',
};

export const LeadInput: React.FC<LeadInputProps> = ({
  lead,
  polarity,
  onPolarityChange,
  disabled = false,
  showDescription = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text variant="titleMedium" style={styles.leadLabel}>
          {lead}
        </Text>
        {showDescription && (
          <Text variant="bodySmall" style={styles.description}>
            {LEAD_DESCRIPTIONS[lead]}
          </Text>
        )}
      </View>
      <View style={styles.selectorContainer}>
        <PolaritySelector
          value={polarity}
          onChange={onPolarityChange}
          disabled={disabled}
          size="medium"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.background.paper,
    borderWidth: 1,
    borderColor: colors.border.main,
  },
  labelContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  leadLabel: {
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  description: {
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  selectorContainer: {
    flex: 2,
  },
});
