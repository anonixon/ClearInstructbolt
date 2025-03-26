import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { ROUTES } from '../../config/constants';
import { Input, PasswordInput, Select, Checkbox, FormSection } from './shared/FormComponents';

interface HeadteacherFormData {
  title: string;
  fullName: string;
  gender: string;
  email: string;
  schoolName: string;
  schoolId?: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

const HeadteacherRegistration = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<HeadteacherFormData>();

  const onSubmit = async (data: HeadteacherFormData) => {
    try {
      // TODO: Implement registration logic
      console.log('Form submitted:', data);
      navigate(ROUTES.SCHOOL_ADMIN_DASHBOARD);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const titleOptions = [
    { value: 'mr', label: 'Mr' },
    { value: 'mrs', label: 'Mrs' },
    { value: 'miss', label: 'Miss' },
    { value: 'ms', label: 'Ms' },
    { value: 'other', label: 'Other' },
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/20">
              <Building2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Headteacher Registration
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Please complete the form to register as a school administrator
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <FormSection title="Personal Information">
            <Select
              label="Title"
              options={titleOptions}
              {...register('title', { required: 'Title is required' })}
              error={errors.title?.message}
            />

            <Input
              label="Full Name"
              {...register('fullName', { required: 'Full name is required' })}
              error={errors.fullName?.message}
            />

            <Select
              label="Gender"
              options={genderOptions}
              {...register('gender', { required: 'Gender is required' })}
              error={errors.gender?.message}
            />
          </FormSection>

          <FormSection title="School Information">
            <Input
              label="School Email Address"
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
              label="School Name"
              {...register('schoolName', { required: 'School name is required' })}
              error={errors.schoolName?.message}
            />

            <Input
              label="School ID (Optional)"
              {...register('schoolId')}
              error={errors.schoolId?.message}
            />
          </FormSection>

          <FormSection title="Contact Information">
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
          </FormSection>

          <FormSection title="Security">
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

          <div className="space-y-4">
            <Checkbox
              label="I confirm that I am the authorized headteacher for this school"
              {...register('termsAccepted', {
                required: 'You must accept the terms and conditions',
              })}
              error={errors.termsAccepted?.message}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Registering...' : 'Register as Headteacher'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeadteacherRegistration; 