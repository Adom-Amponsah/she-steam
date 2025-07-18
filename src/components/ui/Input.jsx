import React from 'react';

export const Input = ({ label, type = 'text', ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
        {...props}
      />
    </div>
  );
}; 