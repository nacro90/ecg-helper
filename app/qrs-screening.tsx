/**
 * QRS Screening Screen
 * Initial screening: QRS duration assessment (>120 ms requirement)
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, spacing } from '@/src/shared/theme';
import { Button, Card } from '@/src/shared/components';
import { useRouter } from 'expo-router';

export default function QRSScreeningScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          QRS Duration Screening
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Step 1 of 5: Initial Assessment
        </Text>

        <Card padding="lg" style={styles.card}>
          <Text variant="titleMedium" style={styles.cardTitle}>
            QRS Duration Requirement
          </Text>
          <Text variant="bodyMedium" style={styles.cardText}>
            This analysis requires QRS duration ≥ 120 ms
          </Text>
          <Text variant="bodySmall" style={styles.note}>
            To be implemented: QRS duration validation display
          </Text>
        </Card>

        <View style={styles.actions}>
          <Button variant="outlined" onPress={() => router.back()}>
            Back
          </Button>
          <Button variant="primary" onPress={() => router.push('/analysis-workflow')}>
            Begin Analysis
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  content: {
    padding: spacing.lg,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  card: {
    marginBottom: spacing.xl,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  cardText: {
    marginBottom: spacing.md,
  },
  note: {
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginTop: 'auto',
  },
});
