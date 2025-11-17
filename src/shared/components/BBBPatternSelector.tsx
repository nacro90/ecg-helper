/**
 * Bundle Branch Block Pattern Selector
 * Allows selection of RBBB or LBBB pattern
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import type { BundleBranchBlockPattern } from '@/src/shared/types';
import { colors, spacing } from '@/src/shared/theme';

export interface BBBPatternSelectorProps {
  value: BundleBranchBlockPattern | null;
  onChange: (pattern: BundleBranchBlockPattern) => void;
  disabled?: boolean;
}

const BBB_OPTIONS: { value: BundleBranchBlockPattern; label: string; description: string }[] = [
  {
    value: 'LBBB',
    label: 'LBBB',
    description: 'Left Bundle Branch Block',
  },
  {
    value: 'RBBB',
    label: 'RBBB',
    description: 'Right Bundle Branch Block',
  },
];

export const BBBPatternSelector: React.FC<BBBPatternSelectorProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const getButtonStyle = (pattern: BundleBranchBlockPattern) => {
    const isSelected = value === pattern;
    return [
      styles.button,
      isSelected && styles.buttonSelected,
      disabled && styles.buttonDisabled,
    ];
  };

  const getTextStyle = (isSelected: boolean) => {
    return [
      styles.buttonLabel,
      isSelected && styles.buttonLabelSelected,
      disabled && styles.buttonTextDisabled,
    ];
  };

  return (
    <Surface style={styles.container} elevation={1}>
      <Text variant="titleMedium" style={styles.title}>
        Bundle Branch Block Pattern
      </Text>
      <Text variant="bodySmall" style={styles.subtitle}>
        Select the BBB pattern observed in lead V1
      </Text>

      <View style={styles.buttonContainer}>
        {BBB_OPTIONS.map(option => (
          <TouchableOpacity
            key={option.value}
            style={getButtonStyle(option.value)}
            onPress={() => !disabled && onChange(option.value)}
            disabled={disabled}
            activeOpacity={0.7}
          >
            <Text style={getTextStyle(value === option.value)}>{option.label}</Text>
            <Text style={styles.buttonDescription}>{option.description}</Text>
          </TouchableOpacity>
        ))}
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
    gap: spacing.md,
  },
  button: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.border.main,
    backgroundColor: colors.background.default,
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: colors.primary.main + '20',
    borderColor: colors.primary.main,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  buttonLabelSelected: {
    color: colors.primary.main,
  },
  buttonDescription: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  buttonTextDisabled: {
    opacity: 0.5,
  },
});
