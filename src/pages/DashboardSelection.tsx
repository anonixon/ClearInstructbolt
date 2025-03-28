import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@lib/constants/routes';
import { 
  GraduationCap, 
  Users, 
  Building2, 
  School,
  ArrowRight
} from 'lucide-react';

const DashboardSelection = () => {
  const navigate = useNavigate();

  const dashboardOptions = [
    {
      title: 'School Admin Dashboard',
      description: 'Manage your school, teachers, and students',
      icon: Building2,
      route: ROUTES.SCHOOL_ADMIN_DASHBOARD,
      color: 'bg-blue-500',
    },
    {
      title: 'Teacher Dashboard',
      description: 'Manage your classes and track student progress',
      icon: GraduationCap,
      route: ROUTES.TEACHER_DASHBOARD,
      color: 'bg-green-500',
    },
    {
      title: 'Parent Dashboard',
      description: 'Monitor your child\'s progress and communicate with teachers',
      icon: Users,
      route: ROUTES.PARENT_DASHBOARD,
      color: 'bg-purple-500',
    },
    {
      title: 'Student Dashboard',
      description: 'Access your courses, assignments, and grades',
      icon: School,
      route: ROUTES.STUDENT_DASHBOARD,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Select Your Dashboard
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the dashboard that best suits your role
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardOptions.map((option) => (
            <div
              key={option.title}
              className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => navigate(option.route)}
            >
              <div className={`absolute top-0 right-0 -mt-3 -mr-3 w-12 h-12 ${option.color} rounded-full flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-200`}>
                <ArrowRight className="w-6 h-6" />
              </div>
              <div className="flex items-center space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 ${option.color} rounded-lg flex items-center justify-center text-white`}>
                  <option.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {option.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {option.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSelection; 