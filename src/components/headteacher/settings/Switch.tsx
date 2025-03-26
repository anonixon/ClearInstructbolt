import React from 'react';

interface SwitchProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  description,
  checked,
  onChange
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-white font-medium">{label}</h4>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-blue-500' : 'bg-gray-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};