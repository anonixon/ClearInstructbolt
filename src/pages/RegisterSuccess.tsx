import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Mail } from 'lucide-react';
import { ROUTES } from '../lib/constants/routes';

const RegisterSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(ROUTES.PUBLIC.LOGIN);
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Registration Successful!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for registering. Please check your email to verify your account.
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Mail className="h-5 w-5" />
            <p className="text-sm">
              A verification email has been sent to your registered email address.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            You will be redirected to the login page in 5 seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess; 