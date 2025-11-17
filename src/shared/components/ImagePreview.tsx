/**
 * Image Preview Component
 * Displays ECG image with zoom and quality validation
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { IconButton, Surface, Text } from 'react-native-paper';
import { colors, spacing } from '@/src/shared/theme';

export interface ImageQuality {
  isValid: boolean;
  width: number;
  height: number;
  warnings: string[];
}

export interface ImagePreviewProps {
  imageUri: string;
  onClose?: () => void;
  showQualityWarnings?: boolean;
}

const MIN_WIDTH = 800;
const MIN_HEIGHT = 600;
const RECOMMENDED_WIDTH = 1920;
const RECOMMENDED_HEIGHT = 1440;

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUri,
  onClose,
  showQualityWarnings = true,
}) => {
  const [imageQuality, setImageQuality] = useState<ImageQuality | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    validateImageQuality();
  }, [imageUri]);

  const validateImageQuality = async () => {
    try {
      Image.getSize(
        imageUri,
        (width, height) => {
          const warnings: string[] = [];
          let isValid = true;

          if (width < MIN_WIDTH || height < MIN_HEIGHT) {
            isValid = false;
            warnings.push(`Image resolution too low (${width}x${height}). Minimum: ${MIN_WIDTH}x${MIN_HEIGHT}`);
          } else if (width < RECOMMENDED_WIDTH || height < RECOMMENDED_HEIGHT) {
            warnings.push(`Image resolution below recommended (${width}x${height}). Recommended: ${RECOMMENDED_WIDTH}x${RECOMMENDED_HEIGHT}`);
          }

          if (width / height < 1.2 || width / height > 2) {
            warnings.push('Unusual aspect ratio. ECG printouts are typically in landscape format.');
          }

          setImageQuality({ isValid, width, height, warnings });
        },
        (error) => {
          console.error('Error getting image size:', error);
          setImageQuality({
            isValid: false,
            width: 0,
            height: 0,
            warnings: ['Unable to validate image quality'],
          });
        }
      );
    } catch (error) {
      console.error('Error validating image:', error);
    }
  };

  const handleOpenFullscreen = () => {
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      <Surface style={styles.container} elevation={1}>
        <View style={styles.header}>
          <Text variant="titleMedium">Image Preview</Text>
          <View style={styles.headerActions}>
            <IconButton icon="fullscreen" size={20} onPress={handleOpenFullscreen} />
            {onClose && <IconButton icon="close" size={20} onPress={onClose} />}
          </View>
        </View>

        <TouchableOpacity onPress={handleOpenFullscreen} activeOpacity={0.8}>
          <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="contain" />
        </TouchableOpacity>

        {showQualityWarnings && imageQuality && (
          <View style={styles.qualityContainer}>
            {imageQuality.isValid ? (
              <View style={styles.qualityValid}>
                <Text variant="bodySmall" style={styles.qualityValidText}>
                  ✓ Image quality OK ({imageQuality.width}x{imageQuality.height})
                </Text>
              </View>
            ) : (
              <View style={styles.qualityInvalid}>
                <Text variant="bodySmall" style={styles.qualityInvalidText}>
                  ⚠ Image quality issues detected
                </Text>
              </View>
            )}

            {imageQuality.warnings.length > 0 && (
              <View style={styles.warningsContainer}>
                {imageQuality.warnings.map((warning, index) => (
                  <Text key={index} variant="bodySmall" style={styles.warningText}>
                    • {warning}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}
      </Surface>

      <Modal visible={isFullscreen} transparent={true} onRequestClose={handleCloseFullscreen}>
        <View style={styles.fullscreenContainer}>
          <View style={styles.fullscreenHeader}>
            <IconButton
              icon="close"
              iconColor={colors.background.paper}
              size={28}
              onPress={handleCloseFullscreen}
            />
          </View>
          <Image
            source={{ uri: imageUri }}
            style={styles.fullscreenImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.background.paper,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  headerActions: {
    flexDirection: 'row',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 4,
    backgroundColor: colors.background.default,
  },
  qualityContainer: {
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  qualityValid: {
    padding: spacing.xs,
    backgroundColor: colors.status.success + '20',
    borderRadius: 4,
  },
  qualityValidText: {
    color: colors.status.success,
  },
  qualityInvalid: {
    padding: spacing.xs,
    backgroundColor: colors.status.error + '20',
    borderRadius: 4,
  },
  qualityInvalidText: {
    color: colors.status.error,
  },
  warningsContainer: {
    gap: spacing.xs,
  },
  warningText: {
    color: colors.text.secondary,
    fontSize: 12,
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  fullscreenHeader: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    padding: spacing.sm,
  },
  fullscreenImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
