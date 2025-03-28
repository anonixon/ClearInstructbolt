export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    EMAIL_VERIFICATION: '/email-verification',
    REGISTER_SUCCESS: '/register-success',
  },
  REGISTRATION: {
    PARENT: '/register/parent',
    STUDENT: '/register/student',
    TEACHER: '/register/teacher',
    SCHOOL_ADMIN: '/register/school-admin',
    HEADTEACHER: '/register/headteacher',
  },
  DASHBOARD: {
    PARENT_DASHBOARD: '/dashboard/parent',
    STUDENT_DASHBOARD: '/dashboard/student',
    TEACHER_DASHBOARD: '/dashboard/teacher',
    SCHOOL_ADMIN_DASHBOARD: '/dashboard/school-admin',
    HEADTEACHER_DASHBOARD: '/dashboard/headteacher',
  },
  AUTH: {
    LOGOUT: '/logout',
    RESET_PASSWORD: '/reset-password',
    CHANGE_PASSWORD: '/change-password',
    FORGOT_PASSWORD: '/forgot-password',
    VERIFY_EMAIL: '/verify-email',
  },
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES][keyof typeof ROUTES[keyof typeof ROUTES]];

export function isValidRoute(path: string): path is Route {
  return Object.values(ROUTES).some((category) =>
    Object.values(category).includes(path as Route)
  );
} 