/**
 * Card Component
 * Reusable card container with elevation
 */

import React from 'react';
import { Card as PaperCard, CardProps as PaperCardProps } from 'react-native-paper';
import { StyleSheet, ViewStyle } from 'react-native';
import { spacing } from '../theme';

export interface CardProps extends PaperCardProps {
  children: React.ReactNode;
  padding?: keyof typeof spacing;
  elevation?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  elevation = 1,
  style,
  ...props
}) => {
  const paddingValue = spacing[padding];

  return (
    <PaperCard
      elevation={elevation}
      style={[styles.card, { padding: paddingValue }, style]}
      {...props}
    >
      {children}
    </PaperCard>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
  },
});
