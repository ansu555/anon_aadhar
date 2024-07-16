import React from 'react';

type ToggleSwitchProps = {
  label: string;
  isChecked: boolean;
  onChange: () => void;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, isChecked, onChange }) => {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-700">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-blue-600"></div>
        <div className="absolute w-4 h-4 bg-white rounded-full shadow -left-1 -top-1 transform transition-transform duration-200 peer-checked:translate-x-5"></div>
      </label>
    </div>
  );
};

export default ToggleSwitch;
