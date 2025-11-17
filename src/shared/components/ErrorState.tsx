/**
 * Error State Component
 * Reusable error display with retry action
 */

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Text, Icon } from 'react-native-paper';
import { colors, spacing } from '../theme';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  fullScreen?: boolean;
  style?: ViewStyle;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try Again',
  fullScreen = false,
  style,
}) => {
  const containerStyle = fullScreen ? styles.fullScreenContainer : styles.container;

  return (
    <View style={[containerStyle, style]}>
      <View style={styles.iconContainer}>
        <Icon source="alert-circle" size={64} color={colors.status.error} />
      </View>
      <Text variant="titleLarge" style={styles.title}>
        {title}
      </Text>
      <Text variant="bodyMedium" style={styles.message}>
        {message}
      </Text>
      {onRetry && (
        <Button variant="primary" onPress={onRetry} style={styles.retryButton}>
          {retryLabel}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.default,
    padding: spacing.xl,
  },
  iconContainer: {
    marginBottom: spacing.md,
  },
  title: {
    fontWeight: 'bold',
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
  retryButton: {
    minWidth: 150,
  },
});
