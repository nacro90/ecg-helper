/**
 * Transition Point Selector Component
 * Allows selection of precordial transition point (V1-V6)
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import type { TransitionPoint } from '@/src/shared/types';
import { colors, spacing } from '@/src/shared/theme';

export interface TransitionPointSelectorProps {
  value: TransitionPoint | null;
  onChange: (point: TransitionPoint) => void;
  disabled?: boolean;
}

const TRANSITION_OPTIONS: TransitionPoint[] = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6'];

export const TransitionPointSelector: React.FC<TransitionPointSelectorProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const getButtonStyle = (point: TransitionPoint) => {
    const isSelected = value === point;
    return [
      styles.button,
      isSelected && styles.buttonSelected,
      disabled && styles.buttonDisabled,
    ];
  };

  const getTextStyle = (point: TransitionPoint) => {
    const isSelected = value === point;
    return [
      styles.buttonText,
      isSelected && styles.buttonTextSelected,
      disabled && styles.buttonTextDisabled,
    ];
  };

  return (
    <Surface style={styles.container} elevation={1}>
      <Text variant="titleMedium" style={styles.title}>
        Precordial Transition Point
      </Text>
      <Text variant="bodySmall" style={styles.subtitle}>
        Select the lead where R wave becomes dominant over S wave
      </Text>

      <View style={styles.buttonContainer}>
        {TRANSITION_OPTIONS.map(point => (
          <TouchableOpacity
            key={point}
            style={getButtonStyle(point)}
            onPress={() => !disabled && onChange(point)}
            disabled={disabled}
            activeOpacity={0.7}
          >
            <Text style={getTextStyle(point)}>{point}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoBox}>
        <Text variant="bodySmall" style={styles.infoText}>
          Early transition (V1-V2): Suggests posterior/left-sided origin
        </Text>
        <Text variant="bodySmall" style={styles.infoText}>
          Late transition (V4-V6): Suggests anterior/right-sided origin
        </Text>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.background.paper,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.border.main,
    backgroundColor: colors.background.default,
    minWidth: 60,
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: colors.primary.main + '20',
    borderColor: colors.primary.main,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  buttonTextSelected: {
    color: colors.primary.main,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    opacity: 0.5,
  },
  infoBox: {
    marginTop: spacing.md,
    padding: spacing.sm,
    backgroundColor: colors.status.info + '20',
    borderRadius: 4,
    gap: spacing.xs,
  },
  infoText: {
    color: colors.status.info,
    fontSize: 11,
  },
});
