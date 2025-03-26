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
  INSTITUTIONS: '/institutions',
  FEATURES: '/features',
  DEMO: '/demo',

  // Auth routes
  DASHBOARD_SELECTION: '/dashboard-selection',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  TWO_FACTOR_SETUP: '/2fa-setup',
  TWO_FACTOR_VERIFY: '/2fa-verify',
  OTP_VERIFY: '/otp-verify',

  // School Admin routes
  SCHOOL_ADMIN_REGISTER: '/school-admin/register',
  SCHOOL_ADMIN_DASHBOARD: '/school-admin/dashboard',
  SCHOOL_ADMIN_INVITE: '/school-admin/invite',
  SCHOOL_ADMIN_SETTINGS: '/school-admin/settings',

  // Teacher routes
  TEACHER_REGISTER: '/teacher/register',
  TEACHER_DASHBOARD: '/teacher/dashboard',
  TEACHER_CLASSROOM: '/teacher/classroom',
  TEACHER_REPORTS: '/teacher/reports',

  // Parent routes
  PARENT_REGISTER: '/parent/register',
  PARENT_DASHBOARD: '/parent/dashboard',
  PARENT_PROGRESS: '/parent/progress',
  PARENT_MESSAGING: '/parent/messaging',

  // Student routes
  STUDENT_REGISTER: '/student/register',
  REGISTER_SUCCESS: '/register/success',
  STUDENT_DASHBOARD: '/student/dashboard',
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
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    TWO_FACTOR_SETUP: '/auth/2fa/setup',
    TWO_FACTOR_VERIFY: '/auth/2fa/verify',
    OTP_VERIFY: '/auth/otp/verify',
    OTP_SEND: '/auth/otp/send'
  },
  SCHOOL: {
    REGISTER: '/school/register',
    INVITE_TEACHER: '/school/invite/teacher',
    INVITE_PARENT: '/school/invite/parent',
    SETTINGS: '/school/settings',
    REPORTS: '/school/reports'
  },
  TEACHER: {
    REGISTER: '/teacher/register',
    CLASSROOM: '/teacher/classroom',
    STUDENTS: '/teacher/students',
    REPORTS: '/teacher/reports'
  },
  PARENT: {
    REGISTER: '/parent/register',
    CHILD_PROGRESS: '/parent/child/progress',
    MESSAGING: '/parent/messaging'
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile/update',
    CHANGE_PASSWORD: '/users/profile/change-password',
    PERMISSIONS: '/users/permissions'
  }
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