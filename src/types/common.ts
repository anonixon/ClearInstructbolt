/**
 * @fileoverview Common type definitions used across the application
 * @description This file contains shared interfaces and types used throughout the application
 */

/**
 * Base entity interface with common fields
 */
export interface IBaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User roles type
 */
export type UserRole = 'teacher' | 'parent' | 'headteacher';

/**
 * User interface extending base entity
 */
export interface IUser extends IBaseEntity {
  role: UserRole;
  name: string;
  email: string;
  avatar?: string;
  isActive: boolean;
}

/**
 * Authentication related types
 */
export interface IAuthCredentials {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
}

/**
 * Common component prop types
 */
export interface IBaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Common form field props
 */
export interface IFormFieldProps extends IBaseComponentProps {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Common button props
 */
export interface IButtonProps extends IBaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
} 