import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Mail } from 'lucide-react';

const RegisterSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000); // Redirect to login after 5 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registration Successful!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please check your email to verify your account
          </p>
        </div>

        <div className="mt-8">
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Mail className="h-5 w-5 text-blue-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Check your inbox
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    We've sent you a verification link. Please check your email and click the link to verify your account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500">
            You will be redirected to the login page in a few seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess; 