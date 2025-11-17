/**
 * ECG Data Entry Screen
 * Screen for manual input of 12-lead ECG measurements
 */

import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Alert, Share, Platform } from 'react-native';
import { Text, Divider, Portal, Dialog } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { colors, spacing } from '@/src/shared/theme';
import {
  Button,
  Card,
  ImageCapture,
  LeadInput,
  QRSDurationInput,
  BBBPatternSelector,
  TransitionPointSelector,
} from '@/src/shared/components';
import { useRouter } from 'expo-router';
import { useECGStore } from '@/src/store/ecgStore';
import type { LeadName, Polarity, BundleBranchBlockPattern, TransitionPoint } from '@/src/shared/types';

const LIMB_LEADS: LeadName[] = ['I', 'II', 'III', 'aVR', 'aVL', 'aVF'];
const PRECORDIAL_LEADS: LeadName[] = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6'];

export default function ECGDataEntryScreen() {
  const router = useRouter();
  const {
    ecgData,
    imageUri,
    setLeadPolarity,
    setQRSDuration,
    setBBBPattern,
    setTransitionPoint,
    setImageUri,
    clearECGData,
    exportData,
    importData,
  } = useECGStore();

  const [clearDialogVisible, setClearDialogVisible] = useState(false);
  const [showRequiredFields, setShowRequiredFields] = useState(false);

  const handleLeadPolarityChange = (lead: LeadName, polarity: Polarity) => {
    setLeadPolarity(lead, polarity);
  };

  const handleImageSelected = (uri: string) => {
    setImageUri(uri);
  };

  const handleQRSDurationChange = (duration: number) => {
    setQRSDuration(duration);
  };

  const handleBBBPatternChange = (pattern: BundleBranchBlockPattern) => {
    setBBBPattern(pattern);
  };

  const handleTransitionPointChange = (point: TransitionPoint) => {
    setTransitionPoint(point);
  };

  const getLeadPolarity = (lead: LeadName): Polarity | null => {
    return ecgData?.leads?.[lead]?.polarity || null;
  };

  const handleClearData = () => {
    setClearDialogVisible(true);
  };

  const confirmClearData = () => {
    clearECGData();
    setClearDialogVisible(false);
    Alert.alert('Success', 'All ECG data has been cleared.');
  };

  const handleExportData = async () => {
    try {
      const jsonData = exportData();
      const fileName = `ecg-data-${new Date().toISOString().split('T')[0]}.json`;

      if (Platform.OS === 'web') {
        // For web, use download
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
        Alert.alert('Success', 'ECG data exported successfully.');
      } else {
        // For mobile, save to file system and share
        const fileUri = `${FileSystem.documentDirectory}${fileName}`;
        await FileSystem.writeAsStringAsync(fileUri, jsonData);

        await Share.share({
          url: fileUri,
          title: 'Export ECG Data',
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to export ECG data.');
      console.error('Export error:', error);
    }
  };

  const handleImportData = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      const fileUri = result.assets[0].uri;
      const fileContent = await FileSystem.readAsStringAsync(fileUri);

      const success = importData(fileContent);

      if (success) {
        Alert.alert('Success', 'ECG data imported successfully.');
      } else {
        Alert.alert('Error', 'Failed to import ECG data. Invalid file format.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to import ECG data.');
      console.error('Import error:', error);
    }
  };

  const handleContinue = () => {
    if (!isComplete) {
      setShowRequiredFields(true);
      Alert.alert('Incomplete Data', 'Please fill in all required fields before continuing.');
      return;
    }
    router.push('/qrs-screening');
  };

  const calculateCompleteness = () => {
    let totalItems = 0;
    let completedItems = 0;

    // 12 leads
    totalItems += 12;
    completedItems += Object.keys(ecgData?.leads || {}).length;

    // QRS Duration
    totalItems += 1;
    if (ecgData?.qrsDuration) completedItems += 1;

    // ECG Image
    totalItems += 1;
    if (imageUri) completedItems += 1;

    // BBB Pattern
    totalItems += 1;
    if (ecgData?.bbbPattern) completedItems += 1;

    // Transition Point
    totalItems += 1;
    if (ecgData?.transitionPoint) completedItems += 1;

    return Math.round((completedItems / totalItems) * 100);
  };

  const completeness = calculateCompleteness();
  const isComplete = completeness === 100;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Image Capture */}
        <View style={styles.section}>
          <ImageCapture onImageSelected={handleImageSelected} currentImageUri={imageUri || undefined} />
        </View>

        <Divider style={styles.divider} />

        {/* QRS Duration */}
        <View style={styles.section}>
          <QRSDurationInput
            value={ecgData?.qrsDuration || null}
            onChange={handleQRSDurationChange}
          />
        </View>

        {/* BBB Pattern */}
        <View style={styles.section}>
          <BBBPatternSelector
            value={ecgData?.bbbPattern || null}
            onChange={handleBBBPatternChange}
          />
        </View>

        {/* Transition Point */}
        <View style={styles.section}>
          <TransitionPointSelector
            value={ecgData?.transitionPoint || null}
            onChange={handleTransitionPointChange}
          />
        </View>

        <Divider style={styles.divider} />

        {/* Limb Leads */}
        <Card padding="md" style={styles.card}>
          <Text variant="titleLarge" style={styles.cardTitle}>
            Limb Leads
          </Text>
          <Text variant="bodySmall" style={styles.cardSubtitle}>
            Leads I, II, III, aVR, aVL, aVF
          </Text>
          <View style={styles.leadGroup}>
            {LIMB_LEADS.map(lead => (
              <LeadInput
                key={lead}
                lead={lead}
                polarity={getLeadPolarity(lead)}
                onPolarityChange={polarity => handleLeadPolarityChange(lead, polarity)}
                showDescription={true}
                required={true}
                showRequiredIndicator={showRequiredFields}
              />
            ))}
          </View>
        </Card>

        {/* Precordial Leads */}
        <Card padding="md" style={styles.card}>
          <Text variant="titleLarge" style={styles.cardTitle}>
            Precordial Leads
          </Text>
          <Text variant="bodySmall" style={styles.cardSubtitle}>
            Leads V1, V2, V3, V4, V5, V6
          </Text>
          <View style={styles.leadGroup}>
            {PRECORDIAL_LEADS.map(lead => (
              <LeadInput
                key={lead}
                lead={lead}
                polarity={getLeadPolarity(lead)}
                onPolarityChange={polarity => handleLeadPolarityChange(lead, polarity)}
                showDescription={true}
                required={true}
                showRequiredIndicator={showRequiredFields}
              />
            ))}
          </View>
        </Card>
        {/* Completeness Indicator */}
        <Card padding="sm" style={styles.completenessCard}>
          <View style={styles.completenessRow}>
            <Text variant="bodyMedium">Data Completeness:</Text>
            <Text
              variant="bodyMedium"
              style={[styles.completenessText, completeness === 100 && styles.completeText]}
            >
              {completeness}%
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${completeness}%` }]} />
          </View>
        </Card>


        {/* Data Management Buttons */}
        <View style={styles.dataManagementSection}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Data Management
          </Text>
          <View style={styles.dataManagementButtons}>
            <Button
              variant="outlined"
              onPress={handleExportData}
              style={styles.dataButton}
            >
              Export Data
            </Button>
            <Button
              variant="outlined"
              onPress={handleImportData}
              style={styles.dataButton}
            >
              Import Data
            </Button>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button
            variant="outlined"
            onPress={handleClearData}
            style={styles.clearButton}
          >
            Clear All Data
          </Button>
          <Button
            variant="primary"
            onPress={handleContinue}
            style={styles.continueButton}
          >
            Continue to Screening
          </Button>
        </View>
      </View>

      {/* Clear Confirmation Dialog */}
      <Portal>
        <Dialog visible={clearDialogVisible} onDismiss={() => setClearDialogVisible(false)}>
          <Dialog.Title>Clear All Data?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure you want to clear all ECG data? This action cannot be undone.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setClearDialogVisible(false)}>Cancel</Button>
            <Button onPress={confirmClearData}>Clear</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
    paddingBottom: spacing.xl,
  },
  completenessCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  completenessRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  completenessText: {
    fontWeight: 'bold',
    color: colors.status.warning,
  },
  completeText: {
    color: colors.status.success,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border.main,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.main,
  },
  section: {
    marginBottom: spacing.md,
  },
  divider: {
    marginVertical: spacing.lg,
    backgroundColor: colors.border.main,
  },
  card: {
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  leadGroup: {
    gap: spacing.sm,
  },
  dataManagementSection: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: spacing.md,
    color: colors.text.primary,
  },
  dataManagementButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  dataButton: {
    flex: 1,
    paddingVertical: spacing.sm,
  },
  actions: {
    marginTop: spacing.md,
    gap: spacing.md,
  },
  clearButton: {
    paddingVertical: spacing.sm,
  },
  continueButton: {
    paddingVertical: spacing.sm,
  },
});
