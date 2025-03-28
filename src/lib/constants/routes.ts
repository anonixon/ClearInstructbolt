export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    EMAIL_VERIFICATION: '/email-verification',
    REGISTER_SUCCESS: '/register-success',
  },
  REGISTRATION: {
    HEADTEACHER: '/register/headteacher',
    TEACHER: '/register/teacher',
    STUDENT: '/register/student',
    PARENT: '/register/parent',
  },
  DASHBOARD: {
    SELECTION: '/dashboard/selection',
    TEACHER: '/dashboard/teacher',
    PARENT: '/dashboard/parent',
    STUDENT: '/dashboard/student',
  },
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES][keyof typeof ROUTES[keyof typeof ROUTES]];

export function isValidRoute(path: string): path is Route {
  return Object.values(ROUTES).some((category) =>
    Object.values(category).includes(path as Route)
  );
} 