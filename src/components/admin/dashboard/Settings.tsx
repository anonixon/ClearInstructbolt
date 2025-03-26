import React, { useState } from 'react';
import { Bell, Lock, Mail, Save, Shield, Users, X, FileText, CheckCircle, BookOpen, MessageSquare, Link as LinkIcon } from 'lucide-react';
import FileUpload from '../../shared/FileUpload';
import FilePreviewModal from '../../shared/FilePreviewModal';

interface NotificationSettings {
  email: {
    announcements: boolean;
    attendance: boolean;
    grades: boolean;
    behavior: boolean;
    events: boolean;
  };
  push: {
    announcements: boolean;
    attendance: boolean;
    grades: boolean;
    behavior: boolean;
    events: boolean;
  };
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  loginNotifications: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
}

interface SchoolSettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  timezone: string;
  language: string;
  dateFormat: string;
  logo?: {
    name: string;
    url: string;
    type: string;
  };
  documents?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

interface AcademicSettings {
  gradingSystem: 'percentage' | 'letter' | 'gpa';
  passingGrade: number;
  gradeScale: {
    A: number;
    B: number;
    C: number;
    D: number;
    F: number;
  };
  attendanceThreshold: number;
  lateSubmissionPolicy: {
    allowed: boolean;
    gracePeriod: number; // in hours
    penalty: number; // percentage deduction
  };
  academicCalendar: {
    startDate: string;
    endDate: string;
    terms: Array<{
      name: string;
      startDate: string;
      endDate: string;
    }>;
  };
}

interface CommunicationSettings {
  emailTemplates: {
    welcome: string;
    passwordReset: string;
    gradeNotification: string;
    attendanceAlert: string;
  };
  smsEnabled: boolean;
  smsTemplates: {
    attendance: string;
    grade: string;
    emergency: string;
  };
  notificationSchedule: {
    daily: boolean;
    weekly: boolean;
    monthly: boolean;
    time: string;
  };
  parentPortal: {
    enabled: boolean;
    features: {
      attendance: boolean;
      grades: boolean;
      messages: boolean;
      calendar: boolean;
    };
  };
}

interface IntegrationSettings {
  lms: {
    enabled: boolean;
    type: 'canvas' | 'moodle' | 'blackboard' | 'custom';
    url: string;
    apiKey: string;
    syncInterval: number; // in minutes
  };
  calendar: {
    enabled: boolean;
    type: 'google' | 'outlook' | 'custom';
    syncEnabled: boolean;
  };
  paymentGateway: {
    enabled: boolean;
    provider: 'stripe' | 'paypal' | 'custom';
    testMode: boolean;
    apiKey: string;
  };
  analytics: {
    enabled: boolean;
    providers: {
      googleAnalytics: boolean;
      customAnalytics: boolean;
    };
    trackingId: string;
  };
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security' | 'academic' | 'communication' | 'integration'>('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [schoolSettings, setSchoolSettings] = useState<SchoolSettings>({
    name: 'ClearInstruct Academy',
    address: '123 Education Street, City, State 12345',
    phone: '(555) 123-4567',
    email: 'admin@clearinstruct.edu',
    website: 'www.clearinstruct.edu',
    timezone: 'America/New_York',
    language: 'English',
    dateFormat: 'MM/DD/YYYY'
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: {
      announcements: true,
      attendance: true,
      grades: true,
      behavior: true,
      events: true
    },
    push: {
      announcements: true,
      attendance: true,
      grades: true,
      behavior: true,
      events: true
    }
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: true,
    loginNotifications: true,
    sessionTimeout: 30,
    passwordExpiry: 90
  });

