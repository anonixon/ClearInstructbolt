import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Users } from 'lucide-react';
import { ROUTES } from '../../config/constants';
import { Input, PasswordInput, FormSection } from './shared/FormComponents';

interface ParentFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  otpCode: string;
}

const ParentRegistration = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get('token');
  const childName = searchParams.get('child');
  const schoolName = searchParams.get('school');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ParentFormData>();

  const onSubmit = async (data: ParentFormData) => {
    try {
      // TODO: Implement registration logic with OTP verification
      console.log('Form submitted:', data);
      navigate(ROUTES.PARENT_DASHBOARD);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  if (!inviteToken || !childName || !schoolName) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
              <Users className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Invalid Invitation
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This invitation link is invalid or has expired. Please contact your child's school for a new invitation.
          </p>
          <button
            onClick={() => navigate(ROUTES.LOGIN)}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
              <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Parent Registration
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Complete your registration to access {childName}'s progress at {schoolName}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <FormSection title="Account Information">
            <Input
              label="Full Name"
              {...register('fullName', { required: 'Full name is required' })}
              error={errors.fullName?.message}
            />

            <Input
              label="Email Address"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={errors.email?.message}
            />

            <Input
              label="Phone Number"
              type="tel"
              {...register('phoneNumber', {
                required: 'Phone number is required',
                pattern: {
                  value: /^\+?[1-9]\d{1,14}$/,
                  message: 'Invalid phone number',
                },
              })}
              error={errors.phoneNumber?.message}
            />

            <PasswordInput
              label="Create Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                },
              })}
              error={errors.password?.message}
            />

            <PasswordInput
              label="Confirm Password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value: string) =>
                  value === watch('password') || 'Passwords do not match',
              })}
              error={errors.confirmPassword?.message}
            />
          </FormSection>

          <FormSection title="Verification">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Please enter the verification code sent to your email address to complete registration.
            </p>
            <Input
              label="Verification Code"
              {...register('otpCode', {
                required: 'Verification code is required',
                pattern: {
                  value: /^\d{6}$/,
                  message: 'Please enter a valid 6-digit code',
                },
              })}
              error={errors.otpCode?.message}
            />
          </FormSection>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Completing Registration...' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ParentRegistration; 