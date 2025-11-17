/**
 * Image Capture Component
 * Handles ECG image capture from camera or photo library
 */

import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import ImageViewing from 'react-native-image-viewing';
import { colors, spacing } from '@/src/shared/theme';

export interface ImageCaptureProps {
  onImageSelected: (uri: string) => void;
  currentImageUri?: string;
  disabled?: boolean;
}

export const ImageCapture: React.FC<ImageCaptureProps> = ({
  onImageSelected,
  currentImageUri,
  disabled = false,
}) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  const requestCameraPermissions = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Camera Permission Required',
        'Please grant camera access to capture ECG images.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const requestMediaLibraryPermissions = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Photo Library Permission Required',
        'Please grant photo library access to select ECG images.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const handleTakePhoto = async () => {
    if (isRequesting || disabled) return;

    setIsRequesting(true);
    try {
      const hasPermission = await requestCameraPermissions();
      if (!hasPermission) {
        setIsRequesting(false);
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to capture photo. Please try again.');
    } finally {
      setIsRequesting(false);
    }
  };

  const handlePickFromGallery = async () => {
    if (isRequesting || disabled) return;

    setIsRequesting(true);
    try {
      const hasPermission = await requestMediaLibraryPermissions();
      if (!hasPermission) {
        setIsRequesting(false);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <>
      <Surface style={styles.container} elevation={1}>
        <Text variant="titleMedium" style={styles.title}>
          ECG Image
        </Text>
        <Text variant="bodySmall" style={styles.subtitle}>
          Capture or select an ECG image to attach to this case
        </Text>

        {currentImageUri && (
          <TouchableOpacity onPress={() => setIsFullscreenOpen(true)} activeOpacity={0.8}>
            <Image source={{ uri: currentImageUri }} style={styles.previewImage} resizeMode="contain" />
          </TouchableOpacity>
        )}

        <View style={styles.buttonRow}>
          <Button
            mode="contained"
            onPress={handleTakePhoto}
            disabled={disabled || isRequesting}
            icon="camera"
            style={styles.button}
          >
            Take Photo
          </Button>
          <Button
            mode="outlined"
            onPress={handlePickFromGallery}
            disabled={disabled || isRequesting}
            icon="image"
            style={styles.button}
          >
            Choose from Gallery
          </Button>
        </View>
      </Surface>

      <ImageViewing
        images={currentImageUri ? [{ uri: currentImageUri }] : []}
        imageIndex={0}
        visible={isFullscreenOpen && !!currentImageUri}
        onRequestClose={() => setIsFullscreenOpen(false)}
        backgroundColor="rgba(0, 0, 0, 0.95)"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.background.paper,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: colors.background.default,
    marginBottom: spacing.md,
  },
  buttonRow: {
    flexDirection: 'column',
    gap: spacing.sm,
  },
  button: {
    width: '100%',
  },
});
