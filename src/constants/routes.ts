export const ROUTES = {
  HOME: '/',
  LOGIN: '/login/:role',
  DASHBOARD_SELECTION: '/dashboard-selection',
  
  // Registration routes
  SCHOOL_ADMIN_REGISTER: '/register/headteacher',
  TEACHER_REGISTER: '/register/teacher',
  PARENT_REGISTER: '/register/parent',
  STUDENT_REGISTER: '/register/student',
  REGISTER_SUCCESS: '/register/success',
  
  // Dashboard routes
  SCHOOL_ADMIN_DASHBOARD: '/headteacher/dashboard',
  TEACHER_DASHBOARD: '/teacher/dashboard',
  PARENT_DASHBOARD: '/parent/dashboard',
  STUDENT_DASHBOARD: '/student/dashboard',
} as const; 