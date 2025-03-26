import React from 'react';

const ProfileSettings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Profile Settings</h2>
        <p className="text-gray-400">Update your profile information and preferences.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Full Name
          </label>
          <input
            type="text"
            value="Sarah Johnson"
            className="w-full bg-gray-800/50 px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Email Address
          </label>
          <input
            type="email"
            value="s.johnson@oakwood.edu"
            className="w-full bg-gray-800/50 px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Role
          </label>
          <input
            type="text"
            value="Head Teacher"
            disabled
            className="w-full bg-gray-800/50 px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Current Password
          </label>
          <input
            type="password"
            placeholder="Enter current password"
            className="w-full bg-gray-800/50 px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full bg-gray-800/50 px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;