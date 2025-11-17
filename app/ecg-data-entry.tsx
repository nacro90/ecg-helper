/**
 * ECG Data Entry Screen
 * Screen for manual input of 12-lead ECG measurements
 */

import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, spacing } from '@/src/shared/theme';
import { Button, Card } from '@/src/shared/components';
import { useRouter } from 'expo-router';

export default function ECGDataEntryScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          ECG Data Entry
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Enter polarity data for all 12 leads
        </Text>

        <Card padding="md" style={styles.card}>
          <Text variant="titleMedium">Limb Leads</Text>
          <Text variant="bodySmall" style={styles.note}>
            To be implemented: Lead input components
          </Text>
        </Card>

        <Card padding="md" style={styles.card}>
          <Text variant="titleMedium">Precordial Leads</Text>
          <Text variant="bodySmall" style={styles.note}>
            To be implemented: V1-V6 input components
          </Text>
        </Card>

        <Card padding="md" style={styles.card}>
          <Text variant="titleMedium">Additional Data</Text>
          <Text variant="bodySmall" style={styles.note}>
            QRS Duration, BBB Pattern, Transition Point
          </Text>
        </Card>

        <View style={styles.actions}>
          <Button variant="outlined" onPress={() => router.back()} style={styles.actionButton}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onPress={() => router.push('/qrs-screening')}
            style={styles.actionButton}
          >
            Continue to Screening
          </Button>
        </View>
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
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  card: {
    marginBottom: spacing.md,
  },
  note: {
    color: colors.text.secondary,
    fontStyle: 'italic',
    marginTop: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
  },
});
