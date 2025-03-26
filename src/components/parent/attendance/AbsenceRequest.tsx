import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';

const AbsenceRequest = () => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Absence Request</h2>
        <p className="text-gray-400">Submit a request for planned absence</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Start Date
          </label>
          <button className="w-full flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-lg text-gray-400 hover:text-white">
            <Calendar className="w-5 h-5" />
            <span>Select date</span>
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            End Date
          </label>
          <button className="w-full flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-lg text-gray-400 hover:text-white">
            <Calendar className="w-5 h-5" />
            <span>Select date</span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-white mb-2">
          Reason for Absence
        </label>
        <select className="w-full bg-gray-900/50 px-4 py-2 rounded-lg text-gray-400">
          <option>Select reason</option>
          <option>Medical appointment</option>
          <option>Family event</option>
          <option>Religious observance</option>
          <option>Other</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-white mb-2">
          Additional Details
        </label>
        <textarea
          className="w-full bg-gray-900/50 px-4 py-2 rounded-lg text-gray-400 min-h-[100px]"
          placeholder="Please provide any additional information about this absence request"
        />
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-500">Important Information</h4>
            <p className="text-sm text-blue-400">
              Absence requests should be submitted at least 5 school days in advance when possible.
              Requests will be reviewed by the school administration and you will be notified of the decision.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Submit Request
        </button>
      </div>
    </div>
  );
};

export default AbsenceRequest;