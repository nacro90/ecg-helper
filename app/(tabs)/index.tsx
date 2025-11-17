/**
 * Home Screen
 * Main landing screen with overview and navigation
 */

import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { Link } from 'expo-router';
import { Button, Card } from '@/src/shared/components';
import { colors, spacing } from '@/src/shared/theme';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>
          EKG Helper
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          ECG Origin Localization Assistant
        </Text>

        <Card padding="lg" style={styles.card}>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Start New Analysis
          </Text>
          <Text variant="bodyMedium" style={styles.cardText}>
            Analyze a 12-lead ECG to identify the anatomical origin of ventricular arrhythmias
          </Text>
          <Link href="/ecg-data-entry" asChild>
            <Button variant="primary" style={styles.button}>
              Enter ECG Data
            </Button>
          </Link>
        </Card>

        <Card padding="lg" style={styles.card}>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Case History
          </Text>
          <Text variant="bodyMedium" style={styles.cardText}>
            View and manage your saved ECG analysis cases
          </Text>
          <Link href="/case-history" asChild>
            <Button variant="outlined" style={styles.button}>
              View Cases
            </Button>
          </Link>
        </Card>

        <Surface style={styles.infoBox} elevation={0}>
          <Text variant="labelLarge" style={styles.infoTitle}>
            Quick Guide
          </Text>
          <Text variant="bodySmall" style={styles.infoText}>
            1. Enter 12-lead ECG data{'\n'}
            2. QRS duration screening (≥120 ms){'\n'}
            3. Analyze leads II, III, aVF{'\n'}
            4. Determine quadrant location{'\n'}
            5. View results and differential diagnosis
          </Text>
        </Surface>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    fontWeight: 'bold',
    color: colors.primary.main,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  card: {
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  cardText: {
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  button: {
    marginTop: spacing.sm,
  },
  infoBox: {
    backgroundColor: colors.background.elevated,
    padding: spacing.md,
    borderRadius: 8,
    marginTop: spacing.md,
  },
  infoTitle: {
    fontWeight: '600',
    marginBottom: spacing.sm,
    color: colors.primary.main,
  },
  infoText: {
    color: colors.text.secondary,
    lineHeight: 20,
  },
});
