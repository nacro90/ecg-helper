/**
 * Results Screen
 * Display analysis results with primary site and differential diagnoses
 */

import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { colors, spacing } from '@/src/shared/theme';
import { Button, Card } from '@/src/shared/components';
import { useRouter } from 'expo-router';

export default function ResultsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Analysis Results
        </Text>

        <Card padding="lg" style={styles.primaryCard}>
          <Text variant="titleLarge" style={styles.primaryTitle}>
            Primary Localization
          </Text>
          <Text variant="headlineSmall" style={styles.siteName}>
            Posterior RVOT
          </Text>
          <Chip
            mode="flat"
            style={[styles.confidenceChip, { backgroundColor: colors.confidence.high }]}
            textStyle={styles.confidenceText}
          >
            High Confidence
          </Chip>
          <Text variant="bodyMedium" style={styles.note}>
            To be implemented: Actual analysis results from pattern matching
          </Text>
        </Card>

        <Card padding="lg" style={styles.card}>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Differential Diagnoses
          </Text>
          <Text variant="bodySmall" style={styles.note}>
            To be implemented: Alternative sites with distinguishing features
          </Text>
        </Card>

        <Card padding="lg" style={styles.card}>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Supporting Evidence
          </Text>
          <Text variant="bodySmall" style={styles.note}>
            To be implemented: Matched criteria and key features
          </Text>
        </Card>

        <Card padding="lg" style={styles.card}>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Clinical Implications
          </Text>
          <Text variant="bodySmall" style={styles.note}>
            To be implemented: Ablation approach and procedural considerations
          </Text>
        </Card>
      </ScrollView>

      <View style={styles.actions}>
        <Button variant="outlined" onPress={() => router.back()}>
          Back to Analysis
        </Button>
        <Button variant="primary" onPress={() => router.push('/')}>
          Save Case
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
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: spacing.lg,
  },
  primaryCard: {
    marginBottom: spacing.md,
    backgroundColor: colors.primary.light + '10',
    borderWidth: 2,
    borderColor: colors.primary.main,
  },
  primaryTitle: {
    fontWeight: '600',
    marginBottom: spacing.sm,
    color: colors.primary.main,
  },
  siteName: {
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  confidenceChip: {
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  confidenceText: {
    color: 'white',
    fontWeight: '600',
  },
  card: {
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  note: {
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.background.paper,
  },
});
