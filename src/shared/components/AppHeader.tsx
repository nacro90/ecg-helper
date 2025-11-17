/**
 * App Header Component
 * Reusable header with title and actions
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { colors } from '../theme';

export interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  actions?: Array<{
    icon: string;
    label: string;
    onPress: () => void;
  }>;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  actions = [],
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <Appbar.Header style={styles.header}>
      {showBack && <Appbar.BackAction onPress={handleBack} />}
      <Appbar.Content title={title} subtitle={subtitle} />
      {actions.map((action, index) => (
        <Appbar.Action
          key={index}
          icon={action.icon}
          onPress={action.onPress}
          accessibilityLabel={action.label}
        />
      ))}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary.main,
    elevation: 4,
  },
});
