/**
 * Loading Component
 * Reusable loading indicator for async operations
 */

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { colors, spacing } from '../theme';

export interface LoadingProps {
  size?: 'small' | 'large';
  message?: string;
  fullScreen?: boolean;
  style?: ViewStyle;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'large',
  message,
  fullScreen = false,
  style,
}) => {
  const containerStyle = fullScreen ? styles.fullScreenContainer : styles.container;

  return (
    <View style={[containerStyle, style]}>
      <ActivityIndicator size={size} color={colors.primary.main} />
      {message && (
        <Text variant="bodyMedium" style={styles.message}>
          {message}
        </Text>
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
  },
  message: {
    marginTop: spacing.md,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
