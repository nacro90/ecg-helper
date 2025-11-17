/**
 * Button Component
 * Reusable button with theming support
 */

import React from 'react';
import { Button as PaperButton, ButtonProps as PaperButtonProps } from 'react-native-paper';
import { colors } from '../theme';

export interface ButtonProps extends Omit<PaperButtonProps, 'mode'> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  children,
  style,
  ...props
}) => {
  const getButtonMode = (): PaperButtonProps['mode'] => {
    switch (variant) {
      case 'primary':
        return 'contained';
      case 'secondary':
        return 'contained-tonal';
      case 'outlined':
        return 'outlined';
      case 'text':
        return 'text';
      default:
        return 'contained';
    }
  };

  const getButtonColor = () => {
    switch (variant) {
      case 'primary':
        return colors.primary.main;
      case 'secondary':
        return colors.secondary.main;
      default:
        return undefined;
    }
  };

  return (
    <PaperButton
      mode={getButtonMode()}
      buttonColor={getButtonColor()}
      style={[fullWidth && { width: '100%' }, style]}
      {...props}
    >
      {children}
    </PaperButton>
  );
};
