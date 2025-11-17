/**
 * Input Component
 * Reusable text input with theming
 */

import React from 'react';
import { TextInput, TextInputProps, HelperText } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme';

export interface InputProps extends Omit<TextInputProps, 'mode'> {
  label: string;
  error?: string;
  helperText?: string;
  variant?: 'outlined' | 'flat';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  variant = 'outlined',
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        mode={variant}
        error={!!error}
        style={[styles.input, style]}
        outlineColor={colors.border.main}
        activeOutlineColor={colors.primary.main}
        {...props}
      />
      {(error || helperText) && (
        <HelperText type={error ? 'error' : 'info'} visible={!!(error || helperText)}>
          {error || helperText}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.background.paper,
  },
});
