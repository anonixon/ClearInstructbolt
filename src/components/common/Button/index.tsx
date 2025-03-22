/**
 * @fileoverview Button Component
 * @description A reusable button component with various styles and states
 */

import React from 'react';
import { IButtonProps } from '@/types/common';
import { THEME } from '@/config/constants';
import styles from './styles.module.css';

/**
 * Button component that follows the application's design system
 * @component
 * @example
 * ```tsx
 * <Button
 *   variant="primary"
 *   size="medium"
 *   onClick={() => console.log('clicked')}
 * >
 *   Click me
 * </Button>
 * ```
 */
const Button: React.FC<IButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  ...props
}) => {
  /**
   * Generates the button's base classes based on variant and size
   */
  const getBaseClasses = (): string => {
    const baseClasses = [styles.button];
    
    // Add variant-specific classes
    baseClasses.push(styles[`button--${variant}`]);
    
    // Add size-specific classes
    baseClasses.push(styles[`button--${size}`]);
    
    // Add disabled state class
    if (disabled) {
      baseClasses.push(styles['button--disabled']);
    }
    
    // Add loading state class
    if (loading) {
      baseClasses.push(styles['button--loading']);
    }
    
    // Add custom classes
    if (className) {
      baseClasses.push(className);
    }
    
    return baseClasses.join(' ');
  };

  /**
   * Handles the button click event
   */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    onClick?.(event);
  };

  return (
    <button
      className={getBaseClasses()}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className={styles['button__loader']}>
          {/* Add loading spinner component here */}
        </span>
      )}
      <span className={loading ? styles['button__content--loading'] : ''}>
        {children}
      </span>
    </button>
  );
};

export default Button; 