  const [academicSettings, setAcademicSettings] = useState<AcademicSettings>({
    gradingSystem: 'percentage',
    passingGrade: 60,
    gradeScale: {
      A: 90,
      B: 80,
      C: 70,
      D: 60,
      F: 0
    },
    attendanceThreshold: 75,
    lateSubmissionPolicy: {
      allowed: true,
      gracePeriod: 24,
      penalty: 10
    },
    academicCalendar: {
      startDate: '2024-09-01',
      endDate: '2025-06-30',
      terms: [
        {
          name: 'Fall 2024',
          startDate: '2024-09-01',
          endDate: '2024-12-20'
        },
        {
          name: 'Spring 2025',
          startDate: '2025-01-06',
          endDate: '2025-06-30'
        }
      ]
    }
  });

  const [communicationSettings, setCommunicationSettings] = useState<CommunicationSettings>({
    emailTemplates: {
      welcome: 'Welcome to {schoolName}! We are excited to have you join our community.',
      passwordReset: 'Click the link below to reset your password: {resetLink}',
      gradeNotification: 'Your grade for {course} has been updated to {grade}.',
      attendanceAlert: 'Your attendance is currently at {percentage}%.'
    },
    smsEnabled: true,
    smsTemplates: {
      attendance: 'Your child {studentName} was {status} today.',
      grade: 'Grade update for {studentName}: {course} - {grade}',
      emergency: 'Emergency Alert: {message}'
    },
    notificationSchedule: {
      daily: true,
      weekly: true,
      monthly: true,
      time: '09:00'
    },
    parentPortal: {
      enabled: true,
      features: {
        attendance: true,
        grades: true,
        messages: true,
        calendar: true
      }
    }
  });

  const [integrationSettings, setIntegrationSettings] = useState<IntegrationSettings>({
    lms: {
      enabled: true,
      type: 'canvas',
      url: 'https://canvas.example.com',
      apiKey: '',
      syncInterval: 30
    },
    calendar: {
      enabled: true,
      type: 'google',
      syncEnabled: true
    },
    paymentGateway: {
      enabled: true,
      provider: 'stripe',
      testMode: true,
      apiKey: ''
    },
    analytics: {
      enabled: true,
      providers: {
        googleAnalytics: true,
        customAnalytics: false
      },
      trackingId: ''
    }
  });

  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [previewFile, setPreviewFile] = useState<{ name: string; url: string; type: string } | null>(null);

