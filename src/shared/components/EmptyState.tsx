/**
 * Empty State Component
 * Reusable empty state display for lists and collections
 */

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Text, Icon } from 'react-native-paper';
import { colors, spacing } from '../theme';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: string;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'inbox',
  title,
  message,
  actionLabel,
  onAction,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Icon source={icon} size={64} color={colors.text.disabled} />
      </View>
      <Text variant="titleMedium" style={styles.title}>
        {title}
      </Text>
      <Text variant="bodyMedium" style={styles.message}>
        {message}
      </Text>
      {actionLabel && onAction && (
        <Button variant="outlined" onPress={onAction} style={styles.actionButton}>
          {actionLabel}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: spacing.md,
  },
  title: {
    fontWeight: '600',
    marginBottom: spacing.sm,
    textAlign: 'center',
    color: colors.text.primary,
  },
  message: {
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    maxWidth: 400,
  },
  actionButton: {
    minWidth: 150,
  },
});
