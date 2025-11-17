/**
 * Case History Screen
 * View and manage saved ECG analysis cases
 */

import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, Searchbar } from 'react-native-paper';
import { colors, spacing } from '@/src/shared/theme';
import { Card } from '@/src/shared/components';

export default function CaseHistoryScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Case History
        </Text>
        <Searchbar
          placeholder="Search cases..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      <ScrollView style={styles.content}>
        <Card padding="md" style={styles.emptyCard}>
          <Text variant="titleMedium" style={styles.emptyTitle}>
            No cases yet
          </Text>
          <Text variant="bodyMedium" style={styles.emptyText}>
            Complete an ECG analysis to save your first case
          </Text>
        </Card>

        <Text variant="bodySmall" style={styles.note}>
          To be implemented:{'\n'}• Case list with summaries{'\n'}• Filtering and sorting{'\n'}•
          Case detail view{'\n'}• Export functionality
        </Text>
      </ScrollView>
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
    marginBottom: spacing.md,
  },
  searchBar: {
    elevation: 0,
    backgroundColor: colors.background.elevated,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  emptyText: {
    color: colors.text.secondary,
    textAlign: 'center',
  },
  note: {
    color: colors.text.secondary,
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
