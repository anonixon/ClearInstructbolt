import React from 'react';
import { ChevronDown } from 'lucide-react';

const FormGroupSelector = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Form Group</h2>
      <p className="text-gray-400">
        Select your form group to view and manage your assigned students.
      </p>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button className="flex items-center justify-between bg-gray-800/50 text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
          <span>Select Year Group</span>
          <ChevronDown className="w-5 h-5" />
        </button>
        
        <button className="flex items-center justify-between bg-gray-800/50 text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
          <span>Select Form Group</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FormGroupSelector;