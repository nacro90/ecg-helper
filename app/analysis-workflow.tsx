/**
 * Analysis Workflow Screen
 * Step-by-step analysis: Vertical axis, Horizontal axis, Quadrant, Refined localization
 */

import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';
import { colors, spacing } from '@/src/shared/theme';
import { Button, Card } from '@/src/shared/components';
import { useRouter } from 'expo-router';

export default function AnalysisWorkflowScreen() {
  const router = useRouter();
  const currentStep = 1;
  const totalSteps = 4;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Analysis Workflow
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Step {currentStep + 1} of {totalSteps + 1}
        </Text>
        <ProgressBar
          progress={(currentStep + 1) / (totalSteps + 1)}
          style={styles.progressBar}
          color={colors.primary.main}
        />
      </View>

      <ScrollView style={styles.content}>
        <Card padding="lg" style={styles.card}>
          <Text variant="titleLarge" style={styles.cardTitle}>
            Vertical Axis Determination
          </Text>
          <Text variant="bodyMedium" style={styles.cardText}>
            Analyze leads II, III, and aVF to determine inferior vs superior axis
          </Text>
          <Text variant="bodySmall" style={styles.note}>
            To be implemented: Lead analysis and axis determination
          </Text>
        </Card>

        <Card padding="md" style={styles.infoCard}>
          <Text variant="labelLarge">Analysis Steps</Text>
          <Text variant="bodySmall" style={styles.stepText}>
            • Vertical Axis (II, III, aVF){'\n'}• Horizontal Axis (I + BBB pattern){'\n'}• Quadrant
            Assignment{'\n'}• Refined Localization
          </Text>
        </Card>
      </ScrollView>

      <View style={styles.actions}>
        <Button variant="outlined" onPress={() => router.back()}>
          Previous
        </Button>
        <Button variant="primary" onPress={() => router.push('/results')}>
          Next Step
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.background.paper,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  card: {
    marginBottom: spacing.md,
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
  infoCard: {
    backgroundColor: colors.background.elevated,
  },
  stepText: {
    marginTop: spacing.sm,
    lineHeight: 20,
    color: colors.text.secondary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.background.paper,
  },
});
