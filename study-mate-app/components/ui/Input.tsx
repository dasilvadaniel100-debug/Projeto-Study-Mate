import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm text-gray-400 font-medium">
          {label}
        </label>
      )}
      <input
        className={`block w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl
          focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          text-white placeholder-gray-500 transition-all
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
