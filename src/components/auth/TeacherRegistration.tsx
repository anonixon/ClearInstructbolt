import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { ROUTES } from '@lib/constants/routes';
import { Input, PasswordInput, FormSection } from './shared/FormComponents';
import { useAuth } from '@contexts/AuthContext';

interface TeacherFormData {
  fullName: string;
  password: string;
  confirmPassword: string;
  twoFactorCode: string;
}

const TeacherRegistration = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get('token');
  const schoolEmail = searchParams.get('email');
  const schoolName = searchParams.get('school');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TeacherFormData>();

  const onSubmit = async (data: TeacherFormData) => {
    try {
      // TODO: Implement registration logic with 2FA verification
      console.log('Form submitted:', data);
      navigate(ROUTES.TEACHER_DASHBOARD);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  if (!inviteToken || !schoolEmail || !schoolName) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
              <GraduationCap className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Invalid Invitation
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This invitation link is invalid or has expired. Please contact your school administrator for a new invitation.
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
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/20">
              <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Teacher Registration
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Complete your registration for {schoolName}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <FormSection title="Account Information">
            <Input
              label="School Email"
              type="email"
              value={schoolEmail}
              disabled
              className="bg-gray-50 dark:bg-gray-800"
            />

            <Input
              label="Full Name"
              {...register('fullName', { required: 'Full name is required' })}
              error={errors.fullName?.message}
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

          <FormSection title="Two-Factor Authentication">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Please enter the 2FA code sent to your email address to complete registration.
            </p>
            <Input
              label="2FA Code"
              {...register('twoFactorCode', {
                required: '2FA code is required',
                pattern: {
                  value: /^\d{6}$/,
                  message: 'Please enter a valid 6-digit code',
                },
              })}
              error={errors.twoFactorCode?.message}
            />
          </FormSection>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Completing Registration...' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherRegistration; 