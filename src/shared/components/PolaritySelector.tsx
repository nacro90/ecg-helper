/**
 * Polarity Selector Component
 * Allows selection of lead polarity (positive/negative/isoelectric)
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import type { Polarity } from '@/src/shared/types';
import { colors, spacing } from '@/src/shared/theme';

export interface PolaritySelectorProps {
  value: Polarity | null;
  onChange: (polarity: Polarity) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const POLARITY_OPTIONS: { value: Polarity; label: string; icon: string }[] = [
  { value: 'positive', label: 'Pos', icon: '+' },
  { value: 'negative', label: 'Neg', icon: '−' },
  { value: 'isoelectric', label: 'Iso', icon: '~' },
];

export const PolaritySelector: React.FC<PolaritySelectorProps> = ({
  value,
  onChange,
  disabled = false,
  size = 'medium',
}) => {
  const getButtonStyle = (polarity: Polarity) => {
    const isSelected = value === polarity;
    return [
      styles.button,
      styles[`button${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles],
      isSelected && styles.buttonSelected,
      isSelected && styles[`button${polarity.charAt(0).toUpperCase() + polarity.slice(1)}` as keyof typeof styles],
      disabled && styles.buttonDisabled,
    ];
  };

  const getTextStyle = (polarity: Polarity) => {
    const isSelected = value === polarity;
    return [
      styles.buttonText,
      isSelected && styles.buttonTextSelected,
      disabled && styles.buttonTextDisabled,
    ];
  };

  const getIconStyle = (polarity: Polarity) => {
    const isSelected = value === polarity;
    return [
      styles.icon,
      styles[`icon${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles],
      isSelected && styles.iconSelected,
      disabled && styles.iconDisabled,
    ];
  };

  return (
    <View style={styles.container}>
      {POLARITY_OPTIONS.map(option => (
        <TouchableOpacity
          key={option.value}
          style={getButtonStyle(option.value)}
          onPress={() => !disabled && onChange(option.value)}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <Text style={getIconStyle(option.value)}>{option.icon}</Text>
          <Text style={getTextStyle(option.value)} numberOfLines={1}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.border.main,
    backgroundColor: colors.background.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSmall: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  buttonMedium: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  buttonLarge: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  buttonSelected: {
    borderWidth: 2,
  },
  buttonPositive: {
    backgroundColor: colors.status.success + '20',
    borderColor: colors.status.success,
  },
  buttonNegative: {
    backgroundColor: colors.status.error + '20',
    borderColor: colors.status.error,
  },
  buttonIsoelectric: {
    backgroundColor: colors.status.warning + '20',
    borderColor: colors.status.warning,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  icon: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  iconSmall: {
    fontSize: 18,
  },
  iconMedium: {
    fontSize: 24,
  },
  iconLarge: {
    fontSize: 28,
  },
  iconSelected: {
    fontWeight: 'bold',
  },
  iconDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 10,
    color: colors.text.secondary,
    textAlign: 'center',
    width: '100%',
  },
  buttonTextSelected: {
    color: colors.text.primary,
    fontWeight: '500',
  },
  buttonTextDisabled: {
    opacity: 0.5,
  },
});
