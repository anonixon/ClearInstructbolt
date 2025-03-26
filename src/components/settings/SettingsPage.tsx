import React, { useState } from 'react';
import { 
  User, Shield, Bell, Moon, Sun, Globe, Lock, Download, 
  Link, HelpCircle, Languages, Palette, School
} from 'lucide-react';
import { useStore } from '../../store/useStore';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    attendance: true,
    behavior: true,
    reports: true
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">
          Manage your account preferences and system settings
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          <nav className="space-y-1">
            <NavItem
              icon={<User />}
              label="Account"
              active={activeSection === 'account'}
              onClick={() => setActiveSection('account')}
            />
            <NavItem
              icon={<Bell />}
              label="Notifications"
              active={activeSection === 'notifications'}
              onClick={() => setActiveSection('notifications')}
            />
            <NavItem
              icon={<Palette />}
              label="Appearance"
              active={activeSection === 'appearance'}
              onClick={() => setActiveSection('appearance')}
            />
            <NavItem
              icon={<School />}
              label="Form Groups"
              active={activeSection === 'formGroups'}
              onClick={() => setActiveSection('formGroups')}
            />
            <NavItem
              icon={<Lock />}
              label="Privacy"
              active={activeSection === 'privacy'}
              onClick={() => setActiveSection('privacy')}
            />
            <NavItem
              icon={<Link />}
              label="Integrations"
              active={activeSection === 'integrations'}
              onClick={() => setActiveSection('integrations')}
            />
            <NavItem
              icon={<HelpCircle />}
              label="Help & Support"
              active={activeSection === 'help'}
              onClick={() => setActiveSection('help')}
            />
          </nav>
        </div>

        <div className="col-span-12 lg:col-span-9 space-y-6">
          {activeSection === 'account' && (
            <Section title="Account Information">
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-2xl">
                    JD
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">John Doe</h3>
                    <p className="text-gray-400">Mathematics Teacher</p>
                    <button className="mt-2 text-sm text-blue-400 hover:text-blue-300">
                      Change Profile Picture
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Full Name"
                    value="John Doe"
                    type="text"
                  />
                  <InputField
                    label="Email Address"
                    value="john.doe@school.edu"
                    type="email"
                  />
                  <InputField
                    label="Phone Number"
                    value="+1 (555) 123-4567"
                    type="tel"
                  />
                  <InputField
                    label="Staff ID"
                    value="T123456"
                    type="text"
                    disabled
                  />
                </div>

                <div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </Section>
          )}

          {activeSection === 'notifications' && (
            <Section title="Notification Preferences">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Notification Channels</h3>
                  <div className="space-y-3">
                    <ToggleItem
                      label="Email Notifications"
                      description="Receive notifications via email"
                      checked={notifications.email}
                      onChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                    />
                    <ToggleItem
                      label="Push Notifications"
                      description="Receive notifications in your browser"
                      checked={notifications.push}
                      onChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                    />
                    <ToggleItem
                      label="SMS Notifications"
                      description="Receive notifications via text message"
                      checked={notifications.sms}
                      onChange={(checked) => setNotifications(prev => ({ ...prev, sms: checked }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Notification Types</h3>
                  <div className="space-y-3">
                    <ToggleItem
                      label="Attendance Updates"
                      description="Notifications about student attendance"
                      checked={notifications.attendance}
                      onChange={(checked) => setNotifications(prev => ({ ...prev, attendance: checked }))}
                    />
                    <ToggleItem
                      label="Behavior Incidents"
                      description="Notifications about student behavior"
                      checked={notifications.behavior}
                      onChange={(checked) => setNotifications(prev => ({ ...prev, behavior: checked }))}
                    />
                    <ToggleItem
                      label="Report Generation"
                      description="Notifications when reports are ready"
                      checked={notifications.reports}
                      onChange={(checked) => setNotifications(prev => ({ ...prev, reports: checked }))}
                    />
                  </div>
                </div>
              </div>
            </Section>
          )}

          {activeSection === 'appearance' && (
            <Section title="Appearance Settings">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <ThemeButton
                      icon={<Moon />}
                      label="Dark"
                      active={theme === 'dark'}
                      onClick={() => setTheme('dark')}
                    />
                    <ThemeButton
                      icon={<Sun />}
                      label="Light"
                      active={theme === 'light'}
                      onClick={() => setTheme('light')}
                    />
                    <ThemeButton
                      icon={<Globe />}
                      label="System"
                      active={theme === 'system'}
                      onClick={() => setTheme('system')}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Language</h3>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-gray-800/50 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
              </div>
            </Section>
          )}

          {/* Add other sections as needed */}
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ 
  icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active 
        ? 'bg-gray-800/50 text-white' 
        : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const Section = ({ 
  title, 
  children 
}: { 
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-gray-800/50 rounded-lg p-6">
    <h2 className="text-xl font-semibold text-white mb-6">{title}</h2>
    {children}
  </div>
);

const InputField = ({ 
  label, 
  value, 
  type = 'text',
  disabled = false 
}: { 
  label: string;
  value: string;
  type?: string;
  disabled?: boolean;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-400 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      disabled={disabled}
      className="w-full bg-gray-800/50 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
    />
  </div>
);

const ToggleItem = ({ 
  label, 
  description, 
  checked, 
  onChange 
}: { 
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700/50">
    <div>
      <h4 className="text-white font-medium">{label}</h4>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full transition-colors ${
        checked ? 'bg-blue-500' : 'bg-gray-600'
      }`}
    >
      <div className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
        checked ? 'translate-x-7' : 'translate-x-1'
      }`} />
    </button>
  </div>
);

const ThemeButton = ({ 
  icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${
      active 
        ? 'bg-blue-500 text-white' 
        : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default SettingsPage;