  const validateSettings = () => {
    const errors: Record<string, string> = {};

    // General Settings Validation
    if (!schoolSettings.name.trim()) {
      errors.schoolName = 'School name is required';
    }
    if (!schoolSettings.email.trim()) {
      errors.schoolEmail = 'School email is required';
    }
    if (!schoolSettings.phone.trim()) {
      errors.schoolPhone = 'School phone is required';
    }
    if (!schoolSettings.website.trim()) {
      errors.schoolWebsite = 'School website is required';
    }

    // Academic Settings Validation
    if (academicSettings.passingGrade < 0 || academicSettings.passingGrade > 100) {
      errors.passingGrade = 'Passing grade must be between 0 and 100';
    }
    if (academicSettings.attendanceThreshold < 0 || academicSettings.attendanceThreshold > 100) {
      errors.attendanceThreshold = 'Attendance threshold must be between 0 and 100';
    }

    // Integration Settings Validation
    if (integrationSettings.lms.enabled) {
      if (!integrationSettings.lms.url.trim()) {
        errors.lmsUrl = 'LMS URL is required when LMS integration is enabled';
      }
      if (!integrationSettings.lms.apiKey.trim()) {
        errors.lmsApiKey = 'LMS API key is required when LMS integration is enabled';
      }
    }

    if (integrationSettings.paymentGateway.enabled) {
      if (!integrationSettings.paymentGateway.apiKey.trim()) {
        errors.paymentApiKey = 'Payment gateway API key is required when payment gateway is enabled';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateSettings()) {
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically make an API call to save the settings
      // const response = await api.saveSettings({
      //   schoolSettings,
      //   notificationSettings,
      //   securitySettings,
      //   academicSettings,
      //   communicationSettings,
      //   integrationSettings
      // });

      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 3000);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your school settings and preferences
        </p>
      </div>

      {/* Error Message */}
      {saveError && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-md">
          <div className="flex items-center">
            <X className="w-5 h-5 mr-2" />
            <span>{saveError}</span>
          </div>
        </div>
      )}

      {/* Updated Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('general')}
            className={`${
              activeTab === 'general'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab('academic')}
            className={`${
              activeTab === 'academic'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Academic
          </button>
          <button
            onClick={() => setActiveTab('communication')}
            className={`${
              activeTab === 'communication'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Communication
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`${
              activeTab === 'notifications'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('integration')}
            className={`${
              activeTab === 'integration'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Integration
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`${
              activeTab === 'security'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Security
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {activeTab === 'general' && 'General Settings'}
              {activeTab === 'academic' && 'Academic Settings'}
              {activeTab === 'communication' && 'Communication Settings'}
              {activeTab === 'notifications' && 'Notification Preferences'}
              {activeTab === 'integration' && 'Integration Settings'}
              {activeTab === 'security' && 'Security Settings'}
            </h3>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isSaving
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  School Name
                </label>
                <input
                  type="text"
                  value={schoolSettings.name}
                  onChange={(e) => setSchoolSettings({ ...schoolSettings, name: e.target.value })}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                    validationErrors.schoolName
                      ? 'border-red-300 dark:border-red-600'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {validationErrors.schoolName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.schoolName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Address
                </label>
                <textarea
                  value={schoolSettings.address}
                  onChange={(e) => setSchoolSettings({ ...schoolSettings, address: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={schoolSettings.phone}
                    onChange={(e) => setSchoolSettings({ ...schoolSettings, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={schoolSettings.email}
                    onChange={(e) => setSchoolSettings({ ...schoolSettings, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Website
                </label>
                <input
                  type="url"
                  value={schoolSettings.website}
                  onChange={(e) => setSchoolSettings({ ...schoolSettings, website: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Timezone
                  </label>
                  <select
                    value={schoolSettings.timezone}
                    onChange={(e) => setSchoolSettings({ ...schoolSettings, timezone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Language
                  </label>
                  <select
                    value={schoolSettings.language}
                    onChange={(e) => setSchoolSettings({ ...schoolSettings, language: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date Format
                  </label>
                  <select
                    value={schoolSettings.dateFormat}
                    onChange={(e) => setSchoolSettings({ ...schoolSettings, dateFormat: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {/* School Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    School Logo
                  </label>
                  <FileUpload
                    onFileUpload={(files) => {
                      // Handle initial file upload if needed
                    }}
                    onFileComplete={(file, url) => {
                      setSchoolSettings(prev => ({
                        ...prev,
                        logo: {
                          name: file.name,
                          url,
                          type: file.type.split('/')[1]
                        }
                      }));
                    }}
                    onFileRemove={() => {
                      setSchoolSettings(prev => ({
                        ...prev,
                        logo: undefined
                      }));
                    }}
                    attachments={schoolSettings.logo ? [schoolSettings.logo] : []}
                    accept=".jpg,.jpeg,.png"
                    maxSize={5}
                  />
                </div>

                {/* School Documents Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    School Documents
                  </label>
                  <FileUpload
                    onFileUpload={(files) => {
                      // Handle initial file upload if needed
                    }}
                    onFileComplete={(file, url) => {
                      setSchoolSettings(prev => ({
                        ...prev,
                        documents: [...(prev.documents || []), {
                          name: file.name,
                          url,
                          type: file.type.split('/')[1]
                        }]
                      }));
                    }}
                    onFileRemove={(index) => {
                      setSchoolSettings(prev => ({
                        ...prev,
                        documents: prev.documents?.filter((_, i) => i !== index)
                      }));
                    }}
                    attachments={schoolSettings.documents || []}
                    accept=".pdf,.doc,.docx"
                    maxSize={10}
                  />
                </div>
              </div>

              {/* Update the school documents section */}
              {schoolSettings.documents && schoolSettings.documents.length > 0 && (
                <div className="mt-4 space-y-2">
                  {schoolSettings.documents.map((document, index) => (
                    <button
                      key={index}
                      onClick={() => setPreviewFile(document)}
                      className="w-full flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {document.name}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSchoolSettings(prev => ({
                            ...prev,
                            documents: prev.documents?.filter((_, i) => i !== index)
                          }));
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'academic' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Grading System</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300">Grading System Type</label>
                    <select
                      value={academicSettings.gradingSystem}
                      onChange={(e) => setAcademicSettings({
                        ...academicSettings,
                        gradingSystem: e.target.value as 'percentage' | 'letter' | 'gpa'
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="percentage">Percentage</option>
                      <option value="letter">Letter Grade</option>
                      <option value="gpa">GPA</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300">Passing Grade</label>
                    <input
                      type="number"
                      value={academicSettings.passingGrade}
                      onChange={(e) => setAcademicSettings({
                        ...academicSettings,
                        passingGrade: parseInt(e.target.value)
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Grade Scale</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(academicSettings.gradeScale).map(([grade, threshold]) => (
                    <div key={grade}>
                      <label className="block text-sm text-gray-700 dark:text-gray-300">{grade}</label>
                      <input
                        type="number"
                        value={threshold}
                        onChange={(e) => setAcademicSettings({
                          ...academicSettings,
                          gradeScale: {
                            ...academicSettings.gradeScale,
                            [grade]: parseInt(e.target.value)
                          }
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Late Submission Policy</h4>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={academicSettings.lateSubmissionPolicy.allowed}
                      onChange={(e) => setAcademicSettings({
                        ...academicSettings,
                        lateSubmissionPolicy: {
                          ...academicSettings.lateSubmissionPolicy,
                          allowed: e.target.checked
                        }
                      })}
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Allow Late Submissions
                    </span>
                  </label>

                  {academicSettings.lateSubmissionPolicy.allowed && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300">Grace Period (hours)</label>
                        <input
                          type="number"
                          value={academicSettings.lateSubmissionPolicy.gracePeriod}
                          onChange={(e) => setAcademicSettings({
                            ...academicSettings,
                            lateSubmissionPolicy: {
                              ...academicSettings.lateSubmissionPolicy,
                              gracePeriod: parseInt(e.target.value)
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300">Penalty (%)</label>
                        <input
                          type="number"
                          value={academicSettings.lateSubmissionPolicy.penalty}
                          onChange={(e) => setAcademicSettings({
                            ...academicSettings,
                            lateSubmissionPolicy: {
                              ...academicSettings.lateSubmissionPolicy,
                              penalty: parseInt(e.target.value)
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'communication' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Email Templates</h4>
                <div className="space-y-4">
                  {Object.entries(communicationSettings.emailTemplates).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm text-gray-700 dark:text-gray-300">
                        {key.charAt(0).toUpperCase() + key.slice(1)} Template
                      </label>
                      <textarea
                        value={value}
                        onChange={(e) => setCommunicationSettings({
                          ...communicationSettings,
                          emailTemplates: {
                            ...communicationSettings.emailTemplates,
                            [key]: e.target.value
                          }
                        })}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">SMS Settings</h4>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={communicationSettings.smsEnabled}
                      onChange={(e) => setCommunicationSettings({
                        ...communicationSettings,
                        smsEnabled: e.target.checked
                      })}
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Enable SMS Notifications
                    </span>
                  </label>

                  {communicationSettings.smsEnabled && (
                    <div className="space-y-4">
                      {Object.entries(communicationSettings.smsTemplates).map(([key, value]) => (
                        <div key={key}>
                          <label className="block text-sm text-gray-700 dark:text-gray-300">
                            {key.charAt(0).toUpperCase() + key.slice(1)} Template
                          </label>
                          <textarea
                            value={value}
                            onChange={(e) => setCommunicationSettings({
                              ...communicationSettings,
                              smsTemplates: {
                                ...communicationSettings.smsTemplates,
                                [key]: e.target.value
                              }
                            })}
                            rows={2}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Parent Portal</h4>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={communicationSettings.parentPortal.enabled}
                      onChange={(e) => setCommunicationSettings({
                        ...communicationSettings,
                        parentPortal: {
                          ...communicationSettings.parentPortal,
                          enabled: e.target.checked
                        }
                      })}
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Enable Parent Portal
                    </span>
                  </label>

                  {communicationSettings.parentPortal.enabled && (
                    <div className="space-y-2">
                      {Object.entries(communicationSettings.parentPortal.features).map(([key, value]) => (
                        <label key={key} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => setCommunicationSettings({
                              ...communicationSettings,
                              parentPortal: {
                                ...communicationSettings.parentPortal,
                                features: {
                                  ...communicationSettings.parentPortal.features,
                                  [key]: e.target.checked
                                }
                              }
                            })}
                            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Email Notifications</h4>
                <div className="space-y-4">
                  {Object.entries(notificationSettings.email).map(([key, value]) => (
                    <label key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            email: {
                              ...notificationSettings.email,
                              [key]: e.target.checked
                            }
                          })
                        }
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Push Notifications</h4>
                <div className="space-y-4">
                  {Object.entries(notificationSettings.push).map(([key, value]) => (
                    <label key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            push: {
                              ...notificationSettings.push,
                              [key]: e.target.checked
                            }
                          })
                        }
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integration' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Learning Management System</h4>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={integrationSettings.lms.enabled}
                      onChange={(e) => setIntegrationSettings({
                        ...integrationSettings,
                        lms: {
                          ...integrationSettings.lms,
                          enabled: e.target.checked
                        }
                      })}
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Enable LMS Integration
                    </span>
                  </label>

                  {integrationSettings.lms.enabled && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300">LMS Type</label>
                        <select
                          value={integrationSettings.lms.type}
                          onChange={(e) => setIntegrationSettings({
                            ...integrationSettings,
                            lms: {
                              ...integrationSettings.lms,
                              type: e.target.value as 'canvas' | 'moodle' | 'blackboard' | 'custom'
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="canvas">Canvas</option>
                          <option value="moodle">Moodle</option>
                          <option value="blackboard">Blackboard</option>
                          <option value="custom">Custom</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300">LMS URL</label>
                        <input
                          type="url"
                          value={integrationSettings.lms.url}
                          onChange={(e) => setIntegrationSettings({
                            ...integrationSettings,
                            lms: {
                              ...integrationSettings.lms,
                              url: e.target.value
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300">API Key</label>
                        <input
                          type="password"
                          value={integrationSettings.lms.apiKey}
                          onChange={(e) => setIntegrationSettings({
                            ...integrationSettings,
                            lms: {
                              ...integrationSettings.lms,
                              apiKey: e.target.value
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300">Sync Interval (minutes)</label>
                        <input
                          type="number"
                          value={integrationSettings.lms.syncInterval}
                          onChange={(e) => setIntegrationSettings({
                            ...integrationSettings,
                            lms: {
                              ...integrationSettings.lms,
                              syncInterval: parseInt(e.target.value)
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Calendar Integration</h4>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={integrationSettings.calendar.enabled}
                      onChange={(e) => setIntegrationSettings({
                        ...integrationSettings,
                        calendar: {
                          ...integrationSettings.calendar,
                          enabled: e.target.checked
                        }
                      })}
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Enable Calendar Integration
                    </span>
                  </label>

                  {integrationSettings.calendar.enabled && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300">Calendar Type</label>
                        <select
                          value={integrationSettings.calendar.type}
                          onChange={(e) => setIntegrationSettings({
                            ...integrationSettings,
                            calendar: {
                              ...integrationSettings.calendar,
                              type: e.target.value as 'google' | 'outlook' | 'custom'
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="google">Google Calendar</option>
                          <option value="outlook">Outlook Calendar</option>
                          <option value="custom">Custom Calendar</option>
                        </select>
                      </div>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={integrationSettings.calendar.syncEnabled}
                          onChange={(e) => setIntegrationSettings({
                            ...integrationSettings,
                            calendar: {
                              ...integrationSettings.calendar,
                              syncEnabled: e.target.checked
                            }
                          })}
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Enable Two-Way Sync
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Payment Gateway</h4>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={integrationSettings.paymentGateway.enabled}
                      onChange={(e) => setIntegrationSettings({
                        ...integrationSettings,
                        paymentGateway: {
                          ...integrationSettings.paymentGateway,
                          enabled: e.target.checked
                        }
                      })}
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Enable Payment Gateway
                    </span>
                  </label>

                  {integrationSettings.paymentGateway.enabled && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300">Provider</label>
                        <select
                          value={integrationSettings.paymentGateway.provider}
                          onChange={(e) => setIntegrationSettings({
                            ...integrationSettings,
                            paymentGateway: {
                              ...integrationSettings.paymentGateway,
                              provider: e.target.value as 'stripe' | 'paypal' | 'custom'
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="stripe">Stripe</option>
                          <option value="paypal">PayPal</option>
                          <option value="custom">Custom</option>
                        </select>
                      </div>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={integrationSettings.paymentGateway.testMode}
                          onChange={(e) => setIntegrationSettings({
                            ...integrationSettings,
                            paymentGateway: {
                              ...integrationSettings.paymentGateway,
                              testMode: e.target.checked
                            }
                          })}
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Test Mode
                        </span>
                      </label>

                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300">API Key</label>
                        <input
                          type="password"
                          value={integrationSettings.paymentGateway.apiKey}
                          onChange={(e) => setIntegrationSettings({
                            ...integrationSettings,
                            paymentGateway: {
                              ...integrationSettings.paymentGateway,
                              apiKey: e.target.value
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Analytics</h4>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={integrationSettings.analytics.enabled}
                      onChange={(e) => setIntegrationSettings({
                        ...integrationSettings,
                        analytics: {
                          ...integrationSettings.analytics,
                          enabled: e.target.checked
                        }
                      })}
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Enable Analytics
                    </span>
                  </label>

                  {integrationSettings.analytics.enabled && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300">Google Analytics</label>
                        <input
                          type="checkbox"
                          checked={integrationSettings.analytics.providers.googleAnalytics}
                          onChange={(e) => setIntegrationSettings({
                            ...integrationSettings,
                            analytics: {
                              ...integrationSettings.analytics,
                              providers: {
                                ...integrationSettings.analytics.providers,
                                googleAnalytics: e.target.checked
                              }
                            }
                          })}
                          className="mt-1 block rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                      </div>

                      {integrationSettings.analytics.providers.googleAnalytics && (
                        <div>
                          <label className="block text-sm text-gray-700 dark:text-gray-300">Tracking ID</label>
                          <input
                            type="text"
                            value={integrationSettings.analytics.trackingId}
                            onChange={(e) => setIntegrationSettings({
                              ...integrationSettings,
                              analytics: {
                                ...integrationSettings.analytics,
                                trackingId: e.target.value
                              }
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Authentication</h4>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={securitySettings.twoFactorAuth}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          twoFactorAuth: e.target.checked
                        })
                      }
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Enable Two-Factor Authentication
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={securitySettings.loginNotifications}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          loginNotifications: e.target.checked
                        })
                      }
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Send Login Notifications
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Session Management</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          sessionTimeout: parseInt(e.target.value)
                        })
                      }
                      min="5"
                      max="120"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300">
                      Password Expiry (days)
                    </label>
                    <input
                      type="number"
                      value={securitySettings.passwordExpiry}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          passwordExpiry: parseInt(e.target.value)
                        })
                      }
                      min="30"
                      max="365"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Success Message */}
      {showSaveSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-200 px-4 py-3 rounded-md shadow-lg">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>Settings saved successfully</span>
          </div>
        </div>
      )}

      {/* Add FilePreviewModal */}
      {previewFile && (
        <FilePreviewModal
          isOpen={!!previewFile}
          onClose={() => setPreviewFile(null)}
          file={previewFile}
        />
      )}
    </div>
  );
};

export default Settings; 