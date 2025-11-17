/**
 * QRS Duration Input Component
 * Input field for QRS duration with validation (must be >120 ms)
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, Surface, HelperText } from 'react-native-paper';
import { colors, spacing } from '@/src/shared/theme';

export interface QRSDurationInputProps {
  value: number | null;
  onChange: (duration: number) => void;
  disabled?: boolean;
  showValidation?: boolean;
}

const MIN_QRS_DURATION = 120;
const MAX_QRS_DURATION = 250;

export const QRSDurationInput: React.FC<QRSDurationInputProps> = ({
  value,
  onChange,
  disabled = false,
  showValidation = true,
}) => {
  const [inputValue, setInputValue] = useState(value?.toString() || '');
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    setInputValue(value?.toString() || '');
  }, [value]);

  const handleChangeText = (text: string) => {
    setInputValue(text);
    setIsTouched(true);

    // Only update parent if valid number
    const numValue = parseFloat(text);
    if (!isNaN(numValue) && numValue > 0) {
      onChange(numValue);
    }
  };

  const getValidationStatus = () => {
    if (!isTouched || !inputValue) {
      return { isValid: null, message: '' };
    }

    const numValue = parseFloat(inputValue);

    if (isNaN(numValue) || numValue <= 0) {
      return { isValid: false, message: 'Please enter a valid QRS duration' };
    }

    if (numValue < MIN_QRS_DURATION) {
      return {
        isValid: false,
        message: `QRS duration must be ≥${MIN_QRS_DURATION} ms for this analysis`,
      };
    }

    if (numValue > MAX_QRS_DURATION) {
      return {
        isValid: false,
        message: `QRS duration seems unusually high (>${MAX_QRS_DURATION} ms). Please verify.`,
      };
    }

    return {
      isValid: true,
      message: `Valid QRS duration (≥${MIN_QRS_DURATION} ms)`,
    };
  };

  const validation = getValidationStatus();
  const hasError = showValidation && validation.isValid === false;
  const hasSuccess = showValidation && validation.isValid === true;

  return (
    <Surface style={styles.container} elevation={1}>
      <Text variant="titleMedium" style={styles.title}>
        QRS Duration
      </Text>
      <Text variant="bodySmall" style={styles.subtitle}>
        Enter the QRS duration in milliseconds (ms)
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label="QRS Duration (ms)"
          value={inputValue}
          onChangeText={handleChangeText}
          onBlur={() => setIsTouched(true)}
          keyboardType="numeric"
          disabled={disabled}
          error={hasError}
          style={[styles.input, hasSuccess && styles.inputSuccess]}
          outlineStyle={hasSuccess ? styles.outlineSuccess : undefined}
          right={<TextInput.Affix text="ms" />}
        />
      </View>

      {showValidation && validation.message && (
        <HelperText
          type={hasError ? 'error' : 'info'}
          visible={true}
          style={hasSuccess && styles.helperSuccess}
        >
          {hasError ? '⚠ ' : hasSuccess ? '✓ ' : ''}
          {validation.message}
        </HelperText>
      )}

      <View style={styles.infoBox}>
        <Text variant="bodySmall" style={styles.infoText}>
          QRS duration {'>'} {MIN_QRS_DURATION} ms for ventricular origin analysis
        </Text>
      </View>
    </Surface>
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
  inputContainer: {
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.background.default,
  },
  inputSuccess: {
    backgroundColor: colors.status.success + '10',
  },
  outlineSuccess: {
    borderColor: colors.status.success,
  },
  helperSuccess: {
    color: colors.status.success,
  },
  infoBox: {
    marginTop: spacing.sm,
    padding: spacing.sm,
    backgroundColor: colors.status.info + '20',
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: colors.status.info,
  },
  infoText: {
    color: colors.status.info,
  },
});
