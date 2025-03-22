/**
 * @fileoverview Application-wide constants
 * @description Contains all the constant values used throughout the application
 */

/**
 * Application configuration
 */
export const APP_CONFIG = {
  APP_NAME: 'Clear Instruct',
  VERSION: '1.0.0',
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  DEFAULT_LANGUAGE: 'en',
  SUPPORT_EMAIL: 'support@clearinstruct.com',
};

/**
 * Route paths
 */
export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  TEACHERS: '/teachers',
  PARENTS: '/parents',
  INSTITUTIONS: '/institutions',
  FEATURES: '/features',
  DEMO: '/demo',

  // Protected routes
  DASHBOARD: '/dashboard',
  TEACHER_DASHBOARD: '/teacher',
  PARENT_PORTAL: '/parent-portal',
  HEADTEACHER_DASHBOARD: '/headteacher',
};

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile/update',
    CHANGE_PASSWORD: '/users/profile/change-password',
  },
};

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
};

/**
 * Theme configuration
 */
export const THEME = {
  colors: {
    primary: {
      light: '#60A5FA',
      main: '#3B82F6',
      dark: '#2563EB',
    },
    secondary: {
      light: '#9CA3AF',
      main: '#6B7280',
      dark: '#4B5563',
    },
    success: {
      light: '#34D399',
      main: '#10B981',
      dark: '#059669',
    },
    error: {
      light: '#F87171',
      main: '#EF4444',
      dark: '#DC2626',
    },
    warning: {
      light: '#FBBF24',
      main: '#F59E0B',
      dark: '#D97706',
    },
    info: {
      light: '#60A5FA',
      main: '#3B82F6',
      dark: '#2563EB',
    },
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      mono: ['Fira Code', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
}